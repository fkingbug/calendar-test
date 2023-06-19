import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRecoveryPasswordMutation } from '../features/auth/authApiSlice'
import { enqueueSnackbar } from 'notistack'
import { recoveryResolver } from '../utils/recoveryResolver'

export const RecoveryNewPassword = ({ email }) => {
  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: recoveryResolver })

  const onSubmit = handleSubmit(async data => {
    try {
      await recoveryPassword({ email, password: data.password }).unwrap()
      enqueueSnackbar({ variant: 'default', message: 'Удачно' })
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: error?.message })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <TextField
        {...register('password')}
        required
        error={!!errors?.password}
        helperText={errors?.password ? errors?.password?.message : ''}
        fullWidth
        label='Пароль'
        size='small'
        type='password'
        disabled={isLoading}
      />
      <TextField
        {...register('confirmPassword')}
        required
        error={!!errors?.confirmPassword}
        helperText={errors?.confirmPassword ? errors?.confirmPassword?.message : ''}
        fullWidth
        label='Повтороте пароль'
        size='small'
        type='password'
        disabled={isLoading}
      />
      <Button variant='contained' type='submit' disabled={isLoading}>
        Сменить пароль
      </Button>
    </form>
  )
}
