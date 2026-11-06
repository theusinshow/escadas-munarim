import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Foto } from "@/components/media/Foto";
import { GaleriaTipo } from "@/components/media/GaleriaTipo";
import { Draw } from "@/components/motion/Draw";
import { StepIn } from "@/components/motion/StepIn";
import { Figura } from "@/components/technical/Figura";
import { SectionDrawing } from "@/components/technical/SectionDrawing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TypeCard } from "@/components/ui/TypeCard";
import { artigos } from "@/content/artigos";
import { fotosDo } from "@/content/galeria";
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
    /* Absoluto: com o sufixo do template, "Espelho fechado"
       passava de 60 caracteres e o Google truncava. */
    title: {
      absolute: `Escada ${tipo.nome} de concreto pré-moldado | Munarim`,
    },
    description: `Escada ${tipo.nome.toLowerCase()} em concreto polido sob medida. Veja o desenho, quando escolher esse tipo e peça orçamento pelo WhatsApp. ${site.address.city}/${site.address.state}.`,
    alternates: { canonical: `/escadas/${tipo.slug}` },
  };
}

/* As quatro medidas do corte, em língua de quem nunca leu um projeto (DEC-002).
   "Vão" é a definição do FAQ; os intervalos são os da ABNT NBR 9050. */
const MEDIDAS = [
  { termo: "Vão", texto: "A abertura na laje por onde a escada passa." },
  { termo: "Pé-direito", texto: "A altura de piso a piso, que a escada precisa vencer." },
  {
    termo: "Espelho",
    texto: "A altura de cada degrau. A referência no Brasil (ABNT NBR 9050) é de 16 a 18 cm.",
  },
  { termo: "Piso", texto: "A profundidade onde você apoia o pé. Pela mesma norma, de 28 a 32 cm." },
];

/* Menor que o h2 padrão: os dois títulos cabem numa linha e as listas começam alinhadas. */
const tituloPainel = "text-[clamp(1.25rem,1.75vw,1.6rem)]";

/** Âncoras do sumário do hero — quem chega do Google pula para o que veio buscar. */
function sumario(totalFotos: number, temEscolha: boolean) {
  return [
    { href: "#corte", rotulo: "Desenho e medidas" },
    ...(temEscolha ? [{ href: "#escolher", rotulo: "Quando escolher" }] : []),
    ...(totalFotos > 0 ? [{ href: "#galeria", rotulo: `Galeria (${totalFotos})` }] : []),
  ];
}

