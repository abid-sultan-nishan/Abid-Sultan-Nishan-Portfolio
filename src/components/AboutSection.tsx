import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, MapPin, Compass, Users, Sparkles, Binary, User } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  // Cascading image fallback candidate paths for Passport Size Picture
  const avatarFallbacks = [
    '/assets/Passport Size Picture.jpg',
    '/assets/passport-size-picture.jpg',
    '/Passport Size Picture.jpg',
    '/abid-sultan-nishan.jpg',
  ];
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatarFailedAll, setAvatarFailedAll] = useState(false);

  const handleAvatarError = () => {
    if (avatarIndex + 1 < avatarFallbacks.length) {
      setAvatarIndex((prev) => prev + 1);
    } else {
      setAvatarFailedAll(true);
    }
  };
  return (
    <section id="about" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <ScrollReveal direction="up" distance={20} className="mb-10 sm:mb-12">
        <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
          <span>Academic Profile &amp; Background</span>
        </div>
        <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white">
          About Me
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
        {/* Left Column: Narrative Biography & Motivation */}
        <div className="lg:col-span-7 space-y-6 container-card">
          <ScrollReveal direction="up" distance={24} duration={0.6}>
            <div className="card-premium p-6 sm:p-9 space-y-5">
              <p className="fluid-body-lg text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                {portfolioData.personal.bioParagraph1}
              </p>
              <p className="fluid-body text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {portfolioData.personal.bioParagraph2}
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 text-[#38BDF8] font-medium">
                  <Binary className="w-4 h-4 text-[#38BDF8]" />
                  <span>Empirical &amp; Reproducible Methodology</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">Dhaka, Bangladesh</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Currently Exploring Card */}
          <ScrollReveal direction="up" distance={24} duration={0.6} delay={0.1}>
            <div className="card-premium p-7 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A855F7]" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono">
                    Currently Exploring
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Active Learning Topics
                </span>
              </div>

              <StaggerContainer
                staggerChildren={0.06}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {portfolioData.currentlyExploring.map((topic, idx) => (
                  <StaggerItem key={idx} direction="up" distance={16} delay={idx * 0.04}>
                    <div className="card-subtle flex items-center gap-2.5 px-3.5 py-3 text-xs font-mono text-slate-800 dark:text-slate-200 group cursor-default">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] group-hover:scale-125 transition-transform shrink-0" />
                      <span className="truncate font-medium">{topic}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Structured Editable Status & Academic Info */}
        <div className="lg:col-span-5 space-y-5">
          <ScrollReveal direction="up" distance={24} duration={0.6} delay={0.15}>
            <div className="card-premium p-7 sm:p-8 space-y-5">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                {/* Profile Avatar Container with Glowing Border & Square Aspect Ratio */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 aspect-square shrink-0 group">
                  {/* Subtle Glowing Aura / Ambient Border Gradient */}
                  <div
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-[#38BDF8] via-[#A855F7] to-[#34D399] opacity-40 blur-[3px] group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Inner Container with crisp borders and rounded corners */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-300/80 dark:border-white/20 shadow-md">
                    {!avatarFailedAll ? (
                      <img
                        src={avatarFallbacks[avatarIndex]}
                        alt="Abid Sultan Nishan"
                        loading="eager"
                        decoding="async"
                        onError={handleAvatarError}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      /* Graceful Initials Monogram Fallback */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1B4B] to-[#0F172A] text-[#38BDF8] font-mono font-bold text-xs tracking-wider">
                        <User className="w-5 h-5 text-[#A855F7] mb-0.5" />
                        <span>ASN</span>
                      </div>
                    )}
                  </div>

                  {/* Live Active Status Indicator Dot */}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111827] shadow-xs flex items-center justify-center"
                    title="Active · Open for Collaboration"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base">
                    {portfolioData.personal.name}
                  </h3>
                  <div className="text-xs font-mono text-[#38BDF8] font-medium">
                    {portfolioData.personal.title}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    Uttara University · 2024–2027
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#A855F7] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">Current Status</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 mt-0.5">
                      {portfolioData.personal.educationStatus}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {portfolioData.personal.university} · {portfolioData.personal.academicPeriod}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">Location</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 mt-0.5">
                      {portfolioData.personal.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-[#A855F7] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">Research Direction</div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 mt-0.5">
                      NLP, LLMs &amp; Deep Learning
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Language representation, fine-tuning &amp; evaluation
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200 dark:border-white/10">
                  <Users className="w-4 h-4 text-[#34D399] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-emerald-600 dark:text-[#34D399] font-medium">
                      Collaboration Status
                    </div>
                    <div className="text-xs text-slate-800 dark:text-slate-200 mt-1.5 font-mono leading-relaxed bg-slate-50 dark:bg-white/[0.03] p-3.5 rounded-xl border border-slate-200 dark:border-white/10">
                      {portfolioData.personal.collaborationStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Monogram Research Bio Badge */}
          <ScrollReveal direction="up" distance={18} duration={0.5} delay={0.25}>
            <div className="p-4.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between shadow-sm backdrop-blur-md">
              <span className="text-slate-900 dark:text-slate-200 font-semibold">ASN Research Index</span>
              <span className="text-[#38BDF8] font-medium">Uttara, Dhaka · BD</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
