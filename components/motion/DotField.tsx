"use client";

import { memo, useEffect, useId, useRef } from "react";

/**
 * Campo de pontos que reage ao cursor. Porte do `DotField` do React Bits para
 * TypeScript, com três acréscimos que o projeto exige e o original não trazia:
 *
 * 1. **`prefers-reduced-motion`.** Com `reduce`, a grade é desenhada uma vez e
 *    para. Sem rAF, sem listener, sem intervalo. O fundo continua existindo —
 *    é menos movimento, não menos conteúdo.
 * 2. **Pausa fora da tela.** A capa tem 100svh: rolar duas telas deixaria um
 *    canvas de tela cheia girando a 60fps para ninguém. Um `IntersectionObserver`
 *    corta o laço quando a seção sai, e religa quando volta.
 * 3. **`ResizeObserver` em vez de `resize` de janela.** É o que o resto da capa
 *    já usa, e pega mudança de layout que não passa por redimensionar a janela.
 *
 * Duas correções no original, além do porte:
 * - A velocidade do mouse nascia com `prev` em -9999, então o **primeiro**
 *   movimento produzia uma distância enorme e o campo dava um estouro de
 *   engajamento. Agora a primeira leitura só ancora a posição.
 * - `setAttribute` recebia número; em TS precisa de string, e o DOM coagia
 *   silenciosamente antes.
 *
 * Cores entram por prop, sempre derivadas dos tokens — o roxo padrão do
 * componente não existe neste sistema.
 */

