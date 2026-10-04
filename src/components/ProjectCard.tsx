import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { Github, ArrowRight, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectPlayground } from './ProjectPlayground';
import { ResponsiveImage } from './ResponsiveImage';
import { getCardImageConfig } from '../data/cardImageRegistry';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const isFeatured = project.isFeatured;
  const [showPlayground, setShowPlayground] = useState(false);

  const cardConfig = getCardImageConfig(project.id, project.category);
  const cardIllustration = project.cardImage || cardConfig.primaryImage;

  const cardInnerContent = (
    <div className="relative flex flex-col justify-between h-full">
      {/* 3D Isometric Network Nodes & Data Flows Illustration */}
      <div className="relative w-full h-44 overflow-hidden rounded-t-[21px] border-b border-slate-800/80 bg-[#070B12]">
        <ResponsiveImage
          src={cardIllustration}
          webpSrc={cardConfig.primaryImage}
          alt={`${project.title} isometric network visualization`}
          wrapperClassName="w-full h-full"
          priority={isFeatured}
          gradientFallback={cardConfig.gradientFallback}
          className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      <div className="p-6 sm:p-7 pt-5 sm:pt-6 space-y-4 flex-1 flex flex-col justify-between">

      <div>
        {/* Card Top: Category & Status */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase block">
              {typeof index === 'number' ? `0${index + 1} // ` : ''}{project.category.toUpperCase()}
            </span>
            {isFeatured && (
              <span className="font-mono text-[10px] text-purple-400 font-medium block mt-0.5 tracking-wider uppercase">
                Flagship Implementation
              </span>
            )}
          </div>

          {/* Compact Glassmorphism Status Pill */}
          <div className="shrink-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 ${
                project.status.toLowerCase().includes('progress') || project.status.toLowerCase().includes('dev')
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  : project.status.toLowerCase().includes('active') || project.status.toLowerCase().includes('live')
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shrink-0" />
              <span>{project.status}</span>
            </span>
          </div>
        </div>

        {/* Title with minimum height for vertical alignment */}
        <h3
          onClick={() => onSelect(project)}
          className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer tracking-tight leading-snug min-h-[3.5rem] flex items-start"
        >
          {project.title}
        </h3>

        {/* High contrast description text */}
        <p className="text-sm text-slate-300 leading-relaxed font-normal min-h-[4rem] my-3.5">
          {project.shortDescription}
        </p>

        {/* Contribution & Problem Summary Callout Box */}
        <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/50 mb-3.5 text-xs font-mono space-y-1">
          <span className="text-purple-400 font-semibold block text-[11px] uppercase tracking-wider">
            Investigation Focus:
          </span>
          <span className="text-slate-300 leading-relaxed block">
            {project.problemAddressed}
          </span>
        </div>

        {/* Technologies as Dark Rounded Pill Tags */}
        <div className="flex flex-wrap gap-2 mb-3.5">
          {project.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="font-mono text-[11px] bg-slate-800/40 border border-slate-700/40 text-slate-300 rounded-md px-2.5 py-1 cursor-default hover:border-cyan-500/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Interactive Model Playground Trigger Button */}
        <button
          type="button"
          onClick={() => setShowPlayground((prev) => !prev)}
          className="btn-sandbox-trigger w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono font-medium text-cyan-400 cursor-pointer touch-manipulation active:scale-[0.98] transition-all"
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

      {/* Footer actions with gradient border */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="min-h-[44px] text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-medium hover:scale-105 active:scale-95 touch-manipulation"
          aria-label={`View GitHub for ${project.title}`}
        >
          <Github className="w-4 h-4" />
          <span>Code Artifacts</span>
        </a>

        <button
          onClick={() => onSelect(project)}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-semibold group/btn cursor-pointer transition-colors active:scale-95 touch-manipulation"
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
      <div className="card-featured-glow container-card group h-full rounded-[26px]">
        <div className="card-inner-elevated h-full rounded-[25px] overflow-hidden">
          {cardInnerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="card-premium container-card group flex flex-col justify-between h-full rounded-[22px] overflow-hidden">
      {cardInnerContent}
    </div>
  );
};
