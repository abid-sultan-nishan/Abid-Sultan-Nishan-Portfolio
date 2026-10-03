import React, { useState } from 'react';
import { Layers, Network, Activity, Cpu } from 'lucide-react';

export const AbstractAiVisual: React.FC = () => {
  const [activeToken, setActiveToken] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'attention' | 'architecture'>('attention');

  // Interactive tokens in the simulated contextual embedding space
  const tokens = [
    { id: 0, text: '[CLS]', x: 50, y: 70, weight: 0.92, vector: '[0.41, -0.83, ...]' },
    { id: 1, text: 'Neural', x: 125, y: 140, weight: 0.78, vector: '[0.12, 0.94, ...]' },
    { id: 2, text: 'Language', x: 230, y: 80, weight: 0.88, vector: '[-0.67, 0.31, ...]' },
    { id: 3, text: 'Model', x: 320, y: 150, weight: 0.84, vector: '[0.82, -0.15, ...]' },
    { id: 4, text: 'Weights', x: 180, y: 220, weight: 0.65, vector: '[0.05, 0.77, ...]' },
    { id: 5, text: '[SEP]', x: 350, y: 240, weight: 0.71, vector: '[-0.34, -0.49, ...]' },
  ];

  // Attention connections between tokens
  const connections = [
    { from: 0, to: 1, weight: 0.75 },
    { from: 0, to: 2, weight: 0.89 },
    { from: 1, to: 2, weight: 0.82 },
    { from: 2, to: 3, weight: 0.95 },
    { from: 1, to: 4, weight: 0.61 },
    { from: 3, to: 4, weight: 0.73 },
    { from: 3, to: 5, weight: 0.86 },
    { from: 2, to: 5, weight: 0.68 },
  ];

  return (
    <div className="relative w-full rounded-2xl border border-slate-800/80 bg-[#0B1728]/90 p-5 md:p-6 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-500/40 group">
      {/* Background ambient gradient glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl transition-opacity duration-500 group-hover:bg-violet-600/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-cyan-500/15"
        aria-hidden="true"
      />

      {/* Header bar with visual mode toggle and insignia */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-medium tracking-wider text-slate-400">
            EMBEDDING SPACE · D_MODEL=768
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#07111F] p-0.5 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setViewMode('attention')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'attention'
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Self-Attention</span>
          </button>
          <button
            onClick={() => setViewMode('architecture')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'architecture'
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Transformer Stack</span>
          </button>
        </div>
      </div>

      {viewMode === 'attention' ? (
        <div className="relative">
          {/* SVG Vector Canvas */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-[#07111F]/70 border border-slate-800/60 p-2">
            {/* Grid coordinates background */}
            <svg
              className="absolute inset-0 h-full w-full stroke-slate-800/40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />

              {/* Dynamic Attention Arcs */}
              {connections.map((conn, idx) => {
                const source = tokens.find((t) => t.id === conn.from)!;
                const target = tokens.find((t) => t.id === conn.to)!;
                const isHighlighted =
                  activeToken === null || activeToken === conn.from || activeToken === conn.to;

                return (
                  <g key={`conn-${idx}`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isHighlighted ? 'url(#line-gradient)' : '#334155'}
                      strokeWidth={isHighlighted ? (activeToken !== null ? 2.5 : 1.5) : 0.8}
                      strokeOpacity={isHighlighted ? (activeToken !== null ? 0.9 : 0.45) : 0.15}
                      strokeDasharray={isHighlighted && activeToken !== null ? '4 2' : 'none'}
                      className="transition-all duration-300"
                    />
                    {isHighlighted && activeToken !== null && (
                      <circle
                        cx={(source.x + target.x) / 2}
                        cy={(source.y + target.y) / 2}
                        r="2.5"
                        fill="#22D3EE"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Token Nodes */}
            {tokens.map((token) => {
              const isSelected = activeToken === token.id;
              return (
                <div
                  key={token.id}
                  style={{ left: `${token.x}px`, top: `${token.y}px` }}
                  onMouseEnter={() => setActiveToken(token.id)}
                  onMouseLeave={() => setActiveToken(null)}
                  onClick={() => setActiveToken(isSelected ? null : token.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Token ${token.text}`}
                >
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 border ${
                      isSelected
                        ? 'bg-violet-950/90 text-cyan-200 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-[#0D1B2A]/90 text-slate-200 border-slate-700/80 hover:border-violet-400/60'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isSelected ? 'bg-cyan-400' : 'bg-violet-400'
                      }`}
                    />
                    <span className="font-semibold">{token.text}</span>
                  </div>
                </div>
              );
            })}

            {/* Central Mathematical Formula Overlay */}
            <div className="absolute bottom-2.5 right-3 pointer-events-none rounded bg-[#07111F]/85 px-2.5 py-1.5 border border-slate-800 text-[11px] font-mono text-slate-400 tracking-tight backdrop-blur-sm">
              <span className="text-violet-400">Attention</span>(Q, K, V) = softmax(
              <span className="text-cyan-400">QKᵀ</span> / √dₖ)V
            </div>

            {/* Token inspection card */}
            <div className="absolute top-2.5 left-3 pointer-events-none rounded bg-[#07111F]/85 px-2.5 py-1.5 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-sm">
              {activeToken !== null ? (
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300">Active Node:</span>
                  <span className="text-white font-semibold">{tokens[activeToken].text}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-violet-300">{tokens[activeToken].vector}</span>
                </div>
              ) : (
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                  Hover nodes to inspect attention trajectories
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Transformer Architecture Layer View */
        <div className="space-y-2 py-1">
          <div className="p-3 rounded-lg border border-slate-800 bg-[#07111F]/80 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Layer N: Decoder / Encoder Block
              </span>
              <span className="text-[11px] text-slate-500">Residual & Norm</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80 text-[11px]">
                <div className="text-violet-400 font-medium">Multi-Head Attention</div>
                <div className="text-slate-500 mt-0.5">h = 12 heads · d_k = 64</div>
              </div>
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800/80 text-[11px]">
                <div className="text-cyan-400 font-medium">Feed-Forward (FFN)</div>
                <div className="text-slate-500 mt-0.5">d_ff = 3072 · SwiGLU / GeLU</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Adaptation: LoRA rank r=16</span>
              <span className="text-emerald-400">ΔW = B · A</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-slate-800/60 bg-[#07111F]/50 text-xs font-mono text-slate-400">
            <span>Positional Encoding (RoPE / Sinusoidal)</span>
            <span className="text-slate-500">context_len: 4096</span>
          </div>
        </div>
      )}

      {/* Footer bar with metrics */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Target Frameworks:</span>
          <span className="text-slate-300 font-medium">PyTorch · HuggingFace</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400/90">
          <span>Softmax(QKᵀ / √d)</span>
        </div>
      </div>
    </div>
  );
};
