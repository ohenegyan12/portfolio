'use client'

import { useState, useEffect } from 'react'
import { getTimeBasedBackground } from '../utils/backgroundUtils'

export const useTimeBasedBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>(getTimeBasedBackground())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const getCurrentBackground = (): string => {
    return getTimeBasedBackground()
  }

  const updateBackground = () => {
    const newBackground = getCurrentBackground()
    
    if (newBackground !== backgroundImage) {
      setIsTransitioning(true)
      
      // Small delay to allow transition to start
      setTimeout(() => {
        setBackgroundImage(newBackground)
        setIsTransitioning(false)
      }, 100)
    }
  }

  useEffect(() => {
    // Update every minute to check for time changes
    const interval = setInterval(updateBackground, 60000)

    // Also check when the component mounts to handle immediate changes
    updateBackground()

    return () => clearInterval(interval)
  }, [backgroundImage])

  return {
    backgroundImage,
    isTransitioning
  }
}
