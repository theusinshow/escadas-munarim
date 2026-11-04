# Capa tríptico + grade sangrada + barra nova — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** trocar a capa da home por um tríptico de fotos verticais em tela cheia com o letreiro ESCADAS / MUNARIM em Michroma, pôr logo abaixo uma grade de borda a borda com as 29 fotos, e dar à barra o layout `MUNARIM | MENU | CONTATO` com estado transparente sobre a capa.

**Architecture:** a capa é um Server Component com três `RotacaoFotos` defasados e um letreiro em CSS puro (entrada por `@keyframes`, como a capa anterior fazia). A barra continua Client Component e descobre sozinha se está sobre uma seção marcada `data-barra="transparente"` — não sabe qual página é a home. A grade é Server Component envolvido no `StepIn` que já existe.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, TypeScript, GSAP. Sem test runner.

**Spec:** `docs/superpowers/specs/2026-11-04-capa-triptico-grade-design.md`

## Global Constraints

- **Não existe test runner e nenhum será instalado.** O ciclo é: escrever a medição em Playwright (Python), rodar e ver falhar, implementar, rodar e ver passar. Mais `npx tsc --noEmit`, `npx eslint` e `npm run build`.
- **Rodar medição sempre assim** (o `start` serve o último `build`, então **buildar antes**):
  `npm run build && python "C:/Users/Matheus/.claude/skills/webapp-testing/scripts/with_server.py" --server "npm run start" --port 3000 -- python <script>`
- **Scripts de medição** em `C:\Users\Matheus\AppData\Local\Temp\claude\C--Dev-webdesign-escadas-minarum\7020ffb2-df0a-47a0-b641-159ee0f8c850\scratchpad\` — nunca no repositório.
- **Git:** trabalhar na branch `capa-triptico` (criar a partir de `main`). Commits só se o desenvolvedor autorizou na execução; **nunca** `git push`, `git checkout -- .` ou `git reset` (memória: o desenvolvedor já perdeu trabalho com reversão em massa).
- **Nenhum fato inventado.** Copy nova permitida só desta lista: `Escadas Munarim — Segurança e Design`, `São José — SC`, `Concreto polido sob medida`, `Role a página`, `Contato`, `Menu`, `Acervo`, `Ver os sete tipos`, `IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)`.
- **`DEC-001`:** nenhum link ou botão de orçamento na capa ou na barra. `CONTATO` vai para `#contato` (rodapé), nunca `/orcamento`. Sem WhatsApp na barra.
- **`DEC-002`:** o primeiro "vão" da home tem que vir definido no próprio ponto.
- **`DEC-010`:** nenhum fade-up genérico. Entradas usam o deslocamento piso/espelho (`capa-entra`, `capa-sobe` e `StepIn` já existentes).
- **Só escada de concreto** (memória `munarim-so-concreto`): nenhuma copy fala de corrimão, guarda-corpo etc.
- **Legenda de foto:** só o nome do tipo. Nunca local, cliente ou ano (`MEDIA_PLAN.md`, `DEC-008`).

---

## Estrutura de arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `components/layout/Navbar.tsx` | layout de 3 células, dois estados (transparente/sólido) | 1 |
| `components/layout/Footer.tsx` | ganha `id="contato"` | 1 |
| `components/media/RotacaoFotos.tsx` | prop `defasagem`; exporta `INTERVALO` | 2 |
| `components/home/CapaTriptico.tsx` (novo) | capa: 3 colunas, letreiro, rótulos, véus | 2 |
| `app/globals.css` | `.triptico-*` (entrada das colunas e letras) | 2, 3 |
| `components/home/AcervoGrade.tsx` (novo) | grade sangrada das 29 fotos | 3 |
| `app/page.tsx` | ordem nova da home | 2, 3 |
| `components/home/Manifesto.tsx` | define "vão" no primeiro uso | 5 |
| `docs/ai/DECISIONS_LOG.md`, `docs/ai/DESIGN_SYSTEM.md`, `DESIGN.md`, `docs/ai/PAGE_BLUEPRINTS.md` | `DEC-053` e regras atualizadas | 5 |

Ficam sem uso (não apagar): `components/home/CapaGaleria.tsx`, `components/home/Acervo.tsx`, `components/layout/HoraLocal.tsx`.

Variável usada em todos os scripts abaixo: `SP = r"C:\Users\Matheus\AppData\Local\Temp\claude\C--Dev-webdesign-escadas-minarum\7020ffb2-df0a-47a0-b641-159ee0f8c850\scratchpad"`.

---

### Task 0: Branch

- [ ] **Step 1:** `git switch -c capa-triptico` (a partir de `main`, árvore limpa exceto `.claude/` e `scratch/` não rastreados). Confirmar com `git status --short`.

---

### Task 1: Barra — layout de três células e dois estados

**Files:**
- Modify: `components/layout/Navbar.tsx` (estado novo + JSX do `<header>` inteiro)
- Modify: `components/layout/Footer.tsx:37` (`<footer>`)

**Interfaces:**
- Produces: a barra lê `document.querySelector('[data-barra="transparente"]')`. Qualquer seção que queira barra transparente sobre si marca esse atributo (a Task 2 marca a capa). `<header data-estado="transparente" | "solido">` fica exposto para as medições.

- [ ] **Step 1: Escrever a medição** — `SP\t1_barra.py`:

