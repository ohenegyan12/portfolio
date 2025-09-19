'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar'
import Calendar from '../components/Calendar'
import AboutModal from '../components/AboutModal'
import WelcomeAlert from '../components/WelcomeAlert'
import Window from '../components/Window'
import AppleMusicWindow from '../components/AppleMusicWindow'
import SafariWindow from '../components/SafariWindow'
import MailWindow from '../components/MailWindow'
import { useTimeBasedBackground } from '../hooks/useTimeBasedBackground'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false)
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const [isAppleMusicOpen, setIsAppleMusicOpen] = useState(false)
  const [isSafariOpen, setIsSafariOpen] = useState(false)
  const [isMailOpen, setIsMailOpen] = useState(false)
  const { backgroundImage, isTransitioning } = useTimeBasedBackground()
  
  // Get background color based on time of day
  const getBackgroundColor = () => {
    const hour = new Date().getHours()
    return (hour >= 6 && hour < 18) ? '#87CEEB' : '#1a1a2e' // Light blue for day, dark blue for night
  }

  const handleLoaderComplete = () => {
    setIsLoading(false)
    
    // Add a small delay before showing content to ensure smooth transition
    setTimeout(() => {
      setShowContent(true)
      // Show welcome alert after content has appeared (dock animation completes)
      setTimeout(() => {
        setShowWelcomeAlert(true)
      }, 1500) // Wait for dock animation to complete
    }, 200)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  const handleCalendarClose = () => {
    setIsCalendarOpen(false)
  }

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date)
    setIsCalendarOpen(false)
  }

  const handleAboutModalToggle = () => {
    setIsAboutModalOpen(!isAboutModalOpen)
  }

  const handleAboutModalClose = () => {
    setIsAboutModalOpen(false)
  }

  const handleWelcomeAlertClose = () => {
    setShowWelcomeAlert(false)
  }

  const handleWindowToggle = () => {
    setIsWindowOpen(!isWindowOpen)
  }

  const handleWindowClose = () => {
    setIsWindowOpen(false)
  }

  useEffect(() => {
    // Update date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} duration={3000} />
  }

  return (
    <main 
      className={`min-h-screen dynamic-background ${isTransitioning ? 'transitioning' : ''}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundColor: getBackgroundColor()
      }}
    >
      {/* Top Menu Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 h-8">
        {/* Left Side - Logo and Menu Items */}
        <div className="flex items-center gap-6">
          <img 
            src={getBackgroundColor() === '#87CEEB' ? "/images/top-nav-logo.png" : "/images/top-nav-logo-dark.png"} 
            alt="Logo" 
            className="w-8 h-6"
          />
          <div className="flex items-center gap-6 text-sm font-medium"
               style={{ 
                 fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                 color: getBackgroundColor() === '#87CEEB' ? '#000000' : '#FFFFFF'
               }}>
            <span className="cursor-pointer">Finder</span>
            <span className="cursor-pointer">File</span>
            <span className="cursor-pointer">Edit</span>
            <span className="cursor-pointer">View</span>
            <span className="cursor-pointer">Go</span>
            <span className="cursor-pointer">Window</span>
            <span className="cursor-pointer">Help</span>
          </div>
        </div>
        
        {/* Right Side - WiFi, Search, Profile, Control and Date/Time */}
        <div className="flex items-center gap-2">
          <img 
            src={getBackgroundColor() === '#87CEEB' ? "/images/top-nav-wifi.png" : "/images/top-nav-wifi-dark.png"} 
            alt="WiFi" 
            className="w-10 h-6 cursor-pointer"
          />
          <img 
            src={getBackgroundColor() === '#87CEEB' ? "/images/top-nav-search.png" : "/images/top-nav-search-dark.png"} 
            alt="Search" 
            className="w-10 h-6 cursor-pointer"
          />
          <img 
            src={getBackgroundColor() === '#87CEEB' ? "/images/top-nav-profile.png" : "/images/top-nav-profile-dark.png"} 
            alt="Profile" 
            className="w-10 h-6 cursor-pointer"
          />
          <img 
            src={getBackgroundColor() === '#87CEEB' ? "/images/top-nav-control.png" : "/images/top-nav-control-dark.png"} 
            alt="Control" 
            className="w-10 h-6 cursor-pointer"
          />
          <div className="text-sm font-medium"
               style={{ 
                 fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                 color: getBackgroundColor() === '#87CEEB' ? '#000000' : '#FFFFFF'
               }}>
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <SearchBar 
        isOpen={isSearchOpen} 
        onClose={handleSearchClose} 
      />
      
      {/* Calendar */}
      <Calendar 
        isOpen={isCalendarOpen}
        onClose={handleCalendarClose}
        currentDate={currentDate}
        onDateSelect={handleDateSelect}
      />
      
      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={handleAboutModalClose}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Welcome Alert */}
      <WelcomeAlert 
        isOpen={showWelcomeAlert}
        onClose={handleWelcomeAlertClose}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Window */}
      <Window 
        isOpen={isWindowOpen}
        onClose={handleWindowClose}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Apple Music Window */}
      <AppleMusicWindow 
        isOpen={isAppleMusicOpen}
        onClose={() => setIsAppleMusicOpen(false)}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Safari Window */}
      <SafariWindow 
        isOpen={isSafariOpen}
        onClose={() => setIsSafariOpen(false)}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Mail Window */}
      <MailWindow 
        isOpen={isMailOpen}
        onClose={() => setIsMailOpen(false)}
        isDarkMode={getBackgroundColor() === '#1a1a2e'}
      />

      {/* Apple Style Dock */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="fixed bottom-6 left-0 right-0 z-40 flex justify-center"
          >
            <div 
              className="flex items-center justify-center gap-4"
              style={{
                background: getBackgroundColor() === '#87CEEB' 
                  ? 'rgba(246, 246, 246, 0.36)' 
                  : 'rgba(74, 74, 74, 0.39)',
                borderRadius: '15px',
                width: '1300px',
                height: '62px',
                boxShadow: getBackgroundColor() === '#87CEEB' 
                  ? '0 0 6px rgba(0, 0, 0, 0.15)' 
                  : '0 0 0 1px rgba(0, 0, 0, 0.2)',
                backdropFilter: getBackgroundColor() === '#87CEEB' 
                  ? 'blur(135.91px) saturate(180%) brightness(1.1)' 
                  : 'blur(30px)',
                WebkitBackdropFilter: getBackgroundColor() === '#87CEEB' 
                  ? 'blur(135.91px) saturate(180%) brightness(1.1)' 
                  : 'blur(30px)',
                border: getBackgroundColor() === '#87CEEB' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : 'none',
                isolation: 'isolate'
              }}
            >
              {/* App Icon 1 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-1.png" : "/images/app-icon-dark-1.png"} 
                alt="App 1" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 2 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-2.png" : "/images/app-icon-dark-2.png"} 
                alt="App 2" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 3 - Safari */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-3.png" : "/images/app-icon-dark-3.png"} 
                alt="Safari" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
                onClick={() => setIsSafariOpen(true)}
              />

              {/* App Icon 4 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-4.png" : "/images/app-icon-dark-4.png"} 
                alt="App 4" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 5 - Mail */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-5.png" : "/images/app-icon-dark-5.png"} 
                alt="Mail" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
                onClick={() => setIsMailOpen(true)}
              />

              {/* App Icon 6 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-6.png" : "/images/app-icon-dark-6.png"} 
                alt="App 6" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 7 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-7.png" : "/images/app-icon-dark-7.png"} 
                alt="App 7" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 8 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-8.png" : "/images/app-icon-dark-8.png"} 
                alt="App 8" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 9 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-9.png" : "/images/app-icon-dark-9.png"} 
                alt="App 9" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 10 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-10.png" : "/images/app-icon-dark-10.png"} 
                alt="App 10" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 11 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-11.png" : "/images/app-icon-dark-11.png"} 
                alt="App 11" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 12 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-12.png" : "/images/app-icon-dark-12.png"} 
                alt="App 12" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 13 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-13.png" : "/images/app-icon-dark-13.png"} 
                alt="App 13" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 14 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-14.png" : "/images/app-icon-dark-14.png"} 
                alt="App 14" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 15 - Apple Music */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-15.png" : "/images/app-icon-dark-15.png"} 
                alt="Apple Music" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
                onClick={() => setIsAppleMusicOpen(true)}
              />

              {/* App Icon 16 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-16.png" : "/images/app-icon-dark-16.png"} 
                alt="App 16" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* App Icon 17 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-17.png" : "/images/app-icon-dark-17.png"} 
                alt="App 17" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />

              {/* Divider */}
              <motion.img
                src={getBackgroundColor() === '#87CEEB' ? "/images/divider.png" : "/images/divider-dark.png"} 
                alt="Divider" 
                className="w-12 h-12"
              />

              {/* App Icon 18 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-18.png" : "/images/app-icon-dark-18.png"} 
                alt="App 18" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
                onClick={handleWindowToggle}
              />

              {/* App Icon 19 */}
              <motion.img
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src={getBackgroundColor() === '#87CEEB' ? "/images/app-icon-19.png" : "/images/app-icon-dark-19.png"} 
                alt="App 19" 
                className="w-12 h-12 rounded-2xl cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
