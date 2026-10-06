import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OLIVE_MEDIA } from '../../data/config';
import { ArrowLeft, FlowerLotus, Hammer, Sparkle } from '@phosphor-icons/react';

export const Chapter04Craft: React.FC = () => {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      // Start on the right and translate leftwards (Right -> Left scroll)
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
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, trigger);

    return () => ctx.revert();
  }, []);

  const craftSteps = [
    {
      step: 'Step 01',
      title: 'The Blueprint',
      label: 'Spatial Draft & Concept',
      desc: '3D CAD floor plans, light simulation and botanical selections tailored to the natural acoustic landscape.',
      image: OLIVE_MEDIA.imagery.aboutMain,
      stat: '40 In-House Specialists',
    },
    {
      step: 'Step 02',
      title: 'The Floral Architecture',
      label: 'Botanical Sculptures',
      desc: 'Fresh stem installations sourced directly from ethical growers, conditioned and sculptured on-site overnight.',
      image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=80',
      stat: 'Zero Third-Party Middlemen',
    },
    {
      step: 'Step 03',
      title: 'The Architectural Staging',
      label: 'Lighting & Acoustic Rigging',
      desc: 'Broadcast-calibrated warm illumination, custom concealed acoustic baffles and custom stage fabrication.',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80',
      stat: '24h Technical Readiness',
    },
    {
      step: 'Step 04',
      title: 'The Tablescape',
      label: 'Tactile Table Curations',
      desc: 'Hand-pressed linen textures, curated crystal, bespoke hand-calligraphed menu suites and heirloom porcelain.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
      stat: 'Micro-Detail Perfection',
    },
    {
      step: 'Step 05',
      title: 'The Living Moment',
      label: 'Seamless Execution',
      desc: 'One dedicated lead overseeing every single minute. Hosts enjoy their guests without managing a single supplier.',
      image: OLIVE_MEDIA.gallery[4].img,
      stat: 'Clockwork Logistics',
    },
  ];

  return (
    <section
      ref={triggerRef}
      id="craft"
      className="relative w-full h-screen bg-obsidian overflow-hidden select-none border-t border-subtle"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-full will-change-transform items-center"
        style={{ width: 'fit-content' }}
      >
        {/* Intro Banner */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-deep-forest/40">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4 text-aged-gold" />
              <span>Chapter 04 · Behind The Scenes</span>
            </div>
            <div className="flex items-center gap-1.5 text-bone/60">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Direction: Right to Left</span>
            </div>
          </div>

          <div className="max-w-3xl my-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
              THE OLIVE ATELIER
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-warm-ivory leading-[1.05] tracking-tight">
              An event is built <br />
              <span className="italic font-normal text-gold-gradient">
                one millimeter at a time.
              </span>
            </h2>
            <p className="font-sans text-bone/70 text-base sm:text-lg max-w-xl font-light leading-relaxed mt-6">
              Step inside our preparation rooms, fabrication floor, and botanical
              workshops. Witness the tactile craftsmanship that precedes the
              celebration.
            </p>
          </div>

          <div className="text-xs text-bone/40 font-mono tracking-widest uppercase">
            Scroll to unveil the construction sequence
          </div>
        </div>

        {/* 5 Craft Panels */}
        {craftSteps.map((item, idx) => (
          <div
            key={item.step}
            className="w-[320px] sm:w-[420px] lg:w-[480px] h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 border-r border-subtle bg-obsidian relative group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-aged-gold tracking-widest uppercase">
                {item.step} · Phase 0{idx + 1}
              </span>
              <FlowerLotus className="w-4 h-4 text-aged-gold/40 group-hover:text-aged-gold transition-colors duration-300" />
            </div>

            <div className="my-auto">
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-8 border border-subtle relative shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-obsidian/80 border border-aged-gold/30 text-aged-gold">
                  {item.stat}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-warm-ivory font-light mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-aged-gold/90 mb-4">
                {item.label}
              </p>
              <p className="font-sans text-sm text-bone/70 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-subtle flex items-center justify-between text-[11px] font-mono text-bone/40 uppercase tracking-widest">
              <span>Studio Discipline</span>
              <Sparkle className="w-3.5 h-3.5 text-aged-gold/60" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
