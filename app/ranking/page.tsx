import Link from "next/link";
import { PanelRanking } from "../_components/panel-ranking";

export default function RankingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8">
      <div className="flex flex-col gap-3">
        <h1 className="dv-title">Ranking</h1>
        <p className="text-base text-ink-dim">Los paneles más consultados.</p>
      </div>

      <PanelRanking />

      <div>
        <Link href="/" className="dv-btn dv-btn-ghost">
          Volver a la biblioteca
        </Link>
      </div>
    </div>
  );
}
