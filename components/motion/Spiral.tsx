"use client";

import { useEffect, useRef } from "react";
import { comMovimento, jaVisivel, spiralIn } from "@/lib/motion";

/**
 * O giro do caracol. Exclusivo de `/escadas/caracol` — usado uma vez, onde é
 * literalmente verdade.
 */
export function Spiral({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;

    // Conteúdo já lido não some para reaparecer (DEC-018).
    if (jaVisivel(el)) return;

    const mm = comMovimento(({ mobile }) => {
      spiralIn(svg as SVGSVGElement, { mobile });
    }, el);

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
