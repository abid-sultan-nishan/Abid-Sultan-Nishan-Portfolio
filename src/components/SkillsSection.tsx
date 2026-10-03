import React, { useState } from 'react';
import { portfolioData, SkillCategory } from '../data/portfolioData';
import { Search, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { AiConceptCardGraphic, AiConceptId } from './AiVisualIcons';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { ResponsiveImage } from './ResponsiveImage';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const categories = ['All', ...portfolioData.skills.map((s) => s.category)];

  const getCategoryConcept = (category: string): { id: AiConceptId; shape: 'circle' | 'square' } => {
    switch (category) {
      case 'Programming':
        return { id: 'neural_mesh', shape: 'square' };
      case 'Machine Learning':
        return { id: 'gradient_landscape', shape: 'circle' };
      case 'NLP & LLMs':
        return { id: 'transformer_attention', shape: 'circle' };
      case 'Tools & Environments':
        return { id: 'lora_adaptation', shape: 'square' };
      case 'Research Methodology':
        return { id: 'latent_embeddings', shape: 'square' };
      default:
        return { id: 'neural_mesh', shape: 'circle' };
    }
  };

  const getLevelDot = (level: string) => {
    switch (level) {
      case 'Working knowledge':
        return 'bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]';
      case 'Learning':
        return 'bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]';
      case 'Exploring':
        return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]';
      default:
        return 'bg-slate-400';
    }
  };

  const getLevelTextColor = (level: string) => {
    switch (level) {
      case 'Working knowledge':
        return 'text-[#38BDF8]';
      case 'Learning':
        return 'text-[#A855F7] dark:text-[#C084FC]';
      case 'Exploring':
        return 'text-amber-500 dark:text-amber-300';
      default:
        return 'text-slate-500 dark:text-slate-400';
    }
  };

  const toggleExpand = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const displayedCategories = portfolioData.skills.filter((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery) return true;
    return (
      cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="skills" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <ScrollReveal direction="up" distance={20} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
            <span>Technical Stack &amp; Methodologies</span>
          </div>
          <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Skills &amp; Competencies
          </h2>
          <p className="fluid-body text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
            Honest classification of tools, frameworks, and scientific methodologies with explicit working levels and zero arbitrary percentages.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-300" />
          <input
            type="text"
            placeholder="Search competencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-base sm:text-xs font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md transition-all shadow-xs"
          />
        </div>
      </ScrollReveal>

      {/* Filter Tabs for Streamlined Browsing (Reduces Cognitive Overload) */}
      <ScrollReveal direction="up" distance={15} className="mb-8">
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-none max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 min-h-[40px] text-xs font-mono font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-md shadow-[#A855F7]/30 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Categories Grid - Refined & De-Cluttered */}
      <StaggerContainer
        key={`${selectedCategory}-${searchQuery}`}
        staggerChildren={0.07}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {displayedCategories.map((cat, idx) => {
          const filteredItems = searchQuery
            ? cat.items.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : cat.items;

          if (filteredItems.length === 0) return null;

          const isExpanded = !!expandedCategories[cat.category] || selectedCategory !== 'All' || !!searchQuery;
          const displayLimit = isExpanded ? filteredItems.length : 4;
          const visibleItems = filteredItems.slice(0, displayLimit);
          const hasMore = filteredItems.length > 4 && selectedCategory === 'All' && !searchQuery;

          const concept = getCategoryConcept(cat.category);

          return (
            <StaggerItem
              key={cat.category}
              direction="up"
              distance={24}
              scale={0.98}
              delay={(idx % 3) * 0.08}
              className="h-full container-card"
            >
              <div className="card-premium group relative flex flex-col justify-between h-full overflow-hidden">
                {/* 3D Isometric Conceptual Vector Illustration Card Banner */}
                {cat.cardImage && (
                  <div className="relative w-full aspect-[16/9] max-h-44 overflow-hidden rounded-t-[22px] border-b border-white/10 bg-[#070B12]">
                    <ResponsiveImage
                      src={cat.cardImage}
                      alt={`${cat.category} 3D isometric conceptual vector visualization`}
                      wrapperClassName="w-full h-full"
                      gradientFallback="radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(56, 189, 248, 0.12) 50%, #070B12 100%)"
                      className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-transparent pointer-events-none" />
                    
                    {/* Micro Topic Pill */}
                    <div className="absolute bottom-2.5 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#38BDF8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                      <span>3D Isometric Neural Stack</span>
                    </div>

                    {/* Floating Top-Right Standardized Translucent Neon Icon Badge */}
                    <div
                      className="card-icon-badge-box"
                      style={{
                        ['--badge-border' as any]: 'rgba(168, 85, 247, 0.45)',
                        ['--badge-glow' as any]: 'rgba(168, 85, 247, 0.25)',
                        ['--badge-border-strong' as any]: '#A855F7',
                        ['--badge-glow-strong' as any]: 'rgba(168, 85, 247, 0.7)',
                      }}
                      title={`${cat.category} Concept Graphic`}
                    >
                      <div className="card-icon-inner">
                        <AiConceptCardGraphic
                          id={concept.id}
                          containerShape={concept.shape}
                          size="sm"
                          className="w-full h-full"
                          glow={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Category Header */}
                    <div className="mb-3.5 pr-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-[#38BDF8] transition-colors">
                        {cat.category}
                      </h3>
                      <div className="text-xs font-mono text-[#38BDF8] flex items-center gap-1.5 mt-0.5">
                        <span>{filteredItems.length} competencies</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-5">
                      {cat.description}
                    </p>

                  {/* Streamlined Competencies List (Zero-Pill Clean Typography) */}
                  <div className="space-y-2.5">
                    {visibleItems.map((skill, sIdx) => {
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/70 dark:border-white/5 bg-slate-50/70 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/15 transition-all group/item"
                        >
                          <span className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover/item:text-[#38BDF8] transition-colors font-medium">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0">
                            <span className={`h-1.5 w-1.5 rounded-full ${getLevelDot(skill.level)}`} />
                            <span className={getLevelTextColor(skill.level)}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Clean Expander for Secondary Skills */}
                  {hasMore && (
                    <button
                      onClick={() => toggleExpand(cat.category)}
                      className="mt-3.5 w-full py-2.5 px-3 min-h-[44px] rounded-xl border border-dashed border-slate-300 dark:border-white/10 hover:border-[#38BDF8]/40 bg-white/40 dark:bg-white/[0.01] hover:bg-slate-100 dark:hover:bg-white/[0.04] text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-[#38BDF8] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
                    >
                      {isExpanded ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>+ {filteredItems.length - 4} more competencies</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Stack</span>
                  </span>
                  <span>Uttara University</span>
                </div>
              </div>
            </div>
          </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};
