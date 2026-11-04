import Image from "next/image";
import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { ButtonLink } from "@/components/ui/Button";
import { capaDo, temReferencia } from "@/content/galeria";
import { tipos } from "@/content/tipos";
import { site } from "@/lib/site";

/**
 * Capa da home — o lance de fotos (DEC-048, ampliada em DEC-050).
 *
 * As sete fotos verticais do catálogo viram sete colunas cujo topo desenha uma
 * escada. Nenhuma medida é escolhida: a largura da coluna é o **piso** e o
 * degrau entre uma coluna e a próxima é o **espelho**, na razão real 18/28 que
 * governa todo o motion do site (`DEC-010`). A capa é, literalmente, um lance
 * com sete degraus — um por tipo — e cada degrau leva à página do seu tipo.
 *
 * O nome da empresa é o H1, no logo em contorno, no meio da coluna: a linha em
 * degraus dele é o mesmo gesto do lance ao lado. O texto nunca fica sobre foto.
 *
 * Três blocos em grid com áreas, para a ordem mudar sem duplicar marcação:
 * no desktop, cabeça e apoio à esquerda e o lance à direita, sangrando até a
 * borda; no celular, cabeça → lance (com swipe) → apoio, para a escada inteira
 * caber na primeira tela.
 *
 * Server Component, sem estado. Entrada e hover são CSS puro em `globals.css`.
 * Sem CTA de orçamento: a dobra leva ao catálogo, que é prova (`DEC-001`).
 */

const DEGRAUS = tipos.flatMap((tipo) => {
  const foto = capaDo(tipo.slug);
  return foto ? [{ tipo, foto }] : [];
});

const atraso = (d: number) => ({ "--d": d }) as React.CSSProperties;

export function HeroCapa() {
  return (
    <section
      aria-labelledby="capa-titulo"
      className="capa sobre-escuro relative -mt-(--barra-h) overflow-hidden bg-text text-primary-fg"
    >
      <div className="capa-grade">
        {/* O H1 é o nome da empresa, desenhado: o logo 1a em contorno. O texto
            do H1 é o `alt` — leitor de tela e buscador leem "Escadas Munarim". */}
        <div className="capa-cabeca">
          <h1 id="capa-titulo" className="capa-entra" style={atraso(0)}>
            <Image
              src="/marca/munarim-1a-sobre-escuro.svg"
              alt={`${site.name} — ${site.tagline}`}
              width={525}
              height={155}
              priority
              unoptimized
              className="capa-logo"
            />
          </h1>
          <p className="capa-entra capa-sub" style={atraso(1)}>
            Escada de concreto, sob medida para o seu vão.
          </p>
        </div>

        {/* O lance. `--i` é o número do degrau; a altura sai dele em CSS. */}
        <nav aria-label="Os sete tipos de escada" className="capa-lance">
          <ol className="capa-degraus">
            {DEGRAUS.map(({ tipo, foto }, i) => (
              <li key={tipo.slug} className="capa-degrau" style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/escadas/${tipo.slug}`} className="capa-coluna group">
                  <div className="capa-foto">
                    <Foto
                      foto={foto}
                      fill
                      priority
                      sizes="(min-width: 1024px) 20vw, 30vw"
                      imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>
                  {/* Faixa sólida na base da coluna: o rótulo nunca fica sobre a
                      foto, e o topo de cada degrau fica limpo. */}
                  <span className="capa-rotulo">
                    <span className="spec text-[0.7rem] text-accent-wash/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="capa-nome">{tipo.nome.replace(/ \(.*\)$/, "")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="capa-apoio">
          <p className="capa-arraste spec text-primary-fg-muted" aria-hidden="true">
            Arraste para ver os sete →
          </p>
          {/* Dois botões do mesmo tamanho e da mesma família: "Ver modelos"
              cheio, "Como funciona" em contorno. Nenhum é o pedido de orçamento,
              que só aparece depois da prova (DEC-001). */}
          <div className="capa-entra flex flex-wrap items-center gap-3" style={atraso(2)}>
            <ButtonLink href="/escadas" variant="claro">
              Ver modelos
            </ButtonLink>
            <ButtonLink href="/como-funciona" variant="secondary">
              Como funciona
            </ButtonLink>
          </div>
          {temReferencia && (
            <p className="capa-entra spec mt-8 text-[0.68rem] text-primary-fg-muted/70" style={atraso(3)}>
              IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
