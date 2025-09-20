'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AppStoreModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function AppStoreModal({ isOpen, onClose, isDarkMode = false }: AppStoreModalProps) {
  const [currentView, setCurrentView] = useState<'discover' | 'arcade' | 'create' | 'work' | 'play' | 'develop' | 'categories' | 'updates'>('discover')

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="relative"
            style={{
              width: '900px',
              height: '600px',
              background: isDarkMode ? '#1C1C1E' : '#FFFFFF',
              borderRadius: '26px',
              boxShadow: isDarkMode 
                ? '0 0 0 1px rgba(255, 255, 255, 0.1), 0 16px 48px rgba(0, 0, 0, 0.5)' 
                : '0 0 0 1px rgba(0, 0, 0, 0.23), 0 16px 48px rgba(0, 0, 0, 0.35)',
              border: 'none'
            }}
          >
            {/* macOS Traffic Light Buttons */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
              {/* Red Close Button */}
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: '#FF383C'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="white"><path d="M6.5 1.5L1.5 6.5M1.5 1.5L6.5 6.5" stroke="white" stroke-width="1" stroke-linecap="round"/></svg>'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.innerHTML = ''
                }}
              />

              {/* Yellow Minimize Button */}
              <button
                className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: '#FEBC2E'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="white"><path d="M1.5 4H6.5" stroke="white" stroke-width="1" stroke-linecap="round"/></svg>'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.innerHTML = ''
                }}
              />

              {/* Green Maximize Button */}
              <button
                className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: '#19C332'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="white"><path d="M1.5 1.5H6.5V6.5H1.5V1.5Z" stroke="white" stroke-width="1" fill="none"/></svg>'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.innerHTML = ''
                }}
              />
            </div>

            {/* Window content */}
            <div className="h-full flex">
              {/* Side Nav Container */}
              <div 
                className="flex flex-col"
                style={{
                  width: '240px',
                  height: '600px'
                }}
              >
                {/* Side Nav */}
                <div 
                  className="relative flex flex-col"
                  style={{
                    width: '224px',
                    height: '584px',
                    margin: '8px',
                    borderRadius: '18px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    filter: 'contrast(1.1) brightness(1.05)',
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    isolation: 'isolate'
                  }}
                >
                  {/* Base layer - 100% fill */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: isDarkMode ? '#2C2C2E' : '#FFFFFF',
                      borderRadius: '18px'
                    }}
                  />
                  
                  {/* Overlay layer - 67% fill */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: isDarkMode ? 'rgba(44, 44, 46, 0.67)' : 'rgba(245, 245, 245, 0.67)',
                      borderRadius: '18px'
                    }}
                  />
                  
                  {/* Side nav content area */}
                  <div className="relative z-10 h-full">
                    {/* Search Bar */}
                    <div className="px-4" style={{ marginTop: '76px' }}>
                      <div 
                        className="flex items-center"
                        style={{
                          width: '192px',
                          height: '28px',
                          borderRadius: '14px',
                          background: 'rgba(247, 247, 247, 0.8)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          boxShadow: `
                            inset 0 1px 0 rgba(255, 255, 255, 0.6),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                            0 2px 8px rgba(0, 0, 0, 0.1)
                          `,
                          isolation: 'isolate',
                          padding: '0 12px',
                          gap: '6px'
                        }}
                      >
                        {/* Magnifying Glass Icon */}
                        <div 
                          className="flex items-center justify-center"
                          style={{
                            width: '12px',
                            height: '12px'
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 16 16" 
                            fill="none"
                          >
                            <path 
                              d="M11.7422 10.3439C12.5322 9.26758 12.9375 7.93848 12.9375 6.46875C12.9375 2.89941 10.0381 0 6.46875 0C2.89941 0 0 2.89941 0 6.46875C0 10.0381 2.89941 12.9375 6.46875 12.9375C7.93848 12.9375 9.26758 12.5322 10.3439 11.7422L14.4141 15.8125C14.8047 16.2031 15.4375 16.2031 15.8281 15.8125C16.2188 15.4219 16.2188 14.7891 15.8281 14.3984L11.7422 10.3439ZM6.46875 11.4375C3.72656 11.4375 1.5 9.21094 1.5 6.46875C1.5 3.72656 3.72656 1.5 6.46875 1.5C9.21094 1.5 11.4375 3.72656 11.4375 6.46875C11.4375 9.21094 9.21094 11.4375 6.46875 11.4375Z" 
                              fill="rgba(0, 0, 0, 0.6)"
                            />
                          </svg>
                        </div>
                        
                        {/* Search Input */}
                        <input 
                          type="text" 
                          placeholder="Search App Store..."
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize: '11px',
                            color: 'rgba(0, 0, 0, 0.6)',
                            width: '100%',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        />
                      </div>
                    </div>

                    
                    {/* Navigation Tabs */}
                    <div className="px-2" style={{ marginTop: '16px' }}>
                      {/* Discover */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        onClick={() => setCurrentView('discover')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'discover') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'discover') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'discover' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'discover') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'discover') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/discover-icon.svg" 
                            alt="Discover"
                            width="16" 
                            height="16"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'discover' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Discover
                          </span>
                        </div>
                      </div>

                      {/* Arcade */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('arcade')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'arcade') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'arcade') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'arcade' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'arcade') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'arcade') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/arcade-icon.svg" 
                            alt="Arcade"
                            width="14" 
                            height="14"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'arcade' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Arcade
                          </span>
                        </div>
                      </div>

                      {/* Create */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('create')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'create') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'create') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'create' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'create') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'create') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/create-icon.svg" 
                            alt="Create"
                            width="12" 
                            height="12"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'create' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Create
                          </span>
                        </div>
                      </div>

                      {/* Work */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('work')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'work') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'work') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'work' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'work') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'work') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/work-icon.svg" 
                            alt="Work"
                            width="12" 
                            height="12"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'work' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Work
                          </span>
                        </div>
                      </div>

                      {/* Play */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('play')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'play') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'play') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'play' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'play') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'play') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          >
                            <path d="M8 5V19L19 12L8 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'play' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Play
                          </span>
                        </div>
                      </div>

                      {/* Develop */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('develop')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'develop') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'develop') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'develop' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'develop') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'develop') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'develop' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Develop
                          </span>
                        </div>
                      </div>

                      {/* Categories */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('categories')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'categories') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'categories') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'categories' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'categories') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'categories') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          >
                            <path d="M3 3h7v7H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 3h7v7h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 14h7v7h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 14h7v7H3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'categories' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Categories
                          </span>
                        </div>
                      </div>

                      {/* Updates */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('updates')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'updates') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'updates') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                          }
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: currentView === 'updates' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'updates') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'updates') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(212deg) brightness(102%) contrast(101%)'
                            }}
                          >
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'updates' ? 'black' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Updates
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div 
                className="flex-1 flex flex-col"
                style={{
                  width: '660px',
                  height: '600px'
                }}
              >
                {/* Top Control Area */}
                <div 
                  className="flex items-center justify-between"
                  style={{
                    width: '660px',
                    height: '52px',
                    padding: '0 24px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Left side - Title */}
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    {/* App Store Title */}
                    <h2 
                      style={{
                        width: '80px',
                        height: '16px',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        lineHeight: '16px',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      App Store
                    </h2>

                    {/* Empty Container */}
                    <div 
                      style={{
                        width: '400px',
                        height: '36px',
                        flexShrink: 1
                      }}
                    />
                  </div>
                </div>

                {/* Main Content */}
                <div 
                  className="flex-1" 
                  style={{ 
                    padding: '16px 24px',
                    overflowY: 'auto',
                    height: '548px',
                    maxHeight: '548px',
                    boxSizing: 'border-box',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {/* Content Placeholder */}
                  <div 
                    className="flex flex-col items-center justify-center h-full"
                    style={{
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <svg 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      style={{
                        marginBottom: '12px',
                        opacity: 0.6
                      }}
                    >
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    App Store Content
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
