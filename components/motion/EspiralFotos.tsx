"use client";

import { useEffect, useRef } from "react";
import type { FotoAcervo } from "@/content/galeria";

/**
 * Fotos numa hélice que sobe sem fim (DEC-088) — a ideia do Infinite Spiral
 * do React Bits, refeita aqui: lida como uma escada caracol, cada foto é um
 * degrau em volta de um eixo. Gira sozinha devagar e anda junto com a
 * rolagem; para quando sai da tela ou com o mouse em cima.
 *
 * Cada foto fica tangente à volta, como um degrau em torno do pilar. DOM com
 * transform 3D de verdade (perspectiva no palco), escrito direto no
 * `style` a cada quadro, sem estado do React. Com `reduce`, a hélice fica
 * parada na primeira posição. As fotos são decorativas (`alt=""`): o que elas
 * mostram já está na galeria.
 */

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const mod = (v: number, d: number) => ((v % d) + d) % d;
const suave = (a: number, b: number, v: number) => {
  const x = clamp((v - a) / (b - a || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

export function EspiralFotos({
  fotos,
  porVolta = 8,
  velocidade = 0.45,
  className = "",
}: {
  fotos: FotoAcervo[];
  /** Quantas fotos fecham uma volta. */
  porVolta?: number;
  /** Fotos por segundo no giro automático. */
  velocidade?: number;
  className?: string;
}) {
  const palco = useRef<HTMLDivElement>(null);
  const itens = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = palco.current;
    if (!el || fotos.length === 0) return;
    const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let caixa = el.getBoundingClientRect();
    let visivel = true;
    let parado = false;
    let alvo = 0;
    let atual = 0;
    let ultimoY = window.scrollY;
    let antes = performance.now();
    let quadro = 0;

    const ro = new ResizeObserver(() => (caixa = el.getBoundingClientRect()));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    const rola = () => {
      const y = window.scrollY;
      if (visivel && !reduz) alvo += clamp((y - ultimoY) / 140, -1.2, 1.2);
      ultimoY = y;
    };
    window.addEventListener("scroll", rola, { passive: true });
    const entra = () => (parado = true);
    const sai = () => (parado = false);
    el.addEventListener("pointerenter", entra);
    el.addEventListener("pointerleave", sai);

    const desenha = () => {
      const n = fotos.length;
      const meio = n / 2;
      const raio = clamp(caixa.width * 0.34, 110, 230);
      const passoY = clamp(caixa.height / (porVolta * 1.6), 26, 46);
      itens.current.forEach((item, i) => {
        if (!item) return;
        const o = mod(i - atual + meio, n) - meio;
        const ang = (o * 2 * Math.PI) / porVolta;
        const x = Math.sin(ang) * raio;
        const z = Math.cos(ang) * raio;
        const borda = Math.min(Math.abs(o) / meio, 1);
        const opacidade = (1 - suave(0.55, 1, borda)) * (0.45 + 0.55 * ((z / raio + 1) / 2));
        item.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${(o * passoY).toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ang.toFixed(3)}rad)`;
        item.style.opacity = opacidade.toFixed(3);
        item.style.zIndex = String(Math.round(z + 1000));
      });
    };

    const anda = (t: number) => {
      const dt = Math.min((t - antes) / 1000, 0.05);
      antes = t;
      if (visivel && !parado) alvo += velocidade * dt;
      atual += (alvo - atual) * (1 - Math.exp(-dt * 9));
      if (visivel) desenha();
      quadro = requestAnimationFrame(anda);
    };

    desenha();
    if (!reduz) quadro = requestAnimationFrame(anda);

    return () => {
      cancelAnimationFrame(quadro);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", rola);
      el.removeEventListener("pointerenter", entra);
      el.removeEventListener("pointerleave", sai);
    };
  }, [fotos, porVolta, velocidade]);

  return (
    <div ref={palco} className={`espiral ${className}`} aria-hidden="true">
      {fotos.map((f, i) => (
        <div
          key={f.src}
          ref={(n) => {
            itens.current[i] = n;
          }}
          className="espiral-item"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.src} alt="" width={f.largura} height={f.altura} loading="lazy" draggable={false} />
        </div>
      ))}
    </div>
  );
}
