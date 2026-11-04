import { LanceProcesso } from "@/components/motion/LanceProcesso";
import { GhostLink } from "@/components/ui/Button";
import { passos } from "@/content/processo";

/**
 * Processo em storyline compacta (DEC-051).
 *
 * A timeline anterior ocupava 1.300px com uma ilustração por etapa. Aqui as
 * quatro etapas sobem como um lance: cada uma é um degrau — piso em cima (a
 * linha do degrau), espelho à esquerda ligando ao degrau anterior. A altura
 * do espelho é o espelho do sistema (18 sobre piso 28, `DEC-010`), aplicada à
 * largura da coluna. A sequência aqui carrega informação de verdade (a ordem
 * em que as coisas acontecem), então a numeração fica.
 *
 * No celular a escada deita: lista vertical com a linha à esquerda.
 * O detalhe de cada etapa continua em `/como-funciona`.
 *
 * É a única seção navy antes do fechamento (DEC-060): quebra a sequência de
 * fundos claros e dá peso à etapa em que o cliente aprova o desenho.
 *
 * DEC-063: cada etapa é um bloco cheio até o chão da seção, então as quatro
 * juntas desenham a silhueta maciça de uma escada de concreto — não mais só
 * a linha. O número grande fica no piso de cada degrau.
 */
export function ProcessoLinha() {
  return (
    <section className="secao-escura py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="measure-display lg:col-span-6">Da medição à instalação</h2>
          <p className="measure text-lg text-muted lg:col-span-5 lg:col-start-8">
            Quatro etapas. Você aprova o desenho cotado antes de qualquer peça ser
            fabricada.
          </p>
        </div>

        <LanceProcesso>
        <ol className="processo-lance mt-14 lg:mt-20">
          {passos.map((p, i) => (
            <li key={p.step} className="processo-degrau" style={{ "--i": i } as React.CSSProperties}>
              <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-accent">
                <span className="sr-only">Etapa </span>
                {i + 1}
              </p>
              <h3 className="mt-6 text-xl lg:mt-10 lg:text-2xl">{p.titulo}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.resumo}</p>
            </li>
          ))}
        </ol>
        </LanceProcesso>

        <p className="mt-10">
          <GhostLink href="/como-funciona">Ver cada etapa em detalhe</GhostLink>
        </p>
      </div>
    </section>
  );
}
