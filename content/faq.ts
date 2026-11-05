/**
 * FAQ técnico.
 *
 * Divisão deliberada:
 * - `resposta` preenchida = explicação de termo ou fato declarado pelo cliente.
 *   Nada aqui depende de dado que a empresa não tenha publicado.
 * - `resposta` ausente = a pergunta aparece, a resposta não. São as que exigem
 *   NÚMERO (carga, peso, largura mínima, prazo) ou dado operacional. Resposta
 *   errada sobre estrutura destrói a credibilidade que o site inteiro constrói —
 *   e, em produto estrutural, gera responsabilidade real. Ver CNT-006.
 *
 * O `FAQPage` em JSON-LD só emite as perguntas que têm resposta: marcação e
 * tela nunca divergem.
 */

export type Pergunta = {
  q: string;
  /** Ausente = aguardando validação técnica da empresa (CNT-006). */
  resposta?: string;
  /** Código da pendência, quando houver. */
  pendencia?: string;
};

export type GrupoFAQ = { tema: string; perguntas: Pergunta[] };

export const faq: GrupoFAQ[] = [
  {
    tema: "Medidas",
    perguntas: [
      {
        q: "O que é o vão da escada e como eu meço o meu?",
        resposta:
          "O vão é a abertura na laje por onde a escada passa — o espaço já previsto no projeto da casa. Para medir, você precisa do comprimento e da largura dessa abertura, medidos na laje acabada. É essa abertura que limita quais tipos de escada cabem no seu caso.",
      },
      {
        q: "O que é pé-direito e por que ele define a escada?",
        resposta:
          "Pé-direito é a altura do piso de baixo até o piso de cima, contando o acabamento dos dois. Ele define quantos degraus a escada terá: divide-se a altura total pela altura de cada degrau e o número sai da conta. Por isso não dá para escolher a quantidade de degraus — ela é consequência da altura.",
      },
      {
        q: "O que são espelho e piso do degrau?",
        resposta:
          "Espelho é a altura de cada degrau, a parte vertical. Piso é a profundidade, onde você apoia o pé. A relação entre os dois é o que faz uma escada ser confortável ou cansativa: espelho alto demais cansa, piso curto demais dá insegurança na descida. A referência usada no Brasil é a da norma de acessibilidade (ABNT NBR 9050): espelho entre 16 e 18 cm, piso entre 28 e 32 cm, e duas vezes o espelho mais o piso entre 63 e 65 cm.",
      },
      {
        q: "Qual a largura mínima de uma escada residencial?",
        pendencia: "CNT-006",
      },
      {
        q: "Minha escada precisa de patamar?",
        pendencia: "CNT-006",
      },
    ],
  },
  {
    tema: "Estrutura",
    perguntas: [
      {
        q: "O que é uma escada pré-moldada de concreto?",
        resposta:
          "É uma escada moldada antes de chegar na obra: concretada em fôrma, curada e polida fora do local, e depois levada pronta até a casa. A alternativa é a escada concretada no próprio local, que exige fôrma, escoramento e tempo de cura dentro da obra.",
      },
      { q: "Quanto pesa uma escada de concreto pré-moldada?", pendencia: "CNT-006" },
      { q: "Minha laje aguenta o peso?", pendencia: "CNT-006" },
      { q: "Como a escada é fixada e onde ela apoia?", pendencia: "CNT-006" },
      { q: "Preciso de viga ou apoio embaixo da escada?", pendencia: "CNT-006" },
    ],
  },
  {
    tema: "Prazo e obra",
    perguntas: [
      { q: "Quanto tempo leva da medição à instalação?", pendencia: "CNT-005" },
      { q: "Em que fase da obra eu devo encomendar a escada?", pendencia: "CNT-006" },
      {
        q: "O que precisa estar pronto na obra no dia da instalação?",
        resposta:
          "O vão precisa estar livre e o caminho até ele desimpedido — é o que mais costuma atrasar a instalação. Os apoios previstos no projeto também já devem estar executados.",
      },
    ],
  },
  {
    tema: "Instalação",
    perguntas: [
      { q: "A instalação quebra parede ou suja a obra?", pendencia: "CNT-006" },
      { q: "Precisa de guindaste ou caminhão grande na rua?", pendencia: "CNT-006" },
      { q: "Quem faz a instalação?", pendencia: "CNT-014" },
    ],
  },
  {
    tema: "Acabamento",
    perguntas: [
      {
        q: "Quais opções de corrimão e guarda-corpo existem?",
        resposta:
          "Corrimão, guarda-corpo e sacada vêm de empresas parceiras da Munarim. O corrimão pode ser em inox escovado polido ou em ferro galvanizado.",
      },
      {
        q: "Dá para revestir a escada depois?",
        resposta:
          "Sim. O revestimento entra por parceria com outras empresas, assim como o corrimão. O projeto e a escada são da Munarim.",
      },
      { q: "Como é o acabamento do concreto polido?", pendencia: "CNT-006" },
    ],
  },
  {
    tema: "Orçamento",
    perguntas: [
      {
        q: "O que eu preciso informar para receber um orçamento?",
        resposta:
          "Quanto mais preciso melhor, mas o essencial é: o pé-direito aproximado (altura de piso a piso), a largura e o comprimento do vão, a cidade da obra e, se você já souber, o tipo de escada que tem em mente. Se não souber o tipo, tudo bem — a gente ajuda a definir.",
      },
      {
        q: "Vocês atendem qual região?",
        resposta:
          "São José, Florianópolis, Palhoça, Biguaçu e a região da Grande Florianópolis. A empresa fica na Rua Treze de Junho, 893, no Flor de Nápolis, em São José.",
      },
      { q: "Vocês cobram pela visita de medição?", pendencia: "CNT-006" },
    ],
  },
];

/** Só as perguntas respondidas entram no JSON-LD. */
export const faqRespondido = faq
  .flatMap((g) => g.perguntas)
  .filter((p): p is Required<Pick<Pergunta, "q" | "resposta">> & Pergunta =>
    Boolean(p.resposta),
  );
