import Link from "next/link";
import type { Panel } from "../_data/panels";
import { formatNumber } from "../_data/sample-traffic";
import { PanelThumb } from "./panel-thumb";

export function PanelCard({ panel }: { panel: Panel }) {
  return (
    <Link href={`/paneles/${panel.id}`} className="dv-card">
      <div className="dv-card-thumb">
        <PanelThumb kind={panel.chartKind} />
      </div>
      <span className="dv-tag self-start">{panel.category}</span>
      <h3 className="dv-heading">{panel.title}</h3>
      <p className="dv-subheading flex-1">{panel.short}</p>
      <div className="dv-card-foot">
        <span className="tabular-nums">{formatNumber(panel.views)} consultas</span>
        <span className="dv-card-action">Abrir panel</span>
      </div>
    </Link>
  );
}
