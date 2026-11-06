/**
 * Artigos (DEC-093). Escritos para o leitor leigo (DEC-002): cada termo técnico
 * é definido no primeiro uso, e a resposta curta abre o texto — é o trecho que
 * busca e assistente de IA citam.
 *
 * Regra de conteúdo: só norma pública (citada pelo nome, com a ressalva de
 * conferir a edição vigente) e conta de exemplo marcada como exemplo. Nada de
 * prazo, preço, carga ou número da Munarim — o que a empresa não informou não
 * entra (CONTENT_PENDING). A revisão da empresa está em CNT-017.
 *
 * Texto com **termo** sai em negrito (`comDestaque`).
 */

export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "tabela"; cabecalho: string[]; linhas: string[][]; legenda?: string }
  | { tipo: "conta"; titulo: string; linhas: string[]; nota: string };

export type Secao = { id: string; titulo: string; blocos: Bloco[] };

export type Artigo = {
  slug: string;
  titulo: string;
  /** Meta description e resumo na lista de artigos. */
  descricao: string;
  /** A resposta em três ou quatro frases, no topo do texto. */
  respostaCurta: string;
  publicado: string;
  secoes: Secao[];
  fontes: string[];
  /** Tipos de escada citados — viram links no pé do artigo. */
  tipos: string[];
};

