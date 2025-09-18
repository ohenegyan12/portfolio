'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function Window({ isOpen, onClose, isDarkMode = false }: WindowProps) {
  const [isSelected, setIsSelected] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleRowClick = () => {
    setIsSelected(!isSelected)
  }

  const handleRowDoubleClick = () => {
    setShowAlert(true)
  }

  return (
    <>
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
              background: '#FFFFFF',
              borderRadius: '26px',
              boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.23), 0 16px 48px rgba(0, 0, 0, 0.35)',
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
                    // Glass effect properties
                    backdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    // Frost effect
                    filter: 'contrast(1.1) brightness(1.05)',
                    // Dispersion effect (0 = no dispersion)
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    // Depth effect
                    isolation: 'isolate'
                  }}
                >
                  {/* Base layer - 100% fill */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '18px'
                    }}
                  />
                  
                  {/* Overlay layer - 67% fill */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'rgba(245, 245, 245, 0.67)',
                      borderRadius: '18px'
                    }}
                  />
                  
                  {/* Glass reflection overlay - -45° light angle, 90% intensity */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
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
                          color: 'rgba(0, 0, 0, 0.5)',
                          fontSize: '11px',
                          fontWeight: '700',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          margin: 0
                        }}
                      >
                        Favourites
                      </h3>
                    </div>
                    
                    {/* Favorites Tabs */}
                    <div className="px-2" style={{ marginTop: '2px' }}>
                      {/* Recent */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
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
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.11)',
                            paddingLeft: '8px'
                          }}
                        >
                          <img 
                            src="/images/recent-icon.svg" 
                            alt="Recent" 
                            width="16" 
                            height="16" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(1456%) hue-rotate(204deg) brightness(101%) contrast(101%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Recent
                          </span>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <img 
                            src="/images/desktop-icon.svg" 
                            alt="Desktop" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(100%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Desktop
                          </span>
                        </div>
                      </div>

                      {/* Documents */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px',
                          marginBottom: '2px'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <img 
                            src="/images/document-icon.svg" 
                            alt="Documents" 
                            width="14" 
                            height="14" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(100%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Documents
                          </span>
                        </div>
                      </div>

                      {/* Downloads */}
                      <div 
                        className="flex items-center cursor-pointer transition-colors duration-150"
                        style={{
                          width: '224px',
                          height: '24px',
                          paddingLeft: '6px'
                        }}
                      >
                        <div 
                          className="flex items-center hover:bg-gray-100 transition-colors duration-150"
                          style={{
                            width: '204px',
                            height: '24px',
                            borderRadius: '8px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            paddingLeft: '8px'
                          }}
                        >
                          <img 
                            src="/images/download-icon.svg" 
                            alt="Downloads" 
                            width="16" 
                            height="16" 
                            style={{ 
                              marginRight: '4px',
                              filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(100%)'
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: 'rgba(0, 0, 0, 0.85)',
                              marginRight: '10px'
                            }}
                          >
                            Downloads
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
                  className="flex items-center justify-between"
                  style={{
                    width: '660px',
                    height: '52px'
                  }}
                >
                  {/* Left side - Navigation arrows, title, and empty container */}
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    {/* Arrow Container */}
                    <div 
                      className="flex items-center justify-center gap-1"
                      style={{
                        width: '67px',
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
                        isolation: 'isolate'
                      }}
                    >
                      {/* Left Arrow */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '20px',
                          height: '20px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <img 
                          src="/images/arrow-left.svg" 
                          alt="Back" 
                          width="20" 
                          height="20"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                          }}
                        />
                      </button>
                      
                      {/* Divider */}
                      <div 
                        className="flex items-center justify-center"
                        style={{
                          width: '1px',
                          height: '12px',
                          backgroundColor: 'rgba(0, 0, 0, 0.15)'
                        }}
                      />
                      
                      {/* Right Arrow */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '20px',
                          height: '20px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <img 
                          src="/images/arrow-right.svg" 
                          alt="Forward" 
                          width="20" 
                          height="20"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                          }}
                        />
                      </button>
                    </div>

                    {/* About Me Title */}
                    <h2 
                      style={{
                        width: '73px',
                        height: '16px',
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        lineHeight: '16px',
                        color: 'rgba(0, 0, 0, 0.85)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      About Me
                    </h2>

                    {/* Empty Container */}
                    <div 
                      style={{
                        width: '151px',
                        height: '36px'
                      }}
                    />

                    {/* Action Buttons Container */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '146px',
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
                        padding: '0 4px'
                      }}
                    >
                      {/* Folder Icon */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '33px',
                          height: '28px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '0 2px'
                        }}
                      >
                        <img 
                          src="/images/folder-icon.svg" 
                          alt="Folder" 
                          width="33" 
                          height="28"
                        />
                      </button>
                      
                      {/* Bin Icon */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '33px',
                          height: '28px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '0 2px'
                        }}
                      >
                        <img 
                          src="/images/bin-icon.svg" 
                          alt="Bin" 
                          width="33" 
                          height="28"
                        />
                      </button>
                      
                      {/* Archive Icon */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '33px',
                          height: '28px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '0 2px'
                        }}
                      >
                        <img 
                          src="/images/archive-icon.svg" 
                          alt="Archive" 
                          width="33" 
                          height="28"
                        />
                      </button>
                      
                      {/* Label Icon */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '33px',
                          height: '28px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '0 2px'
                        }}
                      >
                        <img 
                          src="/images/label-icon.svg" 
                          alt="Label" 
                          width="33" 
                          height="28"
                        />
                      </button>
                    </div>

                    {/* Edit Container */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '36px',
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
                        isolation: 'isolate'
                      }}
                    >
                      {/* Edit Icon */}
                      <button 
                        className="flex items-center justify-center"
                        style={{
                          width: '29px',
                          height: '28px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        <img 
                          src="/images/edit-icon.svg" 
                          alt="Edit" 
                          width="29" 
                          height="28"
                        />
                      </button>
                    </div>

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

                {/* Main content area ready for your custom design */}
                <div 
                  style={{
                    width: '660px',
                    height: '548px'
                  }}
                >
                  {/* Header Row */}
                  <div 
                    className="flex items-center"
                    style={{
                      width: '658px',
                      height: '33px'
                    }}
                  >
                    {/* Name Column */}
                    <img 
                      src="/images/name-column.svg" 
                      alt="Name" 
                      width="208" 
                      height="28"
                    />
                    
                    {/* Date Modified Column */}
                    <img 
                      src="/images/date-modified.svg" 
                      alt="Date Modified" 
                      width="190" 
                      height="28"
                    />
                    
                    {/* Size Column */}
                    <img 
                      src="/images/size-column.svg" 
                      alt="Size" 
                      width="100" 
                      height="28"
                    />
                    
                    {/* Kind Column */}
                    <img 
                      src="/images/kind-column.svg" 
                      alt="Kind" 
                      width="160" 
                      height="28"
                    />
                  </div>

                  {/* Row Container */}
                  <div 
                    className="flex items-center group cursor-pointer"
                    style={{
                      width: '658px',
                      height: '20px',
                      paddingLeft: '4px',
                      position: 'relative'
                    }}
                    onClick={handleRowClick}
                    onDoubleClick={handleRowDoubleClick}
                  >
                    {/* Hover Effect - Name Row Background */}
                    <div 
                      className={`absolute left-0 top-0 transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{
                        width: '198px',
                        height: '20px',
                        backgroundColor: isSelected ? '#2962D9' : 'rgba(0, 0, 0, 0.03)',
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                        zIndex: 1
                      }}
                    />

                    {/* Hover Effect - Date Container Background */}
                    <div 
                      className={`absolute transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{
                        left: '198px',
                        top: '0px',
                        width: '190px',
                        height: '20px',
                        backgroundColor: isSelected ? '#2962D9' : 'rgba(0, 0, 0, 0.03)',
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                        zIndex: 1
                      }}
                    />

                    {/* Hover Effect - Size Container Background */}
                    <div 
                      className={`absolute transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{
                        left: '388px',
                        top: '0px',
                        width: '100px',
                        height: '20px',
                        backgroundColor: isSelected ? '#2962D9' : 'rgba(0, 0, 0, 0.03)',
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                        zIndex: 1
                      }}
                    />

                    {/* Hover Effect - Kind Container Background */}
                    <div 
                      className={`absolute transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{
                        left: '488px',
                        top: '0px',
                        width: '160px',
                        height: '20px',
                        backgroundColor: isSelected ? '#2962D9' : 'rgba(0, 0, 0, 0.03)',
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: '8px',
                        zIndex: 1
                      }}
                    />
                    {/* Frame Container */}
                    <div 
                      className="flex items-center gap-2"
                      style={{
                        width: '198px',
                        height: '20px',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {/* CV Icon */}
                      <img 
                        src="/images/cv-icon.png" 
                        alt="CV" 
                        width="18" 
                        height="18"
                      />
                      
                      {/* Text Container */}
                      <div 
                        style={{
                          width: '163px',
                          height: '16px',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: isSelected ? '#FFFFFF' : 'rgba(0, 0, 0, 0.85)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        Ohene's CV
                      </div>
                    </div>

                    {/* Date Time Container */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '190px',
                        height: '20px',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {/* Content Container */}
                      <div 
                        style={{
                          width: '174px',
                          height: '16px',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: isSelected ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {new Date().toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} at {new Date().toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>

                    {/* Size Container */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '100px',
                        height: '20px',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {/* Text Container */}
                      <div 
                        style={{
                          width: '84px',
                          height: '16px',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: isSelected ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        7 MB
                      </div>
                    </div>

                    {/* Kind Container */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '160px',
                        height: '20px',
                        marginRight: '8px',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {/* Text Container */}
                      <div 
                        style={{
                          width: '136px',
                          height: '16px',
                          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: isSelected ? '#FFFFFF' : 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        PDF
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Modal */}
              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAlert(false)}
                  >
                    {/* Backdrop */}
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-30"
                      style={{
                        borderRadius: '26px'
                      }}
                    />
                  
                    {/* Modal */}
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.3 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: '260px',
                        height: '262px',
                        borderRadius: '34px',
                        background: 'rgba(245, 245, 245, 1)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 0 1px rgba(0, 0, 0, 0.2), 0 17px 45px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {/* Icon Container */}
                      <div 
                        className="flex items-center"
                        style={{
                          width: '228px',
                          height: '64px',
                          gap: '10px'
                        }}
                      >
                        {/* Folder Icon */}
                        <img 
                          src="/images/folder-icon.png" 
                          alt="Folder" 
                          width="64" 
                          height="64"
                        />
                      </div>

                      {/* Content Container */}
                      <div 
                        style={{
                          width: '228px',
                          height: '98px'
                        }}
                      >
                        {/* Title */}
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
                            alignItems: 'center'
                          }}
                        >
                          Open my portfolio?
                        </div>

                        {/* Description */}
                        <div 
                          style={{
                            width: '216px',
                            height: '70px',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '11px',
                            fontWeight: '400',
                            lineHeight: '14px',
                            color: 'rgba(0, 0, 0, 0.85)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginTop: '8px'
                          }}
                        >
                          This portfolio includes recent projects, experiments, and case studies. You can open it in your browser to explore interactively, or download a copy to keep for later.
                        </div>
                      </div>
                      
                      {/* Buttons Container */}
                      <div className="flex justify-end" style={{ gap: '8px' }}>
                        {/* Cancel Button */}
                        <button
                          onClick={() => setShowAlert(false)}
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
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#888888'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#999999'
                          }}
                        >
                          Cancel
                        </button>
                        
                        {/* Open Button */}
                        <button
                          onClick={() => {
                            window.open('/doucment/portfolio.pdf', '_blank')
                            setShowAlert(false)
                          }}
                          style={{
                            width: '110px',
                            height: '32px',
                            borderRadius: '100px',
                            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#FFFFFF',
                            backgroundColor: '#007AFF',
                            border: 'none',
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
                          Open
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
