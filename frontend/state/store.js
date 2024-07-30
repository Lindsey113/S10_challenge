import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './orderSlice'
import { orderApi } from './orderApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    orderState: orderReducer,
   [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    orderApi.middleware
  ),
})

export const store = resetStore()
