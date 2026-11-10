import { AuthForm } from "../_components/auth-form";

export default function AccessPage() {
  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6 px-4 py-10">
      <h1 className="dv-title">Acceso</h1>
      <AuthForm />
    </div>
  );
}
