import React, { useState, useEffect } from 'react';
import { OLIVE_MEDIA } from '../../data/config';
import { Eye, Funnel, X } from '@phosphor-icons/react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (item: (typeof OLIVE_MEDIA.gallery)[0]) => void;
}

export const FullPortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'wedding' | 'corporate' | 'private' | 'gala'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = OLIVE_MEDIA.gallery.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All Celebrations' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'private', label: 'Private' },
    { key: 'gala', label: 'Galas & Launches' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-xl">
      <div
        className="relative w-full max-w-6xl max-h-[92vh] rounded-3xl bg-deep-forest border border-subtle shadow-2xl flex flex-col overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Olive Events Portfolio Archive"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-subtle bg-obsidian/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-aged-gold block mb-1">
              Curated Photographic Record
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-warm-ivory font-light">
              The Complete Archive
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-bone/60 hover:text-warm-ivory rounded-full hover:bg-deep-forest transition-colors"
            aria-label="Close archive"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 p-6 border-b border-subtle bg-obsidian/40 overflow-x-auto">
          <Funnel className="w-4 h-4 text-aged-gold mr-2 flex-shrink-0" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-colors whitespace-nowrap ${
                filter === f.key
                  ? 'bg-aged-gold text-obsidian font-semibold'
                  : 'bg-deep-forest/80 border border-subtle text-bone/70 hover:border-aged-gold/40 hover:text-warm-ivory'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelectProject(item);
                }}
                className="group relative h-80 rounded-2xl overflow-hidden border border-subtle cursor-pointer shadow-xl bg-obsidian"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/30 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-aged-gold mb-1">
                    <span>{item.category}</span>
                    <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-serif text-2xl text-warm-ivory font-light">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-bone/60 mt-1">
                    {item.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-subtle bg-obsidian/60 text-center text-xs text-bone/40 font-mono uppercase tracking-widest">
          Displaying {filteredItems.length} Milestones · Click any project to open full resolution
        </div>
      </div>
    </div>
  );
};
