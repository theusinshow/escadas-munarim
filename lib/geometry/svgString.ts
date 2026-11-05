import { AXO_FRAME, flatten, projectDrawing } from "./frame";
import { centerTransform, toPath } from "./iso";
import { drawings } from "./stairs";

/**
 * A mesma geometria, serializada como SVG standalone.
 *
 * Existe para os contextos que não renderizam React — hoje, a imagem de Open
 * Graph. O desenho da rede social sai da mesma função de projeção que o desenho
 * do site: não há uma segunda versão para divergir.
 */
export function axonometriaSvg(
  slug: string,
  { stroke = "#213a58", inox = "#B9C0C7", border = "#D9D6D1", width = 2 } = {},
): string | null {
  const drawing = drawings[slug];
  if (!drawing) return null;

  const p = projectDrawing(drawing);
  const transform = centerTransform(flatten(p), AXO_FRAME);

  const grupo = (polys: (typeof p)["estrutura"], cor: string, w: number) =>
    `<g stroke="${cor}" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round">` +
    polys.map((poly) => `<path d="${toPath(poly)}"/>`).join("") +
    `</g>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${AXO_FRAME.width} ${AXO_FRAME.height}" width="${AXO_FRAME.width}" height="${AXO_FRAME.height}">` +
    `<g transform="${transform}">` +
    grupo(p.contexto, border, width * 0.66) +
    grupo(p.estrutura, stroke, width) +
    grupo(p.degraus, stroke, width) +
    grupo(p.corrimao, inox, width * 0.66) +
    `</g></svg>`
  );
}

export function axonometriaDataUri(
  slug: string,
  opts?: Parameters<typeof axonometriaSvg>[1],
): string | null {
  const svg = axonometriaSvg(slug, opts);
  return svg ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` : null;
}
