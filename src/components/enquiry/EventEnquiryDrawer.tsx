import React, { useState, useEffect } from 'react';
import { OLIVE_CONTACT } from '../../data/config';
import { CheckCircle, PaperPlaneRight, X } from '@phosphor-icons/react';

interface EventEnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventType?: string;
}

export const EventEnquiryDrawer: React.FC<EventEnquiryDrawerProps> = ({
  isOpen,
  onClose,
  initialEventType = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: initialEventType,
    date: '',
    guests: '',
    location: '',
    budget: '',
    services: [] as string[],
    vision: '',
    referral: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialEventType) {
      setFormData((prev) => ({ ...prev, eventType: initialEventType }));
    }
  }, [initialEventType]);

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

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const emailSubject = `Event Enquiry: ${formData.name || 'Private Client'} - ${formData.eventType}`;
    const emailBody = `Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Preferred Date: ${formData.date}
Guest Count: ${formData.guests}
Location: ${formData.location}
Approximate Budget: ${formData.budget}
Services of Interest: ${formData.services.join(', ')}
Vision Message: ${formData.vision}
Referral: ${formData.referral}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Open user's email client as direct fallthrough
      window.location.href = `mailto:${OLIVE_CONTACT.email}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
    }, 600);
  };

  const servicesList = [
    'Full Planning & Coordination',
    'Design & Floral Décor',
    'Venue Sourcing',
    'Curated Catering & Mixology',
    'Custom Entertainment',
    'Staging, AV & LED',
    'Photo & Film Direction',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-obsidian/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl h-full bg-obsidian border-l border-subtle shadow-2xl flex flex-col overflow-y-auto select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Event Enquiry Form"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-subtle flex items-center justify-between sticky top-0 bg-obsidian/90 backdrop-blur-md z-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-ultra text-aged-gold block mb-1">
              Private Consultation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-warm-ivory font-light">
              Plan Your Celebration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-bone/60 hover:text-warm-ivory hover:bg-deep-forest rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 flex-1">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-aged-gold mx-auto" />
              <h4 className="font-serif text-3xl text-warm-ivory font-light">
                Thank You, {formData.name}
              </h4>
              <p className="font-sans text-sm text-bone/70 max-w-md mx-auto leading-relaxed">
                Your enquiry has been dispatched to our senior design studio. A
                creative director will review your brief and be in touch within
                24 hours to schedule your discovery consultation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-8 py-3 rounded-full bg-aged-gold text-obsidian text-xs font-semibold tracking-widest uppercase hover:bg-warm-ivory"
              >
                Return to Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-bone/60 font-light">
                Share a date, an approximate guest count and your vision. Fields
                marked * are required.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Work or Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@email.com"
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 ... / Contact Number"
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                  >
                    <option value="">Select discipline...</option>
                    <option value="Luxury Wedding">Luxury Wedding</option>
                    <option value="Corporate Summit">Corporate Summit / Gala</option>
                    <option value="Private Celebration">Private Celebration</option>
                    <option value="Galas & Launches">Galas & Brand Launch</option>
                    <option value="Destination Event">Destination Event</option>
                    <option value="Décor & Hospitality">Décor & Hospitality</option>
                    <option value="Other">Other Bespoke Event</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Guest Count
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                  >
                    <option value="">Estimate...</option>
                    <option value="Under 50">Under 50 guests</option>
                    <option value="50 - 150">50 - 150 guests</option>
                    <option value="150 - 400">150 - 400 guests</option>
                    <option value="400 - 1,000">400 - 1,000 guests</option>
                    <option value="1,000+">1,000+ guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                    Approximate Budget (INR)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                  >
                    <option value="">Range...</option>
                    <option value="Under 25 Lakhs">Under ₹25 Lakhs</option>
                    <option value="25L - 50 Lakhs">₹25L - ₹50 Lakhs</option>
                    <option value="50L - 1 Crore">₹50L - ₹1 Crore</option>
                    <option value="1 Cr - 3 Crores">₹1 Cr - ₹3 Crores</option>
                    <option value="3 Crores+">₹3 Crores+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                  Location or Venue (if known)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Chennai, Mumbai, Udaipur, Jaipur, Goa, Bengaluru..."
                  className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2.5">
                  Disciplines of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((srv) => {
                    const active = formData.services.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors border ${
                          active
                            ? 'bg-aged-gold text-obsidian border-aged-gold font-medium'
                            : 'bg-deep-forest/60 text-bone/70 border-subtle hover:border-aged-gold/40'
                        }`}
                      >
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                  Your Vision & Details
                </label>
                <textarea
                  rows={4}
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  placeholder="Tell us about the mood, the people, the rituals, and the feeling you want to leave behind..."
                  className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                  How Did You Find Us?
                </label>
                <input
                  type="text"
                  value={formData.referral}
                  onChange={(e) =>
                    setFormData({ ...formData, referral: e.target.value })
                  }
                  placeholder="Word of mouth, Instagram, venue recommendation..."
                  className="w-full bg-deep-forest/50 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory placeholder-bone/40 focus:outline-none focus:border-aged-gold"
                />
              </div>

              <div className="pt-4 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-sans text-bone/50">
                  Strictly confidential. Studio response within 24 hours.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-aged-gold text-obsidian font-semibold text-xs uppercase tracking-widest hover:bg-warm-ivory transition-colors flex items-center justify-center gap-2"
                >
                  <span>{submitting ? 'Transmitting...' : 'Send Enquiry'}</span>
                  <PaperPlaneRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