```python
import os
from playwright.sync_api import sync_playwright
SP = os.path.dirname(__file__)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/escadas")
    h = pg.locator("header").first
    assert h.get_attribute("data-estado") == "solido", h.get_attribute("data-estado")
    bg = h.evaluate("e => getComputedStyle(e).backgroundColor")
    assert bg == "rgb(241, 242, 243)", bg
    assert h.get_by_role("link", name="Munarim").count() >= 1
    menu = h.get_by_role("button", name="Menu")
    assert menu.count() == 1 and menu.get_attribute("aria-expanded") == "false"
    contato = h.get_by_role("link", name="Contato")
    assert contato.get_attribute("href") == "#contato"
    assert "orçamento" not in h.inner_text().lower()
    assert "whatsapp" not in h.inner_text().lower()
    assert pg.locator("footer#contato").count() == 1
    # menu abre e fecha como antes
    menu.click(); pg.wait_for_selector("#menu-principal")
    pg.keyboard.press("Escape"); pg.wait_for_selector("#menu-principal", state="detached")
    # celular: as três células cabem sem rolagem horizontal
    pg.set_viewport_size({"width": 390, "height": 844})
    assert pg.evaluate("document.documentElement.scrollWidth") <= 390
    pg.screenshot(path=os.path.join(SP, "t1_barra_390.png"))
    b.close()
print("T1 OK")
```

- [ ] **Step 2: Rodar e ver falhar** — comando dos Global Constraints com `SP\t1_barra.py`. Esperado: `AssertionError` em `data-estado` (`None`).

- [ ] **Step 3: Implementar o estado em `Navbar.tsx`.** Logo depois de `const headerRef = useRef<HTMLElement>(null);`:

```tsx
  // Transparente enquanto uma seção marcada ainda está sob a barra (DEC-053).
  // A barra não sabe qual página é a home: quem quer fundo de foto se marca.
  const [sobreFoto, setSobreFoto] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector<HTMLElement>('[data-barra="transparente"]');
    const medir = () =>
      setSobreFoto(
        !!alvo && alvo.getBoundingClientRect().bottom > (headerRef.current?.offsetHeight ?? 0),
      );
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [pathname]);
```

(É o mesmo idioma do `WhatsAppFab`: medir uma vez e ouvir `scroll`. Se o `eslint` acusar `react-hooks/set-state-in-effect` no `medir()` síncrono, trocar a chamada inicial por `requestAnimationFrame(medir)` e cancelar no cleanup.)

- [ ] **Step 4: Trocar o JSX do `<header>`.** Remover `import { HoraLocal } from "./HoraLocal";` e substituir o `return (...)` inteiro por:

```tsx
  const transparente = sobreFoto && !open;
  // O fio das células acompanha o estado: branco 20% sobre foto, concreto no sólido.
  const fio = transparente ? "border-white/20" : "border-border";

  return (
    <header
      ref={headerRef}
      data-estado={transparente ? "transparente" : "solido"}
      className={`fixed inset-x-0 top-0 z-50 h-(--barra-h) border-b transition-colors duration-300 ease-degrau ${fio} ${
        transparente ? "bg-transparent text-primary-fg" : "bg-bg text-primary"
      }`}
    >
      {/* Três células como na referência: marca | menu | contato. A do meio
          ocupa o que sobra, então MENU fica no centro real da página. */}
      <div className="grid h-full grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 border-r px-4 lg:px-8 ${fio}`}
        >
          {/* Provisória: o degrau que já existe no logo atual (CNT-010). */}
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" fill="var(--primary)" />
            <path d="M5 25h6v-6h6v-6h6V7" fill="none" stroke="#fff" strokeWidth="2.6" />
          </svg>
          <span className="font-label text-[0.78rem] tracking-[0.2em] uppercase">Munarim</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="menu-principal"
          className="menu-gatilho flex items-center justify-center gap-3"
        >
          <span className="font-label text-[0.78rem] tracking-[0.2em] uppercase">Menu</span>
          {/* Três linhas em repouso; no hover viram três degraus. */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 26 26"
            aria-hidden="true"
            className="menu-icone"
            fill="currentColor"
          >
            <rect className="piso piso-1" x="4" y="7.2" width="18" height="1.6" />
            <rect className="piso piso-2" x="4" y="12.2" width="18" height="1.6" />
            <rect className="piso piso-3" x="4" y="17.2" width="18" height="1.6" />
            <rect className="espelho" x="9.2" y="13.5" width="1.6" height="6.5" />
            <rect className="espelho" x="16.2" y="7" width="1.6" height="6.5" />
          </svg>
        </button>

        {/* Contato leva ao rodapé, não ao orçamento: a barra aparece antes de
            qualquer prova (DEC-001). */}
        <a href="#contato" className={`flex items-center gap-2 border-l px-4 lg:px-8 ${fio}`}>
          <span className="font-label text-[0.78rem] tracking-[0.2em] uppercase">Contato</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        </a>
      </div>

      {open && (
        <MenuOverlay
          onClose={() => setOpen(false)}
          isActive={isActive}
          fecharRef={fecharRef}
        />
      )}
    </header>
  );
