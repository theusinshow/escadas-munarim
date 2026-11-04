# Capa tríptico + grade sangrada + barra nova — design

**Data:** 2026-11-04
**Origem:** pedido do desenvolvedor — refactor do site começando pela capa, "uma imagem + letreiro +
galeria no mesmo pique" do site de referência Nord Arch (letreiro gigante em fonte larga sobre foto em
tela cheia, barra transparente com fios finos).
**Vira:** `DEC-053` no `DECISIONS_LOG.md`.
**Escopo:** só capa, grade logo abaixo dela e barra. O resto da home fica como está (DEC-052).

---

## Restrição que define tudo

As 29 fotos do acervo são **todas verticais** (2:3 a 4:5, 1600px de altura). Uma foto vertical
esticada numa dobra 16:9 perde 60% da altura — a parte que mostra o lance da escada. Outpainting já
foi recusado (`DEC-044`).

Saída: **três colunas 2:3 lado a lado**. Numa tela 1920×1000, cada coluna tem 640×1000 ≈ 0,64 — a
proporção do próprio arquivo. A dobra fica cheia como na referência e quase nada é cortado. No
celular a tela já é vertical: uma coluna só, foto inteira.

A letra da referência é uma Eurostile expandida; o site já tem a **Michroma** (a Eurostile livre do
"ESCADAS" do logo). Nenhuma fonte nova entra.

---

## 1. Capa — `components/home/CapaTriptico.tsx` (substitui `CapaGaleria` na home)

### Estrutura

- `section` com `-mt-(--barra-h)`, `h-[100svh]`, `min-h-[36rem]`, fundo `bg-text` (aparece só antes
  da foto carregar), `data-barra="transparente"` (ver §3).
- **Três colunas** (`grid-cols-3` a partir de `md`; abaixo disso, só a primeira coluna renderiza
  visível). Cada coluna é um `RotacaoFotos` em `h-full`, separadas por fio de 1px `white/20`.
- **Distribuição das fotos:** `fotosIntercaladas(tipoSlugs)` (as 29, intercaladas por tipo) repartida
  em round-robin — foto *i* vai para a coluna *i mod 3*. A coluna 1 abre com a capa da reta, a 2 com
  a do caracol, a 3 com a do leke; nenhuma foto aparece em duas colunas.
- **Defasagem:** `RotacaoFotos` ganha a prop opcional `defasagem` (ms antes da primeira troca). As
  colunas usam 0 · ⅓ · ⅔ do intervalo (0 · 1733 · 3467 ms), então nunca trocam juntas. O intervalo de
  5200 ms não muda.

### Letreiro

- Duas linhas em Michroma, caixa alta: **E S C A D A S** no alto, **M U N A R I M** na base. Cada
  linha é um `flex justify-between` de 7 `span`, ocupando a largura toda da tela (padding 24/40px,
  sem o teto de 1280px do `container-site` — como na referência).
- Tamanho `clamp(3rem, 11vw, 12rem)`, `leading-none`, branco. No celular (390px) as 7 letras cabem em
  ~11vw; conferir no screenshot que nenhuma linha quebra.
- **Semântica:** o `h1` é `sr-only` com "Escadas Munarim — Segurança e Design"; as duas linhas
  visuais são irmãs dele, com `aria-hidden` (os rótulos ficam entre elas e não podem entrar no H1). Leitor de tela lê o nome, não sete letras soltas. O logo
  SVG sai do H1 (altera `DEC-050`) e fica na barra.

### Rótulos (`.rotulo-marca`, Michroma pequena, branco)

Na faixa entre as linhas, alinhados às colunas:
- coluna 1: `SÃO JOSÉ — SC`
- coluna 3: `CONCRETO POLIDO SOB MEDIDA`
- canto inferior direito, acima de "MUNARIM": `ROLE A PÁGINA ↓` (link âncora para a grade)
- `IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)` em `0.62rem` no rodapé da capa,
  enquanto `temReferencia` for verdadeiro.

Sem botões: a referência não tem, e a prova (a grade) começa no próximo scroll. Sem pedido de
orçamento (`DEC-001`).

### Texto sobre foto

Hoje a regra é "o texto nunca fica sobre foto". A capa quebra isso de propósito; o contraste vem de
dois degradês em tinta `#1f2d3b`: do topo até 35% (opacidade 0,7 → 0) e da base até 35%
(0,75 → 0). O meio da foto fica limpo. Critério: letreiro ≥ 3:1 (texto grande) e rótulos ≥ 4,5:1,
medidos no screenshot sobre a foto mais clara de cada coluna. Se algum rótulo não passar, ele ganha
uma faixa sólida própria em vez de escurecer mais a foto.

### Motion

- Letras: entram com o deslocamento piso/espelho do `capa-entra` (razão 18/28, `DEC-010`), em CSS
  puro como a capa anterior — roda no primeiro paint, sem esperar hidratação. Uma por vez, a cada
  72ms (18 × 4ms); "ESCADAS" primeiro, "MUNARIM" depois.
- Colunas: revelam com `clip-path` de baixo para cima, defasadas em múltiplos do espelho — as três
  bordas superiores desenham um degrau enquanto abrem.
- `prefers-reduced-motion`: tudo estático, primeira foto de cada coluna, sem rotação (o
  `RotacaoFotos` já respeita).

