import Link from "next/link";
import { routePairs, type Dictionary, type Locale } from "@/i18n";

export function Footer({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const legalLinks = [
    [dictionary.footer.legal[0], routePairs.privacy[locale]],
    [dictionary.footer.legal[1], routePairs.terms[locale]],
    [dictionary.footer.legal[2], routePairs.aml[locale]],
    [dictionary.footer.legal[3], routePairs.cookies[locale]]
  ] as const;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <h2>PAYWAYS INTERNATIONAL - FZCO</h2>
          <p>{dictionary.footer.activity}</p>
          <p>{dictionary.footer.registration}</p>
          <p>{dictionary.footer.license}</p>
          <p>{dictionary.footer.address}</p>
          <p>{dictionary.footer.support}</p>
        </div>
        <div>
          <h3>{dictionary.footer.sitemap}</h3>
          <Link href={routePairs.home[locale]}>{locale === "ru" ? "Главная" : "Home"}</Link>
          <Link href={routePairs.checkout[locale]}>{dictionary.checkout.eyebrow}</Link>
          {legalLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{dictionary.footer.methods}</h3>
          <div className="method-badges">
            {dictionary.footer.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PAYWAYS INTERNATIONAL - FZCO</span>
        <span>Dubai Silicon Oasis, Dubai, UAE</span>
      </div>
    </footer>
  );
}
