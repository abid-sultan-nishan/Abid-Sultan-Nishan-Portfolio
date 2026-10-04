import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAiConcepts?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenAiConcepts,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Notes', href: '#publications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 15);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollPos / totalHeight) * 100);
      }

      // Determine active section based on scroll offset
      const sections = ['home', 'about', 'research', 'projects', 'skills', 'education', 'publications', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* Top scroll progress line with refined cyan-indigo-violet gradient */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] z-50 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#060911]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-lg shadow-black/10 dark:shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark, Monogram & Micro-Animated Status Tag */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-xl p-1 min-w-0"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7]/20 via-[#38BDF8]/20 to-transparent text-[#38BDF8] font-bold text-xs border border-white/15 shadow-inner group-hover:border-[#38BDF8]/60 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
                {portfolioData.personal.monogram}
              </div>
              <span className="font-display font-semibold tracking-tight text-xs sm:text-sm md:text-base text-slate-900 dark:text-slate-100 group-hover:text-[#A855F7] dark:group-hover:text-white transition-colors truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                {portfolioData.personal.name}
              </span>
            </a>

            {/* Micro-Animated Status Tag */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-[#94A3B8] backdrop-blur-sm shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="truncate max-w-[140px] md:max-w-none">Research Open</span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with active glow line) */}
          <nav
            className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-600 dark:text-[#94A3B8]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 transition-all duration-200 hover:text-slate-900 dark:hover:text-white ${
                    isActive
                      ? 'text-[#A855F7] dark:text-[#38BDF8] font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                      : 'text-slate-600 dark:text-[#94A3B8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#A855F7] to-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Resume Button, AI Concepts, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* AI Concepts Illustrations Gallery Button */}
            {onOpenAiConcepts && (
              <button
                onClick={onOpenAiConcepts}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white/60 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] active:scale-[0.98] rounded-xl transition-all border border-slate-200 dark:border-white/10 whitespace-nowrap cursor-pointer hover:border-[#38BDF8]/40 hover:text-[#38BDF8]"
                title="View AI Conceptual Illustrations"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>AI Concepts</span>
              </button>
            )}

            {/* Glowing Executive CV Button */}
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] active:scale-[0.98] rounded-xl transition-all shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.55)] whitespace-nowrap cursor-pointer border border-white/20"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-200" />
              <span>View CV</span>
            </button>

            {/* Mobile menu trigger with 44px min-target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-colors cursor-pointer active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Glassmorphism */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`min-h-[44px] flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#A855F7]/15 text-[#38BDF8] border border-[#38BDF8]/30 font-semibold shadow-xs'
                        : 'text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            <div className="pt-1 flex flex-col gap-2">
              {onOpenAiConcepts && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiConcepts();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-white/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:border-[#38BDF8]/40 hover:text-[#38BDF8] active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Explore AI Vector Conceptual Illustrations</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] rounded-xl transition-all shadow-md shadow-[#A855F7]/30 active:scale-[0.98] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
