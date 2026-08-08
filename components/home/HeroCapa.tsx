"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { tipos } from "@/content/tipos";

/**
 * Capa da home. Três elementos, desenhados pelo desenvolvedor:
 *
 *   card + legenda   alto à esquerda, recuado da margem
 *   texto            alto à direita
 *   ESCADAS MUNARIM  embaixo à esquerda, em corpo grande
 *
 * **O fundo é `--primary` chapado, e a capa não reage ao cursor** (`DEC-040`).
 * Saíram juntos a foto atrás do navy, a janela que a revelava sob o mouse e o
 * campo de pontos — os dois gestos de ponteiro que `DEC-036` tinha registrado
 * como exceção nomeada, e que conviviam disputando a mesma seção. Com eles foi
 * também a placa de fundo sólido de cada bloco de texto: ela existia só para
 * cortar a foto por trás da tinta, e sobre navy chapado não pinta nada.
 *
 * O que sobrou é o que já se sustentava sem mouse — a capa do toque virou a
 * capa de todo mundo.
 *
 * **A troca no card é um crossfade e nada mais.** Ela é temporizada, não é
 * hover: sete fotos empilhadas, uma esmaece por cima da outra, e o card nunca
 * fica vazio. É o único movimento que a capa ainda tem.
 */

const SLIDES = tipos.filter((t) => t.imagem);

/** Tempo de cada tipo no card, e o cruzamento entre um e o seguinte. */
const PARADA = 4000;
const CRUZAMENTO = 700;

const MEDIA = "(prefers-reduced-motion: reduce)";

function assinarMovimento(aoMudar: () => void) {
  const mq = window.matchMedia(MEDIA);
  mq.addEventListener("change", aoMudar);
  return () => mq.removeEventListener("change", aoMudar);
}

