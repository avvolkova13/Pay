import type { CSSProperties } from "react";
import type { Dictionary, LegalSlug } from "@/i18n";

export function LegalPage({ dictionary, slug }: { dictionary: Dictionary; slug: LegalSlug }) {
  const page = dictionary.legal[slug];

  return (
    <main className="legal-page">
      <div className="legal-page-inner section-shell">
        <header className="legal-header">
          <p className="eyebrow" data-reveal="copy">PAYWAYS</p>
          <h1 data-reveal="heading" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            {page.title}
          </h1>
          <span data-reveal="copy" style={{ "--reveal-delay": "150ms" } as CSSProperties}>
            {page.updated}
          </span>
          <p data-reveal="copy" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
            {page.intro}
          </p>
        </header>
        <div className="legal-sections">
          {page.sections.map(([title, text], index) => (
            <section
              key={title}
              data-reveal="line"
              style={{ "--reveal-delay": `${Math.min(index, 3) * 60}ms` } as CSSProperties}
            >
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
