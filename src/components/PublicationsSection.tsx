import React, { useState } from 'react';
import { portfolioData, TechnicalNote, AcademicPublication } from '../data/portfolioData';
import {
  BookOpen,
  PlusCircle,
  ExternalLink,
  X,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
} from 'lucide-react';
import { useToast } from './Toast';
import { ResponsiveImage } from './ResponsiveImage';
import { TechnicalNoteModal } from './TechnicalNoteModal';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { AiConceptCardGraphic } from './AiVisualIcons';

export const PublicationsSection: React.FC = () => {
  const { showToast } = useToast();
  const [selectedNote, setSelectedNote] = useState<TechnicalNote | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedPubId, setCopiedPubId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for previewing "Add publication"
  const [newTitle, setNewTitle] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newAbstract, setNewAbstract] = useState('');

  const notesCategories = ['All', 'Experiment Log', 'NLP Technical Note', 'Architecture Deep-Dive'];

  const filteredNotes =
    activeCategory === 'All'
      ? portfolioData.technicalNotes
      : portfolioData.technicalNotes.filter((n) => n.category === activeCategory);

  const currentNoteIndex = selectedNote
    ? portfolioData.technicalNotes.findIndex((n) => n.id === selectedNote.id)
    : -1;

  const handleNextNote = () => {
    if (currentNoteIndex >= 0 && currentNoteIndex < portfolioData.technicalNotes.length - 1) {
      setSelectedNote(portfolioData.technicalNotes[currentNoteIndex + 1]);
    }
  };

  const handlePrevNote = () => {
    if (currentNoteIndex > 0) {
      setSelectedNote(portfolioData.technicalNotes[currentNoteIndex - 1]);
    }
  };

  const handleCopyBibtex = (pub: AcademicPublication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedPubId(pub.id);
    showToast({
      message: 'BibTeX citation copied to clipboard!',
      type: 'success',
    });
    setTimeout(() => setCopiedPubId(null), 2000);
  };

  const handleSimulateAdd = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      message: 'Publication schema generated! Add it to src/data/portfolioData.ts to make it permanent.',
      type: 'info',
    });
    setShowAddModal(false);
  };

  return (
    <section id="publications" className="fluid-section-py px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <ScrollReveal direction="up" distance={20} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
            <span>Dissemination &amp; Technical Writing</span>
          </div>
          <h2 className="fluid-h2 font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Research Notes &amp; Publications
          </h2>
          <p className="fluid-body text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
            Scientific manuscripts, workshop preprints, empirical observations, and research experiment logs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-glass inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-slate-700 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white self-start md:self-auto cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-[#38BDF8]" />
          <span>Add Publication Schema</span>
        </button>
      </ScrollReveal>

      {/* Academic Publications & Preprints */}
      <div className="mb-14 sm:mb-16 space-y-4">
        <ScrollReveal direction="up" distance={15} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            <BookOpen className="w-4 h-4 text-[#A855F7]" />
            <span>Academic Preprints &amp; Conference Papers</span>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
            {portfolioData.academicPublications?.length || 2} Papers
          </span>
        </ScrollReveal>

        <StaggerContainer
          staggerChildren={0.09}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 w-full"
        >
          {(portfolioData.academicPublications || []).map((pub, idx) => (
            <StaggerItem
              key={pub.id}
              direction="up"
              distance={24}
              scale={0.98}
              delay={(idx % 2) * 0.08}
              className="h-full container-card"
            >
              <div className="card-premium relative flex flex-col justify-between group h-full space-y-5 overflow-hidden">
                {/* 3D Isometric Conceptual Vector Illustration Card Banner */}
                {pub.cardImage && (
                  <div className="relative w-full aspect-[16/9] max-h-48 overflow-hidden rounded-t-[22px] border-b border-white/10 bg-[#070B12]">
                    <ResponsiveImage
                      src={pub.cardImage}
                      alt={`${pub.title} 3D isometric conceptual vector visualization`}
                      wrapperClassName="w-full h-full"
                      gradientFallback="radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.20) 0%, rgba(168, 85, 247, 0.10) 45%, #070B12 100%)"
                      className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-transparent pointer-events-none" />
                    
                    {/* Micro Topic Pill */}
                    <div className="absolute bottom-2.5 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#A855F7]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                      <span>3D Isometric Manuscript Vector</span>
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
                      title={`${pub.title} Concept Graphic`}
                    >
                      <div className="card-icon-inner">
                        <AiConceptCardGraphic
                          id={idx === 0 ? 'lora_adaptation' : 'transformer_attention'}
                          containerShape="circle"
                          size="sm"
                          className="w-full h-full"
                          glow={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-7 sm:p-8 md:p-9 pt-5 sm:pt-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pr-2">
                      <span className="text-xs font-mono font-semibold text-[#A855F7] dark:text-[#C084FC] uppercase tracking-wider">
                        {pub.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-[#34D399] flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{pub.status}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {pub.title}
                    </h3>

                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mb-4 font-medium">
                      {pub.authors.join(', ')} · <span className="text-[#38BDF8]">{pub.venue}</span> ({pub.date})
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal line-clamp-3 mb-4">
                      {pub.abstract}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <a
                      href={pub.codeUrl || portfolioData.personal.github}
                      target="_blank"
                      rel="noreferrer"
                      className="min-h-[40px] inline-flex items-center gap-1.5 text-[#38BDF8] hover:text-[#7DD3FC] transition-colors font-medium hover:scale-105 active:scale-95 touch-manipulation"
                    >
                      <span>Code Artifacts</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleCopyBibtex(pub)}
                      className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-[#A855F7]/40 transition-all cursor-pointer hover:scale-105 active:scale-95 touch-manipulation"
                    >
                      {copiedPubId === pub.id ? (
                        <Check className="w-3.5 h-3.5 text-[#34D399]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedPubId === pub.id ? 'Copied' : 'BibTeX'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Technical Notes & Experiment Logs Section */}
      <div>
        <ScrollReveal direction="up" distance={18} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#38BDF8]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-900 dark:text-white font-semibold">
              Technical Notes &amp; Empirical Experiment Logs
            </h3>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-none self-start sm:self-auto max-w-full">
            {notesCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 min-h-[38px] text-xs font-mono font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 touch-manipulation ${
                    isActive
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-white shadow-md shadow-[#38BDF8]/30 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Technical Notes Grid - Increased Padding & Spaciousness */}
        <StaggerContainer
          key={activeCategory}
          staggerChildren={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {filteredNotes.map((note, idx) => (
            <StaggerItem
              key={note.id}
              direction="up"
              distance={24}
              scale={0.98}
              delay={(idx % 3) * 0.08}
              className="h-full container-card"
            >
              <div
                onClick={() => setSelectedNote(note)}
                className="card-premium relative flex flex-col justify-between cursor-pointer group h-full space-y-6 overflow-hidden active:scale-[0.98]"
              >
                {/* 3D Isometric Conceptual Vector Illustration Card Banner */}
                {note.cardImage && (
                  <div className="relative w-full aspect-[16/9] max-h-40 overflow-hidden rounded-t-[22px] border-b border-white/10 bg-[#070B12]">
                    <ResponsiveImage
                      src={note.cardImage}
                      alt={`${note.title} 3D isometric conceptual vector visualization`}
                      wrapperClassName="w-full h-full"
                      gradientFallback="radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.20) 0%, rgba(56, 189, 248, 0.10) 45%, #070B12 100%)"
                      className="group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-transparent pointer-events-none" />
                    
                    {/* Micro Topic Pill */}
                    <div className="absolute bottom-2.5 left-4 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#38BDF8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                      <span>3D Isometric Telemetry</span>
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
                      title={`${note.title} Concept Graphic`}
                    >
                      <div className="card-icon-inner">
                        <AiConceptCardGraphic
                          id={idx % 3 === 0 ? 'gradient_landscape' : idx % 3 === 1 ? 'lora_adaptation' : 'latent_embeddings'}
                          containerShape="square"
                          size="sm"
                          className="w-full h-full"
                          glow={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-3.5 pr-2">
                      <span className="text-[#38BDF8] font-semibold uppercase tracking-wider">
                        {note.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {note.readTime}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2.5 leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {note.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal line-clamp-3 mb-4">
                      {note.summary}
                    </p>

                  {/* Tags with clean contrast */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {note.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">{note.date}</span>
                  <span className="text-[#38BDF8] flex items-center gap-1 font-semibold group-hover:underline">
                    <span>Read Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Technical Note & Experiment Log Inspection Modal */}
      <TechnicalNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onSelectNext={handleNextNote}
        onSelectPrev={handlePrevNote}
        hasNext={currentNoteIndex < portfolioData.technicalNotes.length - 1}
        hasPrev={currentNoteIndex > 0}
      />

      {/* Add Publication Modal Preview */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B0F17] text-slate-100 p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-white">
                Add Publication / Preprint Template
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateAdd} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Paper Title</label>
                <input
                  type="text"
                  placeholder="e.g. Low-Rank Adaptation of Transformer Attention for..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 text-base sm:text-xs font-mono focus:outline-none focus:border-[#38BDF8] touch-manipulation"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. ACL, EMNLP, arXiv"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 text-base sm:text-xs font-mono focus:outline-none focus:border-[#38BDF8] touch-manipulation"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="text"
                    defaultValue="2026"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 text-base sm:text-xs font-mono focus:outline-none focus:border-[#38BDF8] touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Abstract Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summary of methodology, experimental setup, and quantitative evaluation..."
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 text-base sm:text-xs font-mono focus:outline-none focus:border-[#38BDF8] touch-manipulation"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glow-purple px-5 py-2 rounded-xl text-white font-medium cursor-pointer"
                >
                  Save to Local Schema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
