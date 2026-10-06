import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';

interface VideoModalProps {
  url: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ url, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && url) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [url, onClose]);

  if (!url) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-obsidian/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black border border-subtle shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-obsidian/80 text-bone hover:text-warm-ivory hover:bg-obsidian transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>

        <video
          src={url}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
