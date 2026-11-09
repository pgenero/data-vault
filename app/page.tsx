import { PanelLibrary } from "./_components/panel-library";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[64svh] items-center overflow-hidden">
        <div className="dv-horizon" aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 pt-12 pb-32 md:px-8">
          <h1 className="dv-title text-[32px] md:text-[64px] lg:text-[80px]">Data Vault</h1>
          <p className="max-w-xl text-lg text-ink-dim">
            Una plataforma para ver gráficos de datos en línea.
          </p>
        </div>
      </section>

      <PanelLibrary />
    </>
  );
}
