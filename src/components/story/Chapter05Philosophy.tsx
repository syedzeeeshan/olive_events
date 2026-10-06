import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OLIVE_PRINCIPLES } from '../../data/content';
import { OLIVE_MEDIA } from '../../data/config';
import { Leaf, ShieldCheck, Sparkle } from '@phosphor-icons/react';

export const Chapter05Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on the portrait frame
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 60 },
          {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-full bg-deep-forest text-warm-ivory py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 border-t border-subtle overflow-hidden"
    >
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Metadata */}
        <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80 mb-16 pb-6 border-b border-subtle">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-aged-gold" />
            <span>Chapter 05 · The Philosophy</span>
          </div>
          <span>Vertical Editorial · Studio Manifesto</span>
        </div>

        {/* Editorial Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-mono tracking-ultra text-aged-gold/90 block mb-6">
              Chennai · India · Est. 2014
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-warm-ivory leading-[1.12] mb-8">
              An olive tree takes years to bear fruit. <br />
              <span className="italic font-normal text-gold-gradient">
                So does true craft.
              </span>
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-bone/80 font-light leading-relaxed">
              <p>
                Olive Events began as a two-person floral studio and grew,
                one celebration at a time, into a comprehensive spatial design and
                master production house.
              </p>
              <p>
                Today our atelier of forty designers, producers, florists and
                scenographers delivers bespoke celebrations across India's most distinctive
                destinations. We still work the way we started: a single dedicated
                creative director who knows your celebration by heart, honest itemised
                budgets, and an unwavering devotion to the quiet details guests feel without effort.
              </p>
            </div>

            {/* Founder Attribution */}
            <div className="mt-10 pt-8 border-t border-subtle/80 flex items-center justify-between">
              <div>
                <p className="font-serif italic text-2xl text-warm-ivory">
                  Meera Iyer
                </p>
                <p className="text-xs uppercase font-mono tracking-widest text-aged-gold/80 mt-1">
                  Founder & Creative Director
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-aged-gold/30 flex items-center justify-center text-aged-gold">
                <Sparkle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-subtle shadow-2xl bg-obsidian"
            >
              <img
                src={OLIVE_MEDIA.imagery.team}
                alt="Olive Events creative studio production"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-xs font-mono uppercase tracking-widest text-bone/70">
                The Olive Production Team · In-House Atelier
              </div>
            </div>
          </div>
        </div>

        {/* The Six Principles Section */}
        <div className="pt-16 border-t border-subtle">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase font-mono tracking-ultra text-aged-gold/80 block mb-3">
              Guiding Convictions
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-warm-ivory font-light">
              Six principles behind every room we compose.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OLIVE_PRINCIPLES.map((principle) => (
              <div
                key={principle.num}
                className="p-8 rounded-2xl bg-obsidian/40 border border-subtle/80 hover:border-aged-gold/40 transition-colors duration-500 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-aged-gold tracking-widest">
                    {principle.num}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-aged-gold/40 group-hover:text-aged-gold transition-colors duration-300" />
                </div>
                <h4 className="font-serif text-2xl text-warm-ivory font-light mb-3">
                  {principle.title}
                </h4>
                <p className="font-sans text-sm text-bone/70 font-light leading-relaxed">
                  {principle.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
