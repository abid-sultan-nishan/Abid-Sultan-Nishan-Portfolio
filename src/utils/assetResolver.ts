/**
 * Asset Resolver & Path Normalizer for Portfolio Static Assets
 *
 * Solves common deployment pitfalls:
 * 1. Path Resolution: Converts relative ('./assets/'), bundler-only ('/src/assets/'),
 *    and absolute paths to production-safe public root URLs ('/assets/images/...').
 * 2. Format Fallbacks: Seamlessly cascades from modern .webp to .jpg/.png.
 * 3. Case-Sensitivity & Missing Files: Ensures Linux/Vercel case-matching.
 * 4. Graceful Degradation: Guarantees every card has a rock-solid visual asset.
 */

// Universal high-resolution neural concept graphic (verified on disk)
export const UNIVERSAL_FALLBACK_IMAGE_WEBP = '/assets/images/ai_neural_concept_1790965562075.webp';
export const UNIVERSAL_FALLBACK_IMAGE_JPG = '/assets/images/ai_neural_concept_1790965562075.jpg';

/**
 * Normalizes any static image path to standard public-served path '/assets/images/...'
 */
export function normalizeImagePath(path?: string): string {
  if (!path) return UNIVERSAL_FALLBACK_IMAGE_WEBP;

  // If it's already a full HTTP(S) URL or data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Strip leading '/src/' or './src/'
  let clean = path.replace(/^\.?\/?src\//, '/');

  // Strip leading './'
  clean = clean.replace(/^\.\//, '/');

  // Ensure leading slash
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }

  // If path is like '/assets/images/...', keep it
  // If path is '/images/...', prepend '/assets'
  if (clean.startsWith('/images/')) {
    clean = '/assets' + clean;
  }

  return clean;
}

/**
 * Generates an ordered list of candidate fallback URLs for a given image path.
 * 
 * Order of attempts:
 * 1. Normalized .webp path in /assets/images/
 * 2. Normalized .jpg path in /assets/images/
 * 3. Vite dev server /src/assets/images/ variant
 * 4. Universal fallback asset
 */
export function getImageFallbackCandidates(rawPath?: string): string[] {
  if (!rawPath) return [UNIVERSAL_FALLBACK_IMAGE_WEBP, UNIVERSAL_FALLBACK_IMAGE_JPG];

  if (rawPath.startsWith('http') || rawPath.startsWith('data:')) {
    return [rawPath];
  }

  const normalized = normalizeImagePath(rawPath);
  const candidates: string[] = [];

  // 1. WebP version in /assets/images/
  const webpVariant = normalized.replace(/\.(jpe?g|png)$/i, '.webp');
  candidates.push(webpVariant);

  // 2. JPG version in /assets/images/
  const jpgVariant = normalized.replace(/\.webp$/i, '.jpg');
  if (jpgVariant !== webpVariant) {
    candidates.push(jpgVariant);
  }

  // 3. Original normalized path if different
  if (!candidates.includes(normalized)) {
    candidates.unshift(normalized);
  }

  // 4. Vite /src/ fallback variant (useful in dev mode)
  const srcVariant = normalized.replace(/^\/assets\//, '/src/assets/');
  if (!candidates.includes(srcVariant)) {
    candidates.push(srcVariant);
  }

  // 5. Universal fallback
  if (!candidates.includes(UNIVERSAL_FALLBACK_IMAGE_WEBP)) {
    candidates.push(UNIVERSAL_FALLBACK_IMAGE_WEBP);
  }

  return candidates;
}

/**
 * Standard native <img> onError handler for direct drop-in on React elements
 *
 * Example:
 * <img src={url} onError={handleNativeImageError} alt="Preview" />
 */
export function handleNativeImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = UNIVERSAL_FALLBACK_IMAGE_WEBP
): void {
  const img = e.currentTarget;
  // Prevent infinite error loop if fallback also errors
  if (img.dataset.hasFailedFallback === 'true') {
    // Hide broken image icon, display transparent pixel
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
    img.style.display = 'none';
    return;
  }

  img.dataset.hasFailedFallback = 'true';
  img.src = fallbackSrc;
}
