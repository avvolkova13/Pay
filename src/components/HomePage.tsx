import { ApiFeatureRows, ApplicationForm, IndustryMarquee, SecurityStack } from "@/components/Interactive";
import SuiIdentityManagementAnimation from "@/components/experimental/SuiIdentityManagementAnimation";
import { HeroTitle } from "@/components/HeroTitle";
import type { CSSProperties } from "react";
import { type Dictionary, type Locale } from "@/i18n";

export function HomePage({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const heroTitleLines =
    locale === "ru" && dictionary.hero.title === "Принимайте платежи по всему миру"
      ? ["Принимайте платежи", "по всему миру"]
      : locale === "en" && dictionary.hero.title === "Payment infrastructure for international business"
        ? ["Payment infrastructure", "for international business"]
      : [dictionary.hero.title];

  return (
    <main>
      <section className="hero-section">
        <div className="hero-noise" aria-hidden="true" />
        <div className="section-shell hero-grid">
          <div className="hero-cover-stack">
            <div className="hero-copy hero-title-copy">
              <HeroTitle lines={heroTitleLines} variant={locale === "en" ? "compact" : "default"} />
            </div>
            <div className="hero-intro-row">
              <div className="hero-copy hero-text-copy">
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
              <div className="hero-animation-stage" data-reveal="decor" style={{ "--reveal-delay": "320ms" } as CSSProperties}>
                <SuiIdentityManagementAnimation />
              </div>
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
              <div className="service-card-price">
                <strong>{item.price}</strong>
                <span>{item.priceLabel}</span>
                <p>{item.priceText}</p>
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
                    {index === 0 ? (
                      <>
                        <path className="pipeline-icon-frame" d="M17 5.8 26 9.2v7.9c0 5.5-3.4 9.2-9 11.2-5.6-2-9-5.7-9-11.2V9.2z" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="M13.8 17.2v-2.1a3.2 3.2 0 0 1 6.4 0v2.1" />
                        <path className="pipeline-icon-line" d="M12.6 17.2h8.8v5.6h-8.8z" />
                        <circle className="pipeline-icon-node" cx="17" cy="20" r="1.35" />
                        <circle className="pipeline-icon-node pipeline-icon-node-soft" cx="10.8" cy="12.8" r="1" />
                        <circle className="pipeline-icon-node pipeline-icon-node-soft" cx="23.2" cy="12.8" r="1" />
                      </>
                    ) : index === 1 ? (
                      <>
                        <path className="pipeline-icon-frame" d="M9.2 24.6v-2.3c0-2.7 2-4.8 4.8-4.8s4.8 2.1 4.8 4.8v2.3" />
                        <path className="pipeline-icon-frame" d="M18.7 24.6v-2c0-2.5 1.8-4.5 4.4-4.5 1.8 0 3.2.8 4 2.1" />
                        <circle className="pipeline-icon-line" cx="14" cy="12.8" r="3.4" />
                        <circle className="pipeline-icon-line" cx="23.1" cy="13.4" r="2.9" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="M20.1 24.6h5.9" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="m23 22.4 1.6 1.6 3.2-3.7" />
                        <circle className="pipeline-icon-node" cx="27.8" cy="20.3" r="1.05" />
                      </>
                    ) : index === 2 ? (
                      <>
                        <circle className="pipeline-icon-frame" cx="17" cy="17" r="10.5" />
                        <path className="pipeline-icon-line" d="M6.8 17h20.4" />
                        <path className="pipeline-icon-line" d="M17 6.5c2.8 2.6 4.2 6.1 4.2 10.5S19.8 24.9 17 27.5" />
                        <path className="pipeline-icon-line" d="M17 6.5c-2.8 2.6-4.2 6.1-4.2 10.5s1.4 7.9 4.2 10.5" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="m13.2 18.4 2.5 2.4 5.4-6.2" />
                        <circle className="pipeline-icon-node" cx="22.8" cy="10.6" r="1.15" />
                      </>
                    ) : (
                      <>
                        <path className="pipeline-icon-frame" d="M8.5 23.8h17v4.5h-17z" />
                        <path className="pipeline-icon-frame" d="M11.3 14.9h11.4v8.9H11.3z" />
                        <path className="pipeline-icon-line" d="M17 8.4v6.5" />
                        <path className="pipeline-icon-line" d="M10 10.9h14" />
                        <path className="pipeline-icon-line" d="M10 10.9 17 6.4l7 4.5" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="M13.3 19.2h7.4" />
                        <path className="pipeline-icon-line pipeline-icon-accent" d="M17 19.2v4.6" />
                        <circle className="pipeline-icon-node" cx="17" cy="19.2" r="1.25" />
                        <circle className="pipeline-icon-node pipeline-icon-node-soft" cx="8.5" cy="26.05" r="1" />
                        <circle className="pipeline-icon-node pipeline-icon-node-soft" cx="25.5" cy="26.05" r="1" />
                      </>
                    )}
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
          <ApplicationForm dictionary={dictionary} />
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
          <strong>{dictionary.hero.flowStatus}</strong>
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
      <svg viewBox="0 0 66 66" focusable="false">
        {index === 0 ? (
          <>
            <rect className="service-glyph-frame" x="12" y="18" width="42" height="29" rx="3" />
            <path className="service-glyph-line" d="M12 26h42" />
            <path className="service-glyph-accent" d="M19 35h8" />
            <path className="service-glyph-line" d="M19 40h14" />
            <path className="service-glyph-line" d="M40.5 36.5h5.8" />
            <path className="service-glyph-accent" d="m42.7 42.3 2.4 2.2 5.4-6.3" />
            <circle className="service-glyph-node" cx="50.5" cy="22.3" r="1.45" />
          </>
        ) : index === 1 ? (
          <>
            <path className="service-glyph-line" d="M12 23v-9h9" />
            <path className="service-glyph-line" d="M45 14h9v9" />
            <path className="service-glyph-line" d="M54 43v9h-9" />
            <path className="service-glyph-line" d="M21 52h-9v-9" />
            <rect className="service-glyph-frame" x="18" y="20" width="8" height="8" rx="1" />
            <rect className="service-glyph-frame" x="34" y="20" width="8" height="8" rx="1" />
            <rect className="service-glyph-accent-fill" x="18" y="36" width="8" height="8" rx="1" />
            <path className="service-glyph-line" d="M34 36h4v4h4" />
            <path className="service-glyph-line" d="M34 44h8" />
            <circle className="service-glyph-node" cx="46" cy="33" r="1.6" />
          </>
        ) : index === 2 ? (
          <>
            <circle className="service-glyph-frame" cx="33" cy="31" r="6.2" />
            <path className="service-glyph-line" d="M33 37.2v11" />
            <path className="service-glyph-line" d="M33 31 19 22" />
            <path className="service-glyph-line" d="M33 31 47 22" />
            <path className="service-glyph-line" d="M33 31 18 42" />
            <path className="service-glyph-line" d="M33 31 48 42" />
            <circle className="service-glyph-node service-glyph-node-soft" cx="19" cy="22" r="2.2" />
            <circle className="service-glyph-node service-glyph-node-soft" cx="47" cy="22" r="2.2" />
            <circle className="service-glyph-node service-glyph-node-soft" cx="18" cy="42" r="2.2" />
            <circle className="service-glyph-node service-glyph-node-soft" cx="48" cy="42" r="2.2" />
            <circle className="service-glyph-node" cx="33" cy="31" r="2.5" />
            <path className="service-glyph-accent" d="M29.8 48.2h6.4" />
          </>
        ) : (
          <>
            <path className="service-glyph-frame" d="M18 12h22l8 8v34H18z" />
            <path className="service-glyph-line" d="M40 12v8h8" />
            <path className="service-glyph-line" d="M24 28h17" />
            <path className="service-glyph-line" d="M24 34h13" />
            <path className="service-glyph-line" d="M24 40h10" />
            <path className="service-glyph-accent" d="m36.4 45.4 2.4 2.3 5.1-6" />
            <circle className="service-glyph-node" cx="23.5" cy="21.5" r="1.7" />
            <path className="service-glyph-line" d="M24 47h8" />
          </>
        )}
      </svg>
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
