"use client";

import { useRef, useState } from "react";
import { avaliacoes, PERFIL_GOOGLE, RESUMO_GOOGLE, type Avaliacao } from "@/content/avaliacoes";

/**
 * Avaliações no idioma da referência (DEC-073): uma fileira de cartões sem
 * título — avatar com a inicial, nome, quando, o "G" do Google à direita,
 * cinco estrelas com o selo, o texto cortado em quatro linhas com "ler mais"
 * — e a seta para o lado. Fica logo antes do rodapé, no mesmo concreto dele.
 *
 * Só avaliação real (`content/avaliacoes.ts`), copiada do Google como está
 * (DEC-083), com a nota e o total do perfil no alto e o link para ele. Sem
 * nenhuma, os quatro cartões ficam como vagas marcadas com a pendência
 * (CNT-015): o formato aparece, o conteúdo não é inventado.
 */

const VAGAS = 4;
const CORES = ["bg-barra", "bg-[#4a7dbb]", "bg-[#45484c]", "bg-[#182e48]"];

function Estrelas({ nota, vaga, semSelo }: { nota: number; vaga?: boolean; semSelo?: boolean }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role={vaga ? undefined : "img"}
      aria-label={vaga ? undefined : `${nota} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-[1.05rem]" aria-hidden="true">
          <path
            d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"
            fill={vaga || i >= nota ? "none" : "currentColor"}
            stroke="currentColor"
            strokeWidth={vaga || i >= nota ? 1.2 : 0}
            opacity={vaga ? 0.45 : 1}
          />
        </svg>
      ))}
      {!vaga && !semSelo && (
        <svg viewBox="0 0 20 20" className="ml-1.5 size-[1.05rem] text-[#4a7dbb]" aria-label="Avaliação verificada">
          <path
            fill="currentColor"
            d="M10 1l2.1 1.6 2.6-.2.9 2.5 2.3 1.2-.4 2.6L19 10l-1.5 2.1.4 2.6-2.3 1.2-.9 2.5-2.6-.2L10 19l-2.1-1.6-2.6.2-.9-2.5-2.3-1.2.4-2.6L1 10l1.5-2.1-.4-2.6 2.3-1.2.9-2.5 2.6.2z"
          />
          <path d="M6.3 10.2l2.5 2.4 4.9-5" fill="none" stroke="#fff" strokeWidth="1.8" />
        </svg>
      )}
    </span>
  );
}

function LogoGoogle() {
  return (
    <svg viewBox="0 0 48 48" className="size-6 flex-none" aria-label="Google">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Cartao({ a, i }: { a: Avaliacao; i: number }) {
  const [aberto, setAberto] = useState(false);
  return (
    <li className="flex w-[min(80vw,19rem)] flex-none snap-start flex-col">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex size-10 flex-none items-center justify-center rounded-full font-display text-sm text-primary-fg ${CORES[i % CORES.length]}`}
        >
          {a.nome.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-text">{a.nome}</p>
          <p className="text-sm text-chrome-muted">{a.quando}</p>
        </div>
        <LogoGoogle />
      </div>
      <div className="mt-4 text-barra">
        <Estrelas nota={a.nota} />
      </div>
      <p className={`mt-3 text-[0.95rem] leading-relaxed whitespace-pre-line text-text ${aberto ? "" : "line-clamp-4"}`}>
        {a.texto}
      </p>
      {a.texto.length > 160 && (
        <button
          type="button"
          onClick={() => setAberto(!aberto)}
          className="mt-1 inline-flex min-h-11 items-center self-start text-sm text-chrome-muted underline-offset-4 hover:underline"
        >
          {aberto ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </li>
  );
}

function Vaga() {
  return (
    <li className="flex w-[min(80vw,19rem)] flex-none snap-start flex-col">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 flex-none items-center justify-center rounded-full border border-dashed border-barra/50 font-display text-sm text-barra/60"
        >
          ?
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-label text-[0.68rem] tracking-[0.14em] text-barra uppercase">Avaliação real</p>
          <p className="text-sm text-chrome-muted">aguardando</p>
        </div>
      </div>
      <div className="mt-4 text-barra">
        <Estrelas nota={0} vaga />
      </div>
      <p className="spec mt-3 border-l border-barra/40 pl-3 text-[0.68rem] text-chrome-muted">
        CNT-015 — AVALIAÇÃO DO GOOGLE DA MUNARIM, COPIADA COMO ESTÁ, COM O NOME DE QUEM ESCREVEU
      </p>
    </li>
  );
}

export function AvaliacoesTrilho() {
  const trilho = useRef<HTMLUListElement>(null);
  const passo = (dir: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 40), behavior: "smooth" });
  };
  const temReais = avaliacoes.length > 0;

  return (
    <section aria-label="Avaliações de clientes" className="bg-chrome py-24 text-barra lg:py-32">
      <div className="container-site">
        {temReais && (
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-16" data-revela>
            <div className="flex items-center gap-5">
              <span className="font-display text-[clamp(2.6rem,4.4vw,3.8rem)] leading-none">{RESUMO_GOOGLE.nota}</span>
              <div>
                <Estrelas nota={5} semSelo />
                <p className="mt-2 text-sm text-chrome-muted">{RESUMO_GOOGLE.total} avaliações no Google</p>
              </div>
            </div>
            <a href={PERFIL_GOOGLE} target="_blank" rel="noopener noreferrer" className="btn-chanfro-escuro">
              Ver no Google
            </a>
          </div>
        )}
        <div className="flex items-center gap-6" data-revela>
          <ul ref={trilho} className="trilho flex flex-1 gap-10 overflow-x-auto">
            {temReais
              ? avaliacoes.map((a, i) => <Cartao key={a.nome + a.quando} a={a} i={i} />)
              : Array.from({ length: VAGAS }, (_, i) => <Vaga key={i} />)}
          </ul>
          <button
            type="button"
            onClick={() => passo(1)}
            aria-label="Próximas avaliações"
            className="hidden size-11 flex-none items-center justify-center text-barra hover:bg-barra/10 lg:flex"
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
