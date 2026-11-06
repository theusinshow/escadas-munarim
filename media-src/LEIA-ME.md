# media-src — onde você solta as fotos

1. Solte a imagem (PNG, JPG, WEBP, AVIF) na pasta do tipo: `reta/`, `caracol/`, `leke/`, `mista/`,
   `espelho-fechado/`. As pastas `premium/` e `in-loco/` saíram do catálogo (DEC-098): o script não as lê.
2. Rode `npm run media`.
3. Pronto: ela aparece na capa da home, no catálogo, na página do tipo e no menu.

## A subpasta diz de onde a foto veio

| Onde soltar | Vira | Pode publicar? |
|---|---|---|
| `{tipo}/` (raiz) | `ref-{tipo}-NN.avif` | **Não.** Achada na internet. Serve para montar e avaliar o site. |
| `{tipo}/_stock/` | `stock-…` | Sim, com linha na tabela de licença de `BANCO_DE_IMAGENS.md`. |
| `{tipo}/_gerado/` | `gen-…` | Sim, sem legenda factual (DEC-008). |
| `{tipo}/_cliente/` | `foto-…` | Sim. Única que pode ser chamada de obra da Munarim. |

## Ordem e capa

A **primeira** foto de cada tipo é a capa dele. A ordem é: cliente → stock → gerado → referência, e
alfabética dentro de cada grupo. Para escolher a capa entre as de referência, renomeie o arquivo
para começar com `00-`. Quando chegar foto real em `_cliente/`, ela vira a capa sozinha.

## Alt opcional

`{tipo}/alt.json` → `{ "00-capa.png": "Escada reta de concreto contra parede de concreto aparente" }`.
Sem isso o alt é genérico: "Escada reta — imagem de referência 2 de 6".

## Pastas ignoradas

- `_triagem/` — sem tipo definido. Mova para a pasta certa se servir.
- `_descartes/` — o nome do arquivo diz o motivo (marca d'água, UI de app, pessoa, duplicada).

## Tipo duvidoso (para você julgar)

- `caracol/caracol-1`, `00-capa` (era caracol-2), `caracol-3`: estrutura **metálica**, não concreto.
- `caracol/caracol-6`, `caracol-7`: são **helicoidais** (vazadas no centro), não caracol.
- Várias de `leke/`, `mista/` e `espelho-fechado/` têm **piso de madeira** sobre a estrutura.

Esta pasta não vai para o git (é pesada). O que vai é o AVIF gerado em `public/media/escadas/`.
