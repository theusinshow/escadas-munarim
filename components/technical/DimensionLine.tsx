/**
 * Bloco de cota — o componente mais característico do sistema (DESIGN_SYSTEM.md).
 *
 * Linha de extensão + seta dupla + valor em DM Mono sobre fundo `--bg`,
 * cortando a linha. O valor é <text> SVG, nunca imagem: precisa ser legível por
 * leitor de tela.
 *
 * Coordenadas em espaço SVG (y cresce para baixo).
 */
export function DimensionLine({
  from,
  to,
  label,
  orientation,
  /** Ponto de onde sai a linha de chamada, quando a cota está deslocada da peça. */
  witnessFrom,
  witnessTo,
}: {
  from: [number, number];
  to: [number, number];
  label: string;
  orientation: "horizontal" | "vertical";
  witnessFrom?: [number, number];
  witnessTo?: [number, number];
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const tick = 4;

  const labelWidth = label.length * 6.2 + 8;
  const labelHeight = 13;

  /* Cota curta (espelho, piso): o rótulo não cabe sobre a linha sem apagá-la.
     Nesses casos ele sai para fora, como em prancha de verdade. */
  const span = orientation === "horizontal" ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
  const short = span < (orientation === "horizontal" ? labelWidth : labelHeight) + 8;
  const lx = mx;
  const ly = short
    ? Math.min(y1, y2) - labelHeight
    : my;

  return (
    <g stroke="var(--primary)" strokeWidth={1} vectorEffect="non-scaling-stroke">
      {witnessFrom && (
        <line
          x1={witnessFrom[0]}
          y1={witnessFrom[1]}
          x2={x1}
          y2={y1}
          strokeWidth={0.75}
          strokeDasharray="3 3"
        />
      )}
      {witnessTo && (
        <line
          x1={witnessTo[0]}
          y1={witnessTo[1]}
          x2={x2}
          y2={y2}
          strokeWidth={0.75}
          strokeDasharray="3 3"
        />
      )}

      <line x1={x1} y1={y1} x2={x2} y2={y2} />

      {/* Setas em 45°, convenção de desenho técnico. */}
      {[
        [x1, y1],
        [x2, y2],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x - tick}
          y1={orientation === "horizontal" ? y - tick : y + tick}
          x2={x + tick}
          y2={orientation === "horizontal" ? y + tick : y - tick}
        />
      ))}

      <rect
        x={lx - labelWidth / 2}
        y={ly - labelHeight / 2}
        width={labelWidth}
        height={labelHeight}
        fill="var(--bg)"
        stroke="none"
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="central"
        stroke="none"
        fill="var(--muted)"
        fontFamily="var(--font-dm-mono), ui-monospace, monospace"
        fontSize={9}
        fontWeight={500}
        letterSpacing="0.02em"
      >
        {label}
      </text>
    </g>
  );
}
