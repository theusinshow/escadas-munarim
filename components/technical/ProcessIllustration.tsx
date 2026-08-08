/**
 * Os 4 passos do processo, na mesma linguagem de traço dos desenhos técnicos.
 *
 * Existem porque o público é leigo (DEC-002): quem nunca viu uma escada ser
 * fabricada e instalada não consegue avaliar se a empresa é séria.
 */

const STEPS = {
  medicao: {
    label: "Medição no local",
    alt: "Desenho de um vão de escada sendo medido, com cota de pé-direito entre o piso e a laje",
  },
  projeto: {
    label: "Projeto e cotas",
    alt: "Desenho de uma prancha de projeto com o corte da escada e suas cotas",
  },
  fabricacao: {
    label: "Fabricação",
    alt: "Desenho de uma fôrma de pré-moldagem com a peça de concreto dentro",
  },
  instalacao: {
    label: "Instalação",
    alt: "Desenho de um lance de escada sendo posicionado no vão por cabo de içamento",
  },
} as const;

export type ProcessStep = keyof typeof STEPS;

export function ProcessIllustration({
  step,
  className,
}: {
  step: ProcessStep;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={STEPS[step].alt}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g stroke="var(--primary)" strokeWidth={1.5} vectorEffect="non-scaling-stroke">
        {step === "medicao" && <Medicao />}
        {step === "projeto" && <Projeto />}
        {step === "fabricacao" && <Fabricacao />}
        {step === "instalacao" && <Instalacao />}
      </g>
    </svg>
  );
}

/** Perfil em escada reaproveitado nos quatro passos — mesma razão 18/28. */
function stepPath(x: number, y: number, n: number, t: number, r: number) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < n; i++) {
    d += `L${x + i * t} ${y - (i + 1) * r}`;
    d += `L${x + (i + 1) * t} ${y - (i + 1) * r}`;
  }
  return d;
}

function Medicao() {
  return (
    <>
      {/* laje superior e piso */}
      <path d="M20 44h160" />
      <path d="M20 168h160" />
      {/* escada pretendida — ainda hipótese, por isso tracejada */}
      <path
        d={stepPath(40, 168, 5, 24, 18)}
        stroke="var(--inox)"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      {/* cota de pé-direito, entre os dois pisos */}
      <path d="M172 50v112" />
      <path d="M168 54l4-4 4 4M168 158l4 4 4-4" />
    </>
  );
}

function Projeto() {
  return (
    <>
      {/* prancha */}
      <path d="M30 34h140v132H30z" />
      {/* corte desenhado nela */}
      <path d={stepPath(52, 138, 5, 18, 13)} />
      {/* cota */}
      <path d="M46 138v-13" stroke="var(--primary)" strokeWidth={1} />
      <path d="M43 129l3-4 3 4M43 134l3 4 3-4" strokeWidth={1} />
      {/* legenda da prancha */}
      <path d="M112 150h44M112 158h30" stroke="var(--inox)" strokeWidth={1} />
    </>
  );
}

function Fabricacao() {
  return (
    <>
      {/* fôrma */}
      <path d="M28 62v98h144V62" />
      <path d="M20 160h160" />
      {/* peça pré-moldada dentro da fôrma */}
      <path d={`${stepPath(46, 148, 5, 20, 15)}L146 148Z`} />
      {/* nível de concretagem */}
      <path d="M28 74h144" stroke="var(--inox)" strokeWidth={1} strokeDasharray="4 4" />
    </>
  );
}

function Instalacao() {
  return (
    <>
      {/* cabo e gancho */}
      <path d="M100 16v26" />
      <path d="M92 42h16l-8 10z" />
      {/* cintas */}
      <path d="M100 52L66 96M100 52l34 44" stroke="var(--inox)" strokeWidth={1} />
      {/* lance sendo posicionado */}
      <path d={`${stepPath(58, 148, 5, 20, 15)}L158 148Z`} />
      {/* piso */}
      <path d="M20 168h160" />
    </>
  );
}

export const PROCESS_STEPS = STEPS;