```

Atualizar o comentário de cabeçalho do componente para: "Barra fixa em três células — marca, menu, contato (DEC-053). Transparente sobre seção marcada com `data-barra="transparente"`, sólida no resto. A navegação inteira vive no overlay; o rodapé lista os 7 tipos."

- [ ] **Step 5: `Footer.tsx:37`** — `<footer className="bg-primary text-primary-fg">` vira `<footer id="contato" className="scroll-mt-(--barra-h) bg-primary text-primary-fg">`.

- [ ] **Step 6: Rodar** `npx tsc --noEmit && npx eslint components/layout` e depois a medição. Esperado: `T1 OK`. Abrir `t1_barra_390.png` e conferir que as três células cabem.

- [ ] **Step 7: Commit** (se autorizado): `git add components/layout/Navbar.tsx components/layout/Footer.tsx && git commit -m "feat(barra): três células marca/menu/contato e estado transparente (DEC-053)"`

---

### Task 2: Capa tríptico

**Files:**
- Modify: `components/media/RotacaoFotos.tsx`
- Create: `components/home/CapaTriptico.tsx`
- Modify: `app/globals.css` (bloco novo, logo antes de `/* Pular para o conteúdo */`)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `fotosIntercaladas(slugs)` e `temReferencia` de `content/galeria.ts`; `tipoSlugs` de `content/tipos.ts`; `site.tagline`, `site.address` de `lib/site.ts`; keyframes `capa-sobe` e `capa-entra` (já em `globals.css`); o atributo `data-barra="transparente"` da Task 1.
- Produces: `export const INTERVALO` e a prop `defasagem?: number` em `RotacaoFotos`; `export function CapaTriptico()`; âncora `#acervo` (usada pelo "Role a página", criada na Task 3 — até lá o link aponta para nada, e a medição desta task não clica nele).

- [ ] **Step 1: Escrever a medição** — `SP\t2_capa.py`:

```python
import os
from playwright.sync_api import sync_playwright
SP = os.path.dirname(__file__)

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h, cols in [(1920, 1080, 3), (1440, 900, 3), (390, 844, 1)]:
        pg = b.new_page(viewport={"width": w, "height": h})
        pg.goto("http://localhost:3000/")
        cap = pg.locator('section[data-barra="transparente"]')
        assert cap.count() == 1
        box = cap.bounding_box()
        assert box["y"] == 0 and abs(box["height"] - h) <= 1, box   # tela cheia, por baixo da barra
        assert pg.locator("h1").inner_text().strip() == "Escadas Munarim — Segurança e Design"
        vis = pg.locator(".triptico-coluna:visible")
        assert vis.count() == cols, (w, vis.count())
        # primeira foto de cada coluna visível é diferente
        srcs = [c.locator("img").first.get_attribute("src") for c in vis.all()]
        assert len(set(srcs)) == len(srcs), srcs
        # letreiro: duas linhas de 7, sem quebra e sem estourar
        for linha in pg.locator(".triptico-linha").all():
            assert linha.locator(".triptico-letra").count() == 7
            r = linha.evaluate("e => [e.scrollWidth, e.clientWidth, e.getBoundingClientRect().height, parseFloat(getComputedStyle(e).fontSize)]")
            assert r[0] <= r[1] + 1, ("estoura", w, r)
            assert r[2] < r[3] * 1.4, ("quebrou linha", w, r)
        assert pg.locator("header").get_attribute("data-estado") == "transparente"
        pg.wait_for_timeout(1800)
        pg.screenshot(path=os.path.join(SP, f"t2_capa_{w}.png"))
        pg.mouse.wheel(0, h + 200); pg.wait_for_timeout(500)
        assert pg.locator("header").get_attribute("data-estado") == "solido"
        pg.close()
    # nenhuma foto em duas colunas (todas as camadas montadas ao longo do tempo)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/")
    todas = pg.evaluate("""() => [...document.querySelectorAll('.triptico-coluna')].map(c => c.dataset.fotos.split('|'))""")
    planas = [s for c in todas for s in c]
    assert len(planas) == len(set(planas)) == 29, (len(planas), len(set(planas)))
    b.close()
print("T2 OK")
```

- [ ] **Step 2: Rodar e ver falhar.** Esperado: `AssertionError` em `cap.count() == 1`.

- [ ] **Step 3: `RotacaoFotos.tsx` — defasagem.** Trocar `const INTERVALO = 5200;` por `export const INTERVALO = 5200;`. Na assinatura, acrescentar `defasagem = 0,` depois de `sizes,` e `defasagem?: number;` no tipo, com o comentário `/** Espera antes da primeira troca — várias rotações lado a lado não trocam juntas. */`. Substituir o corpo do `useEffect` de `let timer = 0;` até `parar();\n    };` por:

```tsx
    let timer = 0;
    let espera = 0;

    function iniciar() {
      if (timer || espera || query.matches) return;
      espera = window.setTimeout(() => {
        espera = 0;
        timer = window.setInterval(() => {
          // Aba em segundo plano não gira nem baixa imagem.
          if (document.hidden) return;
          setEstado((atual) => {
            const proximo = (atual.indice + 1) % fotos.length;
            return {
              indice: proximo,
              montadas: Math.max(atual.montadas, Math.min(proximo + 2, fotos.length)),
            };
          });
        }, INTERVALO);
      }, defasagem);
    }
    function parar() {
      window.clearTimeout(espera);
      window.clearInterval(timer);
      espera = 0;
      timer = 0;
    }

    iniciar();
    const aoMudar = () => (query.matches ? parar() : iniciar());
    query.addEventListener("change", aoMudar);
    return () => {
      query.removeEventListener("change", aoMudar);
      parar();
    };
  }, [fotos.length, defasagem]);
```

- [ ] **Step 4: Criar `components/home/CapaTriptico.tsx`:**

