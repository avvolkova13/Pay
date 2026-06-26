"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { routePairs, type Dictionary, type Locale } from "@/i18n";

export function IndustryTabs({ items }: { items: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="industry-system reveal">
      <div className="industry-tabs" aria-label="Industries">
        {items.map(([title], index) => (
          <button
            key={title}
            type="button"
            aria-pressed={active === index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <article className="industry-canvas">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <h3>{current[0]}</h3>
        <p>{current[1]}</p>
        <div className="industry-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </article>
    </div>
  );
}

export function IndustryMarquee({
  items,
  label = "Industries"
}: {
  items: readonly (readonly [string, string])[];
  label?: string;
}) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="industry-marquee" aria-label={label}>
      <div className="industry-track">
        {repeatedItems.map(([title, text], index) => (
          <article key={`${title}-${index}`} className="industry-pill">
            <span>{title}</span>
            {text ? <p>{text}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function ApiFeatureRows({ items }: { items: readonly (string | readonly [string, string])[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>(".api-feature-row"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.28 }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="api-feature-list">
      {items.map((item, index) => {
        const title = Array.isArray(item) ? item[0] : item;
        const text = Array.isArray(item) ? item[1] : "";

        return (
          <article
            key={title}
            className="api-feature-row"
            style={{ "--row-index": index } as CSSProperties & Record<"--row-index", number>}
          >
            <div className="api-feature-copy">
              <h3 data-text={title}>{title}</h3>
              {text ? <p>{text}</p> : null}
            </div>
            <span className={`api-feature-icon api-feature-icon-${index + 1}`} aria-hidden="true">
              <svg viewBox="0 0 48 48" focusable="false">
                {index === 0 ? (
                  <>
                    <path d="M12 30h24" />
                    <path d="M18 24h18" />
                    <path d="M24 18h12" />
                    <path d="M12 18v18h24" />
                  </>
                ) : index === 1 ? (
                  <>
                    <rect x="12" y="12" width="24" height="24" rx="1" />
                    <path d="M18 19h12" />
                    <path d="M18 25h18" />
                    <path d="M18 31h8" />
                  </>
                ) : index === 2 ? (
                  <>
                    <path d="M14 12h18l4 4v20H14z" />
                    <path d="M31 12v6h5" />
                    <path d="M19 24h12" />
                    <path d="M19 30h9" />
                  </>
                ) : (
                  <>
                    <path d="M14 30v-5a10 10 0 0 1 20 0v5" />
                    <path d="M14 30h6v6h-6z" />
                    <path d="M28 30h6v6h-6z" />
                    <path d="M24 36h7" />
                  </>
                )}
              </svg>
            </span>
          </article>
        );
      })}
    </div>
  );
}

export function SecurityStack({ items }: { items: readonly (readonly [string, string])[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".trust-card"));
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const ease = (value: number) => {
      const t = clamp(value);
      return t * t * (3 - 2 * t);
    };

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight || 1;
      const appearStart = viewport * 0.94;
      const openStart = viewport * 0.74;
      const finish = viewport * 0.34;

      let railProgress = 0;
      let railVisibility = 0;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const appear = ease((appearStart - rect.top) / (appearStart - finish));
        const open = ease((openStart - rect.top) / (openStart - finish));
        const height = 158 + open * 362;
        const lift = (1 - appear) * 72;
        const opacity = 0.38 + appear * 0.62;
        const innerShift = (1 - open) * 24;
        const visualScale = 0.94 + open * 0.06;

        card.style.setProperty("--card-height", `${height.toFixed(1)}px`);
        card.style.setProperty("--card-lift", `${lift.toFixed(1)}px`);
        card.style.setProperty("--card-opacity", opacity.toFixed(3));
        card.style.setProperty("--card-open", open.toFixed(3));
        card.style.setProperty("--card-inner-shift", `${innerShift.toFixed(1)}px`);
        card.style.setProperty("--card-visual-scale", visualScale.toFixed(3));

        railProgress += open / cards.length;
        railVisibility = Math.max(railVisibility, appear);
      });

      root.style.setProperty("--rail-progress", railProgress.toFixed(4));
      root.style.setProperty("--rail-opacity", (0.28 + railVisibility * 0.22).toFixed(3));
      root.style.setProperty("--rail-marker-top", `${(railProgress * 100).toFixed(2)}%`);
      root.style.setProperty("--rail-marker-opacity", (0.55 + railProgress * 0.45).toFixed(3));
      root.style.setProperty("--rail-shift", `${(-railProgress * 14).toFixed(1)}px`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={rootRef} className="trust-framework reveal">
      {items.map(([title, text], index) => (
        <article key={title} className="trust-card">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{title}</h3>
          <p>{text}</p>
          <div className="trust-card-visual" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </article>
      ))}
    </div>
  );
}

export function ApplicationForm({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const [success, setSuccess] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSuccess(true);
  }

  return (
    <form className="application-form reveal" onSubmit={onSubmit}>
      <label>
        {dictionary.form.name}
        <input name="name" required />
      </label>
      <label>
        {dictionary.form.email}
        <input name="email" type="email" required />
      </label>
      <label>
        {dictionary.form.phone}
        <input name="phone" type="tel" required />
      </label>
      <label>
        {dictionary.form.website}
        <input name="website" type="url" placeholder="https://" />
      </label>
      <label className="wide-field">
        {dictionary.form.message}
        <textarea name="message" rows={5} required />
      </label>
      <button className="primary-button wide-field text-roll-button" type="submit">
        <span className="button-text-roll" aria-hidden="true" data-text={dictionary.form.submit}>
          <span>{dictionary.form.submit}</span>
          <span>{dictionary.form.submit}</span>
        </span>
      </button>
      {success ? (
        <div className="success-message wide-field" role="status">
          <p>{dictionary.form.success}</p>
          <Link href={routePairs.checkout[locale]}>{dictionary.form.checkout}</Link>
        </div>
      ) : null}
    </form>
  );
}

export function DemoCardForm({ dictionary }: { dictionary: Dictionary }) {
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(true);
  }

  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <strong className="warning">{dictionary.checkout.warning}</strong>
      <label>
        {dictionary.checkout.cardNumber}
        <input name="cardNumber" value="4111 •••• •••• 1111" readOnly />
      </label>
      <div className="form-row">
        <label>
          {dictionary.checkout.expiry}
          <input name="expiry" value="12/30" readOnly />
        </label>
        <label>
          {dictionary.checkout.cvv}
          <input name="cvv" value="***" readOnly />
        </label>
      </div>
      <label>
        {dictionary.checkout.cardholder}
        <input name="cardholder" value="DEMO CARDHOLDER" readOnly />
      </label>
      {error ? (
        <strong className="form-error" role="alert">
          {dictionary.checkout.error}
        </strong>
      ) : null}
      <button className="primary-button" type="submit">
        {dictionary.checkout.submit}
      </button>
    </form>
  );
}
