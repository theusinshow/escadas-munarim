import Link from "next/link";

/**
 * Botão em três variantes, na família chanfrada do site (DEC-067 → DEC-071).
 *
 * Retângulo chapado, rótulo em Michroma caixa alta, sem sombra, sem ícone; no
 * hover e no foco as duas pontas chanfram e o botão vira um degrau visto de
 * lado. `primary` é o pedido de orçamento e aparece **uma vez por tela** —
 * quem chama é responsável por isso. Cores e tempos vivem em `globals.css`.
 */

const BASE = "disabled:pointer-events-none disabled:opacity-40";

const VARIANT = {
  /** Grafite cheio; o hover vira navy. */
  primary: "btn-chanfro-escuro",
  /** Contorno de 1px; o hover enche. */
  secondary: "btn-chanfro-contorno",
  /** Concreto claro, para fundo escuro. */
  claro: "btn-chanfro",
} as const;

export type ButtonVariant = keyof typeof VARIANT;

type Common = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Common & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${BASE} ${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  href,
  ...rest
}: Common & React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={`${BASE} ${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Terceira variante: link de texto com sublinhado que engrossa no hover.
 * Não usa a base de botão — é texto, e fingir que é botão confunde o teclado.
 *
 * Neste projeto o GhostLink é sempre uma chamada solta, na própria linha —
 * nunca dentro de frase. Por isso carrega alvo de toque de 44px. Link dentro
 * de texto corrido usa `TextLink`, que é dispensado do alvo mínimo pela
 * exceção de link em linha (WCAG 2.2, 2.5.8).
 */
export function GhostLink({
  className = "",
  children,
  href,
  ...rest
}: { className?: string; children: React.ReactNode } & React.ComponentPropsWithoutRef<
  typeof Link
>) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center font-label text-[0.74rem] tracking-[0.14em] text-link uppercase underline decoration-1 underline-offset-[6px] hover:decoration-2 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
