"use client";

import { useEffect, useRef } from "react";
import { comMovimento, gsap } from "@/lib/motion";

/**
 * Trilho horizontal preso à tela: o scroll vertical anda pela faixa.
 *
 * O HTML já sai como uma faixa com rolagem horizontal nativa (`overflow-x`,
 * `snap`) — é o estado final no celular, com `reduce` e sem JS. Só no desktop
 * com movimento o GSAP assume: prende a seção, desliga a rolagem nativa e
 * traduz o trilho na mesma distância que ele transborda. Nada some se o JS
 * falhar; a faixa só deixa de ser fixada.
 *
 * Linear e com `scrub`: é o próprio dedo que anda pela faixa, não uma
 * animação que acontece com ele. Curva aqui seria o trilho acelerando sozinho.
 */
export function PinHorizontal({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"section">) {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const janela = el.querySelector<HTMLElement>("[data-janela]");
    const trilho = el.querySelector<HTMLElement>("[data-trilho]");
    const progresso = el.querySelector<HTMLElement>("[data-progresso]");
    if (!janela || !trilho) return;

    const mm = comMovimento(({ mobile }) => {
      if (mobile) return;
      const distancia = () => Math.max(0, trilho.scrollWidth - janela.clientWidth);
      if (distancia() === 0) return;

      janela.style.overflowX = "clip";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      tl.to(trilho, { x: () => -distancia(), ease: "none" }, 0);
      if (progresso) {
        tl.fromTo(progresso, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      }

      return () => {
        janela.style.overflowX = "";
      };
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <section ref={raiz} className={className} {...rest}>
      {children}
    </section>
  );
}
