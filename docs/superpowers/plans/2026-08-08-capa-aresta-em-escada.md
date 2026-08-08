# Capa com aresta em escada — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** dar à capa da home uma massa de concreto claro cuja borda superior é uma escada de 7 degraus — uma por tipo do catálogo — que sobe no carregamento e indica o tipo da vez, e trocar o wordmark solto por um lockup que diz o que a empresa vende.

**Architecture:** a massa é um elemento absoluto, irmão do grid da capa, feito de 7 lajes de altura crescente. Toda a geometria sai de duas contas em CSS (`calc((100% - 24px) / 2)` e `aspect-ratio: 28/18`) — não há altura nem largura escrita à mão, e nenhum valor de breakpoint. O movimento reusa `DUR`, `STAGGER`, `EASE`, `jaVisivel` e `comMovimento` de `lib/motion.ts`; o indicador reusa o `setInterval` que já existe no componente.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, TypeScript, GSAP. Sem test runner.

## Global Constraints

- **Não existe test runner neste repositório e nenhum será instalado.** O ciclo de verificação é o que todo `DEC-*` do projeto documenta: `npx tsc --noEmit` + `npx eslint` + `npm run build` + **script de medição em Playwright (Python) contra `npm run start`**. O TDD deste plano é: escrever a medição, rodá-la e vê-la falhar, implementar, rodá-la e vê-la passar.
- **Playwright:** disponível via Python do sistema (`python -c "import playwright"` funciona). Rodar sempre através de `python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" --server "npm run start" --port 3000 -- python <script>`.
- **Scripts de medição** vão em `C:\Users\Matheus\AppData\Local\Temp\claude\c--Dev-pessoal-portfolio-escadas-minarum\501fd188-45c0-4e81-ba87-9d478ccd02a0\scratchpad\` — nunca no repositório.
- **Nenhuma constante de motion nova.** Só `DUR` (0.28), `STAGGER` (0.18), `EASE` e o teto `STAGGER × 6` de `lib/motion.ts`.
- **Nenhum fato inventado.** Copy nova permitida apenas a partir da lista verificada do `CLAUDE.md`. As duas frases deste plano — `Escadas pré-moldadas de concreto polido, sob medida.` e `SETE TIPOS · 15 ANOS` — já estão validadas na spec §5.
- **O H1 novo é, literalmente:** `Segurança e design, na medida exata do seu vão.`
- **`DEC-001`:** nenhum CTA de orçamento na capa. Não adicionar botão.
- **`DEC-033`:** a tinta do wordmark fica ancorada em 100px das duas bordas no desktop, 24px no mobile. Qualquer deslocamento é regressão.
- **`git`** (resolvido em 2026-08-08, antes da execução): o projeto ganhou **repositório próprio** — `origin` é `https://github.com/theusinshow/escadas-munarim`, ainda sem nenhum push. A baseline é o commit `6d0d83b` em `main` e o trabalho acontece na branch **`capa-aresta-em-escada`**. Os passos de commit deste plano valem normalmente. **Não fazer `git push`** — publicar é decisão do desenvolvedor, tomada ao fim.
- **`docs/ai/referencias/` é git-ignored** por decisão do desenvolvedor: 72 achados de Pinterest/Google, vários com marca d'água de terceiro e nenhum com licença registrada. Não versionar, não mover, não citar como asset publicável.

---

## Correção da spec, aplicada neste plano

A spec §9 deixou o mobile em aberto ("massa a ~45% da largura … não visto em navegador", com fallback de omitir abaixo de `lg`). **Isso não é mais necessário.** Derivando a largura pedida na spec §3 (da linha da coluna 7 até a borda direita):

```
largura = (W − p) − 6c − 6g,  com c = (W − 2p − 11g)/12
        = (W − g) / 2                    ← o gutter p se cancela
```

Com `g = 24px` (`gap-x-6`), a largura é `calc((100% - 24px) / 2)` **em qualquer largura de tela**:

| Viewport | Largura da massa | Altura (× 18/28) |
|---|---|---|
| 1440 | 708px | 455px |
| 390 | 183px | 118px |

708×455 é exatamente o que a spec §3 previu para o desktop, e 183×118 fica dentro do envelope que a spec §9 chutou como "~176×113". **Uma fórmula só, sem valor de breakpoint e sem fallback.** A colisão com o lockup no mobile é resolvida na Task 1 travando a largura do lockup, e verificada na Task 2.

---

## Estrutura de arquivos

| Arquivo | Responsabilidade | Tasks |
|---|---|---|
| `components/home/HeroCapa.tsx` | markup da capa: lockup, massa, lajes, ligação do indicador ao `atual`, efeito de entrada | 1, 2, 3, 4 |
| `app/globals.css` | `.capa-escada`, `.capa-laje`, `.capa-descritor` — geometria e cor | 1, 2, 3 |
| `docs/ai/DECISIONS_LOG.md` | `DEC-041` | 5 |
| `docs/ai/DESIGN_SYSTEM.md` | o lockup da capa | 5 |
| `docs/ai/PAGE_BLUEPRINTS.md` | estrutura low-fi da capa | 5 |

Nenhum arquivo novo de código. `lib/motion.ts` é **consumido**, não alterado.

