"use client";

import { useEffect, useState } from "react";

const LOADER_DURATION = 1180;
const LOADER_EXIT_DURATION = 260;

export function SiteLoader() {
  const [phase, setPhase] = useState<"active" | "exiting" | "done">("active");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 260 : LOADER_DURATION;
    const exitDuration = reduceMotion ? 180 : LOADER_EXIT_DURATION;
    const exitTimer = window.setTimeout(() => {
      setPhase("exiting");
    }, duration);

    const doneTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("is-loading");
      setPhase("done");
    }, duration + exitDuration);

    document.documentElement.classList.add("is-loading");

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`site-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      aria-label="PAYWAYS loading"
      aria-live="polite"
      role="status"
    >
      <div className="site-loader-rail">
        <span className="site-loader-blue" />
        <span className="site-loader-percent" />
        <span className="site-loader-streak" />
        <span className="site-loader-dash" />
        <span className="site-loader-cursor" />
      </div>
    </div>
  );
}
