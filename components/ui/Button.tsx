import Link from "next/link";

/**
 * Botão em três variantes.
 *
 * Regras de `DESIGN_SYSTEM.md` que este componente carrega:
 * retangular com radius de 2px, altura 48px, sem sombra nunca, sem ícone
 * decorativo, sem seta. `primary` é o pedido de orçamento e aparece **uma vez
 * por tela** — quem chama é responsável por isso.
 *
 * O hover e o foco são o `stepIn` aplicado a um alvo de 48px (`DEC-038`): sete
 * lajes sobem da base em stagger e o preenchimento varre o botão como uma
 * escada. As cores, os tempos e a inversão sobre a faixa navy vivem em
 * `globals.css` — aqui só nascem as lajes. Sem estado e sem GSAP: o botão
 * continua Server Component e o motion não espera bundle.
 */

const BASE =
  "btn-degrau inline-flex h-12 items-center justify-center rounded-(--radius) px-6 " +
  "font-medium disabled:pointer-events-none disabled:opacity-40";

const VARIANT = {
  primary: "btn-degrau-primary",
  secondary: "btn-degrau-secondary",
  /** Cheio e claro, para fundo escuro, quando a ação não é o orçamento. */
  claro: "btn-degrau-claro",
} as const;

export type ButtonVariant = keyof typeof VARIANT;

/**
 * Os sete tipos de escada, um por laje. O número não é decorativo: é o mesmo 7
 * do catálogo, e é ele que divide a largura do botão.
 */
const DEGRAUS = 7;

/**
 * As lajes do preenchimento (DEC-038).
 *
 * Sobem da base em stagger no hover e no foco, desenhando uma escada que varre
 * o botão da esquerda para a direita; ao sair, descem na ordem inversa. São
 * `span` vazios e `aria-hidden` — não há nada aqui para um leitor de tela
 * anunciar, e o estado final do botão é legível sem nenhuma delas.
 *
 * Quem carrega os tempos é o CSS; daqui sai só o índice de cada laje.
 */
function Lajes() {
  return Array.from({ length: DEGRAUS }, (_, i) => (
    <span
      key={i}
      aria-hidden
      className="btn-degrau-laje"
      style={{ "--i": i } as React.CSSProperties}
    />
  ));
}

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
      <Lajes />
      <span className="btn-degrau-rotulo">{children}</span>
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
      <Lajes />
      <span className="btn-degrau-rotulo">{children}</span>
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
      className={`inline-flex min-h-11 items-center text-link underline decoration-1 underline-offset-4 hover:decoration-2 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
