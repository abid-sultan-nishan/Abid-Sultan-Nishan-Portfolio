import React, { useState } from 'react';
import { ResponsiveImage } from './ResponsiveImage';
import {
  X,
  Code,
  Terminal,
  Cpu,
  BarChart3,
  Copy,
  Check,
  Tag,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { TechnicalNote } from '../data/portfolioData';
import { useToast } from './Toast';

interface TechnicalNoteModalProps {
  note: TechnicalNote | null;
  onClose: () => void;
  onSelectNext?: () => void;
  onSelectPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const TechnicalNoteModal: React.FC<TechnicalNoteModalProps> = ({
  note,
  onClose,
  onSelectNext,
  onSelectPrev,
  hasNext,
  hasPrev,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'terminal'>('notes');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  if (!note) return null;

  const handleCopyCode = () => {
    if (note.codeSnippet) {
      navigator.clipboard.writeText(note.codeSnippet.code);
      setCopiedCode(true);
      showToast({
        message: 'Code snippet copied to clipboard!',
        type: 'success',
      });
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyMarkdown = () => {
    const md = `# ${note.title}
**Category:** ${note.category} | **Date:** ${note.date} | **Read Time:** ${note.readTime}
**Tags:** ${note.tags.join(', ')}

## Summary
${note.summary}

## Hypothesis / Objective
${note.hypothesisOrObjective}

## Hardware & Environment
${note.hardwareAndSetup}

## Key Findings
${note.keyFindings.map((f) => `- ${f}`).join('\n')}

## Researcher Takeaways
${note.takeaways}
`;
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    showToast({
      message: 'Full Technical Note markdown copied to clipboard!',
      type: 'success',
    });
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  React.useEffect(() => {
    if (!note) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [note, onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="card-premium relative w-full max-w-4xl max-h-[92vh] max-h-[92dvh] flex flex-col text-slate-800 dark:text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3.5 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] font-mono font-bold text-xs sm:text-sm border border-[#38BDF8]/20">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                  {note.category}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#A855F7]" />
                  {note.date}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] flex items-center gap-1 hidden xs:flex">
                  <Clock className="w-3 h-3 text-[#38BDF8]" />
                  {note.readTime}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white truncate max-w-[190px] sm:max-w-md lg:max-w-lg mt-0.5">
                {note.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] text-xs font-mono text-slate-700 dark:text-[#94A3B8] bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white active:scale-95 rounded-xl border border-slate-200 dark:border-white/10 transition-colors cursor-pointer touch-manipulation"
              title="Copy note as markdown"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedMarkdown ? 'Copied' : 'Copy MD'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-colors cursor-pointer touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-[#0F172A]/70 overflow-x-auto max-w-full">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-md shadow-[#A855F7]/30 font-semibold'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Observations &amp; Findings</span>
            </button>

            {note.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
                  activeTab === 'code'
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-white shadow-md shadow-[#38BDF8]/30 font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>PyTorch Snippet</span>
              </button>
            )}

            {note.terminalLog && (
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
                  activeTab === 'terminal'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 font-semibold'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CUDA Log</span>
              </button>
            )}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-[#94A3B8]">
            {onSelectPrev && (
              <button
                onClick={onSelectPrev}
                disabled={!hasPrev}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Previous Note"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onSelectNext && (
              <button
                onClick={onSelectNext}
                disabled={!hasNext}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Next Note"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-slate-50 dark:bg-[#070B14]">
          {/* 3D Isometric Conceptual Vector Illustration Hero Banner */}
          {note.cardImage && (
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] max-h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#070B12] shadow-xl">
              <ResponsiveImage
                src={note.cardImage}
                alt={`${note.title} 3D isometric conceptual vector visualization`}
                wrapperClassName="w-full h-full"
                className="object-cover object-center"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-mono bg-white dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              >
                <Tag className="w-3 h-3 text-[#38BDF8]" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="card-subtle p-5 sm:p-6 space-y-2">
                <div className="text-xs font-mono text-[#38BDF8] font-semibold uppercase tracking-wider">
                  Summary &amp; Context
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {note.summary}
                </p>
              </div>

              {/* Hypothesis & Experimental Objective */}
              <div className="card-subtle p-5 sm:p-6 space-y-2 border-[#A855F7]/30 dark:border-[#A855F7]/30 bg-[#A855F7]/[0.03]">
                <div className="text-xs font-mono text-[#A855F7] dark:text-[#C084FC] font-semibold uppercase tracking-wider">
                  Empirical Hypothesis &amp; Objective
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                  {note.hypothesisOrObjective}
                </p>
              </div>

              {/* Hardware & Setup */}
              <div className="card-subtle p-4 flex items-start gap-3">
                <Cpu className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono text-slate-800 dark:text-slate-300 font-semibold mb-1">
                    Hardware &amp; Execution Environment:
                  </div>
                  <div className="text-xs font-mono text-slate-600 dark:text-[#94A3B8]">
                    {note.hardwareAndSetup}
                  </div>
                </div>
              </div>

              {/* Key Empirical Findings */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider">
                  Key Observations &amp; Quantitative Findings
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {note.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="card-subtle p-3.5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-mono">
                        {finding}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Table if present */}
              {note.metricsTable && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Benchmark Comparison Data</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827]/70">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-[#94A3B8] border-b border-slate-200 dark:border-white/10">
                        <tr>
                          <th className="p-3 font-semibold">Evaluated Metric</th>
                          <th className="p-3 font-semibold">Standard Baseline</th>
                          <th className="p-3 font-semibold">Experimental Result</th>
                          <th className="p-3 font-semibold">Delta / Gain</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-slate-700 dark:text-slate-300">
                        {note.metricsTable.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                            <td className="p-3 font-medium text-slate-900 dark:text-white">{m.metric}</td>
                            <td className="p-3 text-slate-500 dark:text-[#94A3B8]">{m.baseline}</td>
                            <td className="p-3 text-[#38BDF8] font-medium">{m.experiment}</td>
                            <td className="p-3 text-emerald-400 font-semibold">{m.delta}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Core Takeaways */}
              <div className="p-5 rounded-2xl border border-[#A855F7]/30 dark:border-[#A855F7]/30 bg-[#A855F7]/[0.04] space-y-1.5">
                <div className="text-xs font-mono text-[#A855F7] dark:text-[#C084FC] font-semibold uppercase tracking-wider">
                  Researcher Takeaway &amp; Next Steps
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {note.takeaways}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && note.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-[#94A3B8] flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{note.codeSnippet.filename}</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] text-white font-medium transition-all cursor-pointer shadow-sm shadow-[#A855F7]/30"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#070B12] text-cyan-200 text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
                <code>{note.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {activeTab === 'terminal' && note.terminalLog && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-[#94A3B8] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PyTorch / CUDA Execution Standard Output</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Live Session Trace</span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#070B12] font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto shadow-inner">
                {note.terminalLog.map((line, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      line.includes('★') || line.includes('HIGH CONFIDENCE')
                        ? 'text-emerald-400 font-semibold'
                        : line.includes('TRIGGERED') || line.includes('CATASTROPHIC')
                        ? 'text-rose-400 font-semibold'
                        : line.startsWith('[BENCHMARK]') || line.startsWith('[STEP')
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95 text-xs text-slate-600 dark:text-[#94A3B8] font-mono flex items-center justify-between">
          <span>Technical Note ID: {note.id} · Verified Empirical Protocol</span>
          <button
            onClick={onClose}
            className="text-[#38BDF8] hover:text-[#38BDF8]/80 font-medium cursor-pointer"
          >
            Close Note
          </button>
        </div>
      </div>
    </div>
  );
};
