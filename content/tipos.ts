/**
 * Os 7 tipos de escada — uma rota dinâmica, não 7 componentes (DEC-003).
 *
 * ATENÇÃO: as descrições abaixo são interpretação técnica a partir dos nomes usados
 * pela empresa. O site atual não traz nenhum texto descritivo, só fotos.
 * Nada aqui é especificação oficial até `CNT-009` ser respondido — por isso
 * `validado: false` e por isso não há cota publicada.
 */

export type Tipo = {
  slug: string;
  nome: string;
  /** Uma linha, para card e hero. */
  resumo: string;
  /** Característica destacada no card do grid. */
  destaque: string;
  /** Quando este tipo é indicado. */
  quandoEscolher: string[];
  /** Limitações reais — bloco obrigatório (DEC-012). Não suavizar. */
  quandoNaoEscolher: string[];
  /** Cotas — só publicar depois de CNT-009. */
  cotas: null;
  /** false = conteúdo provisório, não publicável como especificação. */
  validado: boolean;
};

export const tipos: Tipo[] = [
  {
    slug: "reta",
    nome: "Reta",
    resumo:
      "Lance único, sem curva. O desenho mais direto e o de instalação mais simples.",
    destaque: "Lance único",
    quandoEscolher: [
      "Há espaço linear disponível para o lance inteiro",
      "Quer o menor custo de fabricação e instalação",
      "Precisa de subida confortável e previsível",
    ],
    quandoNaoEscolher: [
      "O espaço disponível é curto — um lance reto exige comprimento proporcional ao pé-direito",
    ],
    cotas: null,
    validado: false,
  },
  {
    slug: "caracol",
    nome: "Caracol",
    resumo:
      "Giro completo em torno de um eixo central. Resolve o menor vão possível.",
    destaque: "Menor área ocupada",
    quandoEscolher: [
      "O espaço é o principal limitador",
      "A escada é de acesso secundário — sótão, mezanino, terraço",
    ],
    quandoNaoEscolher: [
      "É a escada principal da casa e será usada muitas vezes por dia",
      "Precisa subir móvel grande por ela",
      "Há criança pequena ou pessoa com mobilidade reduzida na casa",
    ],
    cotas: null,
    validado: false,
  },
  {
    slug: "leke",
    nome: "Leke",
    resumo:
      "Degraus em balanço, engastados na parede, sem viga aparente sob o lance.",
    destaque: "Sem viga aparente",
    quandoEscolher: [
      "Quer o efeito de degraus flutuantes",
      "O ambiente pede leveza visual e passagem de luz sob a escada",
    ],
    quandoNaoEscolher: [
      "A parede de apoio não tem estrutura para receber o engaste dos degraus",
    ],
    cotas: null,
    validado: false,
  },
  {
    slug: "mista",
    nome: "Mista",
    resumo:
      "Combina lances retos com curva ou patamar para vencer o desnível no espaço disponível.",
    destaque: "Lances + patamar",
    quandoEscolher: [
      "O espaço não comporta um lance reto contínuo",
      "Precisa mudar de direção entre pavimentos",
      "Quer um patamar de descanso na subida",
    ],
    quandoNaoEscolher: [
      "O vão é muito pequeno para acomodar o patamar",
    ],
    cotas: null,
    validado: false,
  },
  {
    slug: "premium",
    nome: "Premium",
    resumo:
      "Linha de acabamento superior da Munarim. Os detalhes de cada peça são definidos no projeto, junto com você.",
    destaque: "Acabamento superior",
    quandoEscolher: [],
    quandoNaoEscolher: [],
    cotas: null,
    validado: false,
  },
  {
    slug: "espelho-fechado",
    nome: "Espelho fechado",
    resumo:
      "Contra-degrau fechado: o lance fica sólido, sem vazado entre os degraus.",
    destaque: "Lance sólido",
    quandoEscolher: [
      "Há criança pequena ou animal na casa",
      "Quer aproveitar o vão sob a escada como armário ou lavabo",
      "Prefere a leitura visual de peça maciça",
    ],
    quandoNaoEscolher: [
      "Quer passagem de luz sob o lance",
    ],
    cotas: null,
    validado: false,
  },
  {
    slug: "in-loco",
    nome: "In loco (cascata)",
    resumo:
      "Concretada no próprio local, para geometria que não comporta peça pré-moldada.",
    destaque: "Concretada no local",
    quandoEscolher: [
      "A geometria do vão é irregular ou fora de padrão",
      "O acesso não permite a entrada de peça pré-moldada",
    ],
    quandoNaoEscolher: [
      "Precisa do prazo curto e da previsibilidade da peça pré-moldada",
      "A obra não comporta a sujeira e o tempo de cura da concretagem no local",
    ],
    cotas: null,
    validado: false,
  },
];

export const tipoSlugs = tipos.map((t) => t.slug);

export function getTipo(slug: string): Tipo | undefined {
  return tipos.find((t) => t.slug === slug);
}
