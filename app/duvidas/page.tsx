import type { Metadata } from "next";
import { GhostLink } from "@/components/ui/Button";
import { FAQItem } from "@/components/ui/FAQItem";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faq, faqRespondido } from "@/content/faq";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dúvidas sobre escadas de concreto",
  description:
    "Vão, pé-direito, espelho e piso: o que significa cada termo e o que informar para pedir um orçamento de escada pré-moldada de concreto.",
  alternates: { canonical: "/duvidas" },
};

/* Só as perguntas com resposta entram na marcação — nada de FAQPage prometendo
   resposta que a página não dá. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqRespondido.map((p) => ({
    "@type": "Question",
    name: p.q,
    acceptedAnswer: { "@type": "Answer", text: p.resposta },
  })),
};

export default function DuvidasPage() {
  return (
    <>
      <Section density="default">
        <SectionHeader
          as="h1"
          eyebrow="Dúvidas"
          title="O que perguntam antes de encomendar."
          lead="Se é a primeira escada que você compra, comece por aqui. Cada resposta explica o termo técnico antes de usá-lo."
        />
      </Section>

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {faq.map((grupo) => (
              <div key={grupo.tema} className="mb-12 last:mb-0">
                <h2 className="eyebrow">{grupo.tema}</h2>
                <div className="mt-4">
                  {grupo.perguntas.map((p) => (
                    <FAQItem key={p.q} question={p.q}>
                      {p.resposta ? (
                        <p>{p.resposta}</p>
                      ) : (
                        <p className="spec text-muted">
                          RESPOSTA AGUARDANDO VALIDAÇÃO TÉCNICA DA EMPRESA ({p.pendencia})
                        </p>
                      )}
                    </FAQItem>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="border-l-2 border-border pl-6">
              <p className="eyebrow">Não achou sua dúvida?</p>
              <p className="measure mt-4 text-muted">
                Manda a pergunta no WhatsApp. Se você não sabe nem por onde começar a
                medir, também serve — a gente explica.
              </p>
              <p className="mt-6">
                <GhostLink
                  href={whatsappLink(
                    "Olá! Tenho uma dúvida sobre escada que não achei no site.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Perguntar no WhatsApp
                </GhostLink>
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
