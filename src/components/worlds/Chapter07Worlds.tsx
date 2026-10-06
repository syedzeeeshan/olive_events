import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OLIVE_WORLDS } from '../../data/content';
import { ArrowRight, Compass, Sparkle } from '@phosphor-icons/react';

interface Chapter07Props {
  onSelectWorld: (worldId: string) => void;
  onOpenVideo: (url: string) => void;
}

export const Chapter07Worlds: React.FC<Chapter07Props> = ({
  onSelectWorld,
  onOpenVideo,
}) => {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="worlds"
      className="relative w-full h-screen bg-deep-forest overflow-hidden select-none border-t border-subtle"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-full will-change-transform items-center"
        style={{ width: 'fit-content' }}
      >
        {/* Intro Portal */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-obsidian/70">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-aged-gold" />
              <span>Chapter 07 · The Worlds</span>
            </div>
            <div className="flex items-center gap-1.5 text-bone/60">
              <span>Direction: Left to Right · Spatial Exploration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="max-w-3xl my-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
              SIX DISCIPLINES · ONE VISION
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-warm-ivory leading-[1.05] tracking-tight">
              Enter our <br />
              <span className="italic font-normal text-gold-gradient">
                distinct worlds.
              </span>
            </h2>
            <p className="font-sans text-bone/70 text-base sm:text-lg max-w-xl font-light leading-relaxed mt-6">
              Each discipline operates with its own specialized design language,
              from intimate bespoke floral architecture to high-level diplomatic
              summits.
            </p>
          </div>

          <div className="text-xs text-bone/40 font-mono tracking-widest uppercase">
            Scroll horizontally to wander across realms
          </div>
        </div>

        {/* 6 Spatial World Slides */}
        {OLIVE_WORLDS.map((world) => (
          <div
            key={world.id}
            className="w-[85vw] sm:w-[70vw] lg:w-[58vw] h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-r border-subtle bg-obsidian relative overflow-hidden group"
          >
            {/* Ambient Background Glow from image */}
            <div className="absolute inset-0 opacity-20 pointer-events-none scale-105 group-hover:scale-100 transition-transform duration-1000">
              <img
                src={world.image}
                alt=""
                className="w-full h-full object-cover filter blur-2xl"
                loading="lazy"
              />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-aged-gold font-light tracking-widest">
                  World {world.num}
                </span>
                <span className="text-xs font-mono text-bone/40 uppercase tracking-widest">
                  {world.accent}
                </span>
              </div>
              <Sparkle className="w-4 h-4 text-aged-gold/60" />
            </div>

            {/* Main Spatial Card Body */}
            <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-serif text-3xl sm:text-5xl text-warm-ivory font-light leading-tight">
                  {world.title}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-aged-gold/90 font-medium">
                  {world.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-base text-bone/75 font-light leading-relaxed">
                  {world.lead}
                </p>
                <div className="pt-3 flex flex-wrap gap-2">
                  {world.highlights.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest/80 border border-subtle text-bone/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-subtle shadow-2xl group-hover:border-aged-gold/40 transition-colors duration-500">
                  <img
                    src={world.image}
                    alt={world.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  {world.video && (
                    <button
                      onClick={() => onOpenVideo(world.video!)}
                      className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-obsidian/90 backdrop-blur-md border border-aged-gold/40 text-xs font-mono uppercase tracking-widest text-aged-gold hover:bg-aged-gold hover:text-obsidian transition-colors"
                    >
                      Watch Reel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 pt-6 border-t border-subtle flex items-center justify-between">
              <button
                onClick={() => onSelectWorld(world.title)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-aged-gold hover:text-warm-ivory transition-colors group"
              >
                <span>Enquire About {world.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-[10px] font-mono text-bone/40 uppercase tracking-widest">
                Dedicated Lead & Production Team
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