```tsx
import { RotacaoFotos, INTERVALO } from "@/components/media/RotacaoFotos";
import { fotosIntercaladas, temReferencia } from "@/content/galeria";
import { tipoSlugs } from "@/content/tipos";
import { site } from "@/lib/site";

/**
 * Capa da home — tríptico com letreiro (DEC-053).
 *
 * O acervo é todo vertical. Uma foto vertical esticada numa dobra 16:9 perde
 * 60% da altura — justamente o lance da escada. Três colunas lado a lado têm,
 * cada uma, quase a proporção do arquivo (640×1000 numa tela 1920): a dobra
 * fica cheia e a foto fica inteira. No celular a tela já é vertical, e sobra
 * uma coluna.
 *
 * O letreiro é o nome em Michroma, a Eurostile do "ESCADAS" do logo. Sete
 * letras por linha. O H1 é o nome por extenso, só para leitor de tela e
 * buscador; as letras soltas ficam ocultas para eles.
 *
 * Único lugar do site com texto sobre foto, sempre sobre véu de tinta.
 * Sem botões e sem orçamento: a prova é a grade logo abaixo (DEC-001).
 */

const COLUNAS = 3;
const TODAS = fotosIntercaladas(tipoSlugs);
/* Round-robin: a coluna 1 abre com a reta, a 2 com o caracol, a 3 com o leke,
   e nenhuma foto aparece em duas colunas. */
const POR_COLUNA = Array.from({ length: COLUNAS }, (_, c) =>
  TODAS.filter((_, i) => i % COLUNAS === c),
);

const LINHAS = ["ESCADAS", "MUNARIM"] as const;

function Linha({ texto, inicio }: { texto: string; inicio: number }) {
  return (
    <p aria-hidden="true" className="triptico-linha">
      {[...texto].map((letra, i) => (
        <span
          key={i}
          className="triptico-letra"
          style={{ "--d": inicio + i } as React.CSSProperties}
        >
          {letra}
        </span>
      ))}
    </p>
  );
}

export function CapaTriptico() {
  return (
    <section
      aria-labelledby="capa-titulo"
      data-barra="transparente"
      className="relative -mt-(--barra-h) h-svh min-h-[36rem] overflow-hidden bg-text text-primary-fg"
    >
      <div className="absolute inset-0 grid md:grid-cols-3">
        {POR_COLUNA.map((fotos, c) => (
          <div
            key={c}
            data-fotos={fotos.map((f) => f.src).join("|")}
            className={`triptico-coluna relative h-full ${c > 0 ? "hidden border-l border-white/20 md:block" : ""}`}
            style={{ "--i": c } as React.CSSProperties}
          >
            <RotacaoFotos
              fotos={fotos}
              defasagem={(INTERVALO / COLUNAS) * c}
              descricao="Escadas de concreto dos sete tipos do catálogo — imagens de referência em rotação"
              sizes="(min-width: 768px) 34vw, 100vw"
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Véus de tinta só onde há letra; o meio da foto fica limpo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-linear-to-b from-[#1f2d3b]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-[#1f2d3b]/75 to-transparent"
      />

      <div className="relative flex h-full flex-col justify-between px-6 pt-[calc(var(--barra-h)+1.5rem)] pb-6 lg:px-10 lg:pb-8">
        <h1 id="capa-titulo" className="sr-only">
          {site.name} — {site.tagline}
        </h1>
        <Linha texto={LINHAS[0]} inicio={0} />

        <div className="grid gap-2 md:grid-cols-3">
          <p className="triptico-rotulo rotulo-marca text-primary-fg" style={{ "--d": 4 } as React.CSSProperties}>
            {site.address.city} — {site.address.state}
          </p>
          <p
            className="triptico-rotulo rotulo-marca text-primary-fg md:col-start-3"
            style={{ "--d": 5 } as React.CSSProperties}
          >
            Concreto polido sob medida
          </p>
        </div>

        <div>
          <a
            href="#acervo"
            className="triptico-rotulo rotulo-marca mb-4 block text-right text-primary-fg hover:underline underline-offset-4"
            style={{ "--d": 6 } as React.CSSProperties}
          >
            Role a página ↓
          </a>
          <Linha texto={LINHAS[1]} inicio={7} />
          {temReferencia && (
            <p className="spec mt-3 text-[0.62rem] text-primary-fg/80">
              IMAGENS DE REFERÊNCIA — NÃO SÃO OBRAS DA MUNARIM (CNT-003)
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
```

Conferir em `lib/site.ts` que `site.name === "Escadas Munarim"`, `site.tagline === "Segurança e Design"`, `site.address.city === "São José"` e `site.address.state === "SC"`. Se algum difere, ajustar a string esperada na medição — **não** o dado.

- [ ] **Step 5: CSS em `app/globals.css`.** Dentro de `@layer components`, logo depois do `@keyframes capa-entra { ... }` (antes do `}` que fecha a layer, linha ~897):

```css
  /* ---------- Capa tríptico (DEC-053) ----------
     Letreiro em Michroma: sete letras espalhadas na largura toda, como a
     referência. 11vw é o maior tamanho em que "MUNARIM" (o M é a letra mais
     larga) cabe em 390px sem quebrar. */
  .triptico-linha {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-label);
    font-size: clamp(3rem, 11vw, 12rem);
    line-height: 1;
    text-transform: uppercase;
  }

  /* Entrada: as colunas sobem em degrau (a mesma `capa-sobe` do lance
     anterior) e as letras entram com o deslocamento piso/espelho. CSS puro:
     roda no primeiro paint, não espera hidratação, e com `reduce` não existe. */
  @media (prefers-reduced-motion: no-preference) {
    .triptico-coluna {
      animation: capa-sobe 900ms var(--ease-degrau) both;
      animation-delay: calc(var(--i) * var(--step-riser) * 10ms);
    }

    .triptico-letra,
    .triptico-rotulo {
      display: inline-block;
      animation: capa-entra 720ms var(--ease-degrau) both;
      animation-delay: calc(300ms + var(--d, 0) * var(--step-riser) * 4ms);
    }
  }
```

