import { acervo } from "./galeria.generated";

/**
 * O acervo de fotos, por tipo (DEC-048).
 *
 * A lista vem de `galeria.generated.ts`, que o `npm run media` escreve a partir
 * de `media-src/`. Ninguém digita caminho de foto em componente: quem precisa
 * de imagem pede aqui, e quando a foto real do cliente chegar ela assume a capa
 * sem edição de código.
 */

export type Origem = "cliente" | "stock" | "gerado" | "referencia";

export type FotoAcervo = {
  src: string;
  /** Pixels reais do arquivo — nunca o tamanho que o slot gostaria de ter. */
  largura: number;
  altura: number;
  origem: Origem;
  /** Descreve o que aparece. Nunca afirma obra da Munarim, exceto `cliente`. */
  alt: string;
  /** Miniatura de 12px em base64 — placeholder enquanto o AVIF carrega. */
  blur: string;
};

export function fotosDo(slug: string): FotoAcervo[] {
  return acervo[slug] ?? [];
}

/** A primeira foto do tipo. O pipeline ordena cliente → stock → gerado → ref. */
export function capaDo(slug: string): FotoAcervo | undefined {
  return acervo[slug]?.[0];
}

/**
 * Todas as fotos, intercaladas por tipo (1ª de cada, depois a 2ª de cada…).
 * Numa faixa corrida, o olho compara tipos em vez de ver seis retas seguidas.
 * `inicio: 1` pula a capa, que já apareceu na capa da home e no catálogo.
 */
export function fotosIntercaladas(
  slugs: string[],
  { inicio = 0, porTipo = Infinity }: { inicio?: number; porTipo?: number } = {},
) {
  const listas = slugs.map((slug) =>
    fotosDo(slug)
      .slice(inicio, inicio + porTipo)
      .map((foto) => ({ ...foto, slug })),
  );
  const maior = Math.max(0, ...listas.map((l) => l.length));
  const saida: (FotoAcervo & { slug: string })[] = [];
  for (let i = 0; i < maior; i++) {
    for (const lista of listas) if (lista[i]) saida.push(lista[i]);
  }
  return saida;
}

/** Existe alguma foto sem licença no acervo? Se sim, o site não sobe. */
export const temReferencia = Object.values(acervo).some((fotos) =>
  fotos.some((f) => f.origem === "referencia"),
);


/**
 * Escada vista de cima — o banner do site anterior (1900 × 700px), recortado
 * para tirar o logo antigo que vinha na imagem (DEC-104).
 */
export const FOTO_OBRA: FotoAcervo = {
  src: "/media/empresa/foto-obra-01.avif",
  largura: 1480,
  altura: 700,
  origem: "cliente",
  alt: "Escada de degraus claros em curva, vista de cima, ao lado de uma parede de vidro",
  blur: "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoMAAYAA4BaJZwAAqzVkxcYIAD+1/bgmYCxzCHJX7okfdQbOfQbTO0ubWYgWYjmrHQAAA==",
};

/**
 * A fachada da sede, com as vans da empresa — foto da página "Nossa Empresa"
 * do site anterior. Só existe em 300 × 183px: entra pequena, nunca ampliada.
 */
export const FOTO_FACHADA: FotoAcervo = {
  src: "/media/empresa/foto-fachada-01.avif",
  largura: 300,
  altura: 183,
  origem: "cliente",
  alt: "Fachada da sede da Escadas Munarim, com o letreiro azul da marca e três vans da empresa estacionadas na frente",
  blur: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAQAgCdASoMAAcAA4BaJQBOgMVfyRvbabOAAMr1elyad8Sc8CttCR7M/51FT1b53wHcIMBgxBslriDC9AV8+9Rb8f2vihsSfAAAAA==",
};
