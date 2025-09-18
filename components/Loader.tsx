'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useDragControls } from 'framer-motion'
import { getTimeBasedBackground } from '../utils/backgroundUtils'

interface LoaderProps {
  onComplete?: () => void
  duration?: number
}

export default function Loader({ onComplete, duration = 3000 }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showExitAnimation, setShowExitAnimation] = useState(false)
  const [showCurtainEffect, setShowCurtainEffect] = useState(false)
  const [hideCounter, setHideCounter] = useState(false)

  useEffect(() => {
    // Progress animation - much slower and smoother
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Start exit animation when progress reaches 100
          setShowExitAnimation(true)
          // Hide counter after a brief moment
          setTimeout(() => {
            setHideCounter(true)
          }, 500) // 0.5 seconds to show [100]
          // Start curtain effect after name/portfolio exit
          setTimeout(() => {
            setShowCurtainEffect(true)
            // Hide loader after curtain effect completes
            setTimeout(() => {
              setIsVisible(false)
              onComplete?.()
            }, 2000) // 2 seconds for curtain effect
          }, 1000) // 1 second delay for exit animation
          return 100
        }
        return prev + 0.2
      })
    }, duration / 500)

    return () => {
      clearInterval(progressInterval)
    }
  }, [duration, onComplete])


  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background image that will be revealed */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${getTimeBasedBackground()}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* White line that moves through center */}
      <motion.div
        className="absolute w-full h-1 bg-white z-20"
        initial={{ y: '-50vh' }}
        animate={showCurtainEffect ? { y: '50vh' } : { y: '-50vh' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      
      {/* Top curtain */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-black z-30"
        initial={{ height: '50%' }}
        animate={showCurtainEffect ? { height: '0%' } : { height: '50%' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
      />
      
      {/* Bottom curtain */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-black z-30"
        initial={{ height: '50%' }}
        animate={showCurtainEffect ? { height: '0%' } : { height: '50%' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
      />
      
      <div className="flex items-center gap-8 md:gap-12 relative z-40">
        {/* Left - Name */}
        <div className={`sf-pro-font text-white text-lg md:text-xl transition-all duration-1000 ease-in-out ${
          showExitAnimation ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}>
          OHENE GYAN
        </div>
        
        {/* Center - Loader */}
        <div className={`sf-pro-font text-white text-xl md:text-2xl transition-all duration-500 ease-out ${
          hideCounter ? 'opacity-0' : 'opacity-100'
        }`}>
          [{Math.round(progress).toString().padStart(3, '0')}]
        </div>
        
        {/* Right - Portfolio */}
        <div className={`sf-pro-font text-white text-lg md:text-xl transition-all duration-1000 ease-in-out ${
          showExitAnimation ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}>
          PORTFOLIO'25
        </div>
      </div>
    </div>
  )
}
