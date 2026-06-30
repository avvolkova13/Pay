import Link from "next/link";
import type { CSSProperties } from "react";
import { routePairs, type Dictionary, type Locale } from "@/i18n";

function PaymentMethodLogo({ label }: { label: string }) {
  if (label === "Mastercard") {
    return (
      <svg viewBox="0 0 78 28" focusable="false" aria-hidden="true">
        <circle cx="32" cy="14" r="8.5" />
        <circle cx="46" cy="14" r="8.5" />
        <path d="M39 8.3a9.8 9.8 0 0 1 0 11.4 9.8 9.8 0 0 1 0-11.4Z" />
        <path d="M12 20h7.5" />
        <path d="M58 20h8" />
      </svg>
    );
  }

  if (label === "QR") {
    return (
      <svg viewBox="0 0 78 28" focusable="false" aria-hidden="true">
        <rect x="18" y="6" width="6" height="6" />
        <rect x="18" y="16" width="6" height="6" />
        <rect x="28" y="6" width="6" height="6" />
        <rect x="40" y="6" width="4" height="4" />
        <rect x="48" y="6" width="6" height="6" />
        <rect x="38" y="16" width="6" height="6" />
        <rect x="50" y="18" width="4" height="4" />
        <path d="M11 11V5h6" />
        <path d="M61 5h6v6" />
        <path d="M67 17v6h-6" />
        <path d="M17 23h-6v-6" />
      </svg>
    );
  }

  if (label === "Payouts") {
    return (
      <svg viewBox="0 0 78 28" focusable="false" aria-hidden="true">
        <circle cx="39" cy="14" r="4.5" />
        <circle cx="20" cy="8" r="2.5" />
        <circle cx="58" cy="8" r="2.5" />
        <circle cx="24" cy="22" r="2.5" />
        <circle cx="54" cy="22" r="2.5" />
        <path d="M35 12 22.5 8.8" />
        <path d="M43 12 55.5 8.8" />
        <path d="M35.5 16.5 26 21" />
        <path d="M42.5 16.5 52 21" />
      </svg>
    );
  }

  if (label === "Invoices") {
    return (
      <svg viewBox="0 0 78 28" focusable="false" aria-hidden="true">
        <path d="M25 5h22l6 6v12H25z" />
        <path d="M47 5v7h6" />
        <path d="M31 13h11" />
        <path d="M31 18h8" />
        <path d="m45 19 2.5 2.5L53 16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 78 28" focusable="false" aria-hidden="true">
      <path d="M14 8h50" />
      <path d="m20 8 7 12h5l7-12" />
      <path d="M43 20V8" />
      <path d="M50 20 57 8l7 12" />
      <path d="M53 16h8" />
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
