import React, { useState } from 'react';
import {
  X,
  Box,
  Circle,
  Sparkles,
  Copy,
  Check,
  Code,
  Layers,
  Cpu,
  Compass,
  ArrowRight,
  Maximize2,
  ExternalLink,
  Eye,
  Sliders,
} from 'lucide-react';
import { useToast } from './Toast';
import {
  AiConceptCardGraphic,
  AiConceptId,
  generatedAiAssetMap,
  coreResearchIllustrations,
  researchTopicIllustrations,
  NeuralMeshVector,
  TransformerAttentionVector,
  LowRankAdaptationVector,
  LossLandscapeVector,
  LatentEmbeddingsVector,
} from './AiVisualIcons';
import { ResponsiveImage } from './ResponsiveImage';

interface AiConceptIllustrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConceptDetail {
  id: AiConceptId;
  name: string;
  category: string;
  palette: string;
  description: string;
  mathBasis: string;
  appliedIn: string;
  vectorComponent: React.ReactNode;
}

export const AiConceptIllustrationsModal: React.FC<AiConceptIllustrationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [activeMainTab, setActiveMainTab] = useState<'core_research' | 'topic_backgrounds' | 'vector_mechanics'>('core_research');
  const [selectedCoreIndex, setSelectedCoreIndex] = useState<number>(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [selectedConceptId, setSelectedConceptId] = useState<AiConceptId>('neural_mesh');
  const [containerShape, setContainerShape] = useState<'circle' | 'square'>('square');
  const [renderMode, setRenderMode] = useState<'vector' | 'generative'>('generative');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedImagePath, setCopiedImagePath] = useState(false);

  if (!isOpen) return null;

  const activeCore = coreResearchIllustrations[selectedCoreIndex] || coreResearchIllustrations[0];
  const activeTopic = researchTopicIllustrations[selectedTopicIndex] || researchTopicIllustrations[0];

  const handleCopyImagePath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedImagePath(true);
    showToast({
      message: 'Image asset path copied to clipboard!',
      type: 'success',
    });
    setTimeout(() => setCopiedImagePath(false), 2000);
  };

  const conceptDetails: Record<AiConceptId, ConceptDetail> = {
    neural_mesh: {
      id: 'neural_mesh',
      name: 'Deep Neural Synaptic Lattice',
      category: 'Deep Learning & Neural Architectures',
      palette: 'Cyan (#38BDF8), Electric Purple (#A855F7), Royal Blue (#3B82F6)',
      description:
        'A high-tech, abstract vector line-art conceptual graphic illustrating multi-layered perceptron tensor activations, forward-backward propagation pathways, and holographic node resonance without any alphanumeric characters.',
      mathBasis:
        'Activation tensor mapping h^{(l)} = sigma(W^{(l)} h^{(l-1)} + b^{(l)}) across deep parameter topologies with gradient backpropagation vectors.',
      appliedIn: 'Featured in Research Area 01 (NLP & Representations) and IndicGLUE multilingual benchmarks.',
      vectorComponent: <NeuralMeshVector />,
    },
    transformer_attention: {
      id: 'transformer_attention',
      name: 'Transformer Multi-Head Self-Attention',
      category: 'Large Language Models (LLMs)',
      palette: 'Neon Cyan (#38BDF8), Violet Purple (#A855F7), Cyber Cobalt (#3B82F6)',
      description:
        'A geometric, futuristic line-art illustration of multi-head query-key-value (Q-K-V) projection rays, concentric radial attention arcs, and contextual token relation webs.',
      mathBasis:
        'Softmax(Q K^T / sqrt(d_k)) V across 8-head projected sub-spaces with cross-attention token chord interactions.',
      appliedIn: 'Featured in Research Area 02 (Large Language Models) and BanglishBERT pretraining.',
      vectorComponent: <TransformerAttentionVector />,
    },
    lora_adaptation: {
      id: 'lora_adaptation',
      name: 'Parameter-Efficient LoRA Matrix Factorization',
      category: 'Model Adaptation & Efficiency (PEFT)',
      palette: 'Cyan (#38BDF8), Vibrant Purple (#A855F7), Luminous Blue (#3B82F6)',
      description:
        'A precision orthogonal matrix factorization graphic displaying frozen foundation weight tensor W0 alongside thin rank-r projection matrices B and A with glowing gradient bypass circuits.',
      mathBasis:
        'Weight update delta W = (alpha / r) (B x A), where B in R^{d x r} and A in R^{r x k} with r << min(d, k).',
      appliedIn: 'Featured in AdaLoRA-Indic Research Study and DynamicLoRA project cards.',
      vectorComponent: <LowRankAdaptationVector />,
    },
    gradient_landscape: {
      id: 'gradient_landscape',
      name: 'Optimization Loss Manifold & SGD Trajectory',
      category: 'Data Science & Mathematical Foundations',
      palette: 'Ultraviolet Purple (#A855F7), Cyan (#38BDF8), Deep Azure (#3B82F6)',
      description:
        'A topographic wireframe 3D loss contour manifold displaying saddle point geometry, momentum step checkpoints, and stochastic gradient descent descent into global minimum basin.',
      mathBasis:
        'Parameter update theta_{t+1} = theta_t - eta nabla L(theta_t) + gamma v_t converging along non-convex empirical risk surface.',
      appliedIn: 'Featured in Deep Learning Foundations and BengaliTokenizer convergence diagnostics.',
      vectorComponent: <LossLandscapeVector />,
    },
    latent_embeddings: {
      id: 'latent_embeddings',
      name: 'High-Dimensional Latent Embedding Space',
      category: 'Vector Retrieval & Knowledge Indexing (RAG)',
      palette: 'Glowing Cyan (#38BDF8), Soft Purple (#A855F7), Cyber Blue (#3B82F6)',
      description:
        'A futuristic vector geometry showing cosine similarity clusters, hyper-plane separating boundaries, and radial nearest-neighbor retrieval rays.',
      mathBasis:
        'Cosine metric cos(u, v) = (u . v) / (||u|| ||v||) within d-dimensional dense vector space indexed by HNSW graph lattice.',
      appliedIn: 'Featured in NeuroVector RAG project card and Applied ML research direction.',
      vectorComponent: <LatentEmbeddingsVector />,
    },
    tokenizer_graph: {
      id: 'tokenizer_graph',
      name: 'Subword Segmentation & Byte-Pair Tree',
      category: 'Tokenization & Natural Language Processing',
      palette: 'Cyan (#38BDF8), Electric Purple (#A855F7), Cobalt (#3B82F6)',
      description:
        'Abstract hierarchical vector line tree showing subword vocabulary merge operations, token lattice boundaries, and fertility compression.',
      mathBasis: 'Optimal vocabulary V* minimizing sequence entropy H(S | V) over corpus byte sequences.',
      appliedIn: 'Featured in BengaliTokenizer subword fertility simulator.',
      vectorComponent: <LatentEmbeddingsVector />,
    },
  };

  const currentConcept = conceptDetails[selectedConceptId];

  const handleCopySvg = () => {
    navigator.clipboard.writeText(
      `<AiConceptCardGraphic id="${selectedConceptId}" containerShape="${containerShape}" size="md" glow={true} />`
    );
    setCopiedCode(true);
    showToast({
      message: `Copied graphic JSX code for ${currentConcept.name}`,
      type: 'success',
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-premium relative w-full max-w-4xl max-h-[92vh] max-h-[92dvh] flex flex-col text-slate-800 dark:text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-white/10 shrink-0 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7]/25 to-[#38BDF8]/25 text-[#38BDF8] border border-white/10 shadow-inner">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-lg font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="truncate">AI Conceptual Illustrations &amp; Card Backgrounds</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 shrink-0">
                  12 3D Isometric Vectors
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-[#94A3B8] truncate hidden xs:block">
                Dark tech-themed 3D isometric conceptual data visualizations with deep navy, glowing neon purple, cyan, and teal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-colors cursor-pointer shrink-0 touch-manipulation"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Tab Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-[#0E1524] overflow-x-auto scrollbar-none max-w-full">
          <button
            onClick={() => setActiveMainTab('core_research')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[38px] sm:min-h-[40px] text-xs font-mono font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeMainTab === 'core_research'
                ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white shadow-md shadow-[#A855F7]/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>7 Core Research Directions</span>
          </button>

          <button
            onClick={() => setActiveMainTab('topic_backgrounds')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[38px] sm:min-h-[40px] text-xs font-mono font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeMainTab === 'topic_backgrounds'
                ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-white shadow-md shadow-[#38BDF8]/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>12 Card Backgrounds</span>
          </button>

          <button
            onClick={() => setActiveMainTab('vector_mechanics')}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[38px] sm:min-h-[40px] text-xs font-mono font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation ${
              activeMainTab === 'vector_mechanics'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.04]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Vector Line-Art &amp; Math</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeMainTab === 'core_research' ? (
            <div className="space-y-6 animate-fade-in">
              {/* Selected Core Research Visual Full Showcase */}
              <div className="card-premium p-6 sm:p-7 relative overflow-hidden bg-[#070B12] border-white/15">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: 4:3 Image Preview */}
                  <div className="lg:col-span-7 relative aspect-[4/3] w-full max-h-80 overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black group/preview">
                    <ResponsiveImage
                      src={activeCore.image}
                      alt={`${activeCore.topic} 3D isometric conceptual illustration`}
                      wrapperClassName="w-full h-full"
                      className="group-hover/preview:scale-105 transition-transform duration-500"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/85 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Right: Topic Specs */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30 font-semibold">
                          {activeCore.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Direction {selectedCoreIndex + 1} of 7
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                        {activeCore.topic}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                        {activeCore.description}
                      </p>

                      {/* Palette specification card */}
                      <div className="card-subtle p-3 space-y-2 mb-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Theme Palette</span>
                          <span className="text-[#38BDF8]">Dark High-Tech</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#A855F7]">
                          {activeCore.palette}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleCopyImagePath(activeCore.image)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#B46BF8] hover:to-[#8B5CF6] text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      >
                        {copiedImagePath ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedImagePath ? 'Path Copied!' : 'Copy Asset File Path'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 Core Direction Cards Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
                    <span>The 7 Core Research Direction 3D Isometric Visualizations</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Bento Cards (4:3)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {coreResearchIllustrations.map((item, idx) => {
                    const isSelected = selectedCoreIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedCoreIndex(idx)}
                        className={`card-subtle group/card cursor-pointer p-3 rounded-2xl transition-all overflow-hidden border ${
                          isSelected
                            ? 'border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.35)] bg-white/[0.06]'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#070B12] mb-2.5">
                          <ResponsiveImage
                            src={item.image}
                            alt={item.topic}
                            wrapperClassName="w-full h-full"
                            className="group-hover/card:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/70 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-1.5 left-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-[#38BDF8] border border-white/10">
                            0{idx + 1}
                          </span>
                        </div>

                        <div className="px-1">
                          <div className="text-[10px] font-mono text-[#A855F7] font-semibold truncate mb-0.5">
                            {item.category}
                          </div>
                          <h4 className="text-xs font-bold text-white group-hover/card:text-[#38BDF8] transition-colors truncate">
                            {item.topic}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : activeMainTab === 'topic_backgrounds' ? (
            <div className="space-y-6 animate-fade-in">
              {/* Selected Topic Full Showcase Card */}
              <div className="card-premium p-6 sm:p-7 relative overflow-hidden bg-[#070B12] border-white/15">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: 16:9 Image Preview */}
                  <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black group/preview">
                    <ResponsiveImage
                      src={activeTopic.image}
                      alt={`${activeTopic.topic} 3D isometric conceptual illustration`}
                      wrapperClassName="w-full h-full"
                      className="group-hover/preview:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Right: Topic Specs */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#A855F7]/15 text-[#A855F7] border border-[#A855F7]/30 font-semibold">
                          {activeTopic.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Topic {selectedTopicIndex + 1} of 12
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                        {activeTopic.topic}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                        {activeTopic.description}
                      </p>

                      {/* Aesthetic Theme Palette Swatches */}
                      <div className="card-subtle p-3 space-y-2 mb-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Unified Theme Palette</span>
                          <span className="text-[#38BDF8]">Deep Obsidian &amp; Neon</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full bg-[#0B0F17] border border-white/30" title="Deep Navy (#0B0F17)" />
                          <span className="h-4 w-4 rounded-full bg-[#111827] border border-white/20" title="Slate Grey (#111827)" />
                          <span className="h-4 w-4 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]" title="Neon Purple (#A855F7)" />
                          <span className="h-4 w-4 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" title="Electric Cyan (#38BDF8)" />
                          <span className="h-4 w-4 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_rgba(45,212,191,0.8)]" title="Neon Teal (#2DD4BF)" />
                          <span className="text-[10px] font-mono text-slate-400 ml-1.5">3D Isometric Minimalist</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleCopyImagePath(activeTopic.image)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#7DD3FC] hover:to-[#0369A1] text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                      >
                        {copiedImagePath ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedImagePath ? 'Path Copied!' : 'Copy Asset File Path'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12-Card Responsive Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                    <span>All 12 Individual Research Topic Backgrounds</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">12 UI Cards Visualized</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {researchTopicIllustrations.map((item, idx) => {
                    const isSelected = selectedTopicIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedTopicIndex(idx)}
                        className={`card-subtle group/card cursor-pointer p-3 rounded-2xl transition-all overflow-hidden border ${
                          isSelected
                            ? 'border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.3)] bg-white/[0.06]'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#070B12] mb-2.5">
                          <ResponsiveImage
                            src={item.image}
                            alt={item.topic}
                            wrapperClassName="w-full h-full"
                            className="group-hover/card:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/70 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-1.5 left-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-[#38BDF8] border border-white/10">
                            #{idx + 1}
                          </span>
                        </div>

                        <div className="px-1">
                          <div className="text-[10px] font-mono text-[#A855F7] font-semibold truncate mb-0.5">
                            {item.category}
                          </div>
                          <h4 className="text-xs font-bold text-white group-hover/card:text-[#38BDF8] transition-colors truncate">
                            {item.topic}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Top Controls: Concept Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                {(Object.keys(conceptDetails) as AiConceptId[])
                  .filter((k) => k !== 'tokenizer_graph')
                  .map((id) => (
                    <button
                      key={id}
                      onClick={() => setSelectedConceptId(id)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border ${
                        selectedConceptId === id
                          ? 'bg-gradient-to-r from-[#38BDF8]/20 to-[#A855F7]/20 border-[#38BDF8] text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02] text-slate-600 dark:text-[#94A3B8] hover:text-white hover:border-white/20'
                      }`}
                    >
                      {conceptDetails[id].name.split(' ')[0]} {conceptDetails[id].name.split(' ')[1]}
                    </button>
                  ))}
              </div>

          {/* Interactive Viewer Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: Graphic Canvas Preview */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-[#0B0F17] border border-white/15 relative overflow-hidden shadow-2xl">
              {/* Top Bar inside canvas */}
              <div className="flex items-center justify-between w-full mb-4 z-10">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {renderMode === 'vector' ? 'Vector Line-Art SVG' : 'AI Conceptual Graphic'}
                  </span>
                </div>

                {/* Shape Switcher */}
                <div className="flex items-center gap-1 bg-white/[0.06] p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setContainerShape('square')}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all ${
                      containerShape === 'square'
                        ? 'bg-[#38BDF8]/25 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Square Container"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Square</span>
                  </button>
                  <button
                    onClick={() => setContainerShape('circle')}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition-all ${
                      containerShape === 'circle'
                        ? 'bg-[#A855F7]/25 text-[#A855F7] border border-[#A855F7]/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Circular Container"
                  >
                    <Circle className="w-3.5 h-3.5" />
                    <span>Circle</span>
                  </button>
                </div>
              </div>

              {/* Ambient specular neon background glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#38BDF8]/15 via-transparent to-[#A855F7]/15" />
              <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-[#38BDF8]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-[#A855F7]/20 blur-3xl" />

              {/* Central Framed Artwork Container */}
              <div className="relative z-10 flex items-center justify-center my-2">
                {renderMode === 'vector' ? (
                  <AiConceptCardGraphic
                    id={selectedConceptId}
                    containerShape={containerShape}
                    size="card"
                    className="w-56 sm:w-64 h-56 sm:h-64 shadow-[0_0_35px_rgba(56,189,248,0.25)]"
                    glow={true}
                  />
                ) : (
                  <div
                    className={`overflow-hidden border border-white/20 bg-black relative w-56 sm:w-64 h-56 sm:h-64 flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all ${
                      containerShape === 'circle' ? 'rounded-full' : 'rounded-3xl'
                    }`}
                  >
                    <img
                      src={generatedAiAssetMap[selectedConceptId] || generatedAiAssetMap.neural_mesh}
                      alt={currentConcept.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Mode Switcher */}
              <div className="mt-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => setRenderMode('vector')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    renderMode === 'vector'
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Pure Vector (SVG)
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => setRenderMode('generative')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    renderMode === 'generative'
                      ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  High-Res AI Render
                </button>
              </div>
            </div>

            {/* Right: Technical Anatomy & Portfolio Usage */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="card-subtle p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">
                    {currentConcept.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentConcept.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {currentConcept.description}
                </p>
              </div>

              <div className="card-subtle p-4 sm:p-5 space-y-2">
                <div className="text-xs font-mono text-[#A855F7] font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Mathematical Formalism</span>
                </div>
                <p className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-black/40 p-3 rounded-xl border border-white/10 leading-relaxed">
                  {currentConcept.mathBasis}
                </p>
              </div>

              <div className="card-subtle p-4 sm:p-5 space-y-2">
                <div className="text-xs font-mono text-emerald-500 dark:text-[#34D399] font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Card Placement In Portfolio</span>
                </div>
                <p className="text-xs font-mono text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {currentConcept.appliedIn}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCopySvg}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#7DD3FC] hover:to-[#0369A1] text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'JSX Copied!' : 'Copy Graphic JSX'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.01] shrink-0 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
            <span>Theme: Deep Obsidian (#0B0F17) with Cyan, Purple &amp; Blue Neon Outlines</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
