import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const headers = {
    'X-RapidAPI-Key': '4662067a2dmshb786b29e64595eep1c4be3jsnaf0e4c8af1a5',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
}

const baseUrl = 'https://seeking-alpha.p.rapidapi.com'

const createRequest = (url) => ({url, headers: headers})



export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/v2/list?category=market-news%3A%3A${newsCategory}&size=${count}&number=1`)
        }), 
        getNewsById: builder.query({
            query: (id) => `list/${id}`
        }),
    }),
})


export const {useGetCryptoNewsQuery, useGetNewsByIdQuery} = newsApi