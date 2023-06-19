import '../css/TryForConfirmPage.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'

const ConfirmationPage = () => {
  const history = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const secret = searchParams.get('secret')

  useEffect(() => {
    axios
      .post('http://localhost:8080/register/confirm', null, {
        params: {
          id: id,
          secret: secret,
        },
      })
      .catch(() => {
        history('/')
      })
  }, [])

  return (
    <div className='confirmation-page'>
      <div className='confirmation-dialog'>
        <h1>Вы подтвердили E-Mail</h1>
        <p className='confirmation-message'>
          <Link to='/'>Вернуться на главную</Link>
        </p>
      </div>
    </div>
  )
}

export default ConfirmationPage
