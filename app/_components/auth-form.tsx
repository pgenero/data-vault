"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { signIn, signOut } from "../_lib/session";

type Mode = "signin" | "signup";

const MODES: { id: Mode; label: string }[] = [
  { id: "signin", label: "Iniciar sesión" },
  { id: "signup", label: "Crear cuenta" },
];

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const formRef = useRef<HTMLFormElement>(null);

  // Next.js keeps this route alive (hidden) after navigating away, inputs
  // included, so the password would still be there on the way back.
  function leave() {
    formRef.current?.reset();
    setMode("signin");
    router.push("/");
  }

  // Uncontrolled inputs: only the user name is ever read, so the password and
  // the email never reach state or storage.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(String(new FormData(event.currentTarget).get("usuario") ?? ""));
    leave();
  }

  function continueAsGuest() {
    signOut();
    leave();
  }

  return (
    <div className="dv-panel gap-5">
      <div className="dv-auth-tabs" role="group" aria-label="Tipo de acceso">
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className="dv-auth-tab"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* noValidate: any input is accepted, even a malformed email. */}
      <form ref={formRef} className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <div className="dv-field">
          <label htmlFor="acceso-usuario">Usuario</label>
          <input
            id="acceso-usuario"
            name="usuario"
            className="dv-input"
            maxLength={40}
            autoComplete="username"
          />
        </div>
        {mode === "signup" && (
          <div className="dv-field">
            <label htmlFor="acceso-correo">Correo electrónico</label>
            <input id="acceso-correo" type="email" className="dv-input" autoComplete="off" />
          </div>
        )}
        <div className="dv-field">
          <label htmlFor="acceso-clave">Contraseña</label>
          <input id="acceso-clave" type="password" className="dv-input" autoComplete="off" />
        </div>
        <button type="submit" className="dv-btn w-full">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </button>
      </form>

      <button type="button" className="dv-btn dv-btn-ghost w-full" onClick={continueAsGuest}>
        Continuar como invitado
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="dv-btn dv-btn-ghost" disabled>
          Google
        </button>
        <button type="button" className="dv-btn dv-btn-ghost" disabled>
          GitHub
        </button>
      </div>
      <p className="dv-note">
        Este acceso es simulado: sirve cualquier dato. Solo se guarda el usuario, en este navegador.
        Google y GitHub todavía no están disponibles.
      </p>
    </div>
  );
}
