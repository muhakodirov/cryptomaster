import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    coin: [],
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


const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            state.coin = state.coin.map((c) => c.id === action.payload ? { ...c, isFavorite: !c.isFavorite } : { ...c });
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(action.payload)) {
                localStorage.setItem('favorites', JSON.stringify([...favorites, action.payload]));
            } else {
                const updatedFavorites = favorites.filter(el => el !== action.payload);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCoins.fulfilled, (state, action) => {
            state.isLoading = false

            const favoritesID = JSON.parse(localStorage.getItem('favorites')) || [];


            state.coin = action.payload.data.map(el => {
                if (favoritesID.includes(el.id)) {
                    return {
                        ...el,
                        isFavorite: true
                    }
                }
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
