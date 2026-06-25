import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <p className="eyebrow">PAYWAYS</p>
      <h1>Страница не найдена</h1>
      <Link className="primary-button" href="/">
        На главную
      </Link>
    </main>
  );
}
