import type { ChartKind } from "../_data/panels";

// Decorative drawings, not data: the shapes are fixed and say nothing about the
// panel's figures. Colors are limited to the --series-* and --seq-* tokens.

const seq = (step: number) => `var(--seq-${step}00)`;

const LINES = [
  { color: "var(--series-1)", points: "8,62 32,56 56,58 80,44 104,38 128,26 152,14" },
  { color: "var(--series-2)", points: "8,48 32,52 56,44 80,50 104,46 128,48 152,40" },
  { color: "var(--series-3)", points: "8,74 32,70 56,72 80,66 104,70 128,62 152,64" },
];

// Height in viewBox units and its --seq-* step: taller bars are brighter.
const BARS = [
  { height: 24, step: 3 },
  { height: 42, step: 5 },
  { height: 32, step: 4 },
  { height: 58, step: 6 },
  { height: 48, step: 5 },
  { height: 72, step: 8 },
  { height: 64, step: 7 },
];

// --seq-* step for each cell, rows from top to bottom.
const HEAT = [
  [1, 2, 3, 2, 4, 3, 2, 1],
  [2, 4, 6, 5, 7, 5, 3, 2],
  [3, 5, 8, 7, 8, 6, 4, 2],
  [1, 3, 5, 4, 6, 4, 2, 1],
];

// Slices of a circle measured with pathLength={100}, in the series' fixed order.
const SLICES = [
  { color: "var(--series-1)", start: 0, size: 43 },
  { color: "var(--series-2)", start: 45, size: 26 },
  { color: "var(--series-3)", start: 73, size: 15 },
  { color: "var(--series-4)", start: 90, size: 8 },
];

function Lines() {
  return (
    <>
      <line x1="8" x2="152" y1="82" y2="82" stroke={seq(3)} />
      {LINES.map((line) => (
        <polyline
          key={line.color}
          points={line.points}
          fill="none"
          stroke={line.color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function Bars() {
  return (
    <>
      <line x1="8" x2="152" y1="82" y2="82" stroke={seq(3)} />
      {BARS.map((bar, index) => (
        <rect
          key={index}
          x={14 + index * 20}
          y={82 - bar.height}
          width="12"
          height={bar.height}
          fill={seq(bar.step)}
        />
      ))}
    </>
  );
}

function Heat() {
  return HEAT.map((row, rowIndex) =>
    row.map((step, columnIndex) => (
      <rect
        key={`${rowIndex}-${columnIndex}`}
        x={8 + columnIndex * 18.25}
        y={6 + rowIndex * 19.5}
        width="17"
        height="18"
        fill={seq(step)}
      />
    )),
  );
}

function Donut() {
  return (
    <g transform="rotate(-90 80 45)">
      {SLICES.map((slice) => (
        <circle
          key={slice.color}
          cx="80"
          cy="45"
          r="30"
          fill="none"
          stroke={slice.color}
          strokeWidth="14"
          pathLength={100}
          strokeDasharray={`${slice.size} ${100 - slice.size}`}
          strokeDashoffset={-slice.start}
        />
      ))}
    </g>
  );
}

const DRAWINGS: Record<ChartKind, () => React.ReactNode> = {
  lineas: Lines,
  barras: Bars,
  calor: Heat,
  donut: Donut,
};

export function PanelThumb({ kind }: { kind: ChartKind }) {
  const Drawing = DRAWINGS[kind];

  return (
    <svg className="w-full" viewBox="0 0 160 90" aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  );
}
