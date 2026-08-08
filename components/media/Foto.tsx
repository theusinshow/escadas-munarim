import Image from "next/image";

/**
 * Toda fotografia do site passa por aqui.
 *
 * O componente carrega as regras de `MEDIA_PLAN.md` e `DEC-008` no tipo, não
 * no comentário:
 *
 * - `alt` é obrigatório e descreve o que aparece na imagem.
 * - `origem` é obrigatória. Só `cliente` aceita `legenda` — nenhum asset gerado
 *   ou de referência pode carregar nome de cliente, endereço, data, metragem ou
 *   métrica. Quem tentar escrever isso não compila.
 * - O prefixo do arquivo tem que bater com a origem declarada: `gen-` para
 *   gerado, `ref-` para referência. É a auditoria por `ls` que
 *   `BANCO_DE_IMAGENS.md` pede, verificada no build em vez de na leitura.
 */

type Base = {
  src: string;
  /** Descreve o que está na imagem. Nunca "imagem" ou "foto". */
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

type FotoReal = Base & {
  origem: "cliente";
  /** Só material real pode ter legenda factual. */
  legenda?: string;
};

type FotoGerada = Base & {
  origem: "gerado";
  /** Proibido em asset gerado — ver DEC-008. O tipo impede. */
  legenda?: never;
};

/**
 * Imagem já selecionada, mas **sem licença** — o `ref-` de
 * `BANCO_DE_IMAGENS.md`. Existe para a página ficar de pé antes de o acervo do
 * cliente chegar. Mesma proibição de legenda do asset gerado, e pelo mesmo
 * motivo: não é obra da Munarim.
 */
type FotoReferencia = Base & {
  origem: "referencia";
  legenda?: never;
};

export type FotoProps = FotoReal | FotoGerada | FotoReferencia;

/** A origem declarada tem que aparecer no nome do arquivo. */
const PREFIXO = { gerado: "gen-", referencia: "ref-" } as const;

export function Foto(props: FotoProps) {
  const { src, alt, width, height, priority, sizes, className, origem } = props;

  const exigido = origem === "cliente" ? null : PREFIXO[origem];
  if (exigido && !src.split("/").pop()?.startsWith(exigido)) {
    throw new Error(
      `Origem "${origem}" exige o prefixo "${exigido}" no nome do arquivo: ${src} (MEDIA_PLAN.md)`,
    );
  }

  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className="h-auto w-full"
      />
      {props.origem === "cliente" && props.legenda && (
        <figcaption className="spec mt-3 text-muted">{props.legenda}</figcaption>
      )}
    </figure>
  );
}
