import React, { useState, useRef, useEffect } from 'react';
import { OLIVE_CONTACT, OLIVE_DIGITAL_CONTACT } from '../../data/config';
import {
  ChatCircleText,
  PaperPlaneRight,
  Phone,
  Sparkle,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';

interface ConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
  chips?: string[];
  actionLink?: string;
  actionText?: string;
}

export const OliveConciergeModal: React.FC<ConciergeProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Welcome to Olive Events Concierge. How may I assist your celebration planning today?',
      chips: [
        'Luxury Weddings',
        'Corporate Summits',
        'Pricing & Investment',
        'Permits & Timelines',
        'Olive Digital Studio',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

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

  // Built-in Knowledge Base matching the audited assistant.js rules
  const evaluateAnswer = (query: string): Message => {
    const q = query.toLowerCase();

    if (/wedding|bride|groom|nikah|henna|mehendi|sangeet|marriage/i.test(q)) {
      return {
        role: 'assistant',
        text: 'We design and produce comprehensive luxury weddings: mandap and ceremony architecture, sangeet and mehendi production, bridal hospitality, curated entertainment, and cinematic photo/film direction. Most families reserve 6 to 12 months in advance.',
        chips: ['Wedding Pricing', 'Book a Consultation', 'WhatsApp Events Team'],
      };
    }

    if (/corporate|conference|summit|award|offsite|delegate/i.test(q)) {
      return {
        role: 'assistant',
        text: 'For corporate organizations, we deliver broadcast-grade summits, leadership conferences, and annual award galas with precision run-sheets, staging, LED systems, and VIP diplomatic protocol.',
        chips: ['Corporate Timelines', 'Book a Consultation'],
      };
    }

    if (/price|pricing|cost|budget|how much|rate|fee|inr|lakh/i.test(q)) {
      return {
        role: 'assistant',
        text: 'Every celebration is bespoke. As an indicative guide, private celebrations generally start around ₹15 Lakhs, luxury weddings from ₹50 Lakhs, and corporate summits scale with staging specifications. We provide an itemised proposal following an initial consultation.',
        chips: ['Book a Consultation', 'Speak with a Director'],
      };
    }

    if (/digital|marketing|website|web|app|mobile/i.test(q)) {
      return {
        role: 'assistant',
        text: 'Olive Digital is our dedicated digital craft studio. We build bespoke web platforms (from ₹1.5 Lakhs), mobile applications in Flutter (from ₹4.5 Lakhs), and manage brand identity & digital production retainers.',
        chips: ['Explore Digital Studio', 'Contact Digital Desk'],
      };
    }

    if (/permit|licen|approval|municipality|civil defen/i.test(q)) {
      return {
        role: 'assistant',
        text: 'Yes, our production department coordinates all required municipal permissions, fire & safety clearances, sound licensing, and heritage venue clearances across all Indian states and overseas destinations.',
        chips: ['Book a Consultation'],
      };
    }

    if (/where|location|address|office|studio|visit/i.test(q)) {
      return {
        role: 'assistant',
        text: `Our creative atelier is based in Chennai, India (${OLIVE_CONTACT.address}). Consultations and design previews are scheduled by private appointment. We produce events across Chennai, Mumbai, Bengaluru, Goa, Rajasthan, and distinctive destinations across India.`,
        chips: ['WhatsApp Events Team', 'Make an Enquiry'],
      };
    }

    if (/timeline|advance|how soon|lead time/i.test(q)) {
      return {
        role: 'assistant',
        text: 'For weddings and major galas, 6 to 12 months is ideal. Corporate and private celebrations can often be executed in 6 to 10 weeks, and we accommodate shorter windows when the atelier schedule permits.',
        chips: ['Make an Enquiry'],
      };
    }

    return {
      role: 'assistant',
      text: 'Thank you for reaching out. Would you like to schedule a private consultation with our creative leads, or speak directly via WhatsApp?',
      chips: ['Book a Consultation', 'WhatsApp Events Team', 'View Archive'],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const reply = evaluateAnswer(text);
      setMessages((prev) => [...prev, reply]);
    }, 400);
  };

  const handleChipClick = (chip: string) => {
    if (chip === 'Book a Consultation' || chip === 'Make an Enquiry') {
      onClose();
      onOpenEnquiry();
      return;
    }
    if (chip === 'WhatsApp Events Team') {
      window.open(
        `https://wa.me/${OLIVE_CONTACT.whatsapp}?text=${encodeURIComponent(
          'Hello Olive Events, I would like to arrange a consultation.'
        )}`,
        '_blank'
      );
      return;
    }
    if (chip === 'Contact Digital Desk') {
      window.open(
        `https://wa.me/${OLIVE_DIGITAL_CONTACT.whatsapp}?text=${encodeURIComponent(
          'Hello Olive Digital, I would like to discuss a project.'
        )}`,
        '_blank'
      );
      return;
    }
    handleSend(chip);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg h-[640px] max-h-[90vh] rounded-3xl bg-deep-forest border border-aged-gold/30 shadow-2xl flex flex-col overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Olive Concierge Chat"
      >
        {/* Header */}
        <div className="p-5 border-b border-subtle bg-obsidian/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-olive border border-aged-gold/40 flex items-center justify-center text-aged-gold">
              <Sparkle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-warm-ivory font-light leading-tight">
                Olive Concierge
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-aged-gold uppercase flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Atelier Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-bone/60 hover:text-warm-ivory hover:bg-obsidian/50 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div
          ref={chatBodyRef}
          className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-sans font-light leading-relaxed"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-olive text-warm-ivory rounded-br-none border border-aged-gold/30'
                    : 'bg-obsidian/90 text-bone/90 rounded-bl-none border border-subtle'
                }`}
              >
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>

              {m.chips && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                  {m.chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChipClick(chip)}
                      className="px-3 py-1 rounded-full bg-deep-forest/80 border border-aged-gold/25 hover:border-aged-gold text-[10px] font-mono tracking-wider text-aged-gold transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Contact Bridges */}
        <div className="px-5 py-2.5 bg-obsidian/50 border-t border-subtle flex items-center justify-between text-[11px] font-mono text-bone/60">
          <a
            href={`tel:${OLIVE_CONTACT.phone.replace(/[^\d+]/g, '')}`}
            className="hover:text-aged-gold flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-aged-gold" />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${OLIVE_CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-aged-gold flex items-center gap-1.5"
          >
            <WhatsappLogo className="w-3.5 h-3.5 text-aged-gold" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onOpenEnquiry();
            }}
            className="hover:text-aged-gold flex items-center gap-1.5"
          >
            <ChatCircleText className="w-3.5 h-3.5 text-aged-gold" />
            <span>Enquiry Form</span>
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-obsidian border-t border-subtle flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about weddings, pricing, permits, dates..."
            className="flex-1 bg-deep-forest/60 border border-subtle rounded-xl px-4 py-3 text-xs text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-aged-gold text-obsidian hover:bg-warm-ivory transition-colors"
            aria-label="Send message"
          >
            <PaperPlaneRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
