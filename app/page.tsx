import { CapaTriptico } from "@/components/home/CapaTriptico";
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
import { TypeGrid } from "@/components/ui/TypeGrid";
import { faqRespondido } from "@/content/faq";

/**
 * Home (DEC-032 → DEC-048 → DEC-051 → DEC-052 → DEC-059).
 *
 * DEC-059: oito seções. Capa → posicionamento com os 15 anos → os sete tipos
 * (uma seção só) → pré-moldada → processo → empresa → dúvidas → fechamento.
 * Coleções e acervo saíram da home: repetiam os tipos e as fotos, e vivem em
 * /obras.
 *
 * Sem eyebrow e sem "/0n" sobre os títulos (DEC-051).
 *
 * O que a referência original tinha e este site não pode ter: contador
 * animado, prêmio, índice de satisfação, depoimento assinado e blog. Onde eles
 * estavam, ou entra fato declarado pela empresa, ou entra slot marcado.
 */

/** As seis primeiras respondidas: começam pelas de vocabulário (DEC-002). */
const DUVIDAS_HOME = faqRespondido.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Sem CTA de conversão na capa: autoridade primeiro (DEC-001). */}
      <CapaTriptico />

      <Manifesto />

      {/* Comparação: os 7 recebem tratamento idêntico DE PROPÓSITO. */}
      <section className="border-t border-border py-24 lg:py-36">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2>Os sete tipos</h2>
            <GhostLink href="/escadas">Comparar os sete</GhostLink>
          </div>
          <StepIn className="mt-14 lg:mt-20" selector="li">
            <TypeGrid />
          </StepIn>
        </Container>
      </section>

      <PreMoldada />

      <ProcessoLinha />

      <EmpresaBloco />

      {/* Dúvidas: cabeçalho numa linha (título e link na mesma base) e o
          acordeão logo abaixo, nas mesmas colunas — antes o título sticky e
          a lista começavam em alturas diferentes (DEC-063). Só perguntas com
          resposta validada; as que dependem de número estrutural ficam em
          /duvidas, marcadas. */}
      <Section density="default" className="border-t border-border bg-shade">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="measure-display">As perguntas que abrem toda conversa</h2>
          <GhostLink href="/duvidas">Ver todas as dúvidas</GhostLink>
        </div>
        <div className="mt-12 grid border-t border-text lg:mt-16 lg:grid-cols-2 lg:gap-x-16">
          {[DUVIDAS_HOME.slice(0, 3), DUVIDAS_HOME.slice(3)].map((coluna, c) => (
            <div key={c}>
              {coluna.map((p) => (
                <FAQItem key={p.q} question={p.q}>
                  <p>{p.resposta}</p>
                </FAQItem>
              ))}
            </div>
          ))}
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
