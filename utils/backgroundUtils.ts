/**
 * Utility functions for time-based background management
 */

export const getTimeBasedBackground = (date: Date = new Date()): string => {
  const hour = date.getHours()
  
  // Day time: 6 AM to 5:59 PM (6:00 to 17:59)
  if (hour >= 6 && hour < 18) {
    return '/images/background.jpg'
  }
  // Night time: 6 PM to 5:59 AM (18:00 to 5:59)
  else {
    return '/images/background-night.jpg'
  }
}

export const getTimeOfDay = (date: Date = new Date()): 'day' | 'night' => {
  const hour = date.getHours()
  return (hour >= 6 && hour < 18) ? 'day' : 'night'
}

export const getNextTransitionTime = (date: Date = new Date()): Date => {
  const hour = date.getHours()
  const nextTransition = new Date(date)
  
  if (hour >= 6 && hour < 18) {
    // Currently day time, next transition is at 6 PM
    nextTransition.setHours(18, 0, 0, 0)
  } else {
    // Currently night time, next transition is at 6 AM
    nextTransition.setHours(6, 0, 0, 0)
    // If it's past midnight, add a day
    if (hour >= 0 && hour < 6) {
      nextTransition.setDate(nextTransition.getDate() + 1)
    }
  }
  
  return nextTransition
}
