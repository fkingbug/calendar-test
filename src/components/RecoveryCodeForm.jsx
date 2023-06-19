import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Timer } from './Timer'
import { useRecoveryCodeMutation, useRecoveryEmailMutation } from '../features/auth/authApiSlice'
import { enqueueSnackbar } from 'notistack'

export const RecoveryCodeForm = ({ email, handleChangeRecoveryStep }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [time, setTimer] = useState(59)
  const [recoveryEmail, { isLoading }] = useRecoveryEmailMutation()
  const [recoveryCode, { isLoading: isLoadingCode }] = useRecoveryCodeMutation()

  const handleTimer = () => {
    setTimer(time - 1)
  }
  const handleVerifyCode = async data => {
    try {
      await recoveryEmail(data).unwrap()
      handleChangeRecoveryStep()
      enqueueSnackbar({ variant: 'default', message: 'Введите код' })
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: error?.message })
    }
  }
  //-- menya
  const onSubmit = handleSubmit(async data => {
    try {
      await recoveryCode(data, 'email').unwrap()
      handleChangeRecoveryStep()
      enqueueSnackbar({ variant: 'default', message: 'Код верен' })
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
        {...register('recoveryCode')}
        required
        error={!!errors?.email}
        helperText={errors?.email ? errors?.email?.message : ''}
        fullWidth
        label='Введите код, отправленный на почту'
        size='small'
        type='text'
      />
      <Button disabled={isLoadingCode} variant='contained' type='submit'>
        Проверить код
      </Button>
      {time > 0 ? (
        <Timer handleTimer={handleTimer} time={time} />
      ) : (
        <Button disabled={isLoading} variant='contained' onClick={handleVerifyCode}>
          Отправить повторно
        </Button>
      )}
    </form>
  )
}
