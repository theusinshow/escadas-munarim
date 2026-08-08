import { AXO_FRAME, flatten, projectDrawing } from "@/lib/geometry/frame";
import { centerTransform, toPath } from "@/lib/geometry/iso";
import { drawings } from "@/lib/geometry/stairs";

/**
 * Axonometria de um tipo de escada.
 *
 * SVG inline, nunca <img>: os paths precisam ser nomeados para o
 * `stroke-dashoffset` da fase 06 e legíveis por leitor de tela.
 *
 * O HTML já sai com o desenho completo. A fase de motion aplica o estado
 * inicial por JS — assim o desenho continua visível se o JS falhar.
 */
export function Axonometry({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const drawing = drawings[slug];
  if (!drawing) return null;

  const p = projectDrawing(drawing);
  const transform = centerTransform(flatten(p), AXO_FRAME);

  const group = (
    id: string,
    polys: (typeof p)["estrutura"],
    stroke: string,
    width: number,
  ) => (
    <g id={id} stroke={stroke} strokeWidth={width}>
      {polys.map((poly, i) => (
        <path key={i} d={toPath(poly)} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${AXO_FRAME.width} ${AXO_FRAME.height}`}
      className={className}
      role="img"
      aria-label={`Desenho técnico em perspectiva de escada ${title.toLowerCase()} de concreto`}
      fill="none"
    >
      <g transform={transform} strokeLinejoin="round" strokeLinecap="round">
        {group("contexto", p.contexto, "var(--border)", 1)}
        {group("estrutura", p.estrutura, "var(--primary)", 1.5)}
        {group("degraus", p.degraus, "var(--primary)", 1.5)}
        {group("corrimao", p.corrimao, "var(--inox)", 1)}
      </g>
    </svg>
  );
}
