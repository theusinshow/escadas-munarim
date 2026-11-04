import Image from "next/image";
import { RotacaoFotos } from "@/components/media/RotacaoFotos";
import { ButtonLink } from "@/components/ui/Button";
import { capaDo, temReferencia } from "@/content/galeria";
import { tipos } from "@/content/tipos";
import { site } from "@/lib/site";

/**
 * Capa da home — texto e fotos em rotação (DEC-052).
 *
 * A estrutura vem do site de referência do desenvolvedor: texto à esquerda,
 * uma moldura vertical à direita girando as fotos do acervo. Aqui são as sete
 * capas do catálogo, uma por tipo, na ordem dos tipos. A cara continua a da
 * Munarim: fundo de tinta, logo em contorno, Archivo.
 *
 * O H1 segue sendo o nome da empresa (DEC-050): o logo é a primeira parte dele
 * e a frase é a segunda. "Vão" é definido no primeiro uso (DEC-002).
 *
 * Sem pedido de orçamento: a dobra leva à galeria e ao catálogo, que são
 * prova (DEC-001).
 */

const FOTOS = tipos.flatMap((tipo) => {
  const foto = capaDo(tipo.slug);
  return foto ? [foto] : [];
});

export function CapaGaleria() {
  return (
    <section
      aria-labelledby="capa-titulo"
      className="sobre-escuro bg-text text-primary-fg"
    >
      <div className="container-site grid min-h-[calc(100svh-var(--barra-h))] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-6">
          <h1 id="capa-titulo">
            <Image
              src="/marca/munarim-1a-sobre-escuro.svg"
              alt={`${site.name} — ${site.tagline}.`}
              width={525}
              height={155}
              priority
              unoptimized
              className="h-auto w-[min(70vw,17rem)] lg:w-72"
            />
            <span className="mt-10 block font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              Escada de concreto, sob medida para o seu vão.
            </span>
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-primary-fg-muted">
            Pré-moldada em concreto polido e feita na medida do vão da sua casa — a
            abertura na laje por onde a escada passa.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/obras" variant="claro">
              Ver a galeria
            </ButtonLink>
            <ButtonLink href="/escadas" variant="secondary">
              Os sete tipos
            </ButtonLink>
          </div>

          <p className="spec mt-10 flex flex-wrap gap-x-3 gap-y-1 text-primary-fg-muted">
            <span>
              {site.address.city} — {site.address.state}
            </span>
            <span aria-hidden="true">/</span>
            <span>Atende a Grande Florianópolis</span>
          </p>
          {temReferencia && (
            <p className="spec mt-3 text-[0.68rem] text-primary-fg-muted/70">
              IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)
            </p>
          )}
        </div>

        <RotacaoFotos
          fotos={FOTOS}
          descricao="Escadas de concreto dos sete tipos do catálogo — imagens de referência em rotação"
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="aspect-[4/5] w-full bg-[#1f2d3b] lg:col-span-5 lg:col-start-8 lg:aspect-[2/3] lg:w-[min(100%,calc((100svh-var(--barra-h)-8rem)*2/3))] lg:justify-self-end"
        />
      </div>
    </section>
  );
}
