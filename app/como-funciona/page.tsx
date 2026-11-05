import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Figura } from "@/components/technical/Figura";
import { comDestaque } from "@/lib/texto";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { passos } from "@/content/processo";

export const metadata: Metadata = {
  title: "Como funciona: da medição à instalação",
  description:
    "Medição no local, projeto cotado, fabricação e instalação. Veja como uma escada de concreto pré-moldado é feita, etapa por etapa.",
  alternates: { canonical: "/como-funciona" },
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHeader
        title="Da medição à instalação."
        lead="Quatro etapas. Você aprova o desenho cotado antes de qualquer peça ser fabricada — depois do concreto curado, mudança significa peça nova."
      />

      {/* Um passo por bloco, denso. É o conteúdo de maior valor persuasivo
          do site para o público leigo. */}
      {passos.map((passo) => (
        <Section
          key={passo.step}
          density="dense"
          className="border-t border-border"
          aria-labelledby={`passo-${passo.numero}`}
        >
          {/* Texto à esquerda, o desenho da etapa grande à direita — um só
              desenho por etapa em qualquer largura. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="spec text-muted">Passo {passo.numero}</p>
              <h2 id={`passo-${passo.numero}`} className="mt-4">
                {passo.titulo}
              </h2>
              <p className="measure mt-4 text-xl leading-relaxed text-muted">
                {passo.resumo}
              </p>
              <div className="measure mt-8 space-y-4 text-muted">
                {passo.detalhe.map((p, j) => (
                  <p key={j}>{comDestaque(p)}</p>
                ))}
              </div>
            </div>
            <div data-revela className="lg:col-span-5 lg:col-start-8">
              <Figura
                nome={passo.step}
                titulo={`Desenho da etapa: ${passo.titulo}`}
                className="mx-auto w-full max-w-md lg:max-w-none"
              />
            </div>
          </div>
        </Section>
      ))}

      {/* O que está e o que não está incluso — depende da empresa. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader
          split
          title="Quem faz cada parte"
          lead="A Munarim projeta e fabrica a escada. Corrimão, guarda-corpo e revestimento vêm de empresas parceiras, para o conjunto chegar completo."
        />
      </Section>

    </>
  );
}
