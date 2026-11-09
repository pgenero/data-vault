"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import { signOut, useSession } from "../_lib/session";

// Keep in sync with the 840px breakpoint of .dv-nav in globals.css.
const WIDE_SCREEN = "(min-width: 840px)";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const inLibrary = pathname === "/" || pathname.startsWith("/paneles/");

  return (
    <>
      <Link href="/" aria-current={inLibrary ? "page" : undefined} onClick={onNavigate}>
        Biblioteca
      </Link>
      <Link
        href="/ranking"
        aria-current={pathname === "/ranking" ? "page" : undefined}
        onClick={onNavigate}
      >
        Ranking
      </Link>
    </>
  );
}

function Account({ onNavigate }: { onNavigate?: () => void }) {
  const user = useSession();

  if (!user) {
    return (
      <Link href="/acceso" className="dv-btn" onClick={onNavigate}>
        Iniciar sesión
      </Link>
    );
  }

  return (
    <>
      <span className="dv-nav-user">{user.name}</span>
      <button
        type="button"
        className="dv-btn dv-btn-ghost"
        onClick={() => {
          signOut();
          onNavigate?.();
        }}
      >
        Salir
      </button>
    </>
  );
}

export function SiteNav() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => menuRef.current?.close();

  // A modal left open on a wide screen would be hidden but still block the page.
  useEffect(() => {
    const wideScreen = window.matchMedia(WIDE_SCREEN);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        menuRef.current?.close();
      }
    };
    wideScreen.addEventListener("change", handleChange);
    return () => wideScreen.removeEventListener("change", handleChange);
  }, []);

  // A click on the backdrop is reported with the dialog itself as its target.
  function handleMenuClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  }

  return (
    <header className="dv-nav">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="dv-logo-mark" aria-hidden="true" />
        <span className="dv-logo">Data Vault</span>
      </Link>

      <nav className="dv-nav-links" aria-label="Principal">
        <NavLinks />
      </nav>
      <div className="dv-nav-account">
        <Account />
      </div>

      <button
        type="button"
        className="dv-btn dv-btn-ghost dv-nav-menu-button"
        aria-haspopup="dialog"
        onClick={() => menuRef.current?.showModal()}
      >
        Menú
      </button>

      {/* Native modal: it brings the backdrop, Esc, the focus trap and focus return. */}
      <dialog
        ref={menuRef}
        className="dv-mobile-menu"
        aria-label="Menú"
        onClick={handleMenuClick}
      >
        <div className="dv-mobile-menu-body">
          <button type="button" className="dv-btn dv-btn-ghost self-end" onClick={closeMenu}>
            Cerrar
          </button>
          <nav className="dv-mobile-menu-links" aria-label="Menú">
            <NavLinks onNavigate={closeMenu} />
          </nav>
          <div className="dv-mobile-menu-account">
            <Account onNavigate={closeMenu} />
          </div>
        </div>
      </dialog>
    </header>
  );
}
