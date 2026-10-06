import React, { useState, useEffect } from 'react';
import { OLIVE_DIGITAL_CONTACT } from '../../data/config';
import {
  AppStoreLogo,
  Browsers,
  ChartLineUp,
  CheckCircle,
  Megaphone,
  PaintBrush,
  PaperPlaneRight,
  Ticket,
  X,
} from '@phosphor-icons/react';

interface DigitalStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalStudioModal: React.FC<DigitalStudioProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'brief'>(
    'overview'
  );
  const [briefForm, setBriefForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    services: [] as string[],
    budget: '',
    timeline: '',
    url: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const disciplines = [
    {
      icon: ChartLineUp,
      title: 'Marketing Solutions',
      desc: 'Performance campaigns, Meta and Google ads, SEO content strategy and CRM automation.',
    },
    {
      icon: Browsers,
      title: 'Website Development',
      desc: 'Editorial digital guest platforms and web experiences engineered for modern Indian celebrations.',
    },
    {
      icon: AppStoreLogo,
      title: 'Mobile App Development',
      desc: 'Flutter cross-platform iOS and Android apps for events, luxury retail, and member communities.',
    },
    {
      icon: PaintBrush,
      title: 'Branding & Identity',
      desc: 'Logos, luxury typography systems, packaging, and tactile presentation decks.',
    },
    {
      icon: Megaphone,
      title: 'Social Media & Content',
      desc: 'Always-on editorial film, photography, reel direction, and high-impact influencer partnerships.',
    },
    {
      icon: Ticket,
      title: 'Event Technology',
      desc: 'RSVP systems, QR credential check-in, live stream broadcasting, and interactive display polling.',
    },
  ];

  const packages = [
    {
      name: 'Launch',
      price: '₹1.5 Lakhs',
      period: 'starting point',
      for: 'New brands and single milestone events',
      items: [
        'Bespoke celebratory event website',
        'Brand starter identity kit',
        'Social profile kit & launch reels',
        'Bespoke Event RSVP page',
        '30 days post-launch support',
      ],
    },
    {
      name: 'Grow',
      price: '₹75,000',
      period: '/ month',
      featured: true,
      for: 'Established businesses ready to scale',
      items: [
        'Performance ads management',
        'SEO & editorial content strategy',
        'Social media: 12 posts + 4 reels monthly',
        'Email & CRM lead automation',
        'Monthly ROI and revenue reporting',
      ],
    },
    {
      name: 'Build',
      price: '₹6.5 Lakhs',
      period: 'from',
      for: 'Custom applications and complex platforms',
      items: [
        'Custom iOS & Android mobile application',
        'UX research and clickable prototypes',
        'Admin dashboard and secure cloud API',
        'Payment gateways and ticketing',
        '12-month technical care plan',
      ],
    },
  ];

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = `Olive Digital Project Brief: ${briefForm.company || briefForm.name}`;
    const body = `Name: ${briefForm.name}
Company: ${briefForm.company}
Email: ${briefForm.email}
Phone: ${briefForm.phone}
Disciplines: ${briefForm.services.join(', ')}
Budget: ${briefForm.budget}
Timeline: ${briefForm.timeline}
Current URL: ${briefForm.url}
Details: ${briefForm.details}`;

    setTimeout(() => {
      window.location.href = `mailto:${OLIVE_DIGITAL_CONTACT.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-deep-forest border border-subtle shadow-2xl flex flex-col overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Olive Digital Solutions"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-subtle bg-obsidian/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-aged-gold/20 text-aged-gold">
              Specialized Studio Desk
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-warm-ivory font-light">
              Olive Digital Solutions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-bone/60 hover:text-warm-ivory rounded-full hover:bg-deep-forest"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-subtle bg-obsidian/40 px-6 sm:px-8 text-xs font-mono uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-aged-gold text-aged-gold font-medium'
                : 'border-transparent text-bone/60 hover:text-warm-ivory'
            }`}
          >
            Disciplines
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-4 px-4 border-b-2 transition-colors ${
              activeTab === 'packages'
                ? 'border-aged-gold text-aged-gold font-medium'
                : 'border-transparent text-bone/60 hover:text-warm-ivory'
            }`}
          >
            Engagement Packages
          </button>
          <button
            onClick={() => setActiveTab('brief')}
            className={`py-4 px-4 border-b-2 transition-colors ${
              activeTab === 'brief'
                ? 'border-aged-gold text-aged-gold font-medium'
                : 'border-transparent text-bone/60 hover:text-warm-ivory'
            }`}
          >
            Submit Project Brief
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="max-w-2xl">
                <p className="font-serif text-2xl sm:text-3xl text-warm-ivory font-light leading-snug">
                  Beyond the physical event: digital systems that convert and
                  endure.
                </p>
                <p className="font-sans text-sm text-bone/70 leading-relaxed font-light mt-3">
                  Our digital desk brings Olive's luxury aesthetic and meticulous
                  care to modern web, app, and marketing ecosystems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {disciplines.map((d) => (
                  <div
                    key={d.title}
                    className="p-6 rounded-2xl bg-obsidian/60 border border-subtle hover:border-aged-gold/40 transition-colors"
                  >
                    <d.icon className="w-6 h-6 text-aged-gold mb-4" />
                    <h4 className="font-serif text-xl text-warm-ivory font-light mb-2">
                      {d.title}
                    </h4>
                    <p className="font-sans text-xs text-bone/70 leading-relaxed font-light">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-bone/60">
                  Direct Line: {OLIVE_DIGITAL_CONTACT.phone} · {OLIVE_DIGITAL_CONTACT.email}
                </div>
                <button
                  onClick={() => setActiveTab('brief')}
                  className="px-6 py-3 rounded-full bg-aged-gold text-obsidian text-xs font-semibold tracking-widest uppercase hover:bg-warm-ivory transition-colors"
                >
                  Start a Project Brief
                </button>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`p-8 rounded-2xl flex flex-col justify-between border ${
                      pkg.featured
                        ? 'bg-olive/40 border-aged-gold/60 shadow-2xl relative'
                        : 'bg-obsidian/60 border-subtle'
                    }`}
                  >
                    {pkg.featured && (
                      <span className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-aged-gold text-obsidian font-semibold">
                        Most Requested
                      </span>
                    )}

                    <div>
                      <h4 className="font-serif text-2xl text-warm-ivory font-light">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-bone/60 mb-6">{pkg.for}</p>

                      <div className="mb-6">
                        <span className="font-mono text-3xl font-light text-aged-gold">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-bone/50 ml-1">
                          {pkg.period}
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-xs text-bone/80 font-light border-t border-subtle/80 pt-6">
                        {pkg.items.map((it) => (
                          <li key={it} className="flex items-start gap-2">
                            <span className="text-aged-gold">•</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setActiveTab('brief')}
                      className={`mt-8 w-full py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${
                        pkg.featured
                          ? 'bg-aged-gold text-obsidian font-semibold hover:bg-warm-ivory'
                          : 'border border-subtle hover:border-aged-gold/40 text-bone/80 hover:text-warm-ivory'
                      }`}
                    >
                      Enquire For {pkg.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'brief' && (
            <div>
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-aged-gold mx-auto" />
                  <h4 className="font-serif text-3xl text-warm-ivory font-light">
                    Project Brief Transmitted
                  </h4>
                  <p className="font-sans text-sm text-bone/70 max-w-md mx-auto leading-relaxed">
                    Thank you. The Olive Digital strategist will review your
                    deliverables and schedule a 30-minute discovery call within
                    one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-8 py-3 rounded-full bg-aged-gold text-obsidian text-xs font-semibold tracking-widest uppercase hover:bg-warm-ivory"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBriefSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={briefForm.name}
                        onChange={(e) =>
                          setBriefForm({ ...briefForm, name: e.target.value })
                        }
                        className="w-full bg-obsidian/70 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={briefForm.company}
                        onChange={(e) =>
                          setBriefForm({
                            ...briefForm,
                            company: e.target.value,
                          })
                        }
                        className="w-full bg-obsidian/70 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={briefForm.email}
                        onChange={(e) =>
                          setBriefForm({ ...briefForm, email: e.target.value })
                        }
                        className="w-full bg-obsidian/70 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={briefForm.phone}
                        onChange={(e) =>
                          setBriefForm({ ...briefForm, phone: e.target.value })
                        }
                        className="w-full bg-obsidian/70 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-aged-gold mb-2">
                      Project Goals & Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={briefForm.details}
                      onChange={(e) =>
                        setBriefForm({ ...briefForm, details: e.target.value })
                      }
                      placeholder="Describe target audience, features, timeline requirements, and reference products you admire..."
                      className="w-full bg-obsidian/70 border border-subtle rounded-xl px-4 py-3 text-sm text-warm-ivory focus:outline-none focus:border-aged-gold"
                    />
                  </div>

                  <div className="pt-4 border-t border-subtle flex items-center justify-between">
                    <span className="text-[11px] text-bone/50">
                      Dispatched directly to the Olive Digital lead.
                    </span>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-aged-gold text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-warm-ivory transition-colors flex items-center gap-2"
                    >
                      <span>Submit Brief</span>
                      <PaperPlaneRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
