import { Foto } from "@/components/media/Foto";
import { RevelaDegrau } from "@/components/motion/RevelaDegrau";
import { StepIn } from "@/components/motion/StepIn";
import { GhostLink } from "@/components/ui/Button";
import { fotosDo } from "@/content/galeria";

/**
 * O que é uma escada pré-moldada (DEC-051).
 *
 * O bloco antigo eram três parágrafos corridos ao lado de um título. O conteúdo
 * era bom e estava escondido: a comparação com a escada concretada no local e
 * as três palavras de orçamento. Agora cada coisa tem a forma do que ela é —
 * comparação vira tabela de duas colunas, vocabulário vira glossário.
 *
 * Nenhum dado novo: as linhas da tabela são as três diferenças que o texto
 * antigo já declarava (tempo de obra parada, sujeira, acabamento). Sem prazo
 * em dias, sem número — isso é CNT-005.
 *
 * DEC-063: foto e tabela lado a lado; o glossário desce para uma faixa
 * própria. O lead saiu — o título e a tabela já dizem o que é.
 */

const COMPARACAO = [
  {
    aspecto: "Onde a escada é feita",
    pre: "Fora da obra, em fôrma",
    local: "Dentro da sua obra",
  },
  {
    aspecto: "Obra parada",
    pre: "A peça chega curada e pronta",
    local: "Espera a cura do concreto no lugar",
  },
  {
    aspecto: "Sujeira em casa",
    pre: "Fôrma e concretagem ficam fora da obra",
    local: "Fôrma, escoramento e concreto dentro de casa",
  },
  {
    aspecto: "Acabamento",
    pre: "Concreto polido, direto da fôrma",
    local: "Depende de reboco por cima",
  },
];

const GLOSSARIO = [
  {
    termo: "Vão",
    definicao: "A abertura na laje por onde a escada passa.",
  },
  {
    termo: "Pé-direito",
    definicao:
      "A altura do piso de baixo até o piso de cima. É ele que define quantos degraus a escada vai ter.",
  },
  {
    termo: "Espelho e piso",
    definicao:
      "A altura e a profundidade de cada degrau. A relação entre os dois decide se a subida é confortável ou cansativa.",
  },
];

/** A 4ª reta: as outras já aparecem na capa e no grid. */
const FOTO = fotosDo("reta")[3];

export function PreMoldada() {
  return (
    <section className="border-t border-border bg-shade py-24 lg:py-36">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {FOTO && (
            <RevelaDegrau className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
              <Foto foto={FOTO} fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </RevelaDegrau>
          )}

          <div
            className={`flex min-w-0 flex-col justify-center ${
              FOTO ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-12"
            }`}
          >
            <h2 className="measure-display">O que é uma escada pré-moldada</h2>

            {/* Tabela de verdade: o leitor compara linha a linha. */}
            <table className="mt-10 w-full border-collapse text-left text-[0.95rem] sm:text-base lg:mt-14">
              <caption className="sr-only">
                Escada pré-moldada comparada à escada concretada no local
              </caption>
              <thead>
                <tr className="border-b border-text">
                  <th scope="col" className="w-[30%] py-3 pr-4">
                    <span className="sr-only">Aspecto</span>
                  </th>
                  <th scope="col" className="py-3 pr-4 font-display text-base font-normal sm:text-lg">
                    Pré-moldada
                  </th>
                  <th scope="col" className="py-3 font-display text-base font-normal text-muted sm:text-lg">
                    No local
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARACAO.map((linha) => (
                  <tr key={linha.aspecto} className="border-b border-text/15 align-top">
                    <th scope="row" className="py-4 pr-4 text-sm font-semibold">
                      {linha.aspecto}
                    </th>
                    <td className="py-4 pr-4">{linha.pre}</td>
                    <td className="py-4 text-muted">{linha.local}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Glossário em faixa própria: título à esquerda, os três termos em
            colunas iguais à direita, tudo sobre o mesmo fio. */}
        <div className="mt-20 grid gap-10 border-t border-text pt-10 lg:mt-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-[1.35rem] leading-tight">Três palavras de todo orçamento</h3>
            <p className="mt-6">
              <GhostLink href="/duvidas">Ver as dúvidas mais comuns</GhostLink>
            </p>
          </div>
          <StepIn className="lg:col-span-8" selector="dl > div">
            <dl className="grid gap-10 sm:grid-cols-3">
              {GLOSSARIO.map((g) => (
                <div key={g.termo}>
                  <dt className="font-display text-xl">{g.termo}</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-muted">{g.definicao}</dd>
                </div>
              ))}
            </dl>
          </StepIn>
        </div>
      </div>
    </section>
  );
}
