import { ApiFeatureRows, ApplicationForm, IndustryMarquee, SecurityStack } from "@/components/Interactive";
import { HeroTitle } from "@/components/HeroTitle";
import type { CSSProperties } from "react";
import { type Dictionary, type Locale } from "@/i18n";

export function HomePage({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
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
            <HeroTitle lines={heroTitleLines} />
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

      <section id="services" className="services-section section-shell">
        <div className="section-heading compact">
          <span className="section-arrow" data-reveal="copy" aria-hidden="true">[ → ]</span>
          <p className="eyebrow" data-reveal="copy" style={{ "--reveal-delay": "70ms" } as CSSProperties}>
            {dictionary.services.eyebrow}
          </p>
          <h2 data-reveal="heading" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            {dictionary.services.title}
          </h2>
          <p data-reveal="copy" style={{ "--reveal-delay": "190ms" } as CSSProperties}>
            {dictionary.services.text}
          </p>
        </div>
        <div className="service-map">
          {dictionary.services.items.map((item, index) => (
            <article
              key={item.title}
              className={`service-card service-card-${index + 1}`}
              data-reveal="card"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="service-card-top">
                <span>0{index + 1}</span>
                <ServiceGlyph index={index} />
              </div>
              <div className="service-card-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className="service-card-action" aria-hidden="true">
                <span>-&gt;</span>
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="api" className="api-section">
          <div className="section-shell api-shell">
          <div className="api-copy">
            <h2 data-reveal="heading">{dictionary.api.title}</h2>
            <p data-reveal="copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {dictionary.api.text}
            </p>
          </div>
          <ApiFeatureRows items={dictionary.api.points} />
        </div>
      </section>

      <section id="industries" className="industries-section">
        <div className="section-shell industries-shell">
          <span className="section-arrow" data-reveal="copy" aria-hidden="true">[ → ]</span>
          <div className="industries-heading-block">
            <p className="eyebrow" data-reveal="copy" style={{ "--reveal-delay": "70ms" } as CSSProperties}>
              {dictionary.industries.eyebrow}
            </p>
            <h2 data-reveal="heading" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {dictionary.industries.title}
            </h2>
          </div>
          <IndustryMarquee
            items={dictionary.industries.items}
            label={dictionary.industries.eyebrow}
            reveal
            revealDelay="140ms"
          />
        </div>
      </section>

      <section id="start" className="start-section">
        <div className="section-shell start-shell">
          <div className="start-intro">
            {dictionary.start.eyebrow ? (
              <p className="eyebrow" data-reveal="copy">
                {dictionary.start.eyebrow}
              </p>
            ) : null}
            <h2 data-reveal="heading" style={{ "--reveal-delay": "90ms" } as CSSProperties}>
              {dictionary.start.title}
            </h2>
            {dictionary.start.text ? (
              <p data-reveal="copy" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
                {dictionary.start.text}
              </p>
            ) : null}
          </div>
          <div className="pipeline">
            {dictionary.start.steps.map(([title, text], index) => (
              <article
                key={title}
                className={index === 0 ? "is-current" : ""}
                data-reveal="line"
                style={{ "--reveal-delay": `${index * 85}ms` } as CSSProperties}
              >
                <span className="pipeline-marker" aria-hidden="true">
                  <svg viewBox="0 0 34 34" focusable="false">
                    <path className="pipeline-icon-frame" d="M7 20.5 17 8l10 12.5-10 5.5z" />
                    <path className="pipeline-icon-line" d="M17 8v18" />
                    <path className="pipeline-icon-line" d="M9 20.5h16" />
                    <circle className="pipeline-icon-node" cx="17" cy="17" r="2.2" />
                  </svg>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="security-section">
        <div className="section-shell security-shell">
          <div className="security-copy reveal">
            <p className="eyebrow" data-reveal="copy">{dictionary.nav.start}</p>
            <h2 data-reveal="heading" style={{ "--reveal-delay": "90ms" } as CSSProperties}>
              {dictionary.security.title}
            </h2>
            <p data-reveal="copy" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
              {dictionary.security.text}
            </p>
          </div>
          <SecurityStack items={dictionary.security.items} />
        </div>
      </section>

      <section className="application-section">
        <div id="application" className="section-shell application-shell">
          <div className="application-copy">
            <h2 data-reveal="heading">{dictionary.form.title}</h2>
            <p data-reveal="copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {dictionary.form.text}
            </p>
          </div>
          <ApplicationForm dictionary={dictionary} locale={locale} />
        </div>
      </section>
    </main>
  );
}

function PaymentFlow({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="payment-flow reveal" aria-label={dictionary.hero.flowTitle}>
      <div className="flow-panel">
        <div className="flow-header">
          <p>{dictionary.hero.flowTitle}</p>
          <strong>demo</strong>
        </div>
        {dictionary.hero.flow.map((step, index) => (
          <div className="flow-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="flow-rail" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="flow-mesh" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function ServiceGlyph({ index }: { index: number }) {
  return (
    <span className={`service-glyph service-glyph-${index + 1}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function SecurityDiagram() {
  return (
    <div className="security-diagram" aria-hidden="true">
      <div className="diagram-card diagram-card-main">
        <span>01</span>
        <strong>Merchant review</strong>
        <div className="diagram-cube">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="diagram-card diagram-card-sub">
        <span>02</span>
        <strong>Data boundary</strong>
      </div>
      <div className="diagram-dots" />
    </div>
  );
}
