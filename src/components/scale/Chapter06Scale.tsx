import React, { useRef, useEffect } from 'react';
import { SpeedingText } from '../ui/SpeedingText';
import { OLIVE_STATS } from '../../data/content';
import { gsap } from 'gsap';
import { Certificate, GlobeHemisphereWest, Sparkle } from '@phosphor-icons/react';

export const Chapter06Scale: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.stat-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative w-full bg-obsidian text-warm-ivory py-24 sm:py-32 lg:py-36 px-6 sm:px-12 lg:px-20 border-t border-subtle overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80 mb-16 pb-6 border-b border-subtle">
          <div className="flex items-center gap-2">
            <Certificate className="w-4 h-4 text-aged-gold" />
            <span>Chapter 06 · The Scale of Olive</span>
          </div>
          <span>Numerical Evidence · Verified Archive</span>
        </div>

        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
            EVIDENCE OVER ASSERTION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-warm-ivory leading-tight">
            Twelve years of quiet precision, <br />
            <span className="italic font-normal text-gold-gradient">
              measured in memory.
            </span>
          </h2>
          <p className="font-sans text-bone/70 text-base sm:text-lg font-light leading-relaxed mt-6">
            We do not manufacture statistics. Every number below reflects real
            celebrations designed, produced, and orchestrated across India's
            most distinctive destinations since 2014.
          </p>
        </div>

        {/* 4 Speeding Text Stat Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20"
        >
          {OLIVE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-card p-8 rounded-2xl bg-deep-forest/60 border border-subtle hover:border-aged-gold/40 transition-all duration-500 flex flex-col justify-between h-72 group"
            >
              <div className="flex items-center justify-between">
                <span className="w-2 h-2 rounded-full bg-aged-gold/60 group-hover:scale-125 transition-transform" />
                <Sparkle className="w-4 h-4 text-aged-gold/40 group-hover:text-aged-gold transition-colors" />
              </div>

              <div>
                <div className="mb-2">
                  <SpeedingText
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.0}
                    className="font-serif text-5xl sm:text-6xl text-warm-ivory font-light"
                  />
                </div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-aged-gold font-medium mb-2">
                  {stat.label}
                </h3>
                <p className="font-sans text-xs text-bone/60 leading-relaxed font-light">
                  {stat.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-subtle/40 text-[10px] font-mono uppercase tracking-widest text-bone/40">
                Atelier Portfolio
              </div>
            </div>
          ))}
        </div>

        {/* Additional verified credibility band */}
        <div className="p-8 sm:p-10 rounded-2xl bg-deep-forest/30 border border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <GlobeHemisphereWest className="w-8 h-8 text-aged-gold flex-shrink-0" />
            <div>
              <p className="font-serif text-xl sm:text-2xl text-warm-ivory font-light">
                National Presence with Distinctive Art Direction
              </p>
              <p className="font-sans text-xs text-bone/60 tracking-wide mt-1">
                Headquartered in Chennai with active event production across Mumbai, Bengaluru,
                Delhi NCR, Goa, Rajasthan, and distinctive destinations across India.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="font-mono text-2xl text-aged-gold font-light">
              98%
            </span>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-bone/50">
              Client Referral Rate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
