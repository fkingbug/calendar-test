import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: null, token: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
    },
    logOut: () => initialState,
  },
})

export const { logOut, setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
