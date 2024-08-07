import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   pizzaSize: 'All'
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        selectSizeFilter(state, action) {
            state.pizzaSize = action.payload
        }
    }
})

export const {
    selectSizeFilter
} = orderSlice.actions

export default orderSlice.reducer