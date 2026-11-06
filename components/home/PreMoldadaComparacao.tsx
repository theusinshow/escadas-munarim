import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { Rotulo } from "@/components/ui/Rotulo";
import { fotosDo } from "@/content/galeria";

/**
 * Pré-moldada ou no local (DEC-100, substitui o acordeão do DEC-067). As duas
 * formas lado a lado, cada uma com foto, nome e o que muda na obra. O
 * vocabulário (vão, pé-direito, espelho e piso) fica em /duvidas, com o link
 * no fim da seção. Nenhum dado novo, nenhum prazo (CNT-005).
 */

const FOTO_PM = fotosDo("reta")[3] ?? fotosDo("reta")[0];

const FORMAS = [
  {
    titulo: "Pré-moldada",
    sub: "Moldada antes, fora da obra.",
    texto:
      "A escada é concretada em fôrma, curada e polida antes de chegar na sua casa. Ela chega pronta para assentar.",
    foto: FOTO_PM,
  },
  {
    titulo: "No local (in loco)",
    sub: "Concretada dentro da obra.",
    texto:
      "Fôrma, escoramento e concreto ficam dentro de casa. A obra para até o concreto curar, e a sujeira fica lá dentro.",
    foto: fotosDo("espelho-fechado")[0] ?? FOTO_PM,
  },
];

export function PreMoldadaComparacao() {
  return (
    <section className="bg-surface py-24 text-barra lg:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-3 lg:pt-3" data-revela>
            <Rotulo>Pré-moldada ou no local</Rotulo>
          </div>
          <h2
            data-revela
            className="max-w-[22ch] text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08] lg:col-span-9"
          >
            Duas formas de fazer a mesma escada
          </h2>
        </div>

        <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-20">
          {FORMAS.map((f) => (
            <li key={f.titulo} data-revela>
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-square">
                {f.foto && <Foto foto={f.foto} fill sizes="(min-width: 768px) 50vw, 100vw" />}
              </div>
              <h3 className="mt-8 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] leading-tight uppercase">
                {f.titulo}
              </h3>
              <p className="mt-4 font-semibold">{f.sub}</p>
              <p className="mt-2 max-w-[52ch] leading-relaxed text-chrome-muted">{f.texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6" data-revela>
          <Link href="/duvidas" className="btn-chanfro-escuro">
            Todas as dúvidas
          </Link>
          <p className="max-w-[52ch] leading-relaxed text-chrome-muted">
            Vão, pé-direito, espelho e piso: o que cada termo significa está nas dúvidas.
          </p>
        </div>
      </div>
    </section>
  );
}
