import { useEffect } from 'react'

export const Timer = ({ handleTimer, time }) => {
  useEffect(() => {
    const x = setInterval(() => handleTimer(), 1000)
    if (time === 0) {
      clearInterval(x)
    }
    return () => clearInterval(x)
  }, [handleTimer, time])

  return <p style={{ margin: 0 }}>Отправить повторно через {time} сек. </p>
}
