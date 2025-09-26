'use client'

import { useEffect } from 'react'

/**
 * Service Worker registration for STYRCON Slovak website
 * Enables offline functionality and app-like experience
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const shouldRegister = process.env.NODE_ENV === 'production'

      if (shouldRegister) {
        registerServiceWorker()
      } else {
        // In development, unregister any existing service workers to prevent conflicts
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            console.log('🧹 Unregistering existing service worker in development')
            registration.unregister()
          })
        })
      }
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      console.log('🔧 Registering STYRCON Service Worker...')

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available, show update notification
                console.log('🆕 New Slovak website content available')
                showUpdateNotification()
              } else {
                // Content cached for offline use
                console.log('✅ STYRCON website cached for offline use')
                showOfflineReadyNotification()
              }
            }
          })
        }
      })

      console.log('✅ STYRCON Service Worker registered successfully')

    } catch (error) {
      console.error('❌ STYRCON Service Worker registration failed:', error)
    }
  }

  const showUpdateNotification = () => {
    // Simple update notification for Slovak users
    if (confirm('Nová verzia stránky je dostupná. Chcete ju načítať?')) {
      window.location.reload()
    }
  }

  const showOfflineReadyNotification = () => {
    // Notify that the Slovak website works offline
    console.log('📱 STYRCON stránka je pripravená na offline použitie')

    // Could show a subtle notification to Slovak users
    setTimeout(() => {
      const notification = document.createElement('div')
      notification.innerHTML = '✅ Stránka je pripravená na offline použitie'
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #059669;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
      `

      // Add slide-in animation
      const style = document.createElement('style')
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)
      document.body.appendChild(notification)

      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.remove()
        style.remove()
      }, 5000)
    }, 2000) // Show after 2 seconds
  }

  return null // This component doesn't render anything
}

/**
 * Hook to check if the app is running as a PWA
 */
export function useIsPWA() {
  const isPWA =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
     window.matchMedia('(display-mode: fullscreen)').matches ||
     (window.navigator as any)?.standalone === true)

  return isPWA
}