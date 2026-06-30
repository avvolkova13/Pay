import { CardForm } from "@/components/Interactive";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";

export function CheckoutPage({ dictionary }: { dictionary: Dictionary }) {
  return (
    <main className="checkout-page section-shell">
      <section className="checkout-hero">
        <p className="eyebrow" data-reveal="copy">{dictionary.checkout.eyebrow}</p>
        <h1 data-reveal="heading" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
          {dictionary.checkout.title}
        </h1>
        <p data-reveal="copy" style={{ "--reveal-delay": "150ms" } as CSSProperties}>
          {dictionary.checkout.text}
        </p>
      </section>
      <section className="checkout-grid">
        <article className="checkout-summary" data-reveal="card">
          <span>PAYWAYS</span>
          <h2>{dictionary.checkout.summary}</h2>
          <p>{dictionary.checkout.pricing}</p>
          <div className="summary-lines">
            <i />
            <i />
            <i />
          </div>
        </article>
        <CardForm dictionary={dictionary} />
      </section>
    </main>
  );
}
