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
 *
 * DEC-102: âncora (`#contato`, `#nao-sei`) passa pelo ScrollSmoother. A nativa
 * rolaria a moldura fixa e desalinharia a página do scroll.
 */

const alvoDe = (hash: string) =>
  hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

/** O alvo para logo abaixo da barra fixa. */
const abaixoDaBarra = () => `top ${document.querySelector("header")?.offsetHeight ?? 0}px`;

export function Suave({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    const ok = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#suave-moldura",
      content: "#suave-conteudo",
      smooth: 1.1,
      effects: true,
    });
    ref.current = smoother;

    const moldura = document.getElementById("suave-moldura");
    const zeraMoldura = () => {
      if (moldura) moldura.scrollTop = 0;
    };
    // Em captura: chega antes do <Link>, que respeita o preventDefault.
    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      if (link.pathname !== window.location.pathname) return;
      const alvo = alvoDe(link.hash);
      if (!alvo) return;
      e.preventDefault();
      window.history.pushState(null, "", link.hash);
      smoother.scrollTo(alvo, true, abaixoDaBarra());
    };
    moldura?.addEventListener("scroll", zeraMoldura);
    document.addEventListener("click", aoClicar, true);

    return () => {
      moldura?.removeEventListener("scroll", zeraMoldura);
      document.removeEventListener("click", aoClicar, true);
      ref.current?.kill();
      ref.current = null;
    };
  }, []);

  // Página nova começa no topo, sem deslizar desde onde a anterior estava; se
  // veio com âncora, começa nela.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) ref.current?.scrollTop(0);
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const alvo = alvoDe(hash);
      if (alvo) ref.current?.scrollTo(alvo, false, abaixoDaBarra());
    }, 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div id="suave-moldura">
      <div id="suave-conteudo">{children}</div>
    </div>
  );
}
