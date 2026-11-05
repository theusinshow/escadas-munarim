# Auditoria — 2026-11-05

Passe completo pedido pelo desenvolvedor: `/impeccable audit` (detector + verificação manual),
checklist do `/ui-ux-pro-max` (§1–§3: acessibilidade, toque, performance) e leitura estética do
`/frontend-design` (AI slop). Rotas: as 11 do site + as 5 de `/artigos`, em 1440, 1024, 768 e 390px,
com e sem movimento reduzido.

Ferramentas: detector do impeccable (código e URL), axe-core 4.10 (WCAG 2.1 A/AA + boas práticas),
varredura própria de transbordo, alvo de toque, texto pequeno e hierarquia de títulos (Playwright).

## Nota

| # | Dimensão | Antes | Depois | Achado principal |
|---|---|---|---|---|
| 1 | Acessibilidade | 2 | 3 | estrelas com `aria-label` sem papel; FAB fora de landmark; "Ler mais" com 20px de altura |
| 2 | Performance | 3 | 3 | estático, AVIF/WebP via `next/image`; a hélice usa 14 `<img>` lazy e pausa fora da tela |
| 3 | Responsivo | 3 | 4 | zero transbordo nas 4 larguras; o corte cotado rola de lado no celular de propósito |
| 4 | Tema/tokens | 3 | 3 | cores de avatar e a paleta das figuras em hex no CSS (intencional, documentado) |
| 5 | Integridade | 2 | 3 | `display:block` fora de camada duplicava o desenho do processo; easing com quique; zoom em foto |
| | **Total** | **13/20** | **16/20** | Aceitável → **Bom** |

## Veredito de integridade

**Passa.** O sistema é específico do produto: figuras técnicas próprias (método Anatomy), paleta
dos materiais, tipografia do logo, conteúdo sem número inventado. Os desvios achados eram de
implementação (CSS fora de camada, curva de animação, efeito de hover genérico), não de direção.

## Achados e o que foi feito

### P1

- **Desenho duplicado em Como funciona** — `.figura { display:block }` fora de `@layer` vencia o
  `lg:hidden`. Cada etapa mostrava a figura duas vezes no desktop. *Corrigido* (DEC-094): regra
  removida e etapa refeita com um desenho só.
- **Estrelas com `aria-label` em `span` sem papel** (axe: `aria-prohibited-attr`) — o leitor de
  tela ignorava a nota. *Corrigido*: `role="img"`.

### P2

- **Easing com quique no cartão que vira** (`cubic-bezier(0.25, 1.35, 0.4, 1)`) — *corrigido*:
  saída exponencial.
- **Zoom de foto no hover** em 4 componentes — assinatura de interface gerada. *Corrigido*:
  escurecimento discreto.
- **Botão do WhatsApp fora de landmark** (axe: `region`) — *corrigido*: `aside` próprio.
- **`aside` dentro de `main`** em Dúvidas e Orçamento (axe) — *corrigido*: `div`.
- **"Ler mais" com 20px de altura** — *corrigido*: alvo de 44px.
- **"Virar ↻" em 10,6px** — *corrigido*: 11,5px.
- **Tabelas dos artigos forçavam rolagem lateral no celular** — *corrigido*.
- **Título com "ENCOMENDAR" transbordando em 390px** (Dúvidas e Artigos) — *corrigido* no texto.

### Aceitos (falso positivo ou decisão registrada)

- **Contraste 1,7:1 no lema que se preenche** — é a camada apagada, `aria-hidden`, coberta pela
  camada de cor com contraste pleno. Efeito de `DEC-067`.
- **`clipped-overflow-container`** — imagens `fill` dentro de contêiner recortado: é o recorte que
  se quer.
- **Caixa alta em títulos** — direção tipográfica do sistema (fonte do logo, `DEC-050`).
- **Cotas do corte em 9px** — medida do `viewBox`; o desenho é escalado e a cota aparece com cerca
  de 12px no celular.
- **Rótulos em 11,5px** (`font-label`) — micro-rótulos do sistema, sempre acompanhados de texto
  maior.

## O que funciona bem

- Formulário: rótulo visível, 16px, 48px de altura, `autocomplete`, teclado numérico no telefone,
  foco no primeiro erro, mensagem pronta para o WhatsApp.
- Um `h1` por página, sem salto de nível de título.
- Movimento reduzido respeitado em todos os componentes animados (capa, hélice, cartões, lema).
- Menu: Esc fecha e devolve o foco; a gaveta trava a rolagem e libera ao navegar.
- Dados estruturados: `FAQPage` só com perguntas respondidas, `BreadcrumbList`, `Article`.

## Pendente

- Performance medida em campo (Lighthouse/CrUX) depois do deploy — não medida aqui.
- Fotos de banco e de referência no lugar de obra real (CNT-003).
- Revisão técnica dos artigos pela empresa (CNT-017).
