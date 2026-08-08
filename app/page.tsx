import { FaixaFatos } from "@/components/home/FaixaFatos";
import { HeroCapa } from "@/components/home/HeroCapa";
import { ObrasSlots } from "@/components/home/ObrasSlots";
import { ProcessoTimeline } from "@/components/home/ProcessoTimeline";
import { StepIn } from "@/components/motion/StepIn";
import { ButtonLink, GhostLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQItem } from "@/components/ui/FAQItem";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeGrid } from "@/components/ui/TypeGrid";
import { faqRespondido } from "@/content/faq";
import { site } from "@/lib/site";

/**
 * Home.
 *
 * A arquitetura de seções segue a referência aprovada pelo desenvolvedor
 * (`DEC-032`): capa cheia → faixa de números → catálogo numerado → declaração
 * de posição → obra → processo em timeline → empresa → dúvidas → fechamento.
 * Cada seção carrega o índice `/0n` em DM Mono, e a home passa a ler como
 * sumário de manual em vez de pilha de blocos.
 *
 * O que a referência tem e este site não pode ter: contador animado, prêmio,
 * índice de satisfação, depoimento assinado e blog. Os três primeiros são
 * número sem fonte, o quarto é prova social fabricada e o quinto não existe.
 * Onde eles estavam, ou entra fato declarado pela empresa, ou entra slot
 * marcado.
 */

/** As cinco primeiras respondidas são justamente as de vocabulário (DEC-002). */
const DUVIDAS_HOME = faqRespondido.slice(0, 5);

