import React from 'react';
import { OLIVE_CONTACT } from '../../data/config';
import {
  ChatCircleText,
  EnvelopeSimple,
  Phone,
  WhatsappLogo,
} from '@phosphor-icons/react';

interface FloatingActionsProps {
  onOpenConcierge: () => void;
  onOpenEnquiry: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenConcierge,
  onOpenEnquiry,
}) => {
  const telHref = `tel:${OLIVE_CONTACT.phone.replace(/[^\d+]/g, '')}`;
  const waHref = `https://wa.me/${OLIVE_CONTACT.whatsapp}?text=${encodeURIComponent(
    'Hello Olive Events, I would like to plan a celebration.'
  )}`;

  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) */}
      <div className="hidden sm:flex fixed bottom-8 right-8 z-40 flex-col gap-3 items-end select-none">
        <a
          href={telHref}
          className="group relative p-3.5 rounded-full bg-obsidian/90 border border-subtle hover:border-aged-gold/60 text-bone hover:text-aged-gold shadow-2xl backdrop-blur-md transition-all duration-300"
          aria-label={`Call ${OLIVE_CONTACT.phone}`}
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-obsidian/90 border border-subtle text-[11px] font-mono whitespace-nowrap text-bone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call {OLIVE_CONTACT.phone}
          </span>
        </a>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3.5 rounded-full bg-obsidian/90 border border-subtle hover:border-emerald-500/60 text-bone hover:text-emerald-400 shadow-2xl backdrop-blur-md transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <WhatsappLogo className="w-5 h-5" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-obsidian/90 border border-subtle text-[11px] font-mono whitespace-nowrap text-bone opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp Studio
          </span>
        </a>

        <button
          onClick={onOpenConcierge}
          className="group relative p-4 rounded-full bg-olive text-warm-ivory border border-aged-gold/50 hover:border-aged-gold shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
          aria-label="Open Olive Concierge"
        >
          <ChatCircleText className="w-5 h-5 text-aged-gold" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-aged-gold animate-ping" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-aged-gold" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-obsidian/90 border border-aged-gold/30 text-[11px] font-mono whitespace-nowrap text-aged-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask Olive Concierge
          </span>
        </button>
      </div>

      {/* Mobile Bottom Fixed Bar (<= 640px) */}
      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-obsidian/95 backdrop-blur-xl border-t border-subtle px-4 py-2.5 flex items-center justify-around select-none text-[10px] font-mono tracking-widest uppercase"
        aria-label="Quick Mobile Actions"
      >
        <a
          href={telHref}
          className="flex flex-col items-center gap-1 text-bone/70 hover:text-aged-gold"
        >
          <Phone className="w-4 h-4 text-aged-gold" />
          <span>Call</span>
        </a>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-bone/70 hover:text-aged-gold"
        >
          <WhatsappLogo className="w-4 h-4 text-aged-gold" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenConcierge}
          className="flex flex-col items-center gap-1 text-bone/70 hover:text-aged-gold relative"
        >
          <ChatCircleText className="w-4 h-4 text-aged-gold" />
          <span className="absolute top-0 right-2 w-1.5 h-1.5 rounded-full bg-aged-gold" />
          <span>Concierge</span>
        </button>

        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center gap-1 text-aged-gold hover:text-warm-ivory font-semibold"
        >
          <EnvelopeSimple className="w-4 h-4" />
          <span>Enquire</span>
        </button>
      </nav>
    </>
  );
};
