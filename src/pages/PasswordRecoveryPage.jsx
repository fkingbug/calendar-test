import '../css/PasswordRecoveryPage.css'
import { useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { RecoveryEmailForm } from '../components/RecoveryEmailForm'
import { RecoveryCodeForm } from '../components/RecoveryCodeForm'
import { RecoveryNewPassword } from '../components/RecoveryNewPassword'

const PasswordRecoveryPage = () => {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')

  const handleChangeRecoveryStep = () => setStep(prev => prev + 1)

  return (
    <div className='container'>
      <Paper sx={{ p: 2, width: 300 }}>
        <Typography fontSize={20} textAlign='center'>
          Восстановление пароля
        </Typography>
        {step === 0 ? (
          <RecoveryEmailForm
            handleChangeRecoveryStep={handleChangeRecoveryStep}
            setEmail={setEmail}
          />
        ) : step === 1 ? (
          <RecoveryCodeForm email={email} handleChangeRecoveryStep={handleChangeRecoveryStep} />
        ) : (
          <RecoveryNewPassword email={email} />
        )}
        <Typography fontSize={13} textAlign='center'>
          <Link to='/'>На главную</Link>
        </Typography>
      </Paper>
    </div>
  )
}

export default PasswordRecoveryPage
