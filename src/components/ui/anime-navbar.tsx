import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { scrollToTarget } from '../../animations/scroll';

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  action?: () => void;
  badge?: string;
}

export interface AnimeNavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export const AnimeNavBar: React.FC<AnimeNavBarProps> = ({
  items,
  className = '',
  defaultActive = 'Arrival',
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultActive);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Active state sync with window scroll and hash
    const handleScrollAndHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const matchingItem = items.find((item) => item.url === hash);
        if (matchingItem) {
          setActiveTab(matchingItem.name);
          return;
        }
      }

      // Scroll spy for narrative chapters
      const scrollPos = window.scrollY + 220;
      for (const item of items) {
        if (item.url.startsWith('#')) {
          const sectionId = item.url.slice(1);
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveTab(item.name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollAndHash, { passive: true });
    window.addEventListener('hashchange', handleScrollAndHash);
    handleScrollAndHash();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollAndHash);
      window.removeEventListener('hashchange', handleScrollAndHash);
    };
  }, [items]);

  if (!mounted) return null;

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    setActiveTab(item.name);

    if (item.action) {
      e.preventDefault();
      item.action();
      return;
    }

    if (item.url.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(item.url);
      window.history.pushState(null, '', item.url);
    }
  };

  return (
    <nav
      onMouseLeave={() => setHoveredTab(null)}
      className={`relative flex items-center gap-1 p-1 bg-obsidian/40 border border-aged-gold/15 rounded-lg md:rounded-xl ${className}`}
      role="navigation"
      aria-label="Olive Events Navigation Links"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;
        const isHovered = hoveredTab === item.name;

        return (
          <a
            key={item.name}
            href={item.url}
            onClick={(e) => handleNavClick(e, item)}
            onMouseEnter={() => setHoveredTab(item.name)}
            className={`relative px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-colors duration-200 flex items-center gap-1.5 select-none ${
              isActive
                ? 'text-warm-ivory font-medium'
                : 'text-bone/65 hover:text-warm-ivory'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Animated Hover Background */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="anime-nav-hover"
                className="absolute inset-0 bg-white/[0.05] rounded-md -z-10"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
              />
            )}

            {/* Animated Active Indicator: Subtle restrained gold illumination (no bright neon) */}
            {isActive && (
              <motion.div
                layoutId="anime-nav-active"
                className="absolute inset-0 bg-aged-gold/10 border border-aged-gold/30 rounded-md -z-10 shadow-[0_0_8px_rgba(223,192,123,0.12)]"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}

            {/* Olive Active Indicator: Refined gold orbital pip */}
            {isActive && (
              <motion.div
                layoutId="anime-nav-pip"
                className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <div className="w-1 h-1 rotate-45 bg-aged-gold shadow-[0_0_4px_rgba(223,192,123,0.8)]" />
              </motion.div>
            )}

            {/* Lucide Icon */}
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-aged-gold' : 'text-bone/55'}`} />

            {/* Desktop Label (Hidden on smaller screens for compact icon dock) */}
            {!isMobile && (
              <span className="text-[11px] tracking-widest uppercase">
                {item.name}
              </span>
            )}

            {/* Optional Badge */}
            {item.badge && !isMobile && (
              <span className="text-[8px] px-1 py-0.2 rounded bg-aged-gold/25 text-aged-gold font-mono leading-none">
                {item.badge}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
};
