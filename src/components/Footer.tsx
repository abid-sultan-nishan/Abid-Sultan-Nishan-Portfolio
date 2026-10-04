import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, Rss } from 'lucide-react';
import { DiscordIcon, KaggleIcon, FacebookIcon, InstagramIcon } from './SocialIcons';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#060911] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono transition-colors duration-200">
      <ScrollReveal direction="up" distance={16} duration={0.6}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7]/20 to-[#38BDF8]/20 text-[#38BDF8] font-bold border border-white/10 shadow-inner">
            {portfolioData.personal.monogram}
          </div>
          <div>
            <div className="font-display font-semibold text-slate-900 dark:text-white text-sm">
              {portfolioData.personal.name}
            </div>
            <div className="text-slate-500 dark:text-[#94A3B8] text-[11px]">
              {portfolioData.personal.title}
            </div>
          </div>
        </div>

        {/* Core philosophy quote */}
        <div className="text-slate-600 dark:text-[#94A3B8] text-center font-mono italic">
          “Learning, experimenting, and building with deep intelligence.”
        </div>

        {/* Links and Back to Top */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="GitHub profile"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="LinkedIn profile"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.kaggle}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Kaggle profile"
            title="Kaggle"
          >
            <KaggleIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.discord}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#A855F7] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Discord profile"
            title="Discord"
          >
            <DiscordIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.facebook}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Facebook profile"
            title="Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.instagram}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-pink-400 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Instagram profile"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Email link"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#38BDF8] rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/[0.04] transition-all p-2 hover:scale-110 active:scale-95 touch-manipulation"
            title="Subscribe via RSS Feed"
            aria-label="RSS Feed"
          >
            <Rss className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-[#38BDF8]/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all cursor-pointer ml-1 active:scale-95 touch-manipulation"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#38BDF8]" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-slate-400 dark:text-slate-500 gap-2">
        <div>
          © {new Date().getFullYear()} {portfolioData.personal.name} · Department of CSE, Uttara University
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Dhaka, Bangladesh</span>
          <span>·</span>
          <span className="text-[#38BDF8]">Open Source Research</span>
        </div>
      </div>
      </ScrollReveal>
    </footer>
  );
};
