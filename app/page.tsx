import { Acervo } from "@/components/home/Acervo";
import { CapaGaleria } from "@/components/home/CapaGaleria";
import { ColecoesDestaque } from "@/components/home/ColecoesDestaque";
import { EmpresaBloco } from "@/components/home/EmpresaBloco";
import { Fechamento } from "@/components/home/Fechamento";
import { Manifesto } from "@/components/home/Manifesto";
import { PreMoldada } from "@/components/home/PreMoldada";
import { ProcessoLinha } from "@/components/home/ProcessoLinha";
import { StepIn } from "@/components/motion/StepIn";
import { GhostLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQItem } from "@/components/ui/FAQItem";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeGrid } from "@/components/ui/TypeGrid";
import { faqRespondido } from "@/content/faq";

/**
 * Home (DEC-032 → DEC-048 → DEC-051 → DEC-052).
 *
 * Galeria antes de conversão (DEC-052), na estrutura do site de referência do
 * desenvolvedor: capa com fotos em rotação → manifesto → coleções em degrau →
 * catálogo → o que é pré-moldada → processo → acervo → empresa → dúvidas →
 * fechamento. Sem eyebrow e sem "/0n" sobre os títulos (DEC-051).
 *
 * O que a referência original tinha e este site não pode ter: contador
 * animado, prêmio, índice de satisfação, depoimento assinado e blog. Onde eles
 * estavam, ou entra fato declarado pela empresa, ou entra slot marcado.
 */

/** As cinco primeiras respondidas são justamente as de vocabulário (DEC-002). */
const DUVIDAS_HOME = faqRespondido.slice(0, 5);

export default function Home() {
  return (
    <>
      {/* Sem CTA de conversão na capa: autoridade primeiro (DEC-001). */}
      <CapaGaleria />

      <Manifesto />

      <ColecoesDestaque />

      {/* Comparação: os 7 recebem tratamento idêntico DE PROPÓSITO. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader
          title="Sete tipos. Um deles resolve o seu vão."
          lead="O que decide não é o gosto: é o espaço que você tem, o pé-direito da casa e quantas vezes por dia a escada vai ser usada."
        />
        <StepIn className="mt-12" selector="li">
          <TypeGrid />
        </StepIn>
      </Section>

      <PreMoldada />

      <ProcessoLinha />

      <Acervo />

      <EmpresaBloco />

      {/* Dúvidas em duas colunas: título fixo à esquerda, acordeão à direita.
          Só perguntas com resposta validada; as que dependem de número
          estrutural ficam em /duvidas, marcadas. */}
      <Section density="dense" className="border-t border-border bg-shade">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--barra-h)+2rem)]">
              <SectionHeader title="As perguntas que abrem toda conversa" />
              <p className="mt-8">
                <GhostLink href="/duvidas">Ver todas as dúvidas</GhostLink>
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {DUVIDAS_HOME.map((p) => (
                <FAQItem key={p.q} question={p.q}>
                  <p>{p.resposta}</p>
                </FAQItem>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* O primeiro e único pedido de orçamento da home, depois da prova. */}
      <Fechamento />

      <Container>
        <div className="border-t border-border py-8">
          <p className="spec text-muted">
            PENDÊNCIAS DE CONTEÚDO NESTA PÁGINA: CNT-002 (ANO DE FUNDAÇÃO) · CNT-003
            (FOTOS DE OBRA — AS ATUAIS SÃO REFERÊNCIA) · CNT-014 (QUEM INSTALA)
          </p>
        </div>
      </Container>
    </>
  );
}
