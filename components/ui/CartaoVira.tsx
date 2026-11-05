"use client";

import { useRef, useState } from "react";

/**
 * Cartão que vira (DEC-088), no gesto do FlipCard do React Bits: clique,
 * toque, Enter ou Espaço giram 180° no eixo vertical; com o mouse por cima, o
 * cartão inclina um pouco na direção do ponteiro. Escrito aqui em CSS 3D
 * (`.vira*` em globals.css) — sem a biblioteca `motion` que o original usa.
 *
 * A frente é um botão inteiro; o verso tem o seu próprio conteúdo (pode ter
 * link) e um botão de voltar. A face escondida fica `inert`, fora do foco e
 * do leitor de tela. Com `reduce`, vira sem girar.
 */
export function CartaoVira({
  frente,
  verso,
  rotulo,
  className = "",
}: {
  frente: React.ReactNode;
  verso: React.ReactNode;
  /** Nome do cartão para o leitor de tela ("Medição no local"). */
  rotulo: string;
  className?: string;
}) {
  const [virado, setVirado] = useState(false);
  const incl = useRef<HTMLDivElement>(null);

  const inclina = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !incl.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    incl.current.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    incl.current.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };
  const solta = () => {
    incl.current?.style.setProperty("--rx", "0deg");
    incl.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`vira ${className}`} data-virado={virado} onPointerMove={inclina} onPointerLeave={solta}>
      <div ref={incl} className="vira-incl">
        <div className="vira-rotor">
          <button
            type="button"
            className="vira-face text-left"
            onClick={() => setVirado(true)}
            aria-label={`${rotulo} — ver detalhes`}
            inert={virado}
          >
            {frente}
          </button>
          <div className="vira-face vira-face--verso" inert={!virado}>
            {verso}
            <button
              type="button"
              onClick={() => setVirado(false)}
              aria-label={`${rotulo} — voltar ao desenho`}
              className="absolute top-4 right-4 flex size-11 items-center justify-center"
            >
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
