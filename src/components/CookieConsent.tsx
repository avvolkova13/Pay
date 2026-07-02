"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "payways_cookie_consent_v1";

const copy = {
  ru: {
    title: "Файлы cookie",
    text: "Мы используем cookie для корректной работы сайта, безопасности и улучшения сервиса.",
    checkbox: "Я ознакомлен(а) и согласен(на) с Политикой использования файлов cookie.",
    link: "Политика Cookie",
    accept: "Принять"
  },
  en: {
    title: "Cookies",
    text: "We use cookies to keep the website functional, secure and reliable.",
    checkbox: "I have read and agree to the Cookie Policy.",
    link: "Cookie Policy",
    accept: "Accept"
  }
} as const;

export function CookieConsent() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/ru") ? "ru" : "en";
  const content = copy[locale];
  const cookieHref = locale === "ru" ? "/ru/cookie-policy" : "/cookie-policy";
  const [isReady, setIsReady] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsAccepted(window.localStorage.getItem(STORAGE_KEY) === "accepted");
    setIsReady(true);
  }, []);

  const shouldShow = useMemo(() => isReady && !isAccepted, [isReady, isAccepted]);

  if (!shouldShow) {
    return null;
  }

  return (
    <aside className="cookie-consent" aria-labelledby="cookie-consent-title">
      <div>
        <h2 id="cookie-consent-title">{content.title}</h2>
        <p>
          {content.text}{" "}
          <Link href={cookieHref}>{content.link}</Link>
        </p>
      </div>
      <label className="cookie-consent-check">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
        />
        <span>{content.checkbox}</span>
      </label>
      <button
        type="button"
        disabled={!isChecked}
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, "accepted");
          setIsAccepted(true);
        }}
      >
        {content.accept}
      </button>
    </aside>
  );
}
