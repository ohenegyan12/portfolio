'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Apple Music Window Component

interface AppleMusicWindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function AppleMusicWindow({ isOpen, onClose, isDarkMode = false }: AppleMusicWindowProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSong, setSelectedSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  const musicData = [
    {
      id: 1,
      cover: '/images/cover-image-1.png',
      coverSelected: '/images/cover-image-1-selected.png',
      title: 'Habit (feat. Medikal) - Single',
      artist: 'Fameye',
      genre: 'HIP POP',
      year: '2025'
    },
    {
      id: 2,
      cover: '/images/cover-image-2.png',
      coverSelected: '/images/cover-image-2-selected.png',
      title: 'Tracking You - Single',
      artist: 'Oseikrom Sikanii',
      genre: 'HIP POP',
      year: '2024'
    },
    {
      id: 3,
      cover: '/images/cover-image-3.png',
      coverSelected: '/images/cover-image-3-selected.png',
      title: 'DLVR ft. Tml Vibez',
      artist: 'Lasmid',
      genre: 'HIP POP',
      year: '2024'
    },
    {
      id: 4,
      cover: '/images/cover-image-4.png',
      coverSelected: '/images/cover-image-4-selected.png',
      title: 'Off White Fow',
      artist: 'Kwaku DMC',
      genre: 'HIP POP',
      year: '2024'
    },
    {
      id: 5,
      cover: '/images/cover-image-1.png',
      coverSelected: '/images/cover-image-1-selected.png',
      title: 'Habit (feat. Medikal) - Single',
      artist: 'Fameye',
      genre: 'HIP POP',
      year: '2025'
    },
    {
      id: 6,
      cover: '/images/cover-image-2.png',
      coverSelected: '/images/cover-image-2-selected.png',
      title: 'Tracking You - Single',
      artist: 'Oseikrom Sikanii',
      genre: 'HIP POP',
      year: '2024'
    },
    {
      id: 7,
      cover: '/images/cover-image-3.png',
      coverSelected: '/images/cover-image-3-selected.png',
      title: 'DLVR ft. Tml Vibez',
      artist: 'Lasmid',
      genre: 'HIP POP',
      year: '2024'
    },
    {
      id: 8,
      cover: '/images/cover-image-4.png',
      coverSelected: '/images/cover-image-4-selected.png',
      title: 'Off White Fow',
      artist: 'Kwaku DMC',
      genre: 'HIP POP',
      year: '2024'
    }
  ]

  const filteredMusic = musicData.filter(music => 
    music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    music.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCardClick = (music: any) => {
    setSelectedSong(music)
  }

  const handleBackToGrid = () => {
    // Stop any playing audio when going back to grid
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
    setIsPlaying(false)
    setSelectedSong(null)
  }

  const handlePlaySong = () => {
    if (selectedSong?.id === 1) { // Fameye - Habit song
      if (isPlaying && currentAudio) {
        // Pause the current audio
        currentAudio.pause()
        setIsPlaying(false)
      } else {
        // Stop any existing audio
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        
        // Play new audio
        const audio = new Audio('/songs/habit.mp3')
        setCurrentAudio(audio)
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error('Error playing audio:', error)
        })
        
        // Handle when audio ends
        audio.onended = () => {
          setIsPlaying(false)
          setCurrentAudio(null)
        }
      }
    } else if (selectedSong?.id === 2) { // Oseikrom Sikanii - Tracking You song
      if (isPlaying && currentAudio) {
        // Pause the current audio
        currentAudio.pause()
        setIsPlaying(false)
      } else {
        // Stop any existing audio
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        
        // Play new audio
        const audio = new Audio('/songs/tracking-you.mp3')
        setCurrentAudio(audio)
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error('Error playing audio:', error)
        })
        
        // Handle when audio ends
        audio.onended = () => {
          setIsPlaying(false)
          setCurrentAudio(null)
        }
      }
    } else if (selectedSong?.id === 3) { // Lasmid - DLVR song
      if (isPlaying && currentAudio) {
        // Pause the current audio
        currentAudio.pause()
        setIsPlaying(false)
      } else {
        // Stop any existing audio
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        
        // Play new audio
        const audio = new Audio('/songs/dlvr.mp3')
        setCurrentAudio(audio)
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error('Error playing audio:', error)
        })
        
        // Handle when audio ends
        audio.onended = () => {
          setIsPlaying(false)
          setCurrentAudio(null)
        }
      }
    } else if (selectedSong?.id === 4) { // Kwaku DMC - Off White Fow song
      if (isPlaying && currentAudio) {
        // Pause the current audio
        currentAudio.pause()
        setIsPlaying(false)
      } else {
        // Stop any existing audio
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        
        // Play new audio
        const audio = new Audio('/songs/off-white-flow.mp3')
        setCurrentAudio(audio)
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error('Error playing audio:', error)
        })
        
        // Handle when audio ends
        audio.onended = () => {
          setIsPlaying(false)
          setCurrentAudio(null)
        }
      }
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
                  backgroundColor: '#FF736A'
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
                  
                  {/* Glass reflection overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 70%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
                      borderRadius: '18px'
                    }}
                  />
                  
                  {/* Side nav content area */}
                  <div className="relative z-10 h-full">
                    {/* Favourites Title Container */}
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
                        Apple Music
                      </h3>
                    </div>
                    
                    {/* Favorites Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* Recent */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        onClick={handleBackToGrid}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                      >
                        <div 
                          className="flex items-center transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.11)',
                            paddingLeft: '8px'
                          }}
                        >
                          <img 
                            src="/images/apple-music-window-home.svg" 
                            alt="Home" 
                            width="16" 
                            height="16" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Home
                          </span>
                        </div>
                      </div>

                      {/* New */}
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
                          <img 
                            src="/images/new-icon.svg" 
                            alt="New" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          />
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
                            New
                          </span>
                        </div>
                      </div>

                      {/* Radio */}
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
                          <img 
                            src="/images/radio-icon.svg" 
                            alt="Radio" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          />
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
                            Radio
                          </span>
                        </div>
                      </div>

                      {/* Playlist */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px'
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
                          <img 
                            src="/images/playlist-icon.svg" 
                            alt="Playlist" 
                            width="12" 
                            height="12" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(84%) contrast(84%)'
                            }}
                          />
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
                            Playlist
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
                  height: '548px'
                }}
              >
                {/* Top Control Area */}
                <div 
                  className="flex items-center justify-between"
                  style={{
                    width: '660px',
                    height: '52px'
                  }}
                >
                  {/* Left side - Title and empty container */}
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    {/* Apple Music Title */}
                    <h2 
                      style={{
                        width: '100px',
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
                      Apple Music
                    </h2>

                    {/* Empty Container */}
                    <div 
                      style={{
                        width: '405px',
                        height: '36px'
                      }}
                    />

                    {/* Search Container */}
                    <div 
                      className="flex items-center"
                      style={{
                        width: '130px',
                        height: '36px',
                        borderRadius: '18px',
                        background: 'rgba(247, 247, 247, 0.8)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
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
                          width: '16px',
                          height: '16px'
                        }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
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
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '12px',
                          color: 'rgba(0, 0, 0, 0.6)',
                          width: '100%',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {selectedSong ? (
                    /* Detailed Song View */
                    <div className="flex flex-col justify-start h-full p-8">
                      <div className="flex items-start gap-8 w-full">
                        {/* Album Art */}
                        <div className="relative">
                          <img 
                            src={selectedSong.coverSelected} 
                            alt="Album Cover" 
                            style={{
                              width: '142px',
                              height: '142px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                            }}
                          />
                        </div>
                        
                        {/* Song Details */}
                        <div className="flex flex-col justify-start" style={{ minWidth: '400px' }}>
                          <h1 
                            style={{
                              fontSize: '20px',
                              fontWeight: '600',
                              color: isDarkMode ? 'white' : 'black',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              margin: '0 0 4px 0',
                              lineHeight: '1.1'
                            }}
                          >
                            {selectedSong.title}
                          </h1>
                          
                          <h2 
                            style={{
                              fontSize: '20px',
                              fontWeight: '400',
                              color: '#FF6B9D',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              margin: '0 0 4px 0'
                            }}
                          >
                            {selectedSong.artist}
                          </h2>
                          
                          <p 
                            style={{
                              fontSize: '15px',
                              fontWeight: '600',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              margin: '0 0 32px 0'
                            }}
                          >
                            {selectedSong.genre} · {selectedSong.year}
                          </p>
                          
                          {/* Play Button */}
                          <button
                            onClick={handlePlaySong}
                            style={{
                              backgroundColor: '#D60017',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3.51px',
                              width: '60px',
                              height: '24px',
                              fontSize: '10px',
                              fontWeight: '600',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'flex-start',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#B80014'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#D60017'
                            }}
                          >
                            {isPlaying ? (
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                                <path d="M2 2H6V14H2V2Z"/>
                                <path d="M10 2H14V14H10V2Z"/>
                              </svg>
                            ) : (
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                                <path d="M3 2L13 8L3 14V2Z"/>
                              </svg>
                            )}
                            {isPlaying ? 'Pause' : 'Play'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Music Grid View */
                    <div className="flex flex-wrap" style={{ gap: '16px' }}>
                      {filteredMusic.length > 0 ? (
                        filteredMusic.map((music) => (
                          <div 
                            key={music.id}
                            className="music-card"
                            onClick={() => handleCardClick(music)}
                            style={{
                              width: '150px',
                              height: '180px',
                              borderRadius: '8px',
                              backgroundColor: 'rgba(0, 0, 0, 0.2)',
                              display: 'flex',
                              flexDirection: 'column',
                              overflow: 'hidden',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)'
                            }}
                          >
                            {/* Cover Image */}
                            <img 
                              src={music.cover} 
                              alt="Cover" 
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: '8px 8px 0 0',
                                display: 'block'
                              }}
                            />
                            
                            {/* Card Content */}
                            <div 
                              style={{
                                width: '100%',
                                height: '30px',
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontWeight: '500',
                                borderRadius: '0 0 8px 8px',
                                padding: '4px',
                                lineHeight: '1.2'
                              }}
                            >
                              <div style={{ fontSize: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                {music.title}
                              </div>
                              <div style={{ fontSize: '9px', textAlign: 'center' }}>
                                {music.artist}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div 
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            marginTop: '50px'
                          }}
                        >
                          No songs found matching "{searchTerm}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
