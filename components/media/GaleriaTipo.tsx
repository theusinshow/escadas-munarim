"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Foto } from "@/components/media/Foto";
import type { FotoAcervo } from "@/content/galeria";

/**
 * Galeria de um tipo: mosaico vertical + lightbox (DEC-048).
 *
 * Mosaico em colunas, não grade: as fotos têm proporções diferentes (3:4 a
 * 9:16) e cortar todas no mesmo quadro jogaria fora justamente o curso dos
 * degraus. A coluna respeita a proporção de cada arquivo.
 *
 * O lightbox é `<dialog>` nativo: `showModal()` já entrega foco preso, `Esc`
 * para fechar e o resto da página inerte — nada disso reimplementado à mão.
 * Setas do teclado navegam.
 */
export function GaleriaTipo({ fotos, nome }: { fotos: FotoAcervo[]; nome: string }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [atual, setAtual] = useState<number | null>(null);

  const abrir = (i: number) => {
    setAtual(i);
    dialogo.current?.showModal();
  };

  const mover = useCallback(
    (passo: number) =>
      setAtual((i) => (i === null ? i : (i + passo + fotos.length) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    const onClose = () => setAtual(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [mover]);

  const foto = atual === null ? null : fotos[atual];

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {fotos.map((f, i) => (
          <li key={f.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => abrir(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-shade"
              aria-label={`Ampliar: ${f.alt}`}
            >
              <Foto
                foto={f}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                imgClassName="transition-[filter] duration-500 ease-degrau group-hover:brightness-[0.9] motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        aria-label={`Galeria — escada ${nome.toLowerCase()}`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-text p-0 text-primary-fg backdrop:bg-text/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogo.current?.close();
        }}
      >
        {foto && atual !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 lg:px-8">
              <p className="spec text-primary-fg-muted">
                {nome} — {String(atual + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => dialogo.current?.close()}
                className="flex h-11 items-center px-3 text-sm underline underline-offset-4"
              >
                Fechar
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pb-6 lg:px-24">
              <div className="relative h-full w-full">
                <Image
                  key={foto.src}
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={foto.blur}
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => mover(-1)}
                className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-primary-fg/25 hover:border-primary-fg lg:left-6"
              >
                <span aria-hidden="true">←</span>
                <span className="sr-only">Foto anterior</span>
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-primary-fg/25 hover:border-primary-fg lg:right-6"
              >
                <span aria-hidden="true">→</span>
                <span className="sr-only">Próxima foto</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
