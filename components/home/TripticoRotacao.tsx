"use client";

import { createContext, useContext, useState } from "react";
import { INTERVALO, RotacaoFotos } from "@/components/media/RotacaoFotos";
import type { FotoAcervo } from "@/content/galeria";

/**
 * As três colunas da capa e o botão que pausa as três juntas (DEC-054).
 *
 * Movimento automático por mais de 5 s precisa de pausa (WCAG 2.2.2). O botão
 * mora no bloco do título, longe das colunas, então o estado vive num contexto
 * que a capa (Server Component) só envolve.
 */

const Pausa = createContext({ pausado: false, alternar: () => {} });

export function TripticoRotacao({ children }: { children: React.ReactNode }) {
  const [pausado, setPausado] = useState(false);
  return (
    <Pausa.Provider value={{ pausado, alternar: () => setPausado((p) => !p) }}>
      {children}
    </Pausa.Provider>
  );
}

export function TripticoColunas({ colunas }: { colunas: FotoAcervo[][] }) {
  const { pausado } = useContext(Pausa);
  return (
    <div className="absolute inset-0 grid md:grid-cols-3">
      {colunas.map((fotos, c) => (
        <div
          key={c}
          data-fotos={fotos.map((f) => f.src).join("|")}
          className={`triptico-coluna relative h-full ${c > 0 ? "hidden border-l border-white/20 md:block" : ""}`}
          style={{ "--i": c } as React.CSSProperties}
        >
          <RotacaoFotos
            fotos={fotos}
            defasagem={(INTERVALO / colunas.length) * c}
            pausado={pausado}
            descricao="Escadas de concreto dos sete tipos do catálogo — imagens de referência em rotação"
            sizes="(min-width: 768px) 34vw, 125vw"
            className="h-full"
          />
        </div>
      ))}
    </div>
  );
}

/** Com `reduce` a rotação nem começa, então o botão não tem o que pausar. */
export function PausarRotacao() {
  const { pausado, alternar } = useContext(Pausa);
  return (
    <button
      type="button"
      onClick={alternar}
      className="spec flex min-h-11 items-center gap-2 text-[0.72rem] tracking-[0.12em] uppercase motion-reduce:hidden"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="currentColor">
        {pausado ? (
          <path d="M1 0l9 5-9 5z" />
        ) : (
          <>
            <rect x="1" width="3" height="10" />
            <rect x="6" width="3" height="10" />
          </>
        )}
      </svg>
      {pausado ? "Continuar" : "Pausar"}
    </button>
  );
}
