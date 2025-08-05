"use client"

import StarsBackground from "@/components/stars-background";
import { useState, useEffect } from "react";
import { useMobileOptimizations } from "@/hooks/use-mobile";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { MobileTestPanel, MobileOptimizationTest } from "@/components/ui/MobileTestPanel";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [creatorCount, setCreatorCount] = useState(10247);
  const { isMobile, mobileClasses } = useMobileOptimizations();
  const [activityFeed] = useState([
    { name: 'Sarah', action: 'just created a carousel', emoji: '✨', color: '#a78bfa' },
    { name: 'Mike', action: 'reached 10k followers', emoji: '🚀', color: '#22c55e' },
    { name: 'Emma', action: 'saved 3 hours today', emoji: '⏰', color: '#ec4899' },
    { name: 'Alex', action: 'went viral with SCROLLIE', emoji: '🔥', color: '#f59e0b' },
    { name: 'Lisa', action: 'created 50 carousels', emoji: '📈', color: '#a78bfa' },
    { name: 'David', action: 'hit 100k views', emoji: '👀', color: '#22c55e' }
  ]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [todaySignups, setTodaySignups] = useState(47);
  const [spotsRemaining, setSpotsRemaining] = useState(23);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Counter animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCreatorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Activity feed rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex(prev => (prev + 1) % activityFeed.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activityFeed.length]);

  // Today signups counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTodaySignups(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Spots remaining counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining(prev => Math.max(0, prev - Math.floor(Math.random() * 2)));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for fixed header
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      console.log(`Section with id "${sectionId}" not found`);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isDarkMode ? '#000000' : '#ffffff',
      color: isDarkMode ? '#fff' : '#000',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Navigation Header */}
      

      {/* Hero Section - Screenshot Style */}
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: isDarkMode ? '#000000' : '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 60px 20px',
        textAlign: 'center'
      }}>
        {/* Glittering star background - only show in dark mode */}
        {isDarkMode && (
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}>
            <StarsBackground />
          </div>
        )}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
          padding: isMobile ? '12px 16px' : '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
        className={isMobile ? mobileClasses.mobileNav : ''}>
          {/* Logo */}
          <img
            src={isDarkMode ? "/images/logo-scrollie-dark.png" : "/images/logo-scrollie-light.png"}
            alt="SCROLLIE"
            style={{ height: 36, width: 'auto' }}
          />
          
          {/* Navigation Menu - Desktop */}
          <div style={{ 
            display: isMobile ? 'none' : 'flex', 
            alignItems: 'center', 
            gap: isMobile ? 16 : 48 
          }}>
            <button onClick={() => scrollToSection('why-choose')} style={{
              color: isDarkMode ? '#d1d5db' : '#374151',
              textDecoration: 'none',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
            onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151'}>
              Why Choose
            </button>
            <button onClick={() => scrollToSection('features')} style={{
              color: isDarkMode ? '#d1d5db' : '#374151',
              textDecoration: 'none',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
            onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151'}>
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} style={{
              color: isDarkMode ? '#d1d5db' : '#374151',
              textDecoration: 'none',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
            onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151'}>
              Pricing
            </button>
            <button onClick={() => scrollToSection('demo')} style={{
              color: isDarkMode ? '#d1d5db' : '#374151',
              textDecoration: 'none',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
            onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151'}>
              Demo
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#000',
                fontSize: 24,
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className={mobileClasses.button}
            >
              ☰
            </button>
          )}
          
          {/* Right side buttons */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? 8 : 16 
          }}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} style={{
              background: 'transparent',
              border: `1px solid ${isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)'}`,
              borderRadius: isMobile ? 12 : 8,
              padding: isMobile ? '10px 14px' : '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              fontSize: isMobile ? 16 : 14,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.2s',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(55, 65, 81, 0.5)';
              e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)';
              e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280';
            }}>
              <span style={{ fontSize: 14 }}>{isDarkMode ? '☀️' : '🌙'}</span>
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            
            {/* Login link */}
            <button onClick={() => scrollToSection('login')} style={{
              color: isDarkMode ? '#d1d5db' : '#374151',
              textDecoration: 'none',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
              padding: isMobile ? '10px 14px' : '8px 16px',
              borderRadius: isMobile ? 12 : 8,
              border: `1px solid ${isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)'}`,
              background: 'transparent',
              cursor: 'pointer',
            }}
            className={isMobile ? mobileClasses.button : ''}
            onMouseOver={e => {
              e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827';
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(55, 65, 81, 0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151';
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)';
            }}>
              Log in
            </button>
            
            {/* CTA button */}
            <button style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f59e0b 100%)',
              color: '#fff',
              fontWeight: isMobile ? 700 : 600,
              fontSize: isMobile ? 14 : 16,
              border: 'none',
              borderRadius: isMobile ? 12 : 8,
              padding: isMobile ? '12px 16px' : '10px 20px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px 0 rgba(168,139,250,0.25)',
              transition: 'all 0.2s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
            }}
            className={isMobile ? mobileClasses.cta : ''}
            onMouseOver={e => {
              if (!isMobile) {
              e.currentTarget.style.boxShadow = '0 6px 24px 0 rgba(168,139,250,0.35)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={e => {
              if (!isMobile) {
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(168,139,250,0.25)';
              e.currentTarget.style.transform = 'translateY(0)';
              }
            }}>
              Get started now
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobile && mobileMenuOpen && (
        <div style={{
            position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
            bottom: 0,
            background: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
                    display: 'flex',
            flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
            padding: '80px 20px 40px 20px'
                }}>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                    position: 'absolute',
                top: 20,
                right: 20,
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#000',
                fontSize: 32,
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px'
              }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%', maxWidth: 300 }}>
              <button onClick={() => { scrollToSection('why-choose'); setMobileMenuOpen(false); }} style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#111827',
                    fontSize: 20,
                      fontWeight: 600,
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                      width: '100%',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                Why Choose
              </button>
              <button onClick={() => { scrollToSection('features'); setMobileMenuOpen(false); }} style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#111827',
                fontSize: 20,
                      fontWeight: 600,
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                      width: '100%',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                Features
              </button>
              <button onClick={() => { scrollToSection('pricing'); setMobileMenuOpen(false); }} style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#111827',
                    fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                      width: '100%',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                Pricing
              </button>
              <button onClick={() => { scrollToSection('demo'); setMobileMenuOpen(false); }} style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#111827',
                    fontSize: 20,
                        fontWeight: 600, 
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                      width: '100%',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                Demo
              </button>
              <button onClick={() => { scrollToSection('login'); setMobileMenuOpen(false); }} style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#fff' : '#111827',
                    fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'center'
              }}
              onMouseOver={e => e.currentTarget.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                Log in
              </button>
                    </div>
                  </div>
        )}
        
        {/* Hero content (zIndex: 1) */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: isMobile ? 40 : 64,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 24,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: isDarkMode ? '#fff' : '#111827',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textShadow: isDarkMode ? '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(167, 139, 250, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.2))',
            position: 'relative'
          }}
          className={isMobile ? mobileClasses.heading : ''}>
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800,
              textShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
              animation: 'text-glow 3s ease-in-out infinite'
            }}>
              The only tool
            </span>
            <span style={{ fontWeight: 600 }}> that creates voiced carousels from any content</span>
          </h1>
          <p style={{
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            fontSize: isMobile ? 16 : 20,
            maxWidth: 600,
            textAlign: 'center',
            margin: '0 auto 48px auto',
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
          }}
          className={isMobile ? mobileClasses.text : ''}>
            Paste any URL, blog post, or idea. Get professional carousels with AI voiceover in <span style={{
              fontWeight: 700,
              color: isDarkMode ? '#22c55e' : '#16a34a',
              textShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
              animation: 'text-glow 2s ease-in-out infinite'
            }}>5 minutes</span>. No design skills, no separate voice apps, no manual work.
          </p>

          {/* CTA Buttons */}
              <div style={{
                  display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 16 : 24,
                  justifyContent: 'center',
                  alignItems: 'center',
            marginBottom: 64
          }}>
            <button style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f59e0b 100%)',
                  color: '#fff', 
              fontWeight: 700,
              fontSize: isMobile ? 16 : 18,
              border: 'none',
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '16px 24px' : '16px 32px',
                  cursor: 'pointer',
              boxShadow: '0 8px 32px 0 rgba(168,139,250,0.3)',
              transition: 'all 0.3s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              position: 'relative',
              overflow: 'hidden'
            }}
            className={isMobile ? mobileClasses.cta : ''}
                onMouseOver={e => {
              if (!isMobile) {
                e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(168,139,250,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
                }}
                onMouseOut={e => {
              if (!isMobile) {
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(168,139,250,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>Start creating now - Free</span>
            </button>
            
            <button style={{
              background: 'transparent',
              color: isDarkMode ? '#d1d5db' : '#374151',
              fontWeight: 600,
              fontSize: isMobile ? 16 : 18,
              border: `2px solid ${isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)'}`,
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '14px 22px' : '14px 30px',
                  cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
              gap: 8
            }}
            className={isMobile ? mobileClasses.button : ''}
                onMouseOver={e => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.6)' : 'rgba(55, 65, 81, 0.6)';
              e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827';
                }}
                onMouseOut={e => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)';
              e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151';
            }}>
              <span style={{ fontSize: 20 }}>▶️</span>
              Watch demo
            </button>
              </div>
              
          {/* Social Proof */}
                <div style={{ 
                  display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center', 
                  justifyContent: 'center', 
            gap: isMobile ? 16 : 32,
            marginBottom: 48,
            flexWrap: 'wrap'
          }}>
          <div style={{
                display: 'flex',
                alignItems: 'center',
              gap: 8,
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500
            }}>
              <span style={{ fontSize: 20 }}>👥</span>
              <span>{creatorCount.toLocaleString()}+ creators</span>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
              gap: 8,
              color: isDarkMode ? '#9ca3af' : '#6b7280',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500
            }}>
              <span style={{ fontSize: 20 }}>⭐</span>
              <span>4.9/5 rating</span>
            </div>
             <div style={{
               display: 'flex',
              alignItems: 'center',
               gap: 8,
               color: isDarkMode ? '#9ca3af' : '#6b7280',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500
            }}>
              <span style={{ fontSize: 20 }}>🚀</span>
              <span>5 min setup</span>
                 </div>
             </div>
            
          {/* Activity Feed */}
          <div style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
            borderRadius: 16,
            padding: isMobile ? '16px' : '24px',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            maxWidth: 500,
            margin: '0 auto',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: isDarkMode ? '#d1d5db' : '#374151',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500
            }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <span>{activityFeed[currentActivityIndex].name} {activityFeed[currentActivityIndex].action}</span>
              <span style={{ 
                fontSize: 20,
                color: activityFeed[currentActivityIndex].color,
                textShadow: `0 0 10px ${activityFeed[currentActivityIndex].color}`
              }}>
                {activityFeed[currentActivityIndex].emoji}
              </span>
              </div>
              </div>
              </div>
          </div>
          
      {/* Why Choose Section */}
      <div id="why-choose" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
          <div style={{ 
        maxWidth: 1200,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? 32 : 48,
            fontWeight: 700,
            marginBottom: 16,
            color: isDarkMode ? '#fff' : '#111827',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Why choose SCROLLIE?
          </h2>
            <p style={{
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            fontSize: isMobile ? 16 : 20,
            maxWidth: 600,
            margin: '0 auto 64px auto',
            lineHeight: 1.6
          }}>
            The only all-in-one platform that combines AI content creation, professional design, and voice generation
          </p>

          {/* Features Grid */}
          <div id="features" style={{
              display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 24 : 32,
            marginBottom: 64
          }}>
            {/* Feature 1 */}
              <div style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
              borderRadius: 16,
              padding: isMobile ? '24px' : '32px',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              cursor: 'pointer'
          }}
          onMouseOver={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
              }
          }}
          onMouseOut={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
              }
            }}>
            <div style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28
              }}>
                ✨
              </div>
              <h3 style={{
                fontSize: isMobile ? 20 : 24,
                    fontWeight: 600,
                marginBottom: 12,
                color: isDarkMode ? '#fff' : '#111827'
              }}>
                AI-Powered Content
              </h3>
              <p style={{
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                lineHeight: 1.6,
                fontSize: isMobile ? 14 : 16
              }}>
                Transform any URL, blog post, or idea into engaging carousel content with advanced AI that understands context and creates compelling narratives.
              </p>
          </div>

            {/* Feature 2 */}
          <div style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
              borderRadius: 16,
              padding: isMobile ? '24px' : '32px',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              cursor: 'pointer'
          }}
          onMouseOver={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
              }
          }}
          onMouseOut={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
              }
            }}>
            <div style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28
              }}>
                🎨
              </div>
              <h3 style={{
                fontSize: isMobile ? 20 : 24,
                    fontWeight: 600,
                marginBottom: 12,
                color: isDarkMode ? '#fff' : '#111827'
              }}>
                Professional Design
              </h3>
              <p style={{
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                lineHeight: 1.6,
                fontSize: isMobile ? 14 : 16
              }}>
                Beautiful, mobile-optimized carousel designs that follow the latest trends and best practices for social media engagement.
              </p>
          </div>

            {/* Feature 3 */}
          <div style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
              borderRadius: 16,
              padding: isMobile ? '24px' : '32px',
              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              cursor: 'pointer'
          }}
          onMouseOver={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)';
              }
          }}
          onMouseOut={e => {
              if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
              }
            }}>
            <div style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 28
              }}>
                🎤
                </div>
              <h3 style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: 600,
                marginBottom: 12,
                color: isDarkMode ? '#fff' : '#111827'
              }}>
                AI Voice Generation
              </h3>
          <p style={{
            color: isDarkMode ? '#9ca3af' : '#6b7280',
                lineHeight: 1.6,
                fontSize: isMobile ? 14 : 16
          }}>
                Natural-sounding voiceovers that match your content tone and style, with multiple voice options and customization features.
          </p>
        </div>
          </div>
            </div>
          </div>
          
      {/* In-Depth Tutorials Section */}
            <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
              In-Depth Tutorials
            </h2>
            <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Learn how to get the most out of SCROLLIE with step-by-step guides and code samples
            </p>
          </div>
          
          {/* Tutorials Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 32 : 48, marginBottom: 64 }}>
            {/* Tutorial 1 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', transition: 'all 0.3s', marginBottom: 32 }}>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: isDarkMode ? '#fff' : '#111827', marginBottom: 16 }}>How to Create a Viral Carousel</h3>
              <ol style={{ color: isDarkMode ? '#d1d5db' : '#374151', fontSize: isMobile ? 14 : 16, lineHeight: 1.6, marginBottom: 16 }}>
                <li>Paste your blog post or URL into the input field.</li>
                <li>Select your preferred template and voice style.</li>
                <li>Customize the slides and add your brand assets.</li>
                <li>Preview the AI-generated voiceover and make adjustments.</li>
                <li>Export as video or share directly to social media.</li>
              </ol>
              <div style={{ background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)', borderRadius: 12, padding: 16, fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace', fontSize: isMobile ? 12 : 14, marginBottom: 16 }}>
                <pre style={{ margin: 0, color: isDarkMode ? '#d1d5db' : '#374151' }}>{`// Example: Creating a carousel via API
fetch('https://api.scrollie.com/v1/carousels', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'https://example.com/blog-post',
    voice: 'en-US-Neural2-F',
    template: 'modern',
    export_format: 'mp4'
  })
})
.then(res => res.json())
.then(data => console.log(data));`}</pre>
            </div>
              <img src="/images/carousel-demo.png" alt="Carousel Demo" style={{ width: '100%', borderRadius: 12, marginBottom: 16 }} />
        </div>

            {/* Tutorial 2 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', transition: 'all 0.3s', marginBottom: 32 }}>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: isDarkMode ? '#fff' : '#111827', marginBottom: 16 }}>Customizing Voice and Branding</h3>
              <ol style={{ color: isDarkMode ? '#d1d5db' : '#374151', fontSize: isMobile ? 14 : 16, lineHeight: 1.6, marginBottom: 16 }}>
                <li>Choose from 50+ AI voices in different languages and accents.</li>
                <li>Adjust speed, pitch, and emotion to match your brand.</li>
                <li>Upload your logo and select your brand colors.</li>
                <li>Save your custom template for future use.</li>
              </ol>
              <div style={{ background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)', borderRadius: 12, padding: 16, fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace', fontSize: isMobile ? 12 : 14, marginBottom: 16 }}>
                <pre style={{ margin: 0, color: isDarkMode ? '#d1d5db' : '#374151' }}>{`// Example: Setting voice and branding via API
fetch('https://api.scrollie.com/v1/settings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    voice: 'en-GB-Wavenet-B',
    brand: {
      logo: 'https://yourdomain.com/logo.png',
      color: '#a78bfa'
    }
  })
})
.then(res => res.json())
.then(data => console.log(data));`}</pre>
          </div>
              <img src="/images/logo-scrollie-dark.png" alt="Branding Example" style={{ width: 120, borderRadius: 12, marginBottom: 16 }} />
          </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Simple and Clear */}
      <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            How It Works
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            Create professional carousels in just 3 simple steps
          </p>

          {/* Simple Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 32 : 48, marginBottom: 64 }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: 32, color: '#fff' }}>
                1
            </div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Paste Your Content
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Simply paste any URL, blog post, or write your own content. SCROLLIE will automatically extract the key information.
              </p>
          </div>
          
            {/* Step 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: 32, color: '#fff' }}>
                2
            </div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Choose Your Style
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Pick from beautiful templates and select a voice that matches your brand. Customize colors and add your logo.
              </p>
          </div>
          
            {/* Step 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', fontSize: 32, color: '#fff' }}>
                3
            </div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Export & Share
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Download your video or share directly to social media. Your carousel is ready in just 5 minutes!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Benefits Section */}
      <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Why Choose SCROLLIE?
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            Everything you need in one simple tool
          </p>

          {/* Simple Benefits Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 32 : 48 }}>
            {/* Benefit 1 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Super Fast
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Create carousels in 5 minutes instead of hours. No design skills needed.
          </p>
        </div>

            {/* Benefit 2 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎤</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                AI Voice
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Natural-sounding voiceovers that make your content more engaging.
              </p>
          </div>
          
            {/* Benefit 3 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Mobile Ready
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                Perfect for Instagram, TikTok, and all social media platforms.
              </p>
          </div>
          
            {/* Benefit 4 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💰</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Save Money
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
                No need to hire designers or voice actors. Do it all yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple User Stories Section */}
      <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Real People, Real Results
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            See how different people use SCROLLIE to grow their business
          </p>

          {/* User Stories Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 32 : 48 }}>
            {/* Story 1 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👩‍💼</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Sarah - Small Business Owner
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "I used to spend 3 hours creating content. Now I do it in 15 minutes and get more engagement!"
              </p>
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: isMobile ? 14 : 16 }}>
                +300% more followers
            </div>
              </div>
              
            {/* Story 2 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍💻</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Mike - Content Creator
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "The AI voice makes my content sound professional. My audience loves it!"
              </p>
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: isMobile ? 14 : 16 }}>
                +500% engagement
              </div>
              </div>
              
            {/* Story 3 */}
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '32px' : '40px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
                Tech Company
              </h3>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "We save $10,000 per month on content creation. SCROLLIE pays for itself!"
              </p>
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: isMobile ? 14 : 16 }}>
                $10K saved monthly
              </div>
            </div>
              </div>
            </div>
          </div>

      {/* Simple FAQ Section */}
          <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
              Common Questions
            </h2>
            <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, lineHeight: 1.6 }}>
              Everything you need to know about SCROLLIE
            </p>
          </div>

          {/* Simple FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                question: "How much does SCROLLIE cost?",
                answer: "We have a free plan with 5 carousels per month. Our Pro plan is $29/month for unlimited carousels and all features."
              },
              {
                question: "Do I need design skills?",
                answer: "No! SCROLLIE does all the design work for you. Just paste your content and choose a template."
              },
              {
                question: "What social media platforms work?",
                answer: "All of them! Instagram, TikTok, LinkedIn, Facebook, Twitter - SCROLLIE works everywhere."
              },
              {
                question: "How long does it take to create a carousel?",
                answer: "Usually 5 minutes or less. Just paste your content, pick a style, and export!"
              },
              {
                question: "Can I use my own voice?",
                answer: "Yes! You can upload your own audio or choose from 50+ AI voices in different languages."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! Start with our free plan - no credit card required. Upgrade anytime."
              }
            ].map((faq, index) => (
              <div key={index} style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                borderRadius: 16,
                padding: isMobile ? '24px' : '32px',
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'all 0.3s'
          }}
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          onMouseOver={e => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
          }}
          onMouseOut={e => {
                if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
                }
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                  marginBottom: openFAQ === index ? 16 : 0
                }}>
                  <h3 style={{
                    fontSize: isMobile ? 18 : 20,
                    fontWeight: 600,
                    color: isDarkMode ? '#fff' : '#111827',
                    margin: 0
                  }}>
                    {faq.question}
                  </h3>
                  <span style={{
                    fontSize: 20,
                    color: isDarkMode ? '#9ca3af' : '#6b7280',
                    transition: 'transform 0.3s',
                    transform: openFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}>
                    {openFAQ === index ? '−' : '+'}
                  </span>
              </div>
                {openFAQ === index && (
                  <p style={{
                    color: isDarkMode ? '#d1d5db' : '#374151',
                    lineHeight: 1.6,
                    fontSize: isMobile ? 14 : 16,
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>

      {/* Simple Demo Section */}
      <div id="demo" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            See SCROLLIE in Action
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            Watch how easy it is to create professional carousels
          </p>

          {/* Demo Video Placeholder */}
          <div style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: 20,
            padding: isMobile ? '40px' : '80px',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
            marginBottom: 48
          }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>▶️</div>
            <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827' }}>
              Watch Demo Video
            </h3>
            <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16 }}>
              See how to create a carousel from start to finish in just 2 minutes
            </p>
          </div>
          
          {/* Demo Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📝</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Paste Content
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Any URL or text
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎨</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Choose Style
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Pick template & voice
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📤</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Export Video
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Ready to share
              </p>
          </div>
            </div>
          </div>
        </div>

      {/* Simple Contact Section */}
        <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Get Started Today
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            Join thousands of creators who are already using SCROLLIE
          </p>

          {/* Contact Buttons */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 24, justifyContent: 'center', alignItems: 'center', marginBottom: 48 }}>
            <button style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: isMobile ? 16 : 18,
              border: 'none',
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '16px 24px' : '16px 32px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={e => {
              if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,139,250,0.3)';
              }
            }}
            onMouseOut={e => {
              if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}>
              Start Free Trial
            </button>
            <button style={{
              background: 'transparent',
              color: isDarkMode ? '#d1d5db' : '#374151',
              fontWeight: 600,
              fontSize: isMobile ? 16 : 18,
              border: `2px solid ${isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)'}`,
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '14px 22px' : '14px 30px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={e => { 
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.6)' : 'rgba(55, 65, 81, 0.6)';
              e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827';
            }}
            onMouseOut={e => { 
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)';
              e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151';
            }}>
              Contact Sales
            </button>
            </div>
            
          {/* Contact Info */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📧</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Email Support
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>
                help@scrollie.com
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>💬</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Live Chat
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>
                Available 24/7
              </p>
                </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📚</div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Help Center
              </h4>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>
                Guides & Tutorials
              </p>
              </div>
                </div>
              </div>
            </div>
            
      {/* Features Comparison Section */}
      <div id="pricing" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            SCROLLIE vs Other Tools
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            See why creators choose SCROLLIE over traditional tools
          </p>

          {/* Comparison Table */}
          <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 20, padding: isMobile ? '24px' : '32px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? 14 : 16 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: isDarkMode ? '#fff' : '#111827' }}>Feature</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: isDarkMode ? '#fff' : '#111827' }}>SCROLLIE</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Canva</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Figma</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` }}>
                  <td style={{ padding: '16px', color: isDarkMode ? '#d1d5db' : '#374151', fontWeight: 500 }}>AI Voice Generation</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>✓ Built-in</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>✗ None</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>✗ None</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` }}>
                  <td style={{ padding: '16px', color: isDarkMode ? '#d1d5db' : '#374151', fontWeight: 500 }}>Time to Create</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>5 minutes</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>2+ hours</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>4+ hours</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` }}>
                  <td style={{ padding: '16px', color: isDarkMode ? '#d1d5db' : '#374151', fontWeight: 500 }}>Design Skills Required</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>None</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Basic</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Advanced</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}` }}>
                  <td style={{ padding: '16px', color: isDarkMode ? '#d1d5db' : '#374151', fontWeight: 500 }}>Export to Video</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>One-click</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Complex</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Manual</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', color: isDarkMode ? '#d1d5db' : '#374151', fontWeight: 500 }}>Cost</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>$29/month</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>$12.99/month</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>$12/month</td>
                </tr>
              </tbody>
            </table>
            </div>
              </div>
            </div>
            
      {/* Social Proof Section */}
      <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)' : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Trusted by Creators Worldwide
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            Join thousands of satisfied users who have transformed their content creation
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 24 : 32, marginBottom: 64 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: isDarkMode ? '#fff' : '#111827', marginBottom: 8 }}>10K+</div>
              <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>Active Users</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: isDarkMode ? '#fff' : '#111827', marginBottom: 8 }}>500K+</div>
              <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>Carousels Created</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: isDarkMode ? '#fff' : '#111827', marginBottom: 8 }}>4.9/5</div>
              <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>User Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: isDarkMode ? '#fff' : '#111827', marginBottom: 8 }}>24/7</div>
              <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>Support</div>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32 }}>
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '24px' : '32px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: '#f59e0b', fontSize: 18 }}>⭐</span>
                ))}
            </div>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "SCROLLIE saved me hours every week. The AI voice is incredible!"
              </p>
              <div style={{ fontWeight: 600, color: isDarkMode ? '#fff' : '#111827', fontSize: isMobile ? 14 : 16 }}>
                - Sarah M.
            </div>
          </div>
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '24px' : '32px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: '#f59e0b', fontSize: 18 }}>⭐</span>
                ))}
            </div>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "Best investment for my business. Content creation is now effortless."
              </p>
              <div style={{ fontWeight: 600, color: isDarkMode ? '#fff' : '#111827', fontSize: isMobile ? 14 : 16 }}>
                - Mike R.
            </div>
          </div>
            <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)', borderRadius: 16, padding: isMobile ? '24px' : '32px', border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: '#f59e0b', fontSize: 18 }}>⭐</span>
                ))}
        </div>
              <p style={{ color: isDarkMode ? '#d1d5db' : '#374151', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, marginBottom: 16 }}>
                "The templates are beautiful and the voice generation is spot-on."
              </p>
              <div style={{ fontWeight: 600, color: isDarkMode ? '#fff' : '#111827', fontSize: isMobile ? 14 : 16 }}>
                - Emma T.
      </div>
          </div>
        </div>
      </div>
      </div>

      {/* Getting Started Guide */}
        <div style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Getting Started is Easy
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 64px auto', lineHeight: 1.6 }}>
            Follow these simple steps to create your first carousel
          </p>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 24 : 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 24, color: '#fff' }}>
                1
              </div>
              <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Sign Up
              </h3>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Create your free account in 30 seconds
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 24, color: '#fff' }}>
                2
                </div>
              <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Add Content
              </h3>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Paste any URL or write your content
              </p>
              </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 24, color: '#fff' }}>
                3
                </div>
              <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Customize
              </h3>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Choose template and voice style
              </p>
              </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 24, color: '#fff' }}>
                4
                </div>
              <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 8, color: isDarkMode ? '#fff' : '#111827' }}>
                Export
              </h3>
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 12 : 14 }}>
                Download and share your video
              </p>
              </div>
            </div>
            </div>
          </div>

      {/* Login Section */}
      <div id="login" style={{
        padding: isMobile ? '80px 20px' : '120px 40px',
        background: isDarkMode ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16, color: isDarkMode ? '#fff' : '#111827', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.02em' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 16 : 20, maxWidth: 600, margin: '0 auto 48px auto', lineHeight: 1.6 }}>
            Join thousands of creators who are already using SCROLLIE to create amazing content
          </p>

          {/* Login Buttons */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 24, justifyContent: 'center', alignItems: 'center', marginBottom: 48 }}>
            <button style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
              color: '#fff',
                fontWeight: 700,
              fontSize: isMobile ? 16 : 18,
              border: 'none',
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '16px 24px' : '16px 32px',
              cursor: 'pointer',
              transition: 'all 0.3s',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={e => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,139,250,0.3)';
              }
            }}
            onMouseOut={e => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(168,139,250,0.2)';
              }
            }}>
              Sign Up Free
            </button>
            <button style={{
              background: 'transparent',
              color: isDarkMode ? '#d1d5db' : '#374151',
                    fontWeight: 600,
              fontSize: isMobile ? 16 : 18,
              border: `2px solid ${isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)'}`,
              borderRadius: isMobile ? 16 : 12,
              padding: isMobile ? '16px 24px' : '16px 32px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={e => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(55, 65, 81, 0.5)';
                e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827';
              }
            }}
            onMouseOut={e => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(55, 65, 81, 0.3)';
                e.currentTarget.style.color = isDarkMode ? '#d1d5db' : '#374151';
              }
            }}>
              Log In
            </button>
          </div>
                </div>
              </div>
              
      {/* Footer */}
      <footer style={{
        background: isDarkMode ? '#000000' : '#ffffff',
        borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        padding: isMobile ? '60px 20px 40px 20px' : '80px 40px 60px 40px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Footer Content */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 40 : 60, marginBottom: 48 }}>
            {/* Company Info */}
            <div>
              <img
                src={isDarkMode ? "/images/logo-scrollie-dark.png" : "/images/logo-scrollie-light.png"}
                alt="SCROLLIE"
                style={{ height: 32, width: 'auto', marginBottom: 16 }}
              />
              <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16, lineHeight: 1.6, marginBottom: 24 }}>
                The only tool that creates voiced carousels from any content. Transform your ideas into engaging videos in minutes.
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                    color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'color 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  🐦
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'color 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  📘
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'color 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  💼
                </button>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 20, color: isDarkMode ? '#fff' : '#111827' }}>
                Product
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={() => scrollToSection('features')} style={{
                  background: 'transparent',
                  border: 'none',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Features
                </button>
                <button onClick={() => scrollToSection('pricing')} style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Pricing
                </button>
                <button onClick={() => scrollToSection('demo')} style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Demo
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Templates
                </button>
          </div>
        </div>

            {/* Company Links */}
            <div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 20, color: isDarkMode ? '#fff' : '#111827' }}>
                Company
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{
                  background: 'transparent',
            border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
            cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  About
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Blog
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Careers
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Contact
          </button>
        </div>
      </div>

            {/* Support Links */}
            <div>
              <h4 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, marginBottom: 20, color: isDarkMode ? '#fff' : '#111827' }}>
                Support
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Help Center
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Documentation
                </button>
          <button style={{
                  background: 'transparent',
            border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
            cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Community
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0
                }}
                onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
                onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                  Status
          </button>
              </div>
        </div>
      </div>

          {/* Footer Bottom */}
      <div style={{
            borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            paddingTop: 32,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? 16 : 0
          }}>
            <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: isMobile ? 14 : 16 }}>
              © 2024 SCROLLIE. All rights reserved.
          </div>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 32, fontSize: isMobile ? 14 : 16 }}>
          <button style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
            cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0
              }}
              onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
              onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                Privacy Policy
              </button>
              <button style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0
              }}
              onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
              onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                Terms of Service
              </button>
              <button style={{
                background: 'transparent',
                border: 'none',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0
              }}
              onMouseOver={e => e.currentTarget.style.color = isDarkMode ? '#fff' : '#111827'}
              onMouseOut={e => e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}>
                Cookie Policy
          </button>
        </div>
      </div>
        </div>
      </footer>
    </div>
  );
}