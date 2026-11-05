import type { NextConfig } from "next";

/**
 * Redirects 301 do WordPress antigo (DEC-006).
 *
 * ATENÇÃO — CNT-007: este mapa cobre apenas as rotas conhecidas da auditoria.
 * A lista completa de URLs indexadas precisa ser levantada no Search Console
 * antes do go-live, ou o corte do blog derruba o SEO acumulado em 404.
 */
const nextConfig: NextConfig = {
  // Só no `next dev`: deixa abrir o servidor local pelo celular na mesma rede.
  allowedDevOrigins: ["192.168.0.2"],
  async redirects() {
    return [
      { source: "/nossas-escadas", destination: "/escadas", permanent: true },
      { source: "/nossa-empresa", destination: "/empresa", permanent: true },
      { source: "/entre-em-contato", destination: "/orcamento", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 para foto (DEC-057): o 75 padrão, em cima do AVIF do pipeline, deixava a escada mole.
    qualities: [75, 85],
  },
};

export default nextConfig;
