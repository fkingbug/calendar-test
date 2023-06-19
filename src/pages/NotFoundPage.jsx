import '../css/NotFoundPage.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='base'>
      <h1>Страница не найдена</h1>
      <p>Извините, срок действия запрошенной страницы истёк или она не существует.</p>
      <p>
        <Link to='/'>Вернуться на главную</Link>
      </p>
    </div>
  )
}

export default NotFound
