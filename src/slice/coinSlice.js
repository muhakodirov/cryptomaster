import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SinglePage from "../components/SingleCoinPage/SinglePage";

const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const initialState = {
    coin: [],
    favorites: storedFavorites,
    isLoading: false
}

export const url = "https://api.coincap.io/v2/assets"

export const fetchCoins = createAsyncThunk(
    'coins/fetchCoins',
    async () => {
        const data = await fetch(url)
        const res = await data.json()
        return res
    }
)

// export const fetchCoinsByID = createAsyncThunk(
//     'coins/fetchCoinsByID',
//     async (id) => {
//         const data = await fetch(`${url}/${id}`)
//         const res = await data.json()
//         console.log(res)
      
//         return res
//     }
// )


const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            state.coin = state.coin.map( (c) => c.id === action.payload ? {...c, isFavorite: !c.isFavorite} : {...c});
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCoins.fulfilled, (state, action) => {
            state.isLoading = false
            
            state.coin = action.payload.data.map(el => {
                    return {
                        ...el,
                        isFavorite: false
                    }
                })  
        })
    },
})

export const { toggleFavorite } = coinSlice.actions;
export default coinSlice.reducer;
