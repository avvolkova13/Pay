import type { Dictionary, LegalSlug } from "@/i18n";

export function LegalPage({ dictionary, slug }: { dictionary: Dictionary; slug: LegalSlug }) {
  const page = dictionary.legal[slug];

  return (
    <main className="legal-page section-shell">
      <header className="legal-header reveal">
        <p className="eyebrow">PAYWAYS</p>
        <h1>{page.title}</h1>
        <span>{page.updated}</span>
        <p>{page.intro}</p>
      </header>
      <div className="legal-sections">
        {page.sections.map(([title, text]) => (
          <section key={title} className="reveal">
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
