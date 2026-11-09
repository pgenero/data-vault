"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();
  const inLibrary = pathname === "/" || pathname.startsWith("/paneles/");

  return (
    <header className="dv-nav">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="dv-logo-mark" aria-hidden="true" />
        <span className="dv-logo">Data Vault</span>
      </Link>
      <nav className="dv-nav-links" aria-label="Principal">
        <Link href="/" aria-current={inLibrary ? "page" : undefined}>
          Biblioteca
        </Link>
        <Link href="/ranking" aria-current={pathname === "/ranking" ? "page" : undefined}>
          Ranking
        </Link>
      </nav>
    </header>
  );
}
