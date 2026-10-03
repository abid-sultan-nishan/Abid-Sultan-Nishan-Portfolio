import React, { useState } from 'react';
import { portfolioData, ResearchInterest, FeaturedResearchProject } from '../data/portfolioData';
import { ArrowUpRight, BookOpen, ExternalLink, Code, Sparkles, CheckCircle2, Sliders, BarChart3, Database, Cpu, Activity } from 'lucide-react';
import { ResearchDetailModal } from './ResearchDetailModal';
import {
  NeuralMeshVector,
  TransformerAttentionVector,
  LowRankAdaptationVector,
  LossLandscapeVector,
  LatentEmbeddingsVector,
  AiConceptCardGraphic,
} from './AiVisualIcons';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { ResponsiveImage } from './ResponsiveImage';
import { TOPIC_GRADIENTS } from '../utils/imagePlaceholders';

export const ResearchSection: React.FC = () => {
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [researchTab, setResearchTab] = useState<'metrics' | 'methodology' | 'datasets'>('metrics');
  const featured = portfolioData.featuredResearchPlaceholder;

  interface ConceptConfig {
    renderIcon: (className?: string) => React.ReactNode;
    accentHex: string;
    borderClasses: string;
    glowClasses: string;
    hoverGlowClasses: string;
    kickerColor: string;
  }

  const researchConceptMap: Record<string, ConceptConfig> = {
    nlp: {
      renderIcon: (cls) => <LatentEmbeddingsVector className={cls} />,
      accentHex: '#38BDF8',
      borderClasses: 'border-sky-400/50 dark:border-sky-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(56,189,248,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(56,189,248,0.6)] group-hover:border-sky-400',
      kickerColor: 'text-[#0284C7] dark:text-[#38BDF8]',
    },
    llm: {
      renderIcon: (cls) => <TransformerAttentionVector className={cls} />,
      accentHex: '#A855F7',
      borderClasses: 'border-purple-400/50 dark:border-purple-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(168,85,247,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(168,85,247,0.6)] group-hover:border-purple-400',
      kickerColor: 'text-[#7C3AED] dark:text-[#C084FC]',
    },
    finetuning: {
      renderIcon: (cls) => <LowRankAdaptationVector className={cls} />,
      accentHex: '#34D399',
      borderClasses: 'border-emerald-400/50 dark:border-emerald-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(52,211,153,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(52,211,153,0.6)] group-hover:border-emerald-400',
      kickerColor: 'text-emerald-700 dark:text-[#34D399]',
    },
    'deep-learning': {
      renderIcon: (cls) => <LossLandscapeVector className={cls} />,
      accentHex: '#60A5FA',
      borderClasses: 'border-blue-400/50 dark:border-blue-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(96,165,250,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(96,165,250,0.6)] group-hover:border-blue-400',
      kickerColor: 'text-blue-700 dark:text-blue-400',
    },
    'applied-ml': {
      renderIcon: (cls) => <NeuralMeshVector className={cls} />,
      accentHex: '#F59E0B',
      borderClasses: 'border-amber-400/50 dark:border-amber-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(245,158,11,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(245,158,11,0.6)] group-hover:border-amber-400',
      kickerColor: 'text-amber-700 dark:text-amber-400',
    },
    'computer-vision': {
      renderIcon: (cls) => <LossLandscapeVector className={cls} />,
      accentHex: '#EC4899',
      borderClasses: 'border-pink-400/50 dark:border-pink-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(236,72,153,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(236,72,153,0.6)] group-hover:border-pink-400',
      kickerColor: 'text-pink-700 dark:text-pink-400',
    },
    'reinforcement-learning': {
      renderIcon: (cls) => <TransformerAttentionVector className={cls} />,
      accentHex: '#8B5CF6',
      borderClasses: 'border-indigo-400/50 dark:border-indigo-400/40',
      glowClasses: 'shadow-[0_0_16px_rgba(139,92,246,0.25)]',
      hoverGlowClasses: 'group-hover:shadow-[0_0_26px_rgba(139,92,246,0.6)] group-hover:border-indigo-400',
      kickerColor: 'text-indigo-700 dark:text-indigo-400',
    },
  };

  const getStatusColor = (status: ResearchInterest['status']) => {
    switch (status) {
      case 'Active investigation':
        return { text: 'text-[#0284C7] dark:text-[#38BDF8]', dot: 'bg-[#0284C7] dark:bg-[#38BDF8]' };
      case 'Ongoing learning':
        return { text: 'text-[#059669] dark:text-[#34D399]', dot: 'bg-[#059669] dark:bg-[#34D399]' };
      case 'Exploring':
        return { text: 'text-[#7C3AED] dark:text-[#C084FC]', dot: 'bg-[#7C3AED] dark:bg-[#A855F7]' };
      case 'Area of interest':
        return { text: 'text-amber-600 dark:text-amber-300', dot: 'bg-amber-500 dark:bg-amber-400' };
      default:
        return { text: 'text-slate-500 dark:text-slate-400', dot: 'bg-slate-400' };
    }
  };

  return (
    <section id="research" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-12 sm:mb-14">
        <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
          <span>Core Investigation &amp; Methodology</span>
        </div>
        <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Research Directions
        </h2>
        <p className="fluid-body text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          I am exploring low-resource language modeling, parameter-efficient adaptation, and the mathematical mechanics of deep representation learning. Here is an overview of my current inquiries.
        </p>
      </ScrollReveal>

      {/* Research Areas Bento Cards - Spacious & Decluttered */}
      <StaggerContainer
        staggerChildren={0.08}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14 w-full"
      >
        {portfolioData.researchInterests.map((interest, idx) => {
          const concept = researchConceptMap[interest.id] || researchConceptMap.nlp;
          const statusStyle = getStatusColor(interest.status);

          return (
            <StaggerItem
              key={interest.id}
              direction="up"
              distance={24}
              scale={0.98}
              delay={(idx % 3) * 0.08}
              className="h-full container-card"
            >
              <div className="card-premium group flex flex-col justify-between h-full bg-[#0b101d]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)] hover:border-cyan-500/50">
                {/* 4:3 Isometric Vector Illustration Header Banner */}
                {interest.cardImage && (
                  <div className="relative w-full aspect-[4/3] max-h-48 overflow-hidden rounded-t-xl border-b border-slate-800/80 bg-[#070B12]">
                    <ResponsiveImage
                      src={interest.cardImage}
                      alt={`${interest.title} 3D isometric conceptual illustration`}
                      wrapperClassName="w-full h-full"
                      priority={idx < 2}
                      gradientFallback={TOPIC_GRADIENTS[interest.id]}
                      className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-80 pointer-events-none" />
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category & Title */}
                    <div className="mb-2.5">
                      <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase block">
                        0{idx + 1} // {interest.id.toUpperCase().replace('-', ' ')}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mt-1.5 min-h-[3.5rem] flex items-start">
                        {interest.title}
                      </h3>
                    </div>

                    {/* Status Pill Badge with dynamic tint */}
                    <div className="mb-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 ${
                          interest.status.toLowerCase().includes('interest')
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            : interest.status.toLowerCase().includes('exploring') || interest.status.toLowerCase().includes('investigation')
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shrink-0" />
                        <span>{interest.status}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal min-h-[4rem] my-3.5">
                      {interest.description}
                    </p>
                  </div>

                  {/* Key Explorations Section */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-medium">
                      Key Explorations:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interest.keyTopics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[11px] bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-md px-2.5 py-1"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Featured Research Project Card - Spacious Executive Study Showcase with Clean Tabs */}
      <ScrollReveal direction="up" distance={24} duration={0.65} scale={0.99}>
        <div className="card-featured-glow">
          <div className="card-inner-elevated p-7 sm:p-10 relative overflow-hidden">
            {/* Subtle ambient specular highlight */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#A855F7]/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-3xl" aria-hidden="true" />

            {/* Study Header & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-200 dark:border-white/10 pb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#0284C7] dark:bg-[#38BDF8] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8]">
                  Featured Research Investigation
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
                <span className="text-[#7C3AED] dark:text-[#C084FC] font-medium">{featured.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-[#34D399] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{featured.status}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="text-xs font-mono text-[#38BDF8] font-medium mb-1.5">
                    {featured.arxivId} · {featured.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {featured.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {featured.summary}
                </p>

                {/* Clean Segmented Tab Switcher for Secondary Details (Eliminates Cognitive Overload) */}
                <div className="pt-2 w-full">
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/10 w-fit max-w-full overflow-x-auto scrollbar-none mb-4">
                    <button
                      onClick={() => setResearchTab('metrics')}
                      className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] touch-manipulation ${
                        researchTab === 'metrics'
                          ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Empirical Metrics</span>
                    </button>
                    <button
                      onClick={() => setResearchTab('methodology')}
                      className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] touch-manipulation ${
                        researchTab === 'methodology'
                          ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5 text-[#A855F7]" />
                      <span>Methodology &amp; Setup</span>
                    </button>
                    <button
                      onClick={() => setResearchTab('datasets')}
                      className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] touch-manipulation ${
                        researchTab === 'datasets'
                          ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Datasets &amp; Benchmarks</span>
                    </button>
                  </div>

                  {/* Tab 1: Empirical Metrics */}
                  {researchTab === 'metrics' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        {featured.metrics.map((m, idx) => (
                          <div key={idx} className="card-subtle p-4 cursor-default">
                            <div className="text-xl sm:text-2xl font-bold font-mono text-[#38BDF8]">
                              {m.value}
                            </div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1">
                              {m.label}
                            </div>
                            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                              {m.comparison}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="card-subtle p-4.5 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-emerald-500">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                          Key Observed Finding:
                        </span>
                        {featured.results}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Methodology & SVD Setup */}
                  {researchTab === 'methodology' && (
                    <div className="card-subtle p-5 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 space-y-3 animate-fade-in leading-relaxed">
                      <div className="text-[#A855F7] dark:text-[#C084FC] font-semibold text-sm">
                        Singular Value Decomposition (SVD) Dynamic Rank Pruning
                      </div>
                      <p>{featured.methodology}</p>
                      <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/10">
                        Hardware: Evaluated on single-GPU NVIDIA RTX 3090 / A100 testbed with PyTorch 2.2 PEFT hooks.
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Datasets & Indic Benchmarks */}
                  {researchTab === 'datasets' && (
                    <div className="card-subtle p-5 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 space-y-3 animate-fade-in leading-relaxed">
                      <div className="text-[#38BDF8] font-semibold text-sm">
                        Curated IndicGLUE &amp; Bengali Instruction Suites
                      </div>
                      <p>{featured.datasetOrBenchmark}</p>
                      <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/10">
                        Includes IndicGLUE benchmark, 25k Bengali UltraFeedback alignment pairs, and morphological stress suite.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action & Illustration Column */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-5">
                {/* Concept Illustration Container */}
                <div className="card-subtle p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-3 overflow-hidden">
                  <div className="flex items-center justify-between w-full border-b border-slate-200 dark:border-white/10 pb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                      AdaLoRA Dynamic Rank
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30">3D Isometric</span>
                  </div>
                  {featured.cardImage ? (
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#070B12] group/img">
                      <ResponsiveImage
                        src={featured.cardImage}
                        alt="AdaLoRA dynamic rank 3D isometric conceptual illustration"
                        wrapperClassName="w-full h-full"
                        priority={true}
                        gradientFallback="radial-gradient(ellipse at 50% 25%, rgba(168, 85, 247, 0.25) 0%, rgba(56, 189, 248, 0.15) 50%, #070B12 100%)"
                        className="group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[9px] font-mono text-[#38BDF8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                        <span>SVD Pruning Matrix Flow</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center py-1">
                      <AiConceptCardGraphic
                        id="lora_adaptation"
                        containerShape="square"
                        size="card"
                        className="w-full max-w-[200px]"
                        glow={true}
                      />
                    </div>
                  )}
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dynamic gradient variance rank pruning on low-resource Indic attention heads.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={() => setIsResearchModalOpen(true)}
                    className="w-full min-h-[44px] flex items-center justify-between px-5 py-3 rounded-xl border border-white/20 bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] text-white text-xs font-mono font-medium transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>View Full Paper &amp; Ablation Table</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={featured.codeUrl || portfolioData.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[44px] btn-glass flex items-center justify-between px-5 py-3 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white active:scale-[0.98] transition-all touch-manipulation"
                  >
                    <span className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#34D399]" />
                      <span>PyTorch Implementation</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Research Detail & Ablation Modal */}
      <ResearchDetailModal
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
        project={featured}
      />
    </section>
  );
};
