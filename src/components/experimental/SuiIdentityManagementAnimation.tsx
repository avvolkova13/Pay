"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import styles from "./SuiIdentityManagementAnimation.module.css";

type MotionStyle = CSSProperties & {
  "--mx": string;
  "--my": string;
  "--tilt-x": string;
  "--tilt-y": string;
};

const motionStyle: MotionStyle = {
  "--mx": "0",
  "--my": "0",
  "--tilt-x": "0deg",
  "--tilt-y": "0deg",
};

export default function SuiIdentityManagementAnimation() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const glowId = "suiIdentityGlow";
  const plateId = "suiIdentityPlate";
  const blueSideId = "suiIdentityBlueSide";

  const syncPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;

    setIsHovering(true);

    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    root.style.setProperty("--mx", x.toFixed(4));
    root.style.setProperty("--my", y.toFixed(4));
    root.style.setProperty("--tilt-x", `${(-y * 3.2).toFixed(3)}deg`);
    root.style.setProperty("--tilt-y", `${(x * 4.2).toFixed(3)}deg`);
  }, []);

  const resetPointer = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    setIsHovering(false);
    root.style.setProperty("--mx", "0");
    root.style.setProperty("--my", "0");
    root.style.setProperty("--tilt-x", "0deg");
    root.style.setProperty("--tilt-y", "0deg");
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.motionRoot}
      style={motionStyle}
      data-hovered={isHovering ? "true" : "false"}
      aria-label="Identity management isometric animation"
      onPointerEnter={() => setIsHovering(true)}
      onPointerMove={syncPointer}
      onPointerLeave={resetPointer}
    >
      <svg
        className={styles.scene}
        viewBox="0 0 640 420"
        role="img"
        aria-label="Layered identity management interface animation"
      >
        <defs>
          <filter id={glowId} x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="3.4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.05 0 0 0 0 0.49 0 0 0 0 1 0 0 0 0.76 0"
              result="blue"
            />
            <feMerge>
              <feMergeNode in="blue" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={plateId} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#2087ff" stopOpacity="0.34" />
            <stop offset="0.58" stopColor="#0067d8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#003a88" stopOpacity="0.62" />
          </linearGradient>

          <linearGradient id={blueSideId} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#67bdff" stopOpacity="0.82" />
            <stop offset="0.55" stopColor="#2087ff" stopOpacity="0.92" />
            <stop offset="1" stopColor="#003a88" stopOpacity="0.96" />
          </linearGradient>
        </defs>

        <g className={styles.world}>
          <g className={styles.addressBack}>
            <g className={styles.addressBackFloat}>
              <polygon points="115,161 297,67 431,132 248,226" />
              <polygon points="248,226 431,132 431,154 248,249" />
              <polygon points="115,161 248,226 248,249 115,183" />
              <text x="162" y="166" transform="rotate(-27 162 166)">
                B2B Invoicing
              </text>
            </g>
          </g>

          <g className={styles.addressFront}>
            <g className={styles.addressFrontFloat}>
              <polygon points="326,279 509,185 625,241 442,336" />
              <polygon points="442,336 625,241 625,265 442,360" />
              <polygon points="326,279 442,336 442,360 326,303" />
              <text
                x="475"
                y="275"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-27 475 275)"
              >
                B2C Payments
              </text>
            </g>
          </g>

          <g className={styles.coreBase}>
            <g className={styles.coreBaseFloat}>
              <polygon points="214,222 335,160 455,219 333,282" />
              <polygon points="333,282 455,219 455,245 333,308" />
              <polygon points="214,222 333,282 333,308 214,248" />
            </g>
          </g>

          <g className={styles.coreMid}>
            <g className={styles.coreMidFloat}>
              <polygon points="238,184 346,129 455,182 346,239" />
              <polygon points="346,239 455,182 455,207 346,264" />
              <polygon points="238,184 346,239 346,264 238,209" />
            </g>
          </g>

          <g className={styles.coreTop}>
            <g className={styles.coreTopFloat}>
              <polygon points="266,151 356,105 450,150 359,197" />
              <polygon points="359,197 450,150 450,174 359,222" />
              <polygon points="266,151 359,197 359,222 266,175" />
            </g>
          </g>

          <g className={styles.blueLines}>
            <g className={styles.blueLinesFloat}>
              <path d="M215 220 301 176 385 218" />
              <path d="M285 151 356 116 428 151" />
              <path d="M309 252 376 218 444 250" />
              <path d="M191 191 255 158 316 188" />
            </g>
          </g>

          <g className={styles.techLines}>
            <g className={styles.techLinesFloat}>
              <path d="M177 232 249 195 316 228" />
              <path d="M376 124 432 96 493 126" />
              <path d="M256 293 333 252 412 292" />
            </g>
          </g>

          <g className={styles.topBadge} filter={`url(#${glowId})`}>
            <g className={styles.topBadgeFloat}>
              <polygon points="281,111 414,43 514,91 380,160" />
              <polygon points="380,160 514,91 514,121 380,191" />
              <polygon points="281,111 380,160 380,191 281,140" />
              <text
                className={styles.compactLabel}
                x="397"
                y="102"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-27 397 102)"
              >
                Card Processing
              </text>
            </g>
          </g>

          <g className={styles.bottomBadge} filter={`url(#${glowId})`}>
            <g className={styles.bottomBadgeFloat}>
              <polygon points="136,271 272,202 381,255 244,325" />
              <polygon points="244,325 381,255 381,287 244,357" />
              <polygon points="136,271 244,325 244,357 136,303" />
              <text
                x="258"
                y="263"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-27 258 263)"
              >
                Mass Payouts
              </text>
            </g>
          </g>

          <g className={styles.cornerBlock} filter={`url(#${glowId})`}>
            <g className={styles.cornerBlockFloat}>
              <polygon points="463,105 546,63 611,95 527,138" />
              <polygon points="527,138 611,95 611,128 527,171" />
              <polygon points="463,105 527,138 527,171 463,138" />
              <text x="496" y="118" transform="rotate(-27 496 118)">
                QR Payments
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
