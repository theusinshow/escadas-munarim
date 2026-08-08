import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Trilha para as rotas aninhadas.
 * O visitante precisa saber onde está dentro de um catálogo de 7 tipos.
 * Emite `BreadcrumbList` em JSON-LD a partir dos mesmos dados que mostra —
 * marcação e tela nunca divergem.
 */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };

  return (
    <>
      {/* flex com alvo de 44px: no celular, trilha em 17px é difícil de acertar. */}
      <nav
        aria-label="Trilha"
        className="spec flex flex-wrap items-center gap-x-1 text-muted"
      >
        {trail.map((c, i) => (
          <span key={c.label} className="inline-flex items-center gap-x-1">
            {i > 0 && <span aria-hidden="true">›</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="inline-flex min-h-11 items-center hover:underline"
              >
                {c.label}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center" aria-current="page">
                {c.label}
              </span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
