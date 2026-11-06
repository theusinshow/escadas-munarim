import Link from "next/link";
import { TypeCard } from "./TypeCard";
import { perguntasQueDefinem } from "@/content/escolha";
import { tipos } from "@/content/tipos";

/**
 * Grid dos 5 tipos. As linhas são borda de cada célula, não fundo da grade:
 * com fundo cinza, a grade virava um bloco cinza enquanto os cards entram.
 *
 * São 5 numa grade de 3 colunas (2 até o xl) — sobra uma célula. Ela é o caminho de quem
 * não sabe escolher, que é justamente o público primário deste site. Navy de
 * propósito: entre as fotos, é a única peça que não é produto. Em vez de
 * prometer "três perguntas", ela já mostra as três (DEC-063).
 */
export function TypeGrid({
  href = "/escadas#nao-sei",
  detalhe = false,
}: {
  href?: string;
  detalhe?: boolean;
}) {
  return (
    <ul className="grid border-t border-l border-border sm:grid-cols-2 xl:grid-cols-3">
      {tipos.map((tipo) => (
        <li key={tipo.slug} className="border-r border-b border-border">
          <TypeCard tipo={tipo} detalhe={detalhe} />
        </li>
      ))}
      <li className="border-r border-b border-border">
        <Link
          href={href}
          className="group flex h-full min-h-96 flex-col bg-barra p-6 text-primary-fg lg:p-7"
        >
          <h3 className="text-[1.35rem] leading-tight">Não sei qual é o meu caso</h3>
          <p className="mt-2 text-sm text-primary-fg-muted">
            Três perguntas resolvem a maior parte das dúvidas.
          </p>
          <ol className="mt-8 border-t border-primary-fg/20">
            {perguntasQueDefinem.map((p, i) => (
              <li
                key={p.q}
                className="flex gap-4 border-b border-primary-fg/20 py-3.5 text-[0.95rem]"
              >
                <span aria-hidden="true" className="font-display text-xs leading-6 text-primary-fg-muted">
                  {i + 1}
                </span>
                {p.q}
              </li>
            ))}
          </ol>
          <span className="mt-auto flex items-center justify-between pt-8 font-label text-[0.72rem] tracking-[0.14em] uppercase">
            Responder
            <svg
              width="28"
              height="12"
              viewBox="0 0 28 12"
              aria-hidden="true"
              className="transition-transform duration-500 ease-degrau group-hover:translate-x-1.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M0 6h26M21 1l5 5-5 5" />
            </svg>
          </span>
        </Link>
      </li>
    </ul>
  );
}
