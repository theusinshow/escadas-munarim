"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Título que se preenche linha a linha com a rolagem (DEC-067). O texto
 * de cor é o que o leitor de tela lê; a camada apagada é cópia `aria-hidden`
 * (contraste 1,7:1, só aparece como "fundo" do preenchimento).
 * Sem JS ou com `reduce`, o título já está preenchido.
 */
export function Preenche({
  linhas,
  className = "",
  as: Tag = "h2",
}: {
  linhas: string[];
  className?: string;
  as?: "h2" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cores = el.querySelectorAll(".preenche-cor");
      gsap.set(cores, { clipPath: "inset(0 100% 0 0)" });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: 0.6 },
      });
      cores.forEach((c) => tl.to(c, { clipPath: "inset(0 0% 0 0)", ease: "none" }));
    });
    return () => mm.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {linhas.map((l) => (
        <span key={l} className="preenche-linha">
          <span aria-hidden="true" className="opacity-[0.18]">
            {l}
          </span>
          <span className="preenche-cor">
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}
