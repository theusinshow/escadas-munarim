"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Foto } from "@/components/media/Foto";
import { Figura } from "@/components/technical/Figura";
import { fotosDo } from "@/content/galeria";
import { tipos } from "@/content/tipos";

/**
 * Capa "do desenho à escada" (DEC-097).
 *
 * Os cinco tipos passam sozinhos, em três tempos: o desenho se monta peça por
 * peça, uma frente em forma de escada sobe pela tela abrindo a foto do tipo, e
 * a mesma frente segue subindo, tirando a foto e revelando o próximo desenho.
 * A frente é uma escada de verdade: espelho e piso na razão 18/28 do site
 * (DEC-010), com um filete azul na borda.
 *
 * São duas camadas iguais, papel (texto azul) e foto (texto branco), então o
 * título troca de cor exatamente na linha dos degraus. A da foto é decorativa
 * para o leitor de tela (`aria-hidden`).
 *
 * Sem JS ou com `reduce`, fica o primeiro desenho parado e nada passa sozinho.
 * Com movimento, o desenho só aparece quando o JS assume (`.capa-sobe-peca` em
 * globals.css), senão ele piscaria antes de se montar. "Pausar" atende a WCAG
 * 2.2.2, e o ciclo também para fora da tela e com o menu da barra aberto.
 */

/** A barra marca o <html> enquanto o painel ou a gaveta estão abertos. */
const menuAberto = () => document.documentElement.hasAttribute("data-menu-aberto");

/** Qual foto do acervo cada tipo abre. A primeira, se não estiver aqui. */
const FOTO_DO_TIPO: Record<string, number> = { reta: 1 };

const ITENS = tipos.map((t) => ({
  slug: t.slug,
  nome: t.nome,
  foto: fotosDo(t.slug)[FOTO_DO_TIPO[t.slug] ?? 0],
}));

const CLASSE_TITULO =
  "font-display max-w-[14ch] text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[0.98] tracking-[-0.01em] uppercase [text-wrap:balance]";

/** Espelho/piso dos degraus da frente: 18/28, a razão do `stepIn`. */
const RAZAO = 18 / 28;

/**
 * O polígono da frente. O perfil é uma escada subindo para a direita, com o pé
 * em `base`; `sob` é a região abaixo dele (a foto entrando) e `sobre`, a de
 * cima (a foto saindo). Mesmo número de pontos nos dois, para não dar salto.
 */
function poligono(
  largura: number,
  altura: number,
  degraus: number,
  espelho: number,
  base: number,
  lado: "sob" | "sobre",
) {
  const piso = largura / degraus;
  const pontos: string[] = [];
  for (let k = 0; k < degraus; k++) {
    const y = base + (degraus - 1 - k) * espelho;
    pontos.push(`${k * piso}px ${y}px`, `${(k + 1) * piso}px ${y}px`);
  }
  const borda =
    lado === "sob"
      ? Math.max(altura, base + degraus * espelho) + 1
      : Math.min(0, base) - 1;
  return `polygon(0px ${borda}px, ${pontos.join(", ")}, ${largura}px ${borda}px)`;
}

function Textos({ tom }: { tom: "papel" | "foto" }) {
  const claro = tom === "foto";
  return (
    <div
      className={`container-site relative pt-8 lg:pt-12 ${claro ? "text-primary-fg" : "text-barra"}`}
    >
      {claro ? (
        <p className={CLASSE_TITULO}>Escadas de concreto sob medida</p>
      ) : (
        <h1 id="capa-titulo" className={CLASSE_TITULO}>
          Escadas de concreto sob medida
        </h1>
      )}
    </div>
  );
}

