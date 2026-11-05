import Image from "next/image";
import fotoDupla from "@/public/media/capa/capa-escada-dupla.jpg";
import fotoCaracol from "@/public/media/capa/stock-capa-caracol.jpg";
import fotoFlutuante from "@/public/media/capa/stock-capa-flutuante.jpg";
import fotoPerfil from "@/public/media/capa/stock-capa-perfil.jpg";

/**
 * Capa da home (DEC-064 → DEC-067 → DEC-086 → DEC-088).
 *
 * Estrutura da referência: foto de ponta a ponta, título em caixa alta no pé à
 * esquerda, sem linha de apoio (DEC-083). Sem o selo dos 15
 * anos (DEC-074) e sem o "role para explorar" (DEC-075). O título sobe linha a linha
 * na entrada (`.sobe-linha`).
 *
 * Quatro fotos que se alternam num fade lento, com um zoom leve contínuo — só
 * CSS (`.capa-slide` em globals.css), sem JS. Com `reduce`, fica só a
 * primeira, parada.
 *
 * A escada dupla é a iL02 do site antigo, publicada lá como obra da empresa
 * (docs/ai/SITE_ANTIGO.md). As outras três são placeholders de banco de
 * imagem (Pexels 6444266, 5826451 e 259830, licença Pexels), escolhidas pelo
 * mesmo tom claro e frio — não são obras da Munarim (CNT-003) e saem quando
 * chegarem fotos reais. Nenhuma leva legenda factual. Sem orçamento aqui: a
 * prova vem abaixo (DEC-001).
 */

const linha = (l: number) => ({ "--l": l }) as React.CSSProperties;

const FOTOS = [
  {
    src: fotoDupla,
    alt: "Escada dupla em curva, de degraus brancos, subindo em dois lances simétricos até um mezanino iluminado por claraboia.",
    posicao: "object-[50%_60%]",
  },
  {
    src: fotoFlutuante,
    alt: "Escada de degraus brancos em balanço, presos à parede, numa sala de estar em tons de cinza.",
    posicao: "object-[30%_50%]",
  },
  {
    src: fotoCaracol,
    alt: "Escada caracol branca vista de baixo, com corrimão de ferro trabalhado subindo em espiral.",
    posicao: "object-[60%_50%]",
  },
  {
    src: fotoPerfil,
    alt: "Perfil de uma escada branca subindo rente a uma parede de tijolo aparente.",
    posicao: "object-[70%_50%]",
  },
];

export function CapaFoto() {
  return (
    <section
      aria-labelledby="capa-titulo"
      className="relative h-[calc(100svh-var(--barra-h))] min-h-[38rem] overflow-hidden bg-barra text-primary-fg"
    >
      {FOTOS.map((f, i) => (
        <div key={f.alt} className="capa-slide absolute inset-0" data-slide={i} aria-hidden={i > 0}>
          <Image
            src={f.src}
            alt={i === 0 ? f.alt : ""}
            fill
            priority={i === 0}
            quality={85}
            sizes="100vw"
            placeholder="blur"
            className={`capa-zoom object-cover ${f.posicao} contrast-[1.06] saturate-[0.92]`}
          />
        </div>
      ))}
      {/* Sem véu sobre a foto inteira (DEC-074): ele lavava a imagem de azul
          acinzentado. O escuro é neutro e fica só onde há texto: o pé e a
          esquerda, para o título. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(8_10_14/0.82)_0%,rgb(8_10_14/0.55)_28%,rgb(8_10_14/0.12)_55%,transparent_72%),linear-gradient(to_right,rgb(8_10_14/0.42)_0%,rgb(8_10_14/0.12)_45%,transparent_65%)]"
      />

      <div className="container-site relative flex h-full flex-col justify-end pb-10 lg:pb-14">
        <h1
          id="capa-titulo"
          className="max-w-[16ch] text-[clamp(2rem,4.2vw,4rem)] leading-[0.95] tracking-[-0.01em]"
        >
          <span className="sobe-linha">
            <span style={linha(0)}>Escadas de</span>
          </span>
          <span className="sobe-linha">
            <span style={linha(1)}>concreto</span>
          </span>
          <span className="sobe-linha">
            <span style={linha(2)}>sob medida</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
