import React, { useEffect, useState, useRef } from 'react';
import { initGlobalScroll } from './animations/scroll';
import { Header } from './components/navigation/Header';
import { FloatingActions } from './components/navigation/FloatingActions';
import { Chapter01Arrival } from './components/hero/Chapter01Arrival';
import { Chapter02Vision } from './components/story/Chapter02Vision';
import { Chapter03ExperienceGallery } from './components/gallery/Chapter03ExperienceGallery';
import { Chapter04Craft } from './components/craft/Chapter04Craft';
import { Chapter05Philosophy } from './components/story/Chapter05Philosophy';
import { Chapter06Scale } from './components/scale/Chapter06Scale';
import { Chapter07Worlds } from './components/worlds/Chapter07Worlds';
import { Chapter08Transformation } from './components/transformation/Chapter08Transformation';
import { Chapter09Details } from './components/details/Chapter09Details';
import { Chapter10Memory } from './components/memory/Chapter10Memory';
import { EventEnquiryDrawer } from './components/enquiry/EventEnquiryDrawer';
import { OliveConciergeModal } from './components/concierge/OliveConciergeModal';
import { DigitalStudioModal } from './components/digital/DigitalStudioModal';
import { FullPortfolioModal } from './components/portfolio/FullPortfolioModal';
import { LightboxModal } from './components/ui/LightboxModal';
import { VideoModal } from './components/ui/VideoModal';
import { OLIVE_MEDIA } from './data/config';

export const App: React.FC = () => {
  // Modal states
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryEventType, setEnquiryEventType] = useState('');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [digitalOpen, setDigitalOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<(typeof OLIVE_MEDIA.gallery)[0] | null>(null);

  // Audio ambient soundscape (Web Audio API synthesis for 100% reliability)
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Lenis + GSAP ScrollTrigger global scroll engine
    const lenis = initGlobalScroll();

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleSound = () => {
    if (isMuted) {
      // Start or resume Web Audio harmonic ambient pad
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
          masterGain.connect(ctx.destination);
          gainNodeRef.current = masterGain;

          // Warm harmonic drones (D major chords: D2, A2, F#3)
          const freqs = [73.42, 110.0, 185.0];
          freqs.forEach((freq) => {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, ctx.currentTime);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.connect(filter);
            filter.connect(masterGain);
            osc.start();
          });
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setIsMuted(false);
      } catch (e) {
        console.warn('Audio synthesis not permitted or unsupported:', e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsMuted(true);
    }
  };

  const handleOpenEnquiryForCategory = (category: string) => {
    setEnquiryEventType(category);
    setEnquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-warm-ivory selection:bg-aged-gold selection:text-obsidian">
      {/* Global Minimalist Header */}
      <Header
        onOpenEnquiry={() => {
          setEnquiryEventType('');
          setEnquiryOpen(true);
        }}
        onOpenConcierge={() => setConciergeOpen(true)}
        onOpenDigital={() => setDigitalOpen(true)}
        onOpenPortfolio={() => setPortfolioOpen(true)}
        isMuted={isMuted}
        onToggleSound={toggleSound}
      />

      {/* Main Narrative Sequence */}
      <main className="w-full relative z-0">
        {/* Chapter 01: The Arrival */}
        <Chapter01Arrival
          onOpenEnquiry={() => {
            setEnquiryEventType('');
            setEnquiryOpen(true);
          }}
          onOpenVideo={(url) => setActiveVideo(url)}
        />

        {/* Chapter 02: The Vision (Horizontal Left -> Right) */}
        <Chapter02Vision />

        {/* Chapter 03: The Experience / 3D Spatial Gallery */}
        <Chapter03ExperienceGallery
          onSelectProject={(project) => setActiveProject(project)}
        />

        {/* Chapter 04: The Craft (Horizontal Right -> Left) */}
        <Chapter04Craft />

        {/* Chapter 05: The Olive Philosophy (Vertical Editorial) */}
        <Chapter05Philosophy />

        {/* Chapter 06: The Scale of Olive (Numerical Evidence & Speeding Text) */}
        <Chapter06Scale />

        {/* Chapter 07: The Worlds (Horizontal Left -> Right) */}
        <Chapter07Worlds
          onSelectWorld={(worldTitle) => handleOpenEnquiryForCategory(worldTitle)}
          onOpenVideo={(url) => setActiveVideo(url)}
        />

        {/* Chapter 08: The Transformation (Vertical Before & After) */}
        <Chapter08Transformation />

        {/* Chapter 09: The Details (Horizontal Right -> Left) */}
        <Chapter09Details />

        {/* Chapter 10: The Memory & Continuation (Final Horizontal Left -> Right) */}
        <Chapter10Memory
          onOpenEnquiry={() => {
            setEnquiryEventType('');
            setEnquiryOpen(true);
          }}
          onOpenConcierge={() => setConciergeOpen(true)}
          onOpenDigital={() => setDigitalOpen(true)}
          onOpenPortfolio={() => setPortfolioOpen(true)}
          onOpenVideo={(url) => setActiveVideo(url)}
        />
      </main>

      {/* Floating Quick Action Stack */}
      <FloatingActions
        onOpenConcierge={() => setConciergeOpen(true)}
        onOpenEnquiry={() => {
          setEnquiryEventType('');
          setEnquiryOpen(true);
        }}
      />

      {/* Interactive Modals & Drawers */}
      <EventEnquiryDrawer
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialEventType={enquiryEventType}
      />

      <OliveConciergeModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        onOpenEnquiry={() => {
          setEnquiryEventType('');
          setEnquiryOpen(true);
        }}
      />

      <DigitalStudioModal
        isOpen={digitalOpen}
        onClose={() => setDigitalOpen(false)}
      />

      <FullPortfolioModal
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        onSelectProject={(project) => setActiveProject(project)}
      />

      <LightboxModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onPlanSimilar={(category) => {
          setActiveProject(null);
          handleOpenEnquiryForCategory(category);
        }}
      />

      <VideoModal
        url={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};