---

## 2. Grade — `components/home/AcervoGrade.tsx` (substitui `Acervo`; sobe para logo após a capa)

- **De borda a borda** (sem `container-site`): `grid-cols-2` · `md:grid-cols-3` · `lg:grid-cols-4`,
  `gap-px` sobre fundo `bg-border` — o fio de 1px é o próprio fundo aparecendo.
- Cabeçalho curto em `container-site`, acima da grade: `h2` "Acervo" (`.rotulo`) à esquerda,
  `29 FOTOS` à direita (número calculado, nunca digitado).
- **Todas as 29 fotos**, `fotosIntercaladas(tipoSlugs)`, moldura `aspect-[2/3]` com `object-cover`
  (o corte máximo é o das fotos 4:5, ~17% da largura).
- **Última linha:** as células que sobram viram **uma** célula de texto "Ver os sete tipos →"
  (`/escadas`) com `col-span` igual ao resto — calculado por breakpoint a partir de `FOTOS.length`.
  Se a divisão for exata, a célula não aparece. Nunca repete foto para fechar a linha.
- **Hover/foco** (desktop): a foto escurece (`bg-text/55`), aparecem o nome do tipo em Michroma
  `text-2xl` e a posição dentro do tipo (`03 / 06`). **Toque** (sem hover): rótulo pequeno fixo no
  canto inferior esquerdo, sobre um degradê curto.
- Cada célula é um `Link` para `/escadas/[tipo]` com `aria-label` "Escada {tipo} — ver o tipo".
- Entrada com o `StepIn` existente (`selector="li"`).
- Legenda permitida: só o tipo (`MEDIA_PLAN.md`), nunca local, cliente ou ano.

---

## 3. Barra — `components/layout/Navbar.tsx`

### Layout

```
┌──────────────┬──────────────────────────────┬──────────────┐
│ ▣ MUNARIM    │           MENU ═             │   CONTATO •  │
└──────────────┴──────────────────────────────┴──────────────┘
```

- Três células, separadas por fios verticais de 1px; fio horizontal de 1px na base.
- Esquerda: a marca `▣` atual + `MUNARIM` em Michroma (link para `/`).
- Centro: `MENU` + o ícone de três pisos (mantém a animação de degrau no hover). Abre o
  `MenuOverlay` atual, sem mudança.
- Direita: `CONTATO` → `#contato`, âncora no `<footer>` (que ganha `id="contato"`). **Não** leva a
  `/orcamento` e não diz "orçamento" (`DEC-001`). Sem WhatsApp na barra — o `WhatsAppFab` continua
  aparecendo só depois de 200px de scroll.
- Saem a hora local e "São José — Grande Florianópolis" (a cidade passa para a capa). O `HoraLocal`
  fica sem uso.
- Altura continua `--barra-h` (80px).

### Dois estados

- **Transparente:** texto e fios brancos (fios `white/20`), sem fundo. Ativo enquanto um elemento
  `[data-barra="transparente"]` ainda está sob a barra (`IntersectionObserver` com `rootMargin`
  negativo igual à altura da barra).
- **Sólido:** fundo `bg-bg`, texto `--primary`, fios `--border` — o padrão em todas as outras páginas
  e na home depois da capa. Transição de 300ms em cor e fundo.
- A barra não sabe qual página é a home: quem quer barra transparente marca a própria seção. Sem o
  atributo na página, ela já nasce sólida.
- Com o menu aberto, o estado não importa (o overlay cobre a barra).

---

## 4. Home — `app/page.tsx`

Ordem nova: **CapaTriptico → AcervoGrade** → Manifesto → ColecoesDestaque → tipos → PreMoldada →
ProcessoLinha → EmpresaBloco → dúvidas → Fechamento. Sai `Acervo` (a grade o substitui) e
`CapaGaleria` (arquivo mantido, sem uso, como foi feito com `HeroCapa` na DEC-052).

O "vão" saiu da capa. Conferir que o primeiro "vão" da página continua definido no ponto em que
aparece (`DEC-002`); se não estiver, a definição desce junto.

---

## 5. Documentação

- `DECISIONS_LOG.md` — `DEC-053` com **Why** e **Affects**: capa tríptico, H1 vira letreiro (altera
  `DEC-050`), texto sobre foto permitido na capa e na grade com as condições acima, barra com dois
  estados, grade substitui o acervo em alvenaria.
- `DESIGN_SYSTEM.md` e `DESIGN.md` — seção da barra (layout e estados) e a regra de texto sobre foto.
- `PAGE_BLUEPRINTS.md` — ordem da home.

---

## 6. Verificação

- `npm run build` e `npm run lint` limpos.
- Screenshots (Playwright) da home em 1920×1080, 1440×900 e 390×844: capa, transição da barra, grade
  com a última linha.
- Contraste medido conforme §1.
- `prefers-reduced-motion`: capa estática, sem rotação, grade sem entrada.
- Teclado: Tab passa por marca → MENU → CONTATO → "Role a página" → células da grade, com foco
  visível nos dois estados da barra.
- Nenhuma foto repetida dentro da capa; nenhuma repetida dentro da grade.

## Fora de escopo

O resto da home, as páginas internas, `/obras`, e a duplicação de fotos entre a grade e os cards de
`ColecoesDestaque` — fica para a próxima fase do refactor.
