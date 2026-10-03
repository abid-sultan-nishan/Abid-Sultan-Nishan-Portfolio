import React, { useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';

export const TokenizerPlayground: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Adaptive parameter-efficient fine-tuning for Bengali language models using dynamic LoRA rank allocation'
  );
  const [selectedTokenizer, setSelectedTokenizer] = useState<'indic_bpe' | 'llama3_bpe' | 'wordpiece'>('indic_bpe');

  const samplePrompts = [
    { label: 'PEFT & LoRA (EN)', text: 'Adaptive parameter-efficient fine-tuning for Bengali language models using dynamic LoRA rank allocation' },
    { label: 'Morphology (BN)', text: 'আমাদের কৃত্রিম বুদ্ধিমত্তা ও ভাষা মডেলের গবেষণা এবং স্বয়ংক্রিয় মূল্যায়ন' },
    { label: 'Attention (EN/BN)', text: 'Multi-head cross-attention mechanism across low-resource Indic token representations' },
  ];

  // Simulated subword tokenization dynamics based on research data
  const tokenizedResult = useMemo(() => {
    const rawWords = inputText.trim().split(/\s+/).filter(Boolean);
    if (rawWords.length === 0) {
      return { tokens: [], fertility: 1.0, tokenCount: 0, wordCount: 0, byteFallbacks: 0 };
    }

    const tokens: { text: string; id: number; isSubword: boolean; isByte: boolean; colorIndex: number }[] = [];
    let idCounter = 1042;
    let byteFallbacks = 0;

    const colors = [
      'bg-[#A855F7]/15 border-[#A855F7]/30 text-purple-200',
      'bg-[#38BDF8]/15 border-[#38BDF8]/30 text-cyan-200',
      'bg-emerald-500/15 border-emerald-500/30 text-emerald-200',
      'bg-amber-500/15 border-amber-500/30 text-amber-200',
      'bg-pink-500/15 border-pink-500/30 text-pink-200',
      'bg-indigo-500/15 border-indigo-500/30 text-indigo-200',
    ];

    rawWords.forEach((word) => {
      // Check if word contains Indic/Bengali characters
      const isIndic = /[\u0980-\u09FF]/.test(word);

      if (isIndic) {
        if (selectedTokenizer === 'llama3_bpe') {
          // Standard Latin-skewed BPE splits Indic words heavily into 3-4 byte pieces
          const parts = word.length > 4 ? [word.slice(0, 2), word.slice(2, 4), word.slice(4)] : [word.slice(0, 2), word.slice(2)];
          parts.filter(Boolean).forEach((part, pIdx) => {
            const isByte = pIdx > 0 && Math.random() > 0.4;
            if (isByte) byteFallbacks++;
            tokens.push({
              text: isByte ? `<0x${(idCounter % 255).toString(16).toUpperCase()}>` : (pIdx > 0 ? `##${part}` : part),
              id: idCounter++,
              isSubword: pIdx > 0,
              isByte,
              colorIndex: tokens.length % colors.length,
            });
          });
        } else if (selectedTokenizer === 'indic_bpe') {
          // Custom Indic extended vocabulary merges roots + affixes gracefully
          if (word.length > 5) {
            tokens.push(
              { text: word.slice(0, word.length - 2), id: idCounter++, isSubword: false, isByte: false, colorIndex: tokens.length % colors.length },
              { text: `##${word.slice(word.length - 2)}`, id: idCounter++, isSubword: true, isByte: false, colorIndex: (tokens.length + 1) % colors.length }
            );
          } else {
            tokens.push({ text: word, id: idCounter++, isSubword: false, isByte: false, colorIndex: tokens.length % colors.length });
          }
        } else {
          // WordPiece
          const chunks = word.match(/.{1,3}/g) || [word];
          chunks.forEach((chunk, cIdx) => {
            tokens.push({
              text: cIdx === 0 ? chunk : `##${chunk}`,
              id: idCounter++,
              isSubword: cIdx > 0,
              isByte: false,
              colorIndex: tokens.length % colors.length,
            });
          });
        }
      } else {
        // English words
        if (word.length > 9) {
          const splitPt = Math.floor(word.length * 0.55);
          tokens.push(
            { text: word.slice(0, splitPt), id: idCounter++, isSubword: false, isByte: false, colorIndex: tokens.length % colors.length },
            { text: `##${word.slice(splitPt)}`, id: idCounter++, isSubword: true, isByte: false, colorIndex: (tokens.length + 1) % colors.length }
          );
        } else {
          tokens.push({ text: word, id: idCounter++, isSubword: false, isByte: false, colorIndex: tokens.length % colors.length });
        }
      }
    });

    const fertility = +(tokens.length / rawWords.length).toFixed(2);
    return { tokens, fertility, tokenCount: tokens.length, wordCount: rawWords.length, byteFallbacks };
  }, [inputText, selectedTokenizer]);

  return (
    <div className="card-premium p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-[#38BDF8] border border-slate-200 dark:border-white/10 shadow-inner">
            <Terminal className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <span>Subword Fertility Simulator &amp; Tokenizer</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-normal">
                Live NLP Tool
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono mt-0.5">
              Empirical subword fragmentation profiler for multilingual representation learning
            </p>
          </div>
        </div>

        {/* Tokenizer selection controls */}
        <div className="flex items-center gap-1 bg-white/80 dark:bg-white/[0.03] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedTokenizer('indic_bpe')}
            className={`px-3 py-2 min-h-[38px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] touch-manipulation ${
              selectedTokenizer === 'indic_bpe'
                ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-md shadow-[#A855F7]/30'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bangla-Custom BPE (+16k)
          </button>
          <button
            onClick={() => setSelectedTokenizer('llama3_bpe')}
            className={`px-3 py-2 min-h-[38px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] touch-manipulation ${
              selectedTokenizer === 'llama3_bpe'
                ? 'bg-[#38BDF8] text-slate-950 font-semibold shadow-md shadow-[#38BDF8]/30'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Llama-3 (Standard BPE)
          </button>
          <button
            onClick={() => setSelectedTokenizer('wordpiece')}
            className={`px-3 py-2 min-h-[38px] text-xs font-mono font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap hidden sm:inline-block active:scale-[0.98] touch-manipulation ${
              selectedTokenizer === 'wordpiece'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            WordPiece
          </button>
        </div>
      </div>

      {/* Input Text Box */}
      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
          <span>Corpus Input Prompt:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 dark:text-slate-500">Quick Test Prompts:</span>
            {samplePrompts.map((sample, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setInputText(sample.text)}
                className="text-[10px] px-2.5 py-1.5 min-h-[32px] rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-[#38BDF8] transition-colors cursor-pointer border border-slate-200 dark:border-white/10 active:scale-95 touch-manipulation"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any English or Bengali text to see real-time subword tokenization..."
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0F17] text-base sm:text-xs font-mono text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all touch-manipulation"
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="card-subtle p-3.5 font-mono cursor-default">
          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Subword Fertility:</div>
          <div className={`text-base font-bold mt-0.5 ${tokenizedResult.fertility > 2.0 ? 'text-amber-500' : 'text-emerald-400'}`}>
            {tokenizedResult.fertility} <span className="text-[10px] font-normal text-slate-500 dark:text-[#94A3B8]">tokens/word</span>
          </div>
        </div>

        <div className="card-subtle p-3.5 font-mono cursor-default">
          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Active Subwords:</div>
          <div className="text-base font-bold text-[#38BDF8] mt-0.5">
            {tokenizedResult.tokenCount} <span className="text-[10px] font-normal text-slate-500 dark:text-[#94A3B8]">tokens</span>
          </div>
        </div>

        <div className="card-subtle p-3.5 font-mono cursor-default">
          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Raw Words:</div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
            {tokenizedResult.wordCount} <span className="text-[10px] font-normal text-slate-500 dark:text-[#94A3B8]">words</span>
          </div>
        </div>

        <div className="card-subtle p-3.5 font-mono cursor-default">
          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Byte Fallbacks:</div>
          <div className={`text-base font-bold mt-0.5 ${tokenizedResult.byteFallbacks > 0 ? 'text-rose-400' : 'text-slate-500 dark:text-[#94A3B8]'}`}>
            {tokenizedResult.byteFallbacks} <span className="text-[10px] font-normal text-slate-500 dark:text-[#94A3B8]">glyphs</span>
          </div>
        </div>
      </div>

      {/* Token Chips Canvas */}
      <div className="card-subtle p-4 font-mono text-xs space-y-2 bg-slate-50/90 dark:bg-[#070B12]/80">
        <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] flex items-center justify-between">
          <span>Generated Subword Token Sequence:</span>
          <span className="text-slate-400 dark:text-slate-500">Hover chips for token ID</span>
        </div>

        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
          {tokenizedResult.tokens.map((tok, tIdx) => {
            const colors = [
              'bg-purple-50 dark:bg-[#A855F7]/15 text-purple-700 dark:text-purple-200 border-purple-200 dark:border-[#A855F7]/30 hover:border-purple-400 dark:hover:border-[#A855F7]',
              'bg-sky-50 dark:bg-[#38BDF8]/15 text-sky-700 dark:text-cyan-200 border-sky-200 dark:border-[#38BDF8]/30 hover:border-sky-400 dark:hover:border-[#38BDF8]',
              'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400',
              'bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-500/30 hover:border-amber-400',
              'bg-pink-50 dark:bg-pink-500/15 text-pink-700 dark:text-pink-200 border-pink-200 dark:border-pink-500/30 hover:border-pink-400',
            ];
            const colorClass = tok.isByte
              ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-200 border-rose-200 dark:border-rose-500/40 hover:border-rose-400'
              : colors[tok.colorIndex % colors.length];

            return (
              <div
                key={tIdx}
                title={`Token: "${tok.text}" | ID: ${tok.id} | ${tok.isSubword ? 'Subword Affix' : 'Root Token'}`}
                className={`group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-mono transition-all duration-200 hover:scale-105 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] cursor-default ${colorClass}`}
              >
                <span>{tok.text}</span>
                <span className="text-[10px] opacity-60 font-mono">[{tok.id}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
