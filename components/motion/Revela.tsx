"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * O gesto de entrada da referência (DEC-067): o bloco chega desfocado e
 * apagado e assenta nítido. Vale para tudo o que tem `data-revela`, em
 * qualquer página — por isso mora no layout e reinicia a cada rota.
 *
 * Também desenha a escadinha dos `.rotulo-secao` e move as fotos com
 * `data-paralaxe`. Estado inicial só por JS: sem JS, ou com `reduce`, a página
 * está pronta e nada some.
 */
export function Revela() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const alvos = gsap.utils.toArray<HTMLElement>("[data-revela]");
      gsap.set(alvos, { opacity: 0, filter: "blur(12px)", y: 28 });
      ScrollTrigger.batch(alvos, {
        start: "top 90%",
        once: true,
        onEnter: (lote) =>
          gsap.to(lote, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.2,
            ease: EASE,
            stagger: 0.12,
            clearProps: "filter,transform",
          }),
      });

      for (const r of gsap.utils.toArray<HTMLElement>(".rotulo-secao")) {
        r.style.setProperty("--fio", "0");
        ScrollTrigger.create({
          trigger: r,
          start: "top 90%",
          once: true,
          onEnter: () => r.style.setProperty("--fio", "1"),
        });
      }

      for (const img of gsap.utils.toArray<HTMLElement>("[data-paralaxe]")) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
