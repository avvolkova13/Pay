import Link from "next/link";
import type { CSSProperties } from "react";
import { routePairs, type Dictionary, type Locale } from "@/i18n";

function PaymentMethodLogo({ label }: { label: string }) {
  if (label === "Visa") {
    return (
      <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
        <text className="payment-wordmark payment-wordmark-visa" x="18" y="24">
          VISA
        </text>
        <path className="payment-accent" d="M19 9h20" />
      </svg>
    );
  }

  if (label === "Mastercard") {
    return (
      <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
        <circle className="payment-fill payment-soft-fill" cx="31" cy="16" r="8.5" />
        <circle className="payment-accent-fill payment-soft-fill" cx="43" cy="16" r="8.5" />
        <path className="payment-accent" d="M37 10.1a10.3 10.3 0 0 1 0 11.8 10.3 10.3 0 0 1 0-11.8Z" />
        <text className="payment-wordmark payment-wordmark-small" x="59" y="20">
          mastercard
        </text>
      </svg>
    );
  }

  if (label === "UnionPay") {
    return (
      <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
        <path className="payment-stroke payment-muted-stroke" d="M15 9h22l-5 18H10z" />
        <path className="payment-accent" d="M23 9h22l-5 18H18z" />
        <path className="payment-stroke" d="M31 9h22l-5 18H26z" />
        <text className="payment-wordmark payment-wordmark-small" x="58" y="21">
          UnionPay
        </text>
      </svg>
    );
  }

  if (label === "Apple Pay") {
    return (
      <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
        <path
          className="payment-fill"
          d="M28 18.4c0-3.1 2.5-4.6 2.6-4.7-1.5-2.1-3.7-2.4-4.5-2.5-1.9-.2-3.7 1.1-4.7 1.1-1 0-2.4-1.1-4-1.1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3 3.8 3s2.1-1 4-1 2.4 1 4 1 2.7-1.5 3.7-3c.8-1.1 1.1-2.3 1.2-2.3-.1 0-2.6-1-2.6-5.6ZM24.9 9c.9-1 1.4-2.5 1.2-3.9-1.2.1-2.8.9-3.6 1.9-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.7-1.8Z"
        />
        <text className="payment-wordmark payment-wordmark-pay" x="39" y="24">
          Pay
        </text>
      </svg>
    );
  }

  if (label === "Google Pay") {
    return (
      <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
        <text className="payment-wordmark payment-wordmark-google" x="16" y="24">
          G
        </text>
        <text className="payment-wordmark payment-wordmark-pay" x="38" y="24">
          Pay
        </text>
        <path className="payment-accent" d="M28 18h8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 36" focusable="false" aria-hidden="true">
      <text className="payment-wordmark payment-wordmark-small" x="18" y="22">
        {label}
      </text>
    </svg>
  );
}

export function Footer({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const homeHref = routePairs.home[locale];
  const sitemapLinks = [
    [locale === "ru" ? "Главная" : "Home", homeHref],
    [dictionary.nav.services, `${homeHref}#services`],
    [dictionary.nav.api, `${homeHref}#api`],
    [dictionary.nav.industries, `${homeHref}#industries`],
    [dictionary.nav.security, `${homeHref}#start`],
    [dictionary.nav.start, `${homeHref}#security`],
    [dictionary.nav.contact, `${homeHref}#contact`]
  ] as const;

  const legalLinks = [
    [dictionary.footer.legal[0], routePairs.privacy[locale]],
    [dictionary.footer.legal[1], routePairs.terms[locale]],
    [dictionary.footer.legal[2], routePairs.aml[locale]],
    [dictionary.footer.legal[3], routePairs.cookies[locale]]
  ] as const;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div data-reveal="copy">
          <h2>PAYWAYS</h2>
          <p>{dictionary.footer.company}</p>
          <p>{dictionary.footer.activity}</p>
          <p>{dictionary.footer.registration}</p>
          <p>{dictionary.footer.license}</p>
          <p>{dictionary.footer.address}</p>
          <p>
            {dictionary.footer.supportLabel}{" "}
            <a className="footer-inline-link" href="mailto:support@payways.com">
              support@payways.com
            </a>
          </p>
        </div>
        <div data-reveal="copy" style={{ "--reveal-delay": "110ms" } as CSSProperties}>
          <h3>{dictionary.footer.sitemap}</h3>
          {sitemapLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          {legalLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div data-reveal="copy" style={{ "--reveal-delay": "190ms" } as CSSProperties}>
          <h3>{dictionary.footer.methods}</h3>
          <div className="method-badges">
            {dictionary.footer.badges.map((badge) => (
              <span className="method-logo" key={badge} aria-label={badge} title={badge}>
                <PaymentMethodLogo label={badge} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom" data-reveal="copy" style={{ "--reveal-delay": "260ms" } as CSSProperties}>
        <span>© 2026 PAYWAYS</span>
        <span>Dubai Silicon Oasis, Dubai, UAE</span>
      </div>
    </footer>
  );
}
