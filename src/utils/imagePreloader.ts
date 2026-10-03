/**
 * High-Performance Image Preloader & Browser Cache Manager
 *
 * Pre-warms card background images and conceptual illustrations into browser cache
 * during idle cycles, ensuring instant 0ms rendering when users scroll or switch tabs.
 */

// Global set tracking URLs that have completed loading in the current session
export const LOADED_IMAGE_URLS = new Set<string>();

/**
 * Checks synchronously whether an image URL is already verified in browser memory
 */
export const isImageAlreadyCached = (src?: string): boolean => {
  if (!src) return false;
  return LOADED_IMAGE_URLS.has(src);
};

/**
 * Registers an image URL as loaded into memory cache
 */
export const markImageAsCached = (src?: string): void => {
  if (!src) return;
  LOADED_IMAGE_URLS.add(src);
};

/**
 * Preloads a single image into memory
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): Promise<void> => {
  return new Promise((resolve) => {
    if (!src || LOADED_IMAGE_URLS.has(src)) {
      resolve();
      return;
    }

    // Try webp variant first if jpg/png
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

    const img = new Image();
    if (priority === 'high') {
      img.fetchPriority = 'high';
    }
    img.decoding = 'async';

    img.onload = () => {
      LOADED_IMAGE_URLS.add(src);
      LOADED_IMAGE_URLS.add(webpSrc);
      resolve();
    };

    img.onerror = () => {
      // Fallback to original src if webp failed
      if (img.src !== src) {
        img.src = src;
      } else {
        resolve();
      }
    };

    img.src = webpSrc;
  });
};

/**
 * Critical images that should be prefetched with high priority immediately on page start
 */
export const CRITICAL_PRELOAD_IMAGES: string[] = [
  '/assets/passport-size-picture.webp',
  '/assets/Passport Size Picture.jpg',
  '/assets/images/abid-sultan-nishan.webp',
  '/assets/images/iso_nlp_semantic_1791005130807.webp',
  '/assets/images/iso_llm_transformer_1791005148038.webp',
  '/assets/images/iso_model_adaptation_1791005163912.webp',
  '/assets/images/card_lora_peft_1791002709007.webp',
  '/assets/images/bg_adalora_indic_1791004551998.webp',
];

/**
 * Secondary images to prefetch during browser idle time (requestIdleCallback)
 */
export const SECONDARY_CARD_IMAGES: string[] = [
  '/assets/images/iso_deep_learning_1791005175408.webp',
  '/assets/images/iso_applied_ml_1791005189043.webp',
  '/assets/images/iso_multimodal_vision_1791005200253.webp',
  '/assets/images/iso_reinforce_policy_1791005215408.webp',
  '/assets/images/card_rag_search_1791002722950.webp',
  '/assets/images/card_nlp_tokens_1791002735307.webp',
  '/assets/images/card_deeplearning_1791003386557.webp',
  '/assets/images/card_appliedml_1791003398017.webp',
  '/assets/images/bg_cross_attention_1791004595630.webp',
  '/assets/images/bg_explog_gradient_1791004585234.webp',
  '/assets/images/bg_kv_cache_1791004616575.webp',
  '/assets/images/bg_lora_sweep_1791004605906.webp',
];

/**
 * Initializes eager and idle background pre-caching
 */
export const initImagePreloader = (): void => {
  if (typeof window === 'undefined') return;

  // 1. Immediately warm critical top-of-page assets
  CRITICAL_PRELOAD_IMAGES.forEach((src) => {
    preloadImage(src, 'high');
  });

  // 2. Pre-cache remaining card assets during idle time to never block main thread
  const warmSecondary = () => {
    let index = 0;
    const preloadChunk = () => {
      const chunk = SECONDARY_CARD_IMAGES.slice(index, index + 3);
      index += 3;
      chunk.forEach((src) => preloadImage(src, 'low'));
      if (index < SECONDARY_CARD_IMAGES.length) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(preloadChunk, { timeout: 2000 });
        } else {
          setTimeout(preloadChunk, 150);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadChunk, { timeout: 3000 });
    } else {
      setTimeout(preloadChunk, 500);
    }
  };

  if (document.readyState === 'complete') {
    warmSecondary();
  } else {
    window.addEventListener('load', warmSecondary, { once: true });
  }
};