---

### Task 1: O lockup e o H1

Primeiro porque fixa a geometria do texto contra a qual a massa vai ser medida nas tasks seguintes.

**Files:**
- Modify: `components/home/HeroCapa.tsx:132-141` (bloco do H1) e `:155-176` (célula do wordmark)
- Modify: `app/globals.css` — nova classe `.capa-descritor` dentro de `@layer components`
- Test: script de medição no scratchpad (não versionado)

**Interfaces:**
- Consumes: nada de tasks anteriores.
- Produces: os seletores `p.font-display` (wordmark), `#capa-titulo` (H1) e `.capa-lockup` (envelope do lockup, usado pela Task 2 para checar colisão no mobile).

- [ ] **Step 1: Escrever a medição que vai falhar**

Criar `<scratchpad>/t1_lockup.py`:

```python
import json
from playwright.sync_api import sync_playwright

MED = """
() => {
  const sec = document.querySelector('section[aria-labelledby="capa-titulo"]');
  const r = sec.getBoundingClientRect();
  const tinta = (sel) => {
    const el = sec.querySelector(sel);
    if (!el) return null;
    const rg = document.createRange(); rg.selectNodeContents(el);
    const b = rg.getBoundingClientRect();
    return {left: Math.round(b.left - r.left), top: Math.round(b.top - r.top),
            bottom: Math.round(r.bottom - b.bottom), w: Math.round(b.width)};
  };
  const lockup = sec.querySelector('.capa-lockup');
  return {
    h1: (sec.querySelector('#capa-titulo').textContent || '').trim(),
    wordmark: tinta('p.font-display'),
    descritor: (sec.querySelector('.capa-descritor')?.textContent || '').trim(),
    fatos: (sec.querySelector('.capa-lockup .spec')?.textContent || '').trim(),
    filete: !!sec.querySelector('.capa-lockup hr'),
    lockupW: lockup ? Math.round(lockup.getBoundingClientRect().width) : null,
    corpoWordmark: parseFloat(getComputedStyle(sec.querySelector('p.font-display')).fontSize),
  };
}
"""

esperado_h1 = "Segurança e design, na medida exata do seu vão."
esperado_desc = "Escadas pré-moldadas de concreto polido, sob medida."
esperado_fatos = "SETE TIPOS · 15 ANOS"

falhas = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for w, h, nome in [(1440, 900, "desktop"), (390, 844, "mobile")]:
        page = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
        page.goto("http://localhost:3000/", wait_until="networkidle")
        page.wait_for_timeout(400)
        d = page.evaluate(MED)
        print(f"--- {nome} ---"); print(json.dumps(d, indent=1, ensure_ascii=False))

        if d["h1"] != esperado_h1: falhas.append(f"{nome}: H1 e '{d['h1']}'")
        if d["descritor"] != esperado_desc: falhas.append(f"{nome}: descritor errado")
        if d["fatos"] != esperado_fatos: falhas.append(f"{nome}: linha de fatos errada")
        if not d["filete"]: falhas.append(f"{nome}: sem filete")

        wm = d["wordmark"]
        alvo = 100 if nome == "desktop" else 24
        if wm["left"] != alvo: falhas.append(f"{nome}: wordmark em x={wm['left']}, esperado {alvo} (DEC-033)")

        corpo_alvo = 88.0 if nome == "desktop" else 28.0
        if abs(d["corpoWordmark"] - corpo_alvo) > 1.5:
            falhas.append(f"{nome}: corpo do wordmark {d['corpoWordmark']}, esperado ~{corpo_alvo}")

        if nome == "mobile" and d["lockupW"] and d["lockupW"] > 183:
            falhas.append(f"mobile: lockup com {d['lockupW']}px, precisa caber em <=183px (a massa comeca em x=207)")
        page.close()
    b.close()

print("\n>>> FALHAS:", len(falhas))
for f in falhas: print("  -", f)
raise SystemExit(1 if falhas else 0)
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npm run build && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t1_lockup.py"
```

Esperado: FALHA. O H1 ainda é `Escadas de concreto pré-moldado, sob medida para o seu vão.`, não há `.capa-descritor`, não há filete, e o corpo do wordmark é 104px.

- [ ] **Step 3: Adicionar `.capa-descritor` ao `globals.css`**

Dentro de `@layer components`, logo antes do bloco `/* Cota / spec */`:

```css
  /* Descritor do lockup da capa (DEC-041). Dois degraus da escala do sistema,
     nenhum corpo fora dela: no mobile ele divide espaço com a massa de concreto
     e precisa caber em três linhas curtas. */
  .capa-descritor {
    font-size: var(--text-body);
    line-height: var(--lh-body);
    font-weight: 500;
  }

  @media (min-width: 1024px) {
    .capa-descritor {
      font-size: var(--text-h4);
      line-height: var(--lh-h4);
    }
  }
```

- [ ] **Step 4: Trocar o H1 em `HeroCapa.tsx`**

Substituir a linha 134 (o texto dentro do `<h1>`) por:

```tsx
              Segurança e design, na medida exata do seu vão.
```

O resto do bloco (o `<p>` de apoio) não muda.

- [ ] **Step 5: Trocar a célula do wordmark pelo lockup**

