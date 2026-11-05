"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tipos } from "@/content/tipos";

/**
 * O botão de orçamento do rodapé (DEC-091). Numa página de tipo, o formulário
 * já abre com aquele tipo marcado — o que a faixa azul das internas fazia
 * antes de sair. Na própria página do formulário, o botão não aparece.
 */
export function LinkOrcamento({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  if (pathname === "/orcamento") return null;
  const slug = pathname.match(/^\/escadas\/([^/]+)/)?.[1];
  const href = slug && tipos.some((t) => t.slug === slug) ? `/orcamento?tipo=${slug}` : "/orcamento";
  return (
    <Link href={href} className={className}>
      Pedir orçamento
    </Link>
  );
}
