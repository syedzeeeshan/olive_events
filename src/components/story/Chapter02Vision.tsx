import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OLIVE_MEDIA } from '../../data/config';
import { ArrowRight, Compass, Sparkle } from '@phosphor-icons/react';

export const Chapter02Vision: React.FC = () => {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal translation needed
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle parallax on internal imagery
      const images = track.querySelectorAll('.vision-parallax-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { x: 60, scale: 1.08 },
          {
            x: -60,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: trigger,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              scrub: 1,
            },
          }
        );
      });

      return () => {
        tween.kill();
      };
    }, trigger);

    return () => ctx.revert();
  }, []);

  const stages = [
    {
      num: '01',
      title: 'Idea',
      phrase: 'The spark of intention',
      desc: 'Every milestone starts with a single human narrative and emotional brief.',
      image: OLIVE_MEDIA.imagery.aboutMain,
    },
    {
      num: '02',
      title: 'Space',
      phrase: 'Architecture and atmosphere',
      desc: 'Heritage courtyards, grand ballrooms and coastal lawns transformed through spatial harmony.',
      image: OLIVE_MEDIA.imagery.beforeSpace,
    },
    {
      num: '03',
      title: 'Detail',
      phrase: 'Tactile consideration',
      desc: 'Rare linens, bespoke porcelain, acoustic softness and scent curation.',
      image: OLIVE_MEDIA.imagery.afterSpace,
    },
    {
      num: '04',
      title: 'Craft',
      phrase: 'Living execution',
      desc: 'In-house floral artisans, master lighting designers and clockwork logistics.',
      image: OLIVE_MEDIA.gallery[0].img,
    },
    {
      num: '05',
      title: 'Moment',
      phrase: 'Enduring memory',
      desc: 'The room breathes. The lights align. Guests are fully present in celebration.',
      image: OLIVE_MEDIA.gallery[4].img,
    },
  ];

  return (
    <section
      ref={triggerRef}
      id="vision"
      className="relative w-full h-screen bg-deep-forest overflow-hidden"
    >
      {/* Horizontal Traveling Track */}
      <div
        ref={trackRef}
        className="flex flex-row h-full will-change-transform items-center"
        style={{ width: 'fit-content' }}
      >
        {/* PANEL 1: Discovery Intro */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-aged-gold" />
              <span>Chapter 02 · Horizontal Discovery</span>
            </div>
            <span>Direction: Left to Right</span>
          </div>

          <div className="max-w-4xl my-auto">
            <p className="font-mono text-xs uppercase tracking-widest text-aged-gold/70 mb-4">
              OLIVE / 001 · THE VISION
            </p>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-warm-ivory leading-[1.05] tracking-tight">
              Some moments <br />
              <span className="italic font-normal text-gold-gradient">
                deserve more.
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between text-xs text-bone/50 tracking-wider">
            <span>Scroll horizontally to walk through our methodology</span>
            <div className="flex items-center gap-2 text-aged-gold/80">
              <span>Scroll to unveil</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>

        {/* PANEL 2: Philosophy Manifesto */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-obsidian/40">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-ultra text-aged-gold/80 block mb-6">
              Our Ethos
            </span>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-ivory font-light leading-snug mb-8">
              We do not just plan events.
              <br />
              <span className="italic text-gold-gradient">
                We craft living experiences.
              </span>
            </p>
            <p className="font-sans text-bone/70 text-base sm:text-lg leading-relaxed font-light max-w-xl">
              From Chennai to Rajasthan, our studio designs celebrations
              grounded in architectural beauty, cultural reverence, and discreet
              hospitality.
            </p>
          </div>

          <div className="hidden lg:block w-[420px] h-[580px] relative rounded-2xl overflow-hidden shadow-2xl border border-bone/10">
            <img
              src={OLIVE_MEDIA.imagery.aboutSecondary}
              alt="Intimate celebration setting"
              className="vision-parallax-img w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-xs text-bone/75 font-mono uppercase tracking-widest">
              Rambagh Palace · Private Garden Soirée, Jaipur
            </div>
          </div>
        </div>

        {/* PANEL 3: The 5-Phase Progressive Revelation */}
        <div className="h-screen flex-shrink-0 flex flex-row items-center p-8 sm:p-14 lg:p-20 gap-8 sm:gap-12 bg-deep-forest/90">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="w-[300px] sm:w-[360px] h-[520px] sm:h-[580px] flex-shrink-0 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-obsidian/70 border border-subtle relative overflow-hidden group hover:border-aged-gold/40 transition-colors duration-500"
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-sm text-aged-gold font-light tracking-widest">
                  {stage.num}
                </span>
                <Sparkle className="w-4 h-4 text-aged-gold/50 group-hover:text-aged-gold transition-colors duration-300" />
              </div>

              <div className="relative z-10 my-auto">
                <div className="w-full h-44 rounded-xl overflow-hidden mb-6 border border-bone/10">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-3xl font-light text-warm-ivory mb-2">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-aged-gold/90 mb-3">
                  {stage.phrase}
                </p>
                <p className="font-sans text-xs sm:text-sm text-bone/70 font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-subtle/50 text-[10px] font-mono uppercase tracking-widest text-bone/40">
                Olive Architecture System
              </div>
            </div>
          ))}
        </div>

        {/* PANEL 4: Bridge into Chapter 03 Gallery */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-center items-center text-center p-8 sm:p-14 lg:p-20 relative bg-obsidian border-l border-subtle">
          <p className="font-mono text-xs uppercase tracking-ultra text-aged-gold/80 mb-6">
            OLIVE / 002 · THE ARCHIVE
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-warm-ivory max-w-3xl leading-tight mb-8">
            The visitor stops reading <br />
            <span className="italic font-normal text-gold-gradient">
              and starts experiencing.
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-bone/70 max-w-xl font-light leading-relaxed mb-10">
            Enter our signature dimensional gallery: an interactive corridor of
            curved memory planes celebrating twelve milestones across India's most distinctive destinations.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-aged-gold/30 text-xs uppercase tracking-widest text-aged-gold font-mono">
            <span>Scroll Down to Enter 3D Gallery</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
