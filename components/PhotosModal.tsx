'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotosModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

interface Photo {
  id: string
  src: string
  alt: string
  title: string
  date: string
}

export default function PhotosModal({ isOpen, onClose, isDarkMode }: PhotosModalProps) {
  // Add CSS to hide scrollbars
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const [photos] = useState<Photo[]>([
    {
      id: '1',
      src: '/images/photo-1.jpg',
      alt: 'Design Work 1',
      title: 'UI Design Exploration',
      date: '2024-01-15'
    },
    {
      id: '2',
      src: '/images/photo-2.jpg',
      alt: 'Design Work 2',
      title: 'Mobile App Interface',
      date: '2024-02-20'
    },
    {
      id: '3',
      src: '/images/photo-3.jpg',
      alt: 'Design Work 3',
      title: 'Web Design Project',
      date: '2024-03-10'
    },
    {
      id: '4',
      src: '/images/photo-4.jpg',
      alt: 'Design Work 4',
      title: 'Brand Identity Design',
      date: '2024-04-05'
    },
    {
      id: '5',
      src: '/images/photo-5.jpg',
      alt: 'Design Work 5',
      title: 'Dashboard Design',
      date: '2024-05-12'
    },
    {
      id: '6',
      src: '/images/photo-6.jpg',
      alt: 'Design Work 6',
      title: 'E-commerce Interface',
      date: '2024-06-18'
    }
  ])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(photos[0])
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeTab, setActiveTab] = useState('Library')
  const [showHiddenMessage, setShowHiddenMessage] = useState(false)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleLibraryClick = () => {
    setShowFavorites(false)
    setActiveTab('Library')
    setShowHiddenMessage(false)
  }

  const handleFavoritesClick = () => {
    if (showFavorites) {
      setShowFavorites(false)
      setActiveTab('Library')
      setShowHiddenMessage(false)
    } else {
      // Create a shuffled array of favorite photos using the static photo files
      const photoFiles = [
        { src: '/images/photo-1.png', alt: 'Photo 1' },
        { src: '/images/photo-2.png', alt: 'Photo 2' },
        { src: '/images/photo-3.png', alt: 'Photo 3' },
        { src: '/images/photo-4.png', alt: 'Photo 4' },
        { src: '/images/photo-5.png', alt: 'Photo 5' },
        { src: '/images/photo-6.png', alt: 'Photo 6' },
        { src: '/images/photo-7.png', alt: 'Photo 7' },
        { src: '/images/photo-8.png', alt: 'Photo 8' },
        { src: '/images/photo-9.png', alt: 'Photo 9' },
        { src: '/images/photo-10.png', alt: 'Photo 10' },
        { src: '/images/photo-11.png', alt: 'Photo 11' },
        { src: '/images/photo-12.png', alt: 'Photo 12' }
      ]
      
      const shuffledFavorites = photoFiles
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(photoFiles.length * 0.7)) // Show about 70% of photos as favorites
        .map((photo, index) => ({
          id: `fav-${index}`,
          src: photo.src,
          alt: photo.alt,
          title: `Favorite ${index + 1}`,
          date: '2024-01-01'
        }))
      
      setFavoritePhotos(shuffledFavorites)
      setShowFavorites(true)
      setActiveTab('Favourites')
      setShowHiddenMessage(false)
    }
  }

  const handleRecentsClick = () => {
    setShowFavorites(false)
    setActiveTab('Recents')
    setShowHiddenMessage(false)
  }

  const handleHiddenClick = () => {
    setShowFavorites(false)
    setActiveTab('Hidden')
    setShowHiddenMessage(true)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
            maxHeight: '600px',
            background: isDarkMode ? '#1C1C1E' : '#FFFFFF',
            borderRadius: '26px',
            boxShadow: isDarkMode 
              ? '0 0 0 1px rgba(255, 255, 255, 0.1), 0 16px 48px rgba(0, 0, 0, 0.5)' 
              : '0 0 0 1px rgba(0, 0, 0, 0.23), 0 16px 48px rgba(0, 0, 0, 0.35)',
            border: 'none',
            overflow: 'hidden'
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
                  {/* Photos Title Container */}
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
                      Photos
                    </h3>
                  </div>
                  
                  {/* Photos Tabs */}
                  <div className="px-2" style={{ marginTop: '2px' }}>
                    {/* Library */}
                    <div 
                      className="flex items-center cursor-pointer transition-colors duration-150"
                      style={{
                        width: '224px',
                        height: '24px',
                        paddingLeft: '6px',
                        marginBottom: '2px'
                      }}
                      onClick={handleLibraryClick}
                      onMouseEnter={(e) => {
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = isDarkMode ? 'white' : 'black'
                      }}
                      onMouseLeave={(e) => {
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'
                      }}
                    >
                      <div 
                        className="flex items-center transition-colors duration-150"
                        style={{
                          width: '204px',
                          height: '24px',
                          borderRadius: '8px',
                          backgroundColor: activeTab === 'Library' ? 'rgba(0, 153, 255, 0.2)' : 'transparent',
                          paddingLeft: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = activeTab === 'Library' ? 'rgba(0, 153, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = activeTab === 'Library' ? 'rgba(0, 153, 255, 0.2)' : 'transparent'
                        }}
                      >
                        <img 
                          src="/images/library.svg" 
                          alt="Library" 
                          width="16" 
                          height="16" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                          }}
                        />
                        <span 
                          style={{
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '11px',
                            fontWeight: '500',
                            color: 'white',
                            marginRight: '10px'
                          }}
                        >
                          Library
                        </span>
                      </div>
                      </div>
                      
                    {/* Favourites */}
                    <div 
                      className="flex items-center cursor-pointer transition-colors duration-150 group"
                        style={{
                        width: '224px',
                        height: '24px',
                        paddingLeft: '6px',
                        marginBottom: '2px'
                      }}
                      onClick={handleFavoritesClick}
                      onMouseEnter={(e) => {
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = isDarkMode ? 'white' : 'black'
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
                          backgroundColor: activeTab === 'Favourites' ? 'rgba(0, 153, 255, 0.2)' : 'transparent',
                          paddingLeft: '8px'
                        }}
                      >
                        <img 
                          src="/images/favorite.svg" 
                          alt="Favourites" 
                          width="14" 
                          height="14" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Favourites
                        </span>
                      </div>
                      </div>
                      
                    {/* Recents */}
                    <div 
                      className="flex items-center cursor-pointer transition-colors duration-150 group"
                      style={{
                        width: '224px',
                        height: '24px',
                        paddingLeft: '6px',
                        marginBottom: '2px'
                      }}
                      onClick={handleRecentsClick}
                      onMouseEnter={(e) => {
                        const span = e.currentTarget.querySelector('span')
                        if (span) span.style.color = isDarkMode ? 'white' : 'black'
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
                          backgroundColor: activeTab === 'Recents' ? 'rgba(0, 153, 255, 0.2)' : 'transparent',
                          paddingLeft: '8px'
                        }}
                      >
                        <img 
                          src="/images/recent-photos.svg" 
                          alt="Recents" 
                          width="14" 
                          height="14" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Recents
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collections Title Container */}
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
                      Collections
                    </h3>
                  </div>

                  {/* Collections Tabs */}
                  <div className="px-2" style={{ marginTop: '2px' }}>
                    {/* Memories */}
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
                          src="/images/memories.svg" 
                          alt="Memories" 
                          width="12" 
                          height="12" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Memories
                        </span>
                      </div>
                    </div>

                    {/* Albums */}
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
                          src="/images/album.svg" 
                          alt="Albums" 
                          width="12" 
                          height="12" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Albums
                        </span>
                        </div>
                      </div>
                      
                    {/* Media Types */}
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
                          src="/images/album.svg" 
                          alt="Media Types" 
                          width="12" 
                          height="12" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Media Types
                        </span>
                      </div>
                    </div>

                    {/* Hidden */}
                    <div 
                      className="flex items-center cursor-pointer transition-colors duration-150 group"
                      style={{
                        width: '224px',
                        height: '24px',
                        paddingLeft: '6px',
                        marginBottom: '2px'
                      }}
                      onClick={handleHiddenClick}
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
                          src="/images/hidden.svg" 
                          alt="Hidden" 
                          width="12" 
                          height="12" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Hidden
                        </span>
                    </div>
                  </div>

                    {/* Recently Deleted */}
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
                          src="/images/recently-deleted.svg" 
                          alt="Recently Deleted" 
                          width="12" 
                          height="12" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Recently Deleted
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sharing Title Container */}
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
                      Sharing
                    </h3>
                        </div>

                  {/* Sharing Tabs */}
                  <div className="px-2" style={{ marginTop: '2px' }}>
                    {/* Shared Albums */}
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
                          src="/images/shared-albums.svg" 
                          alt="Shared Albums" 
                          width="16" 
                          height="16" 
                          style={{ 
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          Shared Albums
                        </span>
                        </div>
                      </div>

                    {/* iCloud Links */}
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
                          src="/images/icloud-links.svg" 
                          alt="iCloud Links" 
                          width="12" 
                          height="12" 
                          style={{
                            marginRight: '4px',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
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
                          iCloud Links
                        </span>
                  </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div 
              className="flex flex-col"
              style={{
                width: '660px',
                height: '600px'
              }}
            >
              {/* Top Control Area */}
              <div 
                className="flex flex-col"
                style={{
                  width: '660px',
                  padding: '0 24px',
                  boxSizing: 'border-box'
                }}
              >
                {/* Title Row */}
                <div 
                  className="flex items-center justify-between"
                  style={{
                    height: '52px'
                }}
              >
                {/* Left side - Title */}
                <div className="flex items-center" style={{ gap: '8px' }}>
                  {/* Photos Title */}
                  <h2 
                    style={{
                      width: '50px',
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
                    Photos
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

                {/* Date Row */}
                <div 
                  className="flex items-center"
                  style={{
                    height: '24px',
                    marginBottom: '8px'
                  }}
                >
                  <div 
                    style={{
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      margin: 0
                    }}
                  >
                    22 Nov 2024 - 11 May 2025
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div 
                className="flex-1" 
                style={{ 
                  padding: '16px 24px',
                  overflowY: 'auto',
                  height: 'calc(100% - 84px)',
                  boxSizing: 'border-box',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {showHiddenMessage ? (
                  /* Hidden Section Message */
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      textAlign: 'center',
                      padding: '20px'
                    }}
                  >
                    <p 
                      style={{
                        fontSize: '14px',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                        margin: '0',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Private content • Authentication required
                    </p>
                  </div>
                ) : showFavorites ? (
                  /* Favorites Grid */
                  <div 
                        style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                    {favoritePhotos.map((photo, index) => {
                      const aspectRatios = ['3/4', '4/3', '3/4', '4/3', '3/4', '4/3', '3/4', '4/3', '3/4', '4/3', '3/4', '4/3']
                      const aspectRatio = aspectRatios[index % aspectRatios.length]
                      
                      return (
                        <div 
                          key={photo.id}
                          style={{
                            aspectRatio: aspectRatio,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <img 
                            src={photo.src} 
                            alt={photo.alt} 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* All Photos Grid */
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                  {/* Photo 1 - Top Left */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '1',
                      gridColumn: '1'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-1.png" 
                      alt="Photo 1" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    </div>

                  {/* Photo 2 - Top Middle */}
                  <div 
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '1',
                      gridColumn: '2'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-2.png" 
                      alt="Photo 2" 
                        style={{
                          width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 3 - Top Right */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '1',
                      gridColumn: '3'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-3.png" 
                      alt="Photo 3" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                      </div>
                      
                  {/* Photo 4 - Second Row Left */}
                      <div 
                        style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '2',
                      gridColumn: '1'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-4.png" 
                      alt="Photo 4" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                      </div>

                  {/* Photo 5 - Second Row Middle (spans 2 rows) */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '2 / 4',
                      gridColumn: '2'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-5.png" 
                      alt="Photo 5" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    </div>

                  {/* Photo 6 - Second Row Right */}
                  <div 
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '2',
                      gridColumn: '3'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-6.png" 
                      alt="Photo 6" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 7 - Third Row Left */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '3',
                      gridColumn: '1'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-7.png" 
                      alt="Photo 7" 
                        style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 8 - Third Row Right */}
                  <div 
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '3',
                      gridColumn: '3'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-8.png" 
                      alt="Photo 8" 
                        style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 9 - Fourth Row Left */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '4',
                      gridColumn: '1'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-9.png" 
                      alt="Photo 9" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    </div>

                  {/* Photo 10 - Fourth Row Right */}
                  <div 
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '4',
                      gridColumn: '3'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-10.png" 
                      alt="Photo 10" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 11 - Fourth Row Middle */}
                  <div 
                    style={{
                      aspectRatio: '3/4',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '4',
                      gridColumn: '2'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-11.png" 
                      alt="Photo 11" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Photo 12 - Fifth Row Left */}
                  <div 
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      gridRow: '5',
                      gridColumn: '1'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img 
                      src="/images/photo-12.png" 
                      alt="Photo 12" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
