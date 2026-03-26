'use client'

import { motion, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronDown,
  Diamond
} from 'lucide-react'
import { useGSAP } from './GSAPContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const { scrollTo, getScrollY, pauseSmoothScroll, resumeSmoothScroll } = useGSAP()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: false, // Match SSR: no viewport on server, so false until client observes
  })
  
  const sectionRef = useRef<HTMLElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const translateY = useMotionValue(0)
  const translateYRef = useRef(translateY)
  translateYRef.current = translateY
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [aboutContentProgress, setAboutContentProgress] = useState(0)
  const [allAnimationsComplete, setAllAnimationsComplete] = useState(false)
  const [showNewContent, setShowNewContent] = useState(false)
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false)
  const [secondSlideLoaded, setSecondSlideLoaded] = useState(false)
  const [heroIntroPlayed, setHeroIntroPlayed] = useState(false)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false)
  const [screenLocked, setScreenLocked] = useState(false) // Previously used to lock screen for reading; now kept for compatibility but not actively set
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
  const screenLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null) // Timer for screen lock
  const lockedScrollPositionRef = useRef<number | null>(null) // Store scroll position when locked
  const scrollPositionAtLockRef = useRef<number | null>(null) // Store scroll position when lock started
  const hasUserScrolledAfterUnlockRef = useRef<boolean>(false) // Track if user has scrolled after unlock
  const scrollTargetYRef = useRef(1080) // Fallback for SSR; set to window.innerHeight after mount to avoid hydration mismatch
  const firstSlideLockDoneRef = useRef(false) // Ensure first slide lock runs only once per cycle
  const secondSlideLockDoneRef = useRef(false) // Ensure second slide lock runs only once per cycle
  
  // Update viewport size (only after mount to keep server and first client render identical)
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    scrollTargetYRef.current = window.innerHeight
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

  // Trigger first hero intro animation once when it enters view
  useEffect(() => {
    if (inView && !heroIntroPlayed) {
      setHeroIntroPlayed(true)
    }
  }, [inView, heroIntroPlayed])
  
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
      // Reset progress refs to ensure clean state
      targetAboutProgressRef.current = 0
      aboutContentProgressRef.current = 0
      setAboutContentProgress(0)
      // Cancel any running animation loop
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      // Wait briefly for first slide content to animate in, then mark it as loaded.
      // We no longer lock the screen here so that scroll always continues driving the animation.
      const loadTimer = setTimeout(() => {
        setFirstSlideLoaded(true)
        // Reset second slide states to ensure clean transition
        setSecondSlideLoaded(false)
        setShowNewContent(false)
      }, 1500)
      
      return () => clearTimeout(loadTimer)
    }
  }, [hasReachedFullScale, firstSlideLoaded])
  
  // This effect is no longer needed - scroll handler controls progress directly
  // Removed to prevent conflicts
  
  // Track when second slide content is loaded (when aboutContentProgress > 0.1)
  useEffect(() => {
    if (aboutContentProgress > 0.1 && firstSlideLoaded && !secondSlideLoaded) {
      // Wait for second slide content to animate in (1.5s)
      const timer = setTimeout(() => {
        setSecondSlideLoaded(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else if (aboutContentProgress <= 0.1 && secondSlideLoaded) {
      // Reset second slide loaded state when scrolling back up
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
        animationFrameRef.current = requestAnimationFrame(animateProgress)
      }
    } else {
      // Stop animation loop if we've reached target
      if (animationFrameRef.current !== null && diff < 0.0001) {
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
      setShowNewContent(true)
    } else if (aboutContentProgress < THRESHOLD && showNewContent) {
      setShowNewContent(false)
    }
    // Note: this effect only depends on aboutContentProgress and showNewContent.
    // Keeping the dependency array minimal avoids Turbopack's "final argument changed size" warning.
  }, [aboutContentProgress, showNewContent])

  // Previously locked screen for 3 seconds to allow reading.
  // Now we only optionally adjust positioning without introducing any delay or scroll lock.
  const lockScreenForReading = useCallback((changePosition: boolean = false) => {
    const currentScrollY = getScrollY()
    const isScrollingDown = currentScrollY >= lastProcessedScrollYRef.current
    // Only lock when scrolling down
    if (!isScrollingDown) {
      return
    }

    // For the second slide we still optionally change positioning to relative,
    // but we no longer freeze scroll or wait for a timeout.
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
  }, [getScrollY, hasReachedFullScale])

  // Lock screen when first slide loads (about content appears)
  useEffect(() => {
    // We keep this effect for potential future hooks, but screen locking
    // is no longer applied here so scrolling always drives the hero animation.
  }, [firstSlideLoaded, hasReachedScale10, showNewContent, screenLocked, getScrollY, lockScreenForReading])

  // Cleanup lock timer on unmount
  useEffect(() => {
    return () => {
      if (screenLockTimerRef.current) {
        clearTimeout(screenLockTimerRef.current)
      }
      // Ensure smooth scroll is resumed if component unmounts while locked
      resumeSmoothScroll()
    }
  }, [resumeSmoothScroll])

  // When screenLocked toggles, pause/resume Lenis smooth scrolling
  useEffect(() => {
    if (screenLocked) {
      pauseSmoothScroll()
    } else {
      resumeSmoothScroll()
    }
  }, [screenLocked, pauseSmoothScroll, resumeSmoothScroll])

  // Note: we intentionally do NOT lock global page scroll via body overflow here.
  // The hero is designed as a scroll-driven animation: it reads window scroll and
  // uses that as its progress. If we globally freeze scroll, the hero cannot progress.
  // Instead, the hero keeps itself on top (via z-index) and clamps how far the user
  // can scroll through its own wheel/keyboard handlers until animations are complete.
  
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
  
  // Note: we rely on Lenis pause/resume and internal hero logic for "locks".
  // We no longer globally block wheel/keyboard events to avoid scroll getting stuck.
  // Calculate inverse scale to keep content fixed size
  const inverseScale = useMemo(() => {
    return currentScale > 0 ? 1 / currentScale : 1
  }, [currentScale])

  // Once all hero animations are fully complete, release the hero so the
  // next sections can scroll normally. Until this flag is true, the hero
  // remains fixed and the page won't progress past it.
  useEffect(() => {
    if (allAnimationsComplete && scrollProgress >= 1) {
      setUseRelativePosition(true)
    }
  }, [allAnimationsComplete, scrollProgress])
  
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
          // While locked, freeze hero animations (no scroll-driven updates)
          if (screenLocked) {
            ticking = false
            return
          }

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
          
          // Round scrollY to prevent micro-movements (round to nearest 1 pixel)
          const SCROLL_THRESHOLD = 1 // Minimum pixel change to process
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
          
          // Smooth scale: use raw scroll (no rounding) for scale progress so the square scales smoothly
          const effectiveScrollYRaw = rawScrollY
          let targetScrollYForScale = effectiveScrollYRaw
          if (!allAnimationsComplete) {
            const hasReachedScale15Raw = effectiveScrollYRaw >= scale15ScrollY
            if (hasReachedScale15Raw) {
              if (!firstSlideLoaded) {
                targetScrollYForScale = Math.min(effectiveScrollYRaw, scale15ScrollY)
              } else {
                const isScrollingUpRaw = effectiveScrollYRaw < lastProcessedScrollYRef.current
                if (isScrollingUpRaw) {
                  targetScrollYForScale = effectiveScrollYRaw
                } else {
                  targetScrollYForScale = Math.min(effectiveScrollYRaw, maxSlideScrollY)
                }
              }
            } else {
              targetScrollYForScale = Math.min(effectiveScrollYRaw, scale15ScrollY)
            }
          }
          const rawScaleProgress = Math.min(1.0, Math.max(0, targetScrollYForScale / scrollMaxValue))
          // Quantize scale progress to avoid reacting to tiny scroll changes
          const scaleProgress = Math.round(rawScaleProgress * 1000) / 1000
          
          // Calculate scale directly from scrollY
          // Scale goes from 1 to 20 as scrollY goes from 0 to scrollMaxValue (heroHeight)
          // Scale = 1 + (scrollY / heroHeight) * 19
          // Scale is capped at 20 (100%) when scrollY >= scrollMaxValue
          // Use the smoother, unclamped scroll value for scale to avoid jitter
          const calculatedScale = targetScrollYForScale >= scrollMaxValue 
            ? 20 
            : Math.max(1, 1 + (targetScrollYForScale / scrollMaxValue) * 19)
          
          // Calculate thresholds based on scrollY directly
          const calculatedHasReachedScale10 = targetScrollYForScale >= (heroHeight * 0.5) // Scale 10 at 50% scroll
          const calculatedHasReachedFullScale = targetScrollYForScale >= scale15ScrollY // Scale 15 at 75% scroll
          const calculatedHasReachedScale20 = targetScrollYForScale >= scrollMaxValue // Scale 20 at 100% scroll

          // After square reaches max scale (20/100%), slide animations are based on scroll height
          // Use scrollMaxValue, slideAnimationScrollRange, and maxSlideScrollY declared earlier
          
          // Log scrollY-based transitions
          const prevScrollY = scrollProgressRef.current * scrollMaxValue
          const scrollDiff = Math.abs(targetScrollY - prevScrollY)
          
          // When square reaches 100% scale, use simple scroll behavior
          const lockY = scrollYWhenFirstSlideLoadedRef.current
          const hasScrolledAfterFirstSlide = scrollY > lockY
          
          // Don't hide hero - let it scroll up naturally when animations complete
          // Keep hasScrolledPastHero for reference but don't use it to hide
          const pastHero = calculatedHasReachedScale20 && firstSlideLoaded
          const prevPastHero = hasScrolledPastHero
          setHasScrolledPastHero((prev) => (prev !== pastHero ? pastHero : prev))
          
          // Only update scrollProgress state when there is a meaningful change
          if (Math.abs(scaleProgress - scrollProgressRef.current) > 0.004) {
            scrollProgressRef.current = scaleProgress
            setScrollProgress(scaleProgress)
          }
          
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
            } else {
              // Still in transition range - animations not complete
              animationsComplete = false
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
              translateYRef.current.set(-scrollBeyond)
            } else {
              // When scrolling up or before maxSlideScrollY, keep Hero visible
              translateYRef.current.set(0)
            }
          } else if (calculatedHasReachedFullScale && !firstSlideLoaded) {
            // First slide hasn't loaded yet, keep progress at 0
            translateYRef.current.set(0)
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
            translateYRef.current.set(0)
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
              translateYRef.current.set(0)
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
              translateYRef.current.set(0)
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
                setFirstSlideLoaded(false)
                setSecondSlideLoaded(false)
                setShowNewContent(false)
                setAllAnimationsComplete(false)
                // Reset locked image scale so it can scale properly again
                lockedImageScaleRef.current = null
                setLockedImageScale(null)
                // Reset slide locks so hero can replay cleanly if user scrolls back to top
                firstSlideLockDoneRef.current = false
                secondSlideLockDoneRef.current = false
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
            translateYRef.current.set(0)
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
      className="inset-0 min-h-screen overflow-hidden"
      style={{
        y: translateY,
        // Position changes dynamically: relative during lock, fixed otherwise
        position: useRelativePosition ? 'relative' : 'fixed',
        top: useRelativePosition ? 'auto' : 0,
        left: useRelativePosition ? 'auto' : 0,
        right: useRelativePosition ? 'auto' : 0,
        bottom: useRelativePosition ? 'auto' : 0,
        // When hero animation is done and user has scrolled past it,
        // drop z-index and disable pointer events so content below can sit on top.
        zIndex: allAnimationsComplete && scrollProgress >= 1 ? 0 : 40,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        visibility: 'visible',
        opacity: 1,
        pointerEvents: allAnimationsComplete && scrollProgress >= 1 ? 'none' : 'auto',
      }}
    >
      {/* Background Image - responsive to viewport */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: heroIntroPlayed ? 1 : 1.1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <Image
          src="/hero-landscape.jpeg"
          alt="Luxurious interior design"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Minor dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col pt-20">
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
                  {/* Background Image - responsive to viewport */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/about-bg.jpeg"
                      alt="Background"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/80" />
                  </div>
                  <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
                    {/* Center Image - Absolutely positioned, responsive to screen */}
                    <motion.div 
                      className="hidden lg:block absolute left-1/2 top-1/2 overflow-hidden pointer-events-none z-10 w-[min(40vw,512px)] max-w-[512px] aspect-[4/5]"
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
                            className="object-cover object-center"
                            sizes="(max-width: 1280px) 40vw, (max-width: 1536px) 35vw, 512px"
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
                            className="object-cover object-center"
                            sizes="(max-width: 1280px) 40vw, (max-width: 1536px) 35vw, 512px"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Mobile Center Image - responsive to screen */}
                    <div className="lg:hidden flex items-center justify-center w-full">
                      <motion.div 
                        className="relative overflow-hidden w-[min(85vw,400px)] max-w-[400px] aspect-[4/5]"
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
                              className="object-cover object-center"
                              sizes="(max-width: 480px) 85vw, (max-width: 768px) 75vw, 400px"
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
                              className="object-cover object-center"
                              sizes="(max-width: 480px) 85vw, (max-width: 768px) 75vw, 400px"
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
                            {showNewContent ? "OUR VISION" : "ABOUT GT ESTATES"}
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
                            ? <><span className="whitespace-nowrap">BUILDING TRUST THROUGH</span><br /><span className="whitespace-nowrap">SMART INVESTMENTS</span></>
                            : <><span className="whitespace-nowrap">REDEFINE THE FUTURE</span><br /><span className="whitespace-nowrap">OF REAL ESTATE</span></>}
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
                              ? "Creating opportunities that inspire growth, value, and long-term success in real estate."
                              : "Delivering smart investment opportunities through premium residential and commercial plots that shape modern living."}
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
                                  We envision a real estate market where every investor makes decisions with clarity and confidence - Backed by verified projects, transparent dealings, and real market insights.
                                </p>
                                <p>
                                  Our vision is to guide clients in Lahore and beyond toward secure investments in Etihad Town Phase 3 and Etihad Town Sialkot, helping them achieve sustainable growth and lasting returns.
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  GT Estates is a Lahore-based real estate firm specializing in residential and commercial plot investments, offering trusted opportunities in Etihad Town Phase 3 and Etihad Town Sialkot.
                                </p>
                                <p>
                                  We combine market expertise with strong credibility to help you invest with confidence, turning the right location into long-term value and growth.
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
                              className="group inline-flex items-center gap-2 text-white font-medium uppercase tracking-wider hover:text-neon-green transition-colors duration-300"
                            >
                              <Diamond className="w-3 h-3 fill-neon-green text-neon-green shrink-0" />
                              <span className="border-b border-neon-green">AFFILIATED PAGES</span>
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
                                ? "border-neon-green hover:bg-neon-green/10" 
                                : "border-white/30 hover:border-white/60"
                              }`}
                            >
                              <Diamond className="w-4 h-4 fill-neon-green text-neon-green" />
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
                initial={{ opacity: 0, x: -120 }}
                animate={{ 
                  opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                  x: inView ? 0 : -120,
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="relative"
                style={{ 
                  position: 'absolute',
                  left: 0,
                  bottom: 'calc(50% + 0.5rem)'
                }}
              >
                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, x: -80 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                  className="text-white text-sm md:text-base font-light uppercase tracking-wider mb-4"
                >
                  Professional Real Estate &amp; Plot Specialists – Pakistan
                </motion.p>

                {/* Main Headline - BUILDING */}
                <motion.h1
                  initial={{ opacity: 0, x: -120 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-tight leading-none relative"
                >
                  CREATING VALUE
                </motion.h1>
              </motion.div>

              {/* Right Side - VISIONS (below the line) */}
              <motion.div
                initial={{ opacity: 0, x: 120 }}
                animate={{ 
                  opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                  x: inView ? 0 : 120,
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
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
                  initial={{ opacity: 0, x: 120 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-tight leading-none text-right"
                >
                  <span className="whitespace-nowrap">SHAPING</span>
                  <br />
                  <span className="whitespace-nowrap">FUTURES</span>
                </motion.h1>

                {/* Contact Us Button */}
                <motion.div
                  initial={{ opacity: 0, x: 120 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                  className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <span className="btn-hero-group">
                    <Link href="/contact" className="btn-hero">
                      <Diamond className="w-4 h-4" />
                      <span>Start Investing</span>
                    </Link>
                  </span>
                  <span className="btn-hero-group">
                    <Link href="/projects" className="btn-hero-outline">
                      <span>View Opportunities</span>
                    </Link>
                  </span>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Descriptive Text - Below the line */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: (allAnimationsComplete && scrollProgress >= 1) ? 0 : (inView ? 1 : 0),
                y: inView ? 0 : 40,
              }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
              className="absolute left-4 sm:left-6 lg:left-8 xl:left-12 text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md lg:max-w-lg z-10"
              style={{ top: 'calc(50% + 2rem)' }}
            >
              We focus on residential and commercial plots, delivering secure investments, prime areas, honest guidance, and profitable growth through reliable projects.
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator - click scrolls past hero so page can move */}
        <motion.button
          type="button"
          onClick={() => scrollTo(scrollTargetYRef.current)}
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

