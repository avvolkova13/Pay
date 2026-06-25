"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
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
            <p>{text}</p>
          </article>
        ))}
      </div>
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
      <button className="primary-button wide-field" type="submit">
        {dictionary.form.submit}
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
