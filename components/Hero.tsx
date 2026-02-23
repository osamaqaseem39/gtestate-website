'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronDown,
  Diamond
} from 'lucide-react'
import Navigation from './Navigation'
import { useGSAP } from './GSAPContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const { scrollTo, getScrollY } = useGSAP()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const sectionRef = useRef<HTMLElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [aboutContentProgress, setAboutContentProgress] = useState(0)
  const [allAnimationsComplete, setAllAnimationsComplete] = useState(false)
  const [showNewContent, setShowNewContent] = useState(false)
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false)
  const [secondSlideLoaded, setSecondSlideLoaded] = useState(false)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false)
  const [screenLocked, setScreenLocked] = useState(false) // Lock screen for reading
  const [useRelativePosition, setUseRelativePosition] = useState(false) // Use relative positioning during lock
  const scrollProgressRef = useRef(0)
  const isCompleteRef = useRef(false)
  const scrollPositionRef = useRef(0)
  const heroHeightRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const targetAboutProgressRef = useRef(0) // Target progress from scroll
  const animationFrameRef = useRef<number | null>(null)
  const aboutContentProgressRef = useRef(0) // Current progress ref to avoid closure issues
  const lockedImageScaleRef = useRef<number | null>(null) // Lock image scale once about section appears
  const [lockedImageScale, setLockedImageScale] = useState<number | null>(null) // State for locked scale to prevent flickering
  const lastProcessedScrollYRef = useRef<number>(0) // Track last processed scrollY to prevent micro-updates
  const lastScrollToTimeRef = useRef<number>(0) // Track last scrollTo call time to prevent rapid updates
  const screenLockTimerRef = useRef<NodeJS.Timeout | null>(null) // Timer for screen lock
  const lockedScrollPositionRef = useRef<number | null>(null) // Store scroll position when locked
  const scrollPositionAtLockRef = useRef<number | null>(null) // Store scroll position when lock started
  const hasUserScrolledAfterUnlockRef = useRef<boolean>(false) // Track if user has scrolled after unlock
  
  // Update viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateViewportSize()
    window.addEventListener('resize', updateViewportSize)
    
    return () => {
      window.removeEventListener('resize', updateViewportSize)
    }
  }, [])
  
  // Update refs when state changes
  useEffect(() => {
    scrollProgressRef.current = scrollProgress
    isCompleteRef.current = isAnimationComplete
    aboutContentProgressRef.current = aboutContentProgress
  }, [scrollProgress, isAnimationComplete, aboutContentProgress])
  const firstSlideLoadedRef = useRef(false)
  const scrollYWhenFirstSlideLoadedRef = useRef(0)
  useEffect(() => {
    firstSlideLoadedRef.current = firstSlideLoaded
  }, [firstSlideLoaded])
  // Record scroll position when first slide loads – hero stays until user scrolls *after* this
  useEffect(() => {
    if (firstSlideLoaded) {
      const y = getScrollY()
      scrollYWhenFirstSlideLoadedRef.current = y
    }
  }, [firstSlideLoaded, getScrollY])
  
  // Calculate scale from scroll progress (all animations based on scrollY)
  // Scale calculated from scrollProgress: 1 + (scrollProgress * 19)
  // Scale 10-15 = first slide visible (scrollY ~50-75% of heroHeight)
  // Scale 15 = transition to second slide (scrollY = 75% of heroHeight)
  // Scale 20 = 100% max scale (scrollY = 100% of heroHeight)
  // After scale 20, slide animations are based on scrollY (scrollY = 100-150% of heroHeight)
  const currentScale = 1 + (scrollProgress * 19)
  
  // Calculate if square has reached scale 10 - show first slide content at this point
  const hasReachedScale10 = currentScale >= 10
  
  // Calculate opacity for content based on scale progress (0 at scale 10, 1 at scale 10+)
  // First slide is fully visible from scale 10 to 15
  const contentOpacity = hasReachedScale10 
    ? 1 // Fully visible from scale 10 onwards
    : 0
  
  // Calculate if square has reached scale 15 (transition to second slide)
  const hasReachedFullScale = currentScale >= 15
  
  // Calculate if square has reached scale 20 (end of second slide)
  const hasReachedScale20 = currentScale >= 20
  
  // Calculate about image scale: starts at 1.5 (150%) and scales down to 1.1 (110%) as square scales from 1 to 15
  // Image scales proportionally with the square scale, but stops at 1.1 once square reaches full screen
  // Lock the scale once about section appears to prevent glitches
  // Round to 4 decimal places to prevent flickering from tiny floating point differences
  const calculatedImageScale = useMemo(() => {
    const cappedScale = Math.min(currentScale, 15)
    const scale = Math.max(1.1, 1.5 - ((cappedScale - 1) / (15 - 1)) * (1.5 - 1.1))
    return Math.round(scale * 10000) / 10000 // Round to 4 decimal places
  }, [currentScale])
  
  // Lock image scale earlier (when square reaches 80% scale) to prevent flickering during transition
  // This prevents the image from flickering as scroll progress updates rapidly
  useEffect(() => {
    const scaleThreshold = 12 // 80% of 15 (when square reaches 80% scale)
    if (currentScale >= scaleThreshold && lockedImageScale === null) {
      setLockedImageScale(calculatedImageScale)
      lockedImageScaleRef.current = calculatedImageScale
    }
    // Reset lock if scrolling back up below threshold
    if (currentScale < scaleThreshold && lockedImageScale !== null) {
      setLockedImageScale(null)
      lockedImageScaleRef.current = null
    }
  }, [currentScale, calculatedImageScale, lockedImageScale])
  
  // Use locked scale if available, otherwise use calculated scale
  // Memoize to prevent unnecessary recalculations and ensure stable reference
  const aboutImageScale = useMemo(() => {
    return lockedImageScale !== null 
      ? lockedImageScale 
      : calculatedImageScale
  }, [lockedImageScale, calculatedImageScale])
  
  
  // Track when first slide content is loaded (when square reaches full scale)
  useEffect(() => {
    // Only trigger if we've reached full scale AND first slide hasn't loaded yet
    // This ensures it only triggers once per scroll cycle
    if (hasReachedFullScale && !firstSlideLoaded) {
      console.log('🎬 ANIMATION TRIGGER - First slide load started (scale >= 15)')
      // Reset progress refs to ensure clean state
      targetAboutProgressRef.current = 0
      aboutContentProgressRef.current = 0
      setAboutContentProgress(0)
      // Cancel any running animation loop
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      // Wait for first slide content to animate in (1.5s)
      const timer = setTimeout(() => {
        console.log('🎬 ANIMATION TRIGGER - First slide loaded, setting firstSlideLoaded=true')
        setFirstSlideLoaded(true)
        // Reset second slide states to ensure clean transition
        setSecondSlideLoaded(false)
        setShowNewContent(false)
        // Don't set target to 1 automatically - let scroll handler control it
        // The scroll handler will set targetAboutProgressRef based on scroll position
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [hasReachedFullScale, firstSlideLoaded])
  
  // This effect is no longer needed - scroll handler controls progress directly
  // Removed to prevent conflicts
  
  // Track when second slide content is loaded (when aboutContentProgress > 0.1)
  useEffect(() => {
    if (aboutContentProgress > 0.1 && firstSlideLoaded && !secondSlideLoaded) {
      console.log('🎬 ANIMATION TRIGGER - Second slide load started (progress > 0.1):', aboutContentProgress.toFixed(4))
      // Wait for second slide content to animate in (1.5s)
      const timer = setTimeout(() => {
        console.log('🎬 ANIMATION TRIGGER - Second slide loaded, setting secondSlideLoaded=true')
        setSecondSlideLoaded(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else if (aboutContentProgress <= 0.1 && secondSlideLoaded) {
      // Reset second slide loaded state when scrolling back up
      console.log('🎬 ANIMATION TRIGGER - Second slide unloaded (scrolled back up, progress <= 0.1):', aboutContentProgress.toFixed(4))
      setSecondSlideLoaded(false)
      setAllAnimationsComplete(false)
    }
  }, [aboutContentProgress, firstSlideLoaded, secondSlideLoaded])
  
  // allAnimationsComplete: set in scroll handler when user scrolls past second slide (scrollY >= lockY + heroHeight); no early set
  
  // Animation loop - DISABLED during scroll-driven transitions to prevent pulsing
  // Progress is set directly from scroll handler when hasReachedFullScale && firstSlideLoaded
  useEffect(() => {
    // Completely disable animation loop when scroll is driving the progress
    // This prevents conflicts between scroll handler and animation loop
    if (hasReachedFullScale && firstSlideLoaded) {
      // Cancel any running animation - scroll handler manages progress directly
      if (animationFrameRef.current !== null) {
        console.log('🎬 ANIMATION TRIGGER - Animation loop disabled (scroll-driven mode)')
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return
    }
    
    // Only use animation loop when NOT in scroll-driven phase
    const animateProgress = () => {
      const current = aboutContentProgressRef.current
      const target = targetAboutProgressRef.current
      const diff = target - current
      const absDiff = Math.abs(diff)
      
      // If difference is extremely small (essentially zero), snap to target
      if (absDiff < 0.001) {
        if (absDiff > 0.0001) {
          aboutContentProgressRef.current = target
          setAboutContentProgress(target)
        }
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        return
      }
      
      // Smooth interpolation - move towards target at fixed rate
      const speed = 1.67 / 60 // Progress units per frame (for 60fps)
      const step = Math.sign(diff) * Math.min(absDiff, speed)
      const newProgress = current + step
      
      // Update ref immediately for next frame
      aboutContentProgressRef.current = newProgress
      setAboutContentProgress(newProgress)
      animationFrameRef.current = requestAnimationFrame(animateProgress)
    }
    
    // Check if we need to start/continue animation
    const diff = Math.abs(targetAboutProgressRef.current - aboutContentProgress)
    
    if (diff > 0.001) {
      // Start animation loop if not already running
      if (animationFrameRef.current === null) {
        console.log('🎬 ANIMATION TRIGGER - Animation loop started:', {
          current: aboutContentProgress.toFixed(4),
          target: targetAboutProgressRef.current.toFixed(4),
          diff: diff.toFixed(4)
        })
        animationFrameRef.current = requestAnimationFrame(animateProgress)
      }
    } else {
      // Stop animation loop if we've reached target
      if (animationFrameRef.current !== null && diff < 0.0001) {
        console.log('🎬 ANIMATION TRIGGER - Animation loop stopped (reached target):', targetAboutProgressRef.current.toFixed(4))
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [aboutContentProgress, firstSlideLoaded, hasReachedFullScale])
  
  // Remove the duplicate animation trigger - the main animation loop handles this
  
  useEffect(() => {
    // Transition between "about" and "visions" - works both ways
    const THRESHOLD = 0.1

    if (aboutContentProgress >= THRESHOLD && !showNewContent) {
      console.log('🎬 ANIMATION TRIGGER - Transitioning to Visions (progress >= 0.1):', aboutContentProgress.toFixed(4))
      setShowNewContent(true)
      // Lock screen for 3 seconds when transitioning to visions (only when scrolling down)
      // Pass true to changePosition - this is the SECOND slide, so change fixed to relative
      const currentScrollY = getScrollY()
      const lastScrollY = lastProcessedScrollYRef.current
      // Only trigger lock if not already locked and scrolling down
      if (currentScrollY > lastScrollY && !screenLocked) {
        // Only lock when scrolling down - pass true to change positioning
        lockScreenForReading(true)
      }
    } else if (aboutContentProgress < THRESHOLD && showNewContent) {
      console.log('🎬 ANIMATION TRIGGER - Transitioning back to About (progress < 0.1, scrolling up):', aboutContentProgress.toFixed(4))
      setShowNewContent(false)
      // Reset lock when scrolling back to About
      if (screenLocked) {
        setScreenLocked(false)
        if (screenLockTimerRef.current) {
          clearTimeout(screenLockTimerRef.current)
          screenLockTimerRef.current = null
        }
        lockedScrollPositionRef.current = null
        scrollPositionAtLockRef.current = null
        hasUserScrolledAfterUnlockRef.current = false
        setUseRelativePosition(false)
      }
      // No delay when scrolling up - allow immediate reverse transition
    }
  }, [aboutContentProgress, showNewContent, firstSlideLoaded, screenLocked, getScrollY])

  // Lock screen for 3 seconds to allow reading (only when scrolling down)
  // changePosition: if true, changes Hero from fixed to relative during lock (only for second slide)
  const lockScreenForReading = useCallback((changePosition: boolean = false) => {
    // Check if scrolling down
    const currentScrollY = getScrollY()
    const isScrollingDown = currentScrollY >= lastProcessedScrollYRef.current
    
    // Only lock when scrolling down
    if (!isScrollingDown) {
      return
    }
    
    // Don't lock if already locked - prevent multiple locks
    if (screenLocked) {
      return
    }
    
    // Clear any existing lock timer and reset lock state
    if (screenLockTimerRef.current) {
      clearTimeout(screenLockTimerRef.current)
      screenLockTimerRef.current = null
    }
    
    // Reset any previous lock state
    lockedScrollPositionRef.current = null
    scrollPositionAtLockRef.current = null
    hasUserScrolledAfterUnlockRef.current = false
    
    // Get current scroll position
    const lockPosition = currentScrollY
    lockedScrollPositionRef.current = lockPosition
    scrollPositionAtLockRef.current = lockPosition
    
    // Lock the screen
    setScreenLocked(true)
    console.log('🔒 Screen locked for reading at scrollY:', lockPosition.toFixed(2))
    
    // Change Hero to relative positioning during lock ONLY if changePosition is true (second slide)
    // Use requestAnimationFrame to ensure smooth transition without glitches
    if (changePosition) {
      requestAnimationFrame(() => {
        setUseRelativePosition(true)
        if (sectionRef.current) {
          const element = sectionRef.current as HTMLElement
          // Use CSS transition for smooth position change
          element.style.transition = 'none' // Disable transition during change to prevent glitches
          element.style.position = 'relative'
          element.style.top = 'auto'
          element.style.left = 'auto'
          element.style.right = 'auto'
          element.style.bottom = 'auto'
          // Re-enable transitions after a frame
          requestAnimationFrame(() => {
            if (sectionRef.current) {
              sectionRef.current.style.transition = ''
            }
          })
        }
      })
    }
    
    // Unlock after 3 seconds
    screenLockTimerRef.current = setTimeout(() => {
      setScreenLocked(false)
      console.log('🔓 Screen unlocked after 3 seconds - user must scroll again to continue')
      // Change Hero back to fixed positioning after unlock ONLY if it was changed
      // Use requestAnimationFrame to ensure smooth transition without glitches
      if (changePosition) {
        requestAnimationFrame(() => {
          setUseRelativePosition(false)
          if (sectionRef.current && hasReachedFullScale) {
            const element = sectionRef.current as HTMLElement
            // Use CSS transition for smooth position change
            element.style.transition = 'none' // Disable transition during change to prevent glitches
            element.style.position = 'fixed'
            element.style.top = '0'
            element.style.left = '0'
            element.style.right = '0'
            element.style.bottom = '0'
            // Re-enable transitions after a frame
            requestAnimationFrame(() => {
              if (sectionRef.current) {
                sectionRef.current.style.transition = ''
              }
            })
          }
        })
      }
      // Clear timer ref
      screenLockTimerRef.current = null
      // Keep lockedScrollPositionRef set so we maintain position until user scrolls
      // But reset scrollPositionAtLockRef to allow new locks
      scrollPositionAtLockRef.current = null
      hasUserScrolledAfterUnlockRef.current = true
    }, 3000)
  }, [getScrollY, hasReachedFullScale])

  // Lock screen when first slide loads (about content appears)
  useEffect(() => {
    if (firstSlideLoaded && hasReachedScale10 && !showNewContent) {
      // Only lock when scrolling down, not when scrolling up
      // Pass false to changePosition - this is the FIRST slide, so keep fixed positioning
      const currentScrollY = getScrollY()
      const lastScrollY = lastProcessedScrollYRef.current
      // Only trigger lock if not already locked and scrolling down
      if (currentScrollY >= lastScrollY && !screenLocked) {
        lockScreenForReading(false) // false = don't change positioning, just lock screen
      }
    }
  }, [firstSlideLoaded, hasReachedScale10, showNewContent, screenLocked, getScrollY, lockScreenForReading])

  // Cleanup lock timer on unmount
  useEffect(() => {
    return () => {
      if (screenLockTimerRef.current) {
        clearTimeout(screenLockTimerRef.current)
      }
    }
  }, [])
  
  // This effect is no longer needed - scroll handler controls progress directly
  // Removed to prevent conflicts
  
  // Keep hero fixed so content below can scroll under it
  // Change to relative during screen lock, back to fixed when unlocked
  useEffect(() => {
    if (sectionRef.current) {
      const element = sectionRef.current as HTMLElement
      if (useRelativePosition) {
        // Use relative positioning during lock
        element.style.position = 'relative'
        element.style.top = 'auto'
        element.style.left = 'auto'
        element.style.right = 'auto'
        element.style.bottom = 'auto'
      } else if (hasReachedFullScale) {
        // Use fixed positioning when unlocked and animations have started
        element.style.position = 'fixed'
        element.style.top = '0'
        element.style.left = '0'
        element.style.right = '0'
        element.style.bottom = '0'
      }
    }
  }, [hasReachedFullScale, useRelativePosition])
  
  // Prevent scrolling until all animations are complete
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      // Lock screen for 3 seconds when content changes (for reading)
      // But allow scrolling up even when locked
      const isScrollingUp = e.deltaY < 0
      
      // Reset useRelativePosition when scrolling back up - handled in main scroll logic
      // This check is redundant but kept for safety
      
      // After unlock, check if user has scrolled from the locked position
      if (!screenLocked && lockedScrollPositionRef.current !== null && scrollPositionAtLockRef.current !== null) {
        const currentScrollY = getScrollY()
        const lockPosition = scrollPositionAtLockRef.current
        
        // If user hasn't scrolled away from lock position yet, maintain it
        if (!hasUserScrolledAfterUnlockRef.current) {
          const scrollDiff = Math.abs(currentScrollY - lockPosition)
          if (scrollDiff < 5 && !isScrollingUp) {
            // User hasn't scrolled yet - maintain position
            e.preventDefault()
            e.stopPropagation()
            scrollTo(lockPosition)
            return false
          } else {
            // User is scrolling - mark as scrolled and allow
            hasUserScrolledAfterUnlockRef.current = true
            lockedScrollPositionRef.current = null
            scrollPositionAtLockRef.current = null
          }
        }
      }
      
      if (screenLocked && lockedScrollPositionRef.current !== null && !isScrollingUp) {
        // During lock, prevent scroll but allow animations to continue
        // Only prevent scroll down, allow scroll up to unlock
        e.preventDefault()
        e.stopPropagation()
        // Keep scroll position locked (only when scrolling down)
        scrollTo(lockedScrollPositionRef.current)
        return false
      }
      
      // Allow scroll up even when locked to unlock smoothly
      if (screenLocked && isScrollingUp) {
        // User scrolling up - unlock immediately and allow scroll
        setScreenLocked(false)
        if (useRelativePosition) {
          setUseRelativePosition(false)
          if (sectionRef.current && hasReachedFullScale) {
            const element = sectionRef.current as HTMLElement
            element.style.position = 'fixed'
            element.style.top = '0'
            element.style.left = '0'
            element.style.right = '0'
            element.style.bottom = '0'
          }
        }
        // Clear lock timer
        if (screenLockTimerRef.current) {
          clearTimeout(screenLockTimerRef.current)
          screenLockTimerRef.current = null
        }
        lockedScrollPositionRef.current = null
        scrollPositionAtLockRef.current = null
        hasUserScrolledAfterUnlockRef.current = true
      }
      
      // Phase 1: Square scales and image descales - allow scroll
      // Phase 2: First slide loads - lock scroll until first slide loads
      // Phase 3: Second slide loads on scroll - allow scroll for second slide
      // Phase 4: Screen moves down - allow full scroll after allAnimationsComplete
      
      const currentScroll = getScrollY()
      
      if (!allAnimationsComplete) {
        const heroHeight = window.innerHeight
        const scale15ScrollY = heroHeight * 0.75 // Scroll position when scale = 15
        const scrollMaxValue = heroHeight * 1.0 // Scroll position when scale = 20 (100%)
        const slideAnimationScrollRange = heroHeight * 0.5
        const maxSlideScrollY = scrollMaxValue + slideAnimationScrollRange
        
        // Check if we've reached scale 15 based on scrollY
        const hasReachedScale15 = currentScroll >= scale15ScrollY
        
        if (hasReachedScale15 && !firstSlideLoaded) {
          // Lock scroll until first slide loads (at scale 15)
          e.preventDefault()
          e.stopPropagation()
          return false
        }
        // Allow smooth scroll up from second slide - don't block it
        else if (!hasReachedScale15) {
          // Before reaching scale 15, allow scroll up to scale 15
          if (currentScroll >= scale15ScrollY) {
            e.preventDefault()
            e.stopPropagation()
            return false
          }
        } else if (hasReachedScale15 && firstSlideLoaded) {
          // Allow scrolling from scale 15 to scale 20 (square scaling to 100%)
          // After scale 20, allow scroll for slide animations (based on scrollY)
          // When scrolling up, allow free movement through all transitions
          const isScrollingUp = e.deltaY < 0
          if (!isScrollingUp && currentScroll >= maxSlideScrollY) {
            // Only prevent scrolling down past maxSlideScrollY
            e.preventDefault()
            e.stopPropagation()
            return false
          }
          // If scrolling up, allow free movement
        }
        // If we reach here, scrolling is allowed - don't prevent it
      }
    }
    
    const preventKeyScroll = (e: KeyboardEvent) => {
      // Lock screen for 3 seconds when content changes (for reading)
      if (screenLocked && lockedScrollPositionRef.current !== null) {
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault()
          return false
        }
      }
      
      const currentScroll = getScrollY()
      
      if (!allAnimationsComplete) {
        const heroHeight = window.innerHeight
        const scale15ScrollY = heroHeight * 0.75 // Scroll position when scale = 15
        const scrollMaxValue = heroHeight * 1.0 // Scroll position when scale = 20 (100%)
        const slideAnimationScrollRange = heroHeight * 0.5
        const maxSlideScrollY = scrollMaxValue + slideAnimationScrollRange
        
        // Check if we've reached scale 15 based on scrollY
        const hasReachedScale15 = currentScroll >= scale15ScrollY
        
        if (hasReachedScale15 && !firstSlideLoaded) {
          // Lock scroll until first slide loads (at scale 15)
          if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault()
            return false
          }
        }
        // Allow smooth scroll up from second slide - don't block it
        else if (!hasReachedScale15) {
          // Before reaching scale 15, allow scroll up to scale 15
          if (currentScroll >= scale15ScrollY) {
            if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
              e.preventDefault()
              return false
            }
          }
        } else if (hasReachedScale15 && firstSlideLoaded) {
          // Allow scrolling from scale 15 to scale 20 (square scaling to 100%)
          // After scale 20, allow scroll for slide animations (based on scrollY)
          // When scrolling up (arrow keys up/page up), allow free movement
          const isScrollingUp = [33, 38].includes(e.keyCode) // Page Up, Arrow Up
          if (!isScrollingUp && currentScroll >= maxSlideScrollY) {
            // Only prevent scrolling down past maxSlideScrollY
            if ([32, 34, 35, 36, 37, 39, 40].includes(e.keyCode)) {
              e.preventDefault()
              return false
            }
          }
          // If scrolling up, allow free movement
        }
      }
    }
    
    window.addEventListener('wheel', preventScroll as EventListener, { passive: false })
    window.addEventListener('keydown', preventKeyScroll, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', preventScroll as EventListener)
      window.removeEventListener('keydown', preventKeyScroll)
    }
  }, [allAnimationsComplete, hasReachedFullScale, firstSlideLoaded, secondSlideLoaded, aboutContentProgress, showNewContent, screenLocked, useRelativePosition, getScrollY, scrollTo])
  
  // Calculate inverse scale to keep content fixed size
  const inverseScale = useMemo(() => {
    return currentScale > 0 ? 1 / currentScale : 1
  }, [currentScale])
  
  // Combined ref callback
  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node
    ref(node)
  }, [ref])

  // Track scroll position and update animation progress using GSAP ScrollTrigger
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    let ticking = false
    let targetScrollY = 0
    let scrollTriggerInstance: ScrollTrigger | null = null
    
    const scrollToTop = (y: number) => {
      // Debounce scrollTo calls to prevent rapid updates (max once per 16ms ~ 60fps)
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollToTimeRef.current
      if (timeSinceLastScroll < 16) {
        return // Skip if called too recently
      }
      lastScrollToTimeRef.current = now
      
      // Round target position to prevent micro-movements
      const roundedY = Math.round(y)
      scrollTo(roundedY)
    }
    

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }
          
          // Lock screen for 3 seconds when content changes (for reading)
          // But allow scrolling up even when locked
          const currentY = getScrollY()
          const lastY = lastProcessedScrollYRef.current
          const isScrollingUp = currentY < lastY
          
          // Reset useRelativePosition when scrolling back up - handled in main scroll logic below
          // This check is redundant but kept for safety
          
          // After unlock, check if user has scrolled from the locked position
          if (!screenLocked && lockedScrollPositionRef.current !== null && scrollPositionAtLockRef.current !== null) {
            const lockPosition = scrollPositionAtLockRef.current
            
            // If user hasn't scrolled away from lock position yet, maintain it
            if (!hasUserScrolledAfterUnlockRef.current) {
              const scrollDiff = Math.abs(currentY - lockPosition)
              if (scrollDiff < 5 && !isScrollingUp) {
                // User hasn't scrolled yet - maintain position
                scrollToTop(lockPosition)
                ticking = false
                return
              } else {
                // User is scrolling - mark as scrolled and allow
                hasUserScrolledAfterUnlockRef.current = true
                lockedScrollPositionRef.current = null
                scrollPositionAtLockRef.current = null
              }
            }
          }
          
          // During lock, use locked scroll position for animations to prevent glitches
          let animationScrollY = currentY
          if (screenLocked && lockedScrollPositionRef.current !== null && !isScrollingUp) {
            // Use locked position for animations to keep them smooth
            animationScrollY = lockedScrollPositionRef.current
            // Maintain scroll position
            if (Math.abs(currentY - lockedScrollPositionRef.current) > 2) {
              scrollToTop(lockedScrollPositionRef.current)
            }
          }
          
          const rawScrollY = animationScrollY // Use animation scroll Y for calculations
          const heroHeight = window.innerHeight
          
          // Round scrollY to prevent micro-movements (round to nearest 2 pixels to prevent flickering)
          const SCROLL_THRESHOLD = 2 // Minimum pixel change to process
          const scrollY = Math.round(rawScrollY / SCROLL_THRESHOLD) * SCROLL_THRESHOLD
          
          // During lock, always process animations even if scroll hasn't changed
          // This prevents animation glitches during the delay
          const scrollDelta = Math.abs(scrollY - lastProcessedScrollYRef.current)
          if (!screenLocked && scrollDelta < SCROLL_THRESHOLD && lastProcessedScrollYRef.current > 0) {
            // Skip processing if change is too small (only when not locked)
            ticking = false
            return
          }
          
          // Update last processed scrollY
          lastProcessedScrollYRef.current = scrollY
          
          // All animations are based on scrollY
          const effectiveScrollY = scrollY
          // Define scroll thresholds for different phases:
          // Phase 1: Square scales from 1 to 100% (scrollY 0 to heroHeight)
          // Phase 2: First slide appears (scrollY = heroHeight * 0.75, scale = 15)
          // Phase 3: Square reaches 100% (scrollY = heroHeight, scale = 20)
          // Phase 4: Slide animations (scrollY = heroHeight to heroHeight * 1.5)
          // Phase 5: Screen can move down (scrollY > heroHeight * 1.5)
          
          // Calculate scroll thresholds based on heroHeight (all animations based on scrollY)
          const scale15ScrollY = heroHeight * 0.75 // Scroll position when scale = 15 (first slide)
          const scrollMaxValue = heroHeight * 1.0 // Scroll position when scale = 20 (100% max)
          const slideAnimationScrollRange = heroHeight * 0.5 // Scroll range for slide animations
          const maxSlideScrollY = scrollMaxValue + slideAnimationScrollRange
          
          if (!allAnimationsComplete) {
            // Check if we've reached scale 15 based on effectiveScrollY
            const hasReachedScale15 = effectiveScrollY >= scale15ScrollY
            
            if (hasReachedScale15) {
              // After reaching scale 15 (effectiveScrollY >= scale15ScrollY)
              if (!firstSlideLoaded) {
                // Lock until first slide loads (at scale 15)
                if (effectiveScrollY > scale15ScrollY) {
                  scrollToTop(scale15ScrollY)
                  targetScrollY = scale15ScrollY
                } else {
                  targetScrollY = effectiveScrollY
                }
              } else {
                // First slide loaded - allow scroll:
                // - From scale 15 to scale 20 (square scaling to 100%)
                // - After scale 20, allow scroll for slide animations (based on effectiveScrollY)
                // Allow scrolling in both directions - no cap when scrolling up
                const isScrollingUp = effectiveScrollY < lastProcessedScrollYRef.current
                if (isScrollingUp) {
                  // Scrolling up - allow free movement through all transitions
                  targetScrollY = effectiveScrollY
                } else {
                  // Scrolling down - cap at maxSlideScrollY until transition completes
                  if (effectiveScrollY > maxSlideScrollY) {
                    scrollToTop(maxSlideScrollY)
                    targetScrollY = maxSlideScrollY
                  } else {
                    targetScrollY = effectiveScrollY
                  }
                }
              }
            } else {
              // Before reaching scale 15, allow normal scroll up to scale 15
              if (effectiveScrollY > scale15ScrollY) {
                scrollToTop(scale15ScrollY)
                targetScrollY = scale15ScrollY
              } else {
                targetScrollY = effectiveScrollY
              }
            }
          } else {
            // All animations complete, allow full scroll
            targetScrollY = effectiveScrollY
          }
          
          // Calculate scale directly from scrollY
          // Scale goes from 1 to 20 as scrollY goes from 0 to scrollMaxValue (heroHeight)
          // Scale = 1 + (scrollY / heroHeight) * 19
          // Scale is capped at 20 (100%) when scrollY >= scrollMaxValue
          const calculatedScale = targetScrollY >= scrollMaxValue 
            ? 20 
            : Math.max(1, 1 + (targetScrollY / scrollMaxValue) * 19)
          
          // Calculate thresholds based on scrollY directly
          const calculatedHasReachedScale10 = targetScrollY >= (heroHeight * 0.5) // Scale 10 at 50% scroll
          const calculatedHasReachedFullScale = targetScrollY >= scale15ScrollY // Scale 15 at 75% scroll
          const calculatedHasReachedScale20 = targetScrollY >= scrollMaxValue // Scale 20 at 100% scroll
          
          // Calculate scroll progress (0 to 1) for state updates
          const scaleProgress = Math.min(1.0, Math.max(0, targetScrollY / scrollMaxValue))
          
          // After square reaches max scale (20/100%), slide animations are based on scroll height
          // Use scrollMaxValue, slideAnimationScrollRange, and maxSlideScrollY declared earlier
          
          // Log scrollY-based transitions
          const prevScrollY = scrollProgressRef.current * scrollMaxValue
          const scrollDiff = Math.abs(targetScrollY - prevScrollY)
          
          // Log significant scroll transitions
          if (scrollDiff > heroHeight * 0.05) {
            if (targetScrollY >= (heroHeight * 0.5) && prevScrollY < (heroHeight * 0.5)) {
              console.log('🎬 ANIMATION TRIGGER - Scroll transition: Reached scale 10 (scrollY:', targetScrollY.toFixed(0) + ')')
            }
            if (targetScrollY >= scale15ScrollY && prevScrollY < scale15ScrollY) {
              console.log('🎬 ANIMATION TRIGGER - Scroll transition: Reached scale 15 (first slide, scrollY:', targetScrollY.toFixed(0) + ')')
            }
            if (targetScrollY >= scrollMaxValue && prevScrollY < scrollMaxValue) {
              console.log('🎬 ANIMATION TRIGGER - Scroll transition: Reached scale 20/100% (scrollY:', targetScrollY.toFixed(0) + ')')
            }
            if (targetScrollY < scale15ScrollY && prevScrollY >= scale15ScrollY) {
              console.log('🎬 ANIMATION TRIGGER - Scroll transition: Below scale 15 (scrolling up, scrollY:', targetScrollY.toFixed(0) + ')')
            }
            if (targetScrollY < (heroHeight * 0.5) && prevScrollY >= (heroHeight * 0.5)) {
              console.log('🎬 ANIMATION TRIGGER - Scroll transition: Below scale 10 (back to hero, scrollY:', targetScrollY.toFixed(0) + ')')
            }
          }
          
          // When square reaches 100% scale, use simple scroll behavior
          const lockY = scrollYWhenFirstSlideLoadedRef.current
          const hasScrolledAfterFirstSlide = scrollY > lockY
          
          // Don't hide hero - let it scroll up naturally when animations complete
          // Keep hasScrolledPastHero for reference but don't use it to hide
          const pastHero = calculatedHasReachedScale20 && firstSlideLoaded
          const prevPastHero = hasScrolledPastHero
          if (pastHero !== prevPastHero) {
            console.log('🎬 ANIMATION TRIGGER - Hero scroll mode:', pastHero ? 'natural scroll' : 'fixed')
          }
          setHasScrolledPastHero((prev) => (prev !== pastHero ? pastHero : prev))
          
          setScrollProgress(scaleProgress)
          
          // Calculate aboutContentProgress based on scrollY directly
          // Progress goes from 0 to 1 based on scrollY position
          // Phase 1: scrollY from scale15ScrollY to scrollMaxValue (first slide to square at 100%) - keep progress at 0 (show About)
          // Phase 2: scrollY from scrollMaxValue to maxSlideScrollY (slide animations) - transition from 0 to 1 (About to Vision)
          let calculatedAboutProgress = 0
          
          if (calculatedHasReachedFullScale && firstSlideLoaded) {
            if (targetScrollY < scrollMaxValue) {
              // Phase 1: Square scaling from 15 to 20, keep progress at 0 (show About content)
              // Don't change progress during square scaling - keep showing About
              calculatedAboutProgress = 0
            } else {
              // Phase 2: Square at 100%, slide animations based on scrollY
              // Progress goes from 0 to 1 as scrollY goes from scrollMaxValue to maxSlideScrollY
              // This is the only phase where we transition from About to Vision
              const scrollBeyondMax = targetScrollY - scrollMaxValue
              calculatedAboutProgress = Math.min(1, Math.max(0, scrollBeyondMax / slideAnimationScrollRange))
            }
            
            // Only update state if value changed significantly to prevent unnecessary re-renders
            const currentProgress = aboutContentProgressRef.current
            const progressDiff = Math.abs(calculatedAboutProgress - currentProgress)
            
            // Update refs immediately - always sync refs with calculated value
            targetAboutProgressRef.current = calculatedAboutProgress
            aboutContentProgressRef.current = calculatedAboutProgress
            
            // Cancel any running animation loop since scroll handler is controlling progress
            if (animationFrameRef.current !== null) {
              cancelAnimationFrame(animationFrameRef.current)
              animationFrameRef.current = null
            }
            
            // Only update state if change is significant (prevents pulsing from tiny updates)
            // Increased threshold to 0.005 to reduce pulsing
            if (progressDiff > 0.005) {
              const progressType = targetScrollY < scrollMaxValue ? 'scroll-based (scaling)' : 'scroll-based (slides)'
              console.log('🎬 ANIMATION TRIGGER - Progress update:', {
                type: progressType,
                scrollY: targetScrollY.toFixed(0),
                scale: calculatedScale.toFixed(2),
                progress: calculatedAboutProgress.toFixed(4),
                prevProgress: currentProgress.toFixed(4),
                diff: progressDiff.toFixed(4)
              })
              setAboutContentProgress(calculatedAboutProgress)
            }
            
            // Set these values - React won't re-render if values don't change
            setIsAnimationComplete(false)
            
            // Set allAnimationsComplete based on scrollY position, not scroll direction
            // Complete when scrollY reaches end of slide animation range
            // Reset properly when scrolling back up
            let animationsComplete = false
            if (targetScrollY >= maxSlideScrollY) {
              // Scrolled past animation range - animations complete
              animationsComplete = true
              if (!allAnimationsComplete) {
                console.log('🎬 ANIMATION TRIGGER - allAnimationsComplete=true (slide animations complete, scrollY:', targetScrollY.toFixed(0) + ')')
              }
            } else {
              // Still in transition range - animations not complete
              animationsComplete = false
              if (allAnimationsComplete) {
                console.log('🎬 ANIMATION TRIGGER - allAnimationsComplete=false (back in transition range, scrollY:', targetScrollY.toFixed(0) + ')')
              }
            }
            
            setAllAnimationsComplete(animationsComplete)
            
            // Reset useRelativePosition when scrolling back up past the lock point
            const isScrollingUp = targetScrollY < lastProcessedScrollYRef.current
            if (isScrollingUp && useRelativePosition) {
              setUseRelativePosition(false)
              if (sectionRef.current) {
                const element = sectionRef.current as HTMLElement
                element.style.position = 'fixed'
                element.style.top = '0'
                element.style.left = '0'
                element.style.right = '0'
                element.style.bottom = '0'
              }
            }
            
            // When animations complete, translate Hero up as user scrolls to create natural scroll effect
            // Keep it fixed but translate it up so it scrolls away naturally
            // Reset translateY when scrolling back up
            const isScrollingUpNow = targetScrollY < lastProcessedScrollYRef.current
            if (animationsComplete && targetScrollY > maxSlideScrollY && !isScrollingUpNow) {
              // Calculate how much to translate up based on scroll beyond maxSlideScrollY
              const scrollBeyond = targetScrollY - maxSlideScrollY
              // Translate up by the amount scrolled beyond the animation range
              setTranslateY(-scrollBeyond)
            } else {
              // When scrolling up or before maxSlideScrollY, keep Hero visible
              setTranslateY(0)
            }
          } else if (calculatedHasReachedFullScale && !firstSlideLoaded) {
            // First slide hasn't loaded yet, keep progress at 0
            setTranslateY(0)
            setIsAnimationComplete(false)
            setAllAnimationsComplete(false)
            targetAboutProgressRef.current = 0
            aboutContentProgressRef.current = 0
            setAboutContentProgress(0)
            // Cancel any running animation loop
            if (animationFrameRef.current !== null) {
              cancelAnimationFrame(animationFrameRef.current)
              animationFrameRef.current = null
            }
          } else if (calculatedHasReachedScale20 && firstSlideLoaded) {
            // This branch should not be reached if we're in the main branch above
            // But handle it for safety - reset states properly
            setIsAnimationComplete(false)
            setTranslateY(0)
            targetAboutProgressRef.current = 0
            aboutContentProgressRef.current = 0
            setAboutContentProgress(0)
            setAllAnimationsComplete(false)
          } else {
            // Before reaching full scale (scale < 15)
            // When scrolling up from scale 15, first slide should stay visible until scale 10
            // Only reset firstSlideLoaded when scale goes below 10
            const calculatedHasReachedScale10 = calculatedScale >= 10
            
            // Reset allAnimationsComplete when scrolling back up before animations complete
            setAllAnimationsComplete(false)
            
            if (calculatedHasReachedScale10 && firstSlideLoaded) {
              // Scale is between 10 and 15 - keep first slide visible
              // Progress should be 0 (first slide, not second slide)
              setIsAnimationComplete(false)
              setTranslateY(0)
              targetAboutProgressRef.current = 0
              aboutContentProgressRef.current = 0
              setAboutContentProgress(0)
              // Cancel any running animation loop
              if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
              }
              // Reset lock when scrolling back up before first slide completes
              const isScrollingUp = targetScrollY < lastProcessedScrollYRef.current
              if (isScrollingUp && screenLocked) {
                setScreenLocked(false)
                if (screenLockTimerRef.current) {
                  clearTimeout(screenLockTimerRef.current)
                  screenLockTimerRef.current = null
                }
                lockedScrollPositionRef.current = null
                scrollPositionAtLockRef.current = null
                hasUserScrolledAfterUnlockRef.current = false
                setUseRelativePosition(false)
              }
            } else {
              // Scale is below 10 - transition back to hero
              setIsAnimationComplete(false)
              setTranslateY(0)
              targetAboutProgressRef.current = 0
              aboutContentProgressRef.current = 0
              setAboutContentProgress(0)
              // Cancel any running animation loop
              if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
              }
              
              // Only reset firstSlideLoaded when scale goes below 10
              // This ensures first slide stays visible during scroll up from scale 15 to 10
              if (firstSlideLoaded && calculatedScale < 10) {
                console.log('🎬 ANIMATION TRIGGER - Resetting to hero (scale < 10):', calculatedScale.toFixed(2))
                setFirstSlideLoaded(false)
                setSecondSlideLoaded(false)
                setShowNewContent(false)
                setAllAnimationsComplete(false)
                // Reset locked image scale so it can scale properly again
                lockedImageScaleRef.current = null
                setLockedImageScale(null)
                // Progress refs already reset above
                // Reset lock state when scrolling back up past first slide
                if (screenLocked) {
                  setScreenLocked(false)
                  if (screenLockTimerRef.current) {
                    clearTimeout(screenLockTimerRef.current)
                    screenLockTimerRef.current = null
                  }
                  lockedScrollPositionRef.current = null
                  scrollPositionAtLockRef.current = null
                  hasUserScrolledAfterUnlockRef.current = false
                  setUseRelativePosition(false)
                }
              }
            }
          }
          
          // Reset translateY when scrolling back up before maxSlideScrollY
          if (targetScrollY <= maxSlideScrollY) {
            setTranslateY(0)
          }
          ticking = false
        })
        
        ticking = true
      }
    }
    
    // Initial calculation
    handleScroll()
    
    // Use GSAP ScrollTrigger for scroll tracking
    window.addEventListener('scroll', handleScroll, { passive: false })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [allAnimationsComplete, hasReachedFullScale, firstSlideLoaded, secondSlideLoaded, showNewContent, screenLocked, useRelativePosition, scrollTo, getScrollY])

  return (
    <motion.section 
      ref={setRefs}
      className="fixed inset-0 min-h-screen overflow-hidden z-40"
      animate={{
        y: translateY
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0
      }}
      style={{
        // Position changes dynamically: relative during lock, fixed otherwise
        position: useRelativePosition ? 'relative' : 'fixed',
        top: useRelativePosition ? 'auto' : 0,
        left: useRelativePosition ? 'auto' : 0,
        right: useRelativePosition ? 'auto' : 0,
        bottom: useRelativePosition ? 'auto' : 0,
        willChange: hasReachedFullScale ? 'transform' : 'transform',
        // Always visible - translateY will scroll it up naturally when animations complete
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'auto',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-landscape.jpeg"
          alt="Luxurious interior design"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Minor dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation - only visible during hero phase, completely hidden in about section */}
        <div
          className="fixed top-0 left-0 right-0 z-50"
          style={{ 
            // Keep visible when scrolling up or when animations haven't completed
            visibility: (allAnimationsComplete && scrollProgress >= 1) ? 'hidden' : 'visible',
            opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : 1,
            pointerEvents: (allAnimationsComplete && scrollProgress >= 1) ? 'none' : 'auto',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <Navigation />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-20 relative" style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          backfaceVisibility: 'hidden',
        }}>
          <div className="w-full relative" style={{
            transform: 'translateZ(0)',
          }}>
            {/* Horizontal line dividing BUILDING (above) and VISIONS (below) */}
            <motion.div 
              animate={{ opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 h-px bg-white/60 z-10 hidden lg:block" 
              style={{ top: '50%', transform: 'translateY(-50%)' }} 
            />
            
            {/* About Section - Tilted square on the center line */}
            <motion.div
              initial={{ opacity: 0, x: '-50%', y: '-50%', rotate: 45 }}
              animate={inView ? { opacity: 1, x: '-50%', y: '-50%', rotate: 45, scale: currentScale } : { x: '-50%', y: '-50%', rotate: 45, scale: currentScale }}
              transition={{ 
                opacity: { duration: 0.6 },
                x: { duration: 0 },
                y: { duration: 0 },
                rotate: { duration: 0 },
                scale: { duration: 0 }
              }}
              className="absolute z-20"
              style={{
                width: '200px',
                height: '200px',
                left: '50%',
                top: '50%',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
              }}
            >
              {/* Inner container rotates content back to appear straight - content stays fixed size */}
              <div
                className="relative"
                style={{
                  transform: `rotate(-45deg) scale(${inverseScale}) translateZ(0)`,
                  transformOrigin: 'center center',
                  width: viewportSize.width > 0 ? `${viewportSize.width}px` : '100vw',
                  height: viewportSize.height > 0 ? `${viewportSize.height}px` : '100vh',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: viewportSize.width > 0 ? `-${viewportSize.width / 2}px` : '-50vw',
                  marginTop: viewportSize.height > 0 ? `-${viewportSize.height / 2}px` : '-50vh',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                }}
              >
                {/* Full About Section Layout - full screen width, always fixed size */}
                <div 
                  className="relative flex items-center justify-center py-20"
                  style={{
                    width: viewportSize.width > 0 ? `${viewportSize.width}px` : '100vw',
                    height: viewportSize.height > 0 ? `${viewportSize.height}px` : '100vh',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/about-bg.jpeg"
                      alt="Background"
                      fill
                      priority
                      quality={100}
                      className="object-cover"
                      sizes="100vw"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/80" />
                  </div>
                  <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
                    {/* Center Image - Absolutely positioned to be perfectly centered */}
                    <motion.div 
                      className="hidden lg:block absolute left-1/2 top-1/2 overflow-hidden pointer-events-none z-10"
                      animate={{ 
                        x: '-50%',
                        y: '-50%',
                        scale: aboutImageScale
                      }}
                      transition={{ 
                        duration: 0,
                        type: "tween",
                        ease: "linear"
                      }}
                      style={{ 
                        transformOrigin: 'center center',
                        // Fixed size container that doesn't scale with parent
                        width: viewportSize.width > 0 ? `${Math.min(viewportSize.width * 0.4, 512)}px` : '512px',
                        maxWidth: '512px',
                        aspectRatio: '4/5',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {/* Image Container - changes image src on scroll with fade transition */}
                      <div className="relative w-full h-full">
                        {/* First image */}
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: showNewContent ? 0 : 1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <Image
                            src="/about-1.jpeg"
                            alt="Luxurious interior design"
                            fill
                            quality={100}
                            className="object-cover"
                            sizes="(max-width: 1024px) 70vw, 32vw"
                          />
                        </motion.div>
                        {/* Second image */}
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showNewContent ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <Image
                            src="/about-2.jpeg"
                            alt="Luxurious interior design"
                            fill
                            quality={100}
                            className="object-cover"
                            sizes="(max-width: 1024px) 70vw, 32vw"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Mobile Center Image */}
                    <div className="lg:hidden flex items-center justify-center w-full">
                      <motion.div 
                        className="relative overflow-hidden"
                        animate={{ 
                          scale: aboutImageScale
                        }}
                        transition={{ 
                          duration: 0,
                          type: "tween",
                          ease: "linear"
                        }}
                        style={{ 
                          transformOrigin: 'center center',
                          // Fixed size container that doesn't scale with parent
                          width: viewportSize.width > 0 ? `${Math.min(viewportSize.width * 0.8, 400)}px` : '400px',
                          maxWidth: '400px',
                          aspectRatio: '4/5',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        {/* Image Container - changes image src on scroll with fade transition */}
                        <div className="relative w-full h-full">
                          {/* First image */}
                          <motion.div
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: showNewContent ? 0 : 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <Image
                              src="/about-1.jpeg"
                              alt="Luxurious interior design"
                              fill
                              quality={100}
                              className="object-cover"
                              sizes="(max-width: 1024px) 70vw, 32vw"
                            />
                          </motion.div>
                          {/* Second image */}
                          <motion.div
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showNewContent ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <Image
                              src="/about-2.jpeg"
                              alt="Luxurious interior design"
                              fill
                              quality={100}
                              className="object-cover"
                              sizes="(max-width: 1024px) 70vw, 32vw"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Left Column Container - Content changes on scroll */}
                    <div className="lg:col-span-4 relative">
                      <div className="space-y-6">
                        {/* Label with fade transition */}
                        <div className="relative">
                          <motion.p 
                            key={showNewContent ? "vision-label" : "about-label"}
                            className="text-white text-sm md:text-base font-light uppercase tracking-wider"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: hasReachedScale10 ? contentOpacity : 0,
                              y: hasReachedScale10 && contentOpacity > 0 ? 0 : 10
                            }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ 
                              opacity: { duration: 0.5, ease: "easeInOut" },
                              y: { duration: 0.5, ease: "easeInOut" }
                            }}
                          >
                            {showNewContent ? "OUR VISION" : "ABOUT UPTOWN"}
                          </motion.p>
                        </div>
                        
                        {/* Heading - In original position, 2 lines, can overlap image */}
                        <motion.h2 
                          key={showNewContent ? "vision-heading" : "about-heading"}
                          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white uppercase tracking-tight leading-tight relative z-30"
                          style={{ lineHeight: '1.1' }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hasReachedScale10 ? contentOpacity : 0,
                            y: hasReachedScale10 && contentOpacity > 0 ? 0 : 20
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            opacity: { duration: 0.5, ease: "easeInOut" },
                            y: { duration: 0.5, ease: "easeInOut" }
                          }}
                        >
                          {showNewContent 
                            ? <><span className="whitespace-nowrap">CREATING SPACES</span><br /><span className="whitespace-nowrap">THAT INSPIRE</span></>
                            : <><span className="whitespace-nowrap">REFLECT THE SPIRIT</span><br /><span className="whitespace-nowrap">OF INNOVATION</span></>}
                        </motion.h2>
                        
                        {/* Description with fade transition */}
                        <div className="relative min-h-[5rem]">
                          <motion.p 
                            key={showNewContent ? "vision-desc" : "about-desc"}
                            className="text-white text-sm md:text-base font-light leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: hasReachedScale10 ? contentOpacity : 0,
                              y: hasReachedScale10 && contentOpacity > 0 ? 0 : 10
                            }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ 
                              opacity: { duration: 0.5, ease: "easeInOut" },
                              y: { duration: 0.5, ease: "easeInOut" }
                            }}
                          >
                            {showNewContent 
                              ? "Enhancing lifestyles through exceptional interior and exterior design solutions that transform spaces." 
                              : "Enhancing lifestyles through exceptional interior and exterior design that transforms spaces."}
                          </motion.p>
                        </div>
                        
                      </div>
                    </div>

                    {/* Center Column - Spacer for grid layout */}
                    <div className="hidden lg:block lg:col-span-5"></div>

                    {/* Right Column Container - Content changes on scroll */}
                    <div className="lg:col-span-3 relative">
                      <div className="space-y-6">
                        {/* Right column text with fade transition */}
                        <div className="relative min-h-[12rem]">
                          <motion.div 
                            key={showNewContent ? "vision-text" : "about-text"}
                            className="space-y-4 text-white text-sm md:text-base font-light leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: hasReachedScale10 ? contentOpacity : 0,
                              y: hasReachedScale10 && contentOpacity > 0 ? 0 : 10
                            }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ 
                              opacity: { duration: 0.5, ease: "easeInOut" },
                              y: { duration: 0.5, ease: "easeInOut" }
                            }}
                          >
                            {showNewContent ? (
                              <>
                                <p>
                                  We redefine the urban skyline with architectural designs that merge elegance, innovation, and functionality across all projects and developments.
                                </p>
                                <p>
                                  Our vision is to create iconic spaces that transcend time, reflecting the sophisticated and avant-garde spirit of modern living and design excellence.
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  Uptown is an established and well-renowned Renovation & fit-out company in Abu Dhabi, Dubai. Also known as one of the leading "Fast Track Projects Service Providers" in the UAE.
                                </p>
                                <p>
                                  Uptown has only expanded in terms of projects, experience, distinctive solutions, and an eye for aesthetics in its 13 years in the sector. We believe in bringing visions to life.
                                </p>
                              </>
                            )}
                          </motion.div>
                        </div>
                        
                        {/* AFFILIATED PAGES link - only shown when showNewContent is true */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: showNewContent && hasReachedScale10 ? contentOpacity : 0,
                            y: showNewContent && hasReachedScale10 && contentOpacity > 0 ? 0 : 10
                          }}
                          transition={{ 
                            opacity: { duration: 0.5, ease: "easeInOut" },
                            y: { duration: 0.5, ease: "easeInOut" }
                          }}
                        >
                          {showNewContent && (
                            <Link
                              href="/about"
                              className="group inline-flex items-center gap-2 text-white font-medium uppercase tracking-wider hover:text-teal transition-colors duration-300"
                            >
                              <Diamond className="w-3 h-3 fill-teal text-teal shrink-0" />
                              <span className="border-b border-teal">AFFILIATED PAGES</span>
                            </Link>
                          )}
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hasReachedScale10 ? contentOpacity : 0,
                            y: hasReachedScale10 && contentOpacity > 0 ? 0 : 20
                          }}
                          transition={{ 
                            opacity: { duration: 0.5, ease: "easeInOut" },
                            y: { duration: 0.5, ease: "easeInOut" }
                          }}
                        >
                          <Link
                            href="/about"
                            className={`group inline-flex items-center gap-3 px-6 py-3 bg-transparent border text-white font-medium uppercase tracking-wider transition-all duration-300 ${
                              showNewContent 
                                ? "border-teal hover:bg-teal/10" 
                                : "border-white/30 hover:border-white/60"
                            }`}
                          >
                            <Diamond className="w-4 h-4 fill-teal text-teal" />
                            <span>Learn more</span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 w-full relative">
              {/* Left Side - BUILDING (above the line) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  // Keep visible when scrolling up or when animations haven't completed
                  opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                  x: scrollProgress >= 1 ? -50 : (inView ? scrollProgress * 300 : -50)
                }}
                transition={{ duration: 0 }}
                className="relative"
                style={{ 
                  position: 'absolute',
                  left: 0,
                  bottom: 'calc(50% + 0.5rem)'
                }}
              >
                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0, x: scrollProgress * 300 } : {}}
                  transition={{ duration: 0 }}
                  className="text-white text-sm md:text-base font-light uppercase tracking-wider mb-4"
                >
                  Best Renovation Company & Fit Out Contractor Lahore, Pakistan
                </motion.p>

                {/* Main Headline - BUILDING */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-tight leading-none relative"
                >
                  BUILDING
                </motion.h1>
              </motion.div>

              {/* Right Side - VISIONS (below the line) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  // Keep visible when scrolling up or when animations haven't completed
                  opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                  x: scrollProgress >= 1 ? 50 : (inView ? -scrollProgress * 300 : 50)
                }}
                transition={{ duration: 0 }}
                className="flex flex-col items-end lg:items-end space-y-8"
                style={{ 
                  position: 'absolute',
                  right: 0,
                  top: 'calc(50% + 0.5rem)',
                  paddingTop: '2em'
                }}
              >
                {/* Main Headline - VISIONS */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-tight leading-none text-right"
                >
                  VISIONS
                </motion.h1>

                {/* Contact Us Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0, x: -scrollProgress * 300 } : {}}
                  transition={{ duration: 0 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-teal border border-white text-white font-medium uppercase tracking-wider hover:bg-teal/90 transition-all duration-300"
                  >
                    <Diamond className="w-4 h-4" />
                    <span>Contact Us</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Descriptive Text - Below the line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                // Keep visible when scrolling up or when animations haven't completed
                opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                y: scrollProgress >= 1 ? 20 : (inView ? 0 : 20),
                x: scrollProgress >= 1 ? 0 : (inView ? scrollProgress * 300 : 0)
              }}
              transition={{ duration: 0 }}
              className="absolute left-4 sm:left-6 lg:left-8 xl:left-12 text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md lg:max-w-lg z-10"
              style={{ top: 'calc(50% + 2rem)' }}
            >
              Visionary turnkey solutions across Pakistan, blending global expertise with local insight, and transforming spaces through innovative design and meticulous execution.
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator - click scrolls past hero so page can move */}
        <motion.button
          type="button"
          onClick={() => scrollTo(typeof window !== 'undefined' ? window.innerHeight : 1080)}
          initial={{ opacity: 0 }}
          animate={{ opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0) }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          aria-label="Scroll down past hero"
        >
          <motion.p
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-xs uppercase tracking-wider font-light"
          >
            Scroll to Explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.button>
      </div>
    </motion.section>
  )
}

