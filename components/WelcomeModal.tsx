'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
  onExplore?: () => void
  onWorkWithMe?: () => void
}

export default function WelcomeModal({ isOpen, onClose, isDarkMode = false, onExplore, onWorkWithMe }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for exit animation
  }

  const handleExplore = () => {
    if (onExplore) {
      onExplore()
    }
    handleClose()
  }

  const handleWorkWithMe = () => {
    if (onWorkWithMe) {
      onWorkWithMe()
    }
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30"
          />
        
          {/* Modal */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: isVisible ? 1 : 0.9, 
              opacity: isVisible ? 1 : 0 
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '260px',
              height: '248px',
              borderRadius: '34px',
              background: 'rgba(245, 245, 245, 0.67)',
              backdropFilter: 'blur(20px) saturate(180%)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `
                0 0 1px rgba(0, 0, 0, 0.1),
                0 17px 45px rgba(0, 0, 0, 0.5)
              `,
              // Ensure shadow follows the same corner radius
              WebkitBoxShadow: `
                0 0 1px rgba(0, 0, 0, 0.1),
                0 17px 45px rgba(0, 0, 0, 0.5)
              `,
              // Remove clipPath as it conflicts with border radius
              overflow: 'hidden'
            }}
          >
            {/* Icon Container */}
            <div 
              className="flex items-center"
              style={{
                width: '228px',
                height: '64px',
                marginBottom: '16px',
                justifyContent: 'flex-start'
              }}
            >
              {/* Welcome Icon */}
              <img
                src="/images/welcome-alert-icon.png"
                alt="Welcome Alert"
                style={{
                  width: '64px',
                  height: '64px'
                }}
              />
            </div>

            {/* Content Container */}
            <div 
              style={{
                width: '228px',
                height: '84px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                marginBottom: '16px',
                gap: '10px'
              }}
            >
              {/* Title Container */}
              <div 
                style={{
                  width: '216px',
                  height: '16px',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  lineHeight: '16px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                Hello, User!
              </div>

              {/* Description Container */}
              <div 
                style={{
                  width: '216px',
                  height: '56px',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '11px',
                  fontWeight: '400',
                  lineHeight: '14px',
                  color: 'rgba(0, 0, 0, 0.85)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
              >
                My portfolio is live and ready. Click through to explore the projects. If you&apos;ve already been here and want to connect, send me a mail.
              </div>
            </div>
            
            {/* Buttons Container */}
            <div 
              style={{ 
                width: '228px',
                height: '32px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              {/* Explore Button */}
              <button
                onClick={handleExplore}
                style={{
                  width: '110px',
                  height: '32px',
                  borderRadius: '100px',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'rgba(0, 0, 0, 0.85)',
                  backgroundColor: '#999999',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  // Corner smoothing 60%
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#888888'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#999999'
                }}
              >
                Explore
              </button>

              {/* Work With Me Button */}
              <button
                onClick={handleWorkWithMe}
                style={{
                  width: '110px',
                  height: '32px',
                  borderRadius: '100px',
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  backgroundColor: '#0088FF',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  // Corner smoothing 60%
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0066CC'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0088FF'
                }}
              >
                Work With Me
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