(`--step-riser` é 18: colunas a 0 · 180 · 360ms, letras a cada 72ms. Nenhuma constante nova.)

- [ ] **Step 6: `app/page.tsx`.** Trocar `import { CapaGaleria } from "@/components/home/CapaGaleria";` por `import { CapaTriptico } from "@/components/home/CapaTriptico";` e `<CapaGaleria />` por `<CapaTriptico />`. Atualizar o comentário do topo: "Home (DEC-032 → … → DEC-052 → DEC-053). Capa em tríptico com letreiro → grade do acervo → manifesto → …".

- [ ] **Step 7: Rodar** `npx tsc --noEmit && npx eslint components app` e a medição. Esperado: `T2 OK`. Abrir os três `t2_capa_*.png` e conferir que o letreiro não cobre nada essencial, que o fio entre as colunas aparece e que a barra transparente lê bem.

Se a linha estourar em 390 (`"estoura"`), baixar o `11vw` para `10.5vw` no CSS e no comentário. Se quebrar no desktop, o problema é largura, não tamanho: conferir que o `p` não herdou `measure`.

- [ ] **Step 8: Commit** (se autorizado): `git add components/media/RotacaoFotos.tsx components/home/CapaTriptico.tsx app/globals.css app/page.tsx && git commit -m "feat(capa): tríptico de fotos verticais com letreiro ESCADAS / MUNARIM (DEC-053)"`

---

### Task 3: Grade sangrada do acervo

**Files:**
- Create: `components/home/AcervoGrade.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `fotosIntercaladas`, `fotosDo` de `content/galeria.ts`; `tipoSlugs`, `getTipo` de `content/tipos.ts`; `Foto` (`fill` já aplica `object-cover` e posiciona `absolute inset-0`); `StepIn` (`selector="li"`; anima os `li` do primeiro filho).
- Produces: `export function AcervoGrade()`; `section#acervo`.

- [ ] **Step 1: Escrever a medição** — `SP\t3_grade.py`:

```python
import os
from playwright.sync_api import sync_playwright
SP = os.path.dirname(__file__)

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, cols in [(1440, 4), (900, 3), (390, 2)]:
        pg = b.new_page(viewport={"width": w, "height": 900})
        pg.goto("http://localhost:3000/")
        g = pg.locator("section#acervo")
        assert g.count() == 1
        # logo depois da capa
        ordem = pg.evaluate("[...document.querySelectorAll('main > section')].slice(0,2).map(s => s.id || s.dataset.barra)")
        assert ordem == ["transparente", "acervo"], ordem
        # de borda a borda
        ul = g.locator("ul").first.bounding_box()
        assert ul["x"] == 0 and abs(ul["width"] - w) <= 1, ul
        fotos = g.locator("li[data-foto]")
        assert fotos.count() == 29
        srcs = [l.get_attribute("data-foto") for l in fotos.all()]
        assert len(set(srcs)) == 29
        assert "29" in g.inner_text()
        # célula de fechamento: aparece só se sobrar, e fecha a última linha
        sobra = (cols - 29 % cols) % cols
        fim = g.locator("li[data-fechamento]")
        if sobra:
            assert fim.is_visible()
            span = fim.evaluate("e => getComputedStyle(e).gridColumnEnd")
            assert span == f"span {sobra}", (w, span)
            assert fim.locator("a").get_attribute("href") == "/escadas"
        else:
            assert not fim.is_visible()
        # moldura 2:3
        bb = fotos.first.bounding_box()
        assert abs(bb["width"] / bb["height"] - 2 / 3) < 0.02, bb
        pg.close()
    # hover mostra o tipo
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/#acervo"); pg.wait_for_timeout(1500)
    l = pg.locator("li[data-foto] a").nth(1)
    assert l.get_attribute("href").startswith("/escadas/")
    l.hover(); pg.wait_for_timeout(400)
    veu = l.locator("[data-veu]")
    assert float(veu.evaluate("e => getComputedStyle(e).opacity")) > 0.9
    pg.screenshot(path=os.path.join(SP, "t3_grade_1440.png"), full_page=False)
    b.close()
print("T3 OK")
```

- [ ] **Step 2: Rodar e ver falhar.** Esperado: `AssertionError` em `g.count() == 1`.

- [ ] **Step 3: Criar `components/home/AcervoGrade.tsx`:**

