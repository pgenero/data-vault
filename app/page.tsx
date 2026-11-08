import Link from "next/link";
import { TrafficChart } from "./_components/traffic-chart";
import { formatNumber, getSummary } from "./_data/sample-traffic";

export default function Home() {
  const summary = getSummary();

  return (
    <>
      <header className="dv-nav justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="dv-logo-mark" aria-hidden="true" />
          <span className="dv-logo">Data Vault</span>
        </Link>
        <nav className="dv-nav-links" aria-label="Principal">
          <a href="#panel-ejemplo">Panel de ejemplo</a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[64svh] items-center overflow-hidden">
          <div className="dv-horizon" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 pt-12 pb-32 md:px-8">
            <h1 className="dv-title text-[32px] md:text-[64px] lg:text-[80px]">Data Vault</h1>
            <p className="max-w-xl text-lg text-ink-dim">
              Una plataforma para ver gráficos de datos en línea.
            </p>
            <a href="#panel-ejemplo" className="dv-btn">
              Ver panel de ejemplo
            </a>
          </div>
        </section>

        <section
          id="panel-ejemplo"
          className="mx-auto flex w-full max-w-6xl scroll-mt-20 flex-col gap-4 px-4 py-12 md:px-8"
        >
          <div>
            <h2 className="dv-heading text-xl">Panel de ejemplo</h2>
            <p className="dv-subheading">Tráfico de un sitio web ficticio</p>
          </div>

          <div className="dv-dashboard">
            <div className="dv-kpi">
              <span className="dv-kpi-label">Visitas en 2025</span>
              <span className="dv-kpi-value dv-kpi-value-lead">
                {formatNumber(summary.total)}
              </span>
              <span className="dv-kpi-delta">
                +{summary.growth} % de enero a diciembre
              </span>
            </div>
            <div className="dv-kpi">
              <span className="dv-kpi-label">Mes con más visitas</span>
              <span className="dv-kpi-value">{summary.peakMonth}</span>
              <span className="dv-kpi-delta">{formatNumber(summary.peak)} visitas</span>
            </div>
            <div className="dv-kpi">
              <span className="dv-kpi-label">Canal principal</span>
              <span className="dv-kpi-value">{summary.topChannel}</span>
              <span className="dv-kpi-delta">{summary.topShare} % de las visitas</span>
            </div>
          </div>

          <TrafficChart />
        </section>
      </main>
    </>
  );
}
