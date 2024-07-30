import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayAllSizes: true,
    amountOfToppings: 0,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        toggleSizes(state) {
            state.displayAllSizes = !state.displayAllSizes
        },
        setAmountOfToppings(state, action) {
            if('1' || '2' || '3' || '4' || '5' === true) {
                state.amountOfToppings + action.payload
            } else {
                state.amountOfToppings = 0
            }
        }
    }
})

export const {
    toggleSizes,
    setAmountOfToppings
} = orderSlice.actions

export default orderSlice.reducer