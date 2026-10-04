import React, { useState } from 'react';
import { portfolioData, AcademicMilestone } from '../data/portfolioData';
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Users,
  Compass,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  Milestone,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { ResponsiveImage } from './ResponsiveImage';

export const EducationSection: React.FC = () => {
  const edu = portfolioData.education[0];
  const milestones = portfolioData.academicMilestones || [];

  // Interactive milestone state
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    'm-2025': true,
    'm-2026': true,
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Target Objective'>('All');

  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    milestones.forEach((m) => {
      allExpanded[m.id] = true;
    });
    setExpandedMilestones(allExpanded);
  };

  const collapseAll = () => {
    setExpandedMilestones({});
  };

  const filteredMilestones = milestones.filter((m) => {
    if (activeFilter === 'All') return true;
    return m.status === activeFilter;
  });

  const getStatusBadge = (status: AcademicMilestone['status']) => {
    switch (status) {
      case 'Completed':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
          classes: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
        };
      case 'In Progress':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-sky-500 animate-spin" />,
          classes: 'bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40',
        };
      case 'Target Objective':
      default:
        return {
          icon: <Target className="w-3.5 h-3.5 text-amber-500" />,
          classes: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40',
        };
    }
  };

  return (
    <section id="education" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-10 sm:mb-12">
        <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
          <span>Academic Foundation &amp; Trajectory</span>
        </div>
        <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Education &amp; Interactive Timeline
        </h2>
        <p className="fluid-body text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal">
          Rigorous foundational studies in Computer Science &amp; Engineering at Uttara University, traced across four progressive research and technical milestones.
        </p>
      </ScrollReveal>

      {/* Degree & Core University Overview Card */}
      <ScrollReveal direction="up" distance={24} duration={0.65} className="mb-14">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#38BDF8] ml-2 sm:ml-4">
          <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-white dark:bg-[#0B0F17] border-2 border-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.7)]" />

          <div className="card-premium container-card group relative p-6 sm:p-7 space-y-4 rounded-[22px] overflow-hidden">
            {/* 3D Isometric Conceptual Vector Illustration Card Banner */}
            {edu.cardImage && (
              <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] max-h-48 overflow-hidden rounded-t-[21px] border-b border-slate-800/80 bg-[#070B12] -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5">
                <ResponsiveImage
                  src={edu.cardImage}
                  alt={`${edu.degree} 3D isometric conceptual illustration`}
                  wrapperClassName="w-full h-full"
                  gradientFallback="radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.2) 0%, rgba(168, 85, 247, 0.1) 45%, #070B12 100%)"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>
            )}

            {/* Degree & Institution */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase block">
                    01 // UNDERGRADUATE DEGREE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-cyan-500/10 text-cyan-300 border-cyan-500/20 inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shrink-0" />
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.statusBadge}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {edu.degree}
                </h3>
                <div className="text-base text-purple-400 font-medium mt-1">
                  {edu.institution}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#C084FC]" />
                  <span>{edu.period}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-[#94A3B8]">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                  <span>{edu.location}</span>
                </span>
              </div>
            </div>

            {/* Subsections Grid: Coursework, Achievements, Activities, Research */}
            <StaggerContainer
              staggerChildren={0.08}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2"
            >
              {/* Relevant Coursework */}
              <StaggerItem direction="up" distance={16} delay={0.05}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    <BookOpen className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7]" />
                    <span>Relevant Coursework</span>
                  </div>
                  <div className="card-subtle p-4 text-xs font-mono space-y-1.5">
                    {edu.relevantCoursework.map((course, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-[#94A3B8]">
                        <span className="text-[#0284C7] dark:text-[#38BDF8] select-none font-bold">›</span>
                        <span className={course.startsWith('[') ? 'text-amber-700 dark:text-amber-400 font-medium' : 'text-slate-800 dark:text-slate-200 font-medium'}>
                          {course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Academic Achievements */}
              <StaggerItem direction="up" distance={16} delay={0.1}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Academic Achievements</span>
                  </div>
                  <div className="card-subtle p-4 text-xs font-mono text-slate-700 dark:text-[#94A3B8] space-y-2">
                    {edu.academicAchievements.map((item, idx) => (
                      <div key={idx} className="text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                        ● {item}
                      </div>
                    ))}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      Honest policy: No unverified GPA or awards are listed until officially certified.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Student Activities */}
              <StaggerItem direction="up" distance={16} delay={0.15}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    <Users className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                    <span>Student Activities</span>
                  </div>
                  <div className="card-subtle p-4 text-xs font-mono text-slate-700 dark:text-[#94A3B8] space-y-2">
                    {edu.studentActivities.map((act, idx) => (
                      <div key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        › {act}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Research or Club Involvement */}
              <StaggerItem direction="up" distance={16} delay={0.2}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    <Compass className="w-4 h-4 text-[#059669] dark:text-[#34D399]" />
                    <span>Research &amp; Club Involvement</span>
                  </div>
                  <div className="card-subtle p-4 text-xs font-mono text-slate-700 dark:text-[#94A3B8] space-y-2">
                    {edu.researchOrClubInvolvement.map((inv, idx) => (
                      <div key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        › {inv}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </ScrollReveal>

      {/* Dynamic Interactive Milestones & Research Evolution */}
      <ScrollReveal direction="up" distance={20} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
              <Milestone className="w-4 h-4" />
              <span>Year-by-Year Academic Evolution</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Interactive Milestone Journey (2024–2027)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filters */}
            {(['All', 'Completed', 'In Progress', 'Target Objective'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer border ${
                  activeFilter === filter
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}

            <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-slate-200 dark:border-white/10 pl-3">
              <button
                type="button"
                onClick={expandAll}
                className="text-[11px] font-mono text-slate-500 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-[11px] font-mono text-slate-500 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Cards Timeline Grid */}
        <div className="space-y-4">
          {filteredMilestones.map((m) => {
            const isExpanded = !!expandedMilestones[m.id];
            const badge = getStatusBadge(m.status);

            return (
              <div
                key={m.id}
                className={`card-premium p-5 sm:p-6 rounded-[20px] overflow-hidden ${
                  isExpanded ? 'ring-1 ring-[#0284C7]/20 dark:ring-[#38BDF8]/20 shadow-md' : ''
                }`}
              >
                <div
                  onClick={() => toggleMilestone(m.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Year badge circle */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-sky-300/40 dark:border-sky-500/30 text-slate-900 dark:text-white font-mono font-bold text-sm shadow-xs">
                      {m.year}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${badge.classes}`}>
                          {badge.icon}
                          <span>{m.status}</span>
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {m.period}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#7C3AED] dark:text-[#C084FC] font-medium mt-0.5">
                        {m.focusArea} · <span className="text-slate-500 dark:text-slate-400 font-normal">{m.institution}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {isExpanded ? 'Hide Details' : 'View Achievements'}
                    </span>
                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-white/[0.12] transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in duration-200">
                    {m.cardImage && (
                      <div className="relative w-full aspect-[21/9] sm:aspect-[28/9] max-h-40 overflow-hidden rounded-xl border border-white/10 bg-[#070B12] mb-3">
                        <ResponsiveImage
                          src={m.cardImage}
                          alt={`${m.title} isometric milestone illustration`}
                          wrapperClassName="w-full h-full"
                          gradientFallback="radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.18) 0%, rgba(168, 85, 247, 0.10) 45%, #070B12 100%)"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-transparent pointer-events-none" />
                      </div>
                    )}
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {m.summary}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Key Academic &amp; Research Milestones:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {m.detailedAchievements.map((ach, aIdx) => (
                          <div
                            key={aIdx}
                            className="card-subtle p-3.5 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-[#0284C7] dark:text-[#38BDF8] font-bold select-none mt-0.5">›</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2">
                        Competencies acquired:
                      </span>
                      {m.keyCompetencies.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
};

