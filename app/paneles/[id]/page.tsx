import Link from "next/link";
import { notFound } from "next/navigation";
import { TrafficChart } from "../../_components/traffic-chart";
import { getPanel, getRecentViews, PANELS } from "../../_data/panels";
import { formatNumber } from "../../_data/sample-traffic";

export function generateStaticParams() {
  return PANELS.map((panel) => ({ id: panel.id }));
}

export default async function PanelPage({ params }: PageProps<"/paneles/[id]">) {
  const { id } = await params;
  const panel = getPanel(id);

  if (!panel) {
    notFound();
  }

  const tags = [
    panel.category,
    `Actualización ${panel.frequency.toLowerCase()}`,
    `Actualizado el ${panel.updatedAt}`,
    `Fuente: ${panel.source}`,
  ];

  return (
    <div className="dv-detail mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <div className="flex min-w-0 flex-col gap-6">
        <ul className="dv-tags">
          {tags.map((tag) => (
            <li key={tag} className="dv-tag">
              {tag}
            </li>
          ))}
        </ul>

        <h1 className="dv-title">{panel.title}</h1>
        <p className="max-w-[72ch] text-base text-ink-dim">{panel.long}</p>

        <div className="dv-stats">
          <div className="dv-kpi">
            <span className="dv-kpi-label">Consultas</span>
            <span className="dv-kpi-value dv-kpi-value-lead">{formatNumber(panel.views)}</span>
          </div>
          <div className="dv-kpi">
            <span className="dv-kpi-label">Usuarios</span>
            <span className="dv-kpi-value">{formatNumber(panel.viewers)}</span>
          </div>
          <div className="dv-kpi">
            <span className="dv-kpi-label">Consultas por usuario</span>
            <span className="dv-kpi-value">
              {formatNumber(Math.round(panel.views / panel.viewers))}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="dv-note">Vista previa con datos de ejemplo</h2>
          <TrafficChart />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="dv-btn dv-btn-ghost">
            Volver a la biblioteca
          </Link>
        </div>
      </div>

      <aside className="dv-panel self-start" aria-labelledby="consultas-recientes">
        <h2 id="consultas-recientes" className="dv-heading">
          Consultas recientes
        </h2>
        <table className="dv-table">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col" className="dv-num">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {getRecentViews(panel.id, 10).map((view) => (
              <tr key={view.user}>
                <th scope="row">{view.user}</th>
                <td className="dv-num">{view.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
    </div>
  );
}
