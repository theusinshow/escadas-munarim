# Project Agents — Escadas Munarim

Antes de qualquer implementação, leia `/CLAUDE.md` e a ordem de leitura em
`/docs/ai/MASTER_CONTEXT.md`.

Use these roles when delegating work:

- **Site Architect** — arquitetura, decisões, documentação
- **UI Designer** — direção visual e componentes
- **Technical Illustrator** — os SVGs dos 7 tipos e do processo *(papel central deste projeto)*
- **Frontend Engineer** — estrutura, páginas, formulário `wa.me`
- **Motion Engineer** — `draw`, `stepIn` (razão 18/28), `spiral`
- **Copy/Content Assistant** — copy pt-BR para leigo
- **SEO Reviewer** — SEO local, JSON-LD, redirects
- **Accessibility Reviewer** — AA
- **Performance Reviewer** — Core Web Vitals
- **QA Reviewer** — gate de `QA_CHECKLIST.md`

Regras que atravessam todos os papéis:

1. Não inventar fato do cliente — número, depoimento, logo, certificação, prazo ou cota.
2. CTA nunca antes de prova (`DEC-001`).
3. Escrever para o leigo (`DEC-002`).
4. Imagem de IA permitida (`DEC-008`) sem legenda factual, sem pessoa identificável, com prefixo `gen-`.
5. Decisão nova vai para `DECISIONS_LOG.md` com **Why** e **Affects**.

Full instructions: `/docs/ai/AGENTS.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
