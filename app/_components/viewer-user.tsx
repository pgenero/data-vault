"use client";

import { useSession } from "../_lib/session";

export function ViewerUser() {
  const user = useSession();
  return <span>{user ? user.name : "Invitado"}</span>;
}
