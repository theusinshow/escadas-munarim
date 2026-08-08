import type { ProcessStep } from "@/components/technical/ProcessIllustration";

/**
 * Os 4 passos, escritos para quem nunca viu uma escada ser feita (DEC-002).
 *
 * O que está aqui é explicação de COMO uma escada pré-moldada funciona —
 * conhecimento do produto, verdadeiro independentemente da empresa.
 *
 * O que NÃO está: prazo (CNT-005), quem executa a instalação (CNT-014) e
 * qualquer número de carga ou medida (CNT-009/CNT-006). Esses campos ficam
 * como slot marcado até o cliente responder.
 */

export type Passo = {
  step: ProcessStep;
  numero: string;
  titulo: string;
  resumo: string;
  detalhe: string[];
  /** Marcação visível de pendência, quando houver. */
  pendente?: string;
};

export const passos: Passo[] = [
  {
    step: "medicao",
    numero: "01",
    titulo: "Medição no local",
    resumo:
      "Três medidas definem a sua escada: o vão, o pé-direito e o apoio disponível.",
    detalhe: [
      "O **vão** é a abertura na laje por onde a escada passa — o buraco que já está previsto no projeto da casa.",
      "O **pé-direito** é a altura do piso de baixo até o piso de cima, contando o acabamento dos dois. É ele que define quantos degraus a escada vai ter: não dá para escolher o número de degraus, ele sai da conta.",
      "O **apoio** é onde a escada descarrega o peso — na laje, em viga ou na parede, dependendo do tipo.",
    ],
  },
  {
    step: "projeto",
    numero: "02",
    titulo: "Projeto e cotas",
    resumo: "Você aprova o desenho antes de qualquer peça ser fabricada.",
    detalhe: [
      "Com as medidas em mãos, sai o desenho cotado: quantos degraus, qual a altura de cada um, qual a profundidade, onde a escada apoia e por onde ela entra na obra.",
      "Essa é a hora de mudar de ideia. Depois da peça concretada, mudança significa peça nova.",
    ],
  },
  {
    step: "fabricacao",
    numero: "03",
    titulo: "Fabricação",
    resumo:
      "Pré-moldada quer dizer moldada antes: a escada é concretada e polida fora da obra.",
    detalhe: [
      "A peça é concretada em fôrma, curada e polida antes de chegar na sua casa. É essa a diferença para a escada concretada no local, que exige fôrma, escoramento e tempo de cura dentro da obra.",
      "Na prática: menos sujeira, menos tempo com a obra parada e um acabamento de concreto polido que sai de fôrma, não de reboco.",
    ],
  },
  {
    step: "instalacao",
    numero: "04",
    titulo: "Instalação",
    resumo: "A peça chega pronta e é posicionada no vão já preparado.",
    detalhe: [
      "A escada é levada até a obra, içada e assentada nos apoios previstos no projeto. Como ela já chega curada, não há espera de concreto no local.",
      "Antes do dia, o vão precisa estar livre e o acesso até ele desimpedido — é o que costuma atrasar a instalação.",
    ],
    pendente:
      "QUEM EXECUTA A INSTALAÇÃO E EM QUANTO TEMPO — AGUARDANDO A EMPRESA (CNT-014, CNT-005)",
  },
];
