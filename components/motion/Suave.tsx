"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Rolagem suave (DEC-067), como a da referência.
 *
 * Só com ponteiro fino e sem `reduce`: no toque a rolagem nativa é melhor, e
 * quem pede menos movimento recebe a rolagem do sistema. A barra, o botão de
 * WhatsApp e o carregamento ficam fora do conteúdo — `position: fixed` dentro
 * do conteúdo suavizado deixaria de ser fixo.
 */
export function Suave({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    const ok = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return;
    ref.current = ScrollSmoother.create({
      wrapper: "#suave-moldura",
      content: "#suave-conteudo",
      smooth: 1.1,
      effects: true,
    });
    return () => {
      ref.current?.kill();
      ref.current = null;
    };
  }, []);

  // Página nova começa no topo, sem deslizar desde onde a anterior estava.
  useEffect(() => {
    if (!window.location.hash) ref.current?.scrollTop(0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div id="suave-moldura">
      <div id="suave-conteudo">{children}</div>
    </div>
  );
}
