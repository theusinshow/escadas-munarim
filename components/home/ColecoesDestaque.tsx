import { ColecaoCard } from "@/components/galeria/ColecaoCard";
import { ColecaoIndice } from "@/components/galeria/ColecaoIndice";
import { GhostLink } from "@/components/ui/Button";
import { fotosDo, temReferencia } from "@/content/galeria";
import { tipos } from "@/content/tipos";

/**
 * A galeria na home: três coleções em card, o resto em índice (DEC-052).
 *
 * Recebe o catálogo inteiro e decide o recorte aqui. O índice continua de onde
 * os cards pararam, para nenhum tipo aparecer duas vezes na seção.
 *
 * O único número da seção é a contagem do acervo, e ela é real: sai das
 * próprias fotos. Enquanto o acervo for de referência, a contagem diz isso.
 */

const COM_FOTO = tipos.filter((t) => fotosDo(t.slug).length > 0);
const DESTAQUES = COM_FOTO.slice(0, 3);
const RESTANTES = COM_FOTO.slice(3);
const TOTAL = COM_FOTO.reduce((soma, t) => soma + fotosDo(t.slug).length, 0);

export function ColecoesDestaque() {
  if (COM_FOTO.length === 0) return null;

  return (
    <section aria-labelledby="colecoes-titulo" id="colecoes" className="py-24 lg:py-32">
      <div className="container-site">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <h2 id="colecoes-titulo" className="measure-display">
            Cada tipo, em fotos
          </h2>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="spec flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold tracking-[-0.02em] text-text normal-case">
                {String(TOTAL).padStart(2, "0")}
              </span>
              <span>{temReferencia ? "imagens de referência" : "fotos de obra"}</span>
            </p>
            <GhostLink href="/obras">Ver a galeria completa</GhostLink>
          </div>
        </header>

        <div className="mt-14 grid items-start gap-14 md:grid-cols-3 md:gap-6 lg:gap-8">
          {DESTAQUES.map((tipo, i) => (
            <ColecaoCard key={tipo.slug} tipo={tipo} indice={i + 1} degrau={i as 0 | 1 | 2} />
          ))}
        </div>

        {RESTANTES.length > 0 && (
          <div className="mt-20">
            <ColecaoIndice tipos={RESTANTES} inicio={DESTAQUES.length + 1} />
          </div>
        )}
      </div>
    </section>
  );
}
