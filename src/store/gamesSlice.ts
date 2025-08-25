import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import {
    collection,
    query,
    doc,
    getDocs,
    updateDoc,
    addDoc,
    orderBy,
    where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Game, InitialStateGames, ISettings } from '../shared/models/Games';
import { CleaningMethodEnum } from '../shared/enums/CleaningMethodEnum';
import { checkIfAuthenticationIsRequired } from '../shared/utils/auth';

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        status: 'idle',
        limitInMonths: null,
        today: new Date().toISOString().split("T")[0],
        showOnlyActiveGamesFilter: true,
    } as InitialStateGames,
    reducers: {
        toggleShowOnlyActiveGamesFilter: (state, action: PayloadAction<boolean>) => {
            // state.showOnlyActiveGamesFilter = !state.showOnlyActiveGamesFilter
            state.showOnlyActiveGamesFilter = action.payload
        },
        // setLimitInMonths: (state, action) => {
        //     // TODO: futuramente, transformar em extraReducers para guardar este valor na base de dados
        //     state.limitInMonths = action.payload
        // },
        // updateCleaningDate: (jogos, action) => {
        //     jogos.games.map(game => {
        //         if (game.id === action.payload) {
        //             game.cleaning_date = new Date().toISOString()
        //         }
        //     })
        // },        
        // addGame: games => {
        //     // add games logic
        // },
        // eraseGame: (games, action) => {
        //     // return games.filter(game => game.id != action.payload);
        //     return (games.games)?.filter((game: Game) => game.id != action.payload);
        // },
        // selectGames: (): Game[] => {
        //     return state.games as Game
        // },
    },
    extraReducers: builder => {
        builder
        // #region - READ fetchGames ------------------------------------------
        //   .addCase(fetchGames, state => {
        //     // Clear out the list of posts whenever the user logs out
        //     return initialState
        //   })
        .addCase(fetchGames.pending, (state/*, action*/) => {
            state.status = 'pending';
        })
        .addCase(fetchGames.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add any fetched posts to the array
            state.games = action.payload;
            // state.games = (action.payload) as never[];
        })
        .addCase(fetchGames.rejected, (state, action) => {
            state.status = 'failed'
            // state.error = action.error.message ?? 'Unknown Error'
            console.log(action.error.message ?? 'Unknown Error');
            toast.error("Falha ao tentar carregar os jogos.", {
                toastId: "invalid-form-field",
            });
        })
        // #endregion - READ fetchGames ----------------------------------------

        // #region - READ fetchSettings ------------------------------------------
        .addCase(fetchSettings.pending, (state/*, action*/) => {
            state.status = 'pending';
        })
        .addCase(fetchSettings.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            state.limitInMonths = action.payload as any;
        })
        .addCase(fetchSettings.rejected, (state, action) => {
            state.status = 'failed'
            const message = action.error.message
                ? "Falha ao tentar carregar as configurações."
                : 'Unknown Error';
            toast.error(message, { toastId: "invalid-form-field" });
        })
        // #endregion - READ fetchSettings ----------------------------------------

        // #region - UPDATE updateSettings ------------------------------------------
        .addCase(updateSettings.pending, (state/*, action*/) => {
            state.status = 'pending';
        })
        .addCase(updateSettings.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.limitInMonths = action?.meta?.arg?.cleaningFrequency || null;
            // state.limitInMonths = action.payload as any;
        })
        .addCase(updateSettings.rejected, (state, action) => {
            state.status = 'failed'
            const message = action.error.message
                ? "Falha ao tentar atualizar as configurações."
                : 'Unknown Error';
            toast.error(message, { toastId: "invalid-form-field" });
        })
        // #endregion - UPDATE updateSettings ----------------------------------------

        // #region - UPDATE updateCleaningDate --------------------------------
        .addCase(updateCleaningDate.fulfilled, (state/*, action*/) => {
            state.status = 'succeeded';
            // state.games = action.payload;
            // console.log("extraReducers updateCleaningDate: ", action.payload);
            toast.success("Jogo limpo com sucesso.", {
                toastId: "notification-message",
            });
        })
        .addCase(updateCleaningDate.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error.message ?? 'Unknown Error');
            toast.error("Erro desconhecido.", {
                toastId: "invalid-form-field",
            });
        })
        // #endregion - UPDATE updateCleaningDate -----------------------------

        // #region - UPDATE updateGame ----------------------------------------
        .addCase(updateGame.pending, (state/*, action*/) => {
            state.status = 'pending';
        })
        .addCase(updateGame.fulfilled, (state/*, action*/) => {
            state.status = 'succeeded';

            // state.games.map((game: Game) => {
            //     if (game.id == action.meta.arg.id) {
            //         game = action.meta.arg
            //     }
            // });            

            // // Quando quiser alterar uma única propriedade do objeto, passar esta prop na chamada (foi feito assim no curso)
            // state.games.map((game:Game) => {
            //     if (game.id == action.payload.id) {
            //         // game.isActive = !game.isActive
            //     }
            // });

            // state.games = action.payload;
            // console.log("extraReducers updateGame: ", action.payload);
            toast.success("Jogo atualizado com sucesso.", {
                toastId: "notification-message",
            });
        })
        .addCase(updateGame.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error.message ?? 'Unknown Error');
            toast.error("Erro desconhecido.", {
                toastId: "invalid-form-field",
            });
        })
        // #endregion - UPDATE updateGame -------------------------------------

        // #region - CREATE createGame ----------------------------------------
        .addCase(createGame.pending, (state/*, action*/) => {
            console.log('loading');
            state.status = 'pending';
        })
        .addCase(createGame.fulfilled, (state/*, action*/) => {
            state.status = 'succeeded';
            // state.games = action.payload;
            // state.games.push(action.payload[0]);
            // console.log("extraReducers createGame: ", action.payload);
            toast.success("Jogo criado com sucesso.", {
                toastId: "notification-message",
            });
        })
        .addCase(createGame.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error.message ?? 'Unknown Error');
            toast.error("Erro desconhecido.", {
                toastId: "invalid-form-field",
            });
        })
        // #endregion - CREATE createGame -------------------------------------
    },
});

