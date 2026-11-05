import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { artigos, minutosDeLeitura } from "@/content/artigos";

export const metadata: Metadata = {
  title: "Artigos sobre escadas de concreto",
  description:
    "Como medir o vão e o pé-direito, as medidas do degrau segundo a NBR 9050, pré-moldada ou moldada no local e quanto espaço ocupa cada tipo de escada.",
  alternates: { canonical: "/artigos" },
};

/**
 * Índice dos artigos (DEC-093). Lista editorial, uma linha por artigo: número,
 * título, o que o texto responde e o tempo de leitura. A linha inteira é o
 * link; a seta é o único sinal de hover — foto não entra, porque o assunto é
 * medida e decisão, não imagem.
 */
const dois = (n: number) => String(n).padStart(2, "0");

export default function ArtigosPage() {
  return (
    <>
      <PageHeader
        title="Para quem vai fazer uma escada."
        lead="Medidas, normas e escolhas explicadas para quem nunca comprou uma escada. Cada termo técnico é definido na primeira vez que aparece."
      />

      <Section density="default">
        <ol className="border-t border-border">
          {artigos.map((a, i) => (
            <li key={a.slug} data-revela className="border-b border-border">
              <Link
                href={`/artigos/${a.slug}`}
                className="group grid gap-3 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:py-10"
              >
                <span className="spec text-muted lg:col-span-1">{dois(i + 1)}</span>
                <h2 className="text-[clamp(1.3rem,2.2vw,1.75rem)] leading-tight text-barra lg:col-span-6">
                  {a.titulo}
                </h2>
                <p className="measure text-muted lg:col-span-4">{a.descricao}</p>
                <span className="flex items-center justify-between gap-4 lg:col-span-1 lg:flex-col lg:items-end">
                  <span className="spec text-muted">{minutosDeLeitura(a)} min</span>
                  <span
                    aria-hidden="true"
                    className="text-barra transition-transform duration-300 ease-degrau group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
