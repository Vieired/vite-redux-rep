import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
    name: 'games',
    initialState: [
        {
            id: "aaaa-bbbb-1111",
            name: "Teste 1",
            cleaning_date: "2024-10-30T00:00:00:000Z",
            cleaning_method: 1,
        },
        {
            id: "aaaa-bbbb-2222",
            name: "Teste 2",
            cleaning_date: "2024-11-15T00:00:00:000Z",
            cleaning_method: 1,
        },        
    ],
    reducers: {
        // addGame: games => {
        //     // add games logic
        // },
        eraseGame: (games, action) => {
            return games.filter((game) => game.id != action.payload);
        },
        // selectGames: (): Game[] => {
        //     return state.games as Game
        // },
    }
});

export const { /*addGame,*/ eraseGame } = gamesSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectGames = (state:any) => state.games;
// export const selectGames = (state: Slice<Game>) => state?.getInitialState;

export default gamesSlice.reducer