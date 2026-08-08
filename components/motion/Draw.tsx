"use client";

import { useEffect, useRef } from "react";
import { comMovimento, drawOnScroll, jaVisivel } from "@/lib/motion";

/**
 * Traça o desenho técnico conforme o scroll.
 *
 * Recebe o SVG já renderizado no servidor como `children` — o HTML sai completo
 * e o JS só aplica o estado inicial quando de fato vai animar.
 *
 * `waitForLoad` existe para o hero: o traço não pode disputar recurso com o LCP
 * (MOTION_DIRECTION.md).
 */
export function Draw({
  children,
  waitForLoad = false,
  className,
}: {
  children: React.ReactNode;
  waitForLoad?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mm: ReturnType<typeof comMovimento> | undefined;
    let cancelado = false;

    const iniciar = () => {
      if (cancelado) return;
      const svg = el.querySelector("svg");
      if (!svg) return;
      // Conteúdo já lido não some para reaparecer (DEC-018).
      if (jaVisivel(el)) return;
      mm = comMovimento(() => {
        drawOnScroll(svg as SVGSVGElement);
      }, el);
    };

    if (waitForLoad && document.readyState !== "complete") {
      window.addEventListener("load", iniciar, { once: true });
    } else {
      iniciar();
    }

    return () => {
      cancelado = true;
      window.removeEventListener("load", iniciar);
      mm?.revert();
    };
  }, [waitForLoad]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
