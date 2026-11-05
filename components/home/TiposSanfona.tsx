"use client";

import Link from "next/link";
import { useState } from "react";
import { Foto } from "@/components/media/Foto";
import { capaDo } from "@/content/galeria";
import { tipos } from "@/content/tipos";

/**
 * Os sete tipos em sanfona (DEC-067). A estrutura de "projetos" da
 * referência: painéis estreitos com o nome na vertical e o número no pé; o
 * painel ativo abre e mostra a foto e o botão (a frase de destaque saiu no
 * DEC-084). Hover,
 * foco ou clique ativam. No celular vira sanfona vertical.
 *
 * Os sete continuam com o mesmo tratamento — é comparação (DEC-009).
 * DEC-083: sem rótulo, sem "comparar os sete" e sem o aviso de referência;
 * a seção começa direto na sanfona.
 */

const ITENS = tipos.map((t, i) => ({
  ...t,
  n: String(i + 1).padStart(2, "0"),
  foto: capaDo(t.slug),
}));

export function TiposSanfona() {
  const [ativo, setAtivo] = useState(0);

  return (
    <section className="bg-barra py-28 text-primary-fg lg:py-40">
      <div className="container-site">
        <h2 className="sr-only">Os sete tipos de escada</h2>

        {/* Desktop */}
        <ul className="sanfona-h hidden border-l border-white/25 lg:flex" data-revela>
          {ITENS.map((t, i) => {
            const aberto = ativo === i;
            const id = `tipo-painel-${t.slug}`;
            return (
              <li
                key={t.slug}
                data-ativo={aberto}
                onMouseEnter={() => setAtivo(i)}
                className="flex overflow-hidden border-r border-white/25"
              >
                <button
                  type="button"
                  aria-expanded={aberto}
                  aria-controls={id}
                  onClick={() => setAtivo(i)}
                  onFocus={() => setAtivo(i)}
                  className="flex h-full w-[4.5rem] flex-none flex-col items-center justify-between py-1 xl:w-[5.5rem]"
                >
                  {/* Sem o parêntese: "In loco (cascata)" na vertical não cabe na altura. */}
                  <span className="titulo-vertical font-display text-[1.2rem] whitespace-nowrap uppercase xl:text-[1.35rem]">
                    {t.nome.replace(/\s*\(.*\)/, "")}
                  </span>
                  <span className="titulo-vertical font-display text-[1.2rem] xl:text-[1.35rem]">{t.n}</span>
                </button>
                <div
                  id={id}
                  inert={!aberto}
                  className="sanfona-corpo flex w-[clamp(18rem,32vw,30rem)] flex-none flex-col gap-6 pr-8"
                >
                  {/* A foto ocupa a altura que sobra: retrato, como as fotos são. */}
                  <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-white/5">
                    {t.foto && <Foto foto={t.foto} fill sizes="30rem" />}
                  </div>
                  <div>
                    <Link href={`/escadas/${t.slug}`} className="btn-chanfro">
                      Conhecer a escada
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Celular */}
        <ul className="border-t border-white/25 lg:hidden">
          {ITENS.map((t, i) => {
            const aberto = ativo === i;
            const id = `tipo-m-${t.slug}`;
            return (
              <li key={t.slug} className="border-b border-white/25">
                <button
                  type="button"
                  aria-expanded={aberto}
                  aria-controls={id}
                  onClick={() => setAtivo(aberto ? -1 : i)}
                  className="flex min-h-16 w-full items-center gap-5 text-left"
                >
                  <span className="font-mono text-xs text-primary-fg-muted">{t.n}</span>
                  <span className="flex-1 font-display text-[1.25rem] uppercase">{t.nome}</span>
                  <span className="sinal-mais bg-primary-fg-muted!" aria-hidden="true" />
                </button>
                <div id={id} className="abre" data-aberto={aberto}>
                  <div>
                    <div className="pb-8">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {t.foto && <Foto foto={t.foto} fill sizes="100vw" />}
                      </div>
                      <Link href={`/escadas/${t.slug}`} className="btn-chanfro mt-6">
                        Conhecer a escada
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
