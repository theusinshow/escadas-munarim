import { STAIR } from "@/lib/geometry/stairs";

/**
 * Manifesto — uma frase, logo depois da capa (DEC-052).
 *
 * Posição e forma vêm da estrutura de referência: um parágrafo grande, sem
 * título, ancorado por uma marca em degraus. A marca não é ornamento genérico:
 * são três degraus na razão real espelho 18 / piso 28 (DEC-010).
 *
 * Só fato declarado: concreto, sob medida, moldada e polida antes de chegar
 * (o que `PreMoldada` já explica em detalhe).
 */

const { RISER: R, TREAD: T } = STAIR;
const N = 3;
const PERFIL = Array.from({ length: N }, (_, i) => `V${(N - i - 1) * R}H${(i + 1) * T}`).join("");

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="border-b border-border bg-bg py-24 lg:py-32">
      <div className="container-site grid gap-8 lg:grid-cols-12">
        <svg
          viewBox={`-1 -1 ${N * T + 2} ${N * R + 2}`}
          aria-hidden="true"
          className="w-20 text-accent lg:col-span-2 lg:w-24 lg:pt-3"
          fill="none"
        >
          <path d={`M0 ${N * R}${PERFIL}`} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.15] font-semibold tracking-[-0.02em] lg:col-span-9">
          A escada é a peça da casa que todo mundo usa, todo dia.{" "}
          <span className="text-muted">
            Por isso ela é medida no seu vão, moldada em concreto e polida antes de
            chegar.
          </span>
        </p>
      </div>
    </section>
  );
}
