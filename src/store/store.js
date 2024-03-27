import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../slice/coinSlice'
import { newsApi } from '../service/newsApi'

const store = configureStore({
    reducer: {
        coin: coinReducer,
        [newsApi.reducerPath]: newsApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware),

})

export default store;