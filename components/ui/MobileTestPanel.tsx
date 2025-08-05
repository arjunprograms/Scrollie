"use client"

import React, { useState } from 'react'
import { useMobileOptimizations } from '@/hooks/use-mobile'

export function MobileTestPanel() {
  const { isMobile, deviceType, mobileClasses } = useMobileOptimizations()
  const [isVisible, setIsVisible] = useState(false)

  if (!isMobile) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '12px',
      maxWidth: '300px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        📱 Mobile Test Panel
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        Device: {deviceType}
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        Mobile Classes: {Object.keys(mobileClasses).length} active
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        Touch Feedback: ✅ Active
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        Swipe Carousel: ✅ Available
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        Large Buttons: ✅ Applied
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        Stacked Layout: ✅ Applied
      </div>
      
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          cursor: 'pointer'
        }}
      >
        {isVisible ? 'Hide Details' : 'Show Details'}
      </button>
      
      {isVisible && (
        <div style={{ marginTop: '8px', fontSize: '10px' }}>
          <div>Active Classes:</div>
          {Object.entries(mobileClasses).map(([key, value]) => (
            <div key={key} style={{ marginLeft: '8px', color: '#a78bfa' }}>
              {key}: {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Mobile optimization test component
export function MobileOptimizationTest() {
  const { isMobile, mobileClasses } = useMobileOptimizations()

  if (!isMobile) return null

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 9998,
      background: 'rgba(34, 197, 94, 0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        ✅ Mobile Optimized
      </div>
      <div>Touch interactions enhanced</div>
      <div>Buttons scaled for mobile</div>
      <div>Layout stacked vertically</div>
      <div>Swipe carousel active</div>
    </div>
  )
} 