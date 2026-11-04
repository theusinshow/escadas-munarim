"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { INTERVALO, RotacaoFotos } from "@/components/media/RotacaoFotos";
import type { FotoAcervo } from "@/content/galeria";

/**
 * As três colunas da capa (DEC-054 → DEC-062).
 *
 * Sem botão de pausa (pedido do desenvolvedor: capa limpa). A rotação para
 * sozinha quando há alguém olhando de perto — cursor sobre a capa ou foco de
 * teclado dentro dela —, quando a aba sai de vista e, com `reduce`, nem
 * começa (`RotacaoFotos`). O estado vive num contexto porque a capa é Server
 * Component e só envolve.
 */

const Pausa = createContext(false);

export function TripticoRotacao({ children }: { children: React.ReactNode }) {
  const [perto, setPerto] = useState(false);
  const [oculta, setOculta] = useState(false);

  useEffect(() => {
    const aoMudar = () => setOculta(document.hidden);
    document.addEventListener("visibilitychange", aoMudar);
    return () => document.removeEventListener("visibilitychange", aoMudar);
  }, []);

  return (
    <Pausa.Provider value={perto || oculta}>
      {/* `contents`: não cria caixa; os eventos dos filhos sobem até aqui. */}
      <div
        className="contents"
        onPointerEnter={() => setPerto(true)}
        onPointerLeave={() => setPerto(false)}
        onFocus={() => setPerto(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPerto(false);
        }}
      >
        {children}
      </div>
    </Pausa.Provider>
  );
}

export function TripticoColunas({ colunas }: { colunas: FotoAcervo[][] }) {
  const pausado = useContext(Pausa);
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
