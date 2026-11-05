import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { capaDo, fotosDo } from "@/content/galeria";
import type { Tipo } from "@/content/tipos";

/**
 * Card de coleção — um tipo de escada e as fotos dele (DEC-052).
 *
 * Na estrutura de referência a unidade da galeria é o projeto. Aqui não pode
 * ser: o acervo é de referência (CNT-003), e juntar fotos de casas diferentes
 * num "projeto" seria inventar uma obra. A unidade honesta é o tipo — cada um
 * já tem página com galeria em `/escadas/[tipo]`. Quando chegarem fotos de
 * obra, a obra vira a unidade e este card troca de dado, não de forma.
 *
 * Tudo no card sai do conteúdo: índice no catálogo, contagem real de fotos,
 * nome e resumo do tipo.
 *
 * `degrau` desloca o card para baixo em múltiplos do espelho (18): três cards
 * lado a lado formam um lance. No celular, coluna única, sem deslocamento.
 */

const DEGRAU = ["", "md:mt-12 lg:mt-[4.5rem]", "md:mt-24 lg:mt-36"] as const;

export function ColecaoCard({
  tipo,
  indice,
  degrau = 0,
  titulo: Titulo = "h3",
}: {
  tipo: Tipo;
  /** Posição no catálogo, 1-based. */
  indice: number;
  degrau?: 0 | 1 | 2;
  /** h3 sob o h2 de uma seção; h2 direto sob o h1 de página. */
  titulo?: "h2" | "h3";
}) {
  const capa = capaDo(tipo.slug);
  const total = fotosDo(tipo.slug).length;

  return (
    <Link href={`/escadas/${tipo.slug}`} className={`group block ${DEGRAU[degrau]}`}>
      <p className="spec flex items-baseline gap-3 border-b border-border pb-2.5 text-[0.7rem]">
        <span className="text-text">{String(indice).padStart(2, "0")}</span>
        <span>{tipo.destaque}</span>
        <span className="ml-auto tabular-nums">
          {total} {total === 1 ? "imagem" : "imagens"}
        </span>
      </p>

      <div className="relative mt-3 aspect-[2/3] overflow-hidden bg-shade">
        {capa && (
          <Foto
            foto={capa}
            fill
            sizes="(min-width: 768px) 31vw, 100vw"
            imgClassName="transition-[filter] duration-500 ease-degrau group-hover:brightness-[0.9] motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-border pt-4">
        <Titulo className="font-display text-2xl font-bold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
          Escada {tipo.nome.toLowerCase()}
        </Titulo>
        <span
          aria-hidden="true"
          className="row-span-2 self-center text-muted transition-transform duration-300 ease-degrau group-hover:translate-x-1 group-hover:text-text"
        >
          →
        </span>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tipo.resumo}</p>
      </div>
    </Link>
  );
}
