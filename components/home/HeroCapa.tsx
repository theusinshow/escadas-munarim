"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { tipos } from "@/content/tipos";

/**
 * Capa de entrada: fundo tinta, imagem abrindo do centro e interface aparecendo
 * depois. O CTA da dobra leva ao catálogo, não ao orçamento (`DEC-001`).
 */

const SLIDES = tipos.filter((t) => t.imagem);
const PARADA = 4200;
const CRUZAMENTO = 700;
const MEDIA = "(prefers-reduced-motion: reduce)";

function assinarMovimento(aoMudar: () => void) {
  const mq = window.matchMedia(MEDIA);
  mq.addEventListener("change", aoMudar);
  return () => mq.removeEventListener("change", aoMudar);
}

function numero(valor: number) {
  return String(valor + 1).padStart(2, "0");
}

export function HeroCapa() {
  const [atual, setAtual] = useState(0);

  const semMovimento = useSyncExternalStore(
    assinarMovimento,
    () => window.matchMedia(MEDIA).matches,
    () => false,
  );

  useEffect(() => {
    if (semMovimento) return;
    const id = setInterval(
      () => setAtual((i) => (i + 1) % SLIDES.length),
      PARADA,
    );
    return () => clearInterval(id);
  }, [semMovimento]);

  const tipo = SLIDES[atual];

  return (
    <section
      aria-labelledby="capa-titulo"
      className="relative -mt-(--barra-h) overflow-hidden bg-[#16222E] text-primary-fg"
    >
      <div className="min-h-svh px-5 pt-[calc(var(--barra-h)+1.25rem)] pb-5 lg:px-10 lg:pt-[calc(var(--barra-h)+2rem)] lg:pb-10">
        <div className="capa-stage relative grid min-h-[calc(100svh-var(--barra-h)-2.5rem)] overflow-hidden lg:min-h-[calc(100svh-var(--barra-h)-4rem)]">
          <div className="grid min-h-[inherit] items-center gap-8 px-5 py-20 lg:block lg:px-10 lg:py-24">
            <Link
              href={`/escadas/${tipo.slug}`}
              className="capa-imagem group relative order-1 z-0 mx-auto block h-[52svh] w-full max-w-[25rem] overflow-hidden bg-shade lg:absolute lg:top-[9%] lg:bottom-[8%] lg:left-[50%] lg:h-auto lg:w-[34vw] lg:max-w-none xl:left-[52%] xl:w-[32vw]"
              aria-label={`Ver escada ${tipo.nome}`}
            >
              {SLIDES.map((t, i) => (
                <Image
                  key={t.slug}
                  src={t.imagem!.src}
                  alt={i === atual ? t.imagem!.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 34vw, 100vw"
                  style={{ transitionDuration: `${CRUZAMENTO}ms` }}
                  className={`object-cover transition-opacity ease-degrau motion-reduce:transition-none ${
                    i === atual ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="capa-ui capa-copy pointer-events-none absolute right-0 bottom-0 z-10 bg-[#16222E] px-4 py-4 text-right text-primary-fg lg:px-5 lg:py-5">
                <p className="spec text-primary-fg-muted">
                  {numero(atual)} / {numero(SLIDES.length - 1)}
                </p>
                <div className="mt-4">
                  <p className="spec text-primary-fg-muted">Tipo em destaque</p>
                  <p className="mt-2 font-display text-2xl leading-none font-semibold tracking-[-0.03em] lg:text-3xl">
                    Escada {tipo.nome}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="capa-ui capa-logo absolute bottom-5 left-5 z-20 lg:bottom-9 lg:left-10">
            <p className="font-display text-[clamp(3rem,7.4vw,7rem)] leading-[0.84] font-semibold tracking-[-0.035em] uppercase">
              Escadas
              <br />
              Munarim
            </p>
            <h1
              id="capa-titulo"
              className="mt-8 max-w-[14ch] font-body text-[clamp(2.2rem,4.8vw,5.3rem)] leading-[0.94] font-normal tracking-[-0.02em]"
            >
              Segurança e design, na medida exata do seu vão.
            </h1>
            <p className="spec mt-6 text-primary-fg-muted">
              São José — Grande Florianópolis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
