import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Terminal } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const FocusStrip: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleFocusClick = (topic: string) => {
    const el = document.getElementById('research');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Duplicate items for continuous seamless loop
  const displayItems = [...portfolioData.focusAreas, ...portfolioData.focusAreas];

  return (
    <ScrollReveal direction="up" distance={15} duration={0.6}>
      <div
        id="focus-strip"
        className="border-y border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-[#0B0F17]/85 backdrop-blur-xl py-3.5 relative overflow-hidden group select-none transition-colors duration-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Edge gradient masks for smooth fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#0B0F17] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#0B0F17] to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          {/* Fixed Title Tag */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#38BDF8] font-semibold uppercase tracking-wider shrink-0 pr-4 border-r border-slate-200 dark:border-white/10 z-20 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
            <span className="hidden sm:inline">Exploration Core</span>
          </div>

          {/* Continuous ticker track */}
          <div className="flex items-center gap-6 overflow-hidden w-full">
            <div
              className={`flex items-center gap-6 shrink-0 ${
                isPaused ? 'animate-none' : 'animate-marquee'
              }`}
              style={{
                animation: isPaused ? 'none' : 'marquee 32s linear infinite',
              }}
            >
              {displayItems.map((area, idx) => (
                <button
                  key={`${area}-${idx}`}
                  onClick={() => handleFocusClick(area)}
                  className="font-mono text-slate-700 dark:text-[#94A3B8] hover:text-[#38BDF8] dark:hover:text-[#38BDF8] transition-colors cursor-pointer whitespace-nowrap text-xs flex items-center gap-2 py-1.5 px-1 min-h-[38px] group/item active:scale-95"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] group-hover/item:bg-[#38BDF8] group-hover/item:scale-125 transition-all shadow-sm shadow-[#A855F7]/50" />
                  <span className="tracking-wide">{area}</span>
                  <span className="text-slate-300 dark:text-slate-700 mx-2" aria-hidden="true">
                    /
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
