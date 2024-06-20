export const timeToDate = (time) => {
  const date = new Date()
  date.setHours(parseInt(time / 60), time % 60, 0)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

export const calculateDuration = (record, dateTimeCombined = false) => {
  const startDay = formatDate(record?.starts_at, 'date')
  const endDay = formatDate(record?.ends_at, 'date')
  const sameDay = startDay === endDay
  if (dateTimeCombined) {
    const first = sameDay ? startDay : formatDate(record?.starts_at, 'datetime')
    const second = sameDay ? `${formatDate(record?.ends_at, 'time')} - ${formatDate(record?.ends_at, 'time')}` : formatDate(record?.ends_at, 'datetime')
    return [
      first,
      second
    ]
  }

  const dayDuration = sameDay ? startDay : `${startDay} - ${endDay}`
  return [
    `${dayDuration}`,
    `${formatDate(record?.starts_at, 'time')} - ${formatDate(record?.ends_at, 'time')}`
  ]
}

export const dateToTime = (dateString) => {
  const date = new Date(dateString)
  return date.getHours() * 60 + date.getMinutes()
}

export const concatTimeWithDate = (dateString, time) => {
  const date = new Date(dateString)
  date.setHours(time / 60)
  date.setMinutes(time % 60)
  return date
}

export const betweenDates = (startDate, endDate) => {
  if (!startDate || !endDate) return []
  if (startDate > endDate) return []

  const start = new Date(startDate)
  const end = new Date(endDate)

  // Ensure the start date is before or equal to the end date
  if (start > end) {
    throw new Error('Start date must be before or equal to end date')
  }

  const dates = new Set() // Using Set to avoid duplicate dates
  const currentDate = new Date(start)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate <= end) {
    dates.add(formatDate(currentDate, 'no'))
    currentDate.setDate(currentDate.getDate() + 1)
    currentDate.setHours(0, 0, 0, 0)
  }
  dates.add(formatDate(end, 'no'))

  return Array.from(dates)
}

export const formatDate = (dateString, view = 'datetime') => {
  if (!dateString) return null

  const date = new Date(dateString) // Convert string to Date object
  let options = { timeZone: 'Asia/Karachi' }
  let locale = 'en-US'

  if (view.includes('date')) {
    options = {
      ...options,
      ...{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  }

  if (view.includes('time')) {
    options = {
      ...options,
      ...{
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }

  if (view.includes('sec')) {
    options = {
      ...options,
      ...{
        second: 'numeric'
      }
    }
  }

  if (view.includes('tmz')) {
    options = {
      ...options,
      ...{
        timeZoneName: 'short'
      }
    }
  }

  if (view.includes('-')) {
    options = {
      ...options,
      ...{
        hourCycle: 'h23'
      }
    }
  }

  if (view.includes('no')) {
    options = { timeZone: 'Asia/Karachi' }
    locale = 'en-CA'
  }

  return new Intl.DateTimeFormat(locale, options).format(date)
}