Substituir todo o conteúdo da célula (linhas 156–175, do comentário `A placa daqui saiu...` até o `</p>`) por:

```tsx
            {/* O lockup (`DEC-041`). O nome deixou de vir sozinho: filete,
                descritor e linha de fatos abaixo dele. O corpo caiu de 104px
                para 88px porque 104 contra um descritor de 24px lê como nome
                gigante com nota de rodapé (razão 4,3:1) em vez de lockup; a
                88px fecha em 3,7:1 e o bloco cola. Isso aproxima o wordmark do
                teto de display do sistema (72px) e reduz — sem eliminar — a
                exceção nomeada do `DEC-031`.

                `max-w` no mobile não é estética: a massa de concreto começa em
                x=207 numa tela de 390, e sem trava o descritor passaria por
                baixo dela.

                O par `py-6`/`-mb-6` da antiga placa não voltou: ele existia
                para cobrir foto, e a foto saiu no `DEC-040`. */}
            <div className="capa-lockup max-w-[183px] sm:max-w-none">
              {/* `w-fit` no envelope: o filete se mede pela tinta do nome, não
                  pela coluna do grid. */}
              <div className="w-fit">
                <p className="font-display text-[clamp(1.75rem,6.1vw,5.5rem)] leading-[0.88] font-semibold tracking-[-0.03em] uppercase">
                  Escadas
                  <br />
                  Munarim
                </p>
                <hr className="mt-4 border-0 border-t border-primary-fg/40" />
              </div>
              <p className="capa-descritor mt-3 max-w-[44ch]">
                Escadas pré-moldadas de concreto polido, sob medida.
              </p>
              <p className="spec mt-2 text-primary-fg-muted">SETE TIPOS · 15 ANOS</p>
            </div>
```

Nota: a linha de fatos usa a classe `.spec` que já existe (DM Mono, `--text-small`, 14px) em vez dos 13px que a spec §5 escreveu. Reusar o componente estabelecido do sistema vale mais que casar com um número; registrar isso no `DEC-041` (Task 5).

- [ ] **Step 6: Rodar a medição e confirmar que passa**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npx tsc --noEmit && npx eslint components/home/HeroCapa.tsx && npm run build && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t1_lockup.py"
```

Esperado: `>>> FALHAS: 0` e saída 0. `tsc`, `eslint` e `build` limpos.

- [ ] **Step 7: Commit**

```bash
git add components/home/HeroCapa.tsx app/globals.css
git commit -m "feat(capa): wordmark vira lockup com descritor e fatos; H1 novo"
```

---

### Task 2: A massa de concreto e as 7 lajes (estática)

**Files:**
- Modify: `components/home/HeroCapa.tsx` — novo elemento absoluto como **primeiro filho** da `<section>`
- Modify: `app/globals.css` — `.capa-escada` e `.capa-laje`
- Test: script de medição no scratchpad

**Interfaces:**
- Consumes: `.capa-lockup` da Task 1 (para a checagem de não-colisão no mobile).
- Produces: o container `.capa-escada` e as 7 `.capa-laje` com `--i` de 0 a 6, na ordem de `SLIDES`. A Task 3 liga a cor delas ao `atual`; a Task 4 anima o `scaleY` delas.

- [ ] **Step 1: Escrever a medição que vai falhar**

Criar `<scratchpad>/t2_massa.py`:

```python
import json
from playwright.sync_api import sync_playwright

MED = """
() => {
  const sec = document.querySelector('section[aria-labelledby="capa-titulo"]');
  const r = sec.getBoundingClientRect();
  const esc = sec.querySelector('.capa-escada');
  if (!esc) return {erro: 'sem .capa-escada'};
  const e = esc.getBoundingClientRect();
  const lajes = [...esc.querySelectorAll('.capa-laje')].map(l => {
    const b = l.getBoundingClientRect();
    const cs = getComputedStyle(l);
    return {i: cs.getPropertyValue('--i').trim(),
            hPct: Math.round(b.height / e.height * 1000) / 10,
            left: Math.round(b.left - e.left), bg: cs.backgroundColor,
            hidden: l.getAttribute('aria-hidden')};
  });
  // a TINTA do lockup, nao a caixa: no desktop `.capa-lockup` e um bloco que
  // ocupa as 12 colunas, entao a caixa dele cruzaria a massa sempre e a
  // checagem de colisao daria falso positivo.
  const rgL = document.createRange();
  rgL.selectNodeContents(sec.querySelector('.capa-lockup'));
  const lk = rgL.getBoundingClientRect();
  return {
    secao: {w: Math.round(r.width), h: Math.round(r.height)},
    massa: {w: Math.round(e.width), h: Math.round(e.height),
            razao: Math.round(e.height / e.width * 1000) / 1000,
            esq: Math.round(e.left - r.left), topo: Math.round(e.top - r.top),
            baseNoPe: Math.round(r.bottom - e.bottom),
            direitaNaBorda: Math.round(r.right - e.right)},
    lajes,
    lockupTinta: {dir: Math.round(lk.right - r.left), base: Math.round(lk.bottom - r.top)},
    colideLockup: lk.right > e.left && lk.bottom > e.top,
  };
}
"""

