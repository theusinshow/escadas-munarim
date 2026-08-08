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
  /**
   * Foto selecionada na coleta de 2026-08-06 (`BANCO_DE_IMAGENS.md`).
   *
   * ATENÇÃO: são arquivos `ref-`, e `ref-` é o **único prefixo que não pode ir
   * para produção** — a seleção está feita, a licença não existe. Servem para
   * montar a página e ver o site de pé, que é exatamente o papel que o próprio
   * documento lhes dá. Saem quando chegar a foto do cliente (`CNT-003`) ou a
   * versão licenciada. Ver `DEC-034`.
   *
   * `largura`/`altura` são os pixels **reais** do arquivo, medidos, não os
   * pixels que o slot gostaria de ter. Declarar tamanho maior que o arquivo faz
   * o otimizador do Next gerar um srcset acima da fonte e **ampliar** — ampliar
   * não cria detalhe, só peso e borrão. As sete variam de 720 a 1200 de largura
   * (teto do Pinterest, de onde vieram), e é por isso que cada uma precisa do
   * seu número. Ver `DEC-035`.
   *
   * `alt` descreve o que aparece — nunca afirma que é obra da Munarim.
   */
  imagem?: { src: string; largura: number; altura: number; alt: string };
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
    imagem: {
      src: "/media/escadas/reta/ref-reta-hero.avif",
      largura: 1200,
      altura: 800,
      alt: "Escada reta de concreto em lance único contínuo, encostada em parede de concreto aparente, com guarda-corpo de vidro",
    },
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
    imagem: {
      src: "/media/escadas/caracol/ref-caracol-hero.avif",
      largura: 720,
      altura: 480,
      alt: "Escada caracol de concreto girando em torno de um eixo central, com degraus em cunha e corrimão de inox",
    },
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
    imagem: {
      src: "/media/escadas/leke/ref-leke-hero.avif",
      largura: 1170,
      altura: 780,
      alt: "Degraus de concreto em balanço, engastados na parede, sem viga aparente sob o lance, com corrimão de inox",
    },
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
    imagem: {
      src: "/media/escadas/mista/ref-mista-hero.avif",
      largura: 1080,
      altura: 720,
      alt: "Escada com dois lances e um patamar de descanso entre eles, mudando de direção no meio da subida",
    },
  },
  {
    slug: "premium",
    nome: "Premium",
    resumo:
      "Linha de acabamento superior. [CNT-009 — a empresa precisa definir o que caracteriza a linha]",
    destaque: "Acabamento superior",
    quandoEscolher: [],
    quandoNaoEscolher: [],
    cotas: null,
    validado: false,
    imagem: {
      src: "/media/escadas/premium/ref-premium-hero.avif",
      largura: 736,
      altura: 491,
      /* A foto selecionada é de pedra polida, não de concreto polido — o `alt`
         descreve o que está na imagem, não o que a página gostaria que fosse.
         Registrada como insuficiente na coleta de 2026-08-06. */
      alt: "Escada de lance reto com degraus de pedra polida de alto brilho e corrimão metálico",
    },
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
    imagem: {
      src: "/media/escadas/espelho-fechado/ref-espelho-fechado-hero.avif",
      largura: 1024,
      altura: 683,
      /* Degrau de madeira sobre estrutura fechada — o tipo se lê, o material
         não é o do produto. Registrada como aceitável na coleta de 2026-08-06. */
      alt: "Escada com o contra-degrau fechado, sem vazado entre os degraus, formando um lance sólido",
    },
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
    imagem: {
      src: "/media/escadas/in-loco/ref-in-loco-hero.avif",
      largura: 1125,
      altura: 750,
      alt: "Lance de escada monolítico de concreto claro, moldado no local, destacado de uma parede de concreto escuro",
    },
  },
];

export const tipoSlugs = tipos.map((t) => t.slug);

export function getTipo(slug: string): Tipo | undefined {
  return tipos.find((t) => t.slug === slug);
}
