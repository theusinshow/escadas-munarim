import Link from "next/link";

/**
 * Link no corpo do texto: sublinhado permanente.
 * Nunca link sem affordance visual além da cor.
 */
export function TextLink({
  href,
  children,
  className = "",
  external = false,
  alvo = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  /** Link solto (lista de contato, item próprio): recebe alvo de toque de 44px.
      Dentro de frase, deixe falso — a WCAG 2.2 dispensa link em linha. */
  alvo?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href">) {
  const style = `text-link underline decoration-1 underline-offset-4 hover:decoration-2 ${
    alvo ? "inline-flex min-h-11 items-center" : ""
  } ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={style}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={style} {...rest}>
      {children}
    </Link>
  );
}