falhas = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for w, h, nome, larg_alvo in [(1440, 900, "desktop", 708), (390, 844, "mobile", 183)]:
        page = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
        page.goto("http://localhost:3000/", wait_until="networkidle")
        page.wait_for_timeout(400)
        d = page.evaluate(MED)
        print(f"--- {nome} ---"); print(json.dumps(d, indent=1, ensure_ascii=False))
        if d.get("erro"):
            falhas.append(f"{nome}: {d['erro']}"); page.close(); continue

        m = d["massa"]
        if abs(m["razao"] - 0.643) > 0.01:
            falhas.append(f"{nome}: razao {m['razao']}, esperado 0.643 (18/28)")
        if abs(m["w"] - larg_alvo) > 2:
            falhas.append(f"{nome}: largura {m['w']}, esperado {larg_alvo}")
        if m["baseNoPe"] != 0 or m["direitaNaBorda"] != 0:
            falhas.append(f"{nome}: massa nao esta ancorada no canto inferior direito")
        if len(d["lajes"]) != 7:
            falhas.append(f"{nome}: {len(d['lajes'])} lajes, esperado 7")
        for k, l in enumerate(d["lajes"]):
            alvo = round((k + 1) * 100 / 7, 1)
            if abs(l["hPct"] - alvo) > 0.6:
                falhas.append(f"{nome}: laje {k} com {l['hPct']}% de altura, esperado {alvo}%")
            if l["hidden"] != "true":
                falhas.append(f"{nome}: laje {k} sem aria-hidden")
        if d["colideLockup"]:
            falhas.append(f"{nome}: massa colide com o lockup")

        if nome == "desktop":
            wm = page.evaluate("""() => {
              const sec = document.querySelector('section[aria-labelledby="capa-titulo"]');
              const rg = document.createRange();
              rg.selectNodeContents(sec.querySelector('p.font-display'));
              const b = rg.getBoundingClientRect();
              return Math.round(b.right - sec.getBoundingClientRect().left);
            }""")
            folga = m["esq"] - wm
            print(f"folga wordmark->massa: {folga}px")
            if folga < 100:
                falhas.append(f"desktop: folga wordmark->massa {folga}px, minimo 100 (spec §3)")
            h1b = page.evaluate("""() => {
              const sec = document.querySelector('section[aria-labelledby="capa-titulo"]');
              const b = sec.querySelector('#capa-titulo').getBoundingClientRect();
              return Math.round(b.bottom - sec.getBoundingClientRect().top);
            }""")
            folga_h1 = m["topo"] - h1b
            print(f"folga H1->massa: {folga_h1}px")
            if folga_h1 < 100:
                falhas.append(f"desktop: folga H1->massa {folga_h1}px, minimo 100 (spec §3)")
        page.close()
    b.close()

print("\n>>> FALHAS:", len(falhas))
for f in falhas: print("  -", f)
raise SystemExit(1 if falhas else 0)
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t2_massa.py"
```

Esperado: FALHA com `sem .capa-escada` nos dois viewports.

- [ ] **Step 3: Adicionar `.capa-escada` e `.capa-laje` ao `globals.css`**

Dentro de `@layer components`, imediatamente antes de `.capa-descritor`:

```css
  /* ---------- A aresta em escada da capa (DEC-041) ----------
     A fronteira entre o navy e o concreto claro é o produto, em escala
     arquitetônica: 7 lajes de largura igual e altura crescente — uma por tipo
     do catálogo — cujo perfil é uma escada de degraus iguais.

     Nenhuma medida foi escolhida. A largura é a linha da coluna 7 do grid da
     capa até a borda direita; com 12 colunas e gap de 24px essa conta resolve
     para (100% − gap) / 2, e o gutter se cancela — por isso vale igual no
     mobile e no desktop, sem valor de breakpoint. A altura sai da razão real
     do degrau via `aspect-ratio`, então não existe altura escrita à mão. */
  .capa-escada {
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc((100% - 24px) / 2);
    aspect-ratio: 28 / 18;
    pointer-events: none;
  }

  .capa-laje {
    position: absolute;
    bottom: 0;
    /* +0,4%: sem a sobreposição o antialiasing deixa um fio de navy entre as
       lajes, do mesmo jeito que no botão em degraus (`DEC-038`). */
    width: calc(100% / 7 + 0.4%);
    left: calc(var(--i) * 100% / 7);
    /* escrito como soma, e não como `calc((var(--i) + 1) * 100% / 7)`: é a
       mesma conta, mas sem aritmética dentro de parêntese com `var()`, que é a
       forma que já foi verificada em navegador no botão em degraus. */
    height: calc(var(--i) * 100% / 7 + 100% / 7);
    background: var(--shade);
    transform-origin: 50% 100%;
    transition: background-color 150ms linear;
  }

  /* Concreto bruto em repouso, concreto polido no tipo da vez: é o material
     antes e depois do beneficiamento que a empresa vende, não destaque
     arbitrário. */
  .capa-laje[data-vez="true"] {
    background: var(--surface);
  }
