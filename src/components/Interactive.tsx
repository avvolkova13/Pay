"use client";

import type { CSSProperties } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { type Dictionary } from "@/i18n";

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
  label = "Industries",
  reveal = false,
  revealDelay
}: {
  items: readonly (readonly [string, string])[];
  label?: string;
  reveal?: boolean;
  revealDelay?: string;
}) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="industry-marquee"
      aria-label={label}
      data-reveal={reveal ? "decor" : undefined}
      style={revealDelay ? ({ "--reveal-delay": revealDelay } as CSSProperties) : undefined}
    >
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
                    <rect x="8.5" y="14" width="11" height="20" rx="1.5" />
                    <rect x="28.5" y="14" width="11" height="20" rx="1.5" />
                    <path d="M19.5 20h5.2c2.2 0 3.8 1.6 3.8 3.8v.4c0 2.2-1.6 3.8-3.8 3.8h-5.2" />
                    <path className="api-icon-accent" d="M13.5 21h4" />
                    <path className="api-icon-accent" d="M30.5 27h4" />
                    <circle className="api-icon-node" cx="14" cy="27" r="1.45" />
                    <circle className="api-icon-node" cx="34" cy="21" r="1.45" />
                  </>
                ) : index === 1 ? (
                  <>
                    <rect x="9" y="10.5" width="30" height="27" rx="2" />
                    <path d="M9 17.5h30" />
                    <rect x="13.5" y="22" width="8" height="9.5" rx="1" />
                    <path d="M26 31.5h8.5" />
                    <path d="M26 26.5h8.5" />
                    <path className="api-icon-accent" d="M26 22.5h5.5" />
                    <circle className="api-icon-node" cx="14" cy="14" r="1" />
                    <circle className="api-icon-node api-icon-node-soft" cx="18" cy="14" r="1" />
                  </>
                ) : index === 2 ? (
                  <>
                    <path d="M13 9.5h16.5L36 16v22.5H13z" />
                    <path d="M29.5 9.5V16H36" />
                    <path d="M18 20.5h8" />
                    <path d="M18 33h12" />
                    <path className="api-icon-accent" d="m21 25-3 3 3 3" />
                    <path className="api-icon-accent" d="m28 25 3 3-3 3" />
                    <path d="M24 31.5 26 24.5" />
                  </>
                ) : (
                  <>
                    <rect x="9.5" y="12.5" width="27" height="21" rx="2" />
                    <path d="M9.5 18.5h27" />
                    <path d="M19 37.5h12" />
                    <path d="M25 33.5v4" />
                    <path d="M15.5 25h6.5" />
                    <path d="M15.5 29h10" />
                    <path className="api-icon-accent" d="M15.5 22h4.5" />
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
        const titleWake = ease((open - 0.48) / 0.42);

        card.style.setProperty("--card-reveal", appear.toFixed(3));
        card.style.setProperty("--card-height", `${height.toFixed(1)}px`);
        card.style.setProperty("--card-lift", `${lift.toFixed(1)}px`);
        card.style.setProperty("--card-opacity", opacity.toFixed(3));
        card.style.setProperty("--card-open", open.toFixed(3));
        card.style.setProperty("--card-title-wake", titleWake.toFixed(3));
        card.style.setProperty("--card-inner-shift", `${innerShift.toFixed(1)}px`);
        card.style.setProperty("--card-visual-scale", visualScale.toFixed(3));
        card.classList.toggle("is-present", appear > 0.12);
        card.classList.toggle("is-open", open > 0.28);
        card.classList.toggle("is-title-live", titleWake > 0.18);

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
          <div
            className={`trust-card-visual${index === 0 ? " trust-card-visual-application" : ""}${
              index === 1 ? " trust-card-visual-trusted" : ""
            }${index === 2 ? " trust-card-visual-security" : ""}`}
            aria-hidden="true"
          >
            {index === 0 ? (
              <svg className="application-rive-echo" viewBox="0 0 260 190" focusable="false">
                <g className="application-cube-wire">
                  <path d="M130 31 205 73 130 115 55 73Z" />
                  <path d="M55 73v55l75 42 75-42V73" />
                  <path d="M130 115v55" />
                  <path d="M55 128l75-42 75 42" />
                  <path d="M80 87 155 45" />
                  <path d="M105 101 180 59" />
                  <path d="M80 59 155 101" />
                  <path d="M105 45 180 87" />
                  <path d="M80 142 155 100" />
                  <path d="M105 156 180 114" />
                  <path d="M80 114 155 156" />
                  <path d="M105 100 180 142" />
                </g>
                <g className="application-cube-depth">
                  <path d="M55 73v55" />
                  <path d="M205 73v55" />
                  <path d="M130 31v139" />
                </g>
                <g className="application-cube-glow">
                  <path d="M88 94 130 70 172 94" />
                  <path d="M88 94 130 118 172 94" />
                </g>
                <g className="application-cube-core">
                  <ellipse cx="130" cy="73" rx="8.5" ry="4.6" />
                  <ellipse cx="130" cy="73" rx="4.8" ry="8.4" />
                </g>
                <g className="application-cube-static-nodes">
                  <circle cx="95" cy="56" r="3.5" />
                  <circle cx="178" cy="63" r="3.5" />
                  <circle cx="172" cy="128" r="3.5" />
                </g>
                <g className="application-cube-travelers">
                  <circle r="3.4">
                    <animateMotion
                      dur="4.8s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.42;0.7;1"
                      keySplines="0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1"
                      path="M95 56 130 73 178 63 130 31 95 56"
                    />
                  </circle>
                  <circle r="3.2">
                    <animateMotion
                      dur="5.2s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.46;0.74;1"
                      keySplines="0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1"
                      path="M88 94 130 118 172 128 130 170"
                    />
                  </circle>
                </g>
              </svg>
            ) : index === 1 ? (
              <svg className="trusted-data-echo" viewBox="0 0 260 190" focusable="false">
                <g className="trusted-plane">
                  <path d="M45 150 130 106 215 150" />
                  <path d="M62 166 130 130 198 166" />
                  <path d="M78 178 130 150 182 178" />
                  <path d="M130 104v76" />
                </g>
                <g className="trusted-funnel">
                  <path d="M54 62c0-18 34-33 76-33s76 15 76 33c0 14-21 26-52 31" />
                  <path d="M54 62c0 14 21 26 52 31" />
                  <path d="M75 77c22 21 36 38 37 54" />
                  <path d="M185 77c-22 21-36 38-37 54" />
                  <path d="M112 131c0 8 8 14 18 14s18-6 18-14" />
                  <path d="M91 143c6 10 20 16 39 16s33-6 39-16" />
                </g>
                <g className="trusted-funnel-top">
                  <ellipse cx="130" cy="62" rx="76" ry="33" />
                  <ellipse cx="130" cy="64" rx="49" ry="21" />
                  <ellipse cx="130" cy="66" rx="27" ry="11.5" />
                  <path d="M74 40 109 77" />
                  <path d="M130 29v48" />
                  <path d="M186 40 151 77" />
                </g>
                <g className="trusted-accent">
                  <path d="M54 62c0-18 34-33 76-33s76 15 76 33" />
                  <path d="M76 78c21 20 35 37 36 53" />
                  <path d="M184 78c-21 20-35 37-36 53" />
                  <path d="M102 158c-8 18-22 28-39 36" />
                  <path d="M158 158c8 18 22 28 39 36" />
                </g>
                <g className="trusted-orbit">
                  <path d="M49 123c13-28 48-44 81-44s68 16 81 44" />
                  <path d="M49 123c13 26 48 42 81 42s68-16 81-42" />
                </g>
                <g className="trusted-binary trusted-binary-a">
                  <text x="39" y="128">1</text>
                  <text x="55" y="111">0</text>
                  <text x="74" y="99">1</text>
                  <text x="96" y="92">0</text>
                  <text x="119" y="90">0</text>
                </g>
                <g className="trusted-binary trusted-binary-b">
                  <text x="140" y="163">1</text>
                  <text x="163" y="159">0</text>
                  <text x="184" y="149">0</text>
                  <text x="201" y="134">1</text>
                  <text x="213" y="116">0</text>
                </g>
                <g className="trusted-top-cube">
                  <path d="M130 10 148 20 130 31 112 20Z" />
                  <path d="M112 20v22l18 11V31Z" />
                  <path d="M148 20v22l-18 11V31Z" />
                </g>
                <g className="trusted-falling-cubes">
                  <path d="M-5 -3 5 -9 15 -3 5 3Z">
                    <animateMotion
                      dur="4.8s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.36;0.72;1"
                      keySplines="0.42 0 0.24 1;0.42 0 0.24 1;0.42 0 0.24 1"
                      path="M132 18 151 34 139 52 130 68"
                    />
                  </path>
                  <path d="M-4 -2.5 4 -7 12 -2.5 4 2Z">
                    <animateMotion
                      dur="5.6s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.38;0.7;1"
                      keySplines="0.42 0 0.24 1;0.42 0 0.24 1;0.42 0 0.24 1"
                      path="M111 22 95 42 113 58 130 69"
                    />
                  </path>
                  <path d="M-3.5 -2 3.5 -6 10.5 -2 3.5 2Z">
                    <animateMotion
                      dur="6.1s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.42;0.75;1"
                      keySplines="0.42 0 0.24 1;0.42 0 0.24 1;0.42 0 0.24 1"
                      path="M150 26 166 44 148 58 132 69"
                    />
                  </path>
                </g>
                <g className="trusted-output-lines">
                  <path d="M115 154 92 188" />
                  <path d="M145 154 168 188" />
                  <path d="M130 158v32" />
                </g>
              </svg>
            ) : index === 2 ? (
              <svg className="security-rive-echo" viewBox="0 0 260 190" focusable="false">
                <g className="security-outer">
                  <path d="M130 28 208 72 130 116 52 72Z" />
                  <path d="M52 72v58l78 44 78-44V72" />
                  <path d="M130 116v58" />
                </g>
                <g className="security-guide">
                  <path d="M52 72v58" />
                  <path d="M208 72v58" />
                  <path d="M130 28v146" />
                </g>
                <g className="security-lid">
                  <path d="M130 28 208 72 130 116 52 72Z" />
                  <path d="M130 38 190 72 130 106 70 72Z" />
                </g>
                <g className="security-matrix">
                  <path d="M94 93 130 73 166 93 130 114Z" />
                  <path d="M94 93v45l36 21v-45Z" />
                  <path d="M166 93v45l-36 21v-45Z" />
                  <path d="M106 86v45l24 14" />
                  <path d="M118 79v45l12 7" />
                  <path d="M142 79v45l-12 7" />
                  <path d="M154 86v45l-24 14" />
                  <path d="M94 108l36 21 36-21" />
                  <path d="M94 123l36 21 36-21" />
                  <path d="M130 73v86" />
                </g>
                <g className="security-blue-chip">
                  <path d="M67 70 78 64 92 72 81 79Z" />
                  <path d="M74 69 84 74" />
                  <path d="M78 66 88 71" />
                </g>
                <g className="security-cells">
                  <path d="M-4 -3 4 -7 12 -3 4 1Z">
                    <animateMotion
                      dur="5.2s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.44;0.74;1"
                      keySplines="0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1"
                      path="M104 101 130 86 156 101 130 116 104 101"
                    />
                  </path>
                  <path d="M-3 -2 3 -5 9 -2 3 1Z">
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.5;0.78;1"
                      keySplines="0.45 0 0.25 1;0.45 0 0.25 1;0.45 0 0.25 1"
                      path="M130 80 130 105 130 134 130 154"
                    />
                  </path>
                </g>
              </svg>
            ) : (
              <>
                <i />
                <i />
                <i />
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ApplicationForm({ dictionary }: { dictionary: Dictionary }) {
  const [success, setSuccess] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSuccess(true);
  }

  return (
    <form className="application-form" data-reveal="section" onSubmit={onSubmit}>
      <fieldset className="form-choice-group wide-field" data-reveal="field">
        <legend>{dictionary.form.paymentMethods.label}</legend>
        <div className="form-choice-list">
          {dictionary.form.paymentMethods.options.map((option) => (
            <label className="form-choice" key={option}>
              <input name="paymentMethods" type="checkbox" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="form-choice-group wide-field" data-reveal="field" style={{ "--reveal-delay": "65ms" } as CSSProperties}>
        <legend>{dictionary.form.businessType.label}</legend>
        <div className="form-choice-list">
          {dictionary.form.businessType.options.map((option) => (
            <label className="form-choice" key={option}>
              <input name="businessType" type="radio" value={option} required />
              <span>{option}</span>
            </label>
          ))}
          <label className="form-choice form-choice-other">
            <input name="businessType" type="radio" value={dictionary.form.businessType.other} required />
            <span>{dictionary.form.businessType.other}</span>
            <input name="businessTypeOther" placeholder={dictionary.form.businessType.otherPlaceholder} />
          </label>
        </div>
      </fieldset>
      <label data-reveal="field" style={{ "--reveal-delay": "130ms" } as CSSProperties}>
        {dictionary.form.name}
        <input name="name" required />
      </label>
      <label data-reveal="field" style={{ "--reveal-delay": "195ms" } as CSSProperties}>
        {dictionary.form.email}
        <input name="email" type="email" required />
      </label>
      <label data-reveal="field" style={{ "--reveal-delay": "260ms" } as CSSProperties}>
        {dictionary.form.phone}
        <input name="phone" type="tel" required />
      </label>
      <label data-reveal="field" style={{ "--reveal-delay": "325ms" } as CSSProperties}>
        {dictionary.form.website}
        <input name="website" type="url" placeholder="https://" />
      </label>
      <fieldset className="form-choice-group wide-field" data-reveal="field" style={{ "--reveal-delay": "390ms" } as CSSProperties}>
        <legend>{dictionary.form.preferredContact.label}</legend>
        <div className="form-choice-list form-choice-list-compact">
          {dictionary.form.preferredContact.options.map((option) => (
            <label className="form-choice" key={option}>
              <input name="preferredContact" type="radio" value={option} required />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="wide-field" data-reveal="field" style={{ "--reveal-delay": "455ms" } as CSSProperties}>
        {dictionary.form.message}
        <textarea name="message" rows={5} />
      </label>
      <button
        className="primary-button wide-field text-roll-button"
        type="submit"
        data-reveal="button"
        style={{ "--reveal-delay": "520ms" } as CSSProperties}
      >
        <span className="button-text-roll" aria-hidden="true" data-text={dictionary.form.submit}>
          <span>{dictionary.form.submit}</span>
          <span>{dictionary.form.submit}</span>
        </span>
      </button>
      {success ? (
        <div className="success-message wide-field" role="status">
          <p>{dictionary.form.success}</p>
        </div>
      ) : null}
    </form>
  );
}

export function CardForm({ dictionary }: { dictionary: Dictionary }) {
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(true);
  }

  return (
    <form className="checkout-form" data-reveal="section" onSubmit={onSubmit}>
      <strong className="warning" data-reveal="copy">{dictionary.checkout.warning}</strong>
      <label data-reveal="field" style={{ "--reveal-delay": "70ms" } as CSSProperties}>
        {dictionary.checkout.cardNumber}
        <input name="cardNumber" value="4111 •••• •••• 1111" readOnly />
      </label>
      <div className="form-row" data-reveal="field" style={{ "--reveal-delay": "140ms" } as CSSProperties}>
        <label>
          {dictionary.checkout.expiry}
          <input name="expiry" value="12/30" readOnly />
        </label>
        <label>
          {dictionary.checkout.cvv}
          <input name="cvv" value="***" readOnly />
        </label>
      </div>
      <label data-reveal="field" style={{ "--reveal-delay": "210ms" } as CSSProperties}>
        {dictionary.checkout.cardholder}
        <input name="cardholder" value="PAYWAYS CLIENT" readOnly />
      </label>
      {error ? (
        <strong className="form-error" role="alert">
          {dictionary.checkout.error}
        </strong>
      ) : null}
      <button className="primary-button" type="submit" data-reveal="button" style={{ "--reveal-delay": "280ms" } as CSSProperties}>
        {dictionary.checkout.submit}
      </button>
    </form>
  );
}
