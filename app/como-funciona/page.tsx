import type { Metadata } from "next";
import { Draw } from "@/components/motion/Draw";
import { ProcessIllustration } from "@/components/technical/ProcessIllustration";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { passos } from "@/content/processo";

export const metadata: Metadata = {
  title: "Como funciona: da medição à instalação",
  description:
    "Medição no local, projeto cotado, fabricação e instalação. Veja como uma escada de concreto pré-moldado é feita, etapa por etapa.",
  alternates: { canonical: "/como-funciona" },
};

/** Negrito por **texto** — a copy precisa destacar o termo técnico no meio da frase. */
function comDestaque(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") ? (
      <strong key={i} className="font-semibold text-text">
        {parte.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{parte}</span>
    ),
  );
}

export default function ComoFuncionaPage() {
  return (
    <>
      <Section density="default">
        <SectionHeader
          as="h1"
          title="Da medição à instalação."
          lead="Quatro etapas. Você aprova o desenho cotado antes de qualquer peça ser fabricada — depois do concreto curado, mudança significa peça nova."
        />
      </Section>

      {/* Um passo por bloco, denso. É o conteúdo de maior valor persuasivo
          do site para o público leigo. */}
      {passos.map((passo) => (
        <Section
          key={passo.step}
          density="dense"
          className="border-t border-border"
          aria-labelledby={`passo-${passo.numero}`}
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="spec text-muted">Passo {passo.numero}</p>
              <Draw className="mt-6 hidden lg:block">
                <ProcessIllustration step={passo.step} className="h-40 w-full" />
              </Draw>
            </div>

            <div className="lg:col-span-9">
              <h2
                id={`passo-${passo.numero}`}
              >
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
              {passo.pendente && (
                <p className="spec mt-8 border-l-2 border-accent pl-4 text-muted">
                  {passo.pendente}
                </p>
              )}
              <ProcessIllustration
                step={passo.step}
                className="mt-10 h-32 w-full lg:hidden"
              />
            </div>
          </div>
        </Section>
      ))}

      {/* O que está e o que não está incluso — depende da empresa. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader
          title="O que está incluso"
          lead="A Munarim fabrica a escada. Para entregar o conjunto completo — projeto, escada, revestimento e corrimão — trabalha em parceria com outras empresas."
        />
        <p className="spec mt-8 border-l-2 border-accent pl-4 text-muted">
          DETALHAMENTO DO ESCOPO E PRAZO POR ETAPA — AGUARDANDO A EMPRESA (CNT-005,
          CNT-014)
        </p>
      </Section>

      <Section density="airy" className="bg-primary text-primary-fg">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="measure-display">
              Já sabe as medidas do seu vão?
            </h2>
            <p className="measure mt-5 text-lg opacity-90">
              Se ainda não sabe, tudo bem — a medição é o primeiro passo e é por nossa
              conta explicar o que medir.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ButtonLink href="/orcamento">Pedir orçamento</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
