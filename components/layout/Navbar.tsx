"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { tipos } from "@/content/tipos";
import { addressLine, site, whatsappLink } from "@/lib/site";

/**
 * Barra fixa (DEC-066 → DEC-091). Simplificada sobre a effortel.com, trazida
 * pelo desenvolvedor: poucos itens, um único menu rico e um botão. Marca à
 * esquerda; Escadas (o único com painel), Galeria, Como funciona e Empresa
 * em links diretos; "Contato" à direita.
 *
 * O painel de Escadas tem duas colunas: os sete tipos numerados e, ao lado,
 * o cartão com foto para quem ainda não sabe o próprio caso. Dúvidas sai da
 * barra do desktop e fica na gaveta do celular e no rodapé.
 *
 * No celular: duas linhas que viram X e um painel de tela cheia com os itens
 * grandes, Escadas em sanfona, o botão e o contato no pé.
 *
 * O botão leva ao rodapé (#contato), não ao orçamento: a barra aparece antes de
 * qualquer prova (DEC-001).
 */

type Link_ = { href: string; label: string };
type Mega = {
  lista: Link_[];
  todos: Link_;
  /* Foto de proporção perto da do card. As do acervo são quase todas 2:3 —
     no card apareceria só a faixa do meio. */
  card: { foto: string | StaticImageData; titulo: string; botao: Link_ };
};
type Item = Link_ & { mega?: Mega };

