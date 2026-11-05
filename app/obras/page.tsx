import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ColecaoCard } from "@/components/galeria/ColecaoCard";
import { ObrasFilter } from "@/components/obras/ObrasFilter";
import { Section } from "@/components/ui/Section";
import { fotosDo, temReferencia } from "@/content/galeria";
import { tipos } from "@/content/tipos";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Escadas de concreto polido fabricadas e instaladas pela Munarim na Grande Florianópolis. Veja projetos por tipo de escada.",
  alternates: { canonical: "/obras" },
};

/**
 * Obras (DEC-048).
 *
 * Enquanto o acervo do cliente não chega (`CNT-003`), a galeria mostra imagens
 * de referência e o título não afirma obra. Quando o `npm run media` passar a
 * gerar `foto-`, `temReferencia` vira falso e o texto de obra volta sozinho.
 *
 * Coleções em degrau no topo, como o índice de projetos da estrutura de
 * referência (DEC-052): a unidade é o tipo enquanto não houver obra. Embaixo,
 * todas as fotos com filtro.
 */

const COM_FOTO = tipos.filter((t) => fotosDo(t.slug).length > 0);
export default function ObrasPage() {
  return (
    <>
      <PageHeader
        title={temReferencia ? "Escadas de concreto, por tipo." : "Escadas instaladas."}
        lead={
          temReferencia
            ? "Fotos organizadas pelos sete tipos do catálogo. Toque em uma foto para ampliar."
            : "Projetos entregues na Grande Florianópolis, organizados por tipo de escada."
        }
      />

      <Section density="default">
        <div className="grid items-start gap-14 md:grid-cols-3 md:gap-x-6 md:gap-y-20 lg:gap-x-8">
          {COM_FOTO.map((tipo, i) => (
            <ColecaoCard
              key={tipo.slug}
              tipo={tipo}
              indice={i + 1}
              degrau={(i % 3) as 0 | 1 | 2}
              titulo="h2"
            />
          ))}
        </div>
      </Section>

      <Section density="dense" className="border-t border-border" aria-labelledby="todas-titulo">
        <h2 id="todas-titulo" className="measure-display mb-10">
          Todas as fotos
        </h2>
        <ObrasFilter />
      </Section>

    </>
  );
}
