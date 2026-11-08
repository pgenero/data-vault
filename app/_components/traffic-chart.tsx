"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { channels, formatNumber, months } from "../_data/sample-traffic";

const Y_MAX = 30000;
const Y_TICKS = [0, 10000, 20000, 30000];
const LAST = months.length - 1;

const xAt = (month: number) => (month / LAST) * 100;
const yAt = (value: number) => 100 - (value / Y_MAX) * 100;

function describeMonth(month: number) {
  const values = channels
    .map((channel) => `${channel.name} ${formatNumber(channel.values[month])}`)
    .join(", ");
  return `${months[month].long}: ${values}`;
}

function LineKey({ color }: { color: string }) {
  return <span className="dv-swatch-line" style={{ color }} />;
}

export function TrafficChart() {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [active, setActive] = useState<number | null>(null);

  function handlePointer(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setActive(Math.max(0, Math.min(LAST, Math.round(ratio * LAST))));
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const current = active ?? LAST;
    const next: Record<string, number> = {
      ArrowLeft: Math.max(0, current - 1),
      ArrowRight: Math.min(LAST, current + 1),
      Home: 0,
      End: LAST,
    };
    if (event.key in next) {
      event.preventDefault();
      setActive(next[event.key]);
    }
  }

  return (
    <section className="dv-panel">
      <header className="dv-panel-header">
        <div>
          <h3 className="dv-heading">Visitas por canal</h3>
          <p className="dv-subheading">Visitas al mes durante 2025</p>
        </div>
        <div className="dv-filters">
          <button
            type="button"
            className="dv-chip"
            aria-pressed={view === "chart"}
            onClick={() => setView("chart")}
          >
            Gráfico
          </button>
          <button
            type="button"
            className="dv-chip"
            aria-pressed={view === "table"}
            onClick={() => setView("table")}
          >
            Tabla
          </button>
        </div>
      </header>

      {view === "chart" ? (
        <>
          <ul className="dv-legend">
            {channels.map((channel) => (
              <li key={channel.name} className="dv-legend-item">
                <LineKey color={channel.color} />
                {channel.name}
              </li>
            ))}
          </ul>

          {/* Lines are drawn in a stretched 0-100 viewBox and everything else is
              positioned in %, so the chart resizes without measuring in JS. */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Visitas por mes. Usa las flechas para cambiar de mes."
            aria-valuemin={0}
            aria-valuemax={LAST}
            aria-valuenow={active ?? LAST}
            aria-valuetext={describeMonth(active ?? LAST)}
            className="relative mt-2 mr-2 mb-8 ml-12 h-64 cursor-crosshair touch-pan-y sm:mr-24 sm:h-72"
            onPointerMove={handlePointer}
            onPointerDown={handlePointer}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive((current) => current ?? LAST)}
            onBlur={() => setActive(null)}
            onKeyDown={handleKey}
          >
            <svg
              className="absolute inset-0 size-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {Y_TICKS.map((tick) => (
                <line
                  key={tick}
                  x1="0"
                  x2="100"
                  y1={yAt(tick)}
                  y2={yAt(tick)}
                  className={tick === 0 ? "dv-axis-line" : "dv-grid-line"}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {active !== null && (
                <line
                  x1={xAt(active)}
                  x2={xAt(active)}
                  y1="0"
                  y2="100"
                  stroke="var(--ink-faint)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              {channels.map((channel) => (
                <polyline
                  key={channel.name}
                  fill="none"
                  stroke={channel.color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  points={channel.values
                    .map((value, month) => `${xAt(month)},${yAt(value)}`)
                    .join(" ")}
                />
              ))}
            </svg>

            {Y_TICKS.map((tick) => (
              <span
                key={tick}
                className="absolute right-full mr-2 -translate-y-1/2 text-[11px] whitespace-nowrap text-ink-faint tabular-nums"
                style={{ top: `${yAt(tick)}%` }}
              >
                {tick === 0 ? "0" : `${tick / 1000} mil`}
              </span>
            ))}

            {months.map((month, index) => (
              <span
                key={month.short}
                className={`absolute top-full mt-2 -translate-x-1/2 text-[11px] text-ink-faint ${
                  index % 2 === 1 ? "max-sm:hidden" : ""
                }`}
                style={{ left: `${xAt(index)}%` }}
              >
                {month.short}
              </span>
            ))}

            {channels.map((channel) => (
              <span
                key={channel.name}
                className="absolute left-full ml-3 -translate-y-1/2 text-xs leading-tight text-ink-dim tabular-nums max-sm:hidden"
                style={{ top: `${yAt(channel.values[LAST])}%` }}
              >
                {channel.name}
                <br />
                <span className="font-medium text-ink">
                  {formatNumber(channel.values[LAST])}
                </span>
              </span>
            ))}

            {channels.map((channel) => {
              const month = active ?? LAST;
              return (
                <span
                  key={channel.name}
                  className="dv-marker"
                  style={{
                    left: `${xAt(month)}%`,
                    top: `${yAt(channel.values[month])}%`,
                    background: channel.color,
                  }}
                />
              );
            })}

            {active !== null && (
              <div
                className="dv-tooltip absolute top-2"
                style={
                  active > LAST / 2
                    ? { right: `calc(${100 - xAt(active)}% + 12px)` }
                    : { left: `calc(${xAt(active)}% + 12px)` }
                }
              >
                <p className="mb-1.5 text-ink-dim">{months[active].long}</p>
                <ul className="flex flex-col gap-1">
                  {channels.map((channel) => (
                    <li key={channel.name} className="flex items-center gap-2 whitespace-nowrap">
                      <LineKey color={channel.color} />
                      <strong className="font-semibold tabular-nums">
                        {formatNumber(channel.values[active])}
                      </strong>
                      <span className="text-ink-dim">{channel.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="dv-table-wrap">
          <table className="dv-table">
            <caption className="sr-only">Visitas al mes durante 2025, por canal</caption>
            <thead>
              <tr>
                <th scope="col">Mes</th>
                {channels.map((channel) => (
                  <th key={channel.name} scope="col" className="dv-num">
                    {channel.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {months.map((month, index) => (
                <tr key={month.short}>
                  <th scope="row">{month.long}</th>
                  {channels.map((channel) => (
                    <td key={channel.name} className="dv-num">
                      {formatNumber(channel.values[index])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="dv-note">Datos inventados para esta demostración.</p>
    </section>
  );
}
