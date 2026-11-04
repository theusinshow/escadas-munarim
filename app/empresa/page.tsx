import type { Metadata } from "next";
import { FaixaCta } from "@/components/ui/FaixaCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { GhostLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sobre a ${site.name}`,
  description: `Há ${site.yearsInMarket} anos fabricando escadas pré-moldadas em concreto polido em ${site.address.city}/${site.address.state}, atendendo a Grande Florianópolis.`,
  alternates: { canonical: "/empresa" },
};

/**
 * Só fato declarado pela própria empresa.
 * Valores, missão, visão e o modelo de parceria vêm do site atual.
 * Nada de "equipe própria" ou "fábrica própria" — ver DEC-017 e CNT-014.
 */
/* Os valores declarados viraram o fato que os sustenta (DEC-059): adjetivo não
   prova nada, processo prova. Tudo já está em `content/processo.ts`; prazo é
   CNT-005 e fica de fora. */
const COMO = [
  "Mede o vão, o pé-direito e o apoio no local.",
  "Você aprova o desenho cotado antes da fabricação.",
  "A escada chega pronta: concretada e polida fora da obra.",
];

export default function EmpresaPage() {
  return (
    <>
      <PageHeader
        title={`${site.yearsInMarket} anos fabricando escadas em ${site.address.city}.`}
        lead="Escada pré-moldada em concreto polido, sob medida, para a Grande Florianópolis. A Munarim faz uma coisa só — a escada de concreto."
      />

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="O que a Munarim faz" />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p>
              A empresa nasceu para atender o mercado de escadas pré-moldadas em
              concreto, fabricando sob medida. Está há{" "}
              {site.yearsInMarket} anos no mercado, em {site.address.city}/
              {site.address.state}.
            </p>
            <p>
              Entre os clientes estão construtoras da região de Florianópolis,
              engenheiros civis, arquitetos e famílias construindo ou reformando a casa
              própria.
            </p>
            <p>
              Para entregar o conjunto completo — projeto, escada, revestimento e
              corrimão — a Munarim trabalha em parceria com outras empresas. A escada é
              fabricada por ela; o restante do acabamento vem de quem faz aquilo bem.
            </p>
            <p className="spec border-l border-accent pl-4">
              ANO DE FUNDAÇÃO A CONFIRMAR (CNT-002) · ESTRUTURA DE PRODUÇÃO E QUEM
              INSTALA A CONFIRMAR (CNT-004, CNT-014)
            </p>
          </div>
        </div>
      </Section>

      <Section density="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Como a gente trabalha" />
          </div>
          <ul className="lg:col-span-7">
            {COMO.map((fato) => (
              <li
                key={fato}
                className="border-b border-border py-6 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-light first:border-t"
              >
                {fato}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Região atendida" />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p>
              {site.serviceArea.slice(0, 4).join(", ")} e a região da Grande
              Florianópolis.
            </p>
            <address className="not-italic">
              {addressLine}
              <br />
              <TextLink alvo href={site.contact.phoneHref}>{site.contact.phone}</TextLink>
              {" · "}
              <TextLink alvo href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </TextLink>
            </address>
            <p>
              <GhostLink
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.contact.instagram} no Instagram
              </GhostLink>
            </p>
          </div>
        </div>
      </Section>

      <FaixaCta title="Vamos falar sobre a sua escada." />
    </>
  );
}
