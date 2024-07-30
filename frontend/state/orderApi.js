import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['History', 'Order'],
    endpoints: build => ({
        getHistory: build.query({
            query: () => 'history',
            providesTags: ['History']
        }),
        createOrder: build.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order']
        }),
        filterSize: build.mutation({
            query: ({ size, hx }) => ({
                url: `history/${size}`,
                method: 'PUT',
                body: hx
            }),
            invalidatesTags: ['History']
        })
    })
})

export const {
    useGetHistoryQuery,
    useCreateOrderMutation,
    useFilterSizeMutation
} = orderApi