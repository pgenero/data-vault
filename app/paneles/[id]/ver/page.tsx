import Link from "next/link";
import { notFound } from "next/navigation";
import { getPanel, PANELS } from "../../../_data/panels";

export function generateStaticParams() {
  return PANELS.map((panel) => ({ id: panel.id }));
}

export default async function PanelViewerPage({ params }: PageProps<"/paneles/[id]/ver">) {
  const { id } = await params;
  const panel = getPanel(id);

  if (!panel) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:px-8">
      <div className="dv-viewer-bar">
        <div className="dv-viewer-facts">
          <div className="dv-viewer-fact">
            <span className="dv-kpi-label">Panel</span>
            <h1 className="dv-heading">{panel.title}</h1>
          </div>
          <div className="dv-viewer-fact">
            <span className="dv-kpi-label">Categoría</span>
            <span>{panel.category}</span>
          </div>
          <div className="dv-viewer-fact">
            <span className="dv-kpi-label">Última actualización</span>
            <span className="tabular-nums">{panel.updatedAt}</span>
          </div>
          <div className="dv-viewer-fact">
            <span className="dv-kpi-label">Usuario</span>
            <span>Invitado</span>
          </div>
        </div>
        <Link href={`/paneles/${panel.id}`} className="dv-btn dv-btn-ghost">
          Salir
        </Link>
      </div>

      <section className="dv-viewer-frame" aria-labelledby="reporte-estado">
        <h2 id="reporte-estado" className="dv-viewer-message">
          Reporte no disponible
        </h2>
        <p className="dv-note">Este panel todavía no tiene un reporte conectado.</p>
      </section>

      <div className="dv-viewer-foot">
        <span className="dv-status dv-status-warning">Sin reporte</span>
        <span className="dv-note">Fuente: {panel.source}</span>
      </div>
    </div>
  );
}
