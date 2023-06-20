import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.0.67:8080/',
  credentials: 'include',
  mode: 'no-cors',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    // headers.set('Accept', '*/*')
    headers.set('content-type', 'application/json; charset=utf-8')
    // console.log(headers.has('content-type'))
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSLice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
