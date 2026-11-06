import { Breadcrumb, type Crumb } from "./Breadcrumb";

/**
 * Abertura das páginas internas (DEC-061 → DEC-067).
 *
 * No idioma da referência: título enorme em caixa alta ocupando a largura, o
 * apoio embaixo à direita, tudo entrando do desfoque (`data-revela`).
 * `children` entra embaixo do apoio — é onde mora o aviso de pendência (CNT)
 * quando a página tem um. `compacto` (DEC-105) é a versão com título menor e
 * menos respiro, para a frase não tomar a primeira tela.
 */
export function PageHeader({
  title,
  lead,
  trail,
  children,
  compacto = false,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  trail?: Crumb[];
  children?: React.ReactNode;
  compacto?: boolean;
}) {
  return (
    <section
      className={`border-b border-border bg-surface pt-10 ${compacto ? "pb-12 lg:pb-16" : "pb-16 lg:pt-14 lg:pb-24"}`}
    >
      <div className="container-site">
        {trail && <Breadcrumb trail={trail} />}
        <h1
          data-revela
          className={
            compacto
              ? "mt-6 max-w-[26ch] text-[clamp(1.8rem,3.4vw,3.1rem)] leading-[1.2] text-barra lg:mt-10"
              : "mt-16 max-w-[20ch] text-[clamp(2.3rem,5.4vw,5rem)] leading-[1.02] text-barra lg:mt-28"
          }
        >
          {title}
        </h1>
        {(lead || children) && (
          <div data-revela className={`grid lg:grid-cols-12 ${compacto ? "mt-8 lg:mt-10" : "mt-12 lg:mt-16"}`}>
            <div className="lg:col-span-6 lg:col-start-7">
              {lead && <p className="measure text-lg leading-relaxed text-muted">{lead}</p>}
              {children && <div className={lead ? "mt-6" : ""}>{children}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
