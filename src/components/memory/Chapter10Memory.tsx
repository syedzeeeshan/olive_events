import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OLIVE_MEDIA, OLIVE_CONTACT, OLIVE_BRAND, OLIVE_SOCIAL } from '../../data/config';
import { OLIVE_TESTIMONIALS } from '../../data/content';
import {
  ArrowRight,
  ChatCircleText,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  Phone,
  Sparkle,
  WhatsappLogo,
} from '@phosphor-icons/react';

interface Chapter10Props {
  onOpenEnquiry: () => void;
  onOpenConcierge: () => void;
  onOpenDigital: () => void;
  onOpenPortfolio: () => void;
  onOpenVideo: (url: string) => void;
}

export const Chapter10Memory: React.FC<Chapter10Props> = ({
  onOpenEnquiry,
  onOpenConcierge,
  onOpenDigital,
  onOpenPortfolio,
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
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="memory"
      className="relative w-full h-screen bg-obsidian overflow-hidden select-none border-t border-subtle"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-full will-change-transform items-center"
        style={{ width: 'fit-content' }}
      >
        {/* PANEL 1: Emotional Climax Statement */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-deep-forest/40">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-aged-gold" />
              <span>Chapter 10 · The Memory</span>
            </div>
            <div className="flex items-center gap-1.5 text-bone/60">
              <span>Final Chapter · Left to Right</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="max-w-4xl my-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
              THE CLIMAX
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-warm-ivory leading-[1.05] tracking-tight">
              The event ends. <br />
              <span className="italic font-normal text-gold-gradient">
                The experience does not.
              </span>
            </h2>
            <p className="font-sans text-bone/70 text-base sm:text-lg max-w-xl font-light leading-relaxed mt-6">
              When the midnight music settles, what remains is the feeling of
              being welcomed, elevated, and deeply moved.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-bone/40 uppercase tracking-widest">
            <span>Enduring Impressions</span>
            <button
              onClick={() => onOpenVideo(OLIVE_MEDIA.videos.fireworks)}
              className="text-aged-gold hover:text-warm-ivory flex items-center gap-1.5 transition-colors"
            >
              <span>Watch Midnight Film</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* PANEL 2: Client Memories & Real Words */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative border-r border-subtle bg-obsidian">
          <div className="text-xs uppercase tracking-ultra text-aged-gold/80">
            Words From Hosts & Guests
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto">
            {OLIVE_TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="p-8 rounded-2xl bg-deep-forest/40 border border-subtle flex flex-col justify-between h-80 group hover:border-aged-gold/40 transition-colors"
              >
                <span className="font-serif text-5xl text-aged-gold/40 leading-none">
                  “
                </span>
                <p className="font-serif text-lg sm:text-xl text-warm-ivory font-light leading-snug">
                  {t.quote}
                </p>
                <div className="pt-4 border-t border-subtle">
                  <p className="font-sans text-sm text-bone font-medium">
                    {t.author}
                  </p>
                  <p className="font-mono text-[11px] text-aged-gold/80 mt-0.5">
                    {t.context}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono text-bone/40 uppercase tracking-widest">
            Client Reflections · Private Celebrations
          </div>
        </div>

        {/* PANEL 3: The Continuation & Final Architectural Studio CTA */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative bg-deep-forest/60">
          <div className="flex items-center justify-between text-xs uppercase tracking-ultra text-aged-gold/80">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-aged-gold" />
              <span>Begin Your Story</span>
            </div>
            <span>Chennai · Mumbai · Bengaluru · Goa · Rajasthan</span>
          </div>

          <div className="max-w-4xl my-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-aged-gold/80 block mb-4">
              THE NEXT CHAPTER
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-warm-ivory leading-[1.05] tracking-tight mb-8">
              Your moment <br />
              <span className="italic font-normal text-gold-gradient">
                starts here.
              </span>
            </h2>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
              <button
                onClick={onOpenEnquiry}
                className="px-8 py-4 rounded-full bg-aged-gold text-obsidian font-semibold text-xs uppercase tracking-widest hover:bg-warm-ivory transition-colors shadow-2xl flex items-center gap-2.5"
              >
                <span>Begin Your Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConcierge}
                className="px-6 py-4 rounded-full bg-obsidian/80 border border-aged-gold/40 text-aged-gold hover:text-warm-ivory hover:border-aged-gold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <ChatCircleText className="w-4 h-4" />
                <span>Ask Olive Concierge</span>
              </button>

              <button
                onClick={onOpenDigital}
                className="px-6 py-4 rounded-full bg-obsidian/50 border border-subtle text-bone/80 hover:text-warm-ivory hover:border-bone/40 text-xs uppercase tracking-widest transition-all"
              >
                Olive Digital Studio
              </button>

              <button
                onClick={onOpenPortfolio}
                className="px-6 py-4 rounded-full bg-transparent border border-subtle text-bone/60 hover:text-warm-ivory text-xs uppercase tracking-widest transition-all"
              >
                Complete Archive (12)
              </button>
            </div>

            {/* Quick Direct Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-subtle text-xs text-bone/70">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-aged-gold" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-aged-gold">
                    Event Studio Direct
                  </span>
                  <a
                    href={`tel:${OLIVE_CONTACT.phone.replace(/[^\d+]/g, '')}`}
                    className="hover:text-warm-ivory transition-colors"
                  >
                    {OLIVE_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <WhatsappLogo className="w-4 h-4 text-aged-gold" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-aged-gold">
                    WhatsApp Concierge
                  </span>
                  <a
                    href={`https://wa.me/${OLIVE_CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-warm-ivory transition-colors"
                  >
                    Instant Direct Chat
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <EnvelopeSimple className="w-4 h-4 text-aged-gold" />
                <div>
                  <span className="block text-[10px] font-mono uppercase text-aged-gold">
                    Official Inquiries
                  </span>
                  <a
                    href={`mailto:${OLIVE_CONTACT.email}`}
                    className="hover:text-warm-ivory transition-colors"
                  >
                    {OLIVE_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Horizontal Footer Bar */}
          <div className="pt-6 border-t border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-bone/40 gap-4">
            <span>© {new Date().getFullYear()} {OLIVE_BRAND.name}. All rights reserved.</span>
            <span>{OLIVE_CONTACT.address}</span>
            <div className="flex items-center gap-4 text-aged-gold/80">
              <a href={OLIVE_SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramLogo className="w-4 h-4 hover:text-warm-ivory transition-colors" />
              </a>
              <a href={OLIVE_SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinLogo className="w-4 h-4 hover:text-warm-ivory transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
