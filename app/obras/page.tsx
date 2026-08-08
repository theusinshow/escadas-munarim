import type { Metadata } from "next";
import { ObrasFilter } from "@/components/obras/ObrasFilter";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Escadas de concreto polido fabricadas e instaladas pela Munarim na Grande Florianópolis. Veja projetos por tipo de escada.",
  alternates: { canonical: "/obras" },
};

export default function ObrasPage() {
  return (
    <>
      <Section density="default">
        <SectionHeader
          as="h1"
          eyebrow="Portfólio"
          title="Escadas instaladas."
          lead="Projetos entregues na Grande Florianópolis, organizados por tipo de escada."
        />
      </Section>

      <Section density="dense" className="border-t border-border">
        <ObrasFilter />
      </Section>

      <Container>
        <div className="border-t border-border py-8">
          <p className="spec text-muted">SEÇÕES PREVISTAS — FASE 04</p>
          <ol className="measure mt-4 space-y-1.5 text-muted">
            {["Grid masonry com lightbox", "CTA"].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="spec pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}
