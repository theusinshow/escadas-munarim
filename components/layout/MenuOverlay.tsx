"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slideshow } from "./Slideshow";
import { comMovimento, stepIn } from "@/lib/motion";
import { addressLine, site, whatsappLink } from "@/lib/site";

/**
 * Menu de tela cheia: painel de navegação estreito à esquerda, slideshow à
 * direita.
 *
 * O painel tem **largura fixa**, não percentual: numa tela de 2560 uma coluna
 * de 30% viraria um paredão de 760px com sete palavras dentro. 380px se comporta
 * igual em 1440 e em 2560 — é como a referência se comporta.
 *
 * O overlay cobre a barra inteira, então ele carrega o próprio botão de fechar,
 * na mesma altura em que estava o gatilho.
 *
 * **O acento não aparece aqui.** `--accent` sobre `--primary` dá 1,40:1 —
 * inutilizável. No painel azul o destaque vem de brilho: repouso em
 * `--primary-fg-muted` (6,11:1), hover e página atual em branco puro (10:1).
 *
 * Sem JS o overlay não existe — o rodapé carrega a navegação completa em texto.
 */

const ITENS = [
  { href: "/", label: "Início" },
  { href: "/escadas", label: "Escadas" },
  { href: "/obras", label: "Obras" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/empresa", label: "Empresa" },
  { href: "/orcamento", label: "Orçamento" },
];

export function MenuOverlay({
  onClose,
  isActive,
  fecharRef,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
  fecharRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  /* Entrada em degrau — a razão 18/28 do resto do site (DEC-010). Aqui a guarda
     do DEC-018 não vale: o menu abriu porque a pessoa clicou, então não existe
     conteúdo "já lido" para fazer sumir. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const itens = Array.from(el.querySelectorAll<HTMLElement>("[data-item]"));
    if (itens.length === 0) return;
    const mm = comMovimento(({ mobile }) => {
      stepIn(itens, { mobile });
    }, el);
    setPronto(true);
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      id="menu-principal"
      className="fixed inset-0 z-50 grid grid-cols-1 lg:grid-cols-[380px_1fr]"
    >
      <div className="flex h-dvh flex-col overflow-y-auto bg-primary px-6 text-primary-fg lg:px-8">
        {/* Topo: marca com nome, e o fechar na mesma altura do gatilho — daí
            `h-(--barra-h)` e não uma altura própria: o botão substitui o
            gatilho da barra no mesmo pixel, e abrir o menu não pode fazer o
            alvo saltar. */}
        <div className="flex h-(--barra-h) shrink-0 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3"
            data-item
          >
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" fill="var(--primary-fg)" />
              <path
                d="M5 25h6v-6h6v-6h6V7"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.6"
              />
            </svg>
            <span className="font-display text-lg font-bold leading-none tracking-[-0.02em]">
              {site.name}
            </span>
          </Link>

          <button
            ref={fecharRef}
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-primary-fg-muted hover:text-primary-fg"
          >
            <span className="sr-only">Fechar menu</span>
            <svg width="22" height="22" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M6 6l14 14M20 6L6 20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        {/* Links no alto, logo abaixo da marca. Sem subtítulo, sem número e sem
            divisória entre itens (DEC-024). */}
        <nav aria-label="Principal" className="mt-6">
          <ul>
            {ITENS.map((item) => {
              const atual = isActive(item.href);
              return (
                <li key={item.href} data-item>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={atual ? "page" : undefined}
                    className={`block py-1.5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] transition-colors duration-150 ${
                      atual
                        ? "text-primary-fg"
                        : "text-primary-fg-muted hover:text-primary-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Empurra o bloco de baixo para o fim quando sobra altura. */}
        <div className="flex-1" />

        <div
          className="mt-10 shrink-0 border-t border-primary-fg/20 py-8"
          data-item
        >
          <p className="rotulo text-primary-fg-muted">Contato</p>
          <ul className="mt-1">
            <li>
              <a
                href={site.contact.phoneHref}
                className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Olá! Vim pelo site.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                WhatsApp {site.contact.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {site.contact.email}
              </a>
            </li>
          </ul>

          {/* Uma rede só, porque é a única que a empresa tem. Fileira de ícones
              com perfil que não existe é prova fabricada. */}
          <p className="rotulo mt-5 text-primary-fg-muted">Redes</p>
          <ul className="mt-1">
            <li>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                {site.contact.instagram}
              </a>
            </li>
          </ul>

          <address className="mt-5 text-sm text-pretty not-italic text-primary-fg-muted">
            {addressLine}
          </address>
        </div>
      </div>

      {/* Slideshow. Some abaixo de 1024px: metade de tela estreita não é
          imagem, é faixa. */}
      <div className="hidden h-dvh lg:block">{pronto ? <Slideshow /> : null}</div>
    </div>
  );
}
