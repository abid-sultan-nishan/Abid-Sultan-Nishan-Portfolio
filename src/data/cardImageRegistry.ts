/**
 * Structured Card Image Registry & JSON Schema Mapping
 *
 * Provides a single source of truth mapping each card's unique ID
 * to its verified, topic-specific background imagery, WebP/JPG variants,
 * ambient gradients, and fallback metadata.
 */

export interface CardAssetConfig {
  id: string;
  topic: string;
  category: 'LLMs' | 'NLP' | 'Deep Learning' | 'Machine Learning' | 'Milestone' | 'Research' | 'Skills';
  title: string;
  primaryImage: string; // High-compression WebP
  fallbackImage: string; // Universal JPG fallback
  accentColor: string;
  gradientFallback: string;
  description: string;
}

/**
 * Universal Registry mapping every Card ID to verified on-disk static assets.
 * All paths reference public root `/assets/images/...` for seamless Vite dev + Vercel deployment.
 */
export const CARD_IMAGE_REGISTRY: Record<string, CardAssetConfig> = {
  // === Flagship Project Cards ===
  'proj-1': {
    id: 'proj-1',
    topic: 'LoRA-FineTune',
    category: 'LLMs',
    title: 'Parameter-Efficient Adaptation Pipeline',
    primaryImage: '/assets/images/card_lora_peft_1791002709007.webp',
    fallbackImage: '/assets/images/card_lora_peft_1791002709007.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(168, 85, 247, 0.12) 50%, #070B12 100%)',
    description: '3D isometric neural architecture showing parameter-efficient Low-Rank Adaptation matrices.',
  },
  'proj-2': {
    id: 'proj-2',
    topic: 'IndicText',
    category: 'NLP',
    title: 'Low-Resource Morphological Classifier',
    primaryImage: '/assets/images/card_nlp_1791003349753.webp',
    fallbackImage: '/assets/images/card_nlp_1791003349753.jpg',
    accentColor: '#34D399',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.20) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: '3D isometric morphological token graph and embedding vector spaces.',
  },
  'proj-3': {
    id: 'proj-3',
    topic: 'RAG-Indic',
    category: 'LLMs',
    title: 'Retrieval-Augmented Semantic QA System',
    primaryImage: '/assets/images/card_rag_search_1791002722950.webp',
    fallbackImage: '/assets/images/card_rag_search_1791002722950.jpg',
    accentColor: '#A855F7',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(38, 18, 64, 0.6) 50%, #070B12 100%)',
    description: 'Dense vector database indexing, FAISS similarity search, and context gating flows.',
  },
  'proj-4': {
    id: 'proj-4',
    topic: 'DeepOpt',
    category: 'Deep Learning',
    title: 'Neural Convergence & Gradient Dynamics Visualizer',
    primaryImage: '/assets/images/card_deeplearning_1791003386557.webp',
    fallbackImage: '/assets/images/card_deeplearning_1791003386557.jpg',
    accentColor: '#60A5FA',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(96, 165, 250, 0.22) 0%, rgba(16, 32, 64, 0.6) 50%, #070B12 100%)',
    description: 'Multi-layer perceptron gradient landscape, weight norm convergence, and loss surfaces.',
  },
  'proj-5': {
    id: 'proj-5',
    topic: 'SubwordMorph',
    category: 'NLP',
    title: 'Indic Tokenizer Fragmentation Analyzer',
    primaryImage: '/assets/images/card_nlp_tokens_1791002735307.webp',
    fallbackImage: '/assets/images/card_nlp_tokens_1791002735307.jpg',
    accentColor: '#F59E0B',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.20) 0%, rgba(54, 36, 10, 0.6) 50%, #070B12 100%)',
    description: 'Subword token fertility breakdown, BPE merge trees, and byte-level vocabularies.',
  },
  'proj-6': {
    id: 'proj-6',
    topic: 'ReproducibleML',
    category: 'Machine Learning',
    title: 'Experiment & Hyperparameter Harness',
    primaryImage: '/assets/images/card_appliedml_1791003398017.webp',
    fallbackImage: '/assets/images/card_appliedml_1791003398017.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.20) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: 'Modular ML pipeline harness, seed determinism, and telemetry logging.',
  },

  // === Research Directions ===
  'nlp': {
    id: 'nlp',
    topic: 'Natural Language Processing',
    category: 'Research',
    title: 'Natural Language Processing',
    primaryImage: '/assets/images/iso_nlp_semantic_1791005130807.webp',
    fallbackImage: '/assets/images/iso_nlp_semantic_1791005130807.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: 'Semantic text analysis and word representation lattice.',
  },
  'llm': {
    id: 'llm',
    topic: 'Large Language Models',
    category: 'Research',
    title: 'Large Language Models',
    primaryImage: '/assets/images/iso_llm_transformer_1791005148038.webp',
    fallbackImage: '/assets/images/iso_llm_transformer_1791005148038.jpg',
    accentColor: '#A855F7',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(38, 18, 64, 0.6) 50%, #070B12 100%)',
    description: 'Multi-layer transformer attention stack and foundation model intelligence core.',
  },
  'finetuning': {
    id: 'finetuning',
    topic: 'Fine-Tuning & Model Adaptation',
    category: 'Research',
    title: 'Fine-Tuning and Model Adaptation',
    primaryImage: '/assets/images/iso_model_adaptation_1791005163912.webp',
    fallbackImage: '/assets/images/iso_model_adaptation_1791005163912.jpg',
    accentColor: '#34D399',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.22) 0%, rgba(12, 44, 34, 0.6) 50%, #070B12 100%)',
    description: 'Low-rank adapter injection into foundation model weights.',
  },
  'deep-learning': {
    id: 'deep-learning',
    topic: 'Deep Learning',
    category: 'Research',
    title: 'Deep Learning',
    primaryImage: '/assets/images/iso_deep_learning_1791005175408.webp',
    fallbackImage: '/assets/images/iso_deep_learning_1791005175408.jpg',
    accentColor: '#60A5FA',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(96, 165, 250, 0.22) 0%, rgba(16, 32, 64, 0.6) 50%, #070B12 100%)',
    description: 'Hierarchical representation learning across deep synaptic networks.',
  },
  'applied-ml': {
    id: 'applied-ml',
    topic: 'Applied Machine Learning',
    category: 'Research',
    title: 'Applied Machine Learning',
    primaryImage: '/assets/images/iso_applied_ml_1791005189043.webp',
    fallbackImage: '/assets/images/iso_applied_ml_1791005189043.jpg',
    accentColor: '#F59E0B',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.20) 0%, rgba(54, 36, 10, 0.6) 50%, #070B12 100%)',
    description: 'Practical machine learning deployments in robotics, sensors, and medicine.',
  },
  'computer-vision': {
    id: 'computer-vision',
    topic: 'Computer Vision & Multimodal',
    category: 'Research',
    title: 'Computer Vision & Multimodal Representations',
    primaryImage: '/assets/images/iso_multimodal_vision_1791005200253.webp',
    fallbackImage: '/assets/images/iso_multimodal_vision_1791005200253.jpg',
    accentColor: '#EC4899',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(236, 72, 153, 0.20) 0%, rgba(54, 16, 38, 0.6) 50%, #070B12 100%)',
    description: 'Cross-modal representation alignment between convolutional visual features and language tokens.',
  },
  'reinforcement-learning': {
    id: 'reinforcement-learning',
    topic: 'Reinforcement Learning',
    category: 'Research',
    title: 'Reinforcement Learning & Policy Optimization',
    primaryImage: '/assets/images/iso_reinforce_policy_1791005215408.webp',
    fallbackImage: '/assets/images/iso_reinforce_policy_1791005215408.jpg',
    accentColor: '#8B5CF6',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.22) 0%, rgba(32, 20, 58, 0.6) 50%, #070B12 100%)',
    description: 'Policy gradient trajectories and reward optimization in decision landscapes.',
  },

  // === Academic Milestones & Education ===
  'edu-degree': {
    id: 'edu-degree',
    topic: 'Uttara University Degree',
    category: 'Milestone',
    title: 'CSE Undergraduate (B.Sc.)',
    primaryImage: '/assets/images/bg_programming_1791004496685.webp',
    fallbackImage: '/assets/images/bg_programming_1791004496685.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.20) 0%, rgba(168, 85, 247, 0.10) 45%, #070B12 100%)',
    description: 'Core computational fundamentals and academic coursework.',
  },
  'm-2024': {
    id: 'm-2024',
    topic: 'Foundations of Computer Science',
    category: 'Milestone',
    title: 'Algorithmic Foundations & Mathematics',
    primaryImage: '/assets/images/bg_programming_1791004496685.webp',
    fallbackImage: '/assets/images/bg_programming_1791004496685.jpg',
    accentColor: '#34D399',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.20) 0%, rgba(12, 44, 34, 0.6) 50%, #070B12 100%)',
    description: 'Discrete math, linear algebra, multivariable calculus, and C++ algorithms.',
  },
  'm-2025': {
    id: 'm-2025',
    topic: 'Deep Learning Specialization',
    category: 'Milestone',
    title: 'PEFT Architecture Experiments',
    primaryImage: '/assets/images/card_deeplearning_1791003386557.webp',
    fallbackImage: '/assets/images/card_deeplearning_1791003386557.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.20) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: 'PyTorch, Hugging Face, BPE tokenizers, and 4-bit QLoRA.',
  },
  'm-2026': {
    id: 'm-2026',
    topic: 'Bengali LLM Adaptation & Preprints',
    category: 'Milestone',
    title: 'AdaLoRA-Indic & Clinical RAG',
    primaryImage: '/assets/images/bg_adalora_indic_1791004551998.webp',
    fallbackImage: '/assets/images/bg_adalora_indic_1791004551998.jpg',
    accentColor: '#A855F7',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(38, 18, 64, 0.6) 50%, #070B12 100%)',
    description: 'AdaLoRA-Indic preprint and healthcare hybrid RAG pipelines.',
  },
  'm-2027': {
    id: 'm-2027',
    topic: 'Thesis Defense & Graduate Transition',
    category: 'Milestone',
    title: 'Multilingual Foundation Models Thesis',
    primaryImage: '/assets/images/ai_neural_concept_1790965562075.webp',
    fallbackImage: '/assets/images/ai_neural_concept_1790965562075.jpg',
    accentColor: '#F59E0B',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.20) 0%, rgba(54, 36, 10, 0.6) 50%, #070B12 100%)',
    description: 'B.Sc. capstone thesis defense and international graduate fellowship.',
  },

  // === Publications ===
  'pub-1': {
    id: 'pub-1',
    topic: 'AdaLoRA-Indic Preprint',
    category: 'Research',
    title: 'Dynamic Rank Allocation via Gradient Variance',
    primaryImage: '/assets/images/bg_adalora_indic_1791004551998.webp',
    fallbackImage: '/assets/images/bg_adalora_indic_1791004551998.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(168, 85, 247, 0.12) 50%, #070B12 100%)',
    description: 'Preprint exploring eigenvalue-guided rank allocation for low-resource Bengali LLMs.',
  },
  'pub-2': {
    id: 'pub-2',
    topic: 'Subword Fertility Workshop Paper',
    category: 'Research',
    title: 'Indic Tokenizer Empirical Analysis',
    primaryImage: '/assets/images/bg_subword_fertility_1791004563186.webp',
    fallbackImage: '/assets/images/bg_subword_fertility_1791004563186.jpg',
    accentColor: '#34D399',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.20) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: 'Empirical analysis across 5 low-resource Indic scripts and vocabulary expansion.',
  },

  // === Technical Notes ===
  'note-1': {
    id: 'note-1',
    topic: 'Tokenizer Fertility Rates',
    category: 'NLP',
    title: 'BPE vs SentencePiece in Indic Corpora',
    primaryImage: '/assets/images/bg_tokenizer_rates_1791004574050.webp',
    fallbackImage: '/assets/images/bg_tokenizer_rates_1791004574050.jpg',
    accentColor: '#38BDF8',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
    description: 'Subword fertility analysis and context bloat benchmarks.',
  },
  'note-2': {
    id: 'note-2',
    topic: 'Experiment Log #04: QLoRA vs LoRA',
    category: 'Deep Learning',
    title: 'Gradient Norm Variance & VRAM Footprint',
    primaryImage: '/assets/images/bg_explog_gradient_1791004585234.webp',
    fallbackImage: '/assets/images/bg_explog_gradient_1791004585234.jpg',
    accentColor: '#A855F7',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(38, 18, 64, 0.6) 50%, #070B12 100%)',
    description: 'Direct side-by-side memory profiling and gradient stability benchmark.',
  },
  'note-3': {
    id: 'note-3',
    topic: 'Cross-Attention Entropy in RAG',
    category: 'NLP',
    title: 'Unsupervised Hallucination Signal',
    primaryImage: '/assets/images/bg_cross_attention_1791004595630.webp',
    fallbackImage: '/assets/images/bg_cross_attention_1791004595630.jpg',
    accentColor: '#60A5FA',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(96, 165, 250, 0.22) 0%, rgba(16, 32, 64, 0.6) 50%, #070B12 100%)',
    description: 'Attention entropy confidence scoring over retrieved context chunks.',
  },
  'note-4': {
    id: 'note-4',
    topic: 'LoRA Rank Sensitivity Sweep',
    category: 'Deep Learning',
    title: 'Rank Ablation from r=4 to r=64',
    primaryImage: '/assets/images/bg_lora_sweep_1791004605906.webp',
    fallbackImage: '/assets/images/bg_lora_sweep_1791004605906.jpg',
    accentColor: '#F59E0B',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.20) 0%, rgba(54, 36, 10, 0.6) 50%, #070B12 100%)',
    description: 'Hyperparameter ablation sweep for instruction tuning on Bengali corpora.',
  },
  'note-5': {
    id: 'note-5',
    topic: 'KV Cache Eviction Dynamics',
    category: 'Deep Learning',
    title: 'StreamingLLM vs H2O Heavy-Hitters',
    primaryImage: '/assets/images/bg_kv_cache_1791004616575.webp',
    fallbackImage: '/assets/images/bg_kv_cache_1791004616575.jpg',
    accentColor: '#34D399',
    gradientFallback: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.22) 0%, rgba(12, 44, 34, 0.6) 50%, #070B12 100%)',
    description: 'Bounded memory KV cache retention for long-context transformer inference.',
  },
};

/**
 * Retrieves the verified image asset configuration for any card ID.
 * Falls back cleanly to a topic-appropriate neural concept graphic if the ID is not found.
 */
export function getCardImageConfig(cardId: string, fallbackCategory?: string): CardAssetConfig {
  if (CARD_IMAGE_REGISTRY[cardId]) {
    return CARD_IMAGE_REGISTRY[cardId];
  }

  // Fallback mapping based on category keywords
  const cat = (fallbackCategory || '').toLowerCase();
  let defaultId = 'proj-1';
  if (cat.includes('nlp')) defaultId = 'proj-2';
  else if (cat.includes('rag') || cat.includes('retriev')) defaultId = 'proj-3';
  else if (cat.includes('deep') || cat.includes('opt')) defaultId = 'proj-4';
  else if (cat.includes('token') || cat.includes('morph')) defaultId = 'proj-5';
  else if (cat.includes('ml') || cat.includes('machine')) defaultId = 'proj-6';

  return CARD_IMAGE_REGISTRY[defaultId] || CARD_IMAGE_REGISTRY['proj-1'];
}
