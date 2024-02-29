import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    coin: {},
    isLoading: false
}

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"

export const fetchCoins = createAsyncThunk(
    'coins/fetchCoins',
    async () => {
        const data = await fetch(url)
        const res = await data.json()
        return [...res]
    }
)


const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCoins.fulfilled, (state, action) => {
            state.isLoading = false

            state.coin = action.payload
        })
    },
})

export const { toggleFavorite } = coinSlice.actions;
export default coinSlice.reducer;
