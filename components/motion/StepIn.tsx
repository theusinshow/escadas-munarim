"use client";

import { useEffect, useRef } from "react";
import { comMovimento, jaVisivel, stepIn, type Direcao } from "@/lib/motion";

/**
 * Entrada em degrau para um grupo de elementos.
 *
 * `selector` escolhe os filhos que entram (por padrão, os filhos diretos).
 * Substitui o fade-up genérico em todo o site — o stagger codifica a proporção
 * real do degrau, e é por isso que não é motion decorativo (U17).
 */
export function StepIn({
  children,
  selector = ":scope > *",
  direcao = "subindo",
  className,
}: {
  children: React.ReactNode;
  selector?: string;
  direcao?: Direcao;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const alvo = el.firstElementChild ?? el;
    const itens = Array.from(alvo.querySelectorAll<HTMLElement>(selector));
    if (itens.length === 0) return;

    // Conteúdo já lido não some para reaparecer (DEC-018).
    if (jaVisivel(el)) return;

    const mm = comMovimento(({ mobile }) => {
      stepIn(itens, { direcao, mobile, trigger: el });
    }, el);

    return () => mm.revert();
  }, [selector, direcao]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
