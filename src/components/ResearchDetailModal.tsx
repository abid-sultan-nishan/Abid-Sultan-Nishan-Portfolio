import React, { useState } from 'react';
import { ResponsiveImage } from './ResponsiveImage';
import {
  X,
  BookOpen,
  Code,
  ExternalLink,
  Cpu,
  BarChart3,
  Layers,
  Copy,
  Check,
  Sparkles,
  Sliders,
  CheckCircle2,
  FileText,
  Terminal,
  Activity,
} from 'lucide-react';
import { portfolioData, FeaturedResearchProject } from '../data/portfolioData';
import { useToast } from './Toast';

interface ResearchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: FeaturedResearchProject;
}

export const ResearchDetailModal: React.FC<ResearchDetailModalProps> = ({
  isOpen,
  onClose,
  project = portfolioData.featuredResearchPlaceholder,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'benchmarks' | 'inspector' | 'bibtex'>('overview');
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<'attn_q' | 'attn_k' | 'attn_v' | 'attn_o' | 'mlp_gate' | 'mlp_up'>('attn_q');

  if (!isOpen) return null;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(project.bibtex);
    setCopiedBibtex(true);
    showToast({
      message: 'BibTeX citation copied to clipboard!',
      type: 'success',
    });
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const layerRankData = {
    attn_q: { name: 'Self-Attention Q Projection (W_q)', initialRank: 32, finalRank: 24, variance: 'High (0.84)', status: 'High Salience', saved: '25%' },
    attn_k: { name: 'Self-Attention K Projection (W_k)', initialRank: 32, finalRank: 16, variance: 'Moderate (0.52)', status: 'Standard Salience', saved: '50%' },
    attn_v: { name: 'Self-Attention V Projection (W_v)', initialRank: 32, finalRank: 24, variance: 'High (0.79)', status: 'High Salience', saved: '25%' },
    attn_o: { name: 'Self-Attention Output Projection (W_o)', initialRank: 32, finalRank: 12, variance: 'Moderate (0.41)', status: 'Standard Salience', saved: '62.5%' },
    mlp_gate: { name: 'Feed-Forward Gate Projection (W_gate)', initialRank: 32, finalRank: 8, variance: 'Low (0.19)', status: 'Pruned / Sparse', saved: '75%' },
    mlp_up: { name: 'Feed-Forward Up Projection (W_up)', initialRank: 32, finalRank: 8, variance: 'Low (0.22)', status: 'Pruned / Sparse', saved: '75%' },
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3.5 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/95 dark:bg-[#070B14]/95">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#A855F7]/15 text-[#A855F7] font-mono font-bold text-xs sm:text-sm border border-[#A855F7]/30">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#A855F7]/15 text-[#A855F7] dark:text-purple-300 border border-[#A855F7]/30">
                  {project.category}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#38BDF8] truncate">
                  {project.arxivId}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 truncate max-w-[190px] sm:max-w-md lg:max-w-lg mt-0.5">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06] active:scale-95 transition-colors cursor-pointer touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-[#0E1524] overflow-x-auto scrollbar-none max-w-full">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'overview'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Abstract &amp; Formulation</span>
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'benchmarks'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Empirical Benchmarks</span>
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'inspector'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Dynamic Rank Inspector</span>
          </button>
          <button
            onClick={() => setActiveTab('bibtex')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'bibtex'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>BibTeX Citation</span>
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-slate-50 dark:bg-[#091424]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 3D Isometric Conceptual Vector Illustration Hero Banner */}
              {project.cardImage && (
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] max-h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#070B12] shadow-xl">
                  <ResponsiveImage
                    src={project.cardImage}
                    alt={`${project.title} 3D isometric conceptual vector visualization`}
                    wrapperClassName="w-full h-full"
                    className="object-cover object-center"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Metric Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/80 shadow-xs dark:shadow-none">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {m.label}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                      {m.comparison}
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Abstract */}
              <div className="p-5 rounded-xl border border-violet-200 dark:border-violet-500/20 bg-white dark:bg-[#0D1B2A]/60 space-y-3 shadow-xs dark:shadow-none">
                <div className="flex items-center justify-between text-xs font-mono text-violet-700 dark:text-violet-400 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Scientific Abstract</span>
                  </span>
                  <span className="text-slate-500">Peer Review Submission Draft</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {project.abstract}
                </p>
              </div>

              {/* Mathematical Formulation */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07111F]/80 space-y-3 shadow-xs dark:shadow-none">
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                  Mathematical Formulation: Dynamic Rank Adaptation
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  In classical LoRA, the modified weight matrix W &isin; ℝ<sup>d &times; k</sup> is represented as:
                </p>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 font-mono text-xs text-violet-700 dark:text-violet-300 overflow-x-auto">
                  {'W = W₀ + ΔW = W₀ + (α / r) · B · A,   where B ∈ ℝ^(d × r), A ∈ ℝ^(r × k)'}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  AdaLoRA-Indic dynamically assigns layer-specific rank r_i based on moving-average gradient sensitivity and singular values σ_j:
                </p>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 font-mono text-xs text-cyan-700 dark:text-cyan-300 overflow-x-auto">
                  {'S_{i,j} = σ_{i,j} · E[ ||∇_{P_{i,j}} L||₂ ],   r_i = Σ 𝕀(S_{i,j} ≥ τ_t)'}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  During warmup steps t &isin; [100, 800], threshold &tau;<sub>t</sub> gradually prunes sub-salient adapters in MLP layers while preserving high-capacity ranks for self-attention heads responsible for low-resource morphological resolution.
                </p>
              </div>

              {/* Research Methodology & Datasets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/60 space-y-2 shadow-xs dark:shadow-none">
                  <div className="text-xs font-mono text-violet-700 dark:text-violet-400 font-semibold uppercase">
                    Methodology &amp; Quantization
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.methodology}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/60 space-y-2 shadow-xs dark:shadow-none">
                  <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold uppercase">
                    Benchmark Suite &amp; Datasets
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.datasetOrBenchmark}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benchmarks' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Bengali UltraFeedback &amp; IndicGLUE Evaluation Benchmark</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Lower PPL = Better / Higher ROUGE = Better</span>
              </div>

              {/* Ablation Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07111F] shadow-xs dark:shadow-none">
                <table className="w-full text-left text-xs font-mono min-w-[540px]">
                  <thead className="bg-slate-100 dark:bg-[#0B1728] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3 font-semibold">Architecture Variant</th>
                      <th className="p-3 font-semibold">Trainable Params</th>
                      <th className="p-3 font-semibold">VRAM Peak</th>
                      <th className="p-3 font-semibold">Val PPL (BN)</th>
                      <th className="p-3 font-semibold">ROUGE-L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                    {project.ablationTable.map((row, idx) => {
                      const isProposed = row.variant.includes('Proposed');
                      return (
                        <tr
                          key={idx}
                          className={isProposed ? 'bg-violet-50 text-cyan-900 font-semibold dark:bg-violet-950/40 dark:text-cyan-200' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}
                        >
                          <td className="p-3 flex items-center gap-2">
                            {isProposed && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />}
                            <span>{row.variant}</span>
                          </td>
                          <td className="p-3">{row.params}</td>
                          <td className="p-3">{row.vram}</td>
                          <td className="p-3 text-emerald-700 dark:text-emerald-400 font-medium">{row.ppl}</td>
                          <td className="p-3 text-cyan-700 dark:text-cyan-300 font-medium">{row.rougeL}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Hyperparameter Settings */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/60 space-y-3 shadow-xs dark:shadow-none">
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                  Experimental Hyperparameter Configuration
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {project.hyperparameters.map((hp, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#07111F] border border-slate-200 dark:border-slate-800 flex justify-between gap-2">
                      <span className="text-slate-500 dark:text-slate-400">{hp.param}:</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium text-right">{hp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inspector' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/60 text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-xs dark:shadow-none">
                <div className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">Interactive Layer-Wise Rank Allocation Visualizer</div>
                <p className="text-slate-500 dark:text-slate-400">
                  Select a projection module below to view how AdaLoRA-Indic dynamically assigns adapter rank based on empirical gradient variance.
                </p>
              </div>

              {/* Layer Selection Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(layerRankData) as (keyof typeof layerRankData)[]).map((key) => {
                  const item = layerRankData[key];
                  const isSelected = selectedLayer === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedLayer(key)}
                      className={`p-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-900 dark:bg-cyan-950/30 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07111F] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{key.toUpperCase()}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{item.name}</div>
                      <div className="flex items-center justify-between text-[10px] mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                        <span className="text-cyan-700 dark:text-cyan-400 font-medium">Rank: r={item.finalRank}</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">-{item.saved}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Layer Detailed Panel */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07111F] space-y-4 shadow-xs dark:shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {layerRankData[selectedLayer].name}
                    </h4>
                    <span className="text-xs font-mono text-violet-700 dark:text-violet-400">
                      Classification: {layerRankData[selectedLayer].status}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-mono text-xs self-start sm:self-auto font-medium">
                    Parameter Savings: {layerRankData[selectedLayer].saved}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Initial Uniform Rank (r_init):</span>
                    <span className="text-slate-800 dark:text-slate-200">r={layerRankData[selectedLayer].initialRank}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-slate-400 dark:bg-slate-600 rounded-full" style={{ width: '100%' }} />
                  </div>

                  <div className="flex justify-between text-xs font-mono pt-2">
                    <span className="text-cyan-700 dark:text-cyan-400">Dynamic Allocated Rank:</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold">r={layerRankData[selectedLayer].finalRank}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${(layerRankData[selectedLayer].finalRank / 32) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Observed Gradient Variance (E[||∇W||]):</span>
                    <span className="text-slate-900 dark:text-slate-200">{layerRankData[selectedLayer].variance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SVD Eigenvalue Thresholding:</span>
                    <span className="text-slate-900 dark:text-slate-200">Active (Moving Avg Window = 50 steps)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bibtex' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">BibTeX Citation Entry</span>
                <button
                  onClick={handleCopyBibtex}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors cursor-pointer shadow-sm"
                >
                  {copiedBibtex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBibtex ? 'Copied!' : 'Copy BibTeX'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl border border-slate-800 bg-[#07111F] text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                {project.bibtex}
              </pre>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1B2A]/60 space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400 shadow-xs dark:shadow-none">
                <div className="text-slate-900 dark:text-slate-200 font-semibold">Preprint Access &amp; Open Source Artifacts</div>
                <p>
                  Full experimental codebase, training scripts, checkpoint weights, and evaluation harness are published under MIT License.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#07111F] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500 transition-colors"
                  >
                    <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-[#07111F] text-xs text-slate-500 font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Research Study Artifact · Abid Sultan Nishan</span>
          </div>
          <button
            onClick={onClose}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
