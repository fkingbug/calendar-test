import '../css/AuthPage.css'
import { Link } from 'react-router-dom'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { authResolver } from '../utils/index'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { setCredentials } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { enqueueSnackbar } from 'notistack'

const AuthPage = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: authResolver,
  })

  const onSubmit = handleSubmit(async data => {
    try {
      const userData = await login(data).unwrap()
      dispatch(setCredentials({ ...userData }))
      navigate('/', { replace: 'true' })
      enqueueSnackbar({ variant: 'default', message: 'Добро пожаловать' })
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: error?.message })
    }
  })

  return (
    <div className='auth-page'>
      <Paper sx={{ p: 2, width: 300 }}>
        <Typography fontSize={20} textAlign='center'>
          Авторизация
        </Typography>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <TextField
            {...register('login')}
            required
            error={!!errors.login}
            helperText={errors?.login ? errors?.login?.message : ' '}
            type='text'
            fullWidth
            label='E-mail'
            size='small'
            disabled={isLoading}
          />
          <TextField
            {...register('password')}
            required
            error={!!errors?.password}
            helperText={errors?.password ? errors?.password?.message : ' '}
            fullWidth
            label='Пароль'
            size='small'
            type='password'
            disabled={isLoading}
          />
          <Button disabled={isLoading} type='submit' variant='contained'>
            Войти
          </Button>
        </form>
        <Box
          sx={{
            fontSize: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography fontSize={13}>
            Нет аккаунта? <Link to='/registration'>Создайте его!</Link>
          </Typography>
          <Typography fontSize={13}>
            Или <Link to='/recovery'>восстановите</Link> его!
          </Typography>
          <Link to='/'>На главную</Link>
        </Box>
      </Paper>
    </div>
  )
}

export default AuthPage
