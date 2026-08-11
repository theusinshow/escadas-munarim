"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { tipos } from "@/content/tipos";
import { comMovimento, jaVisivel, gsap, DUR, EASE, STAGGER } from "@/lib/motion";

/**
 * Capa da home. Quatro elementos, desenhados pelo desenvolvedor:
 *
 *   massa de concreto  canto inferior direito, fronteira em escada (`DEC-041`)
 *   card + legenda     alto à esquerda, recuado da margem
 *   texto              alto à direita
 *   lockup             embaixo à esquerda — nome, filete, descritor, linha de fatos
 *
 * **O fundo navy divide a dobra com uma massa de concreto claro, e a fronteira
 * entre as duas é uma escada** (`DEC-041`). São 7 lajes — uma por tipo — de
 * altura crescente; elas sobem em degraus na entrada e a da vez acende junto
 * com a troca do card, então a escada é também o índice do catálogo. A capa
 * continua sem reagir ao cursor: os dois gestos de ponteiro saíram no
 * `DEC-040` e não voltaram.
 *
 * O que sobrou é o que já se sustentava sem mouse — a capa do toque virou a
 * capa de todo mundo.
 *
 * **A troca no card é um crossfade e nada mais.** Ela é temporizada, não é
 * hover: sete fotos empilhadas, uma esmaece por cima da outra, e o card nunca
 * fica vazio. Já não é o único movimento da capa — a escada soma a entrada em
 * degraus e o indicador de 4 segundos que acende junto com o card (`DEC-041`)
 * — mas segue sendo o único movimento *dentro* do card em si.
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
  const escadaRef = useRef<HTMLDivElement>(null);

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

  /* A entrada da escada. Nenhum número é escolhido: a duração é piso mais
     espelho (`DUR + STAGGER` = 0,46s) e o grupo escalona por um espelho
     (`STAGGER` = 0,18s). Com 7 lajes são 6 intervalos, que dão 1,08s — o teto
     de stagger que `lib/motion.ts` já documentava. A contagem vem do catálogo
     e bateu com o teto sozinha.

     O estado inicial é aplicado por JS, nunca por CSS (`DEC-018`): o HTML
     estático já sai com a massa de pé, e só animamos se `jaVisivel` disser que
     ninguém teve tempo de ler. Se o bundle demorar, a pessoa vê a escada
     pronta em vez de vê-la sumir e voltar. */
  useEffect(() => {
    const el = escadaRef.current;
    if (!el || jaVisivel(el)) return;

    const mm = comMovimento(() => {
      gsap.fromTo(
        el.querySelectorAll(".capa-laje"),
        { scaleY: 0, transformOrigin: "50% 100%" },
        {
          scaleY: 1,
          duration: DUR + STAGGER,
          ease: EASE,
          stagger: { each: STAGGER, amount: STAGGER * 6 },
        },
      );
    }, el);

    return () => {
      mm.revert();
    };
  }, []);

  const tipo = SLIDES[atual];

  return (
    /* `-mt-(--barra-h)` cancela o `pt-(--barra-h)` que o `main` reserva para a
       barra fixa: a capa começa no topo real da janela e tem `100svh` cheios,
       não `100svh` menos a barra. Os dois são o mesmo token justamente porque
       têm que se anular — escritos como dois literais, mexer em um só deixaria
       a capa com uma faixa de sobra ou de falta que nada no código explica.
       A barra continua por cima — o respiro dela voltou como `pt` do grid, que
       é padding interno e não empurra a seção para baixo. */
    <section
      aria-labelledby="capa-titulo"
      className="relative -mt-(--barra-h) overflow-hidden bg-primary text-primary-fg"
    >
      {/* A massa de concreto, primeiro filho de propósito: ela e o grid são os
          dois elementos posicionados da seção, e a ordem no DOM é o que faz o
          grid pintar por cima sem precisar de `z-index`.

          As 7 lajes são os 7 tipos: a da vez acende junto com a troca do card,
          no mesmo `setInterval` — não entra relógio novo. O indicador é
          redundante por construção, porque a legenda do card nomeia o tipo em
          texto; por isso as lajes são `aria-hidden` sem perda de informação. */}
      <div className="capa-escada" aria-hidden="true" ref={escadaRef}>
        {SLIDES.map((t, i) => (
          <span
            key={t.slug}
            className="capa-laje"
            data-vez={i === atual ? "true" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Sem `Container`: a capa sangra. O gutter volta como padding do grid,
          porque card e parágrafo continuam precisando de margem para serem
          lidos — quem encosta na borda são o wordmark e a massa de concreto
          (`DEC-041`), mais ninguém.
          `min-h-svh` no grid e não na seção: `box-sizing: border-box` faz o
          padding caber dentro da altura, então a seção fecha em 100svh exatos. */}
      <div className="px-6 lg:px-10">
        {/* `gap-x-(--capa-gap)` e não `gap-x-6`: a largura da massa de
            concreto (`.capa-escada`, `app/globals.css`) deriva algebricamente
            deste gap, então os dois precisam do mesmo número sempre — daí o
            token em vez de dois literais que podem divergir em silêncio. */}
        <div className="relative grid min-h-svh grid-cols-12 gap-x-(--capa-gap) pt-38 pb-0 lg:pt-44">
          {/* Card. **No desktop ele começa na mesma vertical do lockup**, e não
              no gutter do grid: card, legenda e wordmark passam a assinar uma
              régua só a 100px da borda da janela. Antes a célula era
              `lg:col-start-2` e a moldura levava `w-[70%]`, o que punha a borda
              esquerda do card em x=193 contra os x=100 do wordmark logo abaixo
              — 93px de desencontro entre os dois maiores blocos do canto
              esquerdo, sem nada que os explicasse.
              O recuo não é remedido aqui: é o **mesmo par** `-ml-10`/`pl-25` da
              célula do lockup (desfaz o gutter para o zero voltar a ser a borda
              real da tela, e então mede 100px a partir dela). Sendo o mesmo
              mecanismo e não dois números iguais por coincidência, os dois não
              têm como divergir.
              Com a esquerda presa em 100px, o `w-[70%]` da moldura perdeu a
              função: a largura agora é a própria célula, então o card vai da
              régua dos 100px até a linha da coluna 4 do grid — as duas bordas
              passam a cair em algo, e ele cresce ~28% no caminho. Abaixo de
              `lg` nada muda: lá o lockup já recua pelo próprio gutter, o card
              sempre esteve nessa vertical, e o corte de 70% continua valendo
              porque a massa de concreto divide a tela com ele.
              A legenda fica de fora do corte porque é `w-fit` e se mede pela
              própria tinta — presa a 70% ela quebraria linha. */}
          <div className="col-span-12 self-start sm:col-span-7 lg:col-span-4 lg:col-start-1 lg:-ml-10 lg:pl-25">
            <Link href={`/escadas/${tipo.slug}`} className="group block">
              {/* `aspect-3/2` e não `5/4`: as sete fotos são 3:2 exatos, e uma
                  moldura 5:4 sobre elas jogava fora 17% da largura com
                  `object-cover` — 8% de cada lado, e é justamente onde o pé e o
                  topo do lance costumam estar. Moldura na razão do arquivo é
                  crop zero. */}
              <div className="relative aspect-3/2 w-[70%] overflow-hidden border border-primary-fg/20 bg-shade lg:w-full">
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
                      sizes="(min-width: 1024px) 30vw, 63vw"
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
              Segurança e design, na medida exata do seu vão.
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
              de base, ~0,065em acima da caixa de linha — 5,7px no corpo
              máximo (o corpo caiu de 104px para 88px no lockup abaixo; a
              proporção é a mesma, o número em px não é). */}
          <div className="col-span-12 -ml-6 self-end pb-12 pl-6 lg:-ml-10 lg:pb-25 lg:pl-25">
            {/* O lockup (`DEC-041`). O nome deixou de vir sozinho: filete,
                descritor e linha de fatos abaixo dele. O corpo caiu de 104px
                para 88px porque 104 contra um descritor de 24px lê como nome
                gigante com nota de rodapé (razão 4,3:1) em vez de lockup; a
                88px fecha em 3,7:1 e o bloco cola. Isso aproxima o wordmark do
                teto de display do sistema (72px) e reduz — sem eliminar — a
                exceção nomeada do `DEC-031`.

                `max-w` no mobile não é estética: a massa de concreto começa em
                x=207 numa tela de 390, e sem trava o descritor passaria por
                baixo dela.

                O par `py-6`/`-mb-6` da antiga placa não voltou: ele existia
                para cobrir foto, e a foto saiu no `DEC-040`. */}
            <div className="capa-lockup max-w-[183px] sm:max-w-none">
              {/* `w-fit` no envelope: o filete se mede pela tinta do nome, não
                  pela coluna do grid. */}
              <div className="w-fit">
                <p className="font-display text-[clamp(1.75rem,6.1vw,5.5rem)] leading-[0.88] font-semibold tracking-[-0.03em] uppercase">
                  Escadas
                  <br />
                  Munarim
                </p>
                <hr className="mt-4 border-0 border-t border-primary-fg/40" />
              </div>
              <p className="capa-descritor mt-3 max-w-[44ch]">
                Escadas pré-moldadas de concreto polido, sob medida.
              </p>
              <p className="spec mt-2 text-primary-fg-muted">SETE TIPOS · 15 ANOS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