type Ponto = {
  /** Âncora: onde o ponto mora quando ninguém mexe. */
  ax: number;
  ay: number;
  /** Posição suavizada, que é a desenhada. */
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

export type DotFieldProps = {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  /** Só tem efeito com `bulgeOnly` desligado. */
  cursorForce?: number;
  /** `true` = os pontos abaulam para longe do cursor; `false` = física de empurrão. */
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
};

const DOIS_PI = Math.PI * 2;
const MEDIA_REDUZIDA = "(prefers-reduced-motion: reduce)";

export const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(255,255,255,0.55)",
  gradientTo = "rgba(185,192,199,0.20)",
  glowColor = "rgba(196,203,210,0.18)",
  className = "",
}: DotFieldProps) {
  const raizRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brilhoRef = useRef<SVGCircleElement>(null);
  const pontosRef = useRef<Ponto[]>([]);
  const rafRef = useRef<number | null>(null);
  const tamanhoRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const opacidadeBrilho = useRef(0);
  const engajamento = useRef(0);

  /* As props vivem num ref para o laço não ser recriado a cada render: o
     `useEffect` roda uma vez e lê sempre o valor corrente. */
  const props = useRef({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });
  props.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  const mouse = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
    /** Falso até o primeiro movimento — sem isso o campo estoura no frame 1. */
    ancorado: false,
  });

  /* O `id` do gradiente precisa ser único **e** igual no servidor e no cliente.
     O original sorteava com `Math.random()`, que quebra a hidratação: o React
     compara a marcação e acha dois ids diferentes. `useId` resolve os dois
     requisitos de uma vez, e continua único se um dia houver dois campos na
     mesma página. */
  const brilhoId = `brilho${useId()}`;

  useEffect(() => {
    const raiz = raizRef.current;
    const canvas = canvasRef.current;
    const brilho = brilhoRef.current;
    if (!raiz || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mq = window.matchMedia(MEDIA_REDUZIDA);

    function medir() {
      const r = raiz!.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      tamanhoRef.current = {
        w,
        h,
        offsetX: r.left + window.scrollX,
        offsetY: r.top + window.scrollY,
      };
      construir(w, h);
    }

    function construir(w: number, h: number) {
      const p = props.current;
      const passo = p.dotRadius + p.dotSpacing;
      const colunas = Math.floor(w / passo);
      const linhas = Math.floor(h / passo);
      if (colunas <= 0 || linhas <= 0) {
        pontosRef.current = [];
        return;
      }
      const folgaX = (w % passo) / 2;
      const folgaY = (h % passo) / 2;
      const pontos: Ponto[] = new Array(linhas * colunas);
      let i = 0;
      for (let linha = 0; linha < linhas; linha++) {
        for (let coluna = 0; coluna < colunas; coluna++) {
          const ax = folgaX + coluna * passo + passo / 2;
          const ay = folgaY + linha * passo + passo / 2;
          pontos[i++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      pontosRef.current = pontos;
    }

    /** Um quadro. `vivo` falso = grade parada, sem cursor e sem brilho. */
    function desenhar(quadro: number, vivo: boolean) {
      const pontos = pontosRef.current;
      const m = mouse.current;
      const { w, h } = tamanhoRef.current;
      const p = props.current;
      const t = quadro * 0.02;

      const alvo = vivo ? Math.min(m.speed / 5, 1) : 0;
      engajamento.current += (alvo - engajamento.current) * 0.06;
      if (engajamento.current < 0.001) engajamento.current = 0;
      const eng = engajamento.current;

      opacidadeBrilho.current += (eng - opacidadeBrilho.current) * 0.08;
      if (brilho) {
        brilho.setAttribute("cx", String(m.x));
        brilho.setAttribute("cy", String(m.y));
        brilho.style.opacity = String(vivo ? opacidadeBrilho.current : 0);
      }

      ctx!.clearRect(0, 0, w, h);
      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx!.fillStyle = grad;

      const cr = p.cursorRadius;
      const crQuad = cr * cr;
      const raio = p.dotRadius / 2;
      const abaula = p.bulgeOnly;

      ctx!.beginPath();

      for (let i = 0; i < pontos.length; i++) {
        const d = pontos[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distQuad = dx * dx + dy * dy;

        if (distQuad < crQuad && eng > 0.01) {
          const dist = Math.sqrt(distQuad);
          const angulo = Math.atan2(dy, dx);
          if (abaula) {
            const k = 1 - dist / cr;
            const empurrao = k * k * p.bulgeStrength * eng;
            d.sx += (d.ax - Math.cos(angulo) * empurrao - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angulo) * empurrao - d.sy) * 0.15;
          } else {
            const passo = (500 / (dist || 1)) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angulo) * -passo;
            d.vy += Math.sin(angulo) * -passo;
          }
        } else if (abaula) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!abaula) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let px = d.sx;
        let py = d.sy;
        if (p.waveAmplitude > 0 && vivo) {
          py += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          px += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        let r = raio;
        if (p.sparkle && vivo) {
          const hash = ((i * 2654435761) ^ (quadro >> 3)) >>> 0;
          if (hash % 100 < 3) r = raio * 1.8;
        }
        ctx!.moveTo(px + r, py);
        ctx!.arc(px, py, r, 0, DOIS_PI);
      }

      ctx!.fill();
    }

    /* Com `reduce`, a grade é pintada uma vez e o componente termina aqui:
       nenhum listener, nenhum intervalo, nenhum quadro. */
    if (mq.matches) {
      medir();
      desenhar(0, false);
      const ro = new ResizeObserver(() => {
        medir();
        desenhar(0, false);
      });
      ro.observe(raiz);
      return () => ro.disconnect();
    }

    let quadro = 0;
    let visivel = true;

    function laco() {
      quadro++;
      desenhar(quadro, true);
      rafRef.current = requestAnimationFrame(laco);
    }

    function ligar() {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(laco);
    }

    function desligar() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    /* A velocidade é medida em intervalo fixo, e não por quadro: o que o campo
       quer saber é quanto o cursor andou por unidade de tempo, e isso não pode
       depender da taxa de quadros da máquina. */
    const velocidade = setInterval(() => {
      const m = mouse.current;
      if (!m.ancorado) return;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }, 20);

    function aoMover(e: MouseEvent) {
      const s = tamanhoRef.current;
      const m = mouse.current;
      m.x = e.pageX - s.offsetX;
      m.y = e.pageY - s.offsetY;
      /* Primeira leitura só ancora: sem isso a distância até o -9999 inicial
         entra na média e o campo inteiro estoura no primeiro movimento. */
      if (!m.ancorado) {
        m.prevX = m.x;
        m.prevY = m.y;
        m.ancorado = true;
      }
    }

    const ro = new ResizeObserver(medir);
    ro.observe(raiz);

    const io = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        if (visivel) ligar();
        else desligar();
      },
      { rootMargin: "120px" },
    );
    io.observe(raiz);

    function aoTrocarAba() {
      if (document.hidden || !visivel) desligar();
      else ligar();
    }

    medir();
    window.addEventListener("mousemove", aoMover, { passive: true });
    document.addEventListener("visibilitychange", aoTrocarAba);
    ligar();

    return () => {
      desligar();
      clearInterval(velocidade);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", aoMover);
      document.removeEventListener("visibilitychange", aoTrocarAba);
    };
  }, []);

  /* O posicionamento é **do chamador**, não daqui. Concatenar um `relative`
     fixo com o `absolute inset-0` que a capa passa põe as duas utilitárias na
     mesma classe, e quem ganha é a que vier depois na folha de estilo — não a
     que vier depois no atributo. Deu `position: relative`: o contêiner virou
     bloco em fluxo com filhos absolutos, altura zero, e o canvas mediu
     1440×**0**. O campo existia e não pintava um pixel.
     Medido: `cssH: 0`, `bufH: 0`. */
  return (
    <div
      ref={raizRef}
      aria-hidden="true"
      className={className || "relative h-full w-full"}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={brilhoId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={brilhoRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${brilhoId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});
