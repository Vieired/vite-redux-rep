import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import {
    collection,
    query,
    doc,
    getDocs,
    updateDoc,
    addDoc,
    orderBy,
} from 'firebase/firestore';
import { Game, InitialStateGames } from '../shared/models/Games';
import { toast } from 'react-toastify';

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        status: 'idle',
        monthLimit: 6,
        today: new Date().toISOString().split("T")[0],
    } as InitialStateGames,
    reducers: {
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
            console.log('loading');
            state.status = 'pending';
        })
        .addCase(fetchGames.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add any fetched posts to the array
            state.games = action.payload;
            // state.games = (action.payload) as never[];
            // console.log('success');
            // state.games.map(game => {
            //     if (game.id === action.payload) {
            //         dispatch(fetchGames() as unknown as UnknownAction);
            //     }
            // });
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
            console.log('loading');
            state.status = 'pending';
        })
        .addCase(updateGame.fulfilled, (state/*, action*/) => {
            state.status = 'succeeded';
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

// export const { addGame, eraseGame } = gamesSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectGames = (state: any) => state.games;
// export const selectGames = (state: InitialStateGames) => state;
// export const selectGames = (state: Slice<Game>) => state?.getInitialState;

export default gamesSlice.reducer;

export const fetchGames = createAsyncThunk('jogos/fetchGames', async () => {
    const q = query(
        collection(db, "jogos"),
        // orderBy("name", "asc"),
        orderBy("cleaning_date"),
        orderBy("__name__"),
        // where("id", "==", auth.currentUser.uid)
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
    async (payload: {id:string, cleaning_method?: number}) => { // TODO: refatorar para usar a tipagem Game
        const gamesRef = doc(db, 'jogos', payload.id);
        console.log("updateCleaningDate payload: ", payload);
        
        await updateDoc(gamesRef, {
            cleaning_date: new Date().toISOString(),
            cleaning_method: payload.cleaning_method,
        });
    }
);

export const updateGame = createAsyncThunk(
    'jogos/updateGame',
    async (payload: Game) => {
        const gamesRef = doc(db, 'jogos', payload.id);
        console.log("updateGame payload: ", payload);
        
        await updateDoc(gamesRef, {
            ...payload,
            cleaning_date: payload.cleaning_date,
            cleaning_method: payload.cleaning_method,
            isActive: true,
            name: payload.name,
            photoUrl: payload.photoUrl,
        })
    }
);

export const createGame = createAsyncThunk(
    'jogos/createGame',
    async (payload: Game) => {
        const docRef = await addDoc(collection(db, 'jogos'), {
            ...payload,
            // cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            isActive: true,
            // name: payload.name,
            // photoUrl: payload?.photoUrl,
        });
        // console.log("createGame docRef: ", docRef);
        // console.log("createGame payload: ", payload);
        
        const gamesRef = doc(db, 'jogos', docRef.id);
        await updateDoc(gamesRef, {
            id: docRef.id,
            cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            isActive: true,
            name: payload.name,
            photoUrl: payload?.photoUrl || "",
        });
    }
);