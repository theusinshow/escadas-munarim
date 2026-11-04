"use client";

import { useEffect, useState } from "react";
import { Foto } from "@/components/media/Foto";
import type { FotoAcervo } from "@/content/galeria";

/** Tempo em tela de cada foto. */
const INTERVALO = 5200;

/**
 * Fotos em rotação, com crossfade (DEC-052).
 *
 * Três cuidados que justificam o componente em vez de uma `Foto` só:
 *
 * 1. **Peso do primeiro paint.** Só a primeira foto entra com `priority`; as
 *    outras são montadas uma à frente da rotação, e o que já montou não
 *    desmonta — voltar ao início não recarrega imagem.
 * 2. **`prefers-reduced-motion`.** Com a preferência ativa a rotação não
 *    começa e fica a primeira foto. Reavaliada se mudar durante a sessão.
 * 3. **Leitor de tela.** O conjunto tem uma descrição estável e as fotos
 *    ficam ocultas para ele: um `alt` que troca a cada 5 s é ruído.
 *
 * Crossfade sem deslocamento: movimento automático sem vetor não compete com
 * o `stepIn`, que é o único gesto de entrada do site (DEC-010).
 */
export function RotacaoFotos({
  fotos,
  descricao,
  sizes,
  className = "",
}: {
  fotos: FotoAcervo[];
  descricao: string;
  sizes: string;
  className?: string;
}) {
  // Índice e marca d'água juntos: o próximo `montadas` depende do próximo `indice`.
  const [{ indice, montadas }, setEstado] = useState({
    indice: 0,
    montadas: Math.min(2, fotos.length),
  });

  useEffect(() => {
    if (fotos.length < 2) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;

    function iniciar() {
      if (timer || query.matches) return;
      timer = window.setInterval(() => {
        // Aba em segundo plano não gira nem baixa imagem.
        if (document.hidden) return;
        setEstado((atual) => {
          const proximo = (atual.indice + 1) % fotos.length;
          return {
            indice: proximo,
            montadas: Math.max(atual.montadas, Math.min(proximo + 2, fotos.length)),
          };
        });
      }, INTERVALO);
    }
    function parar() {
      window.clearInterval(timer);
      timer = 0;
    }

    iniciar();
    const aoMudar = () => (query.matches ? parar() : iniciar());
    query.addEventListener("change", aoMudar);
    return () => {
      query.removeEventListener("change", aoMudar);
      parar();
    };
  }, [fotos.length]);

  return (
    <div role="img" aria-label={descricao} className={`relative overflow-hidden ${className}`}>
      {fotos.slice(0, montadas).map((foto, i) => (
        <div
          key={foto.src}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ease-degrau motion-reduce:transition-none ${
            i === indice ? "opacity-100" : "opacity-0"
          }`}
        >
          <Foto foto={foto} fill priority={i === 0} sizes={sizes} />
        </div>
      ))}
    </div>
  );
}
