import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { Foto } from "@/components/media/Foto";
import { RESUMO_GOOGLE } from "@/content/avaliacoes";
import { alturaDoLogo, clientes } from "@/content/clientes";
import { FOTO_FACHADA, FOTO_OBRA } from "@/content/galeria";
import { tipos } from "@/content/tipos";
import { addressLine, anosDeMercado, comoChegarUrl, mapaUrl, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sobre a ${site.name}`,
  description: `Há mais de ${site.yearsInMarket} anos fabricando escadas pré-moldadas em concreto polido em ${site.address.city}/${site.address.state}, atendendo a Grande Florianópolis.`,
  alternates: { canonical: "/empresa" },
};

/**
 * Só fato declarado pela própria empresa.
 * Nada de "equipe própria" ou "fábrica própria" — ver DEC-017 e CNT-014.
 *
 * DEC-104: o que faz, com a colagem de fotos → números e construtoras → como
 * trabalha → missão, visão e valores → onde estamos, com os dados e o mapa.
 * Estrutura da página Sobre da Machado Plataformas, trazida pelo desenvolvedor.
 */

/* Fatos do processo: já estão em `content/processo.ts`; prazo é CNT-005 e fica de fora. */
const COMO = [
  "A medição é feita na obra: o vão, o pé-direito e o apoio.",
  "Você aprova o desenho cotado antes de qualquer peça ser fabricada.",
  "A escada chega pronta, concretada e polida fora da obra.",
];

/* Só número verificado — os mesmos da home (DEC-091). */
const NUMEROS = [
  { valor: anosDeMercado, legenda: "Anos de mercado em São José", destaque: true },
  { valor: `${tipos.length}`, legenda: "Tipos de escada, do lance reto ao caracol" },
  { valor: RESUMO_GOOGLE.nota, legenda: `Nota no Google, em ${RESUMO_GOOGLE.total} avaliações` },
];

/* Texto da página "Nossa Empresa" do site atual, como a empresa declara. */
const MISSAO =
  "Atender o mercado de escadas pré-moldadas em concreto, fabricando produtos de qualidade e que superem as expectativas de nossos clientes.";
const VISAO =
  "Ser reconhecida como empresa referência no ramo em que atuamos, sendo lembrada por nossa seriedade, fornecendo produtos de alto padrão e com a garantia de um bom atendimento.";
const VALORES = [
  "Comprometimento",
  "Credibilidade",
  "Eficiência e eficácia",
  "Transparência",
  "Busca pela melhoria contínua",
  "Respeito aos prazos de entrega",
  "Adaptação ao mercado",
];

const rotuloDado = "font-label text-[0.72rem] tracking-[0.14em] text-muted uppercase";
const tituloEssencia = "font-display text-[clamp(1.25rem,2.2vw,1.9rem)] leading-tight uppercase";

export default function EmpresaPage() {
  return (
    <>
      <PageHeader
        compacto
        title={
          <>
            <span className="inline-block bg-barra px-[0.3em] text-primary-fg">{anosDeMercado}</span> anos
            fabricando escadas em {site.address.city}.
          </>
        }
        lead="Escada pré-moldada em concreto polido, sob medida, para casas da Grande Florianópolis. A Munarim faz uma coisa só: a escada de concreto."
      />

      <Section density="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader title="O que a Munarim faz" />
            <div className="measure mt-8 space-y-5 text-muted">
              <p>
                A empresa nasceu para atender o mercado de escadas pré-moldadas em
                concreto, fabricando sob medida. Está há mais de{" "}
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

          <div className="lg:col-span-6 lg:col-start-7">
            <div data-revela className="relative aspect-[5/4] overflow-hidden">
              <Foto foto={FOTO_OBRA} fill sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            {/* A fachada só existe em 300px (DEC-095): entra no tamanho dela,
                sobreposta à foto grande, em vez de esticada e mole. */}
            <figure data-revela className="relative z-10 -mt-24 w-[min(300px,85%)] lg:-ml-10">
              <div className="bg-surface p-2">
                <Foto foto={FOTO_FACHADA} sizes="300px" />
              </div>
              <figcaption className="spec mt-3 text-muted">A sede, em {site.address.city}.</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section density="dense" className="border-t border-border">
        <h2 className="sr-only">Em números</h2>
        <dl className="grid gap-3 sm:grid-cols-3 lg:gap-4">
          {NUMEROS.map((n) => (
            <div
              key={n.legenda}
              data-revela
              className={`flex min-h-40 flex-col justify-between gap-8 p-6 lg:min-h-52 lg:p-8 ${
                n.destaque ? "bg-barra text-primary-fg" : "bg-surface text-barra"
              }`}
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

        <div className="mt-16 border-t border-border pt-10 lg:mt-20">
          <h2 className="spec text-muted">Construtoras e empreendimentos atendidos</h2>
          <ul className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-8 lg:justify-between lg:gap-x-8">
            {clientes.map((c) => (
              <li key={c.nome} data-revela>
                <Image
                  src={c.src}
                  alt={c.nome}
                  width={c.largura}
                  height={c.altura}
                  sizes="240px"
                  className="h-[calc(var(--h)*0.78)] w-auto max-w-none xl:h-(--h)"
                  style={{ "--h": `${alturaDoLogo(c)}rem` } as React.CSSProperties}
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section density="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Como a gente trabalha" />
          </div>
          <div className="lg:col-span-7">
            <ul>
              {COMO.map((fato) => (
                <li
                  key={fato}
                  className="border-b border-border py-6 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-light first:border-t"
                >
                  {fato}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <TextLink alvo href="/obras">Ver as obras</TextLink>
              <TextLink alvo href="/como-funciona">Como funciona, do vão à entrega</TextLink>
            </p>
          </div>
        </div>
      </Section>

      <Section density="default" className="bg-chumbo text-primary-fg">
        <h2 data-revela className="text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08]">
          Missão, visão e valores
        </h2>
        <div className="mt-12 border-b border-white/15 lg:mt-16">
          <div data-revela className="grid gap-5 border-t border-white/15 py-8 lg:grid-cols-12 lg:gap-10 lg:py-12">
            <h3 className={`${tituloEssencia} lg:col-span-4`}>Missão</h3>
            <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-primary-fg-muted lg:col-span-8">{MISSAO}</p>
          </div>
          <div data-revela className="grid gap-5 border-t border-white/15 py-8 lg:grid-cols-12 lg:gap-10 lg:py-12">
            <h3 className={`${tituloEssencia} lg:col-span-4`}>Visão</h3>
            <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-primary-fg-muted lg:col-span-8">{VISAO}</p>
          </div>
          <div data-revela className="grid gap-5 border-t border-white/15 py-8 lg:grid-cols-12 lg:gap-10 lg:py-12">
            <h3 className={`${tituloEssencia} lg:col-span-4`}>Valores</h3>
            <ul className="grid gap-x-10 text-[1.05rem] text-primary-fg-muted sm:grid-cols-2 lg:col-span-8">
              {VALORES.map((v) => (
                <li key={v} className="border-b border-white/15 py-3">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section density="default" id="onde-estamos" className="scroll-mt-(--barra-h)">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader title="Onde estamos" />
            <address className="mt-8 border-t border-border not-italic">
              <div className="border-b border-border py-4">
                <p className={rotuloDado}>Endereço</p>
                <p className="mt-2 max-w-[30ch]">{addressLine}</p>
              </div>
              <div className="border-b border-border py-3">
                <p className={rotuloDado}>WhatsApp</p>
                <TextLink alvo href={whatsappLink()}>{site.contact.whatsapp}</TextLink>
              </div>
              <div className="border-b border-border py-3">
                <p className={rotuloDado}>Telefone</p>
                <TextLink alvo href={site.contact.phoneHref}>{site.contact.phone}</TextLink>
              </div>
              <div className="border-b border-border py-3">
                <p className={rotuloDado}>E-mail</p>
                <TextLink alvo href={`mailto:${site.contact.email}`} className="[overflow-wrap:anywhere]">
                  {site.contact.email}
                </TextLink>
              </div>
              <div className="border-b border-border py-4">
                <p className={rotuloDado}>Atendimento</p>
                <p className="mt-2 max-w-[34ch]">
                  {site.serviceArea.slice(0, 4).join(", ")} e a região da Grande Florianópolis.
                </p>
              </div>
            </address>

            <a
              href={comoChegarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chanfro-escuro mt-8"
            >
              Como chegar
            </a>
          </div>

          <div data-revela className="relative aspect-[4/3] overflow-hidden bg-surface lg:col-span-8 lg:aspect-auto lg:min-h-[36rem]">
            <iframe
              src={mapaUrl}
              title={`Mapa com a localização da ${site.name}: ${addressLine}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
