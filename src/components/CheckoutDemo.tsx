import { DemoCardForm } from "@/components/Interactive";
import type { Dictionary } from "@/i18n";

export function CheckoutDemo({ dictionary }: { dictionary: Dictionary }) {
  return (
    <main className="checkout-page section-shell">
      <section className="checkout-hero reveal">
        <p className="eyebrow">{dictionary.checkout.eyebrow}</p>
        <h1>{dictionary.checkout.title}</h1>
        <p>{dictionary.checkout.text}</p>
      </section>
      <section className="checkout-grid">
        <article className="checkout-summary reveal">
          <span>PAYWAYS</span>
          <h2>{dictionary.checkout.summary}</h2>
          <p>{dictionary.checkout.pricing}</p>
          <div className="summary-lines">
            <i />
            <i />
            <i />
          </div>
        </article>
        <DemoCardForm dictionary={dictionary} />
      </section>
    </main>
  );
}
