'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CalendarProps {
  isOpen: boolean
  onClose: () => void
  currentDate: Date
  onDateSelect: (date: Date) => void
}

export default function Calendar({ isOpen, onClose, currentDate, onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth())
  const [displayYear, setDisplayYear] = useState(currentDate.getFullYear())
  const [isVisible, setIsVisible] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setDisplayMonth(currentDate.getMonth())
      setDisplayYear(currentDate.getFullYear())
      setSelectedDate(currentDate)
    } else {
      setIsVisible(false)
    }
  }, [isOpen, currentDate])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getPreviousMonthDays = (month: number, year: number) => {
    const firstDay = getFirstDayOfMonth(month, year)
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear)
    
    const days = []
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(daysInPrevMonth - i)
    }
    return days
  }

  const getNextMonthDays = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year)
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7
    const nextMonthDays = totalCells - (daysInMonth + firstDay)
    
    const days = []
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(i)
    }
    return days
  }

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const newDate = new Date(displayYear, displayMonth, day)
      setSelectedDate(newDate)
      onDateSelect(newDate)
      handleClose()
    }
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (displayMonth === 0) {
        setDisplayMonth(11)
        setDisplayYear(displayYear - 1)
      } else {
        setDisplayMonth(displayMonth - 1)
      }
    } else {
      if (displayMonth === 11) {
        setDisplayMonth(0)
        setDisplayYear(displayYear + 1)
      } else {
        setDisplayMonth(displayMonth + 1)
      }
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (!isOpen) return null

  const currentMonthDays = Array.from({ length: getDaysInMonth(displayMonth, displayYear) }, (_, i) => i + 1)
  const prevMonthDays = getPreviousMonthDays(displayMonth, displayYear)
  const nextMonthDays = getNextMonthDays(displayMonth, displayYear)

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Calendar Container */}
      <div 
        ref={calendarRef}
        className={`relative transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{
          backgroundColor: '#FFFFFF',
          border: '0.9px solid #B6C1CA',
          borderRadius: '7.09px',
          padding: '16px',
          minWidth: '350px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
      {/* Header */}
      <div>
        <div className="text-center">
          <h2 
            className="text-xl font-bold"
            style={{ 
              color: '#23251D', 
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '20px',
              fontWeight: '700'
            }}
          >
            {monthNames[displayMonth]} {displayYear}
          </h2>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleMonthChange('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Previous month"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <button
            onClick={() => handleMonthChange('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Next month"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="text-center text-sm font-normal py-2"
            style={{ 
              color: '#9CA3AF', 
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '400'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Previous month days */}
        {prevMonthDays.map((day) => (
          <button
            key={`prev-${day}`}
            className="text-center py-2 text-sm rounded transition-colors duration-200"
            style={{ 
              color: '#9CA3AF',
              fontFamily: 'IBM Plex Sans, sans-serif'
            }}
            disabled
          >
            {day}
          </button>
        ))}
        
        {/* Current month days */}
        {currentMonthDays.map((day) => {
          const isSelected = selectedDate.getDate() === day && 
                           selectedDate.getMonth() === displayMonth && 
                           selectedDate.getFullYear() === displayYear
          
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day, true)}
              className={`text-center py-3 text-sm rounded-xl transition-all duration-200 ${
                isSelected ? 'text-white font-bold' : 'hover:bg-gray-100 font-normal'
              }`}
              style={{
                backgroundColor: isSelected ? '#3348FF' : 'transparent',
                color: isSelected ? '#FFFFFF' : '#23251D',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '16px',
                fontWeight: isSelected ? '700' : '400',
                borderRadius: '12px'
              }}
            >
              {day}
            </button>
          )
        })}
        
        {/* Next month days */}
        {nextMonthDays.map((day) => (
          <button
            key={`next-${day}`}
            className="text-center py-2 text-sm rounded transition-colors duration-200"
            style={{ 
              color: '#9CA3AF',
              fontFamily: 'IBM Plex Sans, sans-serif'
            }}
            disabled
          >
            {day}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}
