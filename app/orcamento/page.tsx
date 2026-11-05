import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Suspense } from "react";
import { OrcamentoForm } from "@/components/orcamento/OrcamentoForm";
import { Section } from "@/components/ui/Section";

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

    </>
  );
}
