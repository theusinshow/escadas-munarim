"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MenuOverlay } from "./MenuOverlay";

/**
 * Barra fixa em três células — marca, menu, contato (DEC-053).
 *
 * Transparente sobre seção marcada com `data-barra="transparente"`, sólida no
 * resto. A navegação inteira vive no overlay de tela cheia; o custo é
 * descoberta, e o rodapé compensa listando os 7 tipos em qualquer página.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const jaAbriu = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  // Transparente enquanto uma seção marcada ainda está sob a barra (DEC-053).
  // A barra não sabe qual página é a home: quem quer fundo de foto se marca.
  const [sobreFoto, setSobreFoto] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector<HTMLElement>('[data-barra="transparente"]');
    const medir = () =>
      setSobreFoto(
        !!alvo && alvo.getBoundingClientRect().bottom > (headerRef.current?.offsetHeight ?? 0),
      );
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [pathname]);

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

  const transparente = sobreFoto && !open;
  // O fio das células acompanha o estado: branco 20% sobre foto, concreto no sólido.
  const fio = transparente ? "border-white/20" : "border-border";

  return (
    <header
      ref={headerRef}
      data-estado={transparente ? "transparente" : "solido"}
      className={`fixed inset-x-0 top-0 z-50 h-(--barra-h) border-b transition-colors duration-300 ease-degrau ${fio} ${
        transparente ? "bg-transparent text-primary-fg" : "bg-bg text-primary"
      }`}
    >
      {/* Três células como na referência: marca | menu | contato. A do meio
          ocupa o que sobra, então MENU fica no centro real da página. */}
      <div className="grid h-full grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 border-r px-3 sm:px-4 lg:px-8 ${fio}`}
        >
          {/* Provisória: o degrau que já existe no logo atual (CNT-010). */}
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" fill="var(--primary)" />
            <path d="M5 25h6v-6h6v-6h6V7" fill="none" stroke="#fff" strokeWidth="2.6" />
          </svg>
          <span className="sr-only font-label text-[0.78rem] tracking-[0.2em] uppercase sm:not-sr-only">Munarim</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="menu-principal"
          className="menu-gatilho flex items-center justify-center gap-3"
        >
          <span className="font-label text-[0.78rem] tracking-[0.2em] uppercase">Menu</span>
          {/* Três linhas em repouso; no hover viram três degraus. */}
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

        {/* Contato leva ao rodapé, não ao orçamento: a barra aparece antes de
            qualquer prova (DEC-001). */}
        <a href="#contato" className={`flex items-center gap-2 border-l px-3 sm:px-4 lg:px-8 ${fio}`}>
          <span className="font-label text-[0.78rem] tracking-[0.2em] uppercase">Contato</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        </a>
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
