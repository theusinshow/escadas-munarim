import Link from "next/link";
import { Foto } from "@/components/media/Foto";
import { fotosIntercaladas } from "@/content/galeria";
import { getTipo, tipoSlugs } from "@/content/tipos";

/**
 * Acervo — densidade visual, sem texto em cima (DEC-052).
 *
 * Substitui a faixa horizontal fixada no scroll (DEC-048). Colunas em
 * alvenaria, cada foto na proporção do próprio arquivo. A única legenda é o
 * tipo, a única que `MEDIA_PLAN.md` permite em imagem que não é obra, e ela
 * fica para o leitor de tela e para o link — a seção é para olhar.
 *
 * Sem as capas (já estão na rotação da capa e nos cards) e duas por tipo:
 * a seção mostra o que ainda não apareceu. Abaixo de quatro fotos não
 * renderiza — repetir foto para encher o grid canibalizaria a galeria.
 */

const FOTOS = fotosIntercaladas(tipoSlugs, { inicio: 1, porTipo: 2 });

export function Acervo() {
  if (FOTOS.length < 4) return null;

  return (
    <section aria-labelledby="acervo-titulo" className="bg-shade py-24 lg:py-28">
      <div className="container-site">
        <h2 id="acervo-titulo" className="rotulo text-muted">
          Acervo
        </h2>
        <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:gap-6">
          {FOTOS.map((foto) => {
            const tipo = getTipo(foto.slug);
            return (
              <li key={foto.src} className="mb-3 break-inside-avoid lg:mb-6">
                <Link
                  href={`/escadas/${foto.slug}`}
                  aria-label={`Escada ${tipo?.nome.toLowerCase()} — ver o tipo`}
                  className="group block overflow-hidden"
                >
                  <Foto
                    foto={foto}
                    sizes="(min-width: 768px) 31vw, 50vw"
                    imgClassName="transition-transform duration-700 ease-degrau group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
