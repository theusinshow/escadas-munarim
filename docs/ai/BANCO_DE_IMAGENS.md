# Banco de Imagens — o que pesquisar para cada tipo de escada

> Complementa `/docs/ai/MEDIA_PLAN.md` (que define **onde** cada imagem entra e **como** ela precisa
> parecer). Este documento define **como achar** a imagem de cada um dos 7 tipos, de onde ela pode
> vir, e o que a desqualifica.

## As duas pastas — e por que são duas

| Pasta | O que vive aqui | Pode ir para o site? |
|---|---|---|
| `docs/ai/referencias/{tipo}/` | O que você acha no Google, Pinterest, ArchDaily, Houzz. Moodboard e base de prompt. | **Não.** Nunca. |
| `public/media/escadas/{tipo}/` | Foto do cliente, stock licenciado, ou imagem gerada aprovada. | Sim. |

A separação não é burocracia. Uma foto achada no Google é escada de **outra** empresa, fotografada
por **outra** pessoa. Publicada na página de um tipo, ela se lê como obra da Munarim — é prova
fabricada, o mesmo defeito que `DEC-008` mitiga, com direito autoral de terceiro em cima. Como
referência de busca e de prompt ela é ótima e legítima.

## Ordem de preferência da fonte

1. **Acervo do cliente** (`CNT-003`). Única fonte que pode receber legenda de obra real. Vale mais
   que todo o resto somado — mesmo foto de celular, mesmo com obra em volta.
2. **Stock com licença livre** — Unsplash, Pexels, Pixabay. Buscar **em inglês**, o acervo em
   português é raso. Publicável, mas sem legenda que afirme autoria da Munarim.
3. **Stock pago** — Adobe Stock, iStock, Freepik (licença comercial). Mesma regra de legenda.
4. **Geração por IA** — o que já está no site hoje (`gen-*.avif`). Passa pela verificação por asset
   de `MEDIA_PLAN.md`, imagem por imagem.
5. **Google Imagens / Pinterest / ArchDaily** — **referência apenas**. No Google, use
   *Ferramentas → Direitos de uso → Creative Commons* e ainda assim confira a licença na origem;
   o filtro erra.

## Filtros que valem para os 7 tipos

Some a **toda** busca, ou os resultados vêm dominados por escada de madeira e kit de metal:

- Palavras-âncora: `concreto` · `concreto polido` · `pré-moldada` — em inglês, `concrete`.
- Ambiente: interior residencial, sem mobília, sem decoração.
- Luz: natural lateral, sombra definida no degrau. **A sombra é o que revela a geometria** — foto com
  luz frontal chapada não serve para comparar tipo nenhum.
- Enquadramento: três quartos ou lateral. Linhas verticais retas, sem grande angular distorcida.

**Descarta na hora:** pessoa identificável · texto, logo ou marca d'água na imagem · escada de
madeira ou de metal (só o corrimão é metálico) · render 3D com aparência de catálogo · HDR estourado
· escada externa de calçada · menos de 1200px no lado maior.

## Tabela de busca por tipo

| Tipo | Busca em português | Busca em inglês (stock) |
|---|---|---|
| **Reta** | `escada reta de concreto polido` · `escada pré-moldada reta` · `escada concreto lance único` | `straight concrete staircase` · `polished concrete stairs interior` |
| **Caracol** | `escada caracol de concreto` · `escada caracol pré-moldada` | `spiral concrete staircase` · `concrete spiral stair central column` |
| **Leke** | `escada leke` · `escada em balanço de concreto` · `degraus engastados na parede` | `cantilevered concrete stairs` · `floating concrete stair treads` |
| **Mista** | `escada em L de concreto` · `escada com patamar concreto` · `escada em U concreto` | `L-shaped concrete staircase` · `half turn stairs with landing` |
| **Premium** | `escada concreto polido alto brilho` · `escada concreto corrimão inox` | `polished concrete staircase high gloss` · `architectural concrete stair` |
| **Espelho fechado** | `escada concreto espelho fechado` · `escada contra-degrau fechado` | `closed riser concrete staircase` · `solid concrete stairs` |
| **In loco** | `escada moldada in loco` · `escada concretada no local` | `cast in place concrete stairs` · `monolithic poured concrete stairs` |

O detalhe de cada tipo — o que confirma que é aquele tipo e o que confunde com outro — está no
`LEIA-ME.md` dentro da pasta correspondente.

### Dois avisos de vocabulário

