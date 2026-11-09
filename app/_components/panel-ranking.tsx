"use client";

import { useState } from "react";
import { CATEGORIES, getRanking, type PanelCategory } from "../_data/panels";
import { formatNumber } from "../_data/sample-traffic";

export function PanelRanking() {
  const [category, setCategory] = useState<PanelCategory | null>(null);
  const ranking = getRanking(category ?? undefined);

  return (
    <>
      <div className="dv-filters" role="group" aria-label="Filtrar por categoría">
        <button
          type="button"
          className="dv-chip"
          aria-pressed={category === null}
          onClick={() => setCategory(null)}
        >
          Todos
        </button>
        {CATEGORIES.map((name) => (
          <button
            key={name}
            type="button"
            className="dv-chip"
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <ol className="dv-podium" aria-label="Los tres paneles más consultados">
        {ranking.slice(0, 3).map((panel, index) => (
          <li key={panel.id} className="dv-podium-slot">
            <span className="dv-podium-rank">{index + 1}</span>
            <span className="dv-heading">{panel.title}</span>
            <span className="dv-subheading">{panel.category}</span>
            <span className={`dv-kpi-value mt-auto ${index === 0 ? "dv-kpi-value-lead" : ""}`}>
              {formatNumber(panel.views)}
            </span>
            <span className="dv-subheading">consultas</span>
          </li>
        ))}
      </ol>

      <div className="dv-table-wrap">
        <table className="dv-table">
          <caption className="sr-only">Paneles ordenados por consultas, de mayor a menor</caption>
          <thead>
            <tr>
              <th scope="col" className="dv-num">
                Puesto
              </th>
              <th scope="col">Panel</th>
              <th scope="col">Categoría</th>
              <th scope="col" className="dv-num">
                Consultas
              </th>
              <th scope="col" className="dv-num">
                Usuarios
              </th>
              <th scope="col" className="dv-num">
                Actualizado
              </th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((panel, index) => (
              <tr key={panel.id}>
                <td className="dv-num">{index + 1}</td>
                <th scope="row">{panel.title}</th>
                <td>{panel.category}</td>
                <td className="dv-num">{formatNumber(panel.views)}</td>
                <td className="dv-num">{formatNumber(panel.viewers)}</td>
                <td className="dv-num">{panel.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
