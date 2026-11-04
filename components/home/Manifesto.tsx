import { Foto } from "@/components/media/Foto";
import { FaixaFatos } from "@/components/ui/FaixaFatos";
import { fotosDo } from "@/content/galeria";
import { site } from "@/lib/site";

/**
 * Posicionamento logo depois da capa (DEC-059 → DEC-060).
 *
 * Frase de abertura, os três números da empresa (`FaixaFatos`) e uma foto
 * vertical — a abertura editorial de um site institucional.
 */

const FOTO = fotosDo("premium")[1] ?? fotosDo("premium")[0];

export function Manifesto() {
  return (
    <section aria-label="Quem é a Munarim" className="bg-bg py-24 lg:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-between gap-16 lg:col-span-7">
          <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.3] font-light tracking-[-0.01em]">
            Há {site.yearsInMarket} anos a Munarim fabrica escada de concreto em{" "}
            {site.address.city}.{" "}
            <span className="text-muted">
              Cada uma é medida no seu vão — a abertura na laje por onde a escada
              passa —, moldada em fôrma e polida antes de chegar.
            </span>
          </p>

          <FaixaFatos />
        </div>

        {FOTO && (
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9">
            <Foto foto={FOTO} fill sizes="(min-width: 1024px) 34vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
