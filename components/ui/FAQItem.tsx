/**
 * Pergunta do FAQ em `<details>` nativo.
 *
 * Nativo de propósito: funciona sem JS, é acessível por padrão e o navegador
 * já cuida do estado. Nenhum acordeão reimplementado.
 */
export function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-medium marker:content-none">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </summary>
      <div className="measure pb-6 text-muted">{children}</div>
    </details>
  );
}