export default function Home() {
  return (
    <>
      {/* Capa — navy de borda a borda, a escada aparecendo sob o cursor.
          Sem CTA de conversão: autoridade primeiro, pedido depois da prova
          (DEC-001). A frase descritiva é o H1; o nome é lockup de marca. */}
      <HeroCapa />

      {/* A faixa continua o navy da capa: as duas leem como uma peça só, e a
          primeira quebra de fundo da página acontece no catálogo. */}
      <FaixaFatos />

      {/* /01 — Comparação: os 7 recebem tratamento idêntico DE PROPÓSITO. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader
          indice="01"
          eyebrow="Nossas escadas"
          title="Sete tipos. Um deles resolve o seu vão."
          lead="O que decide não é o gosto: é o espaço que você tem, o pé-direito da casa e quantas vezes por dia a escada vai ser usada."
        />
        <StepIn className="mt-12" selector="li">
          <TypeGrid />
        </StepIn>
      </Section>

      {/* /02 — Declaração de posição. Na referência este bloco é centralizado;
          aqui ele mantém a régua 7/5, que é a assinatura de layout do projeto.
          O bloco educativo é denso de propósito: é o que nenhum concorrente da
          região tem. */}
      <Section density="dense" className="border-t border-border bg-shade">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              indice="02"
              eyebrow="Antes de comparar preço"
              title="O que é uma escada pré-moldada"
            />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p className="text-xl leading-relaxed text-text">
              Moldada antes: a escada é concretada em fôrma, curada e polida fora
              da obra, e chega pronta na sua casa.
            </p>
            <p>
              A alternativa é a escada concretada no próprio local, que exige
              fôrma, escoramento e tempo de cura dentro da obra. Na prática, a
              diferença aparece em três coisas: o tempo que a obra fica parada, a
              sujeira dentro de casa e o acabamento — o concreto polido sai da
              fôrma, não de reboco.
            </p>
            <p>
              Três palavras aparecem em todo orçamento de escada, e vale saber o
              que significam.{" "}
              <strong className="font-semibold text-text">Vão</strong> é a
              abertura na laje por onde a escada passa.{" "}
              <strong className="font-semibold text-text">Pé-direito</strong> é a
              altura do piso de baixo até o piso de cima — é ele que define
              quantos degraus a escada vai ter.{" "}
              <strong className="font-semibold text-text">Espelho e piso</strong>{" "}
              são a altura e a profundidade de cada degrau, e a relação entre os
              dois é o que faz a subida ser confortável ou cansativa.
            </p>
            <p>
              <GhostLink href="/duvidas">Ver as dúvidas mais comuns</GhostLink>
            </p>
          </div>
        </div>
      </Section>

      {/* /03 — Obras. Grid de três, na forma da referência; conteúdo nenhum,
          porque não existe acervo. Slot marcado, nunca foto fingindo obra. */}
      <Section density="default" className="border-t border-border">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              indice="03"
              eyebrow="Obras"
              title="Escadas instaladas"
            />
          </div>
          <p className="spec border-l-2 border-accent pl-4 text-muted lg:col-span-5">
            GALERIA AGUARDANDO ACERVO FOTOGRÁFICO DO CLIENTE (CNT-003)
          </p>
        </div>
        <div className="mt-12">
          <ObrasSlots />
        </div>
      </Section>

      {/* /04 — Processo em timeline vertical: processo é sequência, e sequência
          lê de cima para baixo. Ataca a objeção de confiança. */}
      <Section density="dense" className="border-t border-border">
        <SectionHeader
          indice="04"
          eyebrow="Como funciona"
          title="Da medição à instalação"
          lead="Quatro etapas. Você aprova o desenho cotado antes de qualquer peça ser fabricada."
        />
        <StepIn className="mt-12" selector="li">
          <ProcessoTimeline />
        </StepIn>
        <p className="mt-8">
          <GhostLink href="/como-funciona">Ver o processo em detalhe</GhostLink>
        </p>
      </Section>

      {/* /05 — Prova: esparsa de propósito, depois de dois blocos densos.
          Só o que a empresa efetivamente declara. Sem número sem fonte. */}
      <Section density="airy" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader
              indice="05"
              eyebrow="A empresa"
              title={`${site.yearsInMarket} anos fabricando escadas de concreto em São José.`}
            />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-6">
            <p>
              A Munarim fabrica escadas pré-moldadas em concreto polido sob medida
              e atende a Grande Florianópolis. Para entregar o conjunto completo —
              projeto, escada, revestimento e corrimão — trabalha em parceria com
              outras empresas.
            </p>
            <p>
              A empresa declara comprometimento, credibilidade, transparência e
              cumprimento de prazo entre os seus valores. Tagline registrada na
              marca:{" "}
              <em className="not-italic text-text">“{site.tagline}”</em>.
            </p>
            <p>
              <GhostLink href="/empresa">Conhecer a empresa</GhostLink>
            </p>
          </div>
        </div>
      </Section>

      {/* /06 — Dúvidas em duas colunas: título fixo à esquerda, acordeão à
          direita. Só perguntas com resposta validada entram aqui; as que
          dependem de número estrutural ficam em /duvidas, marcadas. */}
      <Section density="dense" className="border-t border-border bg-shade">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                indice="06"
                eyebrow="Dúvidas"
                title="As perguntas que abrem toda conversa"
              />
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

      {/* Fechamento — o primeiro e único CTA da home, depois de toda a prova.
          Centralizado: é a única posição em que o sistema permite centro. */}
      <Section density="airy" className="bg-primary text-primary-fg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="spec text-primary-fg-muted">
            SÃO JOSÉ — GRANDE FLORIANÓPOLIS
          </p>
          <h2 className="mt-6">Conte o seu vão. A gente diz o que cabe nele.</h2>
          <p className="measure mx-auto mt-5 text-lg opacity-90">
            O formulário monta a mensagem e abre o seu WhatsApp já preenchido — a
            conversa começa com o que a gente precisa para orçar.
          </p>
          <div className="mt-10">
            <ButtonLink href="/orcamento">Pedir orçamento</ButtonLink>
          </div>
        </div>
      </Section>

      <Container>
        <div className="border-t border-border py-8">
          <p className="spec text-muted">
            PENDÊNCIAS DE CONTEÚDO NESTA PÁGINA: CNT-002 (ANO DE FUNDAÇÃO) · CNT-003
            (FOTOS DE OBRA) · CNT-014 (QUEM INSTALA)
          </p>
        </div>
      </Container>
    </>
  );
}
