import { Foto } from "@/components/media/Foto";
import { RevelaDegrau } from "@/components/motion/RevelaDegrau";
import { fotosDo } from "@/content/galeria";
import { site } from "@/lib/site";

/**
 * Posicionamento logo depois da capa (DEC-059 → DEC-063).
 *
 * Composição editorial em duas fotos desencontradas: a grande à esquerda, a
 * pequena descendo um lance à direita, com o texto de apoio entre elas. A
 * frase de abertura atravessa as duas em corpo de manchete.
 *
 * A faixa de números (15 · 07 · 04) saiu: número grande com rótulo pequeno é
 * o template de métrica de landing page (DEC-063). Os 15 anos ficam na
 * frase, que é onde eles provam alguma coisa.
 */

const GRANDE = fotosDo("premium")[1] ?? fotosDo("premium")[0];
const PEQUENA = fotosDo("leke")[1] ?? fotosDo("leke")[0];

export function Manifesto() {
  return (
    <section aria-label="Quem é a Munarim" className="overflow-x-clip bg-bg py-24 lg:py-40">
      <div className="container-site">
        <p className="max-w-[22ch] text-[clamp(1.85rem,4.2vw,3.6rem)] leading-[1.12] font-light tracking-[-0.02em]">
          Há {site.yearsInMarket} anos fabricando escada de concreto em{" "}
          {site.address.city}.
        </p>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {GRANDE && (
            <RevelaDegrau className="relative aspect-[4/5] overflow-hidden lg:col-span-6">
              <Foto foto={GRANDE} fill sizes="(min-width: 1024px) 50vw, 100vw" />
            </RevelaDegrau>
          )}

          <div className="flex flex-col gap-12 lg:col-span-5 lg:col-start-8 lg:pt-32">
            <div className="measure space-y-5 text-lg leading-relaxed text-muted">
              <p>
                <span className="text-text">Cada escada é medida no seu vão</span> — a
                abertura na laje por onde ela passa —, moldada em fôrma e polida antes
                de chegar à obra.
              </p>
              <p>
                A Munarim faz uma coisa só, a escada de concreto, e faz sob medida para
                casas da Grande Florianópolis.
              </p>
            </div>

            {PEQUENA && (
              <RevelaDegrau className="relative aspect-[3/4] w-3/4 self-end overflow-hidden lg:w-4/5">
                <Foto foto={PEQUENA} fill sizes="(min-width: 1024px) 30vw, 75vw" />
              </RevelaDegrau>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
