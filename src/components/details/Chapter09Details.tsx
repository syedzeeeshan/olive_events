import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Feather, Sparkle } from '@phosphor-icons/react';

export const Chapter09Details: React.FC = () => {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1.4, // Deliberately slower and more contemplative
            invalidateOnRefresh: true,
          },
        }
      );
    }, trigger);

    return () => ctx.revert();
  }, []);

  const detailCurations = [
    {
      title: 'Botanical Stem Conditioning',
      medium: 'Flora & Scent',
      note: 'Garden roses, olive sprigs and jasmine conditioned for optimum evening blossom and gentle natural fragrance.',
      image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Rare Loom Belgian Linens',
      medium: 'Textile & Touch',
      note: 'Stone-washed natural textures with understated drape, absorbing ambient acoustic resonance across the table.',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Hand-Calligraphed Paper Suites',
      medium: 'Stationery & Tone',
      note: 'Handmade deckle-edge cotton papers, metallic gold foil typography and personalized wax crest seals.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Crystalline Candle Refraction',
      medium: 'Light & Atmosphere',
      note: 'Hand-blown crystal flutes catching soft candlelight, tuned to create warm reflections across guest eyes.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Sensory Gastronomy & Pairings',
      medium: 'Culinary Art',
      note: 'Menus developed alongside renowned culinary masters, pairing regional Indian provenance with contemporary fine dining.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: 'Unscripted Human Expressions',
      medium: 'The Memory',
      note: 'The quiet laugh between vows. The proud embrace of parents. Moments composed to be felt without interruption.',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  return (
    <section
      ref={triggerRef}
      id="details"
      className="relative w-full h-screen bg-deep-forest overflow-hidden select-none border-t border-subtle"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-full will-change-transform items-center"
        style={{ width: 'fit-content' }}
      >
        {/* Intro */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-obsidian/80">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-aged-gold" />
              <span>Chapter 09 · The Details</span>
            </div>
            <div className="flex items-center gap-1.5 text-bone/60">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Direction: Right to Left · Appreciation</span>
            </div>
          </div>

          <div className="max-w-2xl my-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
              A QUIETER CADENCE
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-warm-ivory leading-[1.08] tracking-tight">
              They care about <br />
              <span className="italic font-normal text-gold-gradient">
                every single detail.
              </span>
            </h2>
            <p className="font-sans text-bone/70 text-base sm:text-lg max-w-lg font-light leading-relaxed mt-6">
              When the lights soften and the music begins, it is the sensory
              micro-moments that guests remember. We design them with obsessive
              devotion.
            </p>
          </div>

          <div className="text-xs text-bone/40 font-mono tracking-widest uppercase">
            Slow down and observe the tactile elements
          </div>
        </div>

        {/* 6 Large Detail Focus Panels */}
        {detailCurations.map((item, idx) => (
          <div
            key={item.title}
            className="w-[85vw] sm:w-[65vw] lg:w-[48vw] h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 border-r border-subtle bg-obsidian relative group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-aged-gold tracking-widest uppercase">
                Detail 0{idx + 1} · {item.medium}
              </span>
              <Sparkle className="w-4 h-4 text-aged-gold/40 group-hover:text-aged-gold transition-colors" />
            </div>

            <div className="my-auto">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-subtle shadow-2xl relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-warm-ivory font-light mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-bone/70 font-light leading-relaxed max-w-lg">
                {item.note}
              </p>
            </div>

            <div className="pt-4 border-t border-subtle text-[10px] font-mono text-bone/40 uppercase tracking-widest flex items-center justify-between">
              <span>Tactile Mastery</span>
              <span>Olive Atelier</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
