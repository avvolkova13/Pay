"use client";

import type { CSSProperties, MouseEvent, PointerEvent, SyntheticEvent } from "react";
import { useEffect, useRef } from "react";
import { type Dictionary, type Locale } from "@/i18n";

export function HeroPlaygroundPage({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const heroTitleLines =
    locale === "ru" && dictionary.hero.title === "Принимайте платежи по всему миру"
      ? ["Принимайте платежи", "по всему миру"]
      : [dictionary.hero.title];

  return (
    <main>
      <section className="hero-section">
        <div className="hero-noise" aria-hidden="true" />
        <div className="section-shell hero-grid">
          <div className="hero-copy">
            <PlaygroundHeroTitle lines={heroTitleLines} />
            <p className="hero-lede" data-reveal="copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {dictionary.hero.text}
            </p>
            <div className="hero-actions" data-reveal="button" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
              <a className="primary-button hero-cta text-roll-button" href="#application" aria-label={dictionary.hero.primary}>
                <span className="button-text-roll" aria-hidden="true" data-text={dictionary.hero.primary}>
                  <span>{dictionary.hero.primary}</span>
                  <span>{dictionary.hero.primary}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PlaygroundHeroTitle({ lines }: { lines: string[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<number | null>(null);
  const isFinePointerRef = useRef(false);
  const isActiveRef = useRef(false);

  const setActive = (value: "0" | "1") => {
    isActiveRef.current = value === "1";
    titleRef.current?.style.setProperty("--title-active", value);
  };

  useEffect(() => {
    isFinePointerRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const deactivateWhenOutside = (clientX: number, clientY: number) => {
      if (!isActiveRef.current || !titleRef.current) {
        return;
      }

      const rect = titleRef.current.getBoundingClientRect();
      const isOutside =
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom;

      if (isOutside) {
        setActive("0");
      }
    };

    const handleWindowPointerMove = (event: globalThis.PointerEvent) => {
      deactivateWhenOutside(event.clientX, event.clientY);
    };

    const handleWindowMouseMove = (event: globalThis.MouseEvent) => {
      deactivateWhenOutside(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  const updatePointer = (event: PointerEvent<HTMLHeadingElement>) => {
    if (!isFinePointerRef.current || !titleRef.current) {
      return;
    }

    const rect = titleRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      titleRef.current?.style.setProperty("--title-x", `${x.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--title-y", `${y.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--text-x", `${x.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--text-y", `${y.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--title-active", "1");
    });
  };

  const updateMouse = (event: MouseEvent<HTMLHeadingElement>) => {
    if (!isFinePointerRef.current || !titleRef.current) {
      return;
    }

    const rect = titleRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      titleRef.current?.style.setProperty("--title-x", `${x.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--title-y", `${y.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--text-x", `${x.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--text-y", `${y.toFixed(2)}%`);
      titleRef.current?.style.setProperty("--title-active", "1");
    });
  };

  const deactivateOnTrueExit = (event: SyntheticEvent<HTMLHeadingElement>) => {
    const nextTarget = event.nativeEvent instanceof globalThis.MouseEvent ? event.nativeEvent.relatedTarget : null;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setActive("0");
  };

  const renderLines = () =>
    lines.map((line) => (
      <span className="hero-title-line" key={line}>
        {line}
      </span>
    ));

  return (
    <h1
      className="hero-title-effect"
      data-reveal="hero-title"
      onMouseEnter={() => setActive("1")}
      onPointerEnter={() => setActive("1")}
      onPointerLeave={deactivateOnTrueExit}
      onPointerMove={updatePointer}
      onPointerOut={deactivateOnTrueExit}
      onMouseLeave={deactivateOnTrueExit}
      onMouseMove={updateMouse}
      onMouseOut={deactivateOnTrueExit}
      ref={titleRef}
    >
      <span aria-hidden="true" className="hero-title-layer hero-title-backdrop">
        {renderLines()}
      </span>
      <span aria-hidden="true" className="hero-title-layer hero-title-wash">
        {renderLines()}
      </span>
      <span className="hero-title-layer hero-title-base">{renderLines()}</span>
      <span aria-hidden="true" className="hero-gradient-blur">
        <i />
        <i />
        <i />
      </span>
      <span aria-hidden="true" className="hero-title-layer hero-title-spotlight">
        {renderLines()}
      </span>
      <span aria-hidden="true" className="hero-title-layer hero-title-liquid">
        {renderLines()}
      </span>
      <span aria-hidden="true" className="hero-title-layer hero-title-aura">
        {renderLines()}
      </span>
    </h1>
  );
}
