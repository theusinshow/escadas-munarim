"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * `position: sticky` que funciona com a rolagem suave.
 *
 * Dentro do ScrollSmoother o conteúdo anda por `transform`, não por rolagem, e
 * o `sticky` do CSS para de prender: a foto ficava no topo e o texto seguia
 * sozinho abaixo dela. Com a rolagem suave ligada, este bloco desce junto com
 * a rolagem até o fim do pai; sem ela (toque, movimento reduzido), o `sticky`
 * da própria classe faz o trabalho. A distância do topo vem do `top` da classe.
 */
export function Prende({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const pai = el?.parentElement;
    if (!el || !pai || !ScrollSmoother.get()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const topo = () => parseFloat(getComputedStyle(el).top) || 0;
      const st = ScrollTrigger.create({
        trigger: el,
        start: () => `top top+=${topo()}`,
        endTrigger: pai,
        end: () => `bottom top+=${topo() + el.offsetHeight}`,
        invalidateOnRefresh: true,
        onRefreshInit: () => gsap.set(el, { y: 0 }),
        onUpdate: (s) => gsap.set(el, { y: s.progress * (s.end - s.start) }),
        onRefresh: (s) => gsap.set(el, { y: s.progress * (s.end - s.start) }),
      });
      // O acordeão muda a altura do pai: recalcula o fim.
      let t = 0;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(t);
        t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(pai);
      return () => {
        ro.disconnect();
        window.clearTimeout(t);
        st.kill();
        gsap.set(el, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
