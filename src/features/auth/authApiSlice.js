import { apiSLice } from '../../app/api/apiSLice'

export const authApiSLice = apiSLice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    recoveryEmail: builder.mutation({
      query: data => ({
        url: '/recovery',
        method: 'POST',
        body: data,
      }),
    }),
    recoveryCode: builder.mutation({
      query: (data, url) => ({
        url: `/recovery/${url}`,
        method: 'POST',
        body: data,
      }),
    }),
    recoveryPassword: builder.mutation({
      query: data => ({
        url: `recovery/newpass`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRecoveryEmailMutation,
  useRecoveryCodeMutation,
  useRecoveryPasswordMutation,
} = authApiSLice
