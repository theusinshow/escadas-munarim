import { Breadcrumb, type Crumb } from "./Breadcrumb";

/**
 * Abertura das páginas internas (DEC-061 → DEC-067).
 *
 * No idioma da referência: título enorme em caixa alta ocupando a largura, o
 * apoio embaixo à direita, tudo entrando do desfoque (`data-revela`).
 * `children` entra embaixo do apoio — é onde mora o aviso de pendência (CNT)
 * quando a página tem um.
 */
export function PageHeader({
  title,
  lead,
  trail,
  children,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  trail?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface pt-10 pb-16 lg:pt-14 lg:pb-24">
      <div className="container-site">
        {trail && <Breadcrumb trail={trail} />}
        <h1
          data-revela
          className="mt-16 max-w-[20ch] text-[clamp(2.3rem,5.4vw,5rem)] leading-[1.02] text-barra lg:mt-28"
        >
          {title}
        </h1>
        {(lead || children) && (
          <div data-revela className="mt-12 grid lg:mt-16 lg:grid-cols-12">
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
