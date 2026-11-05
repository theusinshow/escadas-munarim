import { EspiralFotos } from "@/components/motion/EspiralFotos";
import { Preenche } from "@/components/motion/Preenche";
import { fotosIntercaladas } from "@/content/galeria";
import { tipos } from "@/content/tipos";

/**
 * O lema que se preenche com a rolagem (DEC-067): o título da referência que
 * acende linha a linha, aqui com a tagline da empresa. Fundo chumbo (DEC-075),
 * mais baixa e com o lema menor desde o DEC-083.
 *
 * DEC-088: à direita, as fotos do acervo sobem numa hélice — uma escada
 * caracol feita de fotos — que gira sozinha e anda com a rolagem.
 */

const FOTOS = fotosIntercaladas(
  tipos.map((t) => t.slug),
  { porTipo: 2 },
).slice(0, 14);

export function LemaBloco() {
  return (
    <section className="overflow-hidden bg-chumbo py-20 text-primary-fg lg:py-28">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Preenche
            linhas={["Segurança e design;", "sob medida para", "o seu vão."]}
            className="text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.02]"
          />
          <p
            data-revela
            className="mt-10 max-w-[46ch] text-[1.05rem] leading-relaxed text-primary-fg-muted lg:mt-14"
          >
            O que decide o tipo de escada não é o gosto. É o espaço que você tem, o pé-direito —
            a altura do piso de baixo até o piso de cima — e quantas vezes por dia a escada vai
            ser usada.
          </p>
        </div>
        <EspiralFotos fotos={FOTOS} className="h-[26rem] lg:col-span-5 lg:h-[36rem]" />
      </div>
    </section>
  );
}
