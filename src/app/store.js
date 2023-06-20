import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { apiSLice } from './api/apiSLice'
import authReducer from '../features/auth/authSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  [apiSLice.reducerPath]: apiSLice.reducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSLice.middleware),
    devTools: true,
  })

  const persistor = persistStore(store)

  return { store, persistor }
}

export const { store, persistor } = createStore()
