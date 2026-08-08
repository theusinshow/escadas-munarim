"use client";

/**
 * Chip de filtro (usado em /obras).
 * Retangular, sem pílula arredondada. Estado por `aria-pressed`, não só por cor.
 */
export function Chip({
  active = false,
  children,
  ...rest
}: {
  active?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center rounded-(--radius) border px-4 text-sm transition-colors duration-120 ${
        active
          ? "border-primary bg-primary text-primary-fg"
          : "border-border text-muted hover:border-primary hover:text-text"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
