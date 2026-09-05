import { useEffect, useState } from 'react'

const calculateTimeDifference = (startDate) => {
  const now = new Date()
  const start = new Date(startDate)

  const seconds = Math.floor((now - start) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let remainingDays = now.getDate() - start.getDate()

  if (remainingDays < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    remainingDays += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return {
    years,
    months,
    days: remainingDays,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  }
}

export function useRelationshipTimer() {
  const [timeData, setTimeData] = useState({
    conocidos: calculateTimeDifference('2024-03-21T00:00:00'),
    pololeando: calculateTimeDifference('2024-04-10T00:00:00'),
  })

  useEffect(() => {
    const updateTime = () => {
      setTimeData({
        conocidos: calculateTimeDifference('2024-03-21T00:00:00'),
        pololeando: calculateTimeDifference('2024-04-10T00:00:00'),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return timeData
}
