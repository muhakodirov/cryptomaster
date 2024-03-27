import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: (builder) => ({
        getAllCryptoNews: builder.query({
            query: () => 'list'
        }), 
        getNewsById: builder.query({
            query: (id) => `list/${id}`
        }),
    }),
})


export const {useGetAllCryptoNewsQuery, useGetNewsByIdQuery} = newsApi