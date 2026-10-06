import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimeNavBar, NavItem } from '../ui/anime-navbar';
import {
  Compass,
  Eye,
  Sparkles,
  Palette,
  Globe,
  Briefcase,
  Layers,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  onOpenEnquiry: () => void;
  onOpenConcierge: () => void;
  onOpenDigital: () => void;
  onOpenPortfolio: () => void;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnquiry,
  onOpenConcierge,
  onOpenDigital,
  onOpenPortfolio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Arrival', url: '#arrival', icon: Compass },
    { name: 'Vision', url: '#vision', icon: Eye },
    { name: 'Experience', url: '#gallery', icon: Sparkles },
    { name: 'Craft', url: '#craft', icon: Palette },
    { name: 'Worlds', url: '#worlds', icon: Globe },
    { name: 'Portfolio', url: '#portfolio', icon: Briefcase, action: onOpenPortfolio },
    { name: 'Digital', url: '#digital', icon: Layers, action: onOpenDigital, badge: 'NEW' },
    { name: 'Concierge', url: '#concierge', icon: MessageSquare, action: onOpenConcierge },
  ];

  return (
    <>
      <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 md:px-8 pointer-events-none select-none">
        {/* SIBLING 1: MAIN NAVIGATION CONTAINER (ENDS IMMEDIATELY AFTER CONCIERGE) */}
        <div className="w-fit bg-obsidian/85 backdrop-blur-xl border border-aged-gold/20 rounded-xl md:rounded-2xl px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex items-center gap-3 sm:gap-5 lg:gap-6 pointer-events-auto">
          
          {/* =========================================================================
              OLIVE EVENTS BRAND (LEFT ANCHOR)
              ========================================================================= */}
          <a
            href="#arrival"
            className="flex items-center gap-3.5 group text-left flex-shrink-0"
            aria-label="Olive Events Home"
          >
            <svg
              className="w-6 h-8 text-aged-gold group-hover:scale-105 transition-transform"
              viewBox="0 0 60 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M5 77V31a25 25 0 0 1 50 0v46z" />
              <path d="M22 70c4-14 9-28 19-50" strokeLinecap="round" />
              <g fill="currentColor" stroke="none">
                <ellipse cx="37" cy="24" rx="3" ry="8" transform="rotate(32 37 24)" />
                <ellipse cx="30" cy="31" rx="2.8" ry="7.5" transform="rotate(-48 30 31)" />
                <ellipse cx="37" cy="38" rx="2.8" ry="7.5" transform="rotate(58 37 38)" />
                <ellipse cx="26" cy="44" rx="2.7" ry="7" transform="rotate(-52 26 44)" />
                <ellipse cx="32" cy="51" rx="2.7" ry="7" transform="rotate(62 32 51)" />
                <ellipse cx="22" cy="57" rx="2.5" ry="6.5" transform="rotate(-55 22 57)" />
                <ellipse cx="29" cy="62" rx="2.3" ry="3" transform="rotate(-20 29 62)" />
              </g>
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-[0.22em] font-light text-warm-ivory leading-tight group-hover:text-aged-gold transition-colors">
                OLIVE
              </span>
              <span className="text-[8px] font-mono tracking-widest text-aged-gold/80 leading-none">
                EVENTS · INDIA
              </span>
            </div>
          </a>

          {/* =========================================================================
              NAVIGATION LINKS (ARRIVAL -> VISION -> EXPERIENCE -> CRAFT -> WORLDS -> PORTFOLIO -> DIGITAL -> CONCIERGE)
              ========================================================================= */}
          <div className="hidden lg:flex items-center">
            <AnimeNavBar items={navItems} defaultActive="Arrival" />
          </div>

          {/* Mobile Drawer Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-bone hover:text-aged-gold transition-colors ml-1"
            aria-label="Toggle navigation chapters"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-aged-gold" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* =========================================================================
            SIBLING 2: ENQUIRE BUTTON (COMPLETELY SEPARATE OUTSIDE THE MAIN NAVIGATION BORDER)
            ========================================================================= */}
        <button
          onClick={onOpenEnquiry}
          className="pointer-events-auto px-5 py-2 rounded-lg bg-olive hover:bg-olive-light border border-aged-gold/40 hover:border-aged-gold/60 text-warm-ivory text-xs font-medium tracking-widest uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_16px_rgba(223,192,123,0.15)] flex-shrink-0"
        >
          Enquire
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 lg:hidden"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-ultra text-aged-gold">
                Narrative Chapters
              </span>
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (item.action) {
                        e.preventDefault();
                        item.action();
                      }
                    }}
                    className="text-left font-serif text-xl text-warm-ivory hover:text-aged-gold transition-colors p-2.5 rounded-lg border border-subtle/40 bg-obsidian/40 flex items-center gap-2"
                  >
                    <span className="text-xs font-mono text-aged-gold">0{idx + 1}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-subtle flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConcierge();
                  }}
                  className="text-left font-serif text-lg text-aged-gold hover:text-warm-ivory flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Olive Concierge Assistant</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-2.5 rounded-lg bg-olive hover:bg-olive-light border border-aged-gold/40 text-warm-ivory text-xs font-medium tracking-widest uppercase transition-all shadow-lg text-center"
                >
                  Enquire · Reserve Date
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-subtle flex items-center justify-between text-xs text-bone/60">
              <span>Pan-India & Global Destinations</span>
              <span className="text-aged-gold font-mono">Olive Events Atelier</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
