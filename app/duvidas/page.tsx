import type { Metadata } from "next";
import Link from "next/link";
import { artigos } from "@/content/artigos";
import { PageHeader } from "@/components/ui/PageHeader";
import { GhostLink } from "@/components/ui/Button";
import { FAQItem } from "@/components/ui/FAQItem";
import { Section } from "@/components/ui/Section";
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

/* Na tela, só pergunta com resposta (DEC-091). As que dependem de número da
   empresa (carga, peso, prazo, quem instala) seguem em content/faq.ts e
   entram sozinhas quando a resposta chegar (CNT-005, CNT-006, CNT-014). */
const GRUPOS = faq
  .map((g) => ({ ...g, perguntas: g.perguntas.filter((p) => p.resposta) }))
  .filter((g) => g.perguntas.length > 0);

export default function DuvidasPage() {
  return (
    <>
      <PageHeader
        title="O que perguntam antes de pedir a escada."
        lead="Se é a primeira escada que você encomenda, comece por aqui. Cada resposta explica o termo técnico antes de usá-lo."
      />

      <Section density="dense">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {GRUPOS.map((grupo) => (
              <div key={grupo.tema} className="mb-12 last:mb-0">
                <h2 className="rotulo">{grupo.tema}</h2>
                <div className="mt-4">
                  {grupo.perguntas.map((p) => (
                    <FAQItem key={p.q} question={p.q}>
                      <p>{p.resposta}</p>
                    </FAQItem>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="border-l-2 border-border pl-6">
              <p className="rotulo">Não achou sua dúvida?</p>
              <p className="measure mt-4 text-muted">
                Mande a pergunta pelo WhatsApp. Se você ainda não sabe nem por onde
                começar a medir, também serve: a Munarim explica.
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

            <div className="mt-12 border-l-2 border-border pl-6">
              <p className="rotulo">Para ler com calma</p>
              <ul className="mt-4 space-y-1">
                {artigos.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/artigos/${a.slug}`}
                      className="inline-flex min-h-11 items-center text-barra underline-offset-4 hover:underline"
                    >
                      {a.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
