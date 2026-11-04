import type { Metadata } from "next";
import { FaixaCta } from "@/components/ui/FaixaCta";
import { notFound } from "next/navigation";
import { Foto } from "@/components/media/Foto";
import { GaleriaTipo } from "@/components/media/GaleriaTipo";
import { Draw } from "@/components/motion/Draw";
import { Spiral } from "@/components/motion/Spiral";
import { StepIn } from "@/components/motion/StepIn";
import { Axonometry } from "@/components/technical/Axonometry";
import { SectionDrawing } from "@/components/technical/SectionDrawing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeCard } from "@/components/ui/TypeCard";
import { fotosDo, temReferencia } from "@/content/galeria";
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

/** Âncoras do sumário do hero — quem chega do Google pula para o que veio buscar. */
function sumario(totalFotos: number) {
  return [
    { href: "#corte", rotulo: "Desenho e medidas" },
    { href: "#escolher", rotulo: "Quando escolher" },
    ...(totalFotos > 0 ? [{ href: "#galeria", rotulo: `Galeria (${totalFotos})` }] : []),
  ];
}

export default async function TipoPage({ params }: PageProps<"/escadas/[tipo]">) {
  const { tipo: slug } = await params;
  const tipo = getTipo(slug);
  if (!tipo) notFound();

  const ehCaracol = tipo.slug === "caracol";
  /* Três outros tipos, na ordem do catálogo, para a comparação continuar. */
  const relacionados = tipos.filter((t) => t.slug !== tipo.slug).slice(0, 3);
  const fotos = fotosDo(tipo.slug);
  const capa = fotos[0];
  /* A capa já está no hero; a galeria mostra o resto — a não ser que o resto
     seja tão pouco que a galeria fique manca. */
  const galeria = fotos.length > 3 ? fotos.slice(1) : fotos;

  /* Product sem `offers`/preço — não há preço público e inventar um é fabricação de fato. */
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Escada ${tipo.nome} de concreto pré-moldado`,
    description: tipo.resumo,
    brand: { "@type": "Brand", name: site.name },
    category: "Escada pré-moldada de concreto",
  };

  /* O caracol gira; os outros se desenham. Um gesto por verdade. */
  const desenho = ehCaracol ? (
    <Spiral>
      <Axonometry slug={tipo.slug} title={tipo.nome} className="aspect-square w-full" />
    </Spiral>
  ) : (
    <Draw>
      <Axonometry slug={tipo.slug} title={tipo.nome} className="aspect-square w-full" />
    </Draw>
  );

  return (
    <>
      {/* Hero em régua 7/5: texto à esquerda, a foto vertical do tipo à direita
          na altura da dobra. O desenho técnico desceu para o bloco do corte,
          onde ele mede em vez de decorar (DEC-048). Sem foto, ele volta. */}
      <section className="overflow-x-clip border-b border-border">
        <div className="container-site grid gap-10 pt-10 lg:min-h-[calc(100svh-var(--barra-h))] lg:grid-cols-12 lg:gap-12 lg:pt-0">
          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:py-14 xl:col-span-7">
            <Breadcrumb
              trail={[
                { label: "Início", href: "/" },
                { label: "Escadas", href: "/escadas" },
                { label: tipo.nome },
              ]}
            />

            <div>
              <p className="spec text-accent">{tipo.destaque}</p>
              <h1 className="type-display measure-display mt-4">Escada {tipo.nome}</h1>
              <p className="measure mt-6 text-xl leading-relaxed text-muted">{tipo.resumo}</p>

              {!tipo.validado && (
                <p className="spec mt-8 border-l-2 border-accent pl-4 text-muted">
                  CONTEÚDO PROVISÓRIO — AGUARDA VALIDAÇÃO TÉCNICA DA EMPRESA (CNT-009)
                </p>
              )}
            </div>

            <nav
              aria-label="Nesta página"
              className="flex flex-wrap gap-x-6 border-t border-border pt-3"
            >
              {sumario(galeria.length).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="spec inline-flex min-h-11 items-center text-link underline-offset-4 hover:underline"
                >
                  {item.rotulo}
                </a>
              ))}
            </nav>
          </div>

          {/* A foto sangra até a borda direita da janela: escada é peça de
              pé-direito, e a moldura não pode parecer um card. */}
          <div className="lg:col-span-6 lg:mr-[calc(-1*(max(0px,(100vw-var(--container))/2)+2.5rem))] xl:col-span-5">
            {capa ? (
              <div className="relative aspect-[2/3] overflow-hidden bg-shade lg:aspect-auto lg:h-full">
                <Foto
                  foto={capa}
                  fill
                  priority
                  sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                />
              </div>
            ) : (
              <div className="lg:py-14">{desenho}</div>
            )}
          </div>
        </div>
      </section>

      {/* Bloco de autoridade da página. Denso de propósito. */}
      <Section density="dense" id="corte" className="scroll-mt-(--barra-h)">
        <SectionHeader
          split
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

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end">
          {/* A axonometria mostra a peça inteira; o corte mostra as medidas. */}
          {capa && (
            <div className="bg-surface p-6 lg:col-span-5">
              {desenho}
              <p className="spec mt-4 text-muted">AXONOMETRIA</p>
            </div>
          )}
          {/* Rola em vez de encolher: cota ilegível não serve para nada
              (DESIGN_SYSTEM.md, Responsive Principles). `tabIndex` porque região
              rolável precisa ser alcançável pelo teclado — sem isso, quem navega
              sem mouse não consegue ver o desenho inteiro no celular. */}
          <div className={capa ? "lg:col-span-7" : "max-w-2xl lg:col-span-12"}>
            <div
              className="overflow-x-auto"
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
              CORTE — DESENHO ILUSTRATIVO, MEDIDAS REAIS SOB CONSULTA (CNT-009)
            </p>
          </div>
        </div>
      </Section>

      <Section
        density="default"
        id="escolher"
        className="scroll-mt-(--barra-h) border-t border-border"
      >
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
            <SectionHeader title="Corrimão e guarda-corpo" />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p>
              A Munarim fabrica a escada, em concreto polido. Corrimão, guarda-corpo e
              revestimento entram por parceria com outras empresas — o corrimão em{" "}
              <strong className="font-semibold text-text">inox escovado polido</strong> ou{" "}
              <strong className="font-semibold text-text">ferro galvanizado</strong>.
            </p>
            <p>
              Assim você recebe o conjunto completo — projeto, escada, revestimento e
              corrimão — com uma conversa só.
            </p>
          </div>
        </div>
      </Section>

      {/* Galeria — o resto das fotos do tipo, em mosaico vertical. Sem foto, a
          seção não existe: o desenho já está no hero. */}
      {galeria.length > 0 && (
        <Section
          density="default"
          id="galeria"
          className="scroll-mt-(--barra-h) border-t border-border"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeader
              className="lg:col-span-7"
              title={`Escada ${tipo.nome.toLowerCase()} dentro de casa`}
            />
            {temReferencia && (
              <p className="spec border-l-2 border-accent pl-4 text-muted lg:col-span-5">
                IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM. LEGENDA SÓ COM O
                TIPO (DEC-008 · CNT-003)
              </p>
            )}
          </div>
          <div className="mt-10">
            <GaleriaTipo fotos={galeria} nome={tipo.nome} />
          </div>
        </Section>
      )}

      {/* CTA depois de toda a prova da página (DEC-001). Esparso: é o fechamento. */}
      <FaixaCta
        title="Essa é a escada do seu vão?"
        text={<>O formulário já vai com “{tipo.nome}” marcado. Se você mudar de ideia no caminho, é só trocar.</>}
        href={`/orcamento?tipo=${tipo.slug}`}
      />

      {/* Tipos relacionados. */}
      <Section density="default" className="border-t border-border">
        <SectionHeader title="Outros tipos" />
        <StepIn className="mt-10" selector="li">
          <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((outro) => (
              <li key={outro.slug} className="border-r border-b border-border">
                <TypeCard
                  tipo={outro}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
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
