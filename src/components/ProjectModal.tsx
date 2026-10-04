import React from 'react';
import { X, Github, ExternalLink, BookOpen, Layers, Terminal, Sparkles, CheckCircle } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { useToast } from './Toast';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { showToast } = useToast();
  if (!project) return null;

  const handleExternalClick = (e: React.MouseEvent, type: string) => {
    if (project.isPlaceholder && (type === 'demo' || type === 'docs')) {
      e.preventDefault();
      showToast({
        message: `[${type.toUpperCase()}] is an editable placeholder. Update your link in src/data/portfolioData.ts`,
        type: 'info',
      });
    }
  };

  React.useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="card-premium relative w-full max-w-2xl max-h-[92vh] max-h-[92dvh] flex flex-col text-slate-800 dark:text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#38BDF8] font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400">{project.status}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-colors cursor-pointer touch-manipulation"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] mt-2 leading-relaxed font-mono">
              {project.shortDescription}
            </p>
          </div>

          {/* Abstract Architecture Preview */}
          <div className="card-subtle p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-[#94A3B8] pb-2 border-b border-slate-200 dark:border-white/10">
              <span className="flex items-center gap-1.5 text-[#38BDF8] font-medium">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" /> Architecture Pipeline Blueprint
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">System Flow</span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 overflow-x-auto">
              <span className="text-[#38BDF8] font-semibold">Input Sequence</span> → Tokenization
              (BPE/WordPiece) → <span className="text-[#A855F7] font-semibold">Embedding + PE</span>{' '}
              → Multi-Head Attention Block → FFN (SwiGLU) →{' '}
              <span className="text-emerald-400 font-semibold">Target Output Logits</span>
            </div>
          </div>

          {/* Problem Addressed */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">
              Problem Addressed
            </h3>
            <p className="card-subtle text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-4 font-mono">
              {project.problemAddressed}
            </p>
          </div>

          {/* My Contribution */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">
              My Specific Contribution
            </h3>
            <p className="card-subtle text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-4 font-mono">
              {project.myContribution}
            </p>
          </div>

          {/* Technology Stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">
              Technologies &amp; Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="card-subtle font-mono text-xs px-3 py-1 text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/95 dark:bg-[#0B0F17]/95 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
            {project.isPlaceholder ? 'Editable research template' : 'Verified project'}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-xs font-mono text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-[#38BDF8]/40 transition-colors shadow-xs active:scale-95 touch-manipulation"
            >
              <Github className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Repository</span>
            </a>

            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                onClick={(e) => handleExternalClick(e, 'docs')}
                target="_blank"
                rel="noreferrer"
                className="btn-glass inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] rounded-xl text-xs font-mono text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white active:scale-95 touch-manipulation"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Docs</span>
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                onClick={(e) => handleExternalClick(e, 'demo')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] text-white text-xs font-mono font-medium transition-all shadow-sm shadow-[#A855F7]/30 active:scale-95 touch-manipulation"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