```tsx
import Link from "next/link";
import { StepIn } from "@/components/motion/StepIn";
import { Foto } from "@/components/media/Foto";
import { fotosDo, fotosIntercaladas } from "@/content/galeria";
import { getTipo, tipoSlugs } from "@/content/tipos";

/**
 * Acervo em grade sangrada (DEC-053) — substitui a alvenaria da DEC-052.
 *
 * Todas as fotos, de borda a borda, com o fio de 1px que a barra também usa:
 * o fio é o fundo `--border` aparecendo pelo `gap-px`. Moldura 2:3 porque o
 * acervo inteiro é vertical (2:3 a 4:5) — o corte máximo é ~17% da largura.
 *
 * A legenda é só o tipo (MEDIA_PLAN.md). No mouse ela aparece no hover; no
 * toque fica fixa e pequena no canto, porque não há hover para revelá-la.
 *
 * Nunca repete foto para fechar a última linha: o que sobra vira uma célula
 * de texto que leva aos tipos.
 */

const FOTOS = fotosIntercaladas(tipoSlugs);
const N = FOTOS.length;

/** Células que faltam para fechar a última linha com `cols` colunas. */
const sobra = (cols: number) => (cols - (N % cols)) % cols;

/* Classes literais: o Tailwind só gera o que encontra escrito. */
const SPAN_BASE = ["hidden", "flex col-span-1"];
const SPAN_MD = ["md:hidden", "md:flex md:col-span-1", "md:flex md:col-span-2"];
const SPAN_LG = ["lg:hidden", "lg:flex lg:col-span-1", "lg:flex lg:col-span-2", "lg:flex lg:col-span-3"];

const nomeCurto = (slug: string) => getTipo(slug)?.nome.replace(/ \(.*\)$/, "") ?? slug;

export function AcervoGrade() {
  return (
    <section id="acervo" aria-labelledby="acervo-titulo" className="scroll-mt-(--barra-h) bg-bg">
      <div className="container-site flex items-baseline justify-between py-6">
        <h2 id="acervo-titulo" className="rotulo">
          Acervo
        </h2>
        <p className="rotulo-marca">{N} fotos</p>
      </div>

      <StepIn selector="li">
        <ul className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-3 lg:grid-cols-4">
          {FOTOS.map((foto) => {
            const doTipo = fotosDo(foto.slug);
            const posicao = doTipo.findIndex((f) => f.src === foto.src) + 1;
            const nome = nomeCurto(foto.slug);
            return (
              <li key={foto.src} data-foto={foto.src} className="relative aspect-[2/3] bg-text">
                <Link
                  href={`/escadas/${foto.slug}`}
                  aria-label={`Escada ${nome.toLowerCase()} — ver o tipo`}
                  className="group absolute inset-0 block overflow-hidden"
                >
                  <Foto
                    foto={foto}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 34vw, 50vw"
                    imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  {/* Toque: rótulo pequeno fixo no canto. Mouse: véu inteiro no hover. */}
                  <span
                    data-veu
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-text/70 to-transparent p-3 text-primary-fg [@media(hover:hover)]:inset-0 [@media(hover:hover)]:flex-col [@media(hover:hover)]:items-center [@media(hover:hover)]:justify-center [@media(hover:hover)]:gap-2 [@media(hover:hover)]:bg-none [@media(hover:hover)]:bg-text/55 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-300 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                  >
                    <span className="font-label text-[0.68rem] tracking-[0.1em] uppercase [@media(hover:hover)]:text-2xl">
                      {nome}
                    </span>
                    <span className="spec text-[0.68rem]">
                      {String(posicao).padStart(2, "0")} / {String(doTipo.length).padStart(2, "0")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
          <li
            data-fechamento
            className={`items-end bg-text p-6 text-primary-fg ${SPAN_BASE[sobra(2)]} ${SPAN_MD[sobra(3)]} ${SPAN_LG[sobra(4)]}`}
          >
            <Link href="/escadas" className="font-label text-sm tracking-[0.1em] uppercase underline-offset-4 hover:underline">
              Ver os sete tipos →
            </Link>
          </li>
        </ul>
      </StepIn>
    </section>
  );
}
```

- [ ] **Step 4: `app/page.tsx`.** Remover `import { Acervo } from "@/components/home/Acervo";` e `<Acervo />`. Acrescentar `import { AcervoGrade } from "@/components/home/AcervoGrade";` e `<AcervoGrade />` logo depois de `<CapaTriptico />`, com o comentário `{/* A prova vem no primeiro scroll: as fotos antes de qualquer texto (DEC-053). */}`.

- [ ] **Step 5: Rodar** `npx tsc --noEmit && npx eslint components app` e a medição. Esperado: `T3 OK`.

Se `gridColumnEnd` vier `"auto"` no `md`/`lg`, a classe literal não foi gerada: conferir que os arrays `SPAN_*` estão escritos por extenso no arquivo, como acima. Se a medida do `[@media(hover:hover)]:bg-none` não zerar o degradê, trocar por `[@media(hover:hover)]:bg-linear-to-t [@media(hover:hover)]:from-text/55 [@media(hover:hover)]:to-text/55`.

- [ ] **Step 6: Commit** (se autorizado): `git add components/home/AcervoGrade.tsx app/page.tsx && git commit -m "feat(home): acervo em grade sangrada logo após a capa (DEC-053)"`

---

### Task 4: Contraste do texto sobre foto e movimento reduzido

**Files:**
- Modify (só se a medição falhar): `components/home/CapaTriptico.tsx`

- [ ] **Step 1: Escrever a medição** — `SP\t4_contraste.py`. Esconde o texto, fotografa o fundo atrás de cada letreiro/rótulo a cada ⅓ de intervalo durante ~57 s (32 amostras — cobre as 10 fotos da coluna mais longa) e calcula o contraste do branco contra o percentil 95 de luminância do fundo:

