"use client";

import type { CSSProperties, MouseEvent, PointerEvent, SyntheticEvent } from "react";
import { useEffect, useRef } from "react";
import { SparklesCore } from "../ui/sparkles";
import styles from "./HeroPlayground.module.css";

type HeroPlaygroundProps = {
  titleLines?: string[];
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const defaultTitleLines = ["Принимайте платежи", "по всему миру"];

export function HeroPlayground({
  titleLines = defaultTitleLines,
  text = "Подключайте карточные платежи, QR-оплату, массовые выплаты и B2B-инвойсы через единую платформу. Безопасная инфраструктура, удобная интеграция и сопровождение на каждом этапе подключения.",
  ctaLabel = "Начать сотрудничество",
  ctaHref = "#application"
}: HeroPlaygroundProps) {
  return (
    <main className={styles.playground}>
      <section className={styles.heroSection}>
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={`${styles.sectionShell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <PlaygroundHeroTitle lines={titleLines} />
            <p
              className={`${styles.heroLede} ${styles.revealCopy}`}
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              {text}
            </p>
            <div
              className={`${styles.heroActions} ${styles.revealButton}`}
              style={{ "--reveal-delay": "220ms" } as CSSProperties}
            >
              <a className={`${styles.primaryButton} ${styles.heroCta} ${styles.textRollButton}`} href={ctaHref} aria-label={ctaLabel}>
                <span className={styles.buttonTextRoll} aria-hidden="true" data-text={ctaLabel}>
                  <span>{ctaLabel}</span>
                  <span>{ctaLabel}</span>
                </span>
              </a>
            </div>
            <SparklesShelf />
          </div>
        </div>
      </section>
    </main>
  );
}

function SparklesShelf() {
  return (
    <div className={`${styles.sparklesShelf} ${styles.revealSparkles}`} aria-hidden="true">
      <div className={styles.shelfGlow} />
      <div className={styles.shelfLine} />
      <SparklesCore
        background="transparent"
        minSize={0.25}
        maxSize={0.8}
        particleDensity={420}
        className={styles.sparklesCore}
        particleColor="#EAF7FF"
      />
      <div className={styles.sparklesMask} />
    </div>
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
      <span className={styles.heroTitleLine} key={line}>
        {line}
      </span>
    ));

  return (
    <h1
      className={`${styles.heroTitleEffect} ${styles.revealHeroTitle}`}
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
      <span aria-hidden="true" className={`${styles.heroTitleLayer} ${styles.heroTitleBackdrop}`}>
        {renderLines()}
      </span>
      <span aria-hidden="true" className={`${styles.heroTitleLayer} ${styles.heroTitleWash}`}>
        {renderLines()}
      </span>
      <span className={`${styles.heroTitleLayer} ${styles.heroTitleBase}`}>{renderLines()}</span>
      <span aria-hidden="true" className={styles.heroGradientBlur}>
        <i />
        <i />
        <i />
      </span>
      <span aria-hidden="true" className={`${styles.heroTitleLayer} ${styles.heroTitleSpotlight}`}>
        {renderLines()}
      </span>
      <span aria-hidden="true" className={`${styles.heroTitleLayer} ${styles.heroTitleLiquid}`}>
        {renderLines()}
      </span>
      <span aria-hidden="true" className={`${styles.heroTitleLayer} ${styles.heroTitleAura}`}>
        {renderLines()}
      </span>
    </h1>
  );
}
