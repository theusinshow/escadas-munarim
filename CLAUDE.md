# Claude Project Instructions — Escadas Munarim

Site institucional/catálogo da **Escadas Munarim** (São José/SC): escadas pré-moldadas em concreto
polido sob medida. Next.js 16 + Tailwind v4 + TypeScript + GSAP, **estático, sem backend e sem CMS**.

Before making changes, read:

1. `/docs/ai/MASTER_CONTEXT.md`
2. `/docs/ai/PROJECT.md`
3. `/docs/ai/SITE_ARCHITECTURE.md`
4. `/docs/ai/PAGE_BLUEPRINTS.md`
5. `/docs/ai/DESIGN_SYSTEM.md`
6. `/docs/ai/MOTION_DIRECTION.md`
7. `/docs/ai/EXECUTION_PLAN.md`
8. `/docs/ai/QA_CHECKLIST.md`
9. `/docs/ai/DECISIONS_LOG.md`

`/PRODUCT.md` e `/DESIGN.md` na raiz são a camada lida pela skill `impeccable`.

## Rules

- Não implemente antes de ler os docs de arquitetura.
- Não mude a direção visual sem conferir o design system.
- **Não invente fato do cliente.** Nem número, nem depoimento, nem logo, nem certificação, nem prazo,
  nem cota técnica. O que falta está em `/docs/ai/CONTENT_PENDING.md` — vira slot marcado, nunca
  placeholder verossímil.
- Preserve as decisões documentadas; mudanças passam pelo desenvolvedor e viram entrada em
  `DECISIONS_LOG.md` com **Why** e **Affects**.
- Reporte arquivos alterados e pendências ao fim de cada fase.

## Fluxo de trabalho (pedido do desenvolvedor, 2026-11-04)

- Trabalhar sempre na `main` — sem branch, sem worktree.
- Ser o mais rápido possível na alteração: assim que souber o que fazer, implementar direto.
- **Não fazer spec nem plano** (nada de `docs/superpowers/specs|plans`, brainstorming longo ou
  writing-plans). Pergunta só quando a decisão é realmente do desenvolvedor.
- Sempre inline, sem subagentes.
- Testes apenas os necessários: `tsc`/`build` e um screenshot quando a mudança é visual.

## As cinco regras específicas deste projeto

1. **O objetivo é autoridade, não volume de lead.** O CTA de orçamento nunca aparece antes de um
   bloco de prova na mesma página (`DEC-001`).
2. **O leitor é leigo.** Todo termo técnico (vão, pé-direito, espelho, piso) é definido no primeiro
   uso. Escrever para especificador é erro de público (`DEC-002`).
3. **O desenho técnico é o conteúdo, não a decoração.** Os SVGs dos 5 tipos são a espinha do site;
   os 5 precisam ter a mesma escala, ângulo e peso de traço para serem comparáveis (`DEC-009`).
4. **Motion segue a referência adotada (`DEC-067`).** Rolagem suave, revelação por
   desfoque (`data-revela`), título preenchido por scroll, sanfona e paralaxe. Sempre com `reduce`
   respeitado e estado inicial aplicado por JS (`DEC-010` foi substituído em parte).
5. **Imagem de IA é permitida, inclusive em obra** (`DEC-008`) — mas **sem legenda factual**, sem
   pessoa identificável e sem prova social fabricada. Todo arquivo gerado leva prefixo `gen-` e passa
   pela verificação de geometria de `MEDIA_PLAN.md`.

## Fatos verificados (podem ser usados)

- Endereço: Rua Treze de Junho, 893, Flor de Nápolis, São José — SC
- Telefone (48) 3257-2015 · WhatsApp (48) 99981-0707 · vendas@escadasmunarim.com.br · @escadasmunarim
- Tagline: **"Segurança e Design"** · Cor da marca: `#2C445F`
- **15 anos** de mercado (o "13 anos" do site antigo está errado — `DEC-004`)
- 5 tipos no site: reta · caracol · leke · mista · espelho fechado (premium e in loco saíram, `DEC-098`)
- Complementos: corrimão inox escovado polido, ferro galvanizado, guarda-corpo, sacada
- Região: São José e Grande Florianópolis
