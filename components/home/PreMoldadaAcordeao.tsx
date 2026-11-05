"use client";

import Link from "next/link";
import { useState } from "react";
import { Foto } from "@/components/media/Foto";
import { Rotulo } from "@/components/ui/Rotulo";
import { fotosDo } from "@/content/galeria";

/**
 * Pré-moldada ou no local (DEC-067). A estrutura de "soluções" da
 * referência: foto à esquerda, acordeão de títulos grandes à direita com o
 * círculo de mais/menos. O conteúdo é o de antes (DEC-051): a comparação com
 * a escada concretada no local e o vocabulário definido no primeiro uso
 * (DEC-002). Nenhum dado novo, nenhum prazo (CNT-005).
 *
 * DEC-075: a foto troca com o tema — pré-moldada mostra uma reta, no local
 * mostra um in loco; os itens de vocabulário mantêm a última. DEC-083: a foto
 * tem proporção fixa (4:5) e fica presa na rolagem; o rótulo, o título e o
 * acordeão ficam na coluna da direita, alinhados ao topo da foto.
 */

const ITENS: { titulo: string; sub: string; texto: string; link?: { href: string; label: string } }[] = [
  {
    titulo: "Pré-moldada",
    sub: "Moldada antes, fora da obra.",
    texto:
      "A escada é concretada em fôrma, curada e polida antes de chegar na sua casa. Ela chega pronta para assentar, com acabamento de concreto polido que sai da fôrma, não de reboco.",
    link: { href: "/como-funciona", label: "Como funciona" },
  },
  {
    titulo: "No local (in loco)",
    sub: "Concretada dentro da obra.",
    texto:
      "Fôrma, escoramento e concreto ficam dentro de casa, e a obra espera a cura no lugar. É o caminho para a geometria que não comporta uma peça pré-moldada.",
    link: { href: "/escadas/in-loco", label: "Ver o in loco" },
  },
  {
    titulo: "Obra parada e sujeira",
    sub: "A maior diferença no dia a dia da obra.",
    texto:
      "Na pré-moldada, fôrma e concretagem acontecem fora: a peça chega curada. No local, a obra para até o concreto curar, e a sujeira fica dentro de casa.",
  },
  {
    titulo: "Vão",
    sub: "A primeira medida.",
    texto: "A abertura na laje por onde a escada passa — o espaço já previsto no projeto da casa.",
  },
  {
    titulo: "Pé-direito",
    sub: "Define quantos degraus a escada tem.",
    texto:
      "A altura do piso de baixo até o piso de cima, contando o acabamento dos dois. O número de degraus não se escolhe: ele sai dessa conta.",
  },
  {
    titulo: "Espelho e piso",
    sub: "O conforto da subida.",
    texto:
      "A altura e a profundidade de cada degrau. A relação entre os dois decide se a subida é confortável ou cansativa.",
  },
];

const FOTO_PM = fotosDo("reta")[3] ?? fotosDo("reta")[0];
const FOTO_LOCAL = fotosDo("in-loco")[1] ?? FOTO_PM;
const FOTOS = [FOTO_PM, FOTO_LOCAL].filter((f): f is NonNullable<typeof f> => Boolean(f));
/** Qual foto cada item mostra: 0 = pré-moldada, 1 = no local. */
const FOTO_DO_ITEM = [0, 1, 1, 0, 0, 0];

export function PreMoldadaAcordeao() {
  const [aberto, setAberto] = useState(0);
  const [foto, setFoto] = useState(0);

  return (
    <section className="bg-surface py-24 text-barra lg:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          {FOTOS.length > 0 && (
            <div
              data-revela
              className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-[calc(var(--barra-h)+2rem)] lg:col-span-5"
            >
              {FOTOS.map((f, i) => (
                <div
                  key={f.src}
                  aria-hidden={i !== foto}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === foto ? "opacity-100" : "opacity-0"}`}
                >
                  <Foto foto={f} fill sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
              ))}
            </div>
          )}

          <div className="lg:col-span-6 lg:col-start-7">
            <div data-revela>
              <Rotulo>Pré-moldada ou no local</Rotulo>
            </div>
            <h2 data-revela className="mt-8 max-w-[20ch] text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08]">
              Duas formas de fazer a mesma escada
            </h2>
            <ul className="mt-12 border-b border-barra/25" data-revela>
              {ITENS.map((it, i) => {
                const estaAberto = aberto === i;
                const id = `pm-${i}`;
                return (
                  <li key={it.titulo} className="border-t border-barra/25">
                    <button
                      type="button"
                      aria-expanded={estaAberto}
                      aria-controls={id}
                      onClick={() => {
                        setAberto(estaAberto ? -1 : i);
                        if (!estaAberto) setFoto(FOTO_DO_ITEM[i] ?? 0);
                      }}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.9rem)] leading-tight uppercase">
                        {it.titulo}
                      </h3>
                      <span className="sinal-mais" aria-hidden="true" />
                    </button>
                    <div id={id} className="abre" data-aberto={estaAberto}>
                      <div>
                        <div className="max-w-[60ch] pb-10">
                          <p className="font-semibold">{it.sub}</p>
                          <p className="mt-4 leading-relaxed text-chrome-muted">{it.texto}</p>
                          {it.link && (
                            <Link href={it.link.href} className="btn-chanfro-escuro mt-8">
                              {it.link.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-10" data-revela>
              <Link href="/duvidas" className="btn-chanfro-escuro">
                Todas as dúvidas
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
