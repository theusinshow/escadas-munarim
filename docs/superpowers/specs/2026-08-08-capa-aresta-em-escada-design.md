# Capa da home: aresta em escada, lockup de marca e indicador dos 7 tipos

**Data:** 2026-08-08
**Estado:** desenho aprovado pelo desenvolvedor, pronto para virar plano de implementação
**Sucede:** `DEC-040` (que tirou a foto de fundo, a janela do cursor e o campo de pontos)

---

## 1. O problema

Depois do `DEC-040` a capa ficou em `--primary` chapado, com card no alto à esquerda, H1 e parágrafo
no alto à direita e o wordmark no canto inferior esquerdo. O desenvolvedor apontou três falhas, nesta
ordem de importância:

1. **O vazio virou falta, não escolha.** Os ~40% de navy liso deixaram de parecer respiro deliberado.
2. **A dobra não diz o que a empresa faz.** Um leigo que cai frio não entende em três segundos que
   ali se vende escada de concreto sob medida.
3. **Ficou inerte demais.** Tirando o crossfade do card, nada acontece.

Explicitamente **não** apontado como problema: a ausência dos SVGs dos 7 tipos na dobra. O desenho
não entra nesta capa.

`DEC-031` já tinha medido a raiz do item 1: *"navy sólido faz o vazio pesar como massa; fundo claro
faz o mesmo vazio respirar."* A capa manteve o navy sabendo disso. Este desenho não revoga essa
escolha — ele para de pedir que **uma só** superfície carregue a dobra inteira.

## 2. As cinco decisões

| # | Decisão | Alternativas descartadas |
|---|---|---|
| 1 | O navy **divide** a dobra com uma segunda superfície | navy sozinho · dobra inteira clara |
| 2 | A fronteira entre as duas **é uma escada** | coluna vertical · faixa horizontal · degrau único |
| 3 | O wordmark vira **lockup**: nome + filete + descritor + fatos | nome sozinho (hoje) · frase como display |
| 4 | A escada é o **indicador dos 7 tipos** | entrada única · parallax de scroll |
| 5 | O H1 muda para não duplicar o descritor | manter H1 · trocar descritor · cortar parágrafo |

## 3. Estrutura e geometria

A seção não muda de envelope: `100svh`, sangrando de borda a borda, `-mt-24`, fundo `--primary`.

Entra uma **massa de concreto claro** ancorada no canto inferior direito, feita de **7 lajes** de
largura igual e altura crescente — a laje *i* tem altura `(i+1)/7` da massa. O perfil resultante é
uma escada de degraus iguais, e a proporção total cai sozinha:

```
altura da massa / largura da massa = espelho / piso = 18 / 28 = 0,643
```

Em CSS isso é `aspect-ratio: 28 / 18` na massa — **não existe altura escrita à mão.**

### Onde a massa começa

Ela entra como **célula do próprio grid da capa**: colunas 7–12, `self-end`, sangrando até a borda
direita pelo mesmo par negativo/positivo que o wordmark já usa à esquerda (`-mr-6` / `lg:-mr-10`).
A largura não é um número escolhido — é a linha da coluna 7 do grid que já existe.

Em 1440×900 isso dá **708 × 455px**, com a massa começando em x=732 e y=445.

As duas folgas que essa posição precisa respeitar, **ambas a verificar em navegador** (§13.5):

| Folga | Mínimo exigido | Medido no layout de hoje | Direção da mudança |
|---|---|---|---|
| Tinta do wordmark → borda esquerda da massa | 100px | 160px (tinta termina em x=572) | **aumenta** — o nome cai de 104px para 88px (§5), encurtando a tinta |
| Base do H1 → topo da massa | 100px | 145px (H1 termina em y=300) | **aumenta** — o H1 novo tem 2 linhas em vez de 3 (§6) |

Os valores da terceira coluna vêm da medição do `DEC-040`, feita **antes** das mudanças de §5 e §6.
Servem como piso, não como resultado: as duas mudanças afastam os elementos da massa, nunca os
aproximam. Quem manda é o mínimo da segunda coluna.

### Ordem de pilha

Massa → card, texto e lockup por cima. No desktop não há sobreposição, mas a ordem precisa estar
correta para o mobile e para larguras intermediárias.

## 4. Cores

