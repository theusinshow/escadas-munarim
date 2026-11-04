import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { Axonometry } from "@/components/technical/Axonometry";
import { TipoIcone } from "@/components/technical/TipoIcone";
import { capaDo } from "@/content/galeria";
import type { Tipo } from "@/content/tipos";

/**
 * Card de tipo de escada (DEC-048 · DEC-051).
 *
 * A foto vertical vende, o pictograma explica. A foto ocupa a parte de cima em
 * retrato 3:4 — escada é peça vertical e o curso dos degraus precisa caber. O
 * pictograma do tipo (`TipoIcone`) vem embaixo: mesmo quadro e traço nos 7, então
 * o grid continua sendo ferramenta de comparação mesmo com a foto dominando.
 *
 * Sem foto no acervo, a axonometria assume o lugar dela — nunca caixa cinza
 * (`MEDIA_PLAN.md`).
 *
 * O card inteiro é o link; sem seta nem "saiba mais" repetido (U15).
 */
export function TypeCard({
  tipo,
  indice,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  tipo: Tipo;
  indice?: string;
  sizes?: string;
}) {
  const foto = capaDo(tipo.slug);
  /* Resumo ainda pendente traz a marcação "[CNT-… — …]" no texto. Ela continua
     visível — slot marcado, nunca placeholder verossímil —, mas como selo, fora
     da frase. */
  const [, texto = tipo.resumo, pendencia] =
    tipo.resumo.match(/^(.*?)\s*\[(CNT-\d+[^\]]*)\]\s*$/) ?? [];

  return (
    <Link
      href={`/escadas/${tipo.slug}`}
      className="group flex h-full flex-col bg-surface hover:bg-shade"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-shade">
        {foto ? (
          <Foto
            foto={foto}
            fill
            sizes={sizes}
            imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 p-8">
            <Axonometry slug={tipo.slug} title={tipo.nome} className="h-full w-full" />
          </div>
        )}
        {/* O índice é numeração de prancha, não ranking. */}
        {indice && (
          <span
            aria-hidden="true"
            className="spec absolute right-3 bottom-3 bg-surface px-2 py-1 text-[0.7rem] leading-none text-muted"
          >
            {indice} / 07
          </span>
        )}
      </div>

      <div className="flex flex-1 gap-4 p-6 lg:p-7">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {tipo.nome}
          </h3>
          <p className="mt-1 text-sm font-semibold text-accent">{tipo.destaque}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{texto}</p>
          {pendencia && (
            <p className="spec mt-3 border-l-2 border-accent pl-3 text-[0.62rem] text-muted">
              {pendencia}
            </p>
          )}
        </div>
        <TipoIcone
          slug={tipo.slug}
          title={`Pictograma da escada ${tipo.nome.toLowerCase()}`}
          className="size-14 shrink-0 self-start text-primary transition-colors group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
