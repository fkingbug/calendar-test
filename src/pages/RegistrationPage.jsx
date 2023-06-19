import '../css/RegistrationPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { registrationResolver } from '../utils'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../features/auth/authApiSlice'
import { setCredentials } from '../features/auth/authSlice'
import { enqueueSnackbar } from 'notistack'

const RegistrationPage = () => {
  const [registration, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: registrationResolver,
  })

  const onSubmit = handleSubmit(async data => {
    try {
      const userData = await registration(data).unwrap()
      dispatch(setCredentials(userData))
      navigate('/', { replace: 'true' })
      enqueueSnackbar({ variant: 'default', message: 'Добро пожаловать' })
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: error?.message })
    }
  })

  return (
    <div className='register-page'>
      <Paper sx={{ p: 2, width: 300 }}>
        <Typography fontSize={20} textAlign='center'>
          Регистрация
        </Typography>
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
            disabled={isLoading}
          />
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
          <TextField
            {...register('lastname')}
            required
            error={!!errors?.lastname}
            helperText={errors?.lastname ? errors?.lastname?.message : ''}
            fullWidth
            label='Фамилия'
            size='small'
            type='text'
            disabled={isLoading}
          />
          <TextField
            {...register('name')}
            required
            error={!!errors?.name}
            helperText={errors?.name ? errors?.name?.message : ''}
            fullWidth
            label='Имя'
            size='small'
            type='text'
            disabled={isLoading}
          />

          <TextField
            {...register('surname')}
            required
            error={!!errors?.surname}
            helperText={errors?.surname ? errors?.surname?.message : ''}
            fullWidth
            label='Отчество'
            size='small'
            type='text'
            disabled={isLoading}
          />

          <Button type='submit' variant='contained' disabled={isLoading}>
            Зарегистрироваться
          </Button>
        </form>
        <Typography fontSize={13} textAlign='center'>
          Уже есть аккаунт? ? <Link to='/auth'>Войдите</Link>
        </Typography>
      </Paper>
    </div>
  )
}

export default RegistrationPage
