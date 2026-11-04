import Image from "next/image";
import type { FotoAcervo } from "@/content/galeria";

/**
 * Toda fotografia do site passa por aqui.
 *
 * O componente carrega as regras de `MEDIA_PLAN.md` e `DEC-008` no código, não
 * no comentário:
 *
 * - A foto vem do acervo (`content/galeria.ts`), com `alt` e pixels reais.
 * - O prefixo do arquivo tem que bater com a origem declarada — `foto-`,
 *   `stock-`, `gen-`, `ref-`. É a auditoria por `ls` que `BANCO_DE_IMAGENS.md`
 *   pede, verificada no build em vez de na leitura.
 * - Só `cliente` aceita legenda factual. Nas outras o build quebra.
 * - Sem selo sobre a foto (DEC-049). Quem diz que a imagem não é obra da
 *   Munarim são os avisos de seção ligados a `temReferencia`.
 *
 * `fill` preenche o pai (que precisa ter tamanho); sem `fill`, a foto tem a
 * proporção do arquivo.
 */

type Props = {
  foto: FotoAcervo;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  /** Só foto de obra do cliente pode ter legenda factual. */
  legenda?: string;
  className?: string;
  imgClassName?: string;
};

const PREFIXO = {
  cliente: "foto-",
  stock: "stock-",
  gerado: "gen-",
  referencia: "ref-",
} as const;

export function Foto({
  foto,
  sizes,
  priority,
  fill,
  legenda,
  className = "",
  imgClassName = "",
}: Props) {
  const exigido = PREFIXO[foto.origem];
  if (!foto.src.split("/").pop()?.startsWith(exigido)) {
    throw new Error(
      `Origem "${foto.origem}" exige o prefixo "${exigido}" no arquivo: ${foto.src} (MEDIA_PLAN.md)`,
    );
  }
  if (legenda && foto.origem !== "cliente") {
    throw new Error(`Legenda factual só em foto de cliente (DEC-008): ${foto.src}`);
  }

  const imagem = fill ? (
    <Image
      src={foto.src}
      alt={foto.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={foto.blur}
      className={`object-cover ${imgClassName}`}
    />
  ) : (
    <Image
      src={foto.src}
      alt={foto.alt}
      width={foto.largura}
      height={foto.altura}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={foto.blur}
      className={`h-auto w-full ${imgClassName}`}
    />
  );

  return (
    <figure className={`${fill ? "absolute inset-0" : "relative"} ${className}`}>
      {imagem}
      {legenda && <figcaption className="spec mt-3 text-muted">{legenda}</figcaption>}
    </figure>
  );
}

