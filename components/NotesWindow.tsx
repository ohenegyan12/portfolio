'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NotesWindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export default function NotesWindow({ isOpen, onClose, isDarkMode }: NotesWindowProps) {
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
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome Note ',
      content: `Hey there! Glad you opened this notebook. Inside you'll find quick notes about me, my skills, and the projects I've built. Think of it as flipping through my portfolio one tab at a time — simple, fun, and straight to the point.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Who I Am',
      content: `I'm Ohene Gyan, a User Interface & Product Designer and Frontend Developer. I thrive at the crossroads of design and technology — sketching out wireframes, shaping user journeys, and then building them into functional products.

When I'm not pushing pixels or code, I'm studying user behavior, refining interactions, or experimenting with new design tools. My goal? To build digital experiences that people find effortless and enjoyable.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Where I\'ve Worked',
      content: `**Wigal Vision Ltd.** (2024–Now): Led UI design + frontend dev for multi-platform projects. Increased engagement by aligning design with business goals and simplifying user journeys.

**Keyrios** (2025): Designed high-fidelity wireframes and prototypes for blockchain asset management. Focused on making complex workflows digestible.

**Moonsquare** (2025): Worked in a sprint-style environment, shipping a responsive MVP in 3 months. Iterated fast through usability tests.

**Vie Life Insurance** (2023–2024): Designed customer-facing dashboards + onboarding flows. Cut onboarding time by 30%. Built and maintained a design system for scale.

**Leynad Technologies** (2023–2024): Designed and launched the Adventist Hymnal App with accessible, intuitive navigation.

**FastPassTix** (2023–2024): Created the UI for a flagship ticketing platform. Focused on conversion optimization + design-to-code accuracy.

**Hitch Africa** (2023): Designed first version of their ride-hailing app. Worked on booking flows, real-time tracking, and rider-driver interactions.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'What I\'ve Built',
      content: `**TemVo App** (2025): Full interface for an NFC-powered school wallet and website. Clean UI for parents, vendors, and admins.

**TV OS for D. Damoah** (2025): Custom OS interface design. Balanced modern visuals with usability.

**Accra Lions FC** (2023–2024): Designed and built the official club website. Created a fresh look to reflect the team's identity.

**BuzstopBoys** (2024): Designed & developed a complete website for a creative collective. Emphasis on visuals and storytelling.

**Adventist Hymnal** (2024): Designed app + website with focus on accessibility and spiritual engagement.

**FastPassTix** (2023): Ticketing site UI with conversion-focused design.

**Hitch Africa** (2023): Designed app + site for a ride-hailing startup. Smooth booking and tracking flows.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      title: 'What I Do Best',
      content: `**Design Skills:** User Research, Journey Mapping, Low/High Fidelity Wireframes, Prototyping, Information Architecture.

**Technologies & Languages:** HTML/CSS, React, JavaScript, SwiftUI, Flutter.

**Software & Tools:** Figma, Adobe XD, Illustrator, Webflow, Jitter, Framer.

**Approach:** I'm detail-oriented but pragmatic — I ship quickly, test early, and refine continuously.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      title: 'Always Growing',
      content: `**Courses (IDF):** Usability Testing, Journey Mapping, Mobile User Experience, User Research Methods.

**Self-Study:** Exploring design tokens, advanced prototyping with Framer, and motion design with Jitter.

