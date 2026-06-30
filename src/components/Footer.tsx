import Link from "next/link";
import type { CSSProperties } from "react";
import { routePairs, type Dictionary, type Locale } from "@/i18n";

const paymentLogoSources: Record<string, string> = {
  Visa: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg",
  Mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  "Apple Pay": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
  "Google Pay": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
  "Мир": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg",
  Mir: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg",
  "PCI DSS": "https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
};

function PaymentMethodLogo({ label }: { label: string }) {
  if (label in paymentLogoSources) {
    return (
      <img
        className={`payment-icon payment-icon-${label.toLowerCase().replace(/\s+/g, "-")}`}
        src={paymentLogoSources[label]}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
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
