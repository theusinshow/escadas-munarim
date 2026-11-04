import { ButtonLink } from "./Button";

/**
 * Faixa navy de fechamento das páginas internas (DEC-061).
 *
 * Sempre a última peça antes do rodapé, depois da prova da página (DEC-001).
 * Mesma `secao-escura` do processo da home e o mesmo botão claro do
 * `Fechamento` — o pedido de orçamento tem uma cara só no site inteiro.
 * O fio de baixo separa a faixa do rodapé, que também é navy.
 */
export function FaixaCta({
  title,
  text,
  href = "/orcamento",
  label = "Pedir orçamento",
}: {
  title: React.ReactNode;
  text?: React.ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <section className="secao-escura sobre-escuro border-b border-white/15 py-24 lg:py-36">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="measure-display">{title}</h2>
          {text && <p className="measure mt-5 text-lg text-muted">{text}</p>}
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
          <ButtonLink href={href} variant="claro">
            {label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
