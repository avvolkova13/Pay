"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { FormEvent, KeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { localePrefix, routePairs, switchHref, type Dictionary, type Locale } from "@/i18n";

const SCRAMBLE_GLYPHS = ["+", "×", "/", "\\", "_", "-", "=", "*", "#", "%", "<", ">", "[", "]", "{", "}"];
const ANCHOR_SCROLL_DURATION = 1700;
const APPLICATION_SCROLL_DURATION = 3200;

type HeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
  routeKey: keyof typeof routePairs;
};

function getAnchorTargetTop(target: HTMLElement) {
  const header = document.querySelector<HTMLElement>(".site-header");
  const headerExtraSpace = target.id === "application" ? 112 : 58;
  const headerOffset = (header?.getBoundingClientRect().height ?? 0) + headerExtraSpace;

  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
}

function scrollToAnchorTarget(target: HTMLElement, url: URL) {
  const startedAt = performance.now();
  const correctionDuration = target.id === "application" ? APPLICATION_SCROLL_DURATION : ANCHOR_SCROLL_DURATION;

  window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);

  function correctScroll() {
    const targetTop = getAnchorTargetTop(target);

    window.scrollTo({
      top: targetTop,
      behavior: "auto"
    });

    if (performance.now() - startedAt < correctionDuration) {
      requestAnimationFrame(correctScroll);
    }
  }

  window.scrollTo({
    top: getAnchorTargetTop(target),
    behavior: "smooth"
  });

  requestAnimationFrame(correctScroll);
}

