"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { comMovimento, EASE, jaVisivel, RISER, TREAD } from "@/lib/motion";

/**
 * O processo se constrói como uma escada (DEC-062) — o momento de motion da
 * home.
 *
 * Cada etapa é revelada da esquerda para a direita, como o traço do piso
 * sendo puxado na prancheta, e a seguinte só começa depois de um espelho
 * (0,18s): o lance sobe na ordem em que as etapas acontecem. Deitado (abaixo
 * de `lg`), a revelação desce de cima para baixo, na ordem da lista.
 *
 * `clip-path` em vez de deslocamento: o texto não viaja, ele aparece onde vai
 * ficar. Toca uma vez; conteúdo lido não some de novo (DEC-018). Sem JS ou
 * com `reduce`, o HTML já é o estado final.
 */
export function LanceProcesso({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || jaVisivel(el)) return;
    const degraus = Array.from(el.querySelectorAll<HTMLElement>("ol > li"));
    if (degraus.length === 0) return;

    const mm = comMovimento(() => {
      const emPe = window.matchMedia("(min-width: 1024px)").matches;
      /* Folga negativa: o espelho (::before) sai 1px da caixa à esquerda. */
      const fechado = emPe ? "inset(-4px 100% -4px -8px)" : "inset(-4px -4px 100% -8px)";
      const aberto = "inset(-4px -4px -4px -8px)";

      gsap.fromTo(
        degraus,
        { clipPath: fechado },
        {
          clipPath: aberto,
          duration: (TREAD / 100) * 2.2,
          ease: EASE,
          stagger: RISER / 100,
          clearProps: "clipPath",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        },
      );
    }, el);

    return () => mm.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
