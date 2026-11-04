/**
 * Cabeçalho de seção: H2 + lead opcional.
 * Alinhado à esquerda. Centralizado só em bloco de fechamento de página.
 *
 * Sem eyebrow e sem índice "/0n" acima do título (DEC-051): o rótulo em
 * caixa alta sobre o H2 era muleta de layout gerado, e a numeração de seção
 * não informava nada ao leitor. O título carrega a seção sozinho.
 *
 * `split` (DEC-061) é o cabeçalho de seção em largura cheia: título nas
 * colunas 1–6, apoio nas 8–12, alinhados pela base — o padrão da home.
 * Dentro de coluna estreita, fica empilhado.
 */
export function SectionHeader({
  title,
  lead,
  as: As = "h2",
  align = "left",
  className = "",
  id,
  split = false,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  id?: string;
  split?: boolean;
}) {
  if (split && lead) {
    return (
      <header className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <As id={id} className="measure-display lg:col-span-6">
          {title}
        </As>
        <p className="measure text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
          {lead}
        </p>
      </header>
    );
  }
  const centered = align === "center";
  return (
    <header className={`${centered ? "text-center" : ""} ${className}`}>
      <As id={id} className={centered ? "mx-auto measure-display" : "measure-display"}>
        {title}
      </As>
      {lead && (
        <p
          className={`measure mt-5 text-xl leading-relaxed font-light text-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
