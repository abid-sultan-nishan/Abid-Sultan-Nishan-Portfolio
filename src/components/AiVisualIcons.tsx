import React from 'react';

export type AiConceptId =
  | 'neural_mesh'
  | 'transformer_attention'
  | 'lora_adaptation'
  | 'gradient_landscape'
  | 'latent_embeddings'
  | 'tokenizer_graph';

interface AiIllustrationProps {
  id: AiConceptId;
  containerShape?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'card';
  className?: string;
  glow?: boolean;
}

export const generatedAiAssetMap: Record<string, string> = {
  neural_mesh: '/assets/images/iso_deep_learning_1791005175408.webp',
  transformer_attention: '/assets/images/iso_llm_transformer_1791005148038.webp',
  lora_adaptation: '/assets/images/iso_model_adaptation_1791005163912.webp',
  gradient_landscape: '/assets/images/bg_machine_learning_1791004506597.webp',
  latent_embeddings: '/assets/images/iso_nlp_semantic_1791005130807.webp',
  nlp_tokens: '/assets/images/bg_tokenizer_rates_1791004574050.webp',
  applied_ml: '/assets/images/iso_applied_ml_1791005189043.webp',
  computer_vision: '/assets/images/iso_multimodal_vision_1791005200253.webp',
  reinforcement_learning: '/assets/images/iso_reinforce_policy_1791005215408.webp',
  programming: '/assets/images/bg_programming_1791004496685.webp',
  tools_environments: '/assets/images/bg_tools_environments_1791004528238.webp',
  gradient_norm_vram: '/assets/images/bg_explog_gradient_1791004585234.webp',
  cross_attention_entropy: '/assets/images/bg_cross_attention_1791004595630.webp',
  lora_rank_sweep: '/assets/images/bg_lora_sweep_1791004605906.webp',
  kv_cache_eviction: '/assets/images/bg_kv_cache_1791004616575.webp',
};

export const coreResearchIllustrations = [
  {
    topic: 'Natural Language Processing (NLP)',
    description: 'A high-tech, futuristic 3D isometric illustration of a semantic text analysis system with stylized brain shape made of glowing interconnected word nodes and layered language data streams merging into a unified neural architecture.',
    image: '/assets/images/iso_nlp_semantic_1791005130807.webp',
    category: 'Research Direction 01 · NLP',
    palette: 'Deep navy background, glowing cyan text, soft violet/blue neon light paths',
  },
  {
    topic: 'Large Language Models (LLM)',
    description: 'A sprawling, futuristic 3D isometric representation of a vast foundation model featuring a dense multi-layered transformer architecture with parallel attention head pathways and a radiant central core of intelligence.',
    image: '/assets/images/iso_llm_transformer_1791005148038.webp',
    category: 'Research Direction 02 · LLMs',
    palette: 'Deep navy background, bright teal & electric violet data streams, glowing orange accents',
  },
  {
    topic: 'Fine-Tuning and Model Adaptation',
    description: 'A precise, conceptual 3D isometric scene depicting base pre-trained model block structure being meticulously refined by small fine-tuning vectors, adapter matrices, and hyperparameter tuning elements.',
    image: '/assets/images/iso_model_adaptation_1791005163912.webp',
    category: 'Research Direction 03 · PEFT & Adaptation',
    palette: 'Deep navy background, glowing cyan & rich purple data manipulation, amber highlights',
  },
  {
    topic: 'Deep Learning',
    description: 'A complex, awe-inspiring 3D isometric visualization of a deep, multi-layer neural network with a dense stack of hidden layers, artificial neurons, and synapse connections extracting hierarchical representations.',
    image: '/assets/images/iso_deep_learning_1791005175408.webp',
    category: 'Research Direction 04 · Deep Learning',
    palette: 'Deep navy background, gradient cyan-to-violet data paths, vibrant blue neuron accents',
  },
  {
    topic: 'Applied Machine Learning',
    description: 'A realistic 3D isometric snapshot of practical machine learning integrating smart city sensors, industrial robotics, and medical scanning data with a robust modular ML pipeline.',
    image: '/assets/images/iso_applied_ml_1791005189043.webp',
    category: 'Research Direction 05 · Applied ML',
    palette: 'Deep navy background, clean teal data flows, soft gold real-world impact points',
  },
  {
    topic: 'Computer Vision & Multimodal Representations',
    description: 'A visually stunning 3D isometric visualization of image and cross-modal processing with convolutional feature layers aligning with text embeddings through a cross-modal alignment mechanism.',
    image: '/assets/images/iso_multimodal_vision_1791005200253.webp',
    category: 'Research Direction 06 · Multimodal & Vision',
    palette: 'Deep navy background, gradient purple-to-blue light paths, cyan visual accents',
  },
  {
    topic: 'Reinforcement Learning & Policy Optimization',
    description: 'A dynamic, conceptual 3D isometric visualization of reinforcement learning with a stylized agent navigating a simulated maze, a looping policy optimization pathway, and branching decision futures.',
    image: '/assets/images/iso_reinforce_policy_1791005215408.webp',
    category: 'Research Direction 07 · RL & Policies',
    palette: 'Deep navy background, glowing cyan agent path, magenta policy updates, soft violet reward signals',
  },
];