```

- [ ] **Step 4: Renderizar a massa em `HeroCapa.tsx`**

Inserir como **primeiro filho** da `<section>`, antes do `<div className="px-6 lg:px-10">`:

```tsx
      {/* A massa de concreto, primeiro filho de propósito: ela e o grid são os
          dois elementos posicionados da seção, e a ordem no DOM é o que faz o
          grid pintar por cima sem precisar de `z-index`. */}
      <div className="capa-escada" aria-hidden="true">
        {SLIDES.map((t, i) => (
          <span
            key={t.slug}
            aria-hidden="true"
            className="capa-laje"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
```

- [ ] **Step 5: Rodar a medição e confirmar que passa**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npx tsc --noEmit && npx eslint components/home/HeroCapa.tsx && npm run build && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t2_massa.py"
```

Esperado: `>>> FALHAS: 0`. Confirmar na saída: razão 0.643 nos dois viewports, largura 708/183, 7 lajes com alturas 14.3 / 28.6 / 42.9 / 57.1 / 71.4 / 85.7 / 100%.

- [ ] **Step 6: Captura visual dos dois viewports**

Adicionar ao fim de `t2_massa.py`, dentro do laço, antes de `page.close()`:

```python
        page.locator('section[aria-labelledby="capa-titulo"]').screenshot(
            path=f"<scratchpad>/t2_{nome}.png")
```

Rodar de novo e **olhar as duas imagens**. O perfil precisa ler como escada subindo para a direita, e o lockup não pode encostar na massa no mobile.

- [ ] **Step 7: Commit**

```bash
git add components/home/HeroCapa.tsx app/globals.css
git commit -m "feat(capa): massa de concreto com aresta em escada de 7 lajes"
```

---

### Task 3: O indicador — a laje da vez acende

**Files:**
- Modify: `components/home/HeroCapa.tsx` — o `<span>` da laje ganha `data-vez`
- Test: script de medição no scratchpad

**Interfaces:**
- Consumes: `.capa-laje` e o `--i` da Task 2; o estado `atual` já existente no componente.
- Produces: o atributo `data-vez="true"` na laje `atual`. A Task 4 não depende disto.

- [ ] **Step 1: Escrever a medição que vai falhar**

Criar `<scratchpad>/t3_indicador.py`. Ele amostra um ciclo completo (7 × 4s) e exige que a laje acesa acompanhe a legenda do card:

```python
from playwright.sync_api import sync_playwright

AMOSTRA = """
() => {
  const sec = document.querySelector('section[aria-labelledby="capa-titulo"]');
  const lajes = [...sec.querySelectorAll('.capa-laje')];
  const acesas = lajes.map((l, i) => l.getAttribute('data-vez') === 'true' ? i : -1)
                      .filter(i => i >= 0);
  return {acesas, legenda: (sec.querySelector('a p')?.textContent || '').trim()};
}
"""

falhas = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.wait_for_timeout(300)

    vistos = []
    for n in range(8):
        d = page.evaluate(AMOSTRA)
        print(f"t={n*4}s  acesas={d['acesas']}  legenda={d['legenda'][:40]!r}")
        if len(d["acesas"]) != 1:
            falhas.append(f"t={n*4}s: {len(d['acesas'])} lajes acesas, esperado exatamente 1")
        else:
            vistos.append(d["acesas"][0])
        if n < 7:
            page.wait_for_timeout(4000)

    if len(set(vistos)) < 7:
        falhas.append(f"o ciclo cobriu {len(set(vistos))} lajes distintas, esperado 7: {vistos}")
    esperado = [(vistos[0] + k) % 7 for k in range(len(vistos))]
    if vistos != esperado:
        falhas.append(f"a laje acesa nao avanca de um em um: {vistos}")

    # com reduce, o ciclo do card ja para hoje -> o indicador congela na laje 0
    page2 = b.new_page(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page2.goto("http://localhost:3000/", wait_until="networkidle")
    page2.wait_for_timeout(5000)
    d = page2.evaluate(AMOSTRA)
    print("reduce:", d["acesas"])
    if d["acesas"] != [0]:
        falhas.append(f"com reduce a laje acesa e {d['acesas']}, esperado [0]")
    b.close()

print("\n>>> FALHAS:", len(falhas))
for f in falhas: print("  -", f)
raise SystemExit(1 if falhas else 0)
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t3_indicador.py"
```

Esperado: FALHA com `0 lajes acesas, esperado exatamente 1` em todas as amostras.

- [ ] **Step 3: Ligar a laje ao `atual`**

Em `HeroCapa.tsx`, no `<span>` criado na Task 2, acrescentar o atributo — o bloco inteiro passa a ser:

```tsx
      {/* A massa de concreto, primeiro filho de propósito: ela e o grid são os
          dois elementos posicionados da seção, e a ordem no DOM é o que faz o
          grid pintar por cima sem precisar de `z-index`.

          As 7 lajes são os 7 tipos: a da vez acende junto com a troca do card,
          no mesmo `setInterval` — não entra relógio novo. O indicador é
          redundante por construção, porque a legenda do card nomeia o tipo em
          texto; por isso as lajes são `aria-hidden` sem perda de informação. */}
      <div className="capa-escada" aria-hidden="true">
        {SLIDES.map((t, i) => (
          <span
            key={t.slug}
            aria-hidden="true"
            className="capa-laje"
            data-vez={i === atual ? "true" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
```

- [ ] **Step 4: Rodar a medição e confirmar que passa**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npx tsc --noEmit && npm run build && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t3_indicador.py"
```

Esperado: `>>> FALHAS: 0`, com a laje acesa avançando 0→1→2→…→6→0 e `reduce: [0]`.

- [ ] **Step 5: Commit**

```bash
git add components/home/HeroCapa.tsx
git commit -m "feat(capa): a laje da vez indica o tipo do card"
```

---

### Task 4: A entrada em degraus

**Files:**
- Modify: `components/home/HeroCapa.tsx` — imports de `lib/motion`, `useRef`, novo `useEffect`
- Test: script de medição no scratchpad

**Interfaces:**
- Consumes: `.capa-laje` (Task 2) e `transform-origin: 50% 100%` já definido no CSS.
- Consumes de `lib/motion.ts`, com estas assinaturas exatas:
  - `DUR: number` (0.28) · `STAGGER: number` (0.18) · `EASE` (CustomEase "degrau")
  - `jaVisivel(el: Element): boolean`
  - `comMovimento(fn: (ctx: { mobile: boolean }) => void, escopo?: Element | null): gsap.MatchMedia`
  - `gsap`
- Produces: nada consumido por tasks posteriores.

- [ ] **Step 1: Escrever a medição que vai falhar**

Criar `<scratchpad>/t4_entrada.py`:

```python
from playwright.sync_api import sync_playwright

PERFIL = """
() => [...document.querySelectorAll('.capa-laje')].map(l =>
  Math.round(new DOMMatrixReadOnly(getComputedStyle(l).transform).d * 100) / 100)
"""

falhas = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)

    page = b.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="domcontentloaded")
    quadros = []
    for _ in range(9):
        quadros.append(page.evaluate(PERFIL))
        page.wait_for_timeout(180)
    for q in quadros: print(q)

    subiu = any(any(v < 0.9 for v in q) for q in quadros)
    if not subiu:
        falhas.append("nenhum quadro mostrou laje abaixo de 0.9 — a entrada nao aconteceu")

    escalonou = False
    for q in quadros:
        if len(q) == 7 and q[0] > q[6] + 0.15 and any(0 < v < 1 for v in q):
            escalonou = True
    if not escalonou:
        falhas.append("nenhum quadro mostrou as lajes escalonadas (a esquerda adiante da direita)")

    page.wait_for_timeout(2000)
    fim = page.evaluate(PERFIL)
    print("assentado:", fim)
    if any(abs(v - 1) > 0.02 for v in fim):
        falhas.append(f"a escada nao assentou em 1: {fim}")
    page.close()

    page2 = b.new_page(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page2.goto("http://localhost:3000/", wait_until="domcontentloaded")
    page2.wait_for_timeout(120)
    r = page2.evaluate(PERFIL)
    print("reduce (120ms):", r)
    if any(abs(v - 1) > 0.02 for v in r):
        falhas.append(f"com reduce a massa deveria estar de pe desde o inicio: {r}")
    b.close()

print("\n>>> FALHAS:", len(falhas))
for f in falhas: print("  -", f)
raise SystemExit(1 if falhas else 0)
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t4_entrada.py"
```

Esperado: FALHA em `a entrada nao aconteceu` e `nenhum quadro mostrou as lajes escalonadas` — as lajes já nascem em 1. O ramo `reduce` já passa, e deve continuar passando ao fim.

- [ ] **Step 3: Ajustar os imports**

Linha 5 de `HeroCapa.tsx` passa a ser:

```tsx
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { tipos } from "@/content/tipos";
import { comMovimento, jaVisivel, gsap, DUR, EASE, STAGGER } from "@/lib/motion";
```

- [ ] **Step 4: Adicionar a ref e o efeito de entrada**

Dentro de `HeroCapa`, logo depois de `const [atual, setAtual] = useState(0);`:

```tsx
  const escadaRef = useRef<HTMLDivElement>(null);
```

E depois do `useEffect` do ciclo, este novo efeito:

```tsx
  /* A entrada da escada. Nenhum número é escolhido: a duração é piso mais
     espelho (`DUR + STAGGER` = 0,46s) e o grupo escalona por um espelho
     (`STAGGER` = 0,18s). Com 7 lajes são 6 intervalos, que dão 1,08s — o teto
     de stagger que `lib/motion.ts` já documentava. A contagem vem do catálogo
     e bateu com o teto sozinha.

     O estado inicial é aplicado por JS, nunca por CSS (`DEC-018`): o HTML
     estático já sai com a massa de pé, e só animamos se `jaVisivel` disser que
     ninguém teve tempo de ler. Se o bundle demorar, a pessoa vê a escada
     pronta em vez de vê-la sumir e voltar. */
  useEffect(() => {
    const el = escadaRef.current;
    if (!el || jaVisivel(el)) return;

    const mm = comMovimento(() => {
      gsap.fromTo(
        el.querySelectorAll(".capa-laje"),
        { scaleY: 0, transformOrigin: "50% 100%" },
        {
          scaleY: 1,
          duration: DUR + STAGGER,
          ease: EASE,
          stagger: { each: STAGGER, amount: STAGGER * 6 },
        },
      );
    }, el);

    return () => {
      mm.revert();
    };
  }, []);
```

- [ ] **Step 5: Pendurar a ref no container da massa**

```tsx
      <div className="capa-escada" aria-hidden="true" ref={escadaRef}>
```

- [ ] **Step 6: Rodar a medição e confirmar que passa**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npx tsc --noEmit && npx eslint components/home/HeroCapa.tsx && npm run build && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t4_entrada.py"
```

Esperado: `>>> FALHAS: 0`. Nos quadros iniciais a laje 0 deve estar à frente da laje 6, e `assentado:` deve ser sete valores 1.0.

- [ ] **Step 7: Rodar a medição da Task 3 de novo (não-regressão)**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t3_indicador.py"
```

Esperado: `>>> FALHAS: 0`. O GSAP mexe em `transform`; o indicador mexe em `background-color`. Não podem colidir.

- [ ] **Step 8: Commit**

```bash
git add components/home/HeroCapa.tsx
git commit -m "feat(capa): a escada sobe em degraus na entrada"
```

---

### Task 5: Verificação de conjunto e documentação

**Files:**
- Modify: `docs/ai/DECISIONS_LOG.md` — nova entrada `DEC-041` antes de `## Waivers`
- Modify: `docs/ai/DESIGN_SYSTEM.md` — o lockup da capa
- Modify: `docs/ai/PAGE_BLUEPRINTS.md` — estrutura low-fi da capa
- Modify: `components/home/HeroCapa.tsx` — bloco de comentário do topo

**Interfaces:**
- Consumes: tudo das Tasks 1–4.
- Produces: nada de código.

- [ ] **Step 1: Varredura de regressão em todas as rotas**

Criar `<scratchpad>/t5_rotas.py`:

```python
from playwright.sync_api import sync_playwright

ROTAS = ["/", "/escadas", "/escadas/reta", "/escadas/caracol", "/escadas/leke",
         "/escadas/mista", "/escadas/premium", "/escadas/espelho-fechado",
         "/escadas/in-loco", "/obras", "/orcamento", "/empresa", "/como-funciona",
         "/duvidas", "/politica-de-privacidade"]

ruins, estouro = [], []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for w, h in [(1440, 900), (390, 844)]:
        page = b.new_page(viewport={"width": w, "height": h})
        page.on("response", lambda r: r.status >= 400 and ruins.append((r.status, r.url)))
        for rota in ROTAS:
            page.goto(f"http://localhost:3000{rota}", wait_until="networkidle")
            se = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
            if se > 0:
                estouro.append((w, rota, se))
        page.close()
    b.close()

print(">>> respostas >=400:", len(ruins))
for s, u in ruins[:10]: print("  ", s, u)
print(">>> estouro horizontal:", len(estouro))
for e in estouro: print("  ", e)
raise SystemExit(1 if (ruins or estouro) else 0)
```

Rodar:

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && \
python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" \
  --server "npm run start" --port 3000 -- python "<scratchpad>/t5_rotas.py"
```

Esperado: zero respostas ≥400 e zero estouro horizontal.

- [ ] **Step 2: Atualizar o comentário de cabeçalho do `HeroCapa.tsx`**

Substituir o parágrafo que começa com `**O fundo é `--primary` chapado, e a capa não reage ao cursor**` por:

```
 * **O fundo navy divide a dobra com uma massa de concreto claro, e a fronteira
 * entre as duas é uma escada** (`DEC-041`). São 7 lajes — uma por tipo — de
 * altura crescente; elas sobem em degraus na entrada e a da vez acende junto
 * com a troca do card, então a escada é também o índice do catálogo. A capa
 * continua sem reagir ao cursor: os dois gestos de ponteiro saíram no
 * `DEC-040` e não voltaram.
```

- [ ] **Step 3: Escrever `DEC-041`**

Inserir em `docs/ai/DECISIONS_LOG.md`, imediatamente antes de `## Waivers`, uma entrada no formato das vizinhas (`**Data:** / **Etapa:** / **Decisão:** / … / **Afeta:** / **Verificado:** / **Reversível:**`) cobrindo:

- A decisão: massa de concreto com aresta em escada de 7 lajes, lockup de marca, indicador dos 7 tipos, H1 novo.
- O problema de origem: os três itens da spec §1 apontados pelo desenvolvedor.
- Que **a largura não é número escolhido:** `calc((100% - 24px) / 2)` é a linha da coluna 7 do grid até a borda, e a conta cancela o gutter — por isso vale igual nos dois breakpoints, **o que dispensou o fallback de mobile que a spec §9 tinha previsto.**
- Que a altura vem de `aspect-ratio: 28 / 18` e não existe altura escrita à mão.
- Que `--shade` e `--surface` são concreto bruto e concreto polido, não destaque arbitrário.
- Que a entrada usa `DUR + STAGGER` e `STAGGER × 6`, e que os 6 intervalos das 7 lajes bateram no `MAX_STAGGER` já documentado por coincidência favorável, não por ajuste.
- Que o wordmark caiu de 104px para 88px, **reduzindo sem eliminar a exceção nomeada do `DEC-031`**.
- Que a linha de fatos **não** repete "SÃO JOSÉ — GRANDE FLORIANÓPOLIS" porque ela já aparece duas vezes na home.
- Que a linha de fatos usa `.spec` (14px) em vez dos 13px que a spec §5 escreveu — reuso do componente existente vale mais que casar com o número.
- Que a frase "chega pronta da fábrica" foi **descartada por ser falsa**: in loco não é pré-moldada.
- Que o H1 novo reusa "vão", já presente no fechamento da home — **escolha consciente do desenvolvedor, feita depois do aviso**.
- O acoplamento card↔escada (spec R1) como custo aceito.
- **Afeta:** `components/home/HeroCapa.tsx` · `app/globals.css` · `docs/ai/DESIGN_SYSTEM.md` · `docs/ai/PAGE_BLUEPRINTS.md`.
- **Verificado:** colar os números reais das medições das Tasks 1–4 e do Step 1 desta task. Não escrever nenhum número que não tenha saído de uma execução.

- [ ] **Step 4: Atualizar `DESIGN_SYSTEM.md`**

Na seção de componentes, acrescentar um bloco **Lockup da capa** com as quatro linhas, os corpos (`clamp(1.75rem, 6.1vw, 5.5rem)`, `--text-h4`, `.spec`), a regra do filete em `w-fit` e a nota de que este lockup é exclusivo da capa — não é padrão de marca para outras rotas.

- [ ] **Step 5: Atualizar `PAGE_BLUEPRINTS.md`**

Na estrutura low-fi da capa, trocar a descrição do canto inferior esquerdo de "wordmark" para "lockup (nome + filete + descritor + fatos)" e acrescentar a massa de concreto no canto inferior direito.

- [ ] **Step 6: Verificação final**

```bash
cd c:/Dev/pessoal/portfolio/escadas-minarum && npx tsc --noEmit && npx eslint . && npm run build
```

Esperado: `tsc` limpo, `build` limpo. O ESLint tem **um erro pré-existente em `components/layout/Slideshow.tsx`** que não é deste trabalho — confirmar que nenhum erro novo apareceu, e não corrigir aquele.

- [ ] **Step 7: Commit**

```bash
git add docs/ai/DECISIONS_LOG.md docs/ai/DESIGN_SYSTEM.md docs/ai/PAGE_BLUEPRINTS.md components/home/HeroCapa.tsx
git commit -m "docs: DEC-041 — capa com aresta em escada, lockup e indicador dos 7 tipos"
```

---

## Auto-revisão deste plano

**Cobertura da spec:**

| Seção da spec | Task |
|---|---|
| §3 estrutura e geometria | 2 (com a folga do wordmark/H1 verificada no script) |
| §4 cores | 2 (repouso) e 3 (`data-vez`) |
| §5 lockup | 1 |
| §6 copy | 1 |
| §7 movimento | 4 |
| §8 acessibilidade | 2 (`aria-hidden`), 3 (ramo `reduce`), 4 (ramo `reduce`) |
| §9 responsivo | 2 — **resolvido pela fórmula, fallback dispensado** |
| §10 o que não muda | 1 (`DEC-033`), 5 Step 1 (não-regressão) |
| §11 riscos R1–R5 | R1 e R5 registrados na Task 5; R2 resolvido; R3 no Step 6 da Task 2; R4 no script da Task 1 |
| §12 arquivos | tabela de estrutura |
| §13 critérios 1–8 | 1, 2, 3, 4, e Task 5 Steps 1 e 6 |

**Sem lacuna.** O único desvio deliberado da spec é o §9, e ele está registrado acima e na Task 5 Step 3.

**Varredura de placeholders:** nenhum "TBD"/"similar à Task N"/"tratar edge cases". Os scripts de medição estão escritos por extenso, e a Task 5 Step 3 lista item a item o que a entrada precisa dizer em vez de mandar "documentar a decisão".

**Consistência de tipos e nomes:** `.capa-escada`, `.capa-laje`, `.capa-lockup`, `.capa-descritor`, `--i` e `data-vez` aparecem com a mesma grafia nas Tasks 1–4 e nos cinco scripts. As assinaturas importadas de `lib/motion.ts` na Task 4 foram conferidas contra o arquivo (`grep "^export"`), não deduzidas — e confirmou-se que `STAGGER_TETO` **não** é exportado, por isso a Task 4 escreve `{ each: STAGGER, amount: STAGGER * 6 }` por extenso.

**Três defeitos encontrados nesta revisão e corrigidos:**

1. **Falso positivo garantido na checagem de colisão da Task 2.** O script media a *caixa* de `.capa-lockup`, mas no desktop esse elemento é um bloco que ocupa as 12 colunas — a caixa dele cruzaria a massa em toda execução. Passou a medir a **tinta**, por `Range`, como no `DEC-040`.
2. **`height: calc((var(--i) + 1) * 100% / 7)` era aritmética dentro de parêntese com `var()`** — forma que eu não verifiquei em navegador. Trocada por `calc(var(--i) * 100% / 7 + 100% / 7)`, que é a mesma conta na forma já comprovada no botão em degraus (`DEC-038`).
3. Uma tag `</style>` órfã tinha vazado para dentro do bloco CSS da Task 2, com uma nota mandando o implementador ignorá-la. Removida — plano não deve pedir que o leitor desconsidere o que está escrito nele.
