import { StepIn } from "@/components/motion/StepIn";
import { passos } from "@/content/processo";
import { tipos } from "@/content/tipos";
import { site } from "@/lib/site";

/**
 * Os três números da empresa sob um fio (DEC-060 · DEC-061).
 *
 * Todos vêm do conteúdo: os 15 anos (`DEC-004`), a contagem real de tipos e
 * de etapas. Nada de métrica nova nem contador animado — entram em degrau.
 */
const FATOS = [
  { valor: String(site.yearsInMarket), rotulo: "anos fabricando escada de concreto" },
  { valor: String(tipos.length).padStart(2, "0"), rotulo: "tipos de escada, da reta ao in loco" },
  { valor: String(passos.length).padStart(2, "0"), rotulo: "etapas, da medição à instalação" },
];

export function FaixaFatos({ className = "" }: { className?: string }) {
  return (
    <StepIn selector="dl > div" className={className}>
      <dl className="grid grid-cols-3 border-t border-text">
        {FATOS.map((f) => (
          <div key={f.rotulo} className="flex flex-col-reverse justify-end pt-6 pr-4">
            <dt className="mt-3 text-sm leading-snug text-muted">{f.rotulo}</dt>
            <dd className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none">
              {f.valor}
            </dd>
          </div>
        ))}
      </dl>
    </StepIn>
  );
}
