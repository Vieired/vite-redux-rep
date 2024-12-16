import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: localStorage.getItem("user") || null
    },
    reducers: {
        setUser (users, action) {
            // console.log("setUser: ", users, action);
            users.currentUser = action.payload;
        },
    }
});

export const { setUser } = usersSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectUsers = (state:any) => state.users;

export default usersSlice.reducer;