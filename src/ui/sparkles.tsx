"use client";

import type { CSSProperties } from "react";

type SparklesCoreProps = {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function round(value: number, precision = 4) {
  return Number(value.toFixed(precision));
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.25,
  maxSize = 0.8,
  particleDensity = 420,
  className,
  particleColor = "#EAF7FF"
}: SparklesCoreProps) {
  const particles = Array.from({ length: particleDensity }, (_, index) => {
    const size = round(minSize + seededRandom(index + 1) * (maxSize - minSize), 3);
    const left = round(seededRandom(index + 21) * 100, 3);
    const top = round(seededRandom(index + 41) * 100, 3);
    const opacity = round(0.18 + seededRandom(index + 61) * 0.58, 3);
    const driftX = round((seededRandom(index + 81) - 0.5) * 34, 3);
    const driftY = round(12 + seededRandom(index + 101) * 54, 3);
    const duration = round(5.8 + seededRandom(index + 121) * 4.8, 3);
    const delay = round(seededRandom(index + 141) * -duration, 3);

    return {
      id: index,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        "--sparkle-color": particleColor,
        "--sparkle-x": `${driftX}px`,
        "--sparkle-y": `${driftY}px`,
        "--sparkle-duration": `${duration}s`,
        "--sparkle-delay": `${delay}s`
      } as CSSProperties
    };
  });

  return (
    <div className={className} style={{ background }} aria-hidden="true">
      {particles.map((particle) => (
        <span className="paywaysSparklesParticle" key={particle.id} style={particle.style} />
      ))}
      <style>{`
        .paywaysSparklesParticle {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: radial-gradient(circle, var(--sparkle-color) 0%, rgba(126, 207, 255, 0.58) 58%, transparent 100%);
          box-shadow: 0 0 8px rgba(126, 207, 255, 0.38);
          transform: translate3d(0, 0, 0);
          animation: paywaysSparklesFloat var(--sparkle-duration) linear var(--sparkle-delay) infinite;
          will-change: transform, opacity;
        }

        @keyframes paywaysSparklesFloat {
          0% {
            opacity: 0;
            transform: translate3d(0, -8px, 0) scale(0.68);
          }

          18% {
            opacity: 0.78;
          }

          72% {
            opacity: 0.48;
          }

          100% {
            opacity: 0;
            transform: translate3d(var(--sparkle-x), var(--sparkle-y), 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .paywaysSparklesParticle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
