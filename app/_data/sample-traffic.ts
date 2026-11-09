// Made-up data for the chart preview on the panel detail page. Replace it when real data exists.

export const months = [
  { short: "Ene", long: "Enero" },
  { short: "Feb", long: "Febrero" },
  { short: "Mar", long: "Marzo" },
  { short: "Abr", long: "Abril" },
  { short: "May", long: "Mayo" },
  { short: "Jun", long: "Junio" },
  { short: "Jul", long: "Julio" },
  { short: "Ago", long: "Agosto" },
  { short: "Sep", long: "Septiembre" },
  { short: "Oct", long: "Octubre" },
  { short: "Nov", long: "Noviembre" },
  { short: "Dic", long: "Diciembre" },
];

export const channels = [
  {
    name: "Orgánico",
    color: "var(--series-1)",
    values: [14200, 15100, 16800, 16100, 17900, 18600, 17400, 19200, 21300, 22800, 24600, 26900],
  },
  {
    name: "Directo",
    color: "var(--series-2)",
    values: [8200, 8600, 9100, 9400, 9000, 9800, 10300, 10100, 11200, 11900, 12100, 12800],
  },
  {
    name: "Redes",
    color: "var(--series-3)",
    values: [3100, 4200, 3800, 5600, 7200, 6400, 5900, 7800, 6900, 8300, 9900, 8700],
  },
];

// es-ES skips grouping on four-digit numbers by default, which would misalign
// table columns (9000 next to 12.800).
const numberFormat = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

export const formatNumber = (value: number) => numberFormat.format(value);
