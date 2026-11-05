import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GhostLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { Foto } from "@/components/media/Foto";
import { RESUMO_GOOGLE } from "@/content/avaliacoes";
import { FOTO_FACHADA } from "@/content/galeria";
import { tipos } from "@/content/tipos";
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
  "A medição é feita na obra: o vão, o pé-direito e o apoio.",
  "Você aprova o desenho cotado antes de qualquer peça ser fabricada.",
  "A escada chega pronta, concretada e polida fora da obra.",
];

/* Só número verificado — os mesmos da home (DEC-091). */
const NUMEROS = [
  { valor: `${site.yearsInMarket}`, legenda: "Anos de mercado em São José" },
  { valor: `${tipos.length}`, legenda: "Tipos de escada, do lance reto ao caracol" },
  { valor: RESUMO_GOOGLE.nota, legenda: `Nota no Google, em ${RESUMO_GOOGLE.total} avaliações` },
];

export default function EmpresaPage() {
  return (
    <>
      <PageHeader
        title={`${site.yearsInMarket} anos fabricando escadas em ${site.address.city}.`}
        lead="Escada pré-moldada em concreto polido, sob medida, para casas da Grande Florianópolis. A Munarim faz uma coisa só: a escada de concreto."
      />

      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="O que a Munarim faz" />
            {/* A foto só existe em 300px (DEC-095): fica no tamanho dela,
                com moldura, em vez de esticada e mole. */}
            <div data-revela className="mt-10 max-w-[300px] border border-border bg-surface p-2">
              <Foto foto={FOTO_FACHADA} sizes="300px" />
            </div>
            <p className="spec mt-3 text-muted">A sede, em {site.address.city}.</p>
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
              A Munarim projeta e fabrica a escada. Para entregar o conjunto completo,
              corrimão, guarda-corpo e revestimento vêm de empresas parceiras, que fazem
              só isso.
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
        <h2 className="sr-only">Em números</h2>
        <dl className="grid gap-3 sm:grid-cols-3 lg:gap-4">
          {NUMEROS.map((n) => (
            <div
              key={n.legenda}
              data-revela
              className="flex min-h-40 flex-col justify-between gap-8 bg-surface p-6 text-barra lg:min-h-52 lg:p-8"
            >
              <dt className="order-2 max-w-[24ch] font-label text-[0.72rem] leading-relaxed tracking-[0.14em] uppercase">
                {n.legenda}
              </dt>
              <dd className="order-1 font-display text-[clamp(3rem,5vw,4.6rem)] leading-none">
                {n.valor}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          <TextLink alvo href="/obras">Ver as obras</TextLink>
          <TextLink alvo href="/como-funciona">Como funciona, do vão à entrega</TextLink>
        </p>
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

    </>
  );
}
