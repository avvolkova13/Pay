import type { CSSProperties } from "react";
import type { Dictionary, LegalSlug } from "@/i18n";
import { legalDocuments, type LegalDocumentSlug } from "@/legalDocuments";

export function LegalPage({ dictionary, slug }: { dictionary: Dictionary; slug: LegalSlug }) {
  const locale = dictionary.localeName === "RU" ? "ru" : "en";
  const providedPage =
    slug === "aml-kyc-policy" ? null : legalDocuments[locale][slug as LegalDocumentSlug];
  const fallbackPage = dictionary.legal[slug];
  const page = providedPage ?? {
    title: fallbackPage.title,
    updated: fallbackPage.updated,
    intro: [fallbackPage.intro],
    sections: fallbackPage.sections.map(([title, text]) => ({ title, blocks: [text] }))
  };

  return (
    <main className="legal-page">
      <div className="legal-page-inner section-shell">
        <header className="legal-header">
          <p className="eyebrow" data-reveal="copy">PAYWAYS</p>
          <h1 data-reveal="heading" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            {page.title}
          </h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph} data-reveal="copy" style={{ "--reveal-delay": "150ms" } as CSSProperties}>
              {paragraph}
            </p>
          ))}
        </header>
        <div className="legal-sections">
          {page.sections.map(({ title, blocks }, index) => (
            <section
              key={title}
              data-reveal="line"
              style={{ "--reveal-delay": `${Math.min(index, 3) * 60}ms` } as CSSProperties}
            >
              <h2>{title}</h2>
              {blocks.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
