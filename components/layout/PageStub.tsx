import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * TEMPORÁRIO — fases 01–03.
 * Marca uma rota como navegável antes das seções reais (fase 04 do EXECUTION_PLAN).
 * O aviso é deliberadamente visível: placeholder neste projeto é slot marcado,
 * nunca texto verossímil.
 */
export function PageStub({
  eyebrow,
  title,
  lead,
  sections,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  sections: string[];
}) {
  return (
    <>
      <Section density="dense">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} lead={lead} />
      </Section>

      <Container>
        <div className="border-t border-border py-8">
          <p className="spec text-muted">SEÇÕES PREVISTAS — FASE 04</p>
          <ol className="measure mt-4 space-y-1.5">
            {sections.map((s, i) => (
              <li key={s} className="flex gap-4 text-muted">
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
