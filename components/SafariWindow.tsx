'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SafariWindowProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

export default function SafariWindow({ isOpen, onClose, isDarkMode = false }: SafariWindowProps) {
  const [currentUrl, setCurrentUrl] = useState('OGKSTUDIOS.COM')
  const [searchInput, setSearchInput] = useState('')

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      // If it looks like a URL, use it directly, otherwise search for it
      if (searchInput.includes('.') || searchInput.startsWith('http')) {
        setCurrentUrl(searchInput)
      } else {
        setCurrentUrl(`Search: ${searchInput}`)
      }
      setSearchInput('')
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
           className="fixed inset-0 z-50 flex items-center justify-center mb-16 pointer-events-none"
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
             className="relative pointer-events-auto"
             style={{
               width: '961px',
               height: '715.41px',
               backgroundColor: '#000000',
               backgroundImage: "url('/images/safari-image.jpg')",
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               borderTopLeftRadius: '3.34px',
               borderTopRightRadius: '3.34px',
               borderBottomLeftRadius: '3.34px',
               borderBottomRightRadius: '3.34px'
             }}
           >
             {/* Container */}
             <div
               style={{
                 width: '961px',
                 height: '32.03px',
                 backgroundColor: 'rgba(32, 33, 36, 0.5)',
                 display: 'flex',
                 alignItems: 'center',
                 paddingLeft: '12px',
                 gap: '8px'
               }}
             >
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

               {/* Spacer */}
               <div style={{ width: '26.69px' }} />

               {/* Tabs Icon */}
               <img
                 src="/images/tabs-icon.svg"
                 alt="Tabs"
                 style={{
                   width: '20px',
                   height: '20px',
                   filter: 'brightness(0) invert(1)'
                 }}
               />

               {/* Navigation Arrows */}
               <div style={{ display: 'flex', gap: '5.34px', marginLeft: '8px' }}>
                 {/* Back Arrow */}
                 <button
                   className="flex items-center justify-center transition-colors duration-200 hover:bg-gray-600 rounded"
                   style={{
                     width: '24px',
                     height: '24px',
                     backgroundColor: 'transparent'
                   }}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                     <path d="M15 18L9 12L15 6" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </button>

                 {/* Forward Arrow */}
                 <button
                   className="flex items-center justify-center transition-colors duration-200 hover:bg-gray-600 rounded"
                   style={{
                     width: '24px',
                     height: '24px',
                     backgroundColor: 'transparent'
                   }}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                     <path d="M9 18L15 12L9 6" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </button>
               </div>

               {/* Spacer */}
               <div style={{ width: '50px' }} />

               {/* Security Icon */}
               <img
                 src="/images/security-icon.svg"
                 alt="Security"
                 style={{
                   width: '20px',
                   height: '20px',
                   filter: 'brightness(0) invert(1)'
                 }}
               />

               {/* Search/Address Bar */}
               <form
                 onSubmit={handleSearchSubmit}
                 style={{
                   width: '389.07px',
                   height: '18.69px',
                   backgroundColor: '#F2F2F2',
                   borderRadius: '3.34px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   padding: '0 8px',
                   gap: '6px',
                   marginLeft: '5px',
                   position: 'relative'
                 }}
               >
                 {/* Centered URL with Lock Icon */}
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   {/* Padlock Icon */}
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                     <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13S14 13.9 14 15S13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" fill="rgba(0, 0, 0, 0.6)"/>
                   </svg>

                   {/* URL Input */}
                   <input
                     type="text"
                     value={searchInput || currentUrl}
                     onChange={(e) => setSearchInput(e.target.value)}
                     onFocus={() => setSearchInput('')}
                     onBlur={() => setSearchInput('')}
                     style={{
                       color: 'rgba(0, 0, 0, 0.8)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '12px',
                       backgroundColor: 'transparent',
                       border: 'none',
                       outline: 'none',
                       textAlign: 'center',
                       minWidth: '120px'
                     }}
                     placeholder="Search or enter website name"
                   />
                 </div>

                 {/* Refresh Icon - Positioned absolutely on the right */}
                 <button
                   className="flex items-center justify-center transition-colors duration-200 hover:bg-gray-300 rounded absolute"
                   style={{
                     width: '16px',
                     height: '16px',
                     backgroundColor: 'transparent',
                     right: '8px',
                     top: '50%',
                     transform: 'translateY(-50%)'
                   }}
                 >
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                     <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12S7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12S8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="rgba(0, 0, 0, 0.6)"/>
                   </svg>
                 </button>
               </form>

               {/* Right Side Icons */}
               <div style={{ display: 'flex', gap: '5px', marginLeft: 'auto', marginRight: '12px' }}>
                 {/* Download Icon */}
                 <img
                   src="/images/download-icon-safari.svg"
                   alt="Download"
                   style={{
                     width: '20px',
                     height: '20px',
                     filter: 'brightness(0) invert(1)'
                   }}
                 />

                 {/* New Tab Icon */}
                 <img
                   src="/images/new-tab-icon.svg"
                   alt="New Tab"
                   style={{
                     width: '20px',
                     height: '20px',
                     filter: 'brightness(0) invert(1)'
                   }}
                 />

                 {/* Page Icon */}
                 <img
                   src="/images/page-icon.svg"
                   alt="Page"
                   style={{
                     width: '20px',
                     height: '20px',
                     filter: 'brightness(0) invert(1)'
                   }}
                 />
               </div>
             </div>

             {/* Content Area */}
             <div
               style={{
                 width: '961px',
                 padding: '20px'
               }}
             >
               {/* Web Projects Title */}
               <h2
                 style={{
                   color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                   fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                   fontSize: '24px',
                   fontWeight: '600',
                   margin: '40px 0 20px 120px'
                 }}
               >
                 Web Projects
               </h2>

               {/* Web Project Tabs */}
               <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '40px', marginLeft: '120px' }}>
                 {/* Temvo Tab */}
                 <a
                   href="https://temvo.app"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/temvo-app-icon.png"
                       alt="Temvo"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Temvo
                   </span>
                 </a>

                 {/* DDamoah Studios Tab */}
                 <a
                   href="https://tvos.ddamoah.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/ddamoah.png"
                       alt="DDamoah Studios"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     DD Studios
                   </span>
                 </a>

                 {/* Buzstopboys Tab */}
                 <a
                   href="https://buzstopboys.org.gh/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/buzstopboys.png"
                       alt="Buzstopboys"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Buzstopboys
                   </span>
                 </a>

                 {/* Adventist Hymnal Tab */}
                 <a
                   href="https://adventist-hymnal.vercel.app/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/adventist.png"
                       alt="Adventist Hymnal"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Adventist hymnal
                   </span>
                 </a>

                 {/* Accra Lions Tab */}
                 <a
                   href="https://www.accralions.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/accra-lions.png"
                       alt="Accra Lions"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Accra Lions
                   </span>
                 </a>

                 {/* Coordinated Living Tab */}
                 <a
                   href="https://coordinated-living.vercel.app/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/coordinated.png"
                       alt="Coordinated Living"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Coorinated Living
                   </span>
                 </a>

                 {/* FastPass Tix Tab */}
                 <a
                   href="https://www.fastpasstix.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/fastpass.png"
                       alt="FastPass Tix"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     FastPass Tix
                   </span>
                 </a>

                 {/* Hitch Tab */}
                 <a
                   href="https://hitch.africa/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '60px',
                       height: '60px',
                       borderRadius: '12px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                       marginBottom: '8px',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/hitch.png"
                       alt="Hitch"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '12px'
                       }}
                     />
                   </div>
                   
                   {/* App Name */}
                   <span
                     style={{
                       color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                       fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                       fontSize: '14px',
                       fontWeight: '500',
                       textAlign: 'center'
                     }}
                   >
                     Hitch
                   </span>
                 </a>
               </div>

               {/* Suggestions Section */}
               <div
                 style={{
                   width: '961px',
                   padding: '20px'
                 }}
               >
                 <h2
                   style={{
                     color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                     fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                     fontSize: '24px',
                     fontWeight: '600',
                     margin: '40px 0 20px 100px'
                   }}
                 >
                   Suggestions
                 </h2>

                 {/* Suggestions Card */}
                 <a
                   href="https://www.behance.net/ohenegyan"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     width: '400px',
                     height: '120px',
                     borderRadius: '18px',
                     backgroundColor: 'rgba(245, 245, 245, 0.5)',
                     backdropFilter: 'blur(218.43px)',
                     margin: '20px 0 0 100px',
                     display: 'flex',
                     alignItems: 'center',
                     padding: '0 20px 0 10px',
                     gap: '16px',
                     textDecoration: 'none',
                     transition: 'transform 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.02)'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)'
                   }}
                 >
                   {/* App Icon */}
                   <div
                     style={{
                       width: '100px',
                       height: '100px',
                       borderRadius: '20px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       overflow: 'hidden'
                     }}
                   >
                     <img
                       src="/images/behance-card.png"
                       alt="Behance"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderRadius: '20px'
                       }}
                     />
                   </div>

                   {/* Content */}
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {/* Title */}
                     <h3
                       style={{
                         color: '#000000',
                         fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                         fontSize: '18px',
                         fontWeight: '600',
                         margin: 0
                       }}
                     >
                       See More on Behance
                     </h3>
                     
                     {/* Description */}
                     <p
                       style={{
                         color: '#000000',
                         fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                         fontSize: '14px',
                         fontWeight: '400',
                         margin: 0,
                         lineHeight: '1.4'
                       }}
                     >
                       All my designs in one place—projects, explorations, and experiments.
                     </p>
                   </div>
                 </a>
               </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
