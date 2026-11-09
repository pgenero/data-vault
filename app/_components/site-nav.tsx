"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "../_lib/session";

export function SiteNav() {
  const pathname = usePathname();
  const user = useSession();
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
      <div className="dv-nav-account">
        {user ? (
          <>
            <span className="dv-nav-user">{user.name}</span>
            <button type="button" className="dv-btn dv-btn-ghost" onClick={signOut}>
              Salir
            </button>
          </>
        ) : (
          <Link href="/acceso" className="dv-btn">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
