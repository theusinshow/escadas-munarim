/**
 * Construtoras e empreendimentos que aparecem como clientes na página "Nossa
 * Empresa" do site anterior, sob "Você, nosso cliente, é o nosso maior
 * patrimônio!". Exibição liberada pelo desenvolvedor em 2026-11-05 (DEC-096).
 *
 * Os arquivos foram tirados de lá e passados para uma cor só, o azul da marca,
 * sem fundo — sete logos coloridos lado a lado brigariam com as fotos. Largura
 * e altura são os pixels reais do PNG.
 */
export type Cliente = { nome: string; src: string; largura: number; altura: number };

export const clientes: Cliente[] = [
  { nome: "Procave", src: "/media/empresa/clientes/logo-procave.png", largura: 556, altura: 160 },
  { nome: "RDO", src: "/media/empresa/clientes/logo-rdo.png", largura: 501, altura: 135 },
  { nome: "OK Construções", src: "/media/empresa/clientes/logo-ok-construcoes.png", largura: 301, altura: 139 },
  { nome: "Vitalle Construtora e Incorporadora", src: "/media/empresa/clientes/logo-vitalle.png", largura: 183, altura: 151 },
  { nome: "Silva Packer Construtora e Incorporadora", src: "/media/empresa/clientes/logo-silva-packer.png", largura: 75, altura: 148 },
  { nome: "Jardim Continental Comercial Center", src: "/media/empresa/clientes/logo-jardim-continental.png", largura: 245, altura: 160 },
  { nome: "AVS Construções", src: "/media/empresa/clientes/logo-avs-construcoes.png", largura: 245, altura: 29 },
];

/**
 * Altura de exibição em rem para que todos os logos tenham mais ou menos a
 * mesma área: igualar a altura deixaria o AVS (8:1) enorme e o Silva Packer
 * (1:2) um palito.
 */
export function alturaDoLogo(c: Cliente, area = 26) {
  const proporcao = c.largura / c.altura;
  return Math.min(4.4, Math.sqrt(area / proporcao));
}
