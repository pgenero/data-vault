import Link from "next/link";

export default function NotFound() {
  return (
    <section className="dv-empty min-h-[64svh] gap-6">
      <p className="dv-title md:text-[64px]">404</p>
      <div className="flex flex-col gap-2">
        <h1 className="dv-heading text-xl">Esta página no existe</h1>
        <p>Revisa la dirección o busca el panel en la biblioteca.</p>
      </div>
      <Link href="/" className="dv-btn">
        Volver a la biblioteca
      </Link>
    </section>
  );
}