```python
import io, os
from PIL import Image
from playwright.sync_api import sync_playwright
SP = os.path.dirname(__file__)

def lum(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def contraste_branco(png):
    im = Image.open(io.BytesIO(png)).convert("RGB")
    ls = sorted(0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b) for r, g, b in im.getdata())
    l95 = ls[int(len(ls) * 0.95)]
    return 1.05 / (l95 + 0.05)

pior = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/"); pg.wait_for_timeout(2500)
    alvos = {"letreiro": (".triptico-linha", 3.0), "rotulo": (".triptico-rotulo", 4.5)}
    pg.add_style_tag(content=".triptico-linha,.triptico-rotulo{color:transparent!important}")
    for ciclo in range(32):
        for nome, (sel, _) in alvos.items():
            for k, el in enumerate(pg.locator(sel).all()):
                bb = el.bounding_box()
                if not bb or bb["width"] < 2: continue
                c = contraste_branco(pg.screenshot(clip=bb))
                chave = f"{nome}{k}"
                pior[chave] = min(pior.get(chave, 99), c)
        pg.wait_for_timeout(5300 // 3)   # as colunas trocam a cada ⅓ de intervalo
    # movimento reduzido: letras assentadas no primeiro paint, sem rotação
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    r = ctx.new_page(); r.goto("http://localhost:3000/"); r.wait_for_timeout(300)
    op = r.locator(".triptico-letra").first.evaluate("e => getComputedStyle(e).opacity")
    assert op == "1", op
    src0 = r.locator(".triptico-coluna").first.locator("img").first.get_attribute("src")
    r.wait_for_timeout(6000)
    vis = r.locator(".triptico-coluna").first.evaluate("c => [...c.querySelectorAll('[aria-hidden=true].opacity-100 img')].map(i => i.getAttribute('src'))")
    assert vis == [src0], vis
    b.close()

falhas = []
for chave, c in sorted(pior.items()):
    minimo = 3.0 if chave.startswith("letreiro") else 4.5
    print(f"{chave}: {c:.2f}:1 (mínimo {minimo})")
    if c < minimo: falhas.append(chave)
assert not falhas, falhas
print("T4 OK")
```

- [ ] **Step 2: Rodar.** Esta medição pode já passar (não há "ver falhar" obrigatório: ela mede, não especifica). Registrar a tabela impressa — ela vai para o `DEC-053`.

- [ ] **Step 3: Só se algum `rotulo*` falhar:** dar ao rótulo uma faixa própria em vez de escurecer mais a foto. Em `CapaTriptico.tsx`, nos três elementos com `triptico-rotulo`, acrescentar `bg-[#1f2d3b]/80 px-2 py-1 w-fit` (no "Role a página", que é `block text-right`, trocar para `ml-auto w-fit`). **Só se algum `letreiro*` falhar:** subir a opacidade do véu correspondente de `/70` (topo) ou `/75` (base) em passos de 5 até passar, sem ultrapassar `/85` — acima disso, parar e reportar ao desenvolvedor, porque a foto deixa de ser a protagonista.

- [ ] **Step 4: Re-rodar até `T4 OK`.** Commit (se autorizado): `git commit -am "fix(capa): contraste do texto sobre foto medido (DEC-053)"`.

---

### Task 5: Vocabulário e documentação

**Files:**
- Modify: `components/home/Manifesto.tsx`
- Modify: `docs/ai/DECISIONS_LOG.md` (nova entrada antes de `## Waivers`)
- Modify: `docs/ai/DESIGN_SYSTEM.md`, `DESIGN.md`, `docs/ai/PAGE_BLUEPRINTS.md`

- [ ] **Step 1: `DEC-002` na home.** A capa deixou de definir "vão"; o primeiro "vão" da página agora é o do `Manifesto` ("medida no seu vão"). Trocar o trecho do `<span className="text-muted">` por:

```tsx
            Por isso ela é medida no seu vão — a abertura na laje por onde ela
            passa —, moldada em concreto e polida antes de chegar.
```

Conferir com `grep -n "vão" components/home/AcervoGrade.tsx components/home/CapaTriptico.tsx` que nenhum dos dois usa a palavra (não devem).

- [ ] **Step 2: `DEC-053` em `docs/ai/DECISIONS_LOG.md`**, antes de `## Waivers`, seguindo o formato das entradas vizinhas:

```markdown
## DEC-053 — Capa em tríptico com letreiro, acervo em grade sangrada e barra em três células

**Data:** 2026-11-04
**Etapa:** refactor do site, fase 1 (referência visual enviada pelo desenvolvedor: Nord Arch)
**Decisão:**

1. **Capa** (`CapaTriptico`): três colunas de foto vertical, borda a borda, cada uma em rotação
   defasada (0 · ⅓ · ⅔ do intervalo) e sem foto repetida entre elas. No celular, uma coluna.
   Letreiro **ESCADAS / MUNARIM** em Michroma, sete letras por linha na largura toda. Rótulos:
   cidade, "Concreto polido sob medida", "Role a página". Sem botões e sem orçamento.
2. **O H1 vira o nome por extenso** (`sr-only`), e as letras do letreiro ficam ocultas para leitor
   de tela. O logo sai do H1 — altera o item da `DEC-050` que fazia do logo a primeira parte dele.
3. **Texto sobre foto**, até aqui proibido, passa a ser permitido **só** na capa e no véu da grade,
   sempre sobre véu de tinta `#1f2d3b`, com contraste medido: letreiro ≥ 3:1, rótulos ≥ 4,5:1
   (tabela da medição abaixo).
4. **Acervo em grade sangrada** (`AcervoGrade`), logo depois da capa: as 29 fotos em moldura 2:3,
   fio de 1px, o tipo no hover (ou fixo no canto, no toque). A última linha fecha com "Ver os sete
   tipos", nunca com foto repetida. Substitui a alvenaria da `DEC-052` item 6.