- **"Leke"** é nome de praça, usado no Sul. Em stock internacional ele não existe: o termo que traz
  resultado é **cantilevered** ou **floating**. Em português, `escada em balanço` rende mais que
  `escada leke`.
- **"Caracol" ≠ "helicoidal".** Caracol gira em torno de um eixo central sólido. Helicoidal é curva e
  vaza no meio, sem pilar. São peças diferentes; a busca por `helicoidal` traz o tipo errado.
- **"Premium" não é geometria, é acabamento.** Uma reta muito bem-acabada é premium. Procure o
  **reflexo** no degrau — é o que diferencia da reta comum na página.

## Nome de arquivo

| Origem | Padrão | Exemplo |
|---|---|---|
| Referência não licenciada | `ref-{tipo}-{slot}` | `public/media/escadas/reta/ref-reta-hero.avif` |
| Cliente | `foto-{tipo}-{n}` | `public/media/escadas/reta/foto-reta-01.avif` |
| Stock licenciado | `stock-{tipo}-{n}` | `public/media/escadas/caracol/stock-caracol-01.avif` |
| Gerada por IA | `gen-{tipo}-{n}` | `public/media/escadas/leke/gen-leke-01.avif` |

**`ref-` é o único prefixo que não pode ir para produção.** Ele marca a imagem que já passou pela
seleção — enquadramento certo, tipo certo, recorte pronto — mas cuja licença ainda não existe. Serve
para montar a página e ver o site de pé; sai quando chegar a foto do cliente ou a versão licenciada.

> **Estado em 2026-08-08 (`DEC-034`):** as sete `ref-{tipo}-hero.avif` **estão ligadas no build** —
> `content/tipos.ts` aponta para elas, e elas aparecem na capa da home, no slideshow do menu e nas 7
> páginas de tipo. É o uso previsto no parágrafo acima (ver o site de pé), **não** autorização para
> publicar. **Condição de publicação:** trocar as sete por foto do cliente (`CNT-003`) ou por stock
> licenciado com linha na tabela do fim deste documento. Enquanto isso não acontecer, o site não sobe.
>
> A trava agora é de compilação, não de leitura: `components/media/Foto.tsx` exige que o prefixo do
> arquivo bata com a `origem` declarada (`gerado` → `gen-`, `referencia` → `ref-`). Declarar uma e
> usar o arquivo da outra quebra o build.

O prefixo carrega a procedência dentro do nome, então dá para auditar o site inteiro com um `ls` —
e trocar uma imagem gerada por foto real vira uma renomeação rastreável, como pede `MEDIA_PLAN.md`.
Fonte e licença de cada `stock-` entram na tabela do fim deste documento.

## Formato

- Origem em JPG/PNG na maior resolução disponível → converter para **AVIF a 1600px** no lado maior.
- Alvo de peso: **160KB** por imagem de galeria (as atuais estão entre 28 e 46KB).
- Ratio retrato como padrão: **2:3** nas molduras de tipo e menu, com **3:4** aceito quando a foto
  inteira sustenta melhor a leitura da escada. 3:2 horizontal só entra quando o arquivo já nasceu
  assim e o recorte não destrói o curso dos degraus.

## Antes de publicar qualquer imagem — checklist

Vale para foto de cliente, stock e imagem gerada:

- [ ] É mesmo o tipo da página? (confira pelos "sinais" do `LEIA-ME.md` da pasta)
- [ ] A geometria fecha? Degrau apoiado, corrimão contínuo, espessura constante.
- [ ] Sem pessoa identificável.
- [ ] Sem legenda factual — nome, endereço, bairro, data, metragem. Legenda permitida: **tipo e
      acabamento**.
- [ ] `alt` descreve o que está na imagem, sem afirmar que é obra da Munarim (exceto foto do cliente).
- [ ] Licença registrada na tabela abaixo, se for stock.
- [ ] Peso dentro do alvo depois da conversão para AVIF.

## Onde a coleta de 2026-08-06 está hoje

Ela ficou **na pasta errada até 2026-08-08**: os 72 arquivos brutos estavam em
`public/media/escadas/{tipo}/`, do lado publicável, quando a regra das duas pastas acima manda o
achado de Pinterest/Google morar em `docs/ai/referencias/{tipo}/`. Foram movidos para lá (`DEC-039`).
As sete `ref-*-hero.avif` — os recortes aprovados — continuam em `public/`, que é onde devem estar.

**Estado em 2026-08-11:** o site passou a consumir o acervo vertical em `public/media/*.jpg`, via
`content/tipos.ts`, e não mais as sete `ref-*-hero.avif` de paisagem. A regra continua a mesma:
nenhuma legenda factual, e o `alt` descreve apenas o que aparece.

