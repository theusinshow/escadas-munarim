import { GhostLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * A empresa (DEC-051).
 *
 * A Munarim tem uma prova social real — 15 anos — e nenhuma outra (sem
 * depoimento, sem logo de cliente, sem certificação). O bloco antigo diluía
 * isso em dois parágrafos. Agora é estrutura: o número em destaque como fato,
 * e embaixo três coisas que a empresa declara, cada uma com a forma dela —
 * o conjunto entregue, os valores, o endereço onde ela existe.
 *
 * Tudo aqui é fato declarado pela empresa (`CLAUDE.md`, `DEC-017`): fabrica a
 * escada; projeto, revestimento e corrimão entram por parceria.
 */

const CONJUNTO = ["Projeto", "Escada", "Revestimento", "Corrimão"];
const VALORES = ["Comprometimento", "Credibilidade", "Transparência", "Cumprimento de prazo"];
const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`,
)}`;

export function EmpresaBloco() {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="measure-display lg:col-span-7">
            {site.yearsInMarket} anos fabricando escadas de concreto em{" "}
            {site.address.city}.
          </h2>
          <div className="measure text-muted lg:col-span-5">
            <p>
              A Munarim fabrica escadas pré-moldadas em concreto polido, sob medida, e
              atende a Grande Florianópolis.
            </p>
            <p className="mt-4">
              <GhostLink href="/empresa">Conhecer a empresa</GhostLink>
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-t border-text lg:grid-cols-3">
          <div className="border-b border-border py-8 lg:border-r lg:border-b-0 lg:pr-10">
            <h3 className="text-xl">O conjunto completo</h3>
            <p className="mt-2 text-sm text-muted">
              Para entregar as quatro partes, a Munarim trabalha em parceria com
              outras empresas.
            </p>
            <ol className="mt-6 flex flex-wrap gap-2">
              {CONJUNTO.map((item) => (
                <li
                  key={item}
                  className={`border px-3 py-1.5 text-sm font-semibold ${
                    item === "Escada"
                      ? "border-text bg-text text-primary-fg"
                      : "border-text/30"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div className="border-b border-border py-8 lg:border-r lg:border-b-0 lg:px-10">
            <h3 className="text-xl">O que a empresa declara</h3>
            <ul className="mt-6 space-y-2">
              {VALORES.map((v) => (
                <li key={v} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-2px] bg-accent" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="py-8 lg:pl-10">
            <h3 className="text-xl">Onde estamos</h3>
            <address className="mt-6 not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city} — {site.address.state}
            </address>
            <p className="mt-2">
              <a href={site.contact.phoneHref} className="text-link underline-offset-4 hover:underline">
                {site.contact.phone}
              </a>
            </p>
            <p className="mt-2">
              <GhostLink href={MAPA} target="_blank" rel="noopener noreferrer">
                Abrir no mapa
              </GhostLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
