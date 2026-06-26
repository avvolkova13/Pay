import { ApplicationForm, IndustryMarquee, SecurityStack } from "@/components/Interactive";
import { HeroTitle } from "@/components/HeroTitle";
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
          <div className="hero-copy reveal">
            <HeroTitle lines={heroTitleLines} />
            <p className="hero-lede">{dictionary.hero.text}</p>
            <div className="hero-actions">
              <a className="primary-button hero-cta text-roll-button" href="#application" aria-label={dictionary.hero.primary}>
                <span className="button-text-roll" aria-hidden="true" data-text={dictionary.hero.primary}>
                  <span>{dictionary.hero.primary}</span>
                  <span>{dictionary.hero.primary}</span>
                </span>
                <span className="hero-cta-arrow" aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section section-shell">
        <div className="section-heading compact reveal">
          <p className="eyebrow">{dictionary.services.eyebrow}</p>
          <h2>{dictionary.services.title}</h2>
          <p>{dictionary.services.text}</p>
        </div>
        <div className="service-map reveal">
          {dictionary.services.items.map((item, index) => (
            <article key={item.title} className={`service-card service-card-${index + 1}`}>
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
          <div className="api-copy reveal">
            <h2>{dictionary.api.title}</h2>
            <p>{dictionary.api.text}</p>
            <div className="api-points">
              {dictionary.api.points.map((point) => (
                <span key={Array.isArray(point) ? point[0] : point}>
                  <strong>{Array.isArray(point) ? point[0] : point}</strong>
                  {Array.isArray(point) ? <small>{point[1]}</small> : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="industries-section">
        <div className="section-shell industries-shell reveal">
          <div>
            <p className="eyebrow">{dictionary.industries.eyebrow}</p>
            <h2>{dictionary.industries.title}</h2>
          </div>
          <IndustryMarquee items={dictionary.industries.items} label={dictionary.industries.eyebrow} />
        </div>
      </section>

      <section id="security" className="security-section">
        <div className="section-shell security-shell">
          <div className="security-copy reveal">
            <h2>{dictionary.security.title}</h2>
          </div>
          <SecurityStack items={dictionary.security.items} />
        </div>
      </section>

      <section id="start" className="start-section">
        <div className="section-shell start-shell reveal">
          <div className="start-intro">
            <p className="eyebrow">{dictionary.start.eyebrow}</p>
            <h2>{dictionary.start.title}</h2>
            <p>{dictionary.start.text}</p>
          </div>
          <div className="pipeline">
            {dictionary.start.steps.map(([title, text], index) => (
              <article key={title} className={index === 0 ? "is-current" : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {index === 0 ? (
                  <a href="#application" aria-label={dictionary.hero.primary}>
                    {dictionary.hero.primary}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="application" className="application-section">
        <div className="section-shell application-shell">
          <div className="application-copy reveal">
            <p className="eyebrow">{dictionary.form.eyebrow}</p>
            <h2>{dictionary.form.title}</h2>
            <p>{dictionary.form.text}</p>
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
