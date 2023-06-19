import { configureStore } from '@reduxjs/toolkit'
import { apiSLice } from './api/apiSLice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [apiSLice.reducerPath]: apiSLice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSLice.middleware),
  devTools: true,
})