export function Header({ dictionary, locale, routeKey }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const prefix = localePrefix(locale);
  const primaryNavigationLabel = locale === "ru" ? "Основная навигация" : "Primary navigation";
  const mobileNavigationLabel = locale === "ru" ? "Мобильная навигация" : "Mobile navigation";
  const navItems = [
    ["services", dictionary.nav.services],
    ["api", dictionary.nav.api],
    ["industries", dictionary.nav.industries],
    ["start", dictionary.nav.security],
    ["security", dictionary.nav.start],
    ["application", dictionary.nav.contact]
  ] as const;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    function correctCurrentHash() {
      const targetId = window.location.hash.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        scrollToAnchorTarget(target, new URL(window.location.href));
      }
    }

    function onDocumentAnchorClick(event: MouseEvent) {
      const targetElement = event.target instanceof Element ? event.target : null;
      const anchor = targetElement?.closest<HTMLAnchorElement>('a[href*="#"]');

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href) {
        return;
      }

      const url = new URL(href, window.location.origin);
      const targetId = url.hash.slice(1);
      const isSameRoute = url.pathname === window.location.pathname;
      const target = targetId ? document.getElementById(targetId) : null;

      if (!isSameRoute || !target) {
        return;
      }

      event.preventDefault();
      setMenuOpen(false);
      scrollToAnchorTarget(target, url);
    }

    document.addEventListener("click", onDocumentAnchorClick, true);
    window.addEventListener("hashchange", correctCurrentHash);

    return () => {
      document.removeEventListener("click", onDocumentAnchorClick, true);
      window.removeEventListener("hashchange", correctCurrentHash);
    };
  }, []);

  function closeLogin() {
    setLoginOpen(false);
    requestAnimationFrame(() => loginButtonRef.current?.focus());
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" href={routePairs.home[locale]} aria-label="PAYWAYS home" data-reveal="brand">
          <span className="brand-mark">PW</span>
          <span>PAYWAYS</span>
        </Link>

        <nav className="desktop-nav" aria-label={primaryNavigationLabel}>
          {navItems.map(([id, label], index) => (
            <NavItemLink
              key={id}
              href={`${prefix}/#${id}`}
              label={label}
              reveal="nav"
              style={{ "--reveal-delay": `${90 + index * 45}ms` } as CSSProperties}
            />
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="language-link"
            href={switchHref(routeKey, locale)}
            data-reveal="button"
            style={{ "--reveal-delay": "380ms" } as CSSProperties}
          >
            {dictionary.alternateName}
          </Link>
          <button
            ref={loginButtonRef}
            className="ghost-button text-roll-button"
            type="button"
            aria-label={dictionary.nav.login}
            data-reveal="button"
            style={{ "--reveal-delay": "430ms" } as CSSProperties}
            onClick={() => setLoginOpen(true)}
          >
            <span className="button-text-roll" aria-hidden="true" data-text={dictionary.nav.login}>
              <span>{dictionary.nav.login}</span>
              <span>{dictionary.nav.login}</span>
            </span>
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label={dictionary.nav.menu}
            data-reveal="button"
            style={{ "--reveal-delay": "430ms" } as CSSProperties}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label={mobileNavigationLabel}>
          {navItems.map(([id, label]) => (
            <NavItemLink
              key={id}
              className="mobile-nav-link"
              href={`${prefix}/#${id}`}
              label={label}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Link href={routePairs.checkout[locale]} onClick={() => setMenuOpen(false)}>
            {dictionary.checkout.eyebrow}
          </Link>
          <button
            className="mobile-login-button text-roll-button"
            type="button"
            aria-label={dictionary.nav.login}
            onClick={() => {
              setMenuOpen(false);
              setLoginOpen(true);
            }}
          >
            <span className="button-text-roll" aria-hidden="true" data-text={dictionary.nav.login}>
              <span>{dictionary.nav.login}</span>
              <span>{dictionary.nav.login}</span>
            </span>
          </button>
        </nav>
      </div>

      {loginOpen ? <LoginModal dictionary={dictionary} onClose={closeLogin} /> : null}
    </>
  );
}

function NavItemLink({
  className,
  href,
  label,
  onClick,
  reveal,
  style
}: {
  className?: string;
  href: string;
  label: string;
  onClick?: () => void;
  reveal?: string;
  style?: CSSProperties;
}) {
  const [scramble, setScramble] = useState({ active: false, signal: 0 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hoveredRef = useRef(false);

  function startScramble() {
    if (hoveredRef.current) {
      return;
    }

    hoveredRef.current = true;
    setScramble((state) => ({ active: true, signal: state.signal + 1 }));
  }

  function stopScramble() {
    hoveredRef.current = false;
    setScramble((state) => ({ ...state, active: false }));
  }

  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented) {
      onClick?.();
      return;
    }

    const url = new URL(href, window.location.origin);
    const targetId = url.hash.slice(1);
    const isSameRoute = url.pathname === window.location.pathname;
    const target = targetId ? document.getElementById(targetId) : null;

    if (isSameRoute && target) {
      event.preventDefault();
      onClick?.();

      scrollToAnchorTarget(target, url);

      return;
    }

    onClick?.();
  }

  useEffect(() => {
    const link = linkRef.current;

    if (!link) {
      return undefined;
    }

    const onMouseOver = (event: MouseEvent) => {
      if (!link.contains(event.relatedTarget as Node | null)) {
        startScramble();
      }
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!link.contains(event.relatedTarget as Node | null)) {
        stopScramble();
      }
    };

    link.addEventListener("mouseenter", startScramble);
    link.addEventListener("mouseover", onMouseOver);
    link.addEventListener("pointerenter", startScramble);
    link.addEventListener("focus", startScramble);
    link.addEventListener("mouseleave", stopScramble);
    link.addEventListener("mouseout", onMouseOut);
    link.addEventListener("pointerleave", stopScramble);
    link.addEventListener("blur", stopScramble);

    return () => {
      link.removeEventListener("mouseenter", startScramble);
      link.removeEventListener("mouseover", onMouseOver);
      link.removeEventListener("pointerenter", startScramble);
      link.removeEventListener("focus", startScramble);
      link.removeEventListener("mouseleave", stopScramble);
      link.removeEventListener("mouseout", onMouseOut);
      link.removeEventListener("pointerleave", stopScramble);
      link.removeEventListener("blur", stopScramble);
    };
  });

  return (
    <Link
      ref={linkRef}
      className={className}
      href={href}
      aria-label={label}
      data-reveal={reveal}
      style={style}
      onClick={handleClick}
    >
      <NavScrambleText label={label} active={scramble.active} signal={scramble.signal} />
      <span className="nav-plus" aria-hidden="true">
        <span className="nav-plus-mark">
          <svg viewBox="0 0 90 90" focusable="false" aria-hidden="true">
            <path d="M49.4648 90.009H40.4648V53.2706H49.4648V90.009ZM90 40.4561V49.4561H53.2617V40.4561H90ZM36.7383 49.4561H0V40.4561H36.7383V49.4561ZM49.4648 36.7471H40.4648V0.00878906L49.4648 0V36.7471Z" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function NavScrambleText({ label, active, signal }: { label: string; active: boolean; signal: number }) {
  const [displayParts, setDisplayParts] = useState(() =>
    Array.from(label).map((character) => ({ character, temporary: false }))
  );
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];

    if (!active || signal === 0) {
      return undefined;
    }

    const characters = Array.from(label);
    const visibleIndexes = characters
      .map((character, index) => (character.trim() === "" ? -1 : index))
      .filter((index) => index >= 0);
    const steps = 5;
    const stepDuration = 46;
    const temporaryCount = Math.min(4, Math.max(1, Math.min(visibleIndexes.length, 3)));

    function randomGlyph() {
      return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
    }

    function pickIndexes(step: number) {
      if (visibleIndexes.length <= temporaryCount) {
        return visibleIndexes;
      }

      const stride = Math.max(1, Math.floor(visibleIndexes.length / steps));
      const start = Math.min(visibleIndexes.length - 1, step * stride);
      const selected = new Set<number>();

      for (let offset = 0; selected.size < temporaryCount && offset < visibleIndexes.length; offset += 1) {
        selected.add(visibleIndexes[(start + offset) % visibleIndexes.length]);
      }

      return Array.from(selected);
    }

    for (let step = 0; step < steps; step += 1) {
      const timeout = setTimeout(() => {
        const selectedIndexes = new Set(pickIndexes(step));

        setDisplayParts(
          characters.map((character, index) =>
            selectedIndexes.has(index)
              ? { character: randomGlyph(), temporary: true }
              : { character, temporary: false }
          )
        );
      }, step * stepDuration);

      timeoutRefs.current.push(timeout);
    }

    const resetTimeout = setTimeout(() => {
      setDisplayParts(characters.map((character) => ({ character, temporary: false })));
    }, steps * stepDuration + 28);

    timeoutRefs.current.push(resetTimeout);

    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, [active, label, signal]);

  return (
    <span className="nav-label nav-scramble" aria-label={label}>
      <span className="nav-scramble-measure" aria-hidden="true">
        {label}
      </span>
      <span className="nav-scramble-output" aria-hidden="true">
        {active
          ? displayParts.map((part, index) => (
              <span key={`${index}-${part.character}`} className={part.temporary ? "nav-scramble-glyph is-temp" : "nav-scramble-glyph"}>
                {part.character}
              </span>
            ))
          : label}
      </span>
    </span>
  );
}

function LoginModal({ dictionary, onClose }: { dictionary: Dictionary; onClose: () => void }) {
  const [error, setError] = useState(false);
  const modalRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab" || !modalRef.current) {
      return;
    }

    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={modalRef}
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        aria-describedby="login-description"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label={dictionary.nav.close}
          data-reveal="button"
        >
          x
        </button>
        <p className="eyebrow" data-reveal="copy">PAYWAYS</p>
        <h2 id="login-title" data-reveal="heading" style={{ "--reveal-delay": "60ms" } as CSSProperties}>
          {dictionary.login.title}
        </h2>
        <p id="login-description" data-reveal="copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          {dictionary.login.subtitle}
        </p>
        <form onSubmit={onSubmit}>
          <label data-reveal="field" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
            {dictionary.login.email}
            <input ref={emailRef} name="email" type="email" autoComplete="email" required />
          </label>
          <label data-reveal="field" style={{ "--reveal-delay": "240ms" } as CSSProperties}>
            {dictionary.login.password}
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error ? (
            <strong className="form-error" role="alert">
              {dictionary.login.error}
            </strong>
          ) : null}
          <button
            className="primary-button text-roll-button"
            type="submit"
            data-reveal="button"
            style={{ "--reveal-delay": "300ms" } as CSSProperties}
          >
            <span className="button-text-roll" aria-hidden="true" data-text={dictionary.login.submit}>
              <span>{dictionary.login.submit}</span>
              <span>{dictionary.login.submit}</span>
            </span>
          </button>
        </form>
      </section>
    </div>
  );
}