**Estado em 2026-10-09 (`DEC-048`):** o acervo entra por pipeline. Originais em `media-src/{tipo}/`
(fora do git), `npm run media` gera `public/media/escadas/{tipo}/{prefixo}-{tipo}-NN.avif` e
`content/galeria.generated.ts`. A subpasta define o prefixo (raiz → `ref-`, `_stock/`, `_gerado/`,
`_cliente/`) e a primeira foto do tipo é a capa. As 43 fotos atuais são **todas `ref-`** — achadas na
internet. Sem selo sobre a foto (`DEC-049`); o aviso fica nas seções. O `foto-` antigo com `origem: "cliente"`
em `tipos.ts` estava errado e saiu. Instruções de uso em `media-src/LEIA-ME.md`.

## Seleção de 2026-08-06 — 70 imagens coletadas, 7 escolhidas

Recorte 3:2 a partir do original, **sem redimensionar** (só `extract` + AVIF q72, 4:4:4). Nenhuma
imagem foi ampliada: ampliar não cria detalhe, só peso.

| Tipo | Escolhida | Recorte | Peso | Veredito |
|---|---|---|---|---|
| Reta | `5.jpg` | 1200×800 | 64KB | **boa.** Lance reto de concreto contra parede de concreto, guarda-corpo de vidro. A melhor do acervo inteiro. |
| Leke | `1.jpg` | 1170×780 | 76KB | **boa.** Única leke verdadeira das 70. Degrau de concreto engastado, corrimão de inox, sem LED. |
| In loco | `3.jpg` | 1125×750 | 32KB | **boa.** Lance monolítico branco sobre parede de concreto escuro. Contraste alto, silhueta limpa. |
| Espelho fechado | `7.jpg` | 1024×683 | 52KB | **aceitável.** O espelho fechado se lê de imediato — mas o degrau é de madeira. |
| Mista | `3.jpg` | 1080×720 | 148KB | **fraca.** É a única com dois lances e patamar de verdade. Materiais misturados, cena carregada. |
| Caracol | `1.jpg` | 720×480 | 20KB | **insuficiente.** Tipo e material certos (concreto + inox), mas 720px e desbotada. Só serve como miniatura. |
| Premium | `1.jpg` | 736×491 | 28KB | **insuficiente.** 736px, e é mármore, não concreto polido. |

### Descartes com motivo

- **Marca d'água:** `espelho-fechado/4.jpg`, `espelho-fechado/5.jpg` (R-URAL.COM) ·
  `espelho-fechado/9.jpg` (NIKA) · `in-loco/9.jpg` (DUBAI HOUSE + telefone) · `reta/3.jpg` (PROJEOTA).
- **Screenshot com UI:** `caracol/7.jpg` (cabeçalho do Instagram) · `in-loco/4.jpg` (ícone de vídeo).
- **Miniatura:** `espelho-fechado/6.jpg` (236px) e `8.jpg` (235px) — menos de um terço do mínimo.
- **Tipo errado:** 9 das 10 de `leke/` são degrau de madeira sobre viga central metálica, que é o
  oposto de leke. 8 das 10 de `mista/` são lance único, sem patamar. `premium/` inteira é mármore e
  ônix com fita de LED — outro produto, outro público.

### Três limites que a coleta impôs

1. **Todas as 70 são retrato** (0,56 a 0,83) e os três slots de foto do site são **3:2 deitado** —
   hero 2000×1328, galeria 1600×1063. Todo recorte joga fora entre 40% e 60% da imagem, e é por isso
   que quatro das sete precisaram de reenquadramento manual: o corte automático caía na parede vazia.
2. **A resolução tem teto de 1200px.** É a largura máxima do Pinterest, de onde veio quase tudo. Dá
   para o hero, que renderiza a ~600px CSS (2× em tela retina). **Não dá** para a galeria, que
   renderiza a ~950px CSS — ali 1200px é 1,26×, e a imagem vai amolecer em tela retina.
3. **Piso de resolução: 900px de largura no original.** Abaixo disso a imagem não entra em nenhum
   slot — depois do recorte 3:2 ela chega ao navegador com menos pixels do que a área que ocupa.

## Registro de licença — imagens de stock usadas

Preencher a cada imagem baixada. Sem linha aqui, a imagem não vai para produção.

| Arquivo | Tipo | Fonte | URL | Licença | Data |
|---|---|---|---|---|---|
| — | — | — | — | — | — |
