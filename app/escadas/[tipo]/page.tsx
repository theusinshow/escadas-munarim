import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Foto } from "@/components/media/Foto";
import { SlotFoto } from "@/components/media/SlotFoto";
import { Draw } from "@/components/motion/Draw";
import { Spiral } from "@/components/motion/Spiral";
import { StepIn } from "@/components/motion/StepIn";
import { Axonometry } from "@/components/technical/Axonometry";
import { SectionDrawing } from "@/components/technical/SectionDrawing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeCard } from "@/components/ui/TypeCard";
import { getTipo, tipos } from "@/content/tipos";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return tipos.map((t) => ({ tipo: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/escadas/[tipo]">): Promise<Metadata> {
  const { tipo: slug } = await params;
  const tipo = getTipo(slug);
  if (!tipo) return {};

  return {
    /* Absoluto: com o sufixo do template, "Espelho fechado" e "In loco (cascata)"
       passavam de 60 caracteres e o Google truncava. */
    title: {
      absolute: `Escada ${tipo.nome} de concreto pré-moldado | Munarim`,
    },
    description: `Escada ${tipo.nome.toLowerCase()} em concreto polido sob medida. Veja o desenho, quando escolher esse tipo e peça orçamento pelo WhatsApp. ${site.address.city}/${site.address.state}.`,
    alternates: { canonical: `/escadas/${tipo.slug}` },
  };
}

export default async function TipoPage({ params }: PageProps<"/escadas/[tipo]">) {
  const { tipo: slug } = await params;
  const tipo = getTipo(slug);
  if (!tipo) notFound();

  /* Três outros tipos, na ordem do catálogo, para a comparação continuar. */
  const ehCaracol = tipo.slug === "caracol";
  const relacionados = tipos.filter((t) => t.slug !== tipo.slug).slice(0, 3);

  /* Product sem `offers`/preço — não há preço público e inventar um é fabricação de fato. */
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Escada ${tipo.nome} de concreto pré-moldado`,
    description: tipo.resumo,
    brand: { "@type": "Brand", name: site.name },
    category: "Escada pré-moldada de concreto",
  };

  return (
    <>
      <Section density="default">
        <Breadcrumb
          trail={[
            { label: "Início", href: "/" },
            { label: "Escadas", href: "/escadas" },
            { label: tipo.nome },
          ]}
        />

        {/* Régua assimétrica 7/5: texto à esquerda, desenho técnico à direita. */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="measure-display">Escada {tipo.nome}</h1>
            <p className="measure mt-6 text-xl leading-relaxed text-muted">
              {tipo.resumo}
            </p>

            {!tipo.validado && (
              <p className="spec mt-8 border-l-2 border-accent pl-4 text-muted">
                CONTEÚDO PROVISÓRIO — AGUARDA VALIDAÇÃO TÉCNICA DA EMPRESA (CNT-009)
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            {/* O caracol gira; os outros se desenham. Um gesto por verdade. */}
            {ehCaracol ? (
              <Spiral>
                <Axonometry slug={tipo.slug} title={tipo.nome} className="aspect-square w-full" />
              </Spiral>
            ) : (
              <Draw>
                <Axonometry slug={tipo.slug} title={tipo.nome} className="aspect-square w-full" />
              </Draw>
            )}
          </div>
        </div>
      </Section>

      {/* Bloco de autoridade da página. Denso de propósito. */}
      <Section density="dense" className="border-t border-border">
        <SectionHeader
          eyebrow="Corte cotado"
          title="As medidas que definem a subida"
          lead={
            <>
              O <strong className="font-semibold text-text">espelho</strong> é a altura
              de cada degrau e o{" "}
              <strong className="font-semibold text-text">piso</strong> é a profundidade
              onde você apoia o pé. A relação entre os dois é o que faz uma escada ser
              confortável ou cansativa.
            </>
          }
        />
        {/* Bloco de autoridade: o traço se constrói atrelado ao scroll. */}
        {/* Rola em vez de encolher: cota ilegível não serve para nada
            (DESIGN_SYSTEM.md, Responsive Principles). `tabIndex` porque região
            rolável precisa ser alcançável pelo teclado — sem isso, quem navega
            sem mouse não consegue ver o desenho inteiro no celular. */}
        <div
          className="mt-10 max-w-2xl overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label={`Corte cotado da escada ${tipo.nome.toLowerCase()} — role para o lado para ver o desenho inteiro`}
        >
          <Draw>
            <SectionDrawing
              slug={tipo.slug}
              title={tipo.nome}
              className="w-full min-w-[520px]"
            />
          </Draw>
        </div>
        <p className="spec mt-4 text-muted">
          DESENHO ILUSTRATIVO — MEDIDAS REAIS SOB CONSULTA (CNT-009)
        </p>
      </Section>

      <Section density="default" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2>Quando escolher</h2>
            {tipo.quandoEscolher.length > 0 ? (
              <ul className="measure mt-5 space-y-3 text-muted">
                {tipo.quandoEscolher.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="spec mt-5 text-muted">PENDENTE — CNT-009</p>
            )}
          </div>

          {/* Bloco obrigatório — DEC-012. Não remover, não suavizar. */}
          <div>
            <h2>
              Quando <em className="not-italic text-accent">não</em> escolher
            </h2>
            {tipo.quandoNaoEscolher.length > 0 ? (
              <ul className="measure mt-5 space-y-3 text-muted">
                {tipo.quandoNaoEscolher.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="spec mt-5 text-muted">PENDENTE — CNT-009</p>
            )}
          </div>
        </div>
      </Section>

      {/* Acabamentos — lista declarada pela própria empresa. */}
      <Section density="dense" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Acabamentos" title="Corrimão e guarda-corpo" />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p>
              A escada sai em concreto polido. Para o corrimão, a Munarim trabalha com{" "}
              <strong className="font-semibold text-text">inox escovado polido</strong> e{" "}
              <strong className="font-semibold text-text">ferro galvanizado</strong>, além
              de guarda-corpo e sacada.
            </p>
            <p>
              O revestimento, quando você quiser um, entra pela cadeia de parceiros que
              entrega o conjunto completo: projeto, escada, revestimento e corrimão.
            </p>
          </div>
        </div>
      </Section>

      {/* Galeria — o desenho técnico ocupa o lugar da foto até haver material
          real ou asset aprovado na verificação (MEDIA_PLAN.md). */}
      <Section density="default" className="border-t border-border">
        <SectionHeader eyebrow="Galeria" title={`Escadas ${tipo.nome.toLowerCase()} instaladas`} />
        {tipo.imagem ? (
          <>
            {/* `width`/`height` vêm do arquivo, não do slot: com 1600×1063
                declarado sobre um arquivo de 1200×800, o Next gerava srcset até
                1600 e ampliava — era metade do borrão.
                A caixa cai de `max-w-4xl` (896px) para `max-w-2xl` (672px)
                porque 672 é o maior tamanho que 1200px de fonte ainda cobrem
                com folga em tela retina. Imagem exibida acima do que os pixels
                sustentam é a outra metade. */}
            <Foto
              origem="referencia"
              src={tipo.imagem.src}
              alt={tipo.imagem.alt}
              width={tipo.imagem.largura}
              height={tipo.imagem.altura}
              sizes="(min-width: 1024px) 672px, 100vw"
              className="mt-10 max-w-2xl"
            />
            <p className="spec mt-4 text-muted">
              IMAGEM DE REFERÊNCIA — SUBSTITUÍDA POR FOTO DE OBRA REAL QUANDO O ACERVO
              CHEGAR (CNT-003)
            </p>
          </>
        ) : (
          <SlotFoto
            slug={tipo.slug}
            titulo={tipo.nome}
            pendencia="AGUARDANDO ACERVO FOTOGRÁFICO DO CLIENTE (CNT-003)"
            className="mt-10 max-w-sm"
          />
        )}
      </Section>

      {/* CTA depois de toda a prova da página (DEC-001). Esparso: é o fechamento. */}
      <Section density="airy" className="bg-primary text-primary-fg">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="measure-display">
              Essa é a escada do seu vão?
            </h2>
            <p className="measure mt-5 text-lg opacity-90">
              O formulário já vai com “{tipo.nome}” marcado. Se você mudar de ideia no
              caminho, é só trocar.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ButtonLink href={`/orcamento?tipo=${tipo.slug}`}>
              Pedir orçamento
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Tipos relacionados. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader eyebrow="Comparar" title="Outros tipos" />
        <StepIn className="mt-10" selector="li">
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {relacionados.map((outro) => (
            <li key={outro.slug}>
              <TypeCard tipo={outro} />
            </li>
          ))}
        </ul>
        </StepIn>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
    </>
  );
}