export function HeroCapa() {
  const [atual, setAtual] = useState(0);

  const semMovimento = useSyncExternalStore(
    assinarMovimento,
    () => window.matchMedia(MEDIA).matches,
    () => false,
  );

  /* O ciclo virou um intervalo e mais nada. Quem pediu menos movimento fica no
     primeiro tipo, parado: a troca é atmosfera, e o nome do tipo está em texto
     na legenda de qualquer jeito. */
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
    /* `-mt-24` cancela o `pt-24` que o `main` reserva para a barra fixa: a capa
       começa no topo real da janela e tem `100svh` cheios, não `100svh - 96px`.
       A barra continua por cima — o respiro dela voltou como `pt` do grid, que
       é padding interno e não empurra a seção para baixo. */
    <section
      aria-labelledby="capa-titulo"
      className="relative -mt-24 overflow-hidden bg-primary text-primary-fg"
    >
      {/* Sem `Container`: a capa sangra. O gutter volta como padding do grid,
          porque card e parágrafo continuam precisando de margem para serem
          lidos — quem encosta na borda é o wordmark, e só ele.
          `min-h-svh` no grid e não na seção: `box-sizing: border-box` faz o
          padding caber dentro da altura, então a seção fecha em 100svh exatos. */}
      <div className="px-6 lg:px-10">
        <div className="relative grid min-h-svh grid-cols-12 gap-x-6 pt-38 pb-0 lg:pt-44">
          {/* Card, recuado da margem — o wordmark é que encosta nela.
              A célula não mudou de lugar nem de tamanho: o `w-[70%]` está na
              moldura, então o card encolheu 30% ancorado no mesmo canto alto à
              esquerda. A legenda fica de fora do corte porque é `w-fit` e se
              mede pela própria tinta — presa a 70% ela quebraria linha. */}
          <div className="col-span-12 self-start sm:col-span-7 lg:col-span-4 lg:col-start-2">
            <Link href={`/escadas/${tipo.slug}`} className="group block">
              {/* `aspect-3/2` e não `5/4`: as sete fotos são 3:2 exatos, e uma
                  moldura 5:4 sobre elas jogava fora 17% da largura com
                  `object-cover` — 8% de cada lado, e é justamente onde o pé e o
                  topo do lance costumam estar. Moldura na razão do arquivo é
                  crop zero. */}
              <div className="relative aspect-3/2 w-[70%] overflow-hidden border border-primary-fg/20 bg-shade">
                {/* Crossfade: as sete ficam empilhadas e só a da vez tem opacidade.
                    A que sai continua pintada durante o cruzamento, então o card
                    nunca pisca vazio — mesma garantia da persiana, sem o mecanismo.
                    Só `opacity`, que é composição: sete camadas por quadro sem
                    recalcular layout. */}
                <div className="absolute inset-0">
                  {SLIDES.map((t, i) => (
                    <Image
                      key={t.slug}
                      src={t.imagem!.src}
                      alt={i === atual ? t.imagem!.alt : ""}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 24vw, 63vw"
                      style={{ transitionDuration: `${CRUZAMENTO}ms` }}
                      className={`object-cover transition-opacity ease-degrau motion-reduce:transition-none ${
                        i === atual ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>

              </div>

              <p className="mt-4 w-fit bg-primary py-1 pr-4 text-lg group-hover:underline">
                Escada {tipo.nome}
                <span className="spec ml-3 text-primary-fg-muted">{tipo.destaque}</span>
              </p>
            </Link>
          </div>

          {/* Texto, alto à direita. A placa de fundo navy que embrulhava este
              bloco saiu com a foto (`DEC-040`): ela era `-mx-5 -my-4 px-5 py-4`,
              margem e padding que se anulavam exatamente, então existia só para
              pintar. Sobre navy chapado não pinta nada, e a tinta não se move
              um pixel sem ela. */}
          <div className="col-span-12 self-start sm:col-span-10 lg:col-span-4 lg:col-start-9">
            <h1 id="capa-titulo" className="text-2xl leading-snug font-semibold sm:text-3xl">
              Escadas de concreto pré-moldado, sob medida para o seu vão.
            </h1>
            <p className="mt-5 leading-relaxed text-primary-fg-muted">
              Sete tipos, cada um com o desenho e as medidas abertos para você comparar
              antes de decidir. Se você nunca comprou uma escada, este site foi escrito
              para você.
            </p>
          </div>

          {/* O nome, recuado 100px das duas bordas da janela.
              O afastamento mora aqui, na célula, e em um lugar só: `-ml-6`/
              `-ml-10` desfaz o gutter do grid para o zero voltar a ser a borda
              real da tela, e então `pl-25`/`pb-25` medem os 100px a partir dela
              (25 × 4px — a unidade base do sistema, não valor arbitrário).
              **Os 100px são de desktop.** Medido em 390px de largura: 100px são
              26% da tela, e o wordmark descolava do card e do parágrafo, que
              começam no gutter de 24px — a marca ficava flutuando no meio do
              azul em vez de assinar o canto. No celular o recuo é o próprio
              gutter (24px), então os três alinham na mesma vertical.
              Em caixa alta não há perna descendente: a base da tinta é a linha
              de base, ~0,065em acima da caixa de linha — 7px no corpo máximo. */}
          <div className="col-span-12 -ml-6 self-end pb-12 pl-6 lg:-ml-10 lg:pb-25 lg:pl-25">
            {/* A placa daqui saiu junto com a foto (`DEC-040`). O par que ela
                exigia — `py-6` para cobrir o transbordo da caixa de métricas
                sob `leading-[0.88]`, e `-mb-6` para devolver o excedente de
                baixo — se anulava na conta dos 100px, então **a tinta do
                wordmark não se move**: medido antes e depois, 100px da esquerda
                e base a 81px do pé no desktop, 24px e 42px no mobile. `w-fit` e
                `pr-6` foram junto: largura de placa não significa nada sem placa.

                O que muda: a caixa do `<p>` encolhe 48px, e no mobile isso
                reparte espaço livre no grid `min-h-svh` (o `align-content`
                padrão é `stretch`, e ali os três blocos são linhas separadas) —
                o h1 desce 8px. No desktop card e texto dividem a mesma linha e
                nada se desloca. 8px de folga redistribuída numa dobra que já
                tinha folga; se um dia incomodar, o conserto é `content-start`
                no grid, não devolver o padding. */}
            <p className="font-display text-[clamp(2rem,7.4vw,6.5rem)] leading-[0.88] font-semibold tracking-[-0.03em] uppercase">
              Escadas
              <br />
              Munarim
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
