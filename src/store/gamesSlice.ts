import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import {
    collection,
    query,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { Game } from '../shared/models/Games';

interface InitialStateGames {
    games: Game[],
    status: string,
}

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        status: 'idle'
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
        // #region - READ
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
            console.log('success');
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
        })
        // #endregion - READ

        // #region - UPDATE
        .addCase(updateCleaningDate.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.games = action.payload;
            console.log(action.payload);
            // dispatch(fetchGames() as unknown as UnknownAction);
        })
        .addCase(updateCleaningDate.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error.message ?? 'Unknown Error');
        })
        // #endregion - UPDATE
      },
});

// export const { addGame, eraseGame } = gamesSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectGames = (state:any) => state.games;
// export const selectGames = (state: Slice<Game>) => state?.getInitialState;

export default gamesSlice.reducer;


export const fetchGames = createAsyncThunk('jogos/fetchGames', async () => {
    const q = query(collection(db, "jogos")/*, where("id", "==", auth.currentUser.uid)*/);
    const querySnapshot = await getDocs(q);
    const gameList: Game[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        gameList.push({
            // id: doc.id,
            ...doc.data() as Game
        });
    });

    const sortedGameList = gameList.sort(function (a,b) {
        return new Date(a.cleaning_date) < new Date(b.cleaning_date)
            ? -1
            : new Date(a.cleaning_date) > new Date(b.cleaning_date)
                ? 1
                : 0;
    });

    return sortedGameList
});

export const updateCleaningDate = createAsyncThunk(
    'jogos/updateCleaningDate',
    async (payload: {id:string}) => { // TODO: refatorar para usar a tipagem Game
        const gamesRef = doc(db, 'jogos', payload.id);
        console.log(payload);
        
        await updateDoc(gamesRef, {
            cleaning_date: new Date().toISOString()
        });

        // #region - código fetchGames replicado
        const q = query(collection(db, "jogos"));
        const querySnapshot = await getDocs(q);
        const gameList: Game[] = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            gameList.push({
                ...doc.data() as Game
            });
        });
    
        const sortedGameList = gameList.sort(function (a,b) {
            return new Date(a.cleaning_date) < new Date(b.cleaning_date)
                ? -1
                : new Date(a.cleaning_date) > new Date(b.cleaning_date)
                    ? 1
                    : 0;
        });
    
        return sortedGameList;
        // #endregion - código fetchGames replicado
    }
);