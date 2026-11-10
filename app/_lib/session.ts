"use client";

import { useMemo, useSyncExternalStore } from "react";

// Simulated session: nothing is validated, and only the name is ever stored.

export type SessionUser = { name: string };

const STORAGE_KEY = "dv_user";
const DEFAULT_NAME = "ANALISTA";
const MAX_NAME_LENGTH = 10;

const listeners = new Set<() => void>();

// The "storage" event does not fire in the tab that made the change.
function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// Returns the raw string: parsing here would create a new object on every read,
// and useSyncExternalStore would re-render forever.
function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// No session on the server or during hydration, so the markup always matches.
function getServerSnapshot() {
  return null;
}

function parseUser(raw: string | null): SessionUser | null {
  if (raw === null) {
    return null;
  }
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value === "object" && value !== null && "name" in value && typeof value.name === "string") {
      return { name: value.name };
    }
  } catch {
    // Corrupt value: treat it as no session.
  }
  return null;
}

export function useSession(): SessionUser | null {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parseUser(raw), [raw]);
}

export function signIn(name: string) {
  const user: SessionUser = {
    name: name.trim().toUpperCase().slice(0, MAX_NAME_LENGTH) || DEFAULT_NAME,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Storage is blocked: the app keeps working as a guest.
  }
  notify();
}

export function signOut() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage is blocked: there is no stored session to remove.
  }
  notify();
}
