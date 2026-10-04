/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FocusStrip } from './components/FocusStrip';
import { AboutSection } from './components/AboutSection';
import { ResearchSection } from './components/ResearchSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { FloatingQuickNav } from './components/FloatingQuickNav';
import { ResumeModal } from './components/ResumeModal';
import { AiConceptIllustrationsModal } from './components/AiConceptIllustrationsModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAiConceptsOpen, setIsAiConceptsOpen] = useState(false);

  // Permanently lock Dark theme across document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('asn-theme', 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#060911');
  }, []);

  return (
    <ToastProvider>
      <div className="relative min-h-screen min-h-screen-dvh w-full overflow-x-clip bg-[var(--bg-main)] text-[var(--text-primary)] selection:bg-[#A855F7]/30 selection:text-[#38BDF8] transition-colors duration-300">
        {/* Subtle Ambient Neural Network Particles Canvas */}
        <BackgroundCanvas isDark={true} />

        {/* Navbar */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAiConcepts={() => setIsAiConceptsOpen(true)}
        />

        <main id="main-content" className="relative z-10 w-full overflow-x-clip">
          {/* Hero Section with Abstract AI Visual */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          {/* Intro Focus Strip with smooth ticker marquee */}
          <FocusStrip />

          {/* About Me Section */}
          <AboutSection />

          {/* Research Direction Section */}
          <ResearchSection />

          {/* Selected Work / Projects Section */}
          <ProjectsSection />

          {/* Skills Section */}
          <SkillsSection />

          {/* Education Timeline */}
          <EducationSection />

          {/* Research Notes & Publications */}
          <PublicationsSection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action & Reading Progress Pill */}
        <FloatingQuickNav onOpenResume={() => setIsResumeOpen(true)} />

        {/* Full Curriculum Vitae Modal */}
        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        )}

        {/* AI Conceptual Vector Line-Art & Artwork Showcase Modal */}
        {isAiConceptsOpen && (
          <AiConceptIllustrationsModal
            isOpen={isAiConceptsOpen}
            onClose={() => setIsAiConceptsOpen(false)}
          />
        )}
      </div>
    </ToastProvider>
  );
}

