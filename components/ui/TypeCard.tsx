import Link from "next/link";
import { Axonometry } from "@/components/technical/Axonometry";
import type { Tipo } from "@/content/tipos";

/**
 * Card de tipo de escada.
 *
 * Sem borda e sem sombra — o fundo `--surface` sobre `--bg` já separa.
 * O card inteiro é o link, então não leva chamada de ação repetida no rodapé:
 * seta em card já clicável é textura, não affordance (U15).
 */
export function TypeCard({ tipo, indice }: { tipo: Tipo; indice?: string }) {
  return (
    <Link
      href={`/escadas/${tipo.slug}`}
      className="group flex h-full flex-col bg-surface p-6 hover:bg-shade"
    >
      {/* O índice é referência de catálogo, não ranking: numera a folha, como
          numeração de prancha. `aria-hidden` porque a ordem já está na lista. */}
      {indice && (
        <p aria-hidden="true" className="spec mb-4 text-muted">
          {indice} / 07
        </p>
      )}
      {/* Mesma escala, mesmo ângulo e mesmo peso de traço nos 7 —
          é o que transforma o grid em ferramenta de comparação. */}
      <Axonometry slug={tipo.slug} title={tipo.nome} className="aspect-square w-full" />
      <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
        {tipo.nome}
      </h3>
      <p className="spec mt-2 text-muted">{tipo.destaque}</p>
      <p className="mt-4 text-sm text-muted">{tipo.resumo}</p>
    </Link>
  );
}
