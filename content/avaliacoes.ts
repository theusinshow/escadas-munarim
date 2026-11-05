/**
 * Avaliações de clientes (DEC-073 · CNT-015).
 *
 * Só entra aqui avaliação **real**, copiada do Perfil da Empresa no Google da
 * Munarim, com o nome como aparece lá. Nada é escrito, resumido ou "melhorado"
 * — depoimento inventado é prova fabricada. Enquanto a lista estiver vazia, a
 * seção mostra as vagas marcadas com a pendência, nunca um texto verossímil.
 */

export type Avaliacao = {
  /** Nome como aparece no Google. */
  nome: string;
  /** Quando, como o Google mostra ("há 2 meses"). */
  quando: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** O texto literal da avaliação. */
  texto: string;
  /** Link da avaliação ou do perfil, quando houver. */
  link?: string;
};

/** Perfil da Munarim no Google Maps. */
export const PERFIL_GOOGLE = "https://www.google.com/maps?ftid=0x952735ea5bdd41d9:0x59a1e02c9043ff8";

/**
 * Nota e total como o perfil mostrava em 2026-11-05. Atualização manual
 * (CNT-015): conferir no perfil antes de publicar.
 */
export const RESUMO_GOOGLE = { nota: "4,9", total: 68, conferido: "2026-11-05" };

/**
 * Copiadas do perfil em 2026-11-05, texto literal (com os erros de digitação
 * de quem escreveu). O "quando" é o daquele dia e envelhece — atualizar junto
 * com a nota. Uma avaliação 5 estrelas ficou de fora de propósito: ela cita
 * uma concorrente pelo nome, e isso não vai para o site da Munarim.
 */
export const avaliacoes: Avaliacao[] = [
  {
    nome: "Josiane Facchi",
    quando: "há 4 meses",
    nota: 5,
    texto:
      "A empresa em geral são muitos antiociosos. A escada é linda! O vendedor Dione é muito educado e sempre que precisei tirar dúvidas me respondia prontamente. A equipe de montagem muito organizada, com serviço limpo e educados. O prazo da montagem em dia. Recomendo e nota 10 para todos.",
  },
  {
    nome: "Bianca Pereira Carminatti",
    quando: "há 6 meses",
    nota: 5,
    texto:
      "Cliente: Denir Pereira\nA empresa me passou muita confiança do início ao fim, respeitando os prazos, prezando sempre pela qualidade e com uma equipe muito dedicada.\nRecomendarei sempre que possível.\nGostaria de agradecer pelo atendimento do Dione e pelo trabalho executado do Rodrigo. Profissionais excelentes!\nMinha escada ficou maravilhosa!",
  },
  {
    nome: "Yan Chagas",
    quando: "há 3 semanas",
    nota: 5,
    texto:
      "Ótima empresa comprometida com os clientes agradecendo também ao funcionário Lucas que veio dar um suporte em um detalhe na escada e esclareceu todas a duvidas",
  },
  {
    nome: "Marcio Ramalho Leite",
    quando: "há 5 meses",
    nota: 5,
    texto:
      "Estou extremamente satisfeito com o serviço, ótima qualidade! Excelente profissionalismo de todos os envolvidos!",
  },
];