| Elemento | Token | Por quê |
|---|---|---|
| Fundo da dobra | `--primary` | não muda |
| Lajes em repouso | `--shade` (#e3e5e8) | o sistema já nomeia essa cor de **concreto bruto** |
| Laje do tipo da vez | `--surface` (#ffffff) | **concreto polido** — o material depois do acabamento |

A troca de cor não é destaque arbitrário: é o produto antes e depois do beneficiamento que a empresa
vende. O delta entre as duas é discreto de propósito — o indicador é redundante (ver §7), não é o
canal principal.

## 5. O lockup

Substitui o wordmark solto no canto inferior esquerdo, ancorado nos mesmos 100px que o `DEC-033`
mediu e nas mesmas células/margens negativas.

```
ESCADAS
MUNARIM
──────────────────────
Escadas pré-moldadas de concreto polido, sob medida.
SETE TIPOS · 15 ANOS
```

| Linha | Especificação |
|---|---|
| Nome | Outfit 600, `clamp(1.75rem, 6.1vw, 5.5rem)`, `leading-[0.88]`, `tracking-[-0.03em]`, caixa alta, `--primary-fg` |
| Filete | 1px `--primary-fg` a 40%, largura da tinta do nome (`w-fit`) |
| Descritor | Hanken Grotesk 500, `--text-h4` (24px) / `--lh-h4`, `--primary-fg` |
| Fatos | DM Mono 500, `--text-eyebrow` (13px), caixa alta, `--tr-eyebrow`, `--primary-fg-muted` |

As duas linhas novas usam degraus que já existem na escala — nenhum corpo fora do sistema.

**O nome cai de 104px para 88px.** A 104px contra um descritor de 24px a razão é 4,3:1, que lê como
nome gigante com nota de rodapé em vez de lockup; a 88px fecha em 3,7:1 e o bloco cola. Isso aproxima
o wordmark do teto de display do sistema (72px) e **reduz — sem eliminar — a exceção nomeada que o
`DEC-031` registrou.**

**A linha de fatos não usa "SÃO JOSÉ — GRANDE FLORIANÓPOLIS" de propósito:** ela já aparece na barra
fixa e de novo na faixa navy de fechamento da home, e seria a terceira ocorrência na mesma página.
"SETE TIPOS" faz trabalho melhor ali — é fato verificado e explica em texto por que a escada tem sete
degraus. Todos os fatos usados estão na lista verificada do `CLAUDE.md`.

## 6. Copy

**H1 novo:** *"Segurança e design, na medida exata do seu vão."*

Substitui *"Escadas de concreto pré-moldado, sob medida para o seu vão."*, que virou quase gêmeo do
descritor do lockup. A frase nova apoia-se na tagline verificada da marca.

**Escolha consciente, registrada como tal:** foi apontado ao desenvolvedor, antes da escolha, que
esta frase reusa "vão", palavra que já aparece no fechamento da home (*"Conte o seu vão. A gente diz
o que cabe nele."*). Ele escolheu assim mesmo. Não é descuido.

**Uma frase foi descartada por ser falsa:** qualquer construção do tipo "a escada chega pronta da
fábrica" não vale para os 7 tipos — **in loco é feita no local**, não é pré-moldada. Um sétimo do
catálogo desmentiria a dobra.

O parágrafo de apoio permanece como está.

## 7. Movimento

Sem constante nova. Tudo sai de `lib/motion.ts`.

| Parâmetro | Valor | Origem |
|---|---|---|
| Duração por laje | 0,46s | `DUR + STAGGER` (piso 28 + espelho 18, em centésimos) |
| Stagger do grupo | 0,18s | `STAGGER` — um espelho |
| Total do stagger | 6 × 0,18 = **1,08s** | é exatamente o `MAX_STAGGER` documentado no arquivo |
| Assentamento | 1,54s | |
| Curva | `degrau` | `EASE` / `--ease-degrau` |

Que 7 lajes gerem 6 intervalos que batem no teto de stagger do sistema é coincidência favorável, não
ajuste: o teto já estava escrito e a contagem vem do catálogo.

**O estado inicial vem do JS, nunca do CSS** — regra do `lib/motion.ts`, razão do `DEC-018`. O HTML
estático sai com a massa de pé; ao montar, se `jaVisivel()` indicar que ninguém teve tempo de ler, o
JS aplica `scaleY(0)` e anima. Se o bundle demorar, a pessoa vê a escada pronta em vez de vê-la sumir
e voltar. `HeroCapa` já é `"use client"`.

**Indicador:** laje *i* ↔ tipo *i*. Quando o card troca, `laje[atual]` vai para `--surface` e as
demais ficam em `--shade`, em 150ms lineares. Usa o `setInterval` que já existe — **não entra relógio
novo**.

## 8. Acessibilidade

- As lajes são `aria-hidden` e `pointer-events-none`. Não há informação ali fora de texto: o nome do
  tipo já está na legenda do card.
- O indicador é **redundante por construção**. Quem não distingue `#e3e5e8` de `#ffffff` não perde
  nada, porque a legenda nomeia o tipo em palavra.
- Nenhum texto fica sobre a massa no desktop; os contrastes atuais não mudam.
- Com `prefers-reduced-motion: reduce` a massa aparece de pé, sem subida. O ciclo do card já para
  hoje (`if (semMovimento) return`), então o indicador congela na laje 0 — que é o `atual` inicial.
  Estado final idêntico; nada depende do movimento para ser lido.

## 9. Responsivo — o ponto fraco deste desenho

**O vazio que motivou tudo isto só existe no desktop.** No mobile a dobra já é uma pilha cheia:
medido em 390×844, o conteúdo termina por volta de y=640 e o lockup consome mais ~120px, restando
~36px.

A proporção não ajuda: como `altura = 0,643 × largura`, uma escada de borda a borda no mobile tem
**251px de altura independente de quantos degraus tenha**. Não cabe.

**Proposta:** massa a ~45% da largura (176 × 113px) no canto inferior direito, com o lockup travado
em no máximo ~52% de largura para não colidir.

**Estes números saíram de duas medições e uma conta — não foram vistos em navegador.** Verificar na
implementação é requisito, não cortesia. **Fallback aprovado:** se não fechar, a massa não aparece
abaixo de `lg` e a dobra mobile se resolve só com o lockup.

## 10. O que não muda

- Card 3:2 com crossfade dos 7 tipos, posição, tamanho e legenda.
- Posição e corpo do parágrafo de apoio.
- `100svh`, sangria, `-mt-24` e a reposição do gutter como padding do grid (`DEC-033`).
- Ancoragem do lockup em 100px, e o encosto óptico da tinta do wordmark.
- Ausência de CTA na dobra (`DEC-001`: nenhum pedido de orçamento antes de prova).

## 11. Riscos e pendências

| # | Risco | Mitigação |
|---|---|---|
| R1 | **Card e escada viram o mesmo relógio.** Se o card sair um dia, a escada perde o índice. | Aceito explicitamente pelo desenvolvedor. O acoplamento fica registrado; a escada continua legível como silhueta sem o indicador. |
| R2 | O mobile pode não comportar a massa (§9). | Verificar em navegador; fallback aprovado é omitir abaixo de `lg`. |
| R3 | O delta `--shade` → `--surface` pode ser sutil demais para ler como indicador. | Verificar em captura. É redundante por construção, então "sutil demais" degrada para silhueta pura, não para defeito. |
| R4 | A massa entra como célula do grid e pode alterar a altura da linha que compartilha com o lockup. | Medir a tinta do wordmark antes e depois, por `Range`, como foi feito no `DEC-040`. Alvo: sem deslocamento. |
| R5 | "vão" passa a aparecer duas vezes na home (§6). | Escolha consciente do desenvolvedor. |

## 12. Arquivos afetados

- `components/home/HeroCapa.tsx` — massa, lajes, indicador ligado ao `atual`, lockup, H1 novo.
- `app/globals.css` — classes da massa e das lajes.
- `docs/ai/DECISIONS_LOG.md` — nova entrada `DEC-041`.
- `docs/ai/PAGE_BLUEPRINTS.md` — estrutura low-fi da capa.
- `docs/ai/DESIGN_SYSTEM.md` — o lockup da capa.

## 13. Critérios de verificação

1. TypeScript, ESLint e build de produção limpos.
2. Proporção da massa medida em navegador: `altura / largura` = 0,643 ± 0,01.
3. As 7 lajes com alturas em progressão `(i+1)/7` e a laje da vez sincronizada com a legenda do card,
   amostrada ao longo de um ciclo completo (7 × 4s).
4. Tinta do wordmark e do H1 medida por `Range` antes e depois — sem deslocamento no desktop (R4).
5. Folgas do §3 conferidas em 1440×900: ≥ 100px do wordmark, ≥ 100px do H1.
6. `prefers-reduced-motion: reduce`: massa de pé, sem `transform`, indicador na laje 0.
7. Mobile 390×844: sem estouro horizontal, sem colisão entre lockup e massa — ou massa ausente,
   conforme o fallback do §9.
8. Contraste sem regressão nas rotas afetadas.
