import type { Metadata } from "next";
import { ButtonLink, GhostLink } from "@/components/ui/Button";
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
const valores = [
  "Comprometimento",
  "Credibilidade",
  "Eficiência",
  "Transparência",
  "Melhoria contínua",
  "Cumprimento de prazo",
];

export default function EmpresaPage() {
  return (
    <>
      <Section density="default">
        <SectionHeader
          as="h1"
          eyebrow={site.tagline}
          title={`${site.yearsInMarket} anos fabricando escadas em São José.`}
          lead="Escadas pré-moldadas em concreto polido sob medida, para a Grande Florianópolis."
        />
      </Section>

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="História" title="O que a Munarim faz" />
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
            <p className="spec border-l-2 border-accent pl-4">
              ANO DE FUNDAÇÃO A CONFIRMAR (CNT-002) · ESTRUTURA DE PRODUÇÃO E QUEM
              INSTALA A CONFIRMAR (CNT-004, CNT-014)
            </p>
          </div>
        </div>
      </Section>

      <Section density="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Valores"
              title="O que a empresa diz sobre si"
              lead="Reproduzidos como a própria Munarim os declara."
            />
          </div>
          <ul className="lg:col-span-7">
            {valores.map((valor) => (
              <li
                key={valor}
                className="border-b border-border py-4 font-display text-2xl font-semibold tracking-tight first:border-t"
              >
                {valor}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Onde estamos" title="Região atendida" />
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

      <Section density="airy" className="bg-primary text-primary-fg">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="measure-display">
              Vamos falar sobre a sua escada.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ButtonLink href="/orcamento">Pedir orçamento</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
