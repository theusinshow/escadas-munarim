/**
 * Cabeçalho de seção: índice + eyebrow + H2 + lead opcional.
 * Alinhado à esquerda. Centralizado só em bloco de fechamento de página.
 *
 * O `indice` numera a seção na página, em DM Mono, como capítulo de manual —
 * é o que dá à home a leitura de sumário em vez de pilha de blocos soltos.
 * Ele é decorativo para leitor de tela (`aria-hidden`): a ordem já está no DOM.
 */
export function SectionHeader({
  indice,
  eyebrow,
  title,
  lead,
  as: As = "h2",
  align = "left",
  className = "",
}: {
  indice?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <header className={`${centered ? "text-center" : ""} ${className}`}>
      {(indice || eyebrow) && (
        <p
          className={`flex items-baseline gap-3 ${centered ? "justify-center" : ""}`}
        >
          {indice && (
            <span aria-hidden="true" className="spec text-accent">
              /{indice}
            </span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </p>
      )}
      <As className={`mt-3 ${centered ? "mx-auto measure-display" : "measure-display"}`}>
        {title}
      </As>
      {lead && (
        <p
          className={`measure mt-5 text-xl leading-relaxed text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