const MENU: Item[] = [
  {
    href: "/escadas",
    label: "Escadas",
    mega: {
      lista: tipos.map((t) => ({ href: `/escadas/${t.slug}`, label: t.nome })),
      todos: { href: "/escadas", label: "Comparar os sete" },
      card: {
        foto: "/media/escadas/in-loco/ref-in-loco-07.avif",
        titulo: "Não sabe qual é o seu caso?",
        botao: { href: "/escadas#nao-sei", label: "Três perguntas" },
      },
    },
  },
  { href: "/obras", label: "Galeria" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/empresa", label: "Empresa" },
];

/** Só na gaveta do celular, abaixo dos itens principais. */
const SECUNDARIOS: Link_[] = [
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/artigos", label: "Artigos" },
  { href: "/orcamento", label: "Pedir orçamento" },
];

const dois = (n: number) => String(n + 1).padStart(2, "0");

function Marca() {
  /* A marca redesenhada em peso sólido (DEC-069), sem a tagline e com ESCADAS
     na largura de MUNARIM (DEC-075). Gerada por `scripts/gera-marca.py`. */
  return (
    <Image
      src="/marca/munarim-marca-escuro.svg"
      alt=""
      width={1049}
      height={248}
      priority
      unoptimized
      className="h-8 w-auto lg:h-9"
    />
  );
}

function Seta({ aberta }: { aberta: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-degrau ${aberta ? "rotate-180" : ""}`}
    >
      <path d="M1.5 4l4.5 4.5L10.5 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState<string | null>(null);
  const [gaveta, setGaveta] = useState(false);
  const [sanfona, setSanfona] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);
  const base = useId();

  // Trocou de página: tudo fecha (ajuste no render, sem efeito).
  const [rota, setRota] = useState(pathname);
  if (rota !== pathname) {
    setRota(pathname);
    setAberto(null);
    setGaveta(false);
    setSanfona(null);
  }

  // Esc fecha o painel ou a gaveta; com a gaveta aberta o corpo não rola.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (gaveta) {
        setGaveta(false);
        gatilhoRef.current?.focus();
      } else if (aberto) {
        const btn = document.getElementById(`${base}-${aberto}-btn`);
        setAberto(null);
        btn?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = gaveta ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberto, gaveta, base]);

  const atual = (href: string) =>
    href === "/escadas" ? pathname.startsWith("/escadas") : pathname === href;

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setAberto(null)}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node)) setAberto(null);
      }}
      className="intro-desce fixed inset-x-0 top-0 z-50 h-(--barra-h) border-b border-white/25 bg-barra text-primary-fg"
    >
      <div className="container-site flex h-full items-center justify-between gap-8">
        <Link href="/" className="flex min-h-11 items-center" onMouseEnter={() => setAberto(null)}>
          <Marca />
          <span className="sr-only">{site.name} — início</span>
        </Link>

        {/* ---------- Desktop ---------- */}
        <nav aria-label="Principal" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-8 xl:gap-12">
            {MENU.map((item) => {
              const id = `${base}-${item.label}`;
              const estaAberto = aberto === item.label;
              const classe = `flex min-h-11 items-center gap-2 whitespace-nowrap font-label text-[0.74rem] tracking-[0.14em] uppercase transition-opacity hover:opacity-100 ${
                atual(item.href) || estaAberto ? "opacity-100" : "opacity-85"
              }`;
              return (
                <li
                  key={item.label}
                  className="flex h-full items-center"
                  onMouseEnter={() => setAberto(item.mega ? item.label : null)}
                >
                  {item.mega ? (
                    <button
                      id={`${id}-btn`}
                      type="button"
                      aria-expanded={estaAberto}
                      aria-controls={`${id}-painel`}
                      onClick={() => setAberto(estaAberto ? null : item.label)}
                      className={classe}
                    >
                      {item.label}
                      <Seta aberta={estaAberto} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={atual(item.href) ? "page" : undefined}
                      className={classe}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.mega && (
                    <PainelMega id={`${id}-painel`} mega={item.mega} aberto={estaAberto} />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center lg:flex" onMouseEnter={() => setAberto(null)}>
          <a href="#contato" className="btn-chanfro min-h-10! px-6!">
            Contato
          </a>
        </div>

        {/* ---------- Celular ---------- */}
        <button
          ref={gatilhoRef}
          type="button"
          aria-expanded={gaveta}
          aria-controls={`${base}-gaveta`}
          onClick={() => setGaveta((v) => !v)}
          className="hamburguer -mr-2 flex h-11 w-12 items-center justify-center lg:hidden"
          data-aberto={gaveta}
        >
          <span className="sr-only">{gaveta ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true" className="hamburguer-linha" />
          <span aria-hidden="true" className="hamburguer-linha" />
        </button>
      </div>

      <div
        id={`${base}-gaveta`}
        data-aberto={gaveta}
        inert={!gaveta}
        className="gaveta fixed inset-x-0 top-(--barra-h) bottom-0 overflow-y-auto bg-barra lg:hidden"
      >
        <div className="container-site flex min-h-full flex-col pt-10 pb-10">
          <nav aria-label="Principal (celular)">
            <ul>
              {MENU.map((item) => {
                const id = `${base}-m-${item.label}`;
                const aberta = sanfona === item.label;
                const titulo =
                  "font-display text-[1.6rem] leading-tight tracking-[0.01em] uppercase";
                return (
                  <li key={item.label} className="py-2">
                    {item.mega ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={aberta}
                          aria-controls={id}
                          onClick={() => setSanfona(aberta ? null : item.label)}
                          className={`flex min-h-12 items-center gap-3 ${titulo}`}
                        >
                          {item.label}
                          <Seta aberta={aberta} />
                        </button>
                        <div id={id} hidden={!aberta} className="pt-2 pb-4">
                          <ol>
                            {item.mega.lista.map((l, i) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="flex min-h-11 items-baseline gap-4 text-primary-fg-muted hover:text-primary-fg"
                                  >
                                    <span className="font-mono text-xs">{dois(i)}</span>
                                    <span className="text-base uppercase tracking-[0.06em]">
                                      {l.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            <li>
                              <Link
                                href={item.mega.todos.href}
                                className="flex min-h-11 items-center gap-2 font-label text-[0.74rem] tracking-[0.14em] uppercase"
                              >
                                {item.mega.todos.label} <span aria-hidden="true">→</span>
                              </Link>
                            </li>
                          </ol>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={atual(item.href) ? "page" : undefined}
                        className={`flex min-h-12 items-center ${titulo}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul className="mt-8 flex flex-wrap gap-x-8 border-t border-white/20 pt-6">
            {SECUNDARIOS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center font-label text-[0.74rem] tracking-[0.14em] text-primary-fg-muted uppercase hover:text-primary-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          <div className="mt-12">
            <a href="#contato" onClick={() => setGaveta(false)} className="btn-chanfro">
              Contato
            </a>
            <address className="mt-8 space-y-1 text-sm leading-relaxed text-primary-fg-muted not-italic">
              <p>{addressLine}</p>
              <p>
                <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center hover:text-primary-fg">
                  {site.contact.phone}
                </a>
                {" · "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-primary-fg"
                >
                  WhatsApp {site.contact.whatsapp}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>
    </header>
  );
}

function PainelMega({ id, mega, aberto }: { id: string; mega: Mega; aberto: boolean }) {
  return (
    <div
      id={id}
      data-aberto={aberto}
      inert={!aberto}
      className="mega absolute inset-x-0 top-full border-b border-white/20 bg-barra"
    >
      <div className="container-site grid grid-cols-[1.6fr_1fr] gap-12 py-10">
        <div>
          <p className="font-label text-[0.7rem] tracking-[0.16em] text-primary-fg-muted uppercase">
            Os sete tipos
          </p>
          <ol className="mt-5 grid grid-cols-2 gap-x-10 border-t border-white/20">
            {mega.lista.map((l, i) => (
              <li key={l.href} className="border-b border-white/20">
                <Link
                  href={l.href}
                  className="group flex min-h-12 items-baseline gap-4 py-3 text-primary-fg-muted transition-colors hover:text-primary-fg"
                >
                  <span className="font-mono text-xs">{dois(i)}</span>
                  <span className="text-[1rem] tracking-[0.06em] uppercase">{l.label}</span>
                  <span
                    aria-hidden="true"
                    className="ml-auto -translate-x-1 opacity-0 transition duration-300 ease-degrau group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="border-b border-white/20">
              <Link
                href={mega.todos.href}
                className="flex min-h-12 items-center gap-2 py-3 font-label text-[0.72rem] tracking-[0.16em] uppercase hover:underline hover:underline-offset-4"
              >
                {mega.todos.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ol>
        </div>

        <div className="relative flex min-h-[16rem] flex-col items-start justify-between overflow-hidden p-8">
          <Image src={mega.card.foto} alt="" fill sizes="420px" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_10_14/0.7),rgb(8_10_14/0.15))]" />
          <p className="relative max-w-[16ch] font-display text-[1.35rem] leading-tight uppercase">
            {mega.card.titulo}
          </p>
          <Link href={mega.card.botao.href} className="btn-chanfro relative">
            {mega.card.botao.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
