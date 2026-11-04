/**
 * Cabeçalho de seção: H2 + lead opcional.
 * Alinhado à esquerda. Centralizado só em bloco de fechamento de página.
 *
 * Sem eyebrow e sem índice "/0n" acima do título (DEC-051): o rótulo em
 * caixa alta sobre o H2 era muleta de layout gerado, e a numeração de seção
 * não informava nada ao leitor. O título carrega a seção sozinho.
 */
export function SectionHeader({
  title,
  lead,
  as: As = "h2",
  align = "left",
  className = "",
  id,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  const centered = align === "center";
  return (
    <header className={`${centered ? "text-center" : ""} ${className}`}>
      <As id={id} className={centered ? "mx-auto measure-display" : "measure-display"}>
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
