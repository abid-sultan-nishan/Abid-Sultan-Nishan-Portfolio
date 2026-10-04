import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  isDark?: boolean;
}

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'attention' | 'hidden' | 'latent' | 'hub';
  color: string;
  activation: number;
  pulse: number;
  isHub: boolean;
}

interface SynapticSignal {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Viewport and DPR settings
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    // Determine node count and thresholds based on device width
    const getNodeConfig = () => {
      if (width < 480) {
        return { count: 18, maxDist: 85, maxSignals: 6 };
      } else if (width < 768) {
        return { count: 28, maxDist: 100, maxSignals: 10 };
      } else if (width < 1200) {
        return { count: 42, maxDist: 125, maxSignals: 15 };
      }
      return { count: 56, maxDist: 140, maxSignals: 20 };
    };

    let config = getNodeConfig();

    // Color palettes
    const colorsDark = {
      attention: 'rgba(168, 85, 247, 0.75)', // Purple
      hidden: 'rgba(56, 189, 248, 0.85)', // Cyan
      latent: 'rgba(129, 140, 248, 0.75)', // Indigo
      hub: 'rgba(56, 189, 248, 0.95)', // Cyan
      gridCross: 'rgba(255, 255, 255, 0.035)',
    };

    const colorsLight = {
      attention: '#7C3AED',
      hidden: '#0891B2',
      latent: '#4F46E5',
      hub: '#0284C7',
      gridCross: 'rgba(100, 116, 139, 0.09)',
    };

    // Initialize Neural Nodes
    const createNodes = (): NeuralNode[] => {
      const nodes: NeuralNode[] = [];
      const types: NeuralNode['type'][] = ['attention', 'hidden', 'latent', 'hub'];

      for (let i = 0; i < config.count; i++) {
        const isHub = i % 8 === 0;
        const type = isHub ? 'hub' : types[i % (types.length - 1)];
        const isCurrentDark = document.documentElement.classList.contains('dark');
        const colorSet = isCurrentDark ? colorsDark : colorsLight;

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.2 : 0.35),
          vy: (Math.random() - 0.5) * (isHub ? 0.2 : 0.35),
          radius: isHub ? Math.random() * 0.7 + 2.2 : Math.random() * 0.7 + 1.2,
          type,
          color: colorSet[type],
          activation: Math.random() * 0.25,
          pulse: Math.random() * Math.PI * 2,
          isHub,
        });
      }
      return nodes;
    };

    let nodes = createNodes();
    let signals: SynapticSignal[] = [];

    const handleResizeDebounced = () => {
      resize();
      config = getNodeConfig();
      if (nodes.length !== config.count) {
        nodes = createNodes();
      }
    };
    window.addEventListener('resize', handleResizeDebounced);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Main ambient animation loop (no hover tracking)
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
      if (!isTabVisible) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const isCurrentDark = document.documentElement.classList.contains('dark');
      const colors = isCurrentDark ? colorsDark : colorsLight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Latent Matrix Crosshairs in the background
      const gridSpacing = 95;
      const startX = (width % gridSpacing) / 2;
      const startY = (height % gridSpacing) / 2;

      ctx.strokeStyle = colors.gridCross;
      ctx.lineWidth = 0.5;

      for (let x = startX; x < width; x += gridSpacing) {
        for (let y = startY; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x - 2, y);
          ctx.lineTo(x + 2, y);
          ctx.moveTo(x, y - 2);
          ctx.lineTo(x, y + 2);
          ctx.stroke();
        }
      }

      // 2. Update Neural Nodes position & physics (natural smooth brownian drift)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Soft border bounce
        if (n.x < 15) {
          n.x = 15;
          n.vx *= -1;
        } else if (n.x > width - 15) {
          n.x = width - 15;
          n.vx *= -1;
        }

        if (n.y < 15) {
          n.y = 15;
          n.vy *= -1;
        } else if (n.y > height - 15) {
          n.y = height - 15;
          n.vy *= -1;
        }

        n.pulse += dt * (n.isHub ? 1.8 : 1.4);
        n.activation = Math.max(0, n.activation - dt * 0.7);
      }

      // 3. Draw Synapses (Edges between nodes within distance threshold)
      const activeConnections: { i: number; j: number; dist: number; alpha: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.maxDist) {
            const normalizedDist = 1 - dist / config.maxDist;
            const baseAlpha = isCurrentDark ? 0.08 : 0.11;
            const alpha = Math.min(0.5, baseAlpha * Math.pow(normalizedDist, 1.4) + (ni.activation + nj.activation) * 0.2);

            activeConnections.push({ i, j, dist, alpha });

            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);

            ctx.strokeStyle = isCurrentDark
              ? `rgba(168, 85, 247, ${alpha})`
              : `rgba(100, 116, 139, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Spontaneous natural signal emission along active connections
      if (signals.length < config.maxSignals && activeConnections.length > 0 && Math.random() > 0.95) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        signals.push({
          sourceIdx: conn.i,
          targetIdx: conn.j,
          progress: 0.0,
          speed: 0.012 + Math.random() * 0.015,
          color: nodes[conn.i].color,
          size: Math.random() * 0.6 + 1.1,
        });
      }

      // 4. Draw Synaptic Signal Packets (Traveling Action Potentials)
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1.0) {
          if (nodes[sig.targetIdx]) {
            nodes[sig.targetIdx].activation = Math.min(1.0, nodes[sig.targetIdx].activation + 0.3);
          }
          signals.splice(s, 1);
          continue;
        }

        const src = nodes[sig.sourceIdx];
        const tgt = nodes[sig.targetIdx];
        if (!src || !tgt) {
          signals.splice(s, 1);
          continue;
        }

        const px = src.x + (tgt.x - src.x) * sig.progress;
        const py = src.y + (tgt.y - src.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(px, py, sig.size, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.fill();
      }

      // 5. Draw Neural Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const breath = Math.sin(n.pulse) * 0.35 + 0.65;
        const currentRadius = n.radius + n.activation * 1.2;

        // Hub outer halo ring
        if (n.isHub || n.activation > 0.35) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, currentRadius + 3 + breath * 1.2, 0, Math.PI * 2);
          ctx.strokeStyle = isCurrentDark ? `${n.color}26` : `${n.color}20`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Core neuron body
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Subtle specular center dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResizeDebounced);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 dark:opacity-70 transition-opacity duration-500"
    />
  );
};
