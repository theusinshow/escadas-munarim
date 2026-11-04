import { Container } from "./Container";

/**
 * Faixa de seção com as três densidades de `DESIGN_SYSTEM.md`.
 *
 * A densidade é escolha de intenção, não de acaso: uma seção densa faz a
 * esparsa seguinte funcionar. Padding vertical idêntico em todas as seções é
 * defeito documentado (U13), não consistência — por isso não existe default
 * silencioso aqui, `density` é sempre declarada na chamada.
 */

const PADDING = {
  /** 64 → 96px — blocos educativos, passos do processo, FAQ. */
  dense: "py-16 lg:py-24",
  /** 96 → 144px — grids e galerias (DEC-060). */
  default: "py-24 lg:py-36",
  /** 128 → 192px — prova, posicionamento, respiro depois de um bloco denso. */
  airy: "py-32 lg:py-48",
} as const;

export type Density = keyof typeof PADDING;

export function Section({
  density,
  children,
  className = "",
  bleed = false,
  ...rest
}: {
  density: Density;
  children: React.ReactNode;
  className?: string;
  /** Sem Container — para grids que sangram até a borda. */
  bleed?: boolean;
} & React.ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`${PADDING[density]} ${className}`} {...rest}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
