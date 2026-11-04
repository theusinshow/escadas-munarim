import Link from "next/link";
import { TypeCard } from "./TypeCard";
import { tipos } from "@/content/tipos";

/**
 * Grid dos 7 tipos. As linhas são borda de cada célula, não fundo da grade:
 * com fundo cinza, a grade virava um bloco cinza enquanto os cards entram.
 *
 * São 7 numa grade de 4 colunas — sobra uma célula. Em vez de deixar o buraco,
 * a oitava célula é o caminho de quem não sabe escolher, que é justamente o
 * público primário deste site. Ela é navy de propósito: entre sete fotos, é a
 * única peça que não é produto, e não pode ser lida como um oitavo tipo.
 */
export function TypeGrid({ href = "/escadas#nao-sei" }: { href?: string }) {
  return (
    <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
      {tipos.map((tipo, i) => (
        <li key={tipo.slug} className="border-r border-b border-border">
          <TypeCard tipo={tipo} indice={String(i + 1).padStart(2, "0")} />
        </li>
      ))}
      <li className="border-r border-b border-border">
        <Link
          href={href}
          className="group flex h-full min-h-80 flex-col justify-between bg-primary p-6 text-primary-fg hover:bg-[#25394f]"
        >
          <p aria-hidden="true" className="spec text-primary-fg-muted">
            ? / 07
          </p>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
              Não sei qual é o meu caso
            </h3>
            <p className="mt-4 text-sm text-primary-fg-muted">
              Três perguntas resolvem a maior parte das dúvidas antes de falar com
              alguém.
            </p>
            <p className="mt-6 text-sm underline decoration-1 underline-offset-4 group-hover:decoration-2">
              Responder as três perguntas
            </p>
          </div>
        </Link>
      </li>
    </ul>
  );
}
