import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tipos } from "@/content/tipos";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    { path: "", priority: 1 },
    { path: "/escadas", priority: 0.9 },
    { path: "/obras", priority: 0.7 },
    { path: "/como-funciona", priority: 0.8 },
    { path: "/duvidas", priority: 0.7 },
    { path: "/empresa", priority: 0.6 },
    { path: "/orcamento", priority: 0.9 },
  ];

  return [
    ...rotas.map((r) => ({
      url: `${site.url}${r.path}`,
      priority: r.priority,
    })),
    ...tipos.map((t) => ({
      url: `${site.url}/escadas/${t.slug}`,
      priority: 0.9,
    })),
  ];
}
