"use client";

import Link from "next/link";
import { useRef } from "react";
import { Foto } from "@/components/media/Foto";
import { Rotulo } from "@/components/ui/Rotulo";
import { capaDo, fotosDo } from "@/content/galeria";
import { tipos } from "@/content/tipos";

/**
 * Galeria em trilho (DEC-067). A estrutura de "produtos em destaque" da
 * referência: faixa clara, texto à esquerda e um carrossel de cards à direita,
 * com as setas no alto. Arrasto e rolagem pelo próprio navegador
 * (scroll-snap); as setas só rolam um card.
 */

const CARDS = tipos
  .map((t) => ({ slug: t.slug, nome: t.nome, foto: fotosDo(t.slug)[1] ?? capaDo(t.slug) }))
  .filter((c) => c.foto);

function Seta({ dir }: { dir: "esq" | "dir" }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
      <path
        d={dir === "esq" ? "M8.5 1.5 2 8l6.5 6.5" : "M1.5 1.5 8 8l-6.5 6.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function GaleriaTrilho() {
  const trilho = useRef<HTMLUListElement>(null);
  const rolar = (sentido: 1 | -1) => {
    const el = trilho.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: sentido * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-surface py-28 text-barra lg:py-40">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6" data-revela>
          <Rotulo>Galeria</Rotulo>
          <Link href="/obras" className="btn-chanfro-escuro">
            Ver todas
          </Link>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 data-revela className="text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.12]">
              Cada tipo pronto, em concreto
            </h2>
            <p data-revela className="mt-6 max-w-[40ch] text-[1.02rem] leading-relaxed text-muted">
              Reta, caracol, leke, mista, premium, espelho fechado e in loco: veja como cada uma
              fica no lugar antes de escolher a sua.
            </p>
            <div className="mt-10 flex gap-3" data-revela>
              <button
                type="button"
                onClick={() => rolar(-1)}
                className="flex size-11 items-center justify-center border border-barra/40 hover:bg-barra hover:text-primary-fg"
              >
                <span className="sr-only">Anterior</span>
                <Seta dir="esq" />
              </button>
              <button
                type="button"
                onClick={() => rolar(1)}
                className="flex size-11 items-center justify-center border border-barra/40 hover:bg-barra hover:text-primary-fg"
              >
                <span className="sr-only">Próxima</span>
                <Seta dir="dir" />
              </button>
            </div>
          </div>

          <ul
            ref={trilho}
            className="trilho -mr-[max(1.5rem,calc((100vw-var(--container))/2+2.5rem))] lg:col-span-8"
            data-revela
          >
            {CARDS.map((c) => (
              <li key={c.slug} className="w-[17rem] lg:w-[19rem]">
                <div className="group relative aspect-[3/4] overflow-hidden bg-barra/10">
                  {c.foto && (
                    <Foto
                      foto={c.foto}
                      fill
                      sizes="19rem"
                      imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <h3 className="mt-6 font-display text-[1.25rem] uppercase">{c.nome}</h3>
                <Link href={`/escadas/${c.slug}`} className="btn-chanfro-escuro mt-6">
                  Ver
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="w-px" />
          </ul>
        </div>
      </div>
    </section>
  );
}
