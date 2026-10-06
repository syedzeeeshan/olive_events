import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OLIVE_MEDIA } from '../../data/config';
import { ArrowsLeftRight, MagicWand } from '@phosphor-icons/react';

export const Chapter08Transformation: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Scroll-driven automated reveal
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1.2,
        onUpdate: (self) => {
          if (!isDragging.current) {
            setSliderPos(Math.round(20 + self.progress * 60));
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section
      ref={sectionRef}
      id="transformation"
      className="relative w-full bg-obsidian text-warm-ivory py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 border-t border-subtle overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80 mb-16 pb-6 border-b border-subtle">
          <div className="flex items-center gap-2">
            <MagicWand className="w-4 h-4 text-aged-gold" />
            <span>Chapter 08 · The Transformation</span>
          </div>
          <span>Vertical Climax · Before and After</span>
        </div>

        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
            FROM RAW VOID TO REVERED ATMOSPHERE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-warm-ivory leading-tight">
            Empty space <br />
            <span className="italic font-normal text-gold-gradient">
              becoming living memory.
            </span>
          </h2>
          <p className="font-sans text-bone/70 text-base sm:text-lg font-light leading-relaxed mt-6">
            Drag the cursor across the architectural frame below to witness how
            our studio transforms raw structures, heritage courtyards, and empty
            ballrooms into deeply considered sanctuaries of celebration.
          </p>
        </div>

        {/* Interactive Before/After Split Viewer */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-subtle shadow-2xl cursor-ew-resize touch-none group"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          {/* AFTER Image (Full Layer Beneath) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={OLIVE_MEDIA.imagery.afterSpace}
              alt="Transformed celebration gala"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-obsidian/85 backdrop-blur-md border border-aged-gold/40 text-xs font-mono uppercase tracking-widest text-aged-gold">
              Transformed · Royal Gala Room
            </div>
          </div>

          {/* BEFORE Image (Clipped Layer on Top) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={OLIVE_MEDIA.imagery.beforeSpace}
              alt="Empty raw architectural space"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-obsidian/85 backdrop-blur-md border border-subtle text-xs font-mono uppercase tracking-widest text-bone/70">
              Raw Void · Pre-Build Staging
            </div>
          </div>

          {/* Split Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-aged-gold pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-obsidian border border-aged-gold flex items-center justify-center text-aged-gold shadow-2xl">
              <ArrowsLeftRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Progression Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-subtle">
          <div>
            <span className="font-mono text-xs text-aged-gold tracking-widest block mb-2">
              01 · The Void
            </span>
            <p className="font-serif text-xl text-warm-ivory mb-1">Empty Space</p>
            <p className="font-sans text-xs text-bone/60 leading-relaxed font-light">
              Raw volume, structural acoustics and lighting analysis.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-aged-gold tracking-widest block mb-2">
              02 · The Plan
            </span>
            <p className="font-serif text-xl text-warm-ivory mb-1">Artistic Vision</p>
            <p className="font-sans text-xs text-bone/60 leading-relaxed font-light">
              Atmospheric mood boards, 3D renders and bespoke material selection.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-aged-gold tracking-widest block mb-2">
              03 · The Build
            </span>
            <p className="font-serif text-xl text-warm-ivory mb-1">Transformation</p>
            <p className="font-sans text-xs text-bone/60 leading-relaxed font-light">
              Rigging, floral installation, staging and culinary setup.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-aged-gold tracking-widest block mb-2">
              04 · The Night
            </span>
            <p className="font-serif text-xl text-warm-ivory mb-1">Finished Event</p>
            <p className="font-sans text-xs text-bone/60 leading-relaxed font-light">
              Guests arrive to warmth, effortless elegance, and flawless flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
