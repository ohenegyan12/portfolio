'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function AboutModal({ isOpen, onClose, isDarkMode = false }: AboutModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className={`relative transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderRadius: '3.67px',
          boxShadow: isDarkMode 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'hidden'
        }}
      >
        {/* Title Bar */}
        <div 
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ 
            backgroundColor: isDarkMode ? '#2C2C2E' : '#AFB0B3',
            borderColor: isDarkMode ? '#3A3A3C' : '#E5E5E5'
          }}
        >
          <h2 
            className="text-lg font-medium"
            style={{ 
              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#374151',
              fontFamily: 'IBM Plex Sans, sans-serif'
            }}
          >
            About Me
          </h2>
          <div className="flex items-center gap-2">
            {/* Minimize Button */}
            <button
              className="flex items-center justify-center transition-colors duration-200"
            >
              <img 
                src="/images/minimize.svg" 
                alt="Minimize" 
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
            
            {/* Maximize Button */}
            <button
              className="flex items-center justify-center transition-colors duration-200"
            >
              <img 
                src="/images/maximize.svg" 
                alt="Maximize" 
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex items-center justify-center transition-colors duration-200"
            >
              <img 
                src="/images/close-button.svg" 
                alt="Close" 
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </button>
          </div>
        </div>

            {/* Content */}
            <div 
              className="p-6 overflow-y-auto scrollbar-hide" 
              style={{ 
                maxHeight: 'calc(80vh - 60px)', 
                minHeight: '400px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                backgroundColor: isDarkMode ? '#1C1C1E' : '#FDFDF8'
              }}
            >
          {/* Logo and Header */}
          <div className="mb-6">
            <div 
              className="w-32 h-32 rounded border mb-4 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('/images/profile-1.jpg')",
                borderColor: '#E5E7EB'
              }}
            />
            <h1 
              className="text-2xl font-bold mb-4"
              style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#000000',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
            >
              What I&apos;m bout.
            </h1>
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4 mb-6">
            <p 
              className="text-base leading-relaxed"
              style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#374151',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
            >
              I started by sketching app ideas in the margins of my notebooks and modding any interface I could get my hands on. When I wasn&apos;t redesigning my home screen, I was on the pitch or glued to a controller—football and video games taught me timing, strategy, and how tiny decisions change outcomes.
            </p>
            
            <p 
              className="text-base leading-relaxed"
              style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#374151',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
            >
              I&apos;m a UI Designer & UI Developer living where pixels meet code. I map flows with empathy, sweat the micro-interactions, and ship clean, maintainable front-end. My favorite part of the job? Watching a rough sketch evolve into something people actually enjoy using.
            </p>
            
            <p 
              className="text-base leading-relaxed"
              style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#374151',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
            >
              Off the clock, you&apos;ll catch me testing new builds, learning from game UI patterns, or playing five-a-side. I&apos;m looking to build simple, bold, human products with teams who care about craft and outcomes.
            </p>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Social Card */}
            <div 
              className="p-4 relative overflow-hidden group"
              style={{ 
                backgroundColor: isDarkMode ? '#2C2C2E' : '#F7F7F9',
                borderRadius: '32px',
                height: '240px',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {/* Liquid Fill Overlay */}
              <div 
                className="absolute inset-0 bg-black rounded-[32px] transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out overflow-hidden"
                style={{ 
                  borderRadius: '32px',
                  transformOrigin: 'calc(100% - 20px) 20px'
                }}
              >
                {/* Wave Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                    animation: 'wave 1.5s ease-in-out infinite',
                    width: '200%',
                    height: '100%',
                    left: '-100%'
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    animation: 'wave 1.5s ease-in-out infinite 0.3s',
                    width: '200%',
                    height: '100%',
                    left: '-100%'
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
              <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: "url('/images/profile-1.jpg')"
                    }}
                  />
                <div>
                  <div 
                    className="font-semibold transition-colors duration-300"
                    style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#000000',
                      fontFamily: 'IBM Plex Sans, sans-serif'
                    }}
                  >
                    <span className="group-hover:text-white">OGK</span>
                  </div>
                  <div 
                    className="text-sm transition-colors duration-300"
                    style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : '#6B7280',
                      fontFamily: 'IBM Plex Sans, sans-serif'
                    }}
                  >
                    <span className="group-hover:text-white">@Ohene_Gyan10</span>
                  </div>
                </div>
                 <div 
                   className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ backgroundColor: '#000000' }}
                 >
                   <img
                     src="/images/x-logo.svg"
                     alt="X (Twitter)"
                     className="w-4 h-4"
                     style={{ filter: 'brightness(0) invert(1)' }}
                   />
                 </div>
              </div>
              <p 
                className="text-lg mb-8 transition-colors duration-300 group-hover:text-white"
                style={{ 
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#374151',
                  fontFamily: 'IBM Plex Sans, sans-serif'
                }}
              >
                building ui • <span className="transition-colors duration-300 group-hover:text-white" style={{ color: '#1DA1F2' }}>@figma</span> <span className="transition-colors duration-300 group-hover:text-white" style={{ color: '#1DA1F2' }}>@framer</span> <span className="transition-colors duration-300 group-hover:text-white" style={{ color: '#1DA1F2' }}>@react</span> <span className="transition-colors duration-300 group-hover:text-white" style={{ color: '#1DA1F2' }}>@tailwind</span>
              </p>
              
              {/* Button */}
              <button
                className="w-full py-3 px-4 rounded-full font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#000000',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.9)' : '2px solid #000000'
                }}
              >
                Read my tweets
              </button>
              </div>
            </div>

            {/* Photo Card */}
            <div 
              className="p-4 border relative overflow-hidden"
              style={{ 
                backgroundColor: isDarkMode ? '#2C2C2E' : '#F9FAFB',
                borderColor: isDarkMode ? '#3A3A3C' : '#E5E7EB',
                borderRadius: '32px'
              }}
            >
              {/* Shuffling Images */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/shuffle-1.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: 'shuffleImages 12s ease-in-out infinite'
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/shuffle-2.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: 'shuffleImages 12s ease-in-out infinite 4s'
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/shuffle-3.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: 'shuffleImages 12s ease-in-out infinite 8s'
                  }}
                />
              </div>
              {/* Top Right Icon */}
              <div 
                className="absolute top-3 right-2 w-12 h-12 rounded flex items-center justify-center"
              >
                <img
                  src="/images/photos-shuffle.png"
                  alt="Photos Shuffle"
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
