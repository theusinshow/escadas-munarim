import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prende } from "@/components/motion/Prende";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { artigoPorSlug, artigos, minutosDeLeitura, type Bloco } from "@/content/artigos";
import { getTipo } from "@/content/tipos";
import { site } from "@/lib/site";
import { comDestaque } from "@/lib/texto";

/**
 * Artigo (DEC-093). Modo leitura: coluna de texto na medida (65ch), sumário à
 * direita no desktop, a resposta curta logo abaixo do título — é o trecho que
 * a busca e os assistentes de IA citam, então ele responde sozinho.
 *
 * Título menor que o das outras páginas internas: são frases longas, e em
 * caixa alta no tamanho do PageHeader ocupariam a tela inteira.
 *
 * Marcação: `Article` com autor e editor = a empresa, mais a trilha
 * (`BreadcrumbList`, emitida pelo Breadcrumb).
 */

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/artigos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = artigoPorSlug(slug);
  if (!a) return {};
  return {
    title: { absolute: `${a.titulo} | Munarim` },
    description: a.descricao,
    alternates: { canonical: `/artigos/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.descricao,
      publishedTime: a.publicado,
      locale: "pt_BR",
    },
  };
}

const dataBR = (iso: string) => iso.split("-").reverse().join("/");

function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((b, i) => {
        if (b.tipo === "p") return <p key={i}>{comDestaque(b.texto)}</p>;
        if (b.tipo === "lista")
          return (
            <ul key={i} className="space-y-3 border-l border-border pl-6">
              {b.itens.map((it) => (
                <li key={it}>{comDestaque(it)}</li>
              ))}
            </ul>
          );
        if (b.tipo === "conta")
          return (
            <figure key={i} className="bg-chrome p-6 text-barra lg:p-8">
              <figcaption className="spec text-muted">{b.titulo}</figcaption>
              <ol className="mt-4 space-y-2 font-mono text-[0.92rem] leading-relaxed">
                {b.linhas.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ol>
              <p className="spec mt-5 text-muted">{b.nota}</p>
            </figure>
          );
        return (
          <div key={i} className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.9rem] sm:text-[0.95rem]">
              {b.legenda && <caption className="spec mb-3 text-left text-muted">{b.legenda}</caption>}
              <thead>
                <tr className="border-b border-barra">
                  {b.cabecalho.map((c, j) => (
                    <th key={j} scope="col" className="spec py-3 pr-4 font-medium text-barra">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.linhas.map((l, j) => (
                  <tr key={j} className="border-b border-border">
                    {l.map((c, k) =>
                      k === 0 ? (
                        <th key={k} scope="row" className="py-3 pr-4 font-medium text-text">
                          {c}
                        </th>
                      ) : (
                        <td key={k} className="py-3 pr-4 text-muted">
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default async function ArtigoPage({ params }: PageProps<"/artigos/[slug]">) {
  const { slug } = await params;
  const a = artigoPorSlug(slug);
  if (!a) notFound();

  const outros = artigos.filter((o) => o.slug !== a.slug);
  const tiposCitados = a.tipos.map(getTipo).filter((t) => t !== undefined);
  const minutos = minutosDeLeitura(a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.descricao,
    abstract: a.respostaCurta,
    datePublished: a.publicado,
    dateModified: a.publicado,
    inLanguage: "pt-BR",
    mainEntityOfPage: `${site.url}/artigos/${a.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    about: a.secoes.map((s) => s.titulo),
  };

  return (
    <>
      <section className="border-b border-border bg-surface pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="container-site">
          <Breadcrumb
            trail={[
              { label: "Início", href: "/" },
              { label: "Artigos", href: "/artigos" },
              { label: a.titulo },
            ]}
          />
          <p data-revela className="spec mt-14 text-muted lg:mt-20">
            <time dateTime={a.publicado}>{dataBR(a.publicado)}</time> · {minutos} min de leitura
          </p>
          <h1
            data-revela
            className="mt-5 max-w-[24ch] text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.06] text-barra"
          >
            {a.titulo}
          </h1>
          <div data-revela className="mt-10 grid lg:mt-14 lg:grid-cols-12">
            <div className="border-l-2 border-barra pl-6 lg:col-span-7">
              <p className="spec text-muted">Resposta curta</p>
              <p className="measure mt-3 text-lg leading-relaxed text-text">{a.respostaCurta}</p>
            </div>
          </div>
        </div>
      </section>

      <Section density="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <article className="min-w-0 lg:col-span-7">
            {a.secoes.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-t`}
                className={`scroll-mt-[calc(var(--barra-h)+2rem)] ${i > 0 ? "mt-14 lg:mt-16" : ""}`}
              >
                <h2 id={`${s.id}-t`} className="text-barra">
                  {s.titulo}
                </h2>
                <div className="measure mt-6 space-y-5 leading-relaxed text-muted">
                  <Blocos blocos={s.blocos} />
                </div>
              </section>
            ))}

            <section aria-labelledby="fontes-t" className="mt-16 border-t border-border pt-8">
              <h2 id="fontes-t" className="spec text-muted">
                Fontes
              </h2>
              <ul className="measure mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {a.fontes.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside aria-label="Neste artigo" className="lg:col-span-4 lg:col-start-9">
            <Prende className="lg:sticky lg:top-[calc(var(--barra-h)+2rem)]">
              <p className="spec text-muted">Neste artigo</p>
              <ol className="mt-4 border-t border-border">
                {a.secoes.map((s) => (
                  <li key={s.id} className="border-b border-border">
                    <a
                      href={`#${s.id}`}
                      className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted hover:text-barra"
                    >
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>

              {tiposCitados.length > 0 && (
                <>
                  <p className="spec mt-10 text-muted">Tipos citados</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tiposCitados.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/escadas/${t.slug}`}
                          className="inline-flex min-h-11 items-center border border-border px-4 text-[0.92rem] text-barra hover:border-barra"
                        >
                          {t.nome}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Prende>
          </aside>
        </div>
      </Section>

      <Section density="dense" className="border-t border-border bg-chrome">
        <p className="spec text-muted">Leia também</p>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-3">
          {outros.map((o) => (
            <li key={o.slug} className="border-t border-barra/30">
              <Link
                href={`/artigos/${o.slug}`}
                className="group flex h-full flex-col justify-between gap-6 py-6"
              >
                <span className="text-[1.05rem] leading-snug text-barra group-hover:underline group-hover:underline-offset-4">
                  {o.titulo}
                </span>
                <span className="spec text-muted">{minutosDeLeitura(o)} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