export const researchTopicIllustrations = [
  {
    topic: 'Programming',
    description: 'Python/C++/JS core languages for scripting and algorithm implementation.',
    image: '/assets/images/bg_programming_1791004496685.webp',
    category: 'Skills · Core Stacks',
  },
  {
    topic: 'Machine Learning',
    description: 'Numerical computing, tensor manipulation, and statistical modeling libraries like PyTorch and TensorFlow.',
    image: '/assets/images/bg_machine_learning_1791004506597.webp',
    category: 'Skills · Tensors & Compute',
  },
  {
    topic: 'NLP & LLMs',
    description: 'Language modeling architectures and transformer-based text processing.',
    image: '/assets/images/bg_nlp_llms_1791004517850.webp',
    category: 'Skills · Foundation Models',
  },
  {
    topic: 'Tools & Environments',
    description: 'Git, containerized runtimes, and version control.',
    image: '/assets/images/bg_tools_environments_1791004528238.webp',
    category: 'Skills · Developer Tooling',
  },
  {
    topic: 'Research Methodology',
    description: 'Scientific experimentation and literature review documentation.',
    image: '/assets/images/bg_research_methodology_1791004539704.webp',
    category: 'Skills · Empirical Design',
  },
  {
    topic: 'AdaLoRA-Indic',
    description: 'Dynamic rank allocation for parameter-efficient adaptation of Bengali LLMs.',
    image: '/assets/images/bg_adalora_indic_1791004551998.webp',
    category: 'Featured Research · PEFT SVD',
  },
  {
    topic: 'Subword Fertility',
    description: 'Morphological splitting analysis in low-resource Indic tokenizers.',
    image: '/assets/images/bg_subword_fertility_1791004563186.webp',
    category: 'Workshop Paper · Token Fragmentation',
  },
  {
    topic: 'Tokenizer Fertility Rates',
    description: 'SentencePiece vs. BPE out-of-vocabulary splitting analysis.',
    image: '/assets/images/bg_tokenizer_rates_1791004574050.webp',
    category: 'Technical Note #01 · Vocabulary Expansion',
  },
  {
    topic: 'Experiment Log #04',
    description: 'Gradient norm variance and VRAM footprint in QLoRA training.',
    image: '/assets/images/bg_explog_gradient_1791004585234.webp',
    category: 'Technical Note #02 · NF4 Quantization',
  },
  {
    topic: 'Cross-Attention Entropy',
    description: 'Retrospective signal analysis for un-supervised hallucinations in Dense RAG.',
    image: '/assets/images/bg_cross_attention_1791004595630.webp',
    category: 'Technical Note #03 · Faithfulness Gating',
  },
  {
    topic: 'Experiment Log #07',
    description: 'LoRA rank sensitivity sweep for instruction tuning.',
    image: '/assets/images/bg_lora_sweep_1791004605906.webp',
    category: 'Technical Note #04 · Rank Sweep r=4..64',
  },
  {
    topic: 'KV Cache Eviction',
    description: 'Layer-wise dynamics for long-context transformer inference.',
    image: '/assets/images/bg_kv_cache_1791004616575.webp',
    category: 'Technical Note #05 · Attention Sinks',
  },
];

