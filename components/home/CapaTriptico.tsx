import Image from "next/image";
import { fotosIntercaladas, temReferencia } from "@/content/galeria";
import { tipoSlugs } from "@/content/tipos";
import { site } from "@/lib/site";
import { PausarRotacao, TripticoColunas, TripticoRotacao } from "./TripticoRotacao";

/**
 * Capa da home — tríptico com o título no canto inferior esquerdo
 * (DEC-053 → DEC-054).
 *
 * O acervo é todo vertical. Uma foto vertical esticada numa dobra 16:9 perde
 * 60% da altura — justamente o lance da escada. Três colunas lado a lado têm,
 * cada uma, quase a proporção do arquivo (640×1000 numa tela 1920): a dobra
 * fica cheia e a foto fica inteira. No celular a tela já é vertical, e sobra
 * uma coluna.
 *
 * No canto inferior esquerdo, um card de vidro com o logo da empresa (DEC-056)
 * — o logo é o H1, com o nome e a tagline no `alt`.
 * Embaixo, pequenos, o botão de pausa (WCAG 2.2.2) e o aviso de imagem de
 * referência, que não podem sair.
 *
 * Texto sobre foto só aqui e na grade, sempre sobre véu de tinta.
 * Sem botões de ação e sem orçamento: a prova é a grade logo abaixo (DEC-001).
 */

const COLUNAS = 3;
const TODAS = fotosIntercaladas(tipoSlugs);
/* Round-robin: a coluna 1 abre com a reta, a 2 com o caracol, a 3 com o leke,
   e nenhuma foto aparece em duas colunas. */
const POR_COLUNA = Array.from({ length: COLUNAS }, (_, c) =>
  TODAS.filter((_, i) => i % COLUNAS === c),
);

const atraso = (d: number) => ({ "--d": d }) as React.CSSProperties;

export function CapaTriptico() {
  return (
    <section
      aria-labelledby="capa-titulo"
      data-barra="transparente"
      className="relative -mt-(--barra-h) h-svh min-h-[40rem] overflow-hidden bg-text text-primary-fg"
    >
      <TripticoRotacao>
        <TripticoColunas colunas={POR_COLUNA} />

        {/* Véus de tinta: um curto no topo para a barra, e o peso no canto
            inferior esquerdo, onde está o texto. O resto da foto fica limpo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#1f2d3b]/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-[#1f2d3b]/85 via-[#1f2d3b]/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-[#1f2d3b]/60 to-transparent md:w-2/3"
        />

        <div className="relative flex h-full flex-col justify-end px-6 pb-8 lg:px-8 lg:pb-10">
          {/* O card de vidro com o logo original da empresa redesenhado em vetor (DEC-058). */}
          <div
            className="triptico-entra w-fit max-w-full border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:p-8"
            style={atraso(0)}
          >
            <h1 id="capa-titulo" className="min-w-0">
              <Image
                src="/marca/munarim-capa-sobre-escuro.svg"
                alt={`${site.name} — ${site.tagline}`}
                width={1022}
                height={248}
                priority
                unoptimized
                className="h-auto w-[min(70vw,32rem)]"
              />
            </h1>
          </div>

          <div
            className="triptico-entra mt-8 flex flex-wrap items-center gap-x-8 gap-y-2"
            style={atraso(1)}
          >
            <PausarRotacao />
            {temReferencia && (
              <p className="spec text-[0.62rem] text-primary-fg/75">
                IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)
              </p>
            )}
          </div>
        </div>
      </TripticoRotacao>
    </section>
  );
}
