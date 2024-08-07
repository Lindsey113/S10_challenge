import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['Orders'],
    endpoints: build => ({
        getOrders: build.query({
            query: () => 'history',
            providesTags: ['Orders']
        }),
        createOrder: build.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order']
        }),
        
    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation
} = orderApi