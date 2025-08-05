"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useSwipeCarousel, useMobileOptimizations } from '@/hooks/use-mobile'

interface MobileCarouselProps {
  items: React.ReactNode[]
  showIndicators?: boolean
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function MobileCarousel({
  items,
  showIndicators = true,
  autoPlay = false,
  interval = 3000,
  className = ''
}: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { swipeHandlers, translateX, isDragging } = useSwipeCarousel()
  const { isMobile, mobileClasses } = useMobileOptimizations()

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, isAutoPlaying, interval, items.length])

  // Pause auto-play on touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false)
    swipeHandlers.onTouchStart(e)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    swipeHandlers.onTouchMove(e)
  }

  const handleTouchEnd = () => {
    setIsAutoPlaying(autoPlay)
    swipeHandlers.onTouchEnd()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => (prev + 1) % items.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items.length])

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Previous slide
  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  // Next slide
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }

  if (items.length === 0) return null

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={`relative overflow-hidden rounded-lg ${mobileClasses.carousel}`}
        style={{
          transform: isDragging ? `translateX(${translateX}px)` : 'none',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${items.length * 100}%`
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`${mobileClasses.carouselItem} flex-shrink-0`}
              style={{ width: `${100 / items.length}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, shown on larger screens */}
      {!isMobile && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Swipe Indicators */}
      {showIndicators && items.length > 1 && (
        <div className={`${mobileClasses.swipeIndicator} mt-4`}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${mobileClasses.swipeDot} ${
                index === currentIndex ? 'active' : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Swipe Instructions */}
      {isMobile && items.length > 1 && (
        <div className="text-center mt-2 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Swipe to navigate
          </span>
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className={`${mobileClasses.progress} bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300`}
            style={{
              width: `${((currentIndex + 1) / items.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  )
}

// Mobile-optimized carousel item wrapper
export function MobileCarouselItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  const { mobileClasses } = useMobileOptimizations()

  return (
    <div className={`${mobileClasses.card} ${className}`}>
      {children}
    </div>
  )
} 