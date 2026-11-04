"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { comMovimento, jaVisivel } from "@/lib/motion";

/**
 * A foto aparece atrás de uma escada que sobe (DEC-062).
 *
 * A máscara é um lance de `DEGRAUS` faixas horizontais. A faixa de baixo abre
 * primeiro, e cada faixa acima começa atrasada — a borda da revelação é uma
 * escada andando da esquerda de baixo para a direita de cima. No fim a
 * máscara some.
 *
 * Geometria exata, não máscara imitando contorno de foto: é o desenho da
 * própria escada passando por cima da imagem.
 */
const DEGRAUS = 7;
/** Quantas faixas de atraso entre o pé e o topo do lance. */
const LANCE = 2.4;

function lance(p: number) {
  const h = 100 / DEGRAUS;
  const pontos = ["0% 100%"];
  for (let k = 0; k < DEGRAUS; k++) {
    const w = Math.min(1, Math.max(0, (p * (DEGRAUS + LANCE) - k) / LANCE)) * 100;
    const base = 100 - k * h;
    pontos.push(`${w}% ${base}%`, `${w}% ${base - h}%`);
  }
  pontos.push("0% 0%");
  return `polygon(${pontos.join(",")})`;
}

export function RevelaDegrau({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || jaVisivel(el)) return;

    const mm = comMovimento(() => {
      const estado = { p: 0 };
      el.style.clipPath = lance(0);
      gsap.to(estado, {
        p: 1,
        duration: 1.26, // 0,28 × 4,5 pisos: entrada autoral, não rotina
        /* Linear, como `drawOnScroll`: desenho mecânico não acelera. Com a
           curva do sistema a foto abria quase toda nos primeiros 150ms e a
           escada da borda nem chegava a ser vista. */
        ease: "none",
        onUpdate: () => {
          el.style.clipPath = lance(estado.p);
        },
        onComplete: () => {
          el.style.clipPath = "";
        },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      return () => {
        el.style.clipPath = "";
      };
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
