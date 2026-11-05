import Link from "next/link";
import { Figura } from "@/components/technical/Figura";
import { CartaoVira } from "@/components/ui/CartaoVira";
import { Rotulo } from "@/components/ui/Rotulo";
import { passos } from "@/content/processo";

/**
 * Como funciona (DEC-067 → DEC-083 → DEC-088). Rótulo à esquerda e título à
 * direita na mesma linha; embaixo, as quatro etapas como cartões que viram.
 * Na frente, o desenho técnico num painel branco (o desenho é o conteúdo,
 * DEC-009), o número e o nome; no verso, em azul, o resumo, a primeira
 * explicação da etapa e o link para a página do processo. Fundo chumbo
 * (DEC-075). O cartão cresce até caber o verso; quatro colunas só a partir
 * do xl (DEC-089).
 */

/** O texto de `detalhe` marca o termo definido com **…**; aqui vai sem. */
const semMarca = (t: string) => t.replace(/\*\*/g, "");

export function ProcessoCards() {
  return (
    <section className="bg-chumbo py-24 text-primary-fg lg:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-3 lg:pt-3" data-revela>
            <Rotulo>Como funciona</Rotulo>
          </div>
          <h2
            data-revela
            className="max-w-[22ch] text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08] lg:col-span-9"
          >
            Da medida do vão à escada assentada, em quatro etapas
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {passos.map((p) => (
            <li key={p.step} data-revela className="grid">
              <CartaoVira
                rotulo={p.titulo}
                frente={
                  <span className="flex min-h-full flex-col justify-between bg-surface p-6 text-barra">
                    <span className="flex items-start justify-between">
                      <span className="font-mono text-xs text-chrome-muted">{p.numero}</span>
                      <span className="font-label text-[0.72rem] tracking-[0.16em] text-chrome-muted uppercase">
                        Virar ↻
                      </span>
                    </span>
                    <Figura nome={p.step} titulo={`Desenho da etapa: ${p.titulo}`} className="w-full" />
                    <span className="font-display text-[1.15rem] leading-tight uppercase">{p.titulo}</span>
                  </span>
                }
                verso={
                  <div className="flex min-h-full flex-col bg-barra p-6 pr-14 text-primary-fg">
                    <span className="font-mono text-xs text-primary-fg-muted">{p.numero}</span>
                    <h3 className="mt-4 font-display text-[1.15rem] leading-tight uppercase">{p.titulo}</h3>
                    <p className="mt-5 text-[0.95rem] leading-relaxed font-semibold">{p.resumo}</p>
                    <p className="mt-3 text-[0.88rem] leading-relaxed text-primary-fg-muted">
                      {semMarca(p.detalhe[0] ?? "")}
                    </p>
                    <Link
                      href="/como-funciona"
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start font-label text-[0.72rem] tracking-[0.16em] uppercase underline-offset-4 hover:underline"
                    >
                      A etapa em detalhe <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                }
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
