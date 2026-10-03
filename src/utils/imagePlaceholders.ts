/**
 * Instant Inline SVG Blur Placeholders & Ambient Low-Res Gradients
 *
 * Provides immediate inline CSS backgrounds so cards display a polished,
 * dark neural aesthetic from the very first frame before network bytes finish.
 */

// Universal high-tech dark background gradient
export const DEFAULT_CARD_GRADIENT =
  'radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, #070B12 100%)';

// Topic-specific ambient gradients
export const TOPIC_GRADIENTS: Record<string, string> = {
  nlp: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 28, 54, 0.6) 50%, #070B12 100%)',
  llm: 'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.22) 0%, rgba(38, 18, 64, 0.6) 50%, #070B12 100%)',
  finetuning: 'radial-gradient(ellipse at 50% 20%, rgba(52, 211, 153, 0.22) 0%, rgba(12, 44, 34, 0.6) 50%, #070B12 100%)',
  'deep-learning': 'radial-gradient(ellipse at 50% 20%, rgba(96, 165, 250, 0.22) 0%, rgba(16, 32, 64, 0.6) 50%, #070B12 100%)',
  'applied-ml': 'radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.20) 0%, rgba(54, 36, 10, 0.6) 50%, #070B12 100%)',
  'computer-vision': 'radial-gradient(ellipse at 50% 20%, rgba(236, 72, 153, 0.20) 0%, rgba(54, 16, 38, 0.6) 50%, #070B12 100%)',
  'reinforcement-learning': 'radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.22) 0%, rgba(32, 20, 58, 0.6) 50%, #070B12 100%)',
};

/**
 * Lightweight inlined SVG neural lattice placeholder (less than 300 bytes)
 * Pre-rendered in base64 data URI to eliminate any external network request.
 */
export const INLINE_NEURAL_SVG_DATA_URI =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30"><rect width="40" height="30" fill="%23070B12"/><circle cx="10" cy="15" r="2" fill="%2338BDF8" opacity="0.3"/><circle cx="30" cy="15" r="2" fill="%23A855F7" opacity="0.3"/><line x1="10" y1="15" x2="30" y2="15" stroke="%2338BDF8" stroke-width="0.5" opacity="0.2"/></svg>';