5. **Barra em três células** — marca | MENU | CONTATO —, transparente sobre seção marcada com
   `data-barra="transparente"` e sólida no resto. CONTATO vai ao rodapé (`#contato`), não ao
   orçamento, e não há WhatsApp na barra: ela aparece antes de qualquer prova (`DEC-001`). Saem a
   hora local e a cidade.
6. **"Vão"** passa a ser definido no `Manifesto`, que virou o primeiro uso da palavra na home
   (`DEC-002`).

**Contraste medido (1440×900, pior caso ao longo da rotação):** [colar a tabela da Task 4].

**Why:** o desenvolvedor pediu a capa no pique da referência — foto em tela cheia, letreiro gigante,
galeria logo em seguida. O acervo é todo vertical, e uma foto vertical esticada numa dobra 16:9
perde 60% da altura; três colunas lado a lado têm quase a proporção do arquivo, então a dobra
enche sem cortar a escada. A Michroma já era a fonte de rótulo e é a mesma família da letra da
referência: nenhuma fonte nova entrou.

**Affects:** `components/home/{CapaTriptico,AcervoGrade}.tsx` (novos) ·
`components/media/RotacaoFotos.tsx` (`defasagem`) · `components/layout/{Navbar,Footer}.tsx` ·
`components/home/Manifesto.tsx` · `app/page.tsx` · `app/globals.css` (`.triptico-*`) ·
`DESIGN_SYSTEM.md` · `DESIGN.md` · `PAGE_BLUEPRINTS.md`. Ficam sem uso: `CapaGaleria`, `Acervo`,
`HoraLocal`.

**Reversível:** sim.

---
```

Substituir `[colar a tabela da Task 4]` pela saída real impressa na Task 4 (uma linha por alvo) — não deixar o colchete.

- [ ] **Step 3: `docs/ai/DESIGN_SYSTEM.md` e `DESIGN.md`.** Nos dois (as seções são espelhadas):
  - Na seção da barra (procurar por "Barra" / "barra fixa"), substituir a descrição do layout por: "Três células separadas por fio de 1px — marca (▣ + MUNARIM em Michroma) | MENU (centro real) | CONTATO (→ `#contato`). Dois estados: transparente, texto branco e fio `white/20`, sobre seção marcada com `data-barra=\"transparente\"`; sólida (`--bg`, texto `--primary`, fio `--border`) no resto. Transição de 300ms. Sem hora local, sem cidade, sem WhatsApp (DEC-053)."
  - Onde a regra "texto nunca sobre foto" aparece (`grep -n -i "sobre foto\|sobre a foto" docs/ai/DESIGN_SYSTEM.md DESIGN.md`), acrescentar: "Exceção (DEC-053): a capa e o véu da grade do acervo, sempre sobre véu de tinta `#1f2d3b` e com contraste medido." Se a regra não estiver escrita em nenhum dos dois, acrescentar a frase completa na seção de fotografia: "Texto não fica sobre foto. Exceção (DEC-053): …".
  - Na descrição de `.rotulo-marca` ("só em rótulo curto que já é marca: a cidade da barra"), trocar "a cidade da barra" por "a barra, os rótulos da capa e o nome do tipo na grade". Atualizar o mesmo comentário em `app/globals.css` (bloco `.rotulo-marca`).

- [ ] **Step 4: `docs/ai/PAGE_BLUEPRINTS.md`** — na seção da home, a ordem das seções passa a ser: Capa (tríptico + letreiro) → Acervo (grade sangrada) → Manifesto → Coleções em degrau → Sete tipos → Pré-moldada → Processo → Empresa → Dúvidas → Fechamento. Referenciar `DEC-053`.

- [ ] **Step 5: Commit** (se autorizado): `git add components/home/Manifesto.tsx docs DESIGN.md app/globals.css && git commit -m "docs(DEC-053): capa tríptico, grade sangrada, barra em três células"`

---

### Task 6: Verificação final

- [ ] **Step 1:** `npx tsc --noEmit` — sem erro.
- [ ] **Step 2:** `npx eslint components/layout components/home components/media app` — nenhum erro ou aviso em arquivo desta fase.
- [ ] **Step 3:** `npm run build` — sem erro e sem aviso de `Foto` (prefixo/legenda).
- [ ] **Step 4:** rodar de novo `t1_barra.py`, `t2_capa.py`, `t3_grade.py`, `t4_contraste.py` contra o build final. Os quatro imprimem `OK`.
- [ ] **Step 5: Teclado** — `SP\t6_teclado.py`:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://localhost:3000/")
    ordem = []
    for _ in range(6):
        pg.keyboard.press("Tab")
        # aria-label primeiro: o link da foto tem o véu (aria-hidden) no innerText
        ordem.append(pg.evaluate("(document.activeElement.getAttribute('aria-label') || document.activeElement.innerText || '').trim().slice(0, 30)"))
    print(ordem)
    # skip-link → marca → Menu → Contato → Role a página → 1ª foto
    assert "Munarim" in ordem[1] and ordem[2].startswith("Menu") and ordem[3].startswith("Contato"), ordem
    assert ordem[4].startswith("Role a página"), ordem
    assert ordem[5].startswith("Escada "), ordem
    b.close()
print("T6 OK")
```

- [ ] **Step 6:** abrir os screenshots `t2_capa_1920.png`, `t2_capa_1440.png`, `t2_capa_390.png`, `t3_grade_1440.png` e mostrá-los ao desenvolvedor junto com o resumo: arquivos alterados, tabela de contraste e as pendências que continuam (`CNT-003` fotos de referência; `CNT-010` marca provisória da barra; duplicação de fotos entre grade e `ColecoesDestaque`, fora do escopo).
