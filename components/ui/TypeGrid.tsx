import Link from "next/link";
import { TypeCard } from "./TypeCard";
import { tipos } from "@/content/tipos";

/**
 * Grid dos 7 tipos.
 *
 * São 7 numa grade de 4 colunas — sobra uma célula. Em vez de deixar o buraco
 * cinza, a oitava célula é o caminho de quem não sabe escolher, que é
 * justamente o público primário deste site.
 */
export function TypeGrid({ href = "/escadas" }: { href?: string }) {
  return (
    <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {tipos.map((tipo, i) => (
        <li key={tipo.slug}>
          <TypeCard tipo={tipo} indice={String(i + 1).padStart(2, "0")} />
        </li>
      ))}
      <li>
        <Link
          href={href}
          className="flex h-full flex-col justify-end bg-surface p-6 hover:bg-shade"
        >
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            Não sei qual é o meu caso
          </h3>
          <p className="mt-4 text-sm text-muted">
            Três perguntas resolvem a maior parte das dúvidas antes de falar com alguém.
          </p>
        </Link>
      </li>
    </ul>
  );
}
