import { useState, useEffect } from 'react'

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timerId)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="timer">
      <h3>Kalan Süre: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
    </div>
  )
}

export default Timer