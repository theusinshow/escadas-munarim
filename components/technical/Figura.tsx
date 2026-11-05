import { FIGURA_VIEWBOX, FIGURAS } from "./figuras.generated";

/**
 * Figura técnica sólida (DEC-070): um dos sete tipos ou uma das quatro etapas
 * do processo, gerada por `scripts/figuras/build.mjs` no método Anatomy.
 * Os tons vêm de `.figura` no CSS; `tema="escuro"` é para fundo grafite.
 */
export function Figura({
  nome,
  titulo,
  tema = "claro",
  className = "",
}: {
  nome: string;
  titulo: string;
  tema?: "claro" | "escuro";
  className?: string;
}) {
  const svg = FIGURAS[nome];
  if (!svg) return null;
  return (
    <svg
      viewBox={FIGURA_VIEWBOX}
      role="img"
      aria-label={titulo}
      data-tema={tema}
      className={`figura ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