export default async function TipoPage({ params }: PageProps<"/escadas/[tipo]">) {
  const { tipo: slug } = await params;
  const tipo = getTipo(slug);
  if (!tipo) notFound();

  /* Os outros quatro tipos, na ordem do catálogo, para a comparação continuar. */
  const relacionados = tipos.filter((t) => t.slug !== tipo.slug);
  const fotos = fotosDo(tipo.slug);
  const capa = fotos[0];
  /* A capa já está no hero; a galeria mostra o resto — a não ser que o resto
     seja tão pouco que a galeria fique manca. Com uma foto só, não há galeria. */
  const galeria = fotos.length > 3 ? fotos.slice(1) : fotos.length > 1 ? fotos : [];

  /* Product sem `offers`/preço — não há preço público e inventar um é fabricação de fato. */
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Escada ${tipo.nome} de concreto pré-moldado`,
    description: tipo.resumo,
    brand: { "@type": "Brand", name: site.name },
    category: "Escada pré-moldada de concreto",
  };

  /* A figura sólida do tipo (DEC-070): mesma câmera e escala em todos. */
  const desenho = (
    <div data-revela>
      <Figura nome={tipo.slug} titulo={`Desenho da escada ${tipo.nome.toLowerCase()}`} className="w-full" />
    </div>
  );

  return (
    <>
      {/* Hero em régua 7/5: texto à esquerda, a foto vertical do tipo à direita
          na altura da dobra. O desenho técnico desceu para o bloco do corte,
          onde ele mede em vez de decorar (DEC-048). Sem foto, ele volta. */}
      <section className="overflow-x-clip bg-surface">
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
              <h1 className="type-display measure-display mt-4 text-barra">Escada {tipo.nome}</h1>
              <p className="measure mt-6 text-xl leading-relaxed text-muted">{tipo.resumo}</p>
            </div>

            <nav
              aria-label="Nesta página"
              className="flex flex-wrap gap-x-6 border-t border-border pt-3"
            >
              {sumario(galeria.length, tipo.quandoEscolher.length > 0).map((item) => (
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
          lead="O tamanho de cada degrau decide se a subida é confortável ou cansativa. O desenho mostra a escada por dois ângulos, e a legenda explica cada medida."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-12">
          {/* A vista em 3D mostra a peça inteira; o corte mostra as medidas. */}
          {capa && (
            <div className="flex flex-col bg-surface p-6 lg:col-span-5 lg:p-8">
              <div className="flex flex-1 items-center">{desenho}</div>
              <p className="spec mt-4 text-muted">A peça inteira, em 3D.</p>
            </div>
          )}
          {/* Rola em vez de encolher: cota ilegível não serve para nada
              (DESIGN_SYSTEM.md, Responsive Principles). `tabIndex` porque região
              rolável precisa ser alcançável pelo teclado — sem isso, quem navega
              sem mouse não consegue ver o desenho inteiro no celular. */}
          <div className={`min-w-0 bg-surface p-6 lg:p-8 ${capa ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <div
              className={`overflow-x-auto ${capa ? "" : "max-w-2xl"}`}
              tabIndex={0}
              role="region"
              aria-label={`Corte cotado da escada ${tipo.nome.toLowerCase()} — role para o lado para ver o desenho inteiro`}
            >
              <Draw>
                <SectionDrawing
                  slug={tipo.slug}
                  title={tipo.nome}
                  className="w-full min-w-[460px]"
                />
              </Draw>
            </div>
            <p className="spec mt-4 text-muted">
              Corte: a escada vista de lado. É ilustrativo: as medidas da sua escada saem da
              medição no local.
              <span className="sm:hidden"> Arraste para o lado para ver o desenho inteiro.</span>
            </p>
          </div>
        </div>

        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {MEDIDAS.map((m) => (
            <div key={m.termo} className="border-t border-border pt-4">
              <dt className="font-display text-[1.05rem] text-barra">{m.termo}</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">{m.texto}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section density="dense" id="escolher" className="scroll-mt-(--barra-h) bg-surface">
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-revela className="bg-bg p-6 lg:p-10">
            <h2 className={`${tituloPainel} text-barra`}>Quando escolher</h2>
            <ul className="mt-8 border-t border-border">
              {tipo.quandoEscolher.map((item) => (
                <li key={item} className="border-b border-border py-4 text-[1.05rem] text-text">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloco obrigatório — DEC-012. Não remover, não suavizar. */}
          <div data-revela className="bg-barra p-6 text-primary-fg lg:p-10">
            <h2 className={tituloPainel}>
              Quando{" "}
              <em className="inline-block bg-surface px-[0.3em] text-barra not-italic">não</em>{" "}
              escolher
            </h2>
            <ul className="mt-8 border-t border-primary-fg/20">
              {tipo.quandoNaoEscolher.map((item) => (
                <li key={item} className="border-b border-primary-fg/20 py-4 text-[1.05rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Acabamentos — lista declarada pela própria empresa. */}
      <Section density="dense">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Corrimão e guarda-corpo" />
          </div>
          <div className="measure space-y-5 text-muted lg:col-span-7">
            <p>
              A Munarim projeta e fabrica a escada, em concreto polido. Corrimão, guarda-corpo e
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
        <Section density="dense" id="galeria" className="scroll-mt-(--barra-h) bg-surface">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeader
              className="lg:col-span-7"
              title={`Escada ${tipo.nome.toLowerCase()} dentro de casa`}
            />
          </div>
          <div className="mt-10">
            <GaleriaTipo fotos={galeria} nome={tipo.nome} fileiras />
          </div>
        </Section>
      )}

      {/* Artigos que citam este tipo (DEC-093): link interno no contexto. */}
      {artigos.some((a) => a.tipos.includes(tipo.slug)) && (
        <Section density="dense" className={galeria.length > 0 ? "" : "border-t border-border"}>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <p className="rotulo lg:col-span-4">Para ler antes de decidir</p>
            <ul className="lg:col-span-8">
              {artigos
                .filter((a) => a.tipos.includes(tipo.slug))
                .map((a) => (
                  <li key={a.slug} className="border-b border-border first:border-t">
                    <Link
                      href={`/artigos/${a.slug}`}
                      className="group flex min-h-14 items-center justify-between gap-6 py-3 text-barra"
                    >
                      <span className="group-hover:underline group-hover:underline-offset-4">
                        {a.titulo}
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Tipos relacionados. */}
      <Section density="dense" className="bg-surface">
        <SectionHeader title="Outros tipos" />
        <StepIn className="mt-10" selector="li">
          <ul className="grid grid-cols-2 border-t border-l border-border lg:grid-cols-4">
            {relacionados.map((outro) => (
              <li key={outro.slug} className="border-r border-b border-border">
                <TypeCard tipo={outro} compacto sizes="(min-width: 1024px) 25vw, 50vw" />
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