**What's Next:** Diving deeper into systems thinking, product strategy, and scaling design systems.`,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '7',
      title: 'Find Me Online',
      content: `**Behance**

@https://www.behance.net/ohenegyan

**Live Projects**

PROJECT_GRID_PLACEHOLDER

**Contact**

CONTACT_CARD_PLACEHOLDER

**Social Media**

SOCIAL_MEDIA_GRID_PLACEHOLDER`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0])
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setIsEditing(true)
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ))
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates, updatedAt: new Date() })
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(notes.find(note => note.id !== id) || null)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
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
                  {/* Notes Title Container */}
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
                      Notes
                    </h3>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="px-4" style={{ marginTop: '16px' }}>
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
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                  {/* Pinned Title */}
                  <div 
                    className="flex items-center"
                    style={{
                      width: '224px',
                      height: '34px',
                      paddingLeft: '18px',
                      paddingTop: '16px',
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
                      Pinned
                    </h3>
                  </div>

                  {/* New Note Button */}
                  <div className="px-4" style={{ marginTop: '12px' }}>
                    <button
                      onClick={createNewNote}
                      style={{
                        width: '192px',
                        height: '28px',
                        borderRadius: '14px',
                        backgroundColor: '#007AFF',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: '500',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056CC'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#007AFF'
                      }}
                    >
                      New Note
                    </button>
                  </div>

        {/* Notes List */}
        <div
          className="flex flex-col items-center"
          style={{
            marginTop: '16px',
            height: 'calc(100% - 200px)',
            overflowY: 'auto',
            padding: '0 16px',
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? 'rgba(255, 255, 255, 0.2) transparent' : 'rgba(0, 0, 0, 0.2) transparent'
          }}
        >
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => {
                          setSelectedNote(note)
                          setIsEditing(false)
                        }}
                        className="cursor-pointer transition-colors duration-150 flex flex-col justify-center"
                        style={{
                          width: '192px',
                          height: '48px',
                          paddingLeft: '8px',
                          paddingRight: '8px',
                          marginBottom: '4px',
                          borderRadius: '8px',
                          backgroundColor: selectedNote?.id === note.id 
                            ? 'rgba(0, 122, 255, 0.2)' 
                            : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedNote?.id !== note.id) {
                            e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedNote?.id !== note.id) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        <div 
                          style={{
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '10px',
                            fontWeight: '500',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)',
                            marginBottom: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {note.title}
                        </div>
                        <div 
                          style={{
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '9px',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginBottom: '1px'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: (note.content || 'No content')
                              .replace(/<div[^>]*>[\s\S]*?<\/div>/g, '') // Remove HTML divs for tab preview
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007AFF; text-decoration: underline;">$1</a>')
                              .replace(/@(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007AFF; text-decoration: underline;">$1</a>')
                          }}
                        />
                        <div 
                          style={{
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '8px',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
                          }}
                        >
                          {note.updatedAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
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
                  {/* Notes Title */}
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
                    Notes
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
                {selectedNote ? (
                  <div className="flex flex-col h-full">
                    {/* Note Title */}
                    <div style={{ marginBottom: '16px' }}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={selectedNote.title}
                          onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                          style={{
                            width: '100%',
                            fontSize: '24px',
                            fontWeight: '600',
                            color: isDarkMode ? '#ffffff' : '#000000',
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                          autoFocus
                        />
                      ) : (
                        <h1 
                          style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: isDarkMode ? '#ffffff' : '#000000',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            margin: 0
                          }}
                        >
                          {selectedNote.title}
                        </h1>
                      )}
                    </div>

                    {/* Note Content */}
                    <div className="flex-1">
                      {isEditing ? (
                        <textarea
                          value={selectedNote.content}
                          onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                          style={{
                            width: '100%',
                            height: '100%',
                            resize: 'none',
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            color: isDarkMode ? '#ffffff' : '#000000',
                            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '16px',
                            lineHeight: '1.5'
                          }}
                          placeholder="Start writing your note..."
                        />
                      ) : (
                        <div 
                          style={{
                            width: '100%',
                            height: '100%',
                            color: isDarkMode ? '#ffffff' : '#000000',
                            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            maxHeight: '480px',
                            boxSizing: 'border-box',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                          }}
                          className="scrollbar-hide"
                        >
                          {selectedNote.content
                              ?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            ?.replace(/@(https?:\/\/[^\s]+)/g, 'BEHANCE_CARD_PLACEHOLDER')
                            ?.replace(/PROJECT_GRID_PLACEHOLDER/g, 'PROJECT_GRID_COMPONENT')
                            ?.replace(/CONTACT_CARD_PLACEHOLDER/g, 'CONTACT_CARD_COMPONENT')
                            ?.replace(/SOCIAL_MEDIA_GRID_PLACEHOLDER/g, 'SOCIAL_MEDIA_GRID_COMPONENT')
                              ?.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007AFF; text-decoration: underline;">$1</a>')
                            ?.split(/(BEHANCE_CARD_PLACEHOLDER|PROJECT_GRID_COMPONENT|CONTACT_CARD_COMPONENT|SOCIAL_MEDIA_GRID_COMPONENT)/)
                            ?.map((part, index) => (
                              <span key={index}>
                                {part === 'BEHANCE_CARD_PLACEHOLDER' && (
                                  <div 
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      background: '#007AFF',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      margin: '8px 0 16px 0',
                                      width: '320px',
                                      transition: 'transform 0.2s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://www.behance.net/ohenegyan', '_blank')}
                                  >
                                    {/* Logo */}
                                    <img 
                                      src="/images/behance-card.png" 
                                      alt="OGK Studios Logo"
                                      style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        transform: 'rotate(-2deg)',
                                        objectFit: 'cover',
                                        marginRight: '16px',
                                        flexShrink: 0
                                      }}
                                    />
                                    
                                    {/* Text Content */}
                                    <div style={{ flex: 1 }}>
                                      <h3 style={{
                                        color: 'white',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        margin: '0 0 4px 0',
                                        lineHeight: '1.2'
                                      }}>See More on Behance</h3>
                                      <p style={{
                                        color: 'white',
                                        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                                        fontSize: '12px',
                                        margin: 0,
                                        lineHeight: '1.2',
                                        opacity: 0.95
                                      }}>All my designs in one place projects, explorations, and experiments.</p>
                                    </div>
                                  </div>
                                )}
                                {part === 'PROJECT_GRID_COMPONENT' && (
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '12px',
                                    margin: '16px 0',
                                    width: '100%'
                                  }}>
                                    {/* Project Card 1 */}
                                    <div style={{
                                      background: '#143A7D',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://temvo.app', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/temco-card.png" 
                                        alt="TemCo Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>TemVo App (2025)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>School wallet app and website with clean, easy-to-use UI.</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 2 */}
                                    <div style={{
                                      background: '#030303',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://tvos.ddamoah.com', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/ddamoah-card.png" 
                                        alt="D. Damoah TV OS"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>TV OS for D. Damoah (2025)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Custom TV operating system interface with smooth navigation.</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 3 */}
                                    <div style={{
                                      background: '#2A2E46',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://accralions.com', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/accra-lions-card.png" 
                                        alt="Accra Lions Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Accra Lions FC Website (2023–2024)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Official club website redesigned to showcase identity and news.</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 4 */}
                                    <div style={{
                                      background: '#000000',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://buzstopboys.org.gh', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/buzstopboys-card.png" 
                                        alt="BuzstopBoys Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>BuzstopBoys Website (2024)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Creative collective&apos;s website blending culture, art, and stories.</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 5 */}
                                    <div style={{
                                      background: '#EECE87',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://adventist-hymnal.vercel.app', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/adventist-card.png" 
                                        alt="Adventist Hymnal Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: '#000000',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Adventist Hymnal Website (2024)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: '#000000',
                                          opacity: 0.8,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Accessible hymnal app and site with intuitive navigation</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 6 */}
                                    <div style={{
                                      background: '#000000',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://fastpasstix.com', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/fastpass-card.png" 
                                        alt="FastPassTix Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>FastPassTix (2023)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Ticketing platform UI focused on speed and easy checkout.</div>
                                      </div>
                                    </div>
                                    
                                    {/* Project Card 7 */}
                                    <div style={{
                                      background: '#CB1F52',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://hitchafrica.com', '_blank')}>
                                      {/* Image */}
                                      <img 
                                        src="/images/hitch-card.png" 
                                        alt="Hitch Africa Project"
                                        style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '8px',
                                          transform: 'rotate(-2deg)',
                                          objectFit: 'cover',
                                          marginRight: '16px',
                                          flexShrink: 0
                                        }}
                                      />
                                      
                                      {/* Text Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '16px',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          marginBottom: '4px',
                                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Hitch Africa (2023)</div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: 'white',
                                          opacity: 0.95,
                                          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                        }}>Ride-hailing app design with booking flows and live tracking.</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {part === 'CONTACT_CARD_COMPONENT' && (
                                  <div 
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      background: '#000000',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      margin: '16px 0',
                                      width: '320px',
                                      transition: 'transform 0.2s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('mailto:ohenegyan@gmail.com', '_blank')}
                                  >
                                    {/* Logo */}
                                    <img 
                                      src="/images/gmail-card.png" 
                                      alt="Contact"
                                      style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '8px',
                                        transform: 'rotate(-2deg)',
                                        objectFit: 'cover',
                                        marginRight: '16px',
                                        flexShrink: 0
                                      }}
                                    />
                                    
                                    {/* Text Content */}
                                    <div style={{ flex: 1 }}>
                                      <h3 style={{
                                        color: 'white',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        margin: '0 0 4px 0',
                                        lineHeight: '1.2'
                                      }}>Get In Touch</h3>
                                      <p style={{
                                        color: 'white',
                                        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                                        fontSize: '12px',
                                        margin: 0,
                                        lineHeight: '1.2',
                                        opacity: 0.95
                                      }}>Ready to work together? Let&apos;s discuss your next project.</p>
                                    </div>
                                  </div>
                                )}
                                {part === 'SOCIAL_MEDIA_GRID_COMPONENT' && (
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '12px',
                                    margin: '16px 0',
                                    width: '100%'
                                  }}>
                                    {/* Instagram Card */}
                                    <div style={{
                                      background: '#E4405F',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://www.instagram.com/_ohene.gyan?igsh=MWI4eHQ4bXYwbjBkcw%3D%3D&utm_source=qr', '_blank')}>
                                      <div style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginBottom: '4px',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>Instagram</div>
                                      <div style={{
                                        fontSize: '10px',
                                        color: 'white',
                                        opacity: 0.9,
                                        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>@_ohene.gyan</div>
                                    </div>
                                    
                                    {/* X (Twitter) Card */}
                                    <div style={{
                                      background: '#000000',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://x.com/ohene_gyan10?s=21', '_blank')}>
                                      <div style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginBottom: '4px',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>X</div>
                                      <div style={{
                                        fontSize: '10px',
                                        color: 'white',
                                        opacity: 0.9,
                                        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>@ohene_gyan10</div>
                                    </div>
                                    
                                    {/* GitHub Card */}
                                    <div style={{
                                      background: '#333333',
                                      borderRadius: '12px',
                                      padding: '16px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                    onClick={() => window.open('https://github.com/ohenegyan12', '_blank')}>
                                      <div style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginBottom: '4px',
                                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>GitHub</div>
                                      <div style={{
                                        fontSize: '10px',
                                        color: 'white',
                                        opacity: 0.9,
                                        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                                      }}>@ohenegyan12</div>
                                    </div>
                                  </div>
                                )}
                                {part !== 'BEHANCE_CARD_PLACEHOLDER' && part !== 'PROJECT_GRID_COMPONENT' && part !== 'CONTACT_CARD_COMPONENT' && part !== 'SOCIAL_MEDIA_GRID_COMPONENT' && (
                                  <span dangerouslySetInnerHTML={{ __html: part }} />
                                )}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div 
                      className="text-center"
                      style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
                    >
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                      <h3 
                        style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          marginBottom: '8px'
                        }}
                      >
                        No Note Selected
                      </h3>
                      <p 
                        style={{
                          fontSize: '14px',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
                      >
                        Select a note from the sidebar or create a new one
                      </p>
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
