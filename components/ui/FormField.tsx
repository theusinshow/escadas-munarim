/**
 * Campo de formulário.
 *
 * Regras que este componente carrega (DESIGN_SYSTEM.md e QA_CHECKLIST.md):
 * `<label>` SEMPRE visível acima do campo — placeholder nunca substitui label;
 * erro associado por `aria-describedby`; mensagem de erro diz o que fazer, não
 * o que falhou. O público é leigo: a ajuda (`hint`) é onde o termo técnico é
 * traduzido.
 */

/* Foco e erro trocaram de cor (Sistema Visual v3). Antes os dois disputavam o
   azulão: o campo com erro usava a mesma cor do CTA, que é o oposto do que a
   cor deveria dizer. Agora foco é azulão + `--accent-wash`, erro é navy. O anel
   de 2px do foco já vem da regra global de `:focus-visible`. */
const CONTROL =
  "h-12 w-full rounded-(--radius) border bg-surface px-4 text-base " +
  "border-border focus:border-accent focus:bg-accent-wash " +
  "aria-[invalid=true]:border-primary";

export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    className: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
    required: boolean | undefined;
  }) => React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
        {required && (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}

      {children({
        id,
        className: CONTROL,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })}

      {error && (
        <p id={errorId} className="text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

/** Textarea usa a mesma moldura, com altura própria. */
export const TEXTAREA_CLASS = CONTROL.replace("h-12", "min-h-32 py-3");
