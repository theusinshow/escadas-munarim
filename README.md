# Escadas Munarim

Site da **Escadas Munarim** — escadas pré-moldadas em concreto polido sob medida, São José/SC.
Substitui o WordPress em `escadasmunarim.com.br`.

Projeto **Coded by M**.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · GSAP/ScrollTrigger.
**Estático: sem backend, sem banco, sem CMS, sem rota de API.** O formulário de orçamento compõe
uma mensagem e abre o WhatsApp (`DEC-007`).

## Comandos

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servir o build
npm run lint
```

## Documentação

A arquitetura é a fonte da verdade, não o código. Leia antes de mexer:

- [`/CLAUDE.md`](CLAUDE.md) — regras do projeto para agentes
- [`/docs/ai/MASTER_CONTEXT.md`](docs/ai/MASTER_CONTEXT.md) — o projeto em uma página
- [`/docs/ai/EXECUTION_PLAN.md`](docs/ai/EXECUTION_PLAN.md) — as 8 fases
- [`/docs/ai/DECISIONS_LOG.md`](docs/ai/DECISIONS_LOG.md) — toda decisão com Why + Affects
- [`/docs/ai/CONTENT_PENDING.md`](docs/ai/CONTENT_PENDING.md) — o que falta do cliente

## Estado

**Fases 01–08 concluídas** — o site está implementado e auditado. Falta só o material do cliente listado em `CONTENT_PENDING.md` para ir ao ar.
Próximo: destravar as pendências de conteúdo e fazer o deploy.

As páginas ainda exibem o resumo das seções previstas. Isso é intencional: neste projeto placeholder
é slot marcado e visível, nunca texto verossímil inventado.
