import '../css/TryForConfirmPage.css'

import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

const TryForConfirmationPage = () => {
  const history = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const uuid = searchParams.get('val')

  useEffect(() => {
    axios
      .get('http://192.168.0.67:8080/users/bysecret', {
        params: {
          secret: uuid,
        },
      })
      .then(response => {
        if (response.data.activated) history('/')
      })
      .catch(() => {
        history('/')
      })
  }, [])

  return (
    <div className='confirmation-page'>
      <div className='confirmation-dialog'>
        <h1>Спасибо за регистрацию!</h1>
        <p className='confirmation-message'>
          Мы направили Вам электронное письмо с инструкциями для подтверждения регистрации.
          Пожалуйста, проверьте свою почту и следуйте инструкциям в письме.
        </p>
        <p className='confirmation-message'>
          <Link to='/'>Вернуться на главную</Link>
        </p>
      </div>
    </div>
  )
}

export default TryForConfirmationPage
