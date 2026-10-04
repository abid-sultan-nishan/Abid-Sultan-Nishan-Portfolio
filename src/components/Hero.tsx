import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, MapPin, Copy, ExternalLink, User, Network, Sparkles, Box, Circle, FileText, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { AbstractAiVisual } from './AbstractAiVisual';
import { useToast } from './Toast';
import { KaggleIcon, DiscordIcon, FacebookIcon, InstagramIcon } from './SocialIcons';
import { AiConceptCardGraphic, AiConceptId } from './AiVisualIcons';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { showToast } = useToast();
  const [activeVisualTab, setActiveVisualTab] = useState<'photo' | 'neural' | 'concepts'>('photo');
  const [selectedConcept, setSelectedConcept] = useState<AiConceptId>('neural_mesh');
  const [conceptShape, setConceptShape] = useState<'circle' | 'square'>('square');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(portfolioData.personal.email);
    showToast({
      message: 'Email copied to clipboard: ' + portfolioData.personal.email,
      type: 'success',
    });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] min-h-[90dvh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto w-full">
        {/* Left Column: Semantic Info & Research Introduction */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="lg:col-span-7 space-y-6 sm:space-y-7 min-w-0"
        >
          {/* Eyebrow and Status */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-tight text-[#0284C7] dark:text-[#38BDF8] px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-[#38BDF8]/10 border border-sky-200 dark:border-[#38BDF8]/30 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] dark:bg-[#38BDF8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284C7] dark:bg-[#38BDF8]" />
                </span>
                <span className="truncate max-w-[200px] sm:max-w-none">{portfolioData.personal.tagline}</span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-[#A855F7]/10 border border-purple-200 dark:border-[#A855F7]/30 text-xs font-semibold text-[#7C3AED] dark:text-[#C084FC] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
                <span>Open for Research Internships</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
              <span className="text-slate-800 dark:text-slate-200 font-semibold">CSE Undergraduate</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Uttara University</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-[#38BDF8] font-semibold">{portfolioData.personal.academicPeriod}</span>
            </div>
          </motion.div>

          {/* Primary Headline with Fluid Typography */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className="fluid-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.14] text-balance"
          >
            Exploring intelligence through{' '}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.25)]">
              language, learning
            </span>
            , and deep neural systems.
          </motion.h1>

          {/* Concise High-Impact Value Proposition */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className="text-base sm:text-lg text-slate-200 dark:text-slate-200 max-w-2xl leading-relaxed font-normal"
          >
            {portfolioData.personal.valueProposition ||
              'CSE Undergraduate & AI/NLP Researcher specializing in Large Language Models, Fine-tuning, and Intelligent Neural Architectures.'}
          </motion.p>

          {/* Primary Call-to-Action (CTA) Buttons: Streamlined 2-Button Group */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => handleScrollTo('projects')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 hover:brightness-110 active:scale-[0.98] rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] hover:scale-[1.01] cursor-pointer text-center shrink-0 touch-manipulation"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            {/* Secondary Action Button: Outline / Ghost Style */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-400/60 active:scale-[0.98] rounded-xl transition-all shadow-sm hover:shadow-[0_0_18px_rgba(56,189,248,0.2)] cursor-pointer text-center shrink-0 backdrop-blur-md touch-manipulation"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download CV / Resume</span>
                <Download className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </motion.div>

          {/* Streamlined Connect & Channel Icon Links (Secondary Group) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-wrap items-center gap-2 pt-0.5"
          >
            {/* Quick Connect / Contact Action */}
            <button
              onClick={() => handleScrollTo('contact')}
              className="inline-flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-cyan-300 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/70 hover:border-cyan-500/40 transition-all cursor-pointer active:scale-95 touch-manipulation"
              title="Get in touch / Collaborate"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Connect</span>
            </button>

            <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>

            {/* Social Channels Row */}
            <div className="flex items-center gap-1 text-slate-400">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/30 hover:bg-slate-800/70 border border-slate-700/40 hover:border-slate-600 transition-all hover:scale-105"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-[#38BDF8] bg-slate-800/30 hover:bg-slate-800/70 border border-slate-700/40 hover:border-[#38BDF8]/40 transition-all hover:scale-105"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              <a
                href={portfolioData.personal.kaggle}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 bg-slate-800/30 hover:bg-slate-800/70 border border-slate-700/40 hover:border-cyan-400/40 transition-all hover:scale-105"
                title="Kaggle Profile (ML & Datasets)"
                aria-label="Kaggle Profile"
              >
                <KaggleIcon className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <a
                href={portfolioData.personal.discord}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-purple-300 bg-slate-800/30 hover:bg-slate-800/70 border border-slate-700/40 hover:border-purple-400/40 transition-all hover:scale-105"
                title="Discord Developer Profile"
                aria-label="Discord Developer Profile"
              >
                <DiscordIcon className="w-3.5 h-3.5 text-purple-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex min-h-[34px] items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-cyan-300 bg-slate-800/30 hover:bg-slate-800/70 border border-slate-700/40 hover:border-cyan-400/40 transition-all hover:scale-105 cursor-pointer group text-xs font-medium"
                title="Copy email address"
                aria-label="Copy email address"
              >
                <Copy className="w-3 h-3 text-slate-400 group-hover:text-cyan-400" />
                <span className="truncate max-w-[130px] hidden md:inline">{portfolioData.personal.email}</span>
                <span className="hidden sm:inline md:hidden text-[11px]">Email</span>
              </button>
            </div>
          </motion.div>

          {/* Grouped Secondary Metrics Container */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className="pt-2 max-w-xl"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
                <span>Empirical Telemetry Snapshot</span>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 container-card">
              <div className="card-subtle p-3 sm:p-3.5 group cursor-default">
                <div className="text-sm sm:text-base font-mono font-bold tabular-nums text-[#38BDF8] group-hover:scale-105 transition-transform origin-left flex items-center gap-1.5">
                  <span>-1.42 PPL</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 font-medium mt-0.5">
                  AdaLoRA-Indic Drop
                </div>
              </div>
              <div className="card-subtle p-3 sm:p-3.5 group cursor-default">
                <div className="text-sm sm:text-base font-mono font-bold tabular-nums text-[#A855F7] group-hover:scale-105 transition-transform origin-left flex items-center gap-1.5">
                  <span>-38.2% Active</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 font-medium mt-0.5">
                  Adapter Pruning
                </div>
              </div>
              <div className="card-subtle p-3 sm:p-3.5 col-span-2 sm:col-span-1 group cursor-default">
                <div className="text-sm sm:text-base font-mono font-bold text-emerald-600 dark:text-[#34D399] group-hover:scale-105 transition-transform origin-left flex items-center gap-1.5">
                  <span>IndicGLUE 4-bit</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 font-medium mt-0.5">
                  Verified Baselines
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Portrait & Scientific Visualizer Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col items-center w-full"
        >
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
            {/* Visualizer Header Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="text-xs font-semibold text-slate-500 dark:text-[#94A3B8] tracking-wider uppercase">
                  RESEARCHER PROFILE
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
                <button
                  onClick={() => setActiveVisualTab('photo')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeVisualTab === 'photo'
                      ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-sm shadow-[#A855F7]/30'
                      : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portrait</span>
                </button>
                <button
                  onClick={() => setActiveVisualTab('neural')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeVisualTab === 'neural'
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-white shadow-sm shadow-[#38BDF8]/30'
                      : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Network</span>
                </button>
                <button
                  onClick={() => setActiveVisualTab('concepts')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeVisualTab === 'concepts'
                      ? 'bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#8B5CF6] text-white shadow-sm shadow-[#A855F7]/30'
                      : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Concepts</span>
                </button>
              </div>
            </div>

            {activeVisualTab === 'photo' ? (
              <div className="card-premium p-3.5 sm:p-4 group rounded-[22px] transition-all duration-500">
                {/* Ambient glow behind image */}
                <div
                  className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#A855F7]/25 blur-3xl transition-opacity duration-500 group-hover:bg-[#A855F7]/35"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#38BDF8]/20 blur-3xl transition-opacity duration-500 group-hover:bg-[#38BDF8]/30"
                  aria-hidden="true"
                />

                <div
                  className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-slate-200/90 dark:border-white/10"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.18) 0%, rgba(168, 85, 247, 0.10) 45%, #07111F 100%)',
                    contain: 'paint layout',
                  }}
                >
                  <picture className="w-full h-full block">
                    <source srcSet="/assets/passport-size-picture.webp" type="image/webp" />
                    <img
                      src={portfolioData.personal.avatarUrl}
                      alt="Abid Sultan Nishan - NLP, LLM & Deep Learning Researcher"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('passport-size-picture.jpg')) {
                          target.src = '/assets/passport-size-picture.jpg';
                        } else if (!target.src.includes('abid-sultan-nishan.jpg')) {
                          target.src = '/abid-sultan-nishan.jpg';
                        }
                      }}
                    />
                  </picture>
                  {/* Subtle gradient scrim at the bottom of the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/90 via-[#0B0F17]/25 to-transparent pointer-events-none" />

                  {/* Photo overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 dark:bg-[#0B0F17]/85 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-lg">
                    <div>
                      <div className="text-xs font-display font-semibold text-white">
                        {portfolioData.personal.name}
                      </div>
                      <div className="text-[11px] font-medium text-[#38BDF8]">
                        {portfolioData.personal.title}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#A855F7]/20 text-purple-200 border border-[#A855F7]/40 whitespace-nowrap">
                        Uttara University
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 px-1 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Focus: NLP &amp; Deep Neural Systems</span>
                  </span>
                  <span>Dhaka, BD</span>
                </div>
              </div>
            ) : activeVisualTab === 'neural' ? (
              <AbstractAiVisual />
            ) : (
              /* High-Tech AI Vector Conceptual Illustrations Viewer */
              <div className="card-premium p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider block">
                      Abstract Vector Concept Art
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8]">
                      Cyan, purple &amp; blue neon vector line-art
                    </span>
                  </div>
                  {/* Container shape toggle: Circle vs Square */}
                  <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => setConceptShape('square')}
                      className={`p-1.5 rounded text-xs transition-all ${
                        conceptShape === 'square'
                          ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title="Framed in Square Container"
                      aria-label="Square container"
                    >
                      <Box className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConceptShape('circle')}
                      className={`p-1.5 rounded text-xs transition-all ${
                        conceptShape === 'circle'
                          ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title="Framed in Circular Container"
                      aria-label="Circular container"
                    >
                      <Circle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Central Display Card */}
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0B0F17] border border-white/10 shadow-inner relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-[#A855F7]/10" />
                  <div className="relative z-10 w-48 sm:w-56 h-48 sm:h-56 flex items-center justify-center">
                    <AiConceptCardGraphic
                      id={selectedConcept}
                      containerShape={conceptShape}
                      size="card"
                      glow={true}
                    />
                  </div>
                  <div className="mt-3 text-center relative z-10">
                    <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider block">
                      {selectedConcept === 'neural_mesh' && 'Deep Neural Synaptic Mesh'}
                      {selectedConcept === 'transformer_attention' && 'Transformer Multi-Head Attention'}
                      {selectedConcept === 'lora_adaptation' && 'Parameter-Efficient LoRA Matrices'}
                      {selectedConcept === 'gradient_landscape' && 'Optimization Loss Landscape'}
                      {selectedConcept === 'latent_embeddings' && 'High-Dimensional Latent Manifold'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8]">
                      Framed in {conceptShape === 'circle' ? 'circular' : 'square'} container · Neon cyan &amp; purple
                    </span>
                  </div>
                </div>

                {/* Interactive Concept Selection Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { id: 'neural_mesh', label: 'Neural Mesh' },
                    { id: 'transformer_attention', label: 'Self-Attention' },
                    { id: 'lora_adaptation', label: 'LoRA Matrices' },
                    { id: 'gradient_landscape', label: 'Loss Surface' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedConcept(item.id as AiConceptId)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all text-center cursor-pointer border ${
                        selectedConcept === item.id
                          ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pt-8 sm:pt-12 pb-2 flex justify-center items-center"
      >
        <button
          onClick={() => handleScrollTo('focus-strip')}
          aria-label="Scroll to exploration areas"
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#38BDF8] transition-colors focus:outline-none cursor-pointer group"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-400 group-hover:text-[#38BDF8]">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-slate-400 group-hover:text-[#38BDF8]" />
        </button>
      </motion.div>
    </section>
  );
};