export function CapaSobe() {
  const [iFoto, setIFoto] = useState(0);
  /* Foto só entra no DOM no ciclo anterior ao dela, e nenhuma entra com
     `reduce`: quem não vai ver a animação não baixa as fotos. */
  const [montadas, setMontadas] = useState<number[]>([]);
  const [pausado, setPausado] = useState(false);

  const palco = useRef<HTMLElement>(null);
  const camadaFoto = useRef<HTMLDivElement>(null);
  const camadaFilete = useRef<HTMLDivElement>(null);
  const linhaAtual = useRef<gsap.core.Timeline | null>(null);
  const pausadoRef = useRef(false);

  useEffect(() => {
    const raiz = palco.current;
    const foto = camadaFoto.current;
    const filete = camadaFilete.current;
    if (!raiz || !foto || !filete) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frente = { p: 0 };
    let lado: "sob" | "sobre" = "sob";
    let visivel = true;

    const parada = () => pausadoRef.current || !visivel || menuAberto();

    const pinta = () => {
      const largura = raiz.clientWidth;
      const altura = raiz.clientHeight;
      const degraus = largura < 640 ? 5 : largura < 1024 ? 6 : 8;
      const espelho = (largura / degraus) * RAZAO;
      const fio = espelho * 0.22;
      /* De todo abaixo da tela até todo acima, contando o filete. */
      const inicio = altura + fio;
      const fim = -(degraus - 1) * espelho - fio;
      const base = inicio + frente.p * (fim - inicio);
      foto.style.clipPath = poligono(largura, altura, degraus, espelho, base, lado);
      /* O filete vai à frente da foto ao entrar e atrás dela ao sair. */
      filete.style.clipPath = poligono(
        largura,
        altura,
        degraus,
        espelho,
        lado === "sob" ? base - fio : base + fio,
        lado,
      );
    };

    const desenho = (i: number) => raiz.querySelector<HTMLElement>(`[data-desenho="${i}"]`);

    /* Monta na ordem do desenho, que vai do fundo para a frente: chão, parede
       e os degraus por último. `from` respeita a opacidade própria das linhas
       finas do desenho. */
    const montar = (i: number) => {
      const pecas = desenho(i)?.querySelectorAll("svg > *");
      if (!pecas?.length) return gsap.timeline();
      return gsap.from(pecas, {
        opacity: 0,
        y: -22,
        duration: 0.55,
        ease: "power3.out",
        stagger: { amount: 1.3 },
        clearProps: "opacity,transform",
      });
    };

    const trocaDesenho = (de: number, para: number) => {
      gsap.set(desenho(de), { visibility: "hidden" });
      gsap.set(desenho(para), { visibility: "visible" });
    };

    const ciclo = (i: number) => {
      const proximo = (i + 1) % ITENS.length;
      /* O próximo já carrega enquanto este passa. */
      setMontadas((m) => (m.includes(proximo) ? m : [...m, proximo]));

      const camadas = [foto, filete];
      const imagem = raiz.querySelector(`[data-foto="${i}"]`);
      const tl = gsap.timeline({ onComplete: () => ciclo(proximo) });

      /* Sobe: abre a foto. */
      tl.call(
        () => {
          lado = "sob";
          frente.p = 0;
          pinta();
          gsap.set(camadas, { visibility: "visible" });
        },
        undefined,
        0.9,
      );
      tl.to(frente, { p: 1, duration: 1.3, ease: "power3.inOut", onUpdate: pinta }, 0.9);
      if (imagem) tl.fromTo(imagem, { scale: 1.1 }, { scale: 1, duration: 5, ease: "sine.out" }, 0.9);

      /* Foto inteira. O papel troca escondido embaixo dela. */
      tl.call(() => trocaDesenho(i, proximo), undefined, 4.6);

      /* Segue subindo: tira a foto e revela o próximo desenho. */
      tl.call(
        () => {
          lado = "sobre";
          frente.p = 0;
          pinta();
        },
        undefined,
        4.8,
      );
      tl.to(frente, { p: 1, duration: 1.3, ease: "power3.inOut", onUpdate: pinta }, 4.8);
      /* A frente começa devagar: o desenho já some antes de aparecer o papel. */
      tl.add(() => {
        tl.add(montar(proximo), tl.time());
      }, 4.9);

      tl.call(
        () => {
          gsap.set(camadas, { visibility: "hidden" });
          setIFoto(proximo);
        },
        undefined,
        6.1,
      );
      tl.to({}, { duration: 0.6 }, 6.1);

      linhaAtual.current = tl;
      if (parada()) tl.pause();
    };

    gsap.set(desenho(0), { visibility: "visible" });
    const entrada = gsap.timeline({ onComplete: () => ciclo(0) });
    entrada.call(() => setMontadas([0, 1]), undefined, 0);
    entrada.add(montar(0), 0.15);
    linhaAtual.current = entrada;

    const atualiza = () => {
      if (parada()) linhaAtual.current?.pause();
      else linhaAtual.current?.play();
    };

    const observador = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      atualiza();
    });
    observador.observe(raiz);

    const observaMenu = new MutationObserver(atualiza);
    observaMenu.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-menu-aberto"],
    });

    const aoRedimensionar = () => {
      if (foto.style.visibility === "visible") pinta();
    };
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      observador.disconnect();
      observaMenu.disconnect();
      window.removeEventListener("resize", aoRedimensionar);
      linhaAtual.current?.kill();
      linhaAtual.current = null;
      gsap.set(raiz.querySelectorAll("[data-desenho] svg > *"), { clearProps: "all" });
      gsap.set(raiz.querySelectorAll("[data-desenho]"), { clearProps: "visibility" });
      gsap.set([foto, filete], { clearProps: "all" });
    };
  }, []);

  const alternar = () => {
    const p = !pausado;
    pausadoRef.current = p;
    setPausado(p);
    if (p) linhaAtual.current?.pause();
    else if (!menuAberto()) linhaAtual.current?.play();
  };

  return (
    <section
      ref={palco}
      aria-labelledby="capa-titulo"
      className="relative h-[calc(100svh-var(--barra-h))] min-h-[36rem] overflow-hidden bg-surface"
    >
      {/* Papel: título atrás do desenho, para o desenho passar por cima. */}
      <div className="absolute inset-0">
        <Textos tom="papel" />
        <div className="capa-sobe-palco pointer-events-none absolute">
          {ITENS.map((t, i) => (
            <div
              key={t.slug}
              data-desenho={i}
              className={`absolute inset-0 ${i === 0 ? "capa-sobe-peca" : "invisible"}`}
            >
              <Figura
                nome={t.slug}
                titulo={`Desenho da escada ${t.nome.toLowerCase()}`}
                tema="projeto"
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* O filete azul que corre na borda da frente. */}
      <div ref={camadaFilete} aria-hidden="true" className="invisible absolute inset-0 bg-barra" />

      <div
        ref={camadaFoto}
        aria-hidden="true"
        className="invisible absolute inset-0 bg-chumbo motion-reduce:hidden"
      >
        {montadas.map((i) => {
          const f = ITENS[i].foto;
          if (!f) return null;
          return (
            <div
              key={f.src}
              data-foto={i}
              className={`absolute inset-0 ${i === iFoto ? "" : "invisible"}`}
            >
              {/* `priority`: o `lazy` não baixa a foto enquanto a camada está
                  recortada, e ela entraria borrada. */}
              <Foto
                foto={f}
                fill
                priority
                sizes="100vw"
                imgClassName="contrast-[1.04] saturate-[0.9]"
              />
            </div>
          );
        })}
        {/* Escuro neutro só onde há texto (DEC-074): o título, no topo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(8_10_14/0.62)_0%,rgb(8_10_14/0.2)_30%,transparent_44%)]"
        />
        <div className="absolute inset-0">
          <Textos tom="foto" />
        </div>
      </div>

      <Link
        href={`/escadas/${ITENS[iFoto].slug}`}
        aria-label={`Ver a escada ${ITENS[iFoto].nome.toLowerCase()}`}
        className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-barra"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 motion-reduce:hidden">
        <div className="container-site flex justify-end pb-4 lg:pb-5">
          <button
            type="button"
            onClick={alternar}
            aria-pressed={pausado}
            className="pointer-events-auto flex h-11 items-center border border-barra/30 bg-surface px-4 font-label text-[0.68rem] tracking-[0.14em] text-barra uppercase hover:border-barra"
          >
            {pausado ? "Seguir" : "Pausar"}
          </button>
        </div>
      </div>
    </section>
  );
}
