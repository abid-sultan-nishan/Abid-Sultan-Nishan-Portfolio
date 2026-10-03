import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { Github, ArrowRight, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { AiConceptCardGraphic, AiConceptId } from './AiVisualIcons';
import { ProjectPlayground } from './ProjectPlayground';
import { ResponsiveImage } from './ResponsiveImage';
import { getCardImageConfig } from '../data/cardImageRegistry';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const isFeatured = project.isFeatured;
  const [showPlayground, setShowPlayground] = useState(false);

  const visualConceptMap: Record<
    ProjectItem['abstractVisual'],
    { id: AiConceptId; shape: 'circle' | 'square' }
  > = {
    transformer: { id: 'transformer_attention', shape: 'circle' },
    rag: { id: 'latent_embeddings', shape: 'square' },
    neural_weights: { id: 'lora_adaptation', shape: 'square' },
    classification: { id: 'gradient_landscape', shape: 'circle' },
    multilingual: { id: 'neural_mesh', shape: 'square' },
    tool: { id: 'neural_mesh', shape: 'circle' },
  };

  const concept = visualConceptMap[project.abstractVisual] || {
    id: 'neural_mesh' as AiConceptId,
    shape: 'square' as const,
  };

  const cardConfig = getCardImageConfig(project.id, project.category);
  const cardIllustration = project.cardImage || cardConfig.primaryImage;

  const cardInnerContent = (
    <div className="relative flex flex-col justify-between h-full">
      {/* 3D Isometric Network Nodes & Data Flows Illustration */}
      <div className="relative w-full h-44 overflow-hidden rounded-t-[22px] border-b border-white/10 bg-[#070B12]">
        <ResponsiveImage
          src={cardIllustration}
          webpSrc={cardConfig.primaryImage}
          alt={`${project.title} isometric network visualization`}
          wrapperClassName="w-full h-full"
          priority={isFeatured}
          gradientFallback={cardConfig.gradientFallback}
          className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent pointer-events-none" />
        
        {/* Topic Tag Pill */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#38BDF8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span>3D Isometric Neural Architecture</span>
        </div>

        {/* Floating Top-Right Standardized Translucent Neon Icon Badge */}
        <div
          className="card-icon-badge-box"
          style={{
            ['--badge-border' as any]: 'rgba(56, 189, 248, 0.45)',
            ['--badge-glow' as any]: 'rgba(56, 189, 248, 0.25)',
            ['--badge-border-strong' as any]: '#38BDF8',
            ['--badge-glow-strong' as any]: 'rgba(56, 189, 248, 0.7)',
          }}
          title={`${project.title} Concept Graphic`}
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

      <div className="p-6 sm:p-8 pt-5 sm:pt-6 space-y-6 flex-1 flex flex-col justify-between">

      <div>
        {/* Card Top: Category & Status */}
        <div className="flex items-center justify-between gap-3 mb-5 pr-16 sm:pr-20">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] block">
              {project.category}
            </span>
            {isFeatured && (
              <span className="font-mono text-[11px] text-[#7C3AED] dark:text-[#C084FC] font-medium block mt-0.5">
                Flagship Implementation
              </span>
            )}
          </div>

          {/* Clean Unboxed Status Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 font-medium shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(project)}
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors cursor-pointer tracking-tight leading-snug pr-16 sm:pr-20"
        >
          {project.title}
        </h3>

        {/* Short description with high contrast */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-3 mb-5">
          {project.shortDescription}
        </p>

        {/* Contribution & Problem Summary Callout Box */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] mb-5 text-xs font-mono space-y-1">
          <span className="text-[#7C3AED] dark:text-[#C084FC] font-semibold block text-[11px] uppercase tracking-wider">
            Investigation Focus:
          </span>
          <span className="text-slate-700 dark:text-slate-200 leading-relaxed block">
            {project.problemAddressed}
          </span>
        </div>

        {/* Technologies tags with clean contrast */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-white/[0.03] font-mono text-xs text-slate-700 dark:text-slate-300 font-medium cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Interactive Model Playground Trigger Button */}
        <button
          type="button"
          onClick={() => setShowPlayground((prev) => !prev)}
          className="btn-sandbox-trigger w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-sky-300/40 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/20 text-xs font-mono font-medium text-[#0284C7] dark:text-[#38BDF8] cursor-pointer touch-manipulation active:scale-[0.98] transition-all"
        >
          <span className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-semibold">{showPlayground ? 'Hide Interactive Sandbox' : '⚡ Test Live Model Inference Sandbox'}</span>
          </span>
          {showPlayground ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Embedded Live Playground */}
        {showPlayground && <ProjectPlayground project={project} />}
      </div>

      {/* Footer actions with increased padding & spacing */}
      <div className="pt-5 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="min-h-[44px] text-slate-600 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 font-medium hover:scale-105 active:scale-95 touch-manipulation"
          aria-label={`View GitHub for ${project.title}`}
        >
          <Github className="w-4 h-4" />
          <span>Code Artifacts</span>
        </a>

        <button
          onClick={() => onSelect(project)}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-sm text-[#0284C7] dark:text-[#38BDF8] hover:text-[#0369A1] dark:hover:text-[#7DD3FC] font-semibold group/btn cursor-pointer transition-colors active:scale-95 touch-manipulation"
        >
          <span>Architecture &amp; Metrics</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
      </div>
    </div>
  );

  if (isFeatured) {
    return (
      <div className="card-featured-glow container-card group h-full">
        <div className="card-inner-elevated h-full">
          {cardInnerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium container-card group flex flex-col justify-between h-full">
      {cardInnerContent}
    </div>
  );
};
