import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        counter: 0
    },
    reducers: {
        increment (state) {
            state.counter += 1
        },
        decrement (state) {
            state.counter -= 1
        },
    }
});

export const { decrement, increment } = stockSlice.actions
export default stockSlice.reducer