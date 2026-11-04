import { StepIn } from "@/components/motion/StepIn";
import { GhostLink } from "@/components/ui/Button";

/**
 * Quem faz o quê (DEC-051 → DEC-063).
 *
 * A versão anterior tinha três colunas (conjunto, como trabalha, endereço) e
 * o desenvolvedor não entendeu o bloco. Agora ele responde uma pergunta só,
 * que é a dúvida real de quem compra: a Munarim faz o corrimão? O
 * revestimento? Não — faz a escada; o resto vem de parceiros. A resposta é
 * uma tabela de quatro linhas, com a linha da Munarim em navy.
 *
 * O endereço mora no rodapé; o "como trabalha" é a seção do processo.
 * Tudo aqui é fato declarado pela empresa (`CLAUDE.md`, `DEC-017`).
 */

const CONJUNTO = [
  { parte: "Projeto", quem: "Parceiro", munarim: false },
  { parte: "Escada de concreto", quem: "Munarim", munarim: true },
  { parte: "Revestimento", quem: "Parceiro", munarim: false },
  { parte: "Corrimão e guarda-corpo", quem: "Parceiro", munarim: false },
];

export function EmpresaBloco() {
  return (
    <section className="border-t border-border py-24 lg:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="measure-display">A Munarim faz a escada. O resto vem de parceiros.</h2>
          <p className="measure mt-6 text-lg leading-relaxed text-muted">
            Projeto, revestimento e corrimão ficam com empresas que fazem só isso. Você
            recebe o conjunto completo, e cada parte sai de quem domina aquela parte.
          </p>
          <p className="mt-8">
            <GhostLink href="/empresa">Conhecer a empresa</GhostLink>
          </p>
        </div>

        <StepIn className="lg:col-span-6 lg:col-start-7 lg:self-end" selector="li">
          <ol aria-label="Quem faz cada parte da escada" className="border-t border-text">
            {CONJUNTO.map((item) => (
              <li
                key={item.parte}
                className={`flex items-baseline justify-between gap-6 border-b px-5 py-6 lg:py-7 ${
                  item.munarim
                    ? "border-primary bg-primary text-primary-fg"
                    : "border-border"
                }`}
              >
                <span className="font-display text-lg lg:text-xl">{item.parte}</span>
                <span
                  className={`font-label text-[0.7rem] tracking-[0.14em] uppercase ${
                    item.munarim ? "text-primary-fg" : "text-muted"
                  }`}
                >
                  {item.quem}
                </span>
              </li>
            ))}
          </ol>
        </StepIn>
      </div>
    </section>
  );
}
