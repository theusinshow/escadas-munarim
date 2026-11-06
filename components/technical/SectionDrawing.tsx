import { STAIR } from "@/lib/geometry/stairs";
import { DimensionLine } from "./DimensionLine";

/**
 * Corte cotado — o bloco de autoridade das páginas de tipo.
 *
 * A variante muda com a estrutura real da peça: perfil aberto, massa fechada até
 * o piso, ou espiral em torno do eixo. É o desenho que mostra a
 * diferença entre os tipos para quem não é da área.
 *
 * Os valores são ILUSTRATIVOS até `CNT-009`. A interface diz isso ao lado.
 */

const { RISER: R, TREAD: T } = STAIR;

const VIEW = { width: 340, height: 260 } as const;
const PAD_LEFT = 74;
const PAD_BOTTOM = 62;

type Variant = "aberto" | "solido" | "espiral";

const VARIANT_BY_SLUG: Record<string, Variant> = {
  reta: "aberto",
  leke: "aberto",
  mista: "aberto",
  "espelho-fechado": "solido",
  caracol: "espiral",
};

const cm = (n: number) => `${n} cm`;

export function SectionDrawing({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const variant = VARIANT_BY_SLUG[slug] ?? "aberto";
  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className={className}
      role="img"
      aria-label={
        variant === "espiral"
          ? `Corte cotado de escada ${title.toLowerCase()}: espelho de ${R} centímetros, diâmetro e altura total`
          : `Corte cotado de escada ${title.toLowerCase()}: espelho de ${R} centímetros, piso de ${T} centímetros, vão e pé-direito`
      }
      fill="none"
    >
      {variant === "espiral" ? <Espiral /> : <Reta variant={variant} />}
    </svg>
  );
}

/* --------------------------------------------------------- lance reto ----- */

function Reta({ variant }: { variant: Exclude<Variant, "espiral"> }) {
  const n = 6;
  const baseY = VIEW.height - PAD_BOTTOM;
  const X = (x: number) => PAD_LEFT + x;
  const Y = (y: number) => baseY - y;

  // perfil em escada
  const steps: string[] = [`M${X(0)} ${Y(0)}`];
  for (let i = 0; i < n; i++) {
    steps.push(`L${X(i * T)} ${Y((i + 1) * R)}`);
    steps.push(`L${X((i + 1) * T)} ${Y((i + 1) * R)}`);
  }

  let profile = steps.join("");
  if (variant === "solido") {
    profile += `L${X(n * T)} ${Y(0)}Z`;
  }

  return (
    <>
      {/* piso */}
      <line
        x1={X(-30)}
        y1={Y(0)}
        x2={X(n * T + 30)}
        y2={Y(0)}
        stroke="var(--border)"
        strokeWidth={1}
      />
      <path
        d={profile}
        stroke="var(--primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* espelho — primeiro degrau, cota à esquerda */}
      <DimensionLine
        orientation="vertical"
        from={[X(-40), Y(0)]}
        to={[X(-40), Y(R)]}
        label={cm(R)}
        witnessFrom={[X(0), Y(0)]}
        witnessTo={[X(0), Y(R)]}
      />

      {/* piso — último degrau, cota acima */}
      <DimensionLine
        orientation="horizontal"
        from={[X((n - 1) * T), Y(n * R + 34)]}
        to={[X(n * T), Y(n * R + 34)]}
        label={cm(T)}
        witnessFrom={[X((n - 1) * T), Y(n * R)]}
        witnessTo={[X(n * T), Y(n * R)]}
      />

      {/* vão livre — projeção horizontal do lance */}
      <DimensionLine
        orientation="horizontal"
        from={[X(0), Y(-40)]}
        to={[X(n * T), Y(-40)]}
        label="vão"
        witnessFrom={[X(0), Y(0)]}
        witnessTo={[X(n * T), Y(n * R)]}
      />

      {/* pé-direito — piso a piso */}
      <DimensionLine
        orientation="vertical"
        from={[X(n * T + 46), Y(0)]}
        to={[X(n * T + 46), Y(n * R)]}
        label="pé-direito"
        witnessFrom={[X(n * T), Y(0)]}
        witnessTo={[X(n * T), Y(n * R)]}
      />
    </>
  );
}

/* ------------------------------------------------------------ espiral ----- */

function Espiral() {
  const n = 8; // mesmo número de degraus da axonometria
  const r0 = 10;
  const rOut = 92;
  const baseY = VIEW.height - PAD_BOTTOM;
  const cx = VIEW.width / 2 - 4;
  const X = (x: number) => cx + x;
  const Y = (y: number) => baseY - y;

  const treads = Array.from({ length: n }, (_, i) => {
    const y = Y((i + 1) * R);
    const side = i % 2 === 0 ? 1 : -1;
    return { key: i, x1: X(side * r0), x2: X(side * rOut), y };
  });

  return (
    <>
      <line
        x1={X(-rOut - 30)}
        y1={Y(0)}
        x2={X(rOut + 30)}
        y2={Y(0)}
        stroke="var(--border)"
        strokeWidth={1}
      />

      {/* coluna central */}
      <path
        d={`M${X(-r0)} ${Y(0)}L${X(-r0)} ${Y(n * R)}L${X(r0)} ${Y(n * R)}L${X(r0)} ${Y(0)}`}
        stroke="var(--primary)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />

      {/* envoltória do giro — ancora as cotas e dá o limite do vão */}
      {[-1, 1].map((s) => (
        <line
          key={s}
          x1={X(s * rOut)}
          y1={Y(0)}
          x2={X(s * rOut)}
          y2={Y(n * R)}
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      ))}

      {/* degraus alternando de lado — a leitura convencional do giro em corte */}
      {treads.map((t) => (
        <line
          key={t.key}
          x1={t.x1}
          y1={t.y}
          x2={t.x2}
          y2={t.y}
          stroke="var(--primary)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <DimensionLine
        orientation="vertical"
        from={[X(-rOut - 40), Y(R)]}
        to={[X(-rOut - 40), Y(2 * R)]}
        label={cm(R)}
        witnessFrom={[X(-rOut), Y(R)]}
        witnessTo={[X(-rOut), Y(2 * R)]}
      />

      <DimensionLine
        orientation="horizontal"
        from={[X(-rOut), Y(-40)]}
        to={[X(rOut), Y(-40)]}
        label="Ø do vão"
        witnessFrom={[X(-rOut), Y(0)]}
        witnessTo={[X(rOut), Y(0)]}
      />

      <DimensionLine
        orientation="vertical"
        from={[X(rOut + 46), Y(0)]}
        to={[X(rOut + 46), Y(n * R)]}
        label="pé-direito"
        witnessFrom={[X(rOut), Y(0)]}
        witnessTo={[X(r0), Y(n * R)]}
      />
    </>
  );
}
