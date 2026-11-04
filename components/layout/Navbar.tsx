"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HoraLocal } from "./HoraLocal";
import { MenuOverlay } from "./MenuOverlay";
import { site } from "@/lib/site";

/**
 * Barra fixa mínima: marca pequena à esquerda, gatilho do menu à direita.
 * Nada mais — a navegação inteira vive no overlay de tela cheia.
 *
 * O custo dessa escolha é descoberta: as 7 páginas de tipo deixam de estar a
 * um clique visível. O rodapé compensa em parte, listando os 7 tipos e todas
 * as rotas em texto puro em qualquer página.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const jaAbriu = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  // Esc fecha; o corpo para de rolar por trás.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* O foco vai para o botão de fechar ao abrir, e volta para o gatilho ao
     fechar — nunca fica órfão no corpo da página. O `jaAbriu` evita roubar o
     foco na primeira renderização, quando o menu nunca esteve aberto. */
  useEffect(() => {
    if (open) {
      jaAbriu.current = true;
      fecharRef.current?.focus();
    } else if (jaAbriu.current) {
      toggleRef.current?.focus();
    }
  }, [open]);

  // Trap de foco: com o menu aberto, Tab não escapa para a página atrás.
  useEffect(() => {
    if (!open || !headerRef.current) return;
    const raiz = headerRef.current.parentElement ?? document.body;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const alvos = Array.from(
        raiz.querySelectorAll<HTMLElement>("#menu-principal a, #menu-principal button"),
      ).filter((el) => el.offsetParent !== null);
      if (alvos.length === 0) return;
      const primeiro = alvos[0];
      const ultimo = alvos[alvos.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/escadas" ? pathname.startsWith("/escadas") : pathname === href;

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 h-(--barra-h) border-b border-border bg-bg"
    >
      {/* Grid de três colunas iguais: só assim a cidade fica no centro real
          da página, e não no meio do espaço que sobra entre as pontas. */}
      <div className="container-site grid h-full grid-cols-3 items-center gap-4">
        {/* Esquerda: marca sólida + gatilho num retângulo de linha fina. */}
        <div className="flex items-center gap-2 justify-self-start">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center"
          >
            {/* Só a marca. O nome vive no rodapé e no <title> — ver DEC-021.
                Provisória: o degrau que já existe no logo atual (CNT-010). */}
            <svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" fill="var(--primary)" />
              <path d="M5 25h6v-6h6v-6h6V7" fill="none" stroke="#fff" strokeWidth="2.6" />
            </svg>
            <span className="sr-only">{site.name} — início</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-principal"
            className="menu-gatilho flex h-11 w-11 items-center justify-center border border-border text-primary hover:border-primary"
          >
            <span className="sr-only">Abrir menu</span>
            {/* Três linhas em repouso; no hover viram três degraus com os
                espelhos crescendo entre eles. */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 26 26"
              aria-hidden="true"
              className="menu-icone"
              fill="currentColor"
            >
              <rect className="piso piso-1" x="4" y="7.2" width="18" height="1.6" />
              <rect className="piso piso-2" x="4" y="12.2" width="18" height="1.6" />
              <rect className="piso piso-3" x="4" y="17.2" width="18" height="1.6" />
              <rect className="espelho" x="9.2" y="13.5" width="1.6" height="6.5" />
              <rect className="espelho" x="16.2" y="7" width="1.6" height="6.5" />
            </svg>
          </button>
        </div>

        {/* Meio: onde a fábrica fica. São José é a cidade; Grande Florianópolis
            é a região atendida — as duas declaradas pela empresa (DEC-017). */}
        <p className="rotulo-marca hidden justify-self-center whitespace-nowrap lg:block">
          São José <span aria-hidden="true">—</span> Grande Florianópolis
        </p>

        {/* Direita: hora local. Horário de atendimento é CNT-011. */}
        <div className="hidden justify-self-end sm:block">
          <HoraLocal />
        </div>
      </div>

      {open && (
        <MenuOverlay
          onClose={() => setOpen(false)}
          isActive={isActive}
          fecharRef={fecharRef}
        />
      )}
    </header>
  );
}