/**
 * 1. Deep Neural Network & Synaptic AI Lattice Vector Illustration
 * Concepts: Multi-layer perceptron, weighted synapses, backprop gradients, tensor nodes
 */
export const NeuralMeshVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="cyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="purpleCyan" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
      <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Concentric subtle radar rings */}
    <circle cx="100" cy="100" r="85" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.18" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="62" stroke="#A855F7" strokeWidth="0.75" strokeOpacity="0.22" />
    <circle cx="100" cy="100" r="38" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="2 4" />

    {/* Synaptic interconnect vectors (Layer 1 -> Layer 2 -> Layer 3 -> Output) */}
    {/* Input Layer to Hidden 1 */}
    <path d="M40 55 L80 40" stroke="url(#cyanPurple)" strokeWidth="1.2" strokeOpacity="0.5" />
    <path d="M40 55 L80 80" stroke="url(#cyanPurple)" strokeWidth="1" strokeOpacity="0.35" />
    <path d="M40 55 L80 120" stroke="url(#cyanPurple)" strokeWidth="0.8" strokeOpacity="0.2" />
    <path d="M40 100 L80 40" stroke="url(#cyanPurple)" strokeWidth="0.8" strokeOpacity="0.2" />
    <path d="M40 100 L80 80" stroke="url(#cyanPurple)" strokeWidth="1.5" strokeOpacity="0.7" />
    <path d="M40 100 L80 120" stroke="url(#cyanPurple)" strokeWidth="1.5" strokeOpacity="0.7" />
    <path d="M40 100 L80 160" stroke="url(#cyanPurple)" strokeWidth="0.8" strokeOpacity="0.2" />
    <path d="M40 145 L80 80" stroke="url(#cyanPurple)" strokeWidth="0.8" strokeOpacity="0.2" />
    <path d="M40 145 L80 120" stroke="url(#cyanPurple)" strokeWidth="1" strokeOpacity="0.35" />
    <path d="M40 145 L80 160" stroke="url(#cyanPurple)" strokeWidth="1.2" strokeOpacity="0.5" />

    {/* Hidden 1 to Hidden 2 (Core Synaptic Nexus) */}
    <path d="M80 40 L120 50" stroke="url(#purpleCyan)" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M80 40 L120 100" stroke="url(#purpleCyan)" strokeWidth="0.9" strokeOpacity="0.3" />
    <path d="M80 80 L120 50" stroke="url(#cyanPurple)" strokeWidth="1.2" strokeOpacity="0.5" />
    <path d="M80 80 L120 100" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.8" filter="url(#neonGlowCyan)" />
    <path d="M80 80 L120 150" stroke="url(#cyanPurple)" strokeWidth="1" strokeOpacity="0.4" />
    <path d="M80 120 L120 50" stroke="url(#purpleCyan)" strokeWidth="0.8" strokeOpacity="0.25" />
    <path d="M80 120 L120 100" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.85" filter="url(#neonGlowPurple)" />
    <path d="M80 120 L120 150" stroke="url(#purpleCyan)" strokeWidth="1.3" strokeOpacity="0.6" />
    <path d="M80 160 L120 100" stroke="url(#cyanPurple)" strokeWidth="0.9" strokeOpacity="0.3" />
    <path d="M80 160 L120 150" stroke="url(#cyanPurple)" strokeWidth="1.5" strokeOpacity="0.6" />

    {/* Hidden 2 to Output */}
    <path d="M120 50 L160 75" stroke="url(#cyanPurple)" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M120 50 L160 125" stroke="url(#cyanPurple)" strokeWidth="0.8" strokeOpacity="0.25" />
    <path d="M120 100 L160 75" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.85" filter="url(#neonGlowCyan)" />
    <path d="M120 100 L160 125" stroke="#A855F7" strokeWidth="2" strokeOpacity="0.85" filter="url(#neonGlowPurple)" />
    <path d="M120 150 L160 75" stroke="url(#purpleCyan)" strokeWidth="0.8" strokeOpacity="0.25" />
    <path d="M120 150 L160 125" stroke="url(#purpleCyan)" strokeWidth="1.5" strokeOpacity="0.6" />

    {/* Neural Layer Nodes */}
    {/* Input Nodes (x=40) */}
    <circle cx="40" cy="55" r="4.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    <circle cx="40" cy="55" r="1.8" fill="#38BDF8" />
    <circle cx="40" cy="100" r="5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2" filter="url(#neonGlowCyan)" />
    <circle cx="40" cy="100" r="2.2" fill="#38BDF8" />
    <circle cx="40" cy="145" r="4.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    <circle cx="40" cy="145" r="1.8" fill="#38BDF8" />

    {/* Hidden Layer 1 Nodes (x=80) */}
    <circle cx="80" cy="40" r="4.5" fill="#0B0F17" stroke="#3B82F6" strokeWidth="1.5" />
    <circle cx="80" cy="40" r="1.8" fill="#3B82F6" />
    <circle cx="80" cy="80" r="5.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2" filter="url(#neonGlowCyan)" />
    <circle cx="80" cy="80" r="2.5" fill="#38BDF8" />
    <circle cx="80" cy="120" r="5.5" fill="#0B0F17" stroke="#A855F7" strokeWidth="2" filter="url(#neonGlowPurple)" />
    <circle cx="80" cy="120" r="2.5" fill="#A855F7" />
    <circle cx="80" cy="160" r="4.5" fill="#0B0F17" stroke="#3B82F6" strokeWidth="1.5" />
    <circle cx="80" cy="160" r="1.8" fill="#3B82F6" />

    {/* Hidden Layer 2 Nodes (x=120) */}
    <circle cx="120" cy="50" r="5" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.8" />
    <circle cx="120" cy="50" r="2" fill="#A855F7" />
    <circle cx="120" cy="100" r="7" fill="#0B0F17" stroke="url(#cyanPurple)" strokeWidth="2.5" filter="url(#neonGlowCyan)" />
    <circle cx="120" cy="100" r="3.2" fill="#38BDF8" />
    <circle cx="120" cy="150" r="5" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.8" />
    <circle cx="120" cy="150" r="2" fill="#A855F7" />

    {/* Output Nodes (x=160) */}
    <circle cx="160" cy="75" r="6" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2" filter="url(#neonGlowCyan)" />
    <circle cx="160" cy="75" r="2.5" fill="#38BDF8" />
    <circle cx="160" cy="125" r="6" fill="#0B0F17" stroke="#A855F7" strokeWidth="2" filter="url(#neonGlowPurple)" />
    <circle cx="160" cy="125" r="2.5" fill="#A855F7" />

    {/* Pulse coordinate points */}
    <circle cx="100" cy="20" r="1.5" fill="#38BDF8" opacity="0.6" />
    <circle cx="100" cy="180" r="1.5" fill="#A855F7" opacity="0.6" />
    <circle cx="20" cy="100" r="1.5" fill="#38BDF8" opacity="0.6" />
    <circle cx="180" cy="100" r="1.5" fill="#A855F7" opacity="0.6" />
  </svg>
);

/**
 * 2. Transformer Multi-Head Self-Attention Matrix Vector Illustration
 * Concepts: Query-Key-Value projection, attention heat matrix, radial token relations, holographic orbits
 */
export const TransformerAttentionVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="transCyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <filter id="neonTransCyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonTransPurple" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Central Core Transformer Token Hub */}
    <circle cx="100" cy="100" r="82" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="58" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.35" />
    <circle cx="100" cy="100" r="32" stroke="url(#transCyanPurple)" strokeWidth="1.5" strokeOpacity="0.75" />
    <circle cx="100" cy="100" r="14" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2" filter="url(#neonTransCyan)" />
    <circle cx="100" cy="100" r="6" fill="#A855F7" filter="url(#neonTransPurple)" />

    {/* Multi-head attention radiant spokes (8 attention heads) */}
    {/* Angle 0 deg */}
    <line x1="100" y1="14" x2="100" y2="86" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="100" cy="24" r="3.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    {/* Angle 45 deg */}
    <line x1="160.8" y1="39.2" x2="110" y2="90" stroke="url(#transCyanPurple)" strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="153.7" cy="46.3" r="4" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.5" />
    {/* Angle 90 deg */}
    <line x1="186" y1="100" x2="114" y2="100" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="176" cy="100" r="3.5" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.5" />
    {/* Angle 135 deg */}
    <line x1="160.8" y1="160.8" x2="110" y2="110" stroke="url(#transCyanPurple)" strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="153.7" cy="153.7" r="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    {/* Angle 180 deg */}
    <line x1="100" y1="186" x2="100" y2="114" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="100" cy="176" r="3.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    {/* Angle 225 deg */}
    <line x1="39.2" y1="160.8" x2="90" y2="110" stroke="url(#transCyanPurple)" strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="46.3" cy="153.7" r="4" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.5" />
    {/* Angle 270 deg */}
    <line x1="14" y1="100" x2="86" y2="100" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="24" cy="100" r="3.5" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.5" />
    {/* Angle 315 deg */}
    <line x1="39.2" y1="39.2" x2="90" y2="90" stroke="url(#transCyanPurple)" strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="46.3" cy="46.3" r="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />

    {/* Cross-Attention Vector Chord Arcs between heads */}
    <path d="M100 24 Q140 60 176 100" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 2" />
    <path d="M176 100 Q140 140 100 176" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.5" />
    <path d="M100 176 Q60 140 24 100" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 2" />
    <path d="M24 100 Q60 60 100 24" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.5" />

    {/* Diagonal cross-attention chord paths */}
    <path d="M46.3 46.3 Q100 80 153.7 153.7" stroke="url(#transCyanPurple)" strokeWidth="1.8" strokeOpacity="0.75" filter="url(#neonTransCyan)" />
    <path d="M46.3 153.7 Q100 120 153.7 46.3" stroke="url(#transCyanPurple)" strokeWidth="1.8" strokeOpacity="0.75" filter="url(#neonTransPurple)" />

    {/* Concentric tick marks */}
    <line x1="97" y1="18" x2="103" y2="18" stroke="#38BDF8" strokeWidth="1" />
    <line x1="97" y1="182" x2="103" y2="182" stroke="#38BDF8" strokeWidth="1" />
    <line x1="18" y1="97" x2="18" y2="103" stroke="#A855F7" strokeWidth="1" />
    <line x1="182" y1="97" x2="182" y2="103" stroke="#A855F7" strokeWidth="1" />
  </svg>
);

/**
 * 3. Parameter-Efficient Low-Rank Adaptation (LoRA) Matrix Vector Illustration
 * Concepts: Dense foundation weights W0, thin rank-r low-rank projections A and B, gradient bypass circuit
 */
export const LowRankAdaptationVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="loraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <filter id="neonLoRA" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background coordinate grid */}
    <line x1="20" y1="100" x2="180" y2="100" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.15" />
    <line x1="100" y1="20" x2="100" y2="180" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.15" />

    {/* Frozen Pretrained Weight Matrix W0 (Large Square Grid) */}
    <rect x="25" y="50" width="60" height="60" rx="8" fill="#0B0F17" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.6" />
    {/* Inner Matrix Grid cells */}
    <line x1="45" y1="50" x2="45" y2="110" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />
    <line x1="65" y1="50" x2="65" y2="110" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />
    <line x1="25" y1="70" x2="85" y2="70" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />
    <line x1="25" y1="90" x2="85" y2="90" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />

    {/* Frozen Lock Symbol / Geometric core inside W0 */}
    <rect x="49" y="74" width="12" height="12" rx="2" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
    <circle cx="55" cy="80" r="2" fill="#38BDF8" />

    {/* Mathematical Plus (+) Operator */}
    <circle cx="100" cy="80" r="10" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="100" y1="75" x2="100" y2="85" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="95" y1="80" x2="105" y2="80" stroke="#38BDF8" strokeWidth="1.5" />

    {/* Trainable Low-Rank Adapter Matrices: Matrix B (dxr) and Matrix A (rxd) */}
    {/* Matrix B (Thin tall rectangle) */}
    <rect x="118" y="50" width="18" height="60" rx="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.8" filter="url(#neonLoRA)" />
    <line x1="127" y1="50" x2="127" y2="110" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" />

    {/* Matrix Multiply Dot (x) */}
    <circle cx="144" cy="80" r="2.5" fill="#A855F7" />

    {/* Matrix A (Flat wide rectangle) */}
    <rect x="152" y="71" width="30" height="18" rx="4" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.8" filter="url(#neonLoRA)" />
    <line x1="152" y1="80" x2="182" y2="80" stroke="#A855F7" strokeWidth="0.8" strokeDasharray="3 3" />

    {/* Gradient Flow Bypass Wave Circuit */}
    <path
      d="M20 150 C50 120 70 170 100 145 C130 120 150 160 180 140"
      stroke="url(#loraGrad)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      filter="url(#neonLoRA)"
    />

    {/* Flow arrows along bypass */}
    <circle cx="50" cy="138" r="3" fill="#38BDF8" />
    <circle cx="100" cy="145" r="4" fill="#A855F7" />
    <circle cx="150" cy="144" r="3" fill="#38BDF8" />

    {/* Scaling parameter multiplier circle (alpha / r) */}
    <circle cx="167" cy="120" r="9" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.2" />
    <circle cx="167" cy="120" r="3" fill="#A855F7" />
  </svg>
);

/**
 * 4. Data Science Loss Landscape & Optimization Contour Vector Illustration
 * Concepts: 3D loss surface contours, stochastic gradient descent trajectory, global minimum basin
 */
export const LossLandscapeVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="contourGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <filter id="neonLandscape" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer Loss Manifold Ellipses (Concentric elevation contours) */}
    <ellipse cx="100" cy="108" rx="84" ry="58" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />
    <ellipse cx="102" cy="106" rx="68" ry="46" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.35" />
    <ellipse cx="106" cy="104" rx="52" ry="34" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.5" />
    <ellipse cx="110" cy="102" rx="36" ry="22" stroke="url(#contourGrad)" strokeWidth="1.5" strokeOpacity="0.75" />
    <ellipse cx="115" cy="100" rx="20" ry="12" stroke="#38BDF8" strokeWidth="2" filter="url(#neonLandscape)" />

    {/* Optimal Minimum Convergence Sink Point */}
    <circle cx="115" cy="100" r="4.5" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="115" cy="100" r="2" fill="#38BDF8" />

    {/* 3D Topographic Mesh wireframe lines connecting ridges */}
    <path d="M16 108 Q58 60 100 48 Q142 60 184 108" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
    <path d="M26 130 Q60 160 102 165 Q144 160 178 130" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
    <line x1="100" y1="48" x2="115" y2="100" stroke="#38BDF8" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="2 3" />
    <line x1="102" y1="165" x2="115" y2="100" stroke="#A855F7" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="2 3" />

    {/* Gradient Descent Optimization Trajectory (Neon stepping path with momentum) */}
    <path
      d="M38 52 L54 68 L68 62 L82 82 L96 78 L104 92 L115 100"
      stroke="#38BDF8"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#neonLandscape)"
    />

    {/* Optimization Step Checkpoints */}
    <circle cx="38" cy="52" r="3.5" fill="#A855F7" />
    <circle cx="54" cy="68" r="2.8" fill="#38BDF8" />
    <circle cx="68" cy="62" r="2.8" fill="#38BDF8" />
    <circle cx="82" cy="82" r="2.8" fill="#A855F7" />
    <circle cx="96" cy="78" r="2.8" fill="#38BDF8" />
    <circle cx="104" cy="92" r="3.2" fill="#38BDF8" />

    {/* Tangent gradient vectors */}
    <line x1="38" y1="52" x2="48" y2="40" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.6" />
    <line x1="82" y1="82" x2="88" y2="92" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.6" />
  </svg>
);

/**
 * 5. High-Dimensional Latent Embedding Space & Vector Retrieval Vector Illustration
 * Concepts: Cosine similarity clusters, k-nearest neighbors, hyper-plane boundaries, RAG vector index
 */
export const LatentEmbeddingsVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="latentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <filter id="neonLatent" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* High-dimensional coordinate axes */}
    <line x1="100" y1="18" x2="100" y2="182" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.25" />
    <line x1="18" y1="100" x2="182" y2="100" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.25" />
    <line x1="35" y1="165" x2="165" y2="35" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />

    {/* Cluster 1: Cyan Manifold (NLP / Language) */}
    <ellipse cx="60" cy="65" rx="35" ry="24" transform="rotate(-25 60 65)" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 2" />
    <circle cx="48" cy="58" r="3" fill="#38BDF8" />
    <circle cx="62" cy="52" r="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
    <circle cx="72" cy="72" r="3" fill="#38BDF8" />
    <circle cx="55" cy="75" r="2.5" fill="#38BDF8" />
    {/* Intra-cluster graph links */}
    <line x1="48" y1="58" x2="62" y2="52" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="62" y1="52" x2="72" y2="72" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="55" y1="75" x2="48" y2="58" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />

    {/* Cluster 2: Purple Manifold (Neural Weights / Optimization) */}
    <ellipse cx="140" cy="135" rx="32" ry="22" transform="rotate(30 140 135)" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 2" />
    <circle cx="128" cy="142" r="3" fill="#A855F7" />
    <circle cx="145" cy="125" r="4" fill="#0B0F17" stroke="#A855F7" strokeWidth="1.5" />
    <circle cx="155" cy="145" r="3" fill="#A855F7" />
    <circle cx="135" cy="120" r="2.5" fill="#A855F7" />
    {/* Intra-cluster graph links */}
    <line x1="128" y1="142" x2="145" y2="125" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="145" y1="125" x2="155" y2="145" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="135" y1="120" x2="145" y2="125" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.5" />

    {/* Query Vector & Nearest Neighbor Cosine Beam */}
    <circle cx="100" cy="100" r="6" fill="#0B0F17" stroke="#38BDF8" strokeWidth="2.5" filter="url(#neonLatent)" />
    <circle cx="100" cy="100" r="2.5" fill="#38BDF8" />

    {/* Vector Projections to closest cluster nodes */}
    <line x1="100" y1="100" x2="72" y2="72" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" filter="url(#neonLatent)" />
    <line x1="100" y1="100" x2="145" y2="125" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" filter="url(#neonLatent)" />

    {/* Hyperplane separating boundary */}
    <path d="M40 160 Q100 110 160 40" stroke="url(#latentGrad)" strokeWidth="1.5" strokeOpacity="0.75" />
  </svg>
);

/**
 * Master Frame Container for AI Conceptual Illustrations
 * Meets specification:
 * - Single, distinct, highly detailed graphic
 * - Framed within a circular or square container
 * - High-tech, futuristic neon outline color palette (cyan, purple, blue)
 * - Pitch-black or transparent background
 * - Pure conceptual visual, zero text
 */
export const AiConceptCardGraphic: React.FC<AiIllustrationProps> = ({
  id,
  containerShape = 'square',
  size = 'md',
  className = '',
  glow = true,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    card: 'w-full aspect-square max-w-[280px]',
  }[size];

  const shapeClasses =
    containerShape === 'circle'
      ? 'rounded-full'
      : 'rounded-2xl sm:rounded-3xl';

  const renderGraphic = () => {
    switch (id) {
      case 'neural_mesh':
        return <NeuralMeshVector />;
      case 'transformer_attention':
        return <TransformerAttentionVector />;
      case 'lora_adaptation':
        return <LowRankAdaptationVector />;
      case 'gradient_landscape':
        return <LossLandscapeVector />;
      case 'latent_embeddings':
      case 'tokenizer_graph':
      default:
        return <LatentEmbeddingsVector />;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-[#0B0F17] overflow-hidden border border-white/10 group transition-all duration-300 ${shapeClasses} ${sizeClasses} ${
        glow
          ? 'shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:border-white/25'
          : ''
      } ${className}`}
    >
      {/* High-tech corner optics (for square shape) */}
      {containerShape === 'square' && (
        <>
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#38BDF8]/60" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#A855F7]/60" />
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#38BDF8]/60" />
          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#A855F7]/60" />
        </>
      )}

      {/* Subtle ambient neon back-glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-[#A855F7]/10 pointer-events-none" />

      {/* Vector Line-Art Graphic */}
      <div className="relative z-10 w-full h-full p-2 sm:p-2.5 flex items-center justify-center">
        {renderGraphic()}
      </div>
    </div>
  );
};
