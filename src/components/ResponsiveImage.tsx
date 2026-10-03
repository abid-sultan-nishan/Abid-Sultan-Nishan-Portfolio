import React, { useState, useRef, useEffect, useMemo } from 'react';
import { isImageAlreadyCached, markImageAsCached } from '../utils/imagePreloader';
import { DEFAULT_CARD_GRADIENT } from '../utils/imagePlaceholders';
import { getImageFallbackCandidates } from '../utils/assetResolver';

export interface ResponsiveImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  onLoad?: () => void;
  fallbackText?: string;
  gradientFallback?: string;
}

/**
 * Enterprise Responsive Image Component with Multi-Stage Graceful Degradation
 *
 * Resilience Engineering:
 * 1. Multi-Candidate URL Pipeline: Automatically cycles from .webp -> .jpg -> public /assets/ -> dev /src/
 * 2. In-Memory Cache Detection: Renders instantly (0ms) if already loaded in current session.
 * 3. Zero-FOUC Background Gradient: Cards render with a rich ambient gradient before bytes load.
 * 4. Zero Broken UI / Anti-Text Fallback: If all network candidates fail, renders an inline cybernetic
 *    neural mesh SVG with subtle pulsing nodes—NEVER an ugly "Image unavailable" or broken text box.
 * 5. Layout Shift Immunity: Strict aspect ratio and CSS containment.
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  aspectRatio,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  objectFit = 'cover',
  onLoad,
  gradientFallback = DEFAULT_CARD_GRADIENT,
}) => {
  // Generate candidate URLs in priority order
  const candidates = useMemo(() => {
    const list = getImageFallbackCandidates(src);
    if (webpSrc && !list.includes(webpSrc)) {
      list.unshift(webpSrc);
    }
    return list;
  }, [src, webpSrc]);

  // Current candidate index being attempted
  const [candidateIndex, setCandidateIndex] = useState(0);
  const currentSrc = candidates[candidateIndex] || candidates[0];

  // Derive webp variant for <source> if available
  const derivedWebpSrc = currentSrc.endsWith('.webp')
    ? currentSrc
    : currentSrc.replace(/\.(jpe?g|png)$/i, '.webp');

  // Synchronous cache check: If already in memory, initialize as loaded
  const initiallyLoaded = isImageAlreadyCached(currentSrc) || isImageAlreadyCached(derivedWebpSrc);
  const [isLoaded, setIsLoaded] = useState(initiallyLoaded);
  const [allCandidatesFailed, setAllCandidatesFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Synchronous DOM check on mount: If the browser completed loading from disk cache
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      markImageAsCached(currentSrc);
      if (derivedWebpSrc) markImageAsCached(derivedWebpSrc);
    }
  }, [currentSrc, derivedWebpSrc]);

  // Reset state if primary src changes
  useEffect(() => {
    setCandidateIndex(0);
    setAllCandidatesFailed(false);
    setIsLoaded(isImageAlreadyCached(src));
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    markImageAsCached(currentSrc);
    if (derivedWebpSrc) markImageAsCached(derivedWebpSrc);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    // If there are more candidate paths to try, advance to the next one
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
      setIsLoaded(false);
    } else {
      // All candidates exhausted, gracefully degrade to inline SVG neural fallback
      setAllCandidatesFailed(true);
    }
  };

  const fitClass =
    objectFit === 'cover'
      ? 'object-cover'
      : objectFit === 'contain'
      ? 'object-contain'
      : objectFit === 'fill'
      ? 'object-fill'
      : 'object-none';

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{
        background: gradientFallback,
        contain: 'paint layout',
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    >
      {/* Subtle baseline ambient shimmer before byte decode */}
      {!isLoaded && !allCandidatesFailed && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Graceful Inline SVG Neural Vector Fallback (No broken text or "Image unavailable" box) */}
      {allCandidatesFailed ? (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#070B12] overflow-hidden">
          {/* Ambient Cybernetic Grid & Node Network SVG */}
          <svg
            className="w-full h-full opacity-60"
            viewBox="0 0 400 225"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="cyberGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
              <radialGradient id="glowPoint" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Isometric Grid lines */}
            <path
              d="M0 50 L400 150 M0 110 L400 210 M0 170 L400 270 M50 0 L150 225 M150 0 L250 225 M250 0 L350 225"
              stroke="url(#cyberGrid)"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
            {/* Synaptic Nodes */}
            <circle cx="100" cy="75" r="4" fill="#38BDF8" opacity="0.7" />
            <circle cx="100" cy="75" r="12" fill="url(#glowPoint)" />
            <circle cx="200" cy="100" r="5" fill="#A855F7" opacity="0.8" />
            <circle cx="300" cy="125" r="4" fill="#38BDF8" opacity="0.7" />
            <circle cx="250" cy="180" r="3" fill="#34D399" opacity="0.6" />
            {/* Synaptic Connectors */}
            <line x1="100" y1="75" x2="200" y2="100" stroke="#38BDF8" strokeWidth="1.2" opacity="0.4" />
            <line x1="200" y1="100" x2="300" y2="125" stroke="#A855F7" strokeWidth="1.2" opacity="0.4" />
            <line x1="200" y1="100" x2="250" y2="180" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
          </svg>
          {/* Subtle topic watermark pill */}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F17]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#38BDF8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>Neural Representation Vector</span>
          </div>
        </div>
      ) : (
        <picture className="w-full h-full block">
          {derivedWebpSrc !== currentSrc && (
            <source srcSet={derivedWebpSrc} type="image/webp" sizes={sizes} />
          )}
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            width={width}
            height={height}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full ${fitClass} transition-opacity duration-300 ease-out will-change-opacity ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </picture>
      )}
    </div>
  );
};
