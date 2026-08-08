import { ProcessIllustration } from "@/components/technical/ProcessIllustration";
import { passos } from "@/content/processo";

/**
 * Os 4 passos em timeline vertical, um por linha.
 *
 * A referência apresenta o processo como fases empilhadas com o número da etapa
 * marcado à esquerda — é melhor que o grid de quatro colunas que estava aqui:
 * processo é sequência, e sequência lê de cima para baixo, não da esquerda para
 * a direita em quatro cartões do mesmo tamanho.
 *
 * O que **não** vem junto: a referência rotula cada fase com prazo ("semana
 * 1–2"). Prazo da Munarim é `CNT-005`, pendente. Sem semana, sem estimativa,
 * sem "em média". A linha do tempo mostra ordem, não duração.
 *
 * O desenho técnico continua sendo o conteúdo (`DEC-009`): a ilustração de cada
 * etapa fica na coluna da direita, no mesmo peso de traço das outras.
 */
export function ProcessoTimeline() {
  return (
    <ol className="border-t border-border">
      {passos.map((passo) => (
        <li
          key={passo.step}
          className="grid gap-x-6 gap-y-6 border-b border-border py-10 lg:grid-cols-12 lg:py-12"
        >
          {/* Número da etapa — mesma marcação de índice das seções. */}
          <p aria-hidden="true" className="spec text-accent lg:col-span-2">
            /{passo.numero}
          </p>

          <div className="lg:col-span-6">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
              {passo.titulo}
            </h3>
            <p className="measure mt-3 text-muted">{passo.resumo}</p>
            {passo.pendente && (
              <p className="spec mt-5 border-l-2 border-accent pl-4 text-muted">
                {passo.pendente}
              </p>
            )}
          </div>

          <div className="lg:col-span-4">
            <ProcessIllustration
              step={passo.step}
              className="h-28 w-full lg:h-32"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