export const {
    toggleShowOnlyActiveGamesFilter,
    // setLimitInMonths,
    // addGame,
    // eraseGame,
} = gamesSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectGames = (state: any) => state.games;
// export const selectGames = (state: InitialStateGames) => state;
// export const selectGames = (state: Slice<Game>) => state?.getInitialState;

export default gamesSlice.reducer;

export const fetchGames = createAsyncThunk('jogos/fetchGames', async (
    showOnlyActiveGamesFilter?: boolean
) => {

    checkIfAuthenticationIsRequired();

    const gamesRef = collection(db, "jogos");
        const q = showOnlyActiveGamesFilter
            ? query(
                gamesRef,
                where("isActive", "==", true),
                // where("isActive", "==", gamesSlice.getInitialState().isActiveFilter),
                // orderBy("name", "asc"),
                orderBy("cleaning_date"),
                orderBy("__name__"),
                // where("id", "==", auth.currentUser.uid)
            )
            : query(
                gamesRef,
                orderBy("cleaning_date"),
                orderBy("__name__"),
            );

    const querySnapshot = await getDocs(q);
    const gameList: Game[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        gameList.push({
            // id: doc.id,
            ...doc.data() as Game
        });
    });

    // const sortedGameList = gameList.sort(function (a,b) {
    //     return new Date(a.cleaning_date) < new Date(b.cleaning_date)
    //         ? -1
    //         : new Date(a.cleaning_date) > new Date(b.cleaning_date)
    //             ? 1
    //             : 0;
    // });

    return gameList
});

export const updateCleaningDate = createAsyncThunk(
    'jogos/updateCleaningDate',
    async (payload: {
        id: string,
        methods: CleaningMethodEnum[] | null,
    }) => { // TODO: refatorar para usar a tipagem Game

        checkIfAuthenticationIsRequired();

        const gamesRef = doc(db, 'jogos', payload.id);
        console.log("updateCleaningDate payload: ", payload);
        
        await updateDoc(gamesRef, {
            cleaning_date: new Date().toISOString(),
            methods: payload.methods,
        });
    }
);

export const updateGame = createAsyncThunk(
    'jogos/updateGame',
    async (payload: Game) => {
        
        checkIfAuthenticationIsRequired();

        const gamesRef = doc(db, 'jogos', payload.id);
        // console.log("updateGame payload: ", payload);
        
        await updateDoc(gamesRef, {
            ...payload,
            cleaning_date: payload.cleaning_date,
            cleaning_method: payload.cleaning_method,
            methods: payload?.methods || null,
            isActive: payload.isActive,
            name: payload.name,
            photoUrl: payload.photoUrl,
        })
    }
);

export const createGame = createAsyncThunk(
    'jogos/createGame',
    async (payload: Game) => {

        checkIfAuthenticationIsRequired();

        const docRef = await addDoc(collection(db, 'jogos'), { // cria um registro na base e obtem o novo ID
            ...payload,
            // cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            methods: null,
            isActive: payload.isActive,
            // name: payload.name,
            // photoUrl: payload?.photoUrl,
        });
        // console.log("createGame docRef: ", docRef);
        // console.log("createGame payload: ", payload);
        
        const gamesRef = doc(db, 'jogos', docRef.id); // atualiza o novo registro com o ID obtido
        await updateDoc(gamesRef, {
            id: docRef.id,
            cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            methods: payload.methods,
            isActive: payload.isActive,
            name: payload.name,
            photoUrl: payload?.photoUrl || "",
        });
    }
);

export const fetchSettings = createAsyncThunk('configuracoes/fetchSettings', async () => {

    checkIfAuthenticationIsRequired();

    const settingsRef = collection(db, "configuracoes");
        const q = query(settingsRef);

    const querySnapshot = await getDocs(q);
    const { cleaningFrequency } = querySnapshot.docs[0].data();

    return cleaningFrequency
});

export const updateSettings = createAsyncThunk('configuracoes/updateSettings',
    async (payload: ISettings) => {
        
        checkIfAuthenticationIsRequired();

        const settingsRef = doc(db, 'configuracoes', 'LihKQAjYOE7actonBESK');
        // console.log("updateSettings payload: ", payload);
        
        await updateDoc(settingsRef, {
            ...payload,
            cleaningFrequency: payload.cleaningFrequency
        })
    }
);