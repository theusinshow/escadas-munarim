import { Foto } from "@/components/media/Foto";
import { Rotulo } from "@/components/ui/Rotulo";
import { RESUMO_GOOGLE } from "@/content/avaliacoes";
import { fotosDo } from "@/content/galeria";
import { tipos } from "@/content/tipos";
import { site } from "@/lib/site";

/**
 * Sobre (DEC-067 → DEC-079 → DEC-083). O rótulo logo acima da fileira de
 * quatro cartões altos da referência (good-fella.com) — uma foto e três
 * números com a legenda no pé. Sem frase grande e sem texto corrido: os
 * números falam pela empresa.
 *
 * Só número verificado: 15 anos (DEC-004), 7 tipos e a nota pública no Google
 * (conferida na data de RESUMO_GOOGLE). O de escadas entregues fica para
 * quando a Munarim informar (CNT-016) — a vaga "00+" saiu da tela no DEC-091.
 */

const FOTO = fotosDo("premium")[1];

const NUMEROS: { valor: string; legenda: string }[] = [
  { valor: `${site.yearsInMarket}`, legenda: "Anos de mercado em São José" },
  { valor: `${tipos.length}`, legenda: "Tipos de escada, do lance reto ao caracol" },
  { valor: RESUMO_GOOGLE.nota, legenda: `Nota no Google, em ${RESUMO_GOOGLE.total} avaliações` },
];

export function SobreBloco() {
  return (
    <section id="sobre" className="scroll-mt-(--barra-h) bg-surface py-24 text-barra lg:py-32">
      <div className="container-site">
        <div data-revela>
          <Rotulo>Sobre a Munarim</Rotulo>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
          {FOTO && (
            <li data-revela className="relative aspect-[4/5] overflow-hidden sm:aspect-auto lg:aspect-[3/4]">
              <Foto foto={FOTO} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
            </li>
          )}
          {NUMEROS.map((n) => (
            <li
              key={n.legenda}
              data-revela
              className="flex min-h-44 flex-col justify-between bg-chrome p-6 sm:min-h-64 lg:aspect-[3/4] lg:p-8"
            >
              <span className="font-display text-[clamp(3.2rem,6vw,5.6rem)] leading-none">{n.valor}</span>
              <span className="max-w-[24ch] font-label text-[0.72rem] leading-relaxed tracking-[0.14em] uppercase">
                {n.legenda}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
