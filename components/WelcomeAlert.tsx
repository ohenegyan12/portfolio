'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface WelcomeAlertProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function WelcomeAlert({ isOpen, onClose, isDarkMode = false }: WelcomeAlertProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onClose()
        }, 300) // Wait for exit animation
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ 
            x: isVisible ? 0 : '100%', 
            opacity: isVisible ? 1 : 0 
          }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5
          }}
          className="fixed top-20 right-6 z-50"
        >
          <div 
            className="relative"
            style={{
              width: '344px',
              height: '72px',
              background: isDarkMode 
                ? 'rgba(60, 60, 60, 0.67)' 
                : 'rgba(255, 255, 255, 0.67)',
              borderRadius: '16px',
              boxShadow: isDarkMode
                ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
                : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(80px)',
              border: 'none',
              // Gradient with specified colors
              backgroundImage: isDarkMode
                ? 'linear-gradient(180deg, rgba(60, 60, 60, 0.67) 0%, rgba(60, 60, 60, 0.67) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.67) 0%, rgba(255, 255, 255, 0.67) 100%)',
              position: 'relative',
              isolation: 'isolate'
            }}
          >
            {/* Subtle highlight overlay */}
            <div 
              className="absolute inset-0 rounded-16 pointer-events-none"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%)'
                  : 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 30%)',
                borderRadius: '16px'
              }}
            />

            {/* Content */}
            <div className="px-4 py-2 relative z-10 h-full flex items-start" style={{ gap: '13px' }}>
              {/* Left side - Alert badge */}
              <img 
                src="/images/alert-badge.png" 
                alt="Alert Badge" 
                className="w-8 h-8"
              />

              {/* Middle - Content */}
              <div className="flex-1">
                <h3 
                  className="text-sm mb-1"
                  style={{
                    color: isDarkMode ? '#E5E5E7' : '#1D1D1F',
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '700'
                  }}
                >
                  OGK STUDIOS
                </h3>
                <p 
                  className="text-xs leading-tight"
                  style={{
                    color: isDarkMode ? '#E5E5E7' : '#1D1D1F',
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '400'
                  }}
                >
                  You're in. Look around to discover my work.
                </p>
              </div>

              {/* Right side - Time indicator */}
              <span 
                className="text-xs"
                style={{
                  color: isDarkMode ? '#8E8E93' : '#86868B',
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: '400'
                }}
              >
                now
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
