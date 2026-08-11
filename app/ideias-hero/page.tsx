"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tipos, Tipo } from "@/content/tipos";
import { Axonometry } from "@/components/technical/Axonometry";

export default function IdeiasHeroPage() {
  const [opcaoAtiva, setOpcaoAtiva] = useState<1 | 2 | 3 | 4 | 5 | 6>(5);
  const [tipoSelecionado, setTipoSelecionado] = useState<Tipo>(tipos[0]);
  const [modoVisualizacao, setModoVisualizacao] = useState<"desenho" | "foto">("desenho");

  // Index para a opção 5/6 (slideshow fullscreen)
  const [indexSlide, setIndexSlide] = useState<number>(0);
  const slideAtual = tipos[indexSlide % tipos.length];

  // Filtros para a Opção 3 (Simulador)
  const [filtroSimulador, setFiltroSimulador] = useState<string>("todos");

  const tiposFiltrados = tipos.filter((t) => {
    if (filtroSimulador === "curto") return t.slug === "caracol" || t.slug === "leke";
    if (filtroSimulador === "direto") return t.slug === "reta" || t.slug === "mista";
    if (filtroSimulador === "sem-viga") return t.slug === "leke";
    if (filtroSimulador === "fechado") return t.slug === "espelho-fechado";
    return true;
  });

  return (
    <div className="min-h-screen bg-bg text-text pb-20">
      {/* Barra Superior de Navegação das Opções */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm px-6 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <span className="spec text-accent">PROTÓTIPOS DE HERO SECTION</span>
            <h1 className="text-lg font-bold font-display text-text">
              Comparativo Visual (Incluindo Fullscreen Estilo Avéon)
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 5, label: "✨ 5. Fullscreen Avéon (Hero Foto de Obra)" },
              { id: 6, label: "✨ 6. Fullscreen Avéon + Badge Técnico" },
              { id: 1, label: "1. Manual Técnico" },
              { id: 2, label: "2. Prancha Blueprint" },
              { id: 3, label: "3. Simulador" },
              { id: 4, label: "4. Editorial" },
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => setOpcaoAtiva(op.id as 1 | 2 | 3 | 4 | 5 | 6)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  opcaoAtiva === op.id
                    ? "bg-accent text-white shadow-xs"
                    : "bg-shade text-muted hover:text-text hover:bg-border"
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Container Principal do Protótipo Selecionado */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Banner de Descrição da Opção Ativa */}
        <div className="mb-6 rounded-lg border border-border bg-shade p-4 text-xs">
          {opcaoAtiva === 5 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 05 (ESTILO AVÉON)</span>
              <h2 className="text-base font-bold text-text">Hero Fullscreen com Foto Imersiva & Typography Clean</h2>
              <p className="mt-1 text-muted">
                Inspirado no template Avéon: Imagem 100vh cobrindo toda a tela de fundo, gradiente escuro/navy sutil para leitura perfeita, título minimalista de alto impacto e barra inferior flutuante com seletor dos 7 modelos e navegação por slides.
              </p>
            </div>
          )}
          {opcaoAtiva === 6 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 06 (AVÉON + ENGENHARIA)</span>
              <h2 className="text-base font-bold text-text">Hero Fullscreen + Card de Vidro Flutuante com Desenho SVG</h2>
              <p className="mt-1 text-muted">
                União do visual imersivo Avéon com a autoridade técnica da Munarim. Foto de arquitetura em 100vh + Card de vidro fosco no canto inferior direito que exibe o desenho axonométrico vetorial (SVG) do modelo em destaque.
              </p>
            </div>
          )}
          {opcaoAtiva === 1 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 01</span>
              <h2 className="text-base font-bold text-text">Manual Técnico Interativo</h2>
              <p className="mt-1 text-muted">
                Foco no vetor técnico e na clareza. O cliente escolhe um dos 7 tipos na barra interativa e vê o desenho cotado (SVG Axonometria) e a foto da aplicação lado a lado.
              </p>
            </div>
          )}
          {opcaoAtiva === 2 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 02</span>
              <h2 className="text-base font-bold text-text">Prancha de Arquitetura (Blueprint Clean)</h2>
              <p className="mt-1 text-muted">
                Fundo Navy com estética de prancha técnica de engenharia. Apresenta o catálogo em um visor central imponente com fichas técnicas em DM Mono.
              </p>
            </div>
          )}
          {opcaoAtiva === 3 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 03</span>
              <h2 className="text-base font-bold text-text">Simulador Visual de Vão (Focado na dor do cliente)</h2>
              <p className="mt-1 text-muted">
                Ataca diretamente a maior dúvida do comprador residencial: "Qual escada cabe no meu espaço?". Permite filtrar por tipo de obra e vão.
              </p>
            </div>
          )}
          {opcaoAtiva === 4 && (
            <div>
              <span className="spec text-accent font-semibold">CONCEITO 04</span>
              <h2 className="text-base font-bold text-text">Editorial Split-Screen (Navy + Concreto)</h2>
              <p className="mt-1 text-muted">
                Divisão assimétrica refinada. Esquerda sólida em Navy com a tipografia de marca; Direita em Concreto Polido com exibição dinâmica dos modelos.
              </p>
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 5: FULLSCREEN AVÉON STYLE (FOTO DE FUNDO 100VH) */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 5 && (
          <section className="relative h-[85vh] w-full overflow-hidden rounded-2xl shadow-2xl border border-primary/20 bg-primary">
            {/* Background Fullscreen Image */}
            <div className="absolute inset-0">
              {slideAtual.imagem ? (
                <Image
                  src={slideAtual.imagem.src}
                  alt={slideAtual.imagem.alt}
                  fill
                  priority
                  className="object-cover transition-all duration-700 filter brightness-[0.82] contrast-[1.05]"
                />
              ) : (
                <div className="h-full w-full bg-primary" />
              )}
              {/* Subtle Dark Gradient Veil for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/30" />
            </div>

            {/* Conteúdo Overlay (Estilo Avéon Minimalista) */}
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-14 text-white">
              {/* Header Flutuante do Hero */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 backdrop-blur-xs">
                <div>
                  <span className="font-display font-bold tracking-tight text-xl uppercase text-white">
                    ESCADAS MUNARIM
                  </span>
                  <span className="spec block text-xs text-white/70">SÃO JOSÉ — SC</span>
                </div>
                <div className="spec text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  15 ANOS DE CONFIANÇA · FABRICAÇÃO SOB MEDIDA
                </div>
              </div>

              {/* Meio: Tipografia de Alto Impacto */}
              <div className="my-auto max-w-3xl space-y-4">
                <span className="spec text-xs font-semibold tracking-wider text-accent-wash bg-accent/80 px-3 py-1 rounded-full uppercase">
                  Escadas Pré-Moldadas em Concreto Polido
                </span>
                <h1 className="font-display text-4xl font-semibold leading-tight sm:text-6xl text-white drop-shadow-md">
                  Segurança e design na medida exata do seu vão.
                </h1>
                <p className="text-lg text-white/85 leading-relaxed max-w-2xl font-light">
                  Sete modelos projetados com precisão técnica para residências e obras na Grande Florianópolis. Conheça a engenharia antes de orçar.
                </p>
              </div>

              {/* Rodapé Flutuante: Barra de Controle dos 7 Modelos (Estilo Slider Avéon) */}
              <div className="rounded-xl border border-white/20 bg-primary/80 p-4 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="spec text-[10px] text-white/60 uppercase">MODELO EM DESTAQUE (0{ (indexSlide % tipos.length) + 1 } / 07)</span>
                    <h3 className="font-display text-lg font-bold text-white">
                      Escada {slideAtual.nome} — <span className="text-white/80 font-normal">{slideAtual.destaque}</span>
                    </h3>
                  </div>

                  {/* Seletor dos 7 Tipos */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tipos.map((t, idx) => (
                      <button
                        key={t.slug}
                        onClick={() => setIndexSlide(idx)}
                        className={`rounded px-3 py-1.5 text-xs font-medium transition-all ${
                          indexSlide % tipos.length === idx
                            ? "bg-white text-primary font-bold shadow-md"
                            : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        {t.nome}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 6: FULLSCREEN AVÉON + CARD DE VIDRO TÉCNICO (SVG) */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 6 && (
          <section className="relative h-[85vh] w-full overflow-hidden rounded-2xl shadow-2xl border border-border bg-primary">
            {/* Background Fullscreen Image */}
            <div className="absolute inset-0">
              {slideAtual.imagem ? (
                <Image
                  src={slideAtual.imagem.src}
                  alt={slideAtual.imagem.alt}
                  fill
                  priority
                  className="object-cover transition-all duration-700 filter brightness-[0.75]"
                />
              ) : (
                <div className="h-full w-full bg-primary" />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent" />
            </div>

            {/* Conteúdo Overlay */}
            <div className="relative flex h-full flex-col justify-between p-8 lg:p-12 text-white">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <div className="border-l-2 border-accent pl-3">
                  <span className="font-display text-lg font-bold text-white uppercase">Escadas Munarim</span>
                  <span className="spec block text-xs text-white/70">CATÁLOGO TÉCNICO · SC</span>
                </div>
                <div className="spec text-xs text-white/70">
                  FÁBRICA EM SÃO JOSÉ/SC · 15 ANOS
                </div>
              </div>

              {/* Grid Principal: Texto na Esquerda, Card de Vidro na Direita */}
              <div className="my-auto grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="space-y-5 lg:col-span-7">
                  <span className="spec text-xs font-semibold text-accent-wash bg-accent/90 px-3 py-1 rounded-full uppercase">
                    Catálogo de Concreto Polido
                  </span>
                  <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl text-white drop-shadow-sm">
                    A estrutura ideal para o espaço da sua casa.
                  </h1>
                  <p className="text-base text-white/85 leading-relaxed max-w-xl">
                    Cada modelo responde a uma geometria de vão. Alterne entre os 7 tipos abaixo para conferir o desenho cotado e a foto da instalação.
                  </p>
                  
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href="/escadas"
                      className="rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-primary hover:bg-white/90 transition-all shadow-md"
                    >
                      Explorar os 7 Tipos →
                    </Link>
                    <span className="spec text-xs text-white/60">Sem compromisso · Orçamento via WhatsApp</span>
                  </div>
                </div>

                {/* Card Flutuante de Vidro Fosco com Desenho Técnico (SVG) */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl border border-white/20 bg-primary/75 p-5 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <div>
                        <span className="spec text-[10px] text-white/60">PRANCHA 0{ (indexSlide % tipos.length) + 1 }</span>
                        <h4 className="font-display font-bold text-base text-white">Escada {slideAtual.nome}</h4>
                      </div>
                      <span className="spec text-xs font-semibold text-accent-wash bg-white/15 px-2.5 py-1 rounded">
                        {slideAtual.destaque}
                      </span>
                    </div>

                    {/* Desenho Axonométrico SVG Invertido (Traços Brancos) */}
                    <div className="my-4 flex h-52 items-center justify-center rounded-lg border border-white/10 bg-black/20 p-3">
                      <div className="h-44 w-full [&_svg_path]:stroke-white">
                        <Axonometry slug={slideAtual.slug} title={slideAtual.nome} className="h-full w-full" />
                      </div>
                    </div>

                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {slideAtual.resumo}
                    </p>

                    {/* Seletor rápido em botões */}
                    <div className="mt-4 flex flex-wrap gap-1 border-t border-white/10 pt-3">
                      {tipos.map((t, idx) => (
                        <button
                          key={t.slug}
                          onClick={() => setIndexSlide(idx)}
                          className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
                            indexSlide % tipos.length === idx
                              ? "bg-accent text-white font-bold"
                              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          {t.nome}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 1: MANUAL TÉCNICO INTERATIVO */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 1 && (
          <section className="overflow-hidden rounded-xl border border-border bg-bg shadow-lg">
            <div className="p-6 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="space-y-6 lg:col-span-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent-wash px-3 py-1 text-xs font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    MANUAL TÉCNICO DE ESCADAS
                  </div>
                  <h1 className="font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">
                    Segurança e engenharia sob medida para o seu vão.
                  </h1>
                  <p className="text-base text-muted leading-relaxed">
                    Fabricamos escadas pré-moldadas em concreto polido há 15 anos em São José/SC. Compare os 7 modelos com desenho técnico cotado antes de decidir.
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="border-l-2 border-accent pl-3">
                      <p className="text-sm font-semibold text-text">15 Anos em SC</p>
                      <p className="spec text-xs text-muted">Fábrica em São José</p>
                    </div>
                    <div className="border-l-2 border-border pl-3">
                      <p className="text-sm font-semibold text-text">7 Modelos</p>
                      <p className="spec text-xs text-muted">Desenhos comparáveis</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                      <div>
                        <span className="spec text-xs text-muted">MODELO SELECIONADO</span>
                        <h3 className="text-xl font-bold font-display text-primary">
                          Escada {tipoSelecionado.nome}
                        </h3>
                      </div>
                      <div className="inline-flex rounded-lg border border-border bg-shade p-1 text-xs">
                        <button
                          onClick={() => setModoVisualizacao("desenho")}
                          className={`rounded px-3 py-1.5 font-medium transition-all ${
                            modoVisualizacao === "desenho"
                              ? "bg-surface text-accent font-semibold shadow-xs"
                              : "text-muted hover:text-text"
                          }`}
                        >
                          📐 Desenho Técnico (SVG)
                        </button>
                        <button
                          onClick={() => setModoVisualizacao("foto")}
                          className={`rounded px-3 py-1.5 font-medium transition-all ${
                            modoVisualizacao === "foto"
                              ? "bg-surface text-accent font-semibold shadow-xs"
                              : "text-muted hover:text-text"
                          }`}
                        >
                          📷 Foto da Aplicação
                        </button>
                      </div>
                    </div>

                    <div className="relative mt-6 flex min-h-[300px] items-center justify-center rounded-lg border border-border bg-bg p-4">
                      {modoVisualizacao === "desenho" ? (
                        <div className="w-full max-w-xs">
                          <Axonometry
                            slug={tipoSelecionado.slug}
                            title={tipoSelecionado.nome}
                            className="h-64 w-full"
                          />
                        </div>
                      ) : (
                        <div className="relative h-64 w-full overflow-hidden rounded border border-border">
                          {tipoSelecionado.imagem ? (
                            <Image
                              src={tipoSelecionado.imagem.src}
                              alt={tipoSelecionado.imagem.alt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-shade text-muted spec">
                              Sem foto disponível
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-muted leading-relaxed">
                      <strong className="text-text">Resumo:</strong> {tipoSelecionado.resumo}
                    </p>

                    <div className="mt-6 border-t border-border pt-4">
                      <p className="spec text-xs text-muted mb-2">SELECIONE PARA COMPARAR:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tipos.map((t) => (
                          <button
                            key={t.slug}
                            onClick={() => setTipoSelecionado(t)}
                            className={`rounded px-3 py-1 text-xs font-medium transition-all ${
                              tipoSelecionado.slug === t.slug
                                ? "bg-primary text-primary-fg font-semibold"
                                : "bg-shade text-muted hover:bg-border hover:text-text"
                            }`}
                          >
                            {t.nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 2: PRANCHA DE ARQUITETURA (BLUEPRINT CLEAN) */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 2 && (
          <section className="overflow-hidden rounded-xl bg-primary text-primary-fg shadow-xl">
            <div className="flex items-center justify-between border-b border-primary-fg/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 bg-accent rounded-full" />
                <span className="spec text-xs tracking-wider text-primary-fg-muted">
                  ESCADAS MUNARIM · PRANCHA TÉCNICA 01 / 07
                </span>
              </div>
              <span className="spec text-xs text-primary-fg-muted">SÃO JOSÉ — SC</span>
            </div>

            <div className="p-6 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-5">
                  <h1 className="font-display text-3xl font-semibold leading-tight sm:text-5xl text-white">
                    Segurança e design sob medida.
                  </h1>
                  <p className="text-base text-primary-fg-muted leading-relaxed">
                    Cada modelo de escada em concreto pré-moldado possui uma geometria única de vão e subida. Conheça as especificações do nosso catálogo.
                  </p>

                  <div className="space-y-1.5 pt-4">
                    <p className="spec text-xs text-primary-fg-muted">TIPOS DISPONÍVEIS:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {tipos.map((t) => (
                        <button
                          key={t.slug}
                          onClick={() => setTipoSelecionado(t)}
                          className={`flex items-center justify-between rounded border px-3 py-2 text-left text-xs font-mono transition-colors ${
                            tipoSelecionado.slug === t.slug
                              ? "border-accent bg-accent/20 text-white font-bold"
                              : "border-primary-fg/20 text-primary-fg-muted hover:border-primary-fg/40 hover:text-white"
                          }`}
                        >
                          <span>{t.nome}</span>
                          <span className="spec text-[10px] opacity-75">{t.destaque}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative rounded-lg border border-primary-fg/20 bg-primary-fg/5 p-6 backdrop-blur-xs">
                    <div className="flex items-center justify-between border-b border-primary-fg/15 pb-3">
                      <span className="spec text-xs text-accent">DESENHO AXONOMÉTRICO</span>
                      <span className="spec text-xs text-primary-fg-muted">
                        TIPO: {tipoSelecionado.nome.toUpperCase()}
                      </span>
                    </div>

                    <div className="my-6 flex h-72 items-center justify-center rounded border border-primary-fg/10 bg-primary/40 p-4">
                      <Axonometry
                        slug={tipoSelecionado.slug}
                        title={tipoSelecionado.nome}
                        className="h-60 w-full"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-primary-fg/15 pt-4 text-xs font-mono">
                      <div>
                        <span className="text-primary-fg-muted block">DESTAQUE</span>
                        <span className="text-white font-semibold">{tipoSelecionado.destaque}</span>
                      </div>
                      <div>
                        <span className="text-primary-fg-muted block">MATERIAL</span>
                        <span className="text-white font-semibold">Concreto Polido</span>
                      </div>
                      <div>
                        <span className="text-primary-fg-muted block">FABRICAÇÃO</span>
                        <span className="text-white font-semibold">São José/SC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 3: SIMULADOR VISUAL DE VÃO */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 3 && (
          <section className="overflow-hidden rounded-xl border border-border bg-surface p-6 shadow-md lg:p-10">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <span className="spec text-accent font-semibold">GUIA INTERATIVO DE COMPRA</span>
              <h1 className="font-display text-3xl font-semibold text-text sm:text-4xl">
                Qual escada é a ideal para a sua obra?
              </h1>
              <p className="text-muted text-base leading-relaxed">
                Toda obra tem restrições de espaço e uso. Escolha a situação que mais se adapta ao seu projeto para ver o modelo recomendado:
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { id: "todos", label: "🔍 Todos os 7 Modelos" },
                  { id: "curto", label: "📐 Pouco Espaço no Vão" },
                  { id: "direto", label: "🚶 Subida Direta & Confortável" },
                  { id: "sem-viga", label: "✨ Sem Viga Aparente (Leve)" },
                  { id: "fechado", label: "🔒 Espaço Sob Escada / Fechado" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFiltroSimulador(f.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      filtroSimulador === f.id
                        ? "bg-accent text-white shadow-xs"
                        : "bg-shade text-muted hover:bg-border hover:text-text"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tiposFiltrados.map((t) => (
                <div
                  key={t.slug}
                  className="group rounded-lg border border-border bg-bg p-5 transition-all hover:border-accent hover:shadow-md"
                >
                  <div className="flex h-44 items-center justify-center rounded border border-border bg-surface p-2">
                    <Axonometry slug={t.slug} title={t.nome} className="h-36 w-full" />
                  </div>
                  <div className="mt-4">
                    <span className="spec text-xs text-accent font-semibold">{t.destaque}</span>
                    <h3 className="text-lg font-bold font-display text-text group-hover:text-accent">
                      Escada {t.nome}
                    </h3>
                    <p className="mt-2 text-xs text-muted line-clamp-2">{t.resumo}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* PROTÓTIPO 4: EDITORIAL SPLIT-SCREEN */}
        {/* -------------------------------------------------------------------------- */}
        {opcaoAtiva === 4 && (
          <section className="overflow-hidden rounded-xl border border-border shadow-lg">
            <div className="grid lg:grid-cols-12 min-h-[550px]">
              <div className="bg-primary p-8 lg:p-12 text-primary-fg lg:col-span-6 flex flex-col justify-between space-y-8">
                <div>
                  <p className="font-display text-4xl font-bold uppercase tracking-tight text-white leading-none">
                    ESCADAS
                    <br />
                    MUNARIM
                  </p>
                  <hr className="my-6 border-primary-fg/20 w-24" />
                  <h1 className="font-display text-2xl font-semibold leading-snug sm:text-3xl text-white">
                    Segurança e design sob medida para a sua arquitetura.
                  </h1>
                  <p className="mt-4 text-sm text-primary-fg-muted leading-relaxed max-w-md">
                    Há 15 anos fabricando escadas pré-moldadas em concreto polido na Grande Florianópolis. Conheça nossa engenharia antes de orçar.
                  </p>
                </div>

                <div className="border-t border-primary-fg/20 pt-6">
                  <p className="spec text-xs text-primary-fg-muted">DADOS VERIFICADOS DA FÁBRICA:</p>
                  <div className="mt-2 flex items-center gap-6 font-mono text-xs">
                    <div>
                      <span className="block text-lg font-bold text-white">15 ANOS</span>
                      <span className="text-primary-fg-muted">de mercado</span>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white">07 TIPOS</span>
                      <span className="text-primary-fg-muted">de escadas</span>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white">SÃO JOSÉ</span>
                      <span className="text-primary-fg-muted">Santa Catarina</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bg p-8 lg:p-12 lg:col-span-6 flex flex-col justify-center space-y-6">
                <span className="spec text-xs text-accent font-semibold">NOSSO CATÁLOGO TÉCNICO</span>
                <h2 className="text-xl font-bold font-display text-text">
                  Sete modelos projetados para diferentes vãos
                </h2>
                
                <div className="space-y-4">
                  {tipos.slice(0, 3).map((t) => (
                    <div
                      key={t.slug}
                      onClick={() => setTipoSelecionado(t)}
                      className="cursor-pointer flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all hover:border-accent hover:shadow-xs"
                    >
                      <div className="h-16 w-20 flex-shrink-0 flex items-center justify-center rounded border border-border bg-bg">
                        <Axonometry slug={t.slug} title={t.nome} className="h-14 w-full" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-text">Escada {t.nome}</h4>
                        <p className="text-xs text-muted">{t.destaque}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/escadas"
                    className="inline-flex items-center text-xs font-semibold text-accent hover:underline"
                  >
                    Ver todas as 7 escadas com desenhos completos →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Rodapé Informativo */}
        <div className="mt-10 rounded-lg border border-border bg-surface p-5 text-center shadow-xs">
          <h3 className="font-display text-base font-bold text-text">Explore os botões superiores para comparar</h3>
          <p className="mt-1 text-xs text-muted">
            As opções 5 e 6 trazem o estilo imersivo de imagem full-screen (100vh) inspirado no Avéon, adaptado à identidade e dados de fábrica da Escadas Munarim.
          </p>
        </div>
      </main>
    </div>
  );
}
