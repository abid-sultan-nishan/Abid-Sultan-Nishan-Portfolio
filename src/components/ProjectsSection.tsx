import React, { useState } from 'react';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { TokenizerPlayground } from './TokenizerPlayground';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'NLP', 'LLMs', 'Deep Learning', 'Machine Learning'];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 w-full">
      {/* Section Header with Segmented Filter Controls */}
      <ScrollReveal direction="up" distance={20} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
            <span>Exploration &amp; Technical Implementations</span>
          </div>
          <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Selected Work
          </h2>
          <p className="fluid-body text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
            Modular experimentation prototypes, architecture pipelines, and research implementations.
          </p>
        </div>

        {/* Filter Controls (Executive Glass Segmented Buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/80 dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-none self-start md:self-auto shadow-sm max-w-full">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-3.5 sm:px-4 py-2 min-h-[40px] text-xs font-mono font-medium rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-md shadow-[#A855F7]/30 font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      <StaggerContainer
        key={activeFilter}
        staggerChildren={0.07}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {filteredProjects.map((project, idx) => (
          <StaggerItem
            key={project.id}
            direction="up"
            distance={24}
            scale={0.98}
            delay={(idx % 3) * 0.08}
            className={project.isFeatured ? 'md:col-span-2 h-full' : 'h-full'}
          >
            <ProjectCard
              project={project}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Interactive NLP Tokenizer Simulator in Selected Work */}
      <ScrollReveal direction="up" distance={24} duration={0.65} className="pt-4">
        <TokenizerPlayground />
      </ScrollReveal>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
