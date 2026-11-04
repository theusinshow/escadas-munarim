import Link from "next/link";
import { fotosDo } from "@/content/galeria";
import type { Tipo } from "@/content/tipos";

/**
 * Índice em linhas: densidade sem repetir card (DEC-052).
 *
 * A numeração continua de onde os cards pararam — recomeçar em 01 sugeriria
 * um segundo conjunto.
 */
export function ColecaoIndice({ tipos, inicio = 1 }: { tipos: Tipo[]; inicio?: number }) {
  return (
    <ul className="border-t border-text">
      {tipos.map((tipo, i) => {
        const total = fotosDo(tipo.slug).length;
        return (
          <li key={tipo.slug}>
            <Link
              href={`/escadas/${tipo.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-border py-5 sm:grid-cols-[3rem_14rem_1fr_auto_auto]"
            >
              <span className="spec text-text">{String(inicio + i).padStart(2, "0")}</span>
              <span className="font-display text-xl font-bold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                Escada {tipo.nome.toLowerCase()}
              </span>
              <span className="hidden text-muted sm:block">{tipo.destaque}</span>
              <span className="spec hidden tabular-nums sm:block">
                {total} {total === 1 ? "imagem" : "imagens"}
              </span>
              <span
                aria-hidden="true"
                className="text-muted transition-transform duration-300 ease-degrau group-hover:translate-x-1 group-hover:text-text"
              >
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
