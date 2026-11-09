"use client";

import { useState } from "react";
import { CATEGORIES, PANELS, type PanelCategory } from "../_data/panels";
import { PanelCard } from "./panel-card";

// Lets "trafico" find "Tráfico web".
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function PanelLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PanelCategory | null>(null);

  const search = normalize(query.trim());
  const panels = PANELS.filter(
    (panel) =>
      (category === null || panel.category === category) &&
      normalize(panel.title).includes(search),
  );

  return (
    <section
      className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8"
      aria-labelledby="biblioteca-titulo"
    >
      <h2 id="biblioteca-titulo" className="sr-only">
        Biblioteca de paneles
      </h2>

      <div className="dv-library-filters">
        <div className="dv-field dv-library-search">
          <label htmlFor="buscar-panel">Buscar panel</label>
          <input
            id="buscar-panel"
            type="search"
            className="dv-input"
            placeholder="Escribe un nombre"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
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
      </div>

      <p className="dv-subheading" role="status">
        {panels.length === 1 ? "1 panel" : `${panels.length} paneles`}
      </p>

      {panels.length > 0 ? (
        <div className="dv-card-grid">
          {panels.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      ) : (
        <div className="dv-empty">
          <h3 className="dv-heading">Ningún panel coincide con tu búsqueda</h3>
          <p>Prueba con otro nombre u otra categoría.</p>
        </div>
      )}
    </section>
  );
}
