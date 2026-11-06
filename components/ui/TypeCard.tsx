import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { Figura } from "@/components/technical/Figura";
import { capaDo } from "@/content/galeria";
import type { Tipo } from "@/content/tipos";

/**
 * Card de tipo de escada (DEC-048 · DEC-051 → DEC-063).
 *
 * A foto vertical vende, o pictograma explica. Embaixo dela, só o que separa
 * um tipo do outro: o nome, a diferença em três palavras e o pictograma em
 * oblíqua, no mesmo quadro em todos. Sem numeração de prancha — "01 / 05" não
 * informava nada (DEC-063).
 *
 * `detalhe` acrescenta o resumo de uma linha: vale em `/escadas`, onde o grid
 * é a ferramenta de comparação; na home o card fica limpo.
 *
 * `compacto` é para grade apertada ("Outros tipos"): menos padding, e o
 * pictograma só entra quando há largura para ele ao lado do nome.
 *
 * Sem foto no acervo, a axonometria assume o lugar dela — nunca caixa cinza
 * (`MEDIA_PLAN.md`). O card inteiro é o link (U15).
 */
export function TypeCard({
  tipo,
  detalhe = false,
  compacto = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  tipo: Tipo;
  detalhe?: boolean;
  compacto?: boolean;
  sizes?: string;
}) {
  const foto = capaDo(tipo.slug);
  /* Resumo ainda pendente traz "[CNT-… — …]" no texto: sai da frase e vira
     selo — slot marcado, nunca placeholder verossímil. */
  const [, texto = tipo.resumo, pendencia] =
    tipo.resumo.match(/^(.*?)\s*\[(CNT-\d+[^\]]*)\]\s*$/) ?? [];

  return (
    <Link href={`/escadas/${tipo.slug}`} className="group flex h-full flex-col bg-surface">
      <div className="relative aspect-[3/4] overflow-hidden bg-shade">
        {foto ? (
          <Foto
            foto={foto}
            fill
            sizes={sizes}
            imgClassName="transition-[filter] duration-500 ease-degrau group-hover:brightness-[0.9] motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 flex items-center p-6">
            <Figura nome={tipo.slug} titulo={tipo.nome} className="w-full" />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col border-t border-border ${compacto ? "p-4 sm:p-6" : "p-6 lg:p-7"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className={`leading-tight ${compacto ? "text-[1.1rem] sm:text-[1.35rem]" : "text-[1.35rem]"}`}>
              {tipo.nome}
            </h3>
            <p className="mt-2 text-sm text-muted">{tipo.destaque}</p>
          </div>
          <Figura
            nome={tipo.slug}
            titulo={`Desenho da escada ${tipo.nome.toLowerCase()}`}
            className={`w-24 shrink-0 ${compacto ? "hidden xl:block" : ""}`}
          />
        </div>
        {detalhe && (
          <>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{texto}</p>
            {pendencia && (
              <p className="spec mt-3 border-l border-accent pl-3 text-[0.68rem] text-muted">
                {pendencia}
              </p>
            )}
          </>
        )}
        {/* O fio que se estende no hover: o card é um link, e ele diz para onde. */}
        <span aria-hidden="true" className="mt-auto block pt-6">
          <span className="block h-px w-full origin-left scale-x-[0.12] bg-text transition-transform duration-500 ease-degrau group-hover:scale-x-100 motion-reduce:transition-none" />
        </span>
      </div>
    </Link>
  );
}
