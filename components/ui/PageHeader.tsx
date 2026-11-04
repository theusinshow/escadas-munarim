import { Breadcrumb, type Crumb } from "./Breadcrumb";

/**
 * Abertura das páginas internas (DEC-061).
 *
 * O mesmo desenho dos cabeçalhos da home (DEC-060), um degrau acima: H1 em
 * escala de display nas colunas 1–7, o apoio nas 9–12, alinhados pela base, e
 * um fio fechando o bloco. `children` entra embaixo do apoio — é onde mora o
 * aviso de pendência (CNT) quando a página tem um.
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
    <section className="border-b border-border pt-10 pb-14 lg:pt-16 lg:pb-20">
      <div className="container-site">
        {trail && <Breadcrumb trail={trail} />}
        <div className="mt-14 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 className="type-display measure-display lg:col-span-7">{title}</h1>
          {(lead || children) && (
            <div className="lg:col-span-4 lg:col-start-9">
              {lead && <p className="measure text-lg leading-relaxed text-muted">{lead}</p>}
              {children && <div className={lead ? "mt-6" : ""}>{children}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
