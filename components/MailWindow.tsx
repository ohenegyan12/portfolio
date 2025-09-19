'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mail Window Component

interface MailWindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

interface Email {
  id: number
  from: string
  subject: string
  preview: string
  time: string
  isRead: boolean
  isImportant: boolean
}

export default function MailWindow({ isOpen, onClose, isDarkMode = false }: MailWindowProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [currentView, setCurrentView] = useState<'inbox' | 'sent' | 'drafts' | 'vips' | 'flagged' | 'remind' | 'sendLater' | 'icloudInbox' | 'icloudDrafts' | 'icloudSent' | 'car' | 'pets' | 'vacation' | 'shopping' | 'junk' | 'trash'>('inbox')
  const [isComposing, setIsComposing] = useState(false)
  const [composeData, setComposeData] = useState({
    to: '',
    from: '',
    subject: '',
    body: ''
  })

  const emails: Email[] = [
    {
      id: 1,
      from: 'Ohene Gyan · Designer–Developer',
      subject: 'Welcome to my portfolio',
      preview: '1 new message — open to begin the experience',
      time: '7:35 PM',
      isRead: false,
      isImportant: false
    }
  ]

  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email)
    // Mark as read when opened
    if (!email.isRead) {
      email.isRead = true
    }
  }

  const handleBackToInbox = () => {
    setSelectedEmail(null)
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
              width: '1200px',
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
                    {/* Favorites Title Container */}
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
                        Favorites
                      </h3>
                    </div>
                    
                    {/* Favorites Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* All Inboxes */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        onClick={() => {
                          setCurrentView('inbox')
                          handleBackToInbox()
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'inbox') {
                            const span = e.currentTarget.querySelector('span')
                            if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'inbox') {
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
                            backgroundColor: currentView === 'inbox' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'inbox') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'inbox') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/all-inboxes.svg" 
                            alt="All Inboxes" 
                            width="16" 
                            height="16" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'inbox' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            All Inboxes
                          </span>
                        </div>
                      </div>

                      {/* VIPs */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('vips')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'vips') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'vips') {
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
                            backgroundColor: currentView === 'vips' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'vips') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'vips') {
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
                              marginRight: '4px'
                            }}
                          >
                            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="#FFE400" strokeWidth="2" fill="none"/>
                          </svg>
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'vips' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            VIPs
                          </span>
                        </div>
                      </div>

                      {/* All Sent */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('sent')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'sent') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'sent') {
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
                            backgroundColor: currentView === 'sent' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'sent') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'sent') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/all-sent.svg" 
                            alt="All Sent" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'sent' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            All Sent
                          </span>
                        </div>
                      </div>

                      {/* Flagged */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('flagged')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'flagged') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'flagged') {
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
                            backgroundColor: currentView === 'flagged' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'flagged') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'flagged') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/flagged.svg" 
                            alt="Flagged" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'flagged' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Flagged
                          </span>
                        </div>
                      </div>

                      {/* Remind Me */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('remind')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'remind') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'remind') {
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
                            backgroundColor: currentView === 'remind' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'remind') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'remind') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/remind-me.svg" 
                            alt="Remind Me" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'remind' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Remind Me
                          </span>
                        </div>
                      </div>

                      {/* Send Later */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('sendLater')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'sendLater') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'sendLater') {
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
                            backgroundColor: currentView === 'sendLater' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'sendLater') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'sendLater') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/send-later.svg" 
                            alt="Send Later" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'sendLater' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Send Later
                          </span>
                        </div>
                      </div>

                      {/* All Drafts */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('drafts')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'drafts') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'drafts') {
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
                            backgroundColor: currentView === 'drafts' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'drafts') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'drafts') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/all-drafts.svg" 
                            alt="All Drafts" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'drafts' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            All Drafts
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* iCloud Title Container */}
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
                        iCloud
                      </h3>
                    </div>
                    
                    {/* iCloud Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* Inbox */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('icloudInbox')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'icloudInbox') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'icloudInbox') {
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
                            backgroundColor: currentView === 'icloudInbox' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'icloudInbox') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'icloudInbox') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/inbox.svg" 
                            alt="Inbox" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'icloudInbox' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Inbox
                          </span>
                        </div>
                      </div>

                      {/* Drafts */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('icloudDrafts')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'icloudDrafts') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'icloudDrafts') {
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
                            backgroundColor: currentView === 'icloudDrafts' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'icloudDrafts') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'icloudDrafts') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/all-drafts.svg" 
                            alt="Drafts" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'icloudDrafts' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Drafts
                          </span>
                        </div>
                      </div>

                      {/* Sent */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('icloudSent')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'icloudSent') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'icloudSent') {
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
                            backgroundColor: currentView === 'icloudSent' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'icloudSent') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'icloudSent') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/all-sent.svg" 
                            alt="Sent" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'icloudSent' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Sent
                          </span>
                        </div>
                      </div>

                      {/* Car */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('car')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'car') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'car') {
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
                            backgroundColor: currentView === 'car' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'car') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'car') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Car" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'car' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Car
                          </span>
                        </div>
                      </div>

                      {/* Pets */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('pets')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'pets') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'pets') {
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
                            backgroundColor: currentView === 'pets' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'pets') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'pets') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Pets" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'pets' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Pets
                          </span>
                        </div>
                      </div>

                      {/* Vacation */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('vacation')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'vacation') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'vacation') {
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
                            backgroundColor: currentView === 'vacation' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'vacation') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'vacation') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Vacation" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'vacation' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Vacation
                          </span>
                        </div>
                      </div>

                      {/* Shopping */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('shopping')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'shopping') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'shopping') {
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
                            backgroundColor: currentView === 'shopping' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'shopping') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'shopping') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Shopping" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'shopping' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Shopping
                          </span>
                        </div>
                      </div>

                      {/* Junk */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('junk')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'junk') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'junk') {
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
                            backgroundColor: currentView === 'junk' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'junk') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'junk') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Junk" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'junk' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Junk
                          </span>
                        </div>
                      </div>

                      {/* Trash */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150 group"
                        onClick={() => {
                          setCurrentView('trash')
                          setSelectedEmail(null)
                        }}
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                        onMouseEnter={(e) => {
                          if (currentView !== 'trash') {
                          const span = e.currentTarget.querySelector('span')
                          if (span) span.style.color = 'black'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentView !== 'trash') {
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
                            backgroundColor: currentView === 'trash' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                            paddingLeft: '8px'
                          }}
                          onMouseEnter={(e) => {
                            if (currentView !== 'trash') {
                              e.currentTarget.style.backgroundColor = 'white'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentView !== 'trash') {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }
                          }}
                        >
                          <img 
                            src="/images/rest-icloud.svg" 
                            alt="Trash" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          <span 
                            className="transition-colors duration-150"
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: currentView === 'trash' ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'),
                              marginRight: '10px'
                            }}
                          >
                            Trash
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
                  width: '960px',
                  height: '548px'
                }}
              >
                {/* Top Control Area */}
                <div 
                  className="flex items-center justify-between"
                  style={{
                    width: '960px',
                    height: '52px',
                    padding: '0 24px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Left side - Title and empty container */}
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    {/* Mail Title */}
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
                      Mail
                    </h2>

                     {/* Empty Container */}
                     <div 
                       style={{
                         width: '680px',
                         height: '36px',
                         flexShrink: 1
                       }}
                     />


                    {/* Search Container */}
                    <div 
                      className="flex items-center"
                      style={{
                        width: '120px',
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
                        gap: '6px',
                        flexShrink: 0
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

                {/* Main Content - Split Layout */}
                <div 
                  className="flex-1 flex" 
                  style={{ 
                    height: 'calc(100% - 52px)'
                  }}
                >
                  {/* Email List Panel */}
                  <div 
                    className="flex flex-col"
                    style={{
                      width: '400px',
                      borderRight: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      padding: '16px 24px',
                      overflowY: 'auto',
                      background: 'transparent'
                    }}
                  >
                    {/* Page Title */}
                    <h2 
                      style={{
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                        margin: '0 0 8px 0',
                        lineHeight: '1.2'
                      }}
                    >
                      {currentView === 'inbox' ? 'All Inboxes' : 
                       currentView === 'sent' ? 'All Sent' : 
                       currentView === 'drafts' ? 'All Drafts' :
                       currentView === 'vips' ? 'VIPs' :
                       currentView === 'flagged' ? 'Flagged' :
                       currentView === 'remind' ? 'Remind Me' :
                       currentView === 'sendLater' ? 'Send Later' :
                       currentView === 'icloudInbox' ? 'Inbox' :
                       currentView === 'icloudDrafts' ? 'Drafts' :
                       currentView === 'icloudSent' ? 'Sent' :
                       currentView === 'car' ? 'Car' :
                       currentView === 'pets' ? 'Pets' :
                       currentView === 'vacation' ? 'Vacation' :
                       currentView === 'shopping' ? 'Shopping' :
                       currentView === 'junk' ? 'Junk' :
                       currentView === 'trash' ? 'Trash' : 'All Inboxes'}
                    </h2>
                    
                    {/* Message Count */}
                    {currentView === 'inbox' && (
                      <div 
                        style={{
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                          margin: '0 0 16px 0'
                        }}
                      >
                        {filteredEmails.length} message{filteredEmails.length !== 1 ? 's' : ''}, {filteredEmails.filter(email => !email.isRead).length} unread
                      </div>
                    )}
                    
                    {/* Email List */}
                    <div className="flex flex-col">
                      {filteredEmails.length > 0 ? (
                        filteredEmails.map((email) => (
                          <div 
                            key={email.id}
                            className="email-item"
                            onClick={() => handleEmailClick(email)}
                            style={{
                              padding: '12px 0',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              position: 'relative',
                              borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3" style={{ flex: 1 }}>
                                {/* Unread indicator dot */}
                                {!email.isRead && (
                                  <div 
                                    style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: '#007AFF',
                                      flexShrink: 0,
                                      marginTop: '12px'
                                    }}
                                  />
                                )}
                                
                                
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                                    <h3 
                                      style={{
                                        fontSize: '16px',
                                        fontWeight: email.isRead ? '500' : '600',
                                        color: isDarkMode ? 'white' : 'black',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                        margin: 0,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                      }}
                                    >
                                      {email.from}
                                    </h3>
                                    {email.isImportant && (
                                      <div 
                                        style={{
                                          width: '8px',
                                          height: '8px',
                                          backgroundColor: '#FF3B30',
                                          borderRadius: '50%',
                                          flexShrink: 0
                                        }}
                                      />
                                    )}
                                  </div>
                                  
                                  <h4 
                                    style={{
                                      fontSize: '15px',
                                      fontWeight: email.isRead ? '400' : '600',
                                      color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                      margin: '0 0 4px 0',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    {email.subject}
                                  </h4>
                                  
                                  <p 
                                    style={{
                                      fontSize: '14px',
                                      color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                      margin: 0,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    {email.preview}
                                  </p>
                                </div>
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
                          No emails found matching &quot;{searchTerm}&quot;
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Content Panel */}
                  <div 
                    className="flex flex-col"
                    style={{
                      flex: 1,
                      padding: '16px 24px',
                      overflowY: 'auto',
                      background: 'transparent'
                    }}
                  >
                    {isComposing ? (
                      /* Compose Email Interface */
                      <div className="flex flex-col h-full">
                        {/* Compose Header */}
                        <div 
                          style={{
                            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                            paddingBottom: '16px',
                            marginBottom: '24px'
                          }}
                        >
                          <h1 
                            style={{
                              fontSize: '24px',
                              fontWeight: '600',
                              color: isDarkMode ? 'white' : 'black',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              margin: '0 0 16px 0',
                              lineHeight: '1.2'
                            }}
                          >
                            New Message
                          </h1>
                        </div>

                        {/* Email Fields */}
                        <div className="flex flex-col" style={{ marginBottom: '24px' }}>
                          {/* To Field */}
                          <div 
                            className="flex items-center"
                            style={{
                              borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                              paddingBottom: '8px',
                              marginBottom: '8px'
                            }}
                          >
                            <label 
                              style={{
                                width: '60px',
                                fontSize: '14px',
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                marginRight: '12px'
                              }}
                            >
                              To:
                            </label>
                            <input
                              type="email"
                              value={composeData.to}
                              onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                              style={{
                                flex: 1,
                                padding: '8px 0',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: isDarkMode ? 'white' : 'black',
                                fontSize: '14px',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                outline: 'none'
                              }}
                            />
                          </div>


                          {/* Subject Field */}
                          <div 
                            className="flex items-center"
                            style={{
                              borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                              paddingBottom: '8px',
                              marginBottom: '8px'
                            }}
                          >
                            <label 
                              style={{
                                width: '60px',
                                fontSize: '14px',
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                marginRight: '12px'
                              }}
                            >
                              Subject:
                            </label>
                            <input
                              type="text"
                              value={composeData.subject}
                              onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                              style={{
                                flex: 1,
                                padding: '8px 0',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: isDarkMode ? 'white' : 'black',
                                fontSize: '14px',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                outline: 'none'
                              }}
                            />
                          </div>

                          {/* From Field */}
                          <div 
                            className="flex items-center"
                            style={{
                              borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                              paddingBottom: '8px',
                              marginBottom: '8px'
                            }}
                          >
                            <label 
                              style={{
                                width: '60px',
                                fontSize: '14px',
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                marginRight: '12px'
                              }}
                            >
                              From:
                            </label>
                            <input
                              type="email"
                              value={composeData.from}
                              onChange={(e) => setComposeData({...composeData, from: e.target.value})}
                              placeholder="Enter your email address"
                              style={{
                                flex: 1,
                                padding: '8px 0',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: isDarkMode ? 'white' : 'black',
                                fontSize: '14px',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="flex-1" style={{ marginBottom: '16px' }}>
                            <textarea
                              value={composeData.body}
                              onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                              placeholder="Enter message"
                              autoFocus
                              style={{
                                width: '100%',
                                height: '100%',
                                padding: '8px 0',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: isDarkMode ? 'white' : 'black',
                                fontSize: '14px',
                                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                outline: 'none',
                                resize: 'none',
                                caretColor: '#0088FF'
                              }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <button
                            onClick={() => {
                              // Send email functionality
                              console.log('Sending email:', composeData)
                              setIsComposing(false)
                            }}
                            style={{
                              backgroundColor: '#0088FF',
                              color: 'white',
                              border: 'none',
                              borderRadius: '20px',
                              padding: '8px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0056CC'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#0088FF'
                            }}
                          >
                            Send
                          </button>
                          <button
                            onClick={() => setIsComposing(false)}
                            style={{
                              backgroundColor: 'transparent',
                              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                              borderRadius: '20px',
                              padding: '8px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : selectedEmail ? (
                      <>
                        {/* Email Header */}
                        <div 
                          style={{
                            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                            paddingBottom: '16px',
                            marginBottom: '24px'
                          }}
                        >
                          <h1 
                            style={{
                              fontSize: '24px',
                              fontWeight: '600',
                              color: isDarkMode ? 'white' : 'black',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              margin: '0 0 8px 0',
                              lineHeight: '1.2'
                            }}
                          >
                            {selectedEmail.subject}
                          </h1>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p 
                                style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: isDarkMode ? 'white' : 'black',
                                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                  margin: '0 0 2px 0'
                                }}
                              >
                                {selectedEmail.from}
                              </p>
                              <p 
                                style={{
                                  fontSize: '14px',
                                  color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                  margin: 0
                                }}
                              >
                                {selectedEmail.time}
                              </p>
                            </div>
                            
                            {selectedEmail.isImportant && (
                              <div 
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#FF3B30',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                }}
                              >
                                Important
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Email Content */}
                        <div 
                          style={{
                            fontSize: '16px',
                            lineHeight: '1.6',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            marginBottom: '24px'
                          }}
                        >
                          <p>Hi there,</p>
                          <p>Welcome to my portfolio! If you haven&apos;t explored the experience yet, take some time to click around and see the projects, designs, and experiments I&apos;ve put together.</p>
                          <p>Already explored? If you&apos;d like to collaborate or work with me, just hit reply or send me a mail, I&apos;d love to hear from you.</p>
                          <p>Best,<br />Ohene</p>
                        </div>

                        {/* Let's Talk Button */}
                        <div style={{ marginTop: '80px' }}>
                          <button
                            onClick={() => {
                              setIsComposing(true)
                              setComposeData({
                                to: 'ohenegyan159@gmail.com',
                                from: '',
                                subject: '',
                                body: ''
                              })
                            }}
                            style={{
                              backgroundColor: '#0088FF',
                              color: 'white',
                              border: 'none',
                              borderRadius: '100px',
                              width: '110px',
                              height: '32px',
                              fontSize: '13px',
                              fontWeight: '500',
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              lineHeight: '16px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0056CC'
                              e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#0088FF'
                              e.currentTarget.style.transform = 'translateY(0)'
                            }}
                          >
                            Let&apos;s Talk
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Empty State */
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
                      >
                        <h3 
                          style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            margin: '0 0 8px 0',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          Select a message
                        </h3>
                        <p 
                          style={{
                            fontSize: '14px',
                            margin: 0,
                            textAlign: 'center'
                          }}
                        >
                          Choose an email from the list to view its contents
                        </p>
                      </div>
                    )}
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
