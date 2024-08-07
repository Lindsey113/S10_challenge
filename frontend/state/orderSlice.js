import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'filters',
    initialState: {
        pizzaSize: 'All'
    },
    reducers: {
        selectSizeFilter(state, action) {
           state.pizzaSize = action.payload
        }
    }
})

export default orderSlice.reducer

export const { 
    selectSizeFilter
} = orderSlice.actions