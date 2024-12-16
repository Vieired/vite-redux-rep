import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import gamesReducer from './gamesSlice'
import stockReducer from './stockSlice'


export default configureStore({
    reducer: {
        users: usersReducer,
        games: gamesReducer,
        stock: stockReducer,
    }
})

// export type RootState = ReturnType<typeof store.getState>
// export default store