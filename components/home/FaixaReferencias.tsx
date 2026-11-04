import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { PinHorizontal } from "@/components/motion/PinHorizontal";
import { Container } from "@/components/ui/Container";
import { fotosIntercaladas } from "@/content/galeria";
import { getTipo, tipoSlugs } from "@/content/tipos";

/**
 * Faixa de fotos verticais — substitui os três slots vazios de "Obras" (DEC-048).
 *
 * Enquanto o acervo do cliente não chega (`CNT-003`), a faixa mostra imagens de
 * referência. O aviso disso fica na capa, uma vez só (DEC-051); aqui o título
 * não fala em "escadas instaladas" e a legenda só carrega o tipo, que é a única
 * legenda que `MEDIA_PLAN.md` permite em imagem que não é obra.
 *
 * Fotos intercaladas por tipo e sem a capa (que já apareceu duas vezes acima):
 * o olho compara tipos em vez de ver seis retas seguidas.
 */

const FOTOS = fotosIntercaladas(tipoSlugs, { inicio: 1, porTipo: 2 });

export function FaixaReferencias() {
  return (
    <PinHorizontal aria-labelledby="referencias-titulo" className="overflow-hidden bg-text text-primary-fg">
      <div className="flex min-h-svh flex-col justify-center gap-10 py-16 lg:pt-[calc(var(--barra-h)+1.5rem)] lg:pb-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="referencias-titulo" className="measure-display lg:col-span-7">
              Como cada escada ocupa a casa
            </h2>
            <p className="measure text-primary-fg-muted lg:col-span-5">
              A escada vence a altura inteira, do piso de baixo até o de cima. Role
              para ver os sete tipos, um depois do outro.
            </p>
          </div>
        </Container>

        <div
          data-janela
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:thin]"
        >
          <ul data-trilho className="flex w-max gap-3 px-6 will-change-transform lg:gap-4 lg:px-10">
            {FOTOS.map((foto, i) => {
              const tipo = getTipo(foto.slug);
              return (
                <li key={foto.src} className="w-[min(68vw,20rem)] shrink-0 snap-start lg:w-[min(22vw,calc((100svh-23rem)*2/3))]">
                  <Link href={`/escadas/${foto.slug}`} className="group block">
                    <div className="relative aspect-[2/3] overflow-hidden bg-[#1f2d3b]">
                      <Foto
                        foto={foto}
                        fill
                        sizes="(min-width: 1024px) 23vw, 68vw"
                        imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    </div>
                    <p className="mt-3 flex items-baseline gap-3">
                      <span aria-hidden="true" className="spec text-[0.75rem] text-primary-fg-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-semibold tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                        {tipo?.nome}
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
            <li className="flex w-[min(68vw,20rem)] shrink-0 snap-start lg:w-[min(22vw,calc((100svh-23rem)*2/3))]">
              <Link
                href="/escadas"
                className="flex aspect-[2/3] w-full flex-col justify-end border border-primary-fg/20 p-6 hover:border-primary-fg/60"
              >
                <span className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  Comparar os sete tipos lado a lado
                </span>
                <span className="mt-4 text-sm text-primary-fg-muted underline underline-offset-4">
                  Ir para o catálogo
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <Container>
          <div aria-hidden="true" className="h-px w-full bg-primary-fg/15">
            <div data-progresso className="h-px w-full origin-left bg-accent-wash" />
          </div>
        </Container>
      </div>
    </PinHorizontal>
  );
}
