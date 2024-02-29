import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../slice/coinSlice'

const store = configureStore({
    reducer: {
        coin: coinReducer
    }
})

export default store;