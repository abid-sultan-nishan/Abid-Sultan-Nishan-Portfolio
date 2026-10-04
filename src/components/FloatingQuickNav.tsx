import React, { useState, useEffect } from 'react';
import { ArrowUp, FileText, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useToast } from './Toast';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingQuickNavProps {
  onOpenResume: () => void;
}

export const FloatingQuickNav: React.FC<FloatingQuickNavProps> = ({ onOpenResume }) => {
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsVisible(scrollPos > 300);

      const sectionMap: Record<string, string> = {
        home: 'Overview',
        about: 'About Me',
        research: 'Research',
        projects: 'Selected Work',
        skills: 'Competencies',
        education: 'Academic Path',
        publications: 'Notes & Papers',
        contact: 'Connect',
      };

      const sections = Object.keys(sectionMap);
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionMap[s]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    showToast({
      message: 'Email copied: ' + portfolioData.personal.email,
      type: 'success',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bottom-safe z-40 flex items-center gap-2"
          style={{
            bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
            right: 'max(1rem, env(safe-area-inset-right, 1rem))',
          }}
        >
          {/* Current Section Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#070B14]/90 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-[#94A3B8] shadow-2xl backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-slate-500 dark:text-slate-400">Current:</span>
            <span className="text-slate-900 dark:text-white font-medium">{activeSection}</span>
          </div>

          {/* Quick Action: Copy Email */}
          <button
            onClick={handleCopyEmail}
            title="Copy Email Address"
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/90 dark:bg-[#070B14]/90 hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-[#94A3B8] hover:text-[#38BDF8] dark:hover:text-[#38BDF8] border border-slate-200 dark:border-white/[0.08] shadow-lg backdrop-blur-xl transition-all hover:scale-110 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center touch-manipulation"
            aria-label="Copy email"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Quick Action: Open & Download CV Hub */}
          <button
            onClick={onOpenResume}
            title="Download Academic CV / Resume (PDF & Print)"
            className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 text-slate-950 font-bold border border-cyan-300/40 text-xs font-mono shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
          >
            <FileText className="w-3.5 h-3.5 text-slate-950" />
            <span>CV / Resume</span>
          </button>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/90 dark:bg-[#070B14]/90 hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-lg backdrop-blur-xl transition-all hover:scale-110 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center justify-center touch-manipulation"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
