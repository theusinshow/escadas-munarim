"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { tipos } from "@/content/tipos";

/**
 * Slideshow do menu.
 *
 * Os slides vêm de `content/tipos` — a mesma fonte do catálogo. São os 7 tipos,
 * na ordem do catálogo, e a legenda é o nome oficial do tipo: se um nome ou uma
 * imagem mudar lá, aqui acompanha sem ninguém precisar lembrar.
 *
 * **Transição de passagem, não crossfade:** o novo entra pela direita e o
 * anterior sai pela esquerda em 22% — só `transform`, sem layout nem repaint.
 *
 * **No hover a passagem trava e a legenda aparece.** A legenda diz o *tipo*, que
 * é o que `MEDIA_PLAN.md` permite numa imagem gerada — nunca nome de cliente,
 * endereço, data ou metragem (`DEC-008`).
 *
 * Decorativo (`aria-hidden`, `alt=""`), legenda inclusive: os 7 tipos já estão
 * nomeados em texto na lista ao lado, então nada aqui é informação exclusiva —
 * e a legenda só existe no hover, que é interação de mouse.
 *
 * Com `prefers-reduced-motion` **não avança e não desliza**: fica parado no
 * primeiro. Avanço automático é movimento não solicitado.
 */

const SLIDES = tipos
  .filter((t) => t.imagem)
  .map((t) => ({ src: t.imagem!.src, modelo: t.nome }));

const INTERVALO = 4500;

export function Slideshow() {
  const [atual, setAtual] = useState(0);
  const [anterior, setAnterior] = useState<number | null>(null);
  const [parado, setParado] = useState(false);
  const semMovimento = useRef(false);

  const avancar = useCallback(() => {
    setAtual((i) => {
      setAnterior(i);
      return (i + 1) % SLIDES.length;
    });
  }, []);

  useEffect(() => {
    semMovimento.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento.current || parado) return;
    const id = setInterval(avancar, INTERVALO);
    return () => clearInterval(id);
  }, [avancar, parado]);

  /* Onde cada slide fica: o atual no lugar, o que acabou de sair à esquerda, o
     resto esperando à direita. O que espera à direita já está posicionado, então
     virar "atual" dispara a transição de 100% para 0 sozinho. */
  const posicao = (i: number) => {
    if (semMovimento.current) return i === atual ? "translate-x-0" : "translate-x-full";
    if (i === atual) return "translate-x-0";
    if (i === anterior) return "-translate-x-[22%]";
    return "translate-x-full";
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-shade"
      aria-hidden="true"
      onMouseEnter={() => setParado(true)}
      onMouseLeave={() => setParado(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-transform duration-900 ease-degrau ${posicao(i)}`}
          style={{ zIndex: i === atual ? 2 : i === anterior ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 80vw, 0px"
            className="object-cover"
          />
        </div>
      ))}

      {/* Fade de baixo em branco: mais curto e mais suave que uma tarja — ele
          esmaece a foto, não a corta. Como a legenda por cima é escura, não
          precisa chegar a opaco; por isso o pé para em 92% e a subida é longa. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[32%] bg-[linear-gradient(to_top,color-mix(in_srgb,var(--surface)_92%,transparent)_0%,color-mix(in_srgb,var(--surface)_62%,transparent)_45%,transparent_100%)]" />

      {/* Legenda do hover: sobe 8px e aparece. Sutil de propósito — ela informa,
          não anuncia. Fica no pé opaco do gradiente, junto dos marcadores. */}
      <div
        className={`pointer-events-none absolute bottom-8 left-8 z-20 transition-[opacity,transform] duration-500 ease-degrau ${
          parado ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {/* Escura, porque o fade agora é branco. O eyebrow vai em `--text` e não
            em `--muted` como no resto do site: sobre foto o fundo varia, e em
            `--muted` ele caía para 3,31:1 na Mista. A hierarquia aqui já vem do
            tamanho e do tracking. */}
        <p className="eyebrow text-text">Modelo</p>
        <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-text">
          {SLIDES[atual].modelo}
        </p>
      </div>

      {/* Marcador de posição: diz quantas são e onde estamos, sem número solto. */}
      <div className="absolute right-8 bottom-8 z-20 flex gap-1.5">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.src}
            className={`h-0.5 w-6 transition-colors duration-300 ${
              i === atual ? "bg-text" : "bg-text/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