export const artigos: Artigo[] = [
  {
    slug: "como-medir-o-vao-e-o-pe-direito",
    titulo: "Como medir o vão e o pé-direito antes de pedir uma escada",
    descricao:
      "Onde começa e onde termina cada medida, por que o piso acabado muda a conta e como o pé-direito define quantos degraus a escada terá.",
    respostaCurta:
      "Meça o pé-direito do piso acabado de baixo até o piso acabado de cima, e o vão como comprimento e largura da abertura na laje. Do pé-direito sai o número de degraus; do vão, se o tipo de escada que você quer cabe ali. Anote também onde a escada pode se apoiar: parede, viga ou laje.",
    publicado: "2026-11-05",
    secoes: [
      {
        id: "tres-medidas",
        titulo: "As três medidas que definem a escada",
        blocos: [
          {
            tipo: "p",
            texto:
              "O **pé-direito** é a altura do piso de baixo até o piso de cima. O **vão** é a abertura na laje por onde a escada passa — o buraco que já está, ou deveria estar, no projeto da casa. O **apoio** é onde a escada descarrega o peso: na laje, numa viga ou na parede.",
          },
          {
            tipo: "p",
            texto:
              "Com essas três informações dá para saber quantos degraus a escada terá, que tipo cabe no espaço e como ela vai ser presa. Sem elas, qualquer conversa sobre escada é chute.",
          },
        ],
      },
      {
        id: "pe-direito",
        titulo: "Pé-direito: de piso acabado a piso acabado",
        blocos: [
          {
            tipo: "p",
            texto:
              "A medida que importa é entre os pisos **acabados** — com contrapiso e revestimento já colocados. Se a obra ainda está no osso, meça laje a laje e some a espessura que o contrapiso e o piso vão ter em cima e embaixo.",
          },
          {
            tipo: "p",
            texto:
              "Parece detalhe, mas a escada divide o pé-direito em partes iguais. Se a medida estiver errada, o erro não fica num degrau só: ou aparece inteiro no primeiro ou no último degrau, que fica diferente dos outros, ou obriga a refazer a conta da escada toda.",
          },
          {
            tipo: "lista",
            itens: [
              "Meça em mais de um ponto do vão: laje nem sempre está no nível.",
              "Pergunte ao responsável pela obra qual será a espessura do contrapiso e do revestimento nos dois andares.",
              "Anote em centímetros. Arredondar para o metro esconde justamente a diferença que importa.",
            ],
          },
        ],
      },
      {
        id: "vao",
        titulo: "Vão: a abertura na laje",
        blocos: [
          {
            tipo: "p",
            texto:
              "Meça o comprimento e a largura da abertura e anote onde ela fica em relação às paredes. Uma foto do vão, tirada de baixo e de cima, ajuda mais do que parece.",
          },
          {
            tipo: "p",
            texto:
              "Observe também a **altura livre**: o espaço entre o degrau e a laje logo acima dele. Quem sobe precisa passar sem baixar a cabeça. A NBR 9077, norma de saídas de emergência, trabalha com pelo menos 2 m de altura livre; numa casa, use esse número como referência e confirme com o projetista e com o código de obras da sua cidade.",
          },
        ],
      },
      {
        id: "quantos-degraus",
        titulo: "Quantos degraus a escada terá",
        blocos: [
          {
            tipo: "p",
            texto:
              "O número de degraus não se escolhe: ele sai do pé-direito. Cada degrau tem uma altura, o **espelho**, e uma profundidade, o **piso**. A NBR 9050 indica espelho entre 16 e 18 cm e piso entre 28 e 32 cm. Divide-se o pé-direito por um espelho dentro dessa faixa e ajusta-se até o resultado dar um número inteiro de degraus.",
          },
          {
            tipo: "conta",
            titulo: "Conta de exemplo",
            linhas: [
              "Pé-direito acabado: 288 cm",
              "288 ÷ 18 = 16 espelhos de 18 cm",
              "Piso: 2 × 18 + piso entre 63 e 65 → piso de 28 cm",
              "Uma escada reta tem um piso a menos que espelhos (o último degrau é o próprio andar de cima): 15 × 28 = 420 cm de comprimento",
            ],
            nota: "Conta ilustrativa. As medidas da sua escada saem da medição no local.",
          },
          {
            tipo: "p",
            texto:
              "Esses 4,20 m de comprimento são o motivo de muita casa não comportar uma escada reta. Quando o espaço é menor, a solução é mudar o tipo — dividir a subida em dois lances ou girar em torno de um eixo —, não encurtar o degrau.",
          },
        ],
      },
      {
        id: "o-que-enviar",
        titulo: "O que enviar para pedir orçamento",
        blocos: [
          {
            tipo: "lista",
            itens: [
              "Pé-direito, de piso acabado a piso acabado (ou laje a laje, com as espessuras previstas).",
              "Comprimento e largura do vão, e a posição dele em relação às paredes.",
              "Fotos do vão, de baixo e de cima.",
              "Onde a escada pode se apoiar: paredes, vigas, laje.",
              "A cidade da obra.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Se ainda não tem tudo, mande o que tiver. A medição definitiva é feita no local, antes de qualquer peça ser fabricada.",
          },
        ],
      },
    ],
    fontes: [
      "ABNT NBR 9050 — Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos (dimensionamento de degraus).",
      "ABNT NBR 9077 — Saídas de emergência em edificações (altura livre). Confira a edição vigente e o código de obras do município.",
    ],
    tipos: ["reta", "mista", "caracol"],
  },
  {
    slug: "espelho-e-piso-medidas-do-degrau",
    titulo: "Espelho e piso: as duas medidas que decidem se a escada é confortável",
    descricao:
      "O que são espelho e piso, as faixas da NBR 9050, a fórmula que relaciona os dois e por que todos os degraus precisam ser iguais.",
    respostaCurta:
      "Espelho é a altura de cada degrau; piso é a profundidade onde o pé apoia. A NBR 9050 indica espelho de 16 a 18 cm, piso de 28 a 32 cm e que duas vezes o espelho mais o piso fique entre 63 e 65 cm. Dentro dessa faixa, a escada acompanha o passo de um adulto e a subida não cansa.",
    publicado: "2026-11-05",
    secoes: [
      {
        id: "o-que-sao",
        titulo: "O que são espelho e piso",
        blocos: [
          {
            tipo: "p",
            texto:
              "O **espelho** é a altura de um degrau — a face vertical, que a perna precisa vencer. O **piso** é a profundidade do degrau — a parte horizontal, onde o pé apoia. Quando a escada tem espelho fechado, essa face vertical é uma placa; quando não tem, o espelho continua existindo como medida, só que vazado.",
          },
        ],
      },
      {
        id: "faixas-da-norma",
        titulo: "As faixas da NBR 9050",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Medida", "Faixa indicada"],
            linhas: [
              ["Espelho (e)", "16 a 18 cm"],
              ["Piso (p)", "28 a 32 cm"],
              ["2e + p", "63 a 65 cm"],
            ],
            legenda: "Dimensionamento de degraus segundo a ABNT NBR 9050.",
          },
          {
            tipo: "p",
            texto:
              "A terceira linha é a que amarra as outras duas. Ela vem da **fórmula de Blondel**, proposta pelo arquiteto francês François Blondel no século XVII: dois espelhos mais um piso dão, aproximadamente, o comprimento do passo de uma pessoa adulta. Se o degrau é mais alto, ele precisa ser menos fundo, e vice-versa.",
          },
        ],
      },
      {
        id: "combinacoes",
        titulo: "Três combinações que respeitam a regra",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Espelho", "Piso", "2e + p", "Como fica"],
            linhas: [
              ["16 cm", "32 cm", "64 cm", "Subida mais suave, escada mais comprida"],
              ["17 cm", "30 cm", "64 cm", "Meio-termo"],
              ["18 cm", "28 cm", "64 cm", "Escada mais curta, subida mais firme"],
            ],
          },
          {
            tipo: "p",
            texto:
              "As três estão dentro da norma. A escolha entre elas costuma ser decidida pelo espaço: degrau mais baixo significa mais degraus, e mais degraus significam mais comprimento de escada.",
          },
        ],
      },
      {
        id: "degraus-iguais",
        titulo: "Por que todos os degraus precisam ser iguais",
        blocos: [
          {
            tipo: "p",
            texto:
              "Nos primeiros degraus, o corpo aprende o ritmo da escada e para de olhar para os pés. Um degrau com altura ou profundidade diferente quebra esse ritmo — é nele que se tropeça. Por isso a norma pede dimensões constantes ao longo de toda a escada, e por isso o pé-direito precisa ser medido com precisão: é ele que é dividido em partes iguais.",
          },
        ],
      },
      {
        id: "caracol",
        titulo: "E na escada caracol?",
        blocos: [
          {
            tipo: "p",
            texto:
              "No caracol, o degrau tem forma de fatia: estreito perto do eixo central e largo na borda. O piso muda conforme o lugar onde se pisa, e perto do centro ele fica curto demais para o pé inteiro. É por isso que a caracol funciona melhor como acesso secundário — sótão, mezanino, terraço — do que como escada principal da casa.",
          },
        ],
      },
    ],
    fontes: [
      "ABNT NBR 9050 — Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos (dimensionamento de degraus). Confira a edição vigente.",
    ],
    tipos: ["espelho-fechado", "caracol", "reta"],
  },
  {
    slug: "escada-pre-moldada-ou-moldada-no-local",
    titulo: "Escada pré-moldada ou moldada no local: o que muda na obra",
    descricao:
      "Como cada uma é feita, o que muda no dia a dia da obra — escoramento, espera de cura, sujeira — e quando a moldada no local é o caminho.",
    respostaCurta:
      "Na pré-moldada, a escada é concretada e curada fora da obra e chega pronta para assentar. Na moldada no local (in loco), fôrma, escoramento e concreto ficam dentro da casa até a cura. A pré-moldada tira essa etapa de dentro da obra; a in loco resolve geometrias que uma peça pronta não atende. A Munarim faz as duas.",
    publicado: "2026-11-05",
    secoes: [
      {
        id: "como-cada-uma-e-feita",
        titulo: "Como cada uma é feita",
        blocos: [
          {
            tipo: "p",
            texto:
              "**Pré-moldada** quer dizer moldada antes. A escada é concretada numa **fôrma** — o molde que dá o formato ao concreto —, curada e polida fora da obra. Quando chega, já está pronta: é levada até o vão e assentada nos apoios previstos no projeto.",
          },
          {
            tipo: "p",
            texto:
              "Na **moldada no local**, ou **in loco**, a fôrma é montada dentro da casa, no lugar onde a escada vai ficar. O **escoramento** — as peças que seguram a fôrma enquanto o concreto não aguenta o próprio peso — fica ali até a **cura**, o tempo que o concreto leva para ganhar resistência.",
          },
        ],
      },
      {
        id: "o-que-muda-na-obra",
        titulo: "O que muda no dia a dia da obra",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["", "Pré-moldada", "Moldada no local"],
            linhas: [
              ["Onde é concretada", "Fora da obra", "Dentro da casa"],
              ["Escoramento no vão", "Não", "Sim, até a cura"],
              ["Espera de cura na obra", "Não — a peça chega curada", "Sim"],
              ["Sujeira de concretagem", "Fica fora", "Fica dentro de casa"],
              ["Geometria", "Dentro do que a fôrma permite", "Mais livre"],
            ],
          },
          {
            tipo: "p",
            texto:
              "A diferença que mais se sente é a espera. Com a escada moldada no local, o vão fica ocupado por fôrma e escora até o concreto curar, e as etapas que dependem da escada esperam junto. Com a pré-moldada, essa etapa acontece em outro lugar.",
          },
        ],
      },
      {
        id: "quando-in-loco",
        titulo: "Quando a moldada no local é o caminho",
        blocos: [
          {
            tipo: "p",
            texto:
              "Quando a geometria não comporta uma peça pronta: formatos muito específicos, encaixes que só se resolvem no lugar, ou um acesso por onde a peça não passaria. Nesses casos, concretar no local é a solução, não a segunda opção.",
          },
        ],
      },
      {
        id: "normas",
        titulo: "As normas por trás de cada uma",
        blocos: [
          {
            tipo: "p",
            texto:
              "As duas são concreto armado e seguem norma técnica. O projeto de estruturas de concreto em geral segue a ABNT NBR 6118; o de peças pré-moldadas tem norma própria, a ABNT NBR 9062, que trata também do transporte e da montagem. Para o dono da casa, o que importa é saber que existe um projeto antes da concretagem — e conferir o desenho cotado antes de aprovar.",
          },
        ],
      },
    ],
    fontes: [
      "ABNT NBR 9062 — Projeto e execução de estruturas de concreto pré-moldado.",
      "ABNT NBR 6118 — Projeto de estruturas de concreto.",
    ],
    tipos: ["reta", "mista"],
  },
  {
    slug: "quanto-espaco-ocupa-cada-escada",
    titulo: "Quanto espaço ocupa cada tipo de escada",
    descricao:
      "Reta, mista, caracol, leke e espelho fechado: o que cada uma pede de comprimento e de planta, e como saber qual cabe no seu vão.",
    respostaCurta:
      "O espaço decide o tipo. A reta pede um corredor comprido; a mista divide os mesmos degraus em dois lances com patamar e troca comprimento por largura; a caracol gira em torno de um eixo e ocupa a menor área, com degraus estreitos perto do centro. Leke e espelho fechado mudam o degrau, não a planta.",
    publicado: "2026-11-05",
    secoes: [
      {
        id: "reta",
        titulo: "Reta: um lance, um corredor",
        blocos: [
          {
            tipo: "p",
            texto:
              "A escada reta sobe num **lance** só — a sequência de degraus sem interrupção. O comprimento que ela ocupa é o número de pisos vezes a profundidade de cada um. Como o número de degraus vem do pé-direito, quanto mais alto o pé-direito, mais comprida a escada.",
          },
          {
            tipo: "conta",
            titulo: "Conta de exemplo",
            linhas: [
              "Pé-direito acabado: 288 cm → 16 espelhos de 18 cm",
              "15 pisos de 28 cm → 420 cm de comprimento",
            ],
            nota: "Conta ilustrativa. As medidas da sua escada saem da medição no local.",
          },
        ],
      },
      {
        id: "mista",
        titulo: "Mista: dois lances e um patamar",
        blocos: [
          {
            tipo: "p",
            texto:
              "A escada mista divide a subida em dois lances, com um **patamar** entre eles — o trecho plano onde a escada muda de direção ou onde se pode parar. Os degraus são os mesmos da reta, só que dobrados: a escada ocupa menos comprimento e mais largura, em L ou em U.",
          },
        ],
      },
      {
        id: "caracol",
        titulo: "Caracol: a menor área",
        blocos: [
          {
            tipo: "p",
            texto:
              "A caracol gira em torno de um eixo central, e por isso ocupa uma área quase circular — a menor entre os tipos. O preço dessa economia está no degrau: estreito perto do centro, ele pede atenção a cada passo. Funciona bem em acesso secundário; como escada principal, usada muitas vezes por dia, costuma cansar.",
          },
        ],
      },
      {
        id: "leke-e-espelho-fechado",
        titulo: "Leke e espelho fechado: muda o degrau, não a planta",
        blocos: [
          {
            tipo: "p",
            texto:
              "Na **leke**, os degraus ficam em balanço, presos na parede, sem viga aparente embaixo. Ela ocupa a mesma planta de uma reta, mas depende de uma parede com estrutura para receber os degraus. No **espelho fechado**, o espaço entre um degrau e outro é fechado; a planta também não muda, e o vão debaixo da escada pode virar armário ou lavabo.",
          },
        ],
      },
      {
        id: "como-saber",
        titulo: "Como saber qual cabe no seu vão",
        blocos: [
          {
            tipo: "lista",
            itens: [
              "Meça o pé-direito acabado: ele dá o número de degraus.",
              "Meça o comprimento e a largura do vão: eles dizem se a reta cabe ou se é preciso dobrar a subida.",
              "Pense em quem vai usar e quantas vezes por dia: isso separa a escada principal da secundária.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Com essas respostas, a escolha costuma se resolver sozinha. O que sobra é decidido no projeto, com o desenho cotado na mão.",
          },
        ],
      },
    ],
    fontes: [
      "ABNT NBR 9050 — Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos (dimensionamento de degraus). Confira a edição vigente.",
    ],
    tipos: ["reta", "mista", "caracol", "leke", "espelho-fechado"],
  },
];

export const artigoPorSlug = (slug: string) => artigos.find((a) => a.slug === slug);

/** Minutos de leitura a 200 palavras por minuto, arredondado para cima. */
export function minutosDeLeitura(a: Artigo) {
  const texto = [
    a.respostaCurta,
    ...a.secoes.flatMap((s) =>
      s.blocos.flatMap((b) =>
        b.tipo === "p"
          ? [b.texto]
          : b.tipo === "lista"
            ? b.itens
            : b.tipo === "conta"
              ? b.linhas
              : b.linhas.flat(),
      ),
    ),
  ].join(" ");
  return Math.max(1, Math.ceil(texto.split(/\s+/).length / 200));
}
