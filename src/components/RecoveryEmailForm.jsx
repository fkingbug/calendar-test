import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRecoveryEmailMutation } from '../features/auth/authApiSlice'
import { enqueueSnackbar } from 'notistack'

export const RecoveryEmailForm = ({ handleChangeRecoveryStep, setEmail }) => {
  const [recoveryEmail, { isLoading }] = useRecoveryEmailMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    try {
      await recoveryEmail(data).unwrap()
      handleChangeRecoveryStep()
      setEmail(data.email)
      enqueueSnackbar({ variant: 'default', message: 'Введите код' })
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
        {...register('email')}
        required
        error={!!errors?.email}
        helperText={errors?.email ? errors?.email?.message : ''}
        fullWidth
        label='E-mail'
        size='small'
        type='email'
        disabled={isLoading}
      />
      <Button variant='contained' type='submit' disabled={isLoading}>
        Восстановить
      </Button>
    </form>
  )
}
