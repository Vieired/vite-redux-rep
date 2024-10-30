import { configureStore } from '@reduxjs/toolkit'
import stockReducer from './stockSlice'
import gamesReducer from './gamesSlice'


export default configureStore({
    reducer: {
        stock: stockReducer,
        games: gamesReducer,
    }
})

// export type RootState = ReturnType<typeof store.getState>
// export default store