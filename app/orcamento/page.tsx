import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Suspense } from "react";
import { OrcamentoForm } from "@/components/orcamento/OrcamentoForm";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { addressLine, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peça seu orçamento",
  description:
    "Informe o tipo de escada, o pé-direito e a cidade. Montamos sua mensagem e você fala direto com a Munarim no WhatsApp.",
  alternates: { canonical: "/orcamento" },
};

export default function OrcamentoPage() {
  return (
    <>
      <PageHeader
        title="Conte o que você precisa."
        lead="O formulário monta a mensagem e abre o seu WhatsApp já preenchido. Se você ainda não sabe as medidas, envie assim mesmo — a gente explica o que medir."
      />

      <Section density="dense">
        <Suspense fallback={null}>
          <OrcamentoForm />
        </Suspense>
      </Section>

      {/* Canais diretos em texto puro: funcionam sem JS e sem formulário. */}
      <Section density="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              title="Canais diretos"
              lead="Sem formulário, sem intermediário."
            />
          </div>
          <ul className="measure space-y-3 lg:col-span-7">
            <li>
              <TextLink alvo href={site.contact.phoneHref}>{site.contact.phone}</TextLink>
            </li>
            <li>
              <TextLink
                alvo
                href={whatsappLink("Olá! Gostaria de um orçamento de escada.")}
                external
              >
                WhatsApp {site.contact.whatsapp}
              </TextLink>
            </li>
            <li>
              <TextLink alvo href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </TextLink>
            </li>
            <li className="text-muted">{addressLine}</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
