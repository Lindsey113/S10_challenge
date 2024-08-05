import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './orderSlice'
import { orderApi } from './orderApi'

// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

export const resetStore = () => configureStore({
  reducer: {
    orderState: orderReducer,
   [orderApi.reducerPath]: orderApi.reducer
  },
  
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    middleware: getDefault => getDefault().concat(
    orderApi.middleware
  ),
})

export const store = resetStore()
