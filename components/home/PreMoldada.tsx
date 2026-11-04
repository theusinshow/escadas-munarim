import { Foto } from "@/components/media/Foto";
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

/** A 2ª e a 3ª reta já estão na faixa de fotos; aqui entra a 4ª. */
const FOTO = fotosDo("reta")[3];

export function PreMoldada() {
  return (
    <section className="border-t border-border bg-shade py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-7">
            <h2 className="measure-display">O que é uma escada pré-moldada</h2>
            <p className="measure mt-5 text-xl leading-relaxed">
              Moldada antes: a escada é concretada em fôrma, curada e polida fora da
              obra, e chega pronta na sua casa.
            </p>
          </header>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {FOTO && (
            <div className="relative hidden aspect-[4/5] overflow-hidden lg:col-span-4 lg:block">
              <Foto foto={FOTO} fill sizes="(min-width: 1280px) 400px, 33vw" />
            </div>
          )}

          <div className={FOTO ? "lg:col-span-8" : "lg:col-span-12"}>
            {/* Tabela de verdade: o leitor compara linha a linha. */}
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Escada pré-moldada comparada à escada concretada no local
              </caption>
              <thead>
                <tr className="border-b-2 border-text">
                  <th scope="col" className="w-[30%] py-3 pr-4 text-sm font-semibold text-muted">
                    <span className="sr-only">Aspecto</span>
                  </th>
                  <th scope="col" className="py-3 pr-4 font-display text-lg font-bold">
                    Pré-moldada
                  </th>
                  <th scope="col" className="py-3 font-display text-lg font-bold text-muted">
                    Concretada no local
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

            <h3 className="mt-14 text-2xl">Três palavras de todo orçamento</h3>
            <dl className="mt-6 grid gap-8 sm:grid-cols-3">
              {GLOSSARIO.map((g) => (
                <div key={g.termo} className="border-t-2 border-accent pt-4">
                  <dt className="font-display text-lg font-bold">{g.termo}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{g.definicao}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8">
              <GhostLink href="/duvidas">Ver as dúvidas mais comuns</GhostLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
