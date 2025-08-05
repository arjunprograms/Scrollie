import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const LARGE_MOBILE_BREAKPOINT = 600

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  return deviceType
}

export function useTouchInteractions() {
  const [isTouching, setIsTouching] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    setIsTouching(true)
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }, [])

  const handleTouchEnd = React.useCallback(() => {
    setIsTouching(false)
    setTouchStart(null)
  }, [])

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!touchStart) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y

    // Detect swipe gestures
    if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
      // Swipe detected
      setIsTouching(false)
      setTouchStart(null)
    }
  }, [touchStart])

  return {
    isTouching,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
    }
  }
}

export function useSwipeCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [translateX, setTranslateX] = React.useState(0)

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentX = e.touches[0].clientX
    const diff = currentX - startX
    setTranslateX(diff)
  }, [isDragging, startX])

  const handleTouchEnd = React.useCallback(() => {
    setIsDragging(false)
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        setCurrentIndex(prev => Math.max(0, prev - 1))
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }
    
    setTranslateX(0)
  }, [translateX])

  return {
    currentIndex,
    translateX,
    isDragging,
    swipeHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  }
}

export function useMobileOptimizations() {
  const isMobile = useIsMobile()
  const deviceType = useDeviceType()
  const { isTouching, touchHandlers } = useTouchInteractions()

  const mobileClasses = React.useMemo(() => {
    if (!isMobile) return {}
    
    return {
      button: 'mobile-touch-feedback mobile-hover-scale',
      card: 'mobile-card mobile-smooth-animation',
      cta: 'mobile-cta mobile-touch-feedback',
      text: 'mobile-text',
      heading: 'mobile-heading',
      spacing: 'mobile-spacing',
      grid: 'mobile-grid',
      flexColumn: 'mobile-flex-column',
      image: 'mobile-image',
      carousel: 'mobile-carousel',
      carouselItem: 'mobile-carousel-item',
      progress: 'mobile-progress',
      loading: 'mobile-loading',
      focusVisible: 'mobile-focus-visible',
      willChange: 'mobile-will-change',
      safeArea: 'mobile-safe-area',
      swipeIndicator: 'swipe-indicator',
      swipeDot: 'swipe-dot',
      mobileWorkflowStack: 'mobile-workflow-stack',
      mobileNav: 'mobile-nav',
    }
  }, [isMobile])

  return {
    isMobile,
    deviceType,
    isTouching,
    touchHandlers,
    mobileClasses,
  }
}
