import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/**
 * Faixa de números logo abaixo da capa.
 *
 * A referência traz aqui um contador animado de projetos entregues, prêmios e
 * satisfação de cliente. **Nenhum dos quatro existe como fato verificado** — e
 * número sem fonte é proibição explícita do projeto. Então a faixa só carrega o
 * que a empresa efetivamente declara, e o que o próprio site é: 15 anos de
 * mercado, 7 tipos publicados, 4 etapas e a região atendida.
 *
 * **Não anima.** `DESIGN.md` proíbe contador — número que sobe é performance de
 * número, não informação. Os quatro entram estáticos.
 *
 * Os pesos não são iguais: o primeiro dado ocupa metade da faixa e sobe de
 * corpo. Faixa de quatro células idênticas é o tratamento uniforme que o
 * sistema recusa fora dos dois grids em que a uniformidade é o conteúdo.
 */

const MENORES = [
  { valor: "07", label: "tipos, com desenho e medidas abertos" },
  { valor: "04", label: "etapas, da medição à instalação" },
  { valor: "SC", label: "São José e a Grande Florianópolis" },
];

export function FaixaFatos() {
  return (
    <section
      aria-label="A empresa em números"
      className="bg-primary text-primary-fg"
    >
      <Container>
        {/* `dl` com `dd` antes de `dt` seria marcação inválida, e o valor precisa
            vir antes do rótulo na tela. Então é lista simples: a relação entre
            número e rótulo já é visual e de proximidade. */}
        <ul className="grid gap-x-6 gap-y-10 py-14 lg:grid-cols-12">
          <li className="lg:col-span-6">
            <p className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.86] font-semibold tracking-[-0.035em] tabular-nums">
              {site.yearsInMarket}
            </p>
            <p className="mt-4 max-w-[26ch] text-lg text-primary-fg-muted">
              anos fabricando escada pré-moldada de concreto polido em São José
            </p>
          </li>

          <li className="lg:col-span-6 lg:self-end">
            <ul className="grid gap-8 sm:grid-cols-3">
              {MENORES.map((f) => (
                <li key={f.valor} className="border-t border-primary-fg/25 pt-4">
                  <p className="font-display text-3xl font-semibold tracking-tight tabular-nums">
                    {f.valor}
                  </p>
                  <p className="spec mt-2 text-primary-fg-muted">{f.label}</p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Container>
    </section>
  );
}
