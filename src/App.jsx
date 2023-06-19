import '../src/css/App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import ConfirmationPage from './pages/ConfirmPage'
import TryForConfirmationPage from './pages/TryForConfirmPage'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage'
import AuthPage from './pages/AuthPage'
import NotFound from './pages/NotFoundPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProfileButton />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/registration/confirm' element={<ConfirmationPage />} />
        {/*<Route path="/tryforconfirm/:uuid" element={<TryForConfirmPage />} />*/}
        <Route path='/tryforconfirm' element={<TryForConfirmationPage />} />
        <Route path='/recovery' element={<PasswordRecoveryPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const ProfileButton = () => {
  const handleClick = () => {
    window.location.href = '/auth'
  }

  return (
    <div className='profile-button'>
      <button className='profile-button-item' onClick={handleClick}>
        Профиль
      </button>
    </div>
  )
}

export default App
