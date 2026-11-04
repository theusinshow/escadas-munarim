/**
 * As três perguntas que decidem o tipo de escada.
 *
 * Usadas no card "Não sei qual é o meu caso" do grid e respondidas em
 * `/escadas#nao-sei`. Uma fonte só, para as duas não divergirem.
 */
export const perguntasQueDefinem = [
  {
    q: "Quanto espaço você tem?",
    a: "Um lance reto precisa de comprimento proporcional à altura. Se o espaço é curto, o caracol ou a escada mista resolvem o mesmo desnível ocupando menos.",
  },
  {
    q: "É a escada principal da casa?",
    a: "Escada usada muitas vezes por dia pede subida confortável e largura generosa. Para acesso secundário — sótão, mezanino, terraço — dá para abrir mão disso.",
  },
  {
    q: "Quem vai usar?",
    a: "Criança pequena, pessoa idosa ou com mobilidade reduzida mudam a conta: degrau vazado e giro apertado deixam de ser opção.",
  },
];
