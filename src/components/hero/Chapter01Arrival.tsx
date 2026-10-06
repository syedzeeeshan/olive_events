import React, { useRef, useEffect } from 'react';
import { HeroLiquidGlass } from './HeroLiquidGlass';
import { scrollToTarget } from '../../animations/scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Play, Sparkle } from '@phosphor-icons/react';

interface Chapter01ArrivalProps {
  onOpenEnquiry: () => void;
  onOpenVideo: (url: string) => void;
}

export const Chapter01Arrival: React.FC<Chapter01ArrivalProps> = ({
  onOpenEnquiry,
  onOpenVideo,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Intro reveal for action CTAs
      gsap.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
      );

      // Scroll-driven departure transformation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            const p = self.progress;
            contentRef.current.style.opacity = `${Math.max(0, 1 - p * 1.5)}`;
            contentRef.current.style.transform = `translateY(${p * -100}px) scale(${1 - p * 0.05})`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="arrival"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 py-10 md:py-14 bg-obsidian overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas Layer with Unified Glass Container (Metadata + 3D Logo + Headline + Description) */}
      <HeroLiquidGlass mode="hero" />

      {/* Subtle radial vignette framing the 3D scene */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian/20 to-obsidian/75 pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/90 pointer-events-none z-[2]" />

      {/* Accessible semantic heading for SEO & screen readers */}
      <div className="sr-only">
        <h1>Olive Events · Moments, Rooted in Elegance</h1>
      </div>

      {/* Hero Layout: Top Spacer for Navigation breathing room */}
      <div className="w-full h-12 sm:h-16 pointer-events-none" aria-hidden="true" />

      {/* Hero Central Clearance & CTA Row */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-none my-auto"
      >
        {/* Optical clearance spacer corresponding to the unified 3D glass composition */}
        <div
          className="w-full h-[420px] sm:h-[450px] md:h-[480px] pointer-events-none mb-3"
          aria-hidden="true"
        />

        {/* Action Layer (CTA Row positioned cleanly beneath the glass composition) */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pointer-events-auto"
        >
          <button
            onClick={onOpenEnquiry}
            className="group relative px-8 py-3.5 rounded-lg bg-olive text-warm-ivory font-medium text-sm tracking-widest uppercase border border-aged-gold/50 hover:border-aged-gold transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-aged-gold/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Plan Your Event
              <Sparkle className="w-4 h-4 text-aged-gold group-hover:rotate-45 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-aged-gold/25 via-aged-gold/15 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button
            onClick={() => onOpenVideo('https://assets.mixkit.co/videos/5224/5224-1080.mp4')}
            className="group px-7 py-3.5 rounded-lg bg-transparent text-bone/80 hover:text-warm-ivory text-sm tracking-widest uppercase border border-bone/20 hover:border-bone/50 transition-all duration-300 flex items-center gap-2.5 bg-obsidian/40 backdrop-blur-sm"
          >
            <Play className="w-3.5 h-3.5 text-aged-gold fill-aged-gold group-hover:scale-110 transition-transform duration-300" />
            <span>Watch Showreel</span>
          </button>
        </div>
      </div>

      {/* Bottom Narrative Transition Cue */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-ultra text-bone/45 pb-2 pointer-events-none">
        <button
          onClick={() => scrollToTarget('#vision')}
          className="flex flex-col items-center gap-1.5 hover:text-aged-gold transition-colors duration-300 pointer-events-auto"
          aria-label="Continue to Chapter 02: The Vision"
        >
          <span>Chapter 02 · The Vision</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-aged-gold/70" />
        </button>
      </div>
    </section>
  );
};
