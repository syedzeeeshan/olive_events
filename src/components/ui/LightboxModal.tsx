import React, { useEffect } from 'react';
import { OLIVE_MEDIA } from '../../data/config';
import { Sparkle, X } from '@phosphor-icons/react';

interface LightboxProps {
  project: (typeof OLIVE_MEDIA.gallery)[0] | null;
  onClose: () => void;
  onPlanSimilar: (category: string) => void;
}

export const LightboxModal: React.FC<LightboxProps> = ({
  project,
  onClose,
  onPlanSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-obsidian/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[92vh] w-full rounded-3xl overflow-hidden bg-deep-forest border border-subtle shadow-2xl flex flex-col md:flex-row select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-obsidian/80 text-bone hover:text-warm-ivory transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* High Resolution Image View */}
        <div className="md:w-2/3 h-72 sm:h-96 md:h-auto relative bg-obsidian">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative Metadata Sidebar */}
        <div className="md:w-1/3 p-8 sm:p-10 flex flex-col justify-between bg-deep-forest border-t md:border-t-0 md:border-l border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-aged-gold mb-3">
              <Sparkle className="w-3.5 h-3.5" />
              <span>{project.category} Milestone</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-warm-ivory font-light mb-2">
              {project.title}
            </h3>

            <p className="font-sans text-xs uppercase tracking-widest text-bone/60 mb-6">
              {project.venue}
            </p>

            <div className="space-y-4 text-xs font-sans text-bone/70 leading-relaxed font-light border-t border-subtle/80 pt-6">
              <p>
                A bespoke curation produced under the creative direction of
                Olive Events. Built with architectural staging, custom floral
                canopies, and clockwork guest coordination.
              </p>
              <div className="pt-2 text-[10px] font-mono text-aged-gold/80 uppercase tracking-widest">
                Full Run-Sheet & Hospitality Orchestrated
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-subtle">
            <button
              onClick={() => {
                onClose();
                onPlanSimilar(project.category);
              }}
              className="w-full py-3.5 rounded-full bg-aged-gold text-obsidian text-xs font-semibold tracking-widest uppercase hover:bg-warm-ivory transition-colors"
            >
              Plan A Similar Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
