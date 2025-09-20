'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MapsWindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function MapsWindow({ isOpen, onClose, isDarkMode = false }: MapsWindowProps) {
  const [searchInput, setSearchInput] = useState('')
  const [currentLocation, setCurrentLocation] = useState('Current Location')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [currentView, setCurrentView] = useState<'home' | 'favorites'>('home')

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSelectedLocation(searchInput)
      setSearchInput('')
    }
  }

  const popularLocations = [
    'Times Square, New York',
    'Golden Gate Bridge, San Francisco',
    'Eiffel Tower, Paris',
    'Big Ben, London',
    'Sydney Opera House, Sydney',
    'Tokyo Tower, Tokyo',
    'Colosseum, Rome',
    'Christ the Redeemer, Rio de Janeiro'
  ]

  const recentSearches = [
    'Central Park, New York',
    'Hollywood Sign, Los Angeles',
    'Space Needle, Seattle'
  ]

  const favoriteLocations = [
    'Home',
    'Work',
    'Gym',
    'Coffee Shop'
  ]

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
                    {/* Maps Title Container */}
                    <div 
                      className="flex items-center"
                      style={{
                        width: '224px',
                        height: '34px',
                        paddingLeft: '18px',
                        paddingTop: '76px',
                        paddingBottom: '11px',
                        paddingRight: '12px'
                      }}
                    >
                      <h3 
                        className="text-left"
                        style={{
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                          fontSize: '11px',
                          fontWeight: '700',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          margin: 0
                        }}
                      >
                        Maps
                      </h3>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* Home */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        onClick={() => setCurrentView('home')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'home') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'home') {
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
                            backgroundColor: currentView === 'home' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'home') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'home') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          >
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'home' ? 'white' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Home
                          </span>
                        </div>
                      </div>

                      {/* Favorites */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => setCurrentView('favorites')}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'favorites') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'favorites') {
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
                            backgroundColor: currentView === 'favorites' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'favorites') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'favorites') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <svg 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          >
                            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'favorites' ? 'white' : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Favorites
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Library Title Container */}
                    <div 
                      className="flex items-center"
                      style={{
                        width: '224px',
                        height: '34px',
                        paddingLeft: '18px',
                        paddingTop: '24px',
                        paddingBottom: '11px',
                        paddingRight: '12px'
                      }}
                    >
                      <h3 
                        className="text-left"
                        style={{
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                          fontSize: '11px',
                          fontWeight: '700',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          margin: 0
                        }}
                      >
                        Library
                      </h3>
                    </div>
                    
                    {/* Library Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* Recent Searches */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                        }}
                        onMouseLeave={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          >
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Recent Searches
                          </span>
                        </div>
                      </div>

                      {/* Saved Places */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                        }}
                        onMouseLeave={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          >
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Saved Places
                          </span>
                        </div>
                      </div>

                      {/* Directions */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                        }}
                        onMouseLeave={(e) => {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          >
                            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Directions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div 
                className="flex-1 flex"
                style={{
                  width: '660px',
                  height: '600px'
                }}
              >

                {/* Map Area */}
                <div 
                  className="flex-1"
                  style={{
                    width: '660px',
                    height: '584px',
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    margin: '8px 8px 8px 0'
                  }}
                >
                  {/* Map Placeholder */}
                  <div 
                    className="flex flex-col items-center justify-center"
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
                    Map View
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
