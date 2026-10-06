import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initGlobalScroll(): Lenis {
  if (lenisInstance) {
    return lenisInstance;
  }

  // Determine reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenis = new Lenis({
    duration: prefersReducedMotion ? 0.1 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
  });

  lenisInstance = lenis;

  // Unify Lenis scroll updates with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Sync GSAP ticker with Lenis requestAnimationFrame
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Refresh ScrollTrigger when DOM is fully settled
  ScrollTrigger.refresh();

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.4 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}
