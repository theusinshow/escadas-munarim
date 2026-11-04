import type { Metadata } from "next";
import { Archivo, DM_Mono, Michroma } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { site } from "@/lib/site";
import "./globals.css";

/* Sistema tipográfico v4 (DEC-050) — a letra do site passa a rimar com a do
   logo, que é uma Eurostile quadrada e expandida.

   - **Archivo**, variável com eixo de largura: expandida (wdth 115) nos títulos,
     largura normal no corpo. Uma família só, então título e texto são parentes.
   - **Michroma** — a Eurostile livre — só em rótulo curto em caixa alta
     (nome de degrau, cidade da barra). Ela é larga e tem um peso só; em frase longa cansa.
   - **DM Mono** fica nas cotas: numeral em coluna, cabe dentro do desenho.

   Subset `latin` e só: ã, õ, ç, é e í vivem em U+00C0–U+00FF, dentro do `latin`. */

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Escadas pré-moldadas em concreto — SC`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Escadas pré-moldadas em concreto — SC`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD LocalBusiness — parcial de propósito.
 * `legalName`, `taxID` e `openingHours` entram com CNT-001 e CNT-011.
 * Nenhum campo é preenchido com valor inventado.
 */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: site.address.country,
  },
  areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
  sameAs: [site.contact.instagramUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${michroma.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Navbar />
        {/* `pt-(--barra-h)` reserva no fluxo o espaço que a barra fixa ocupa
            fora dele. O token e não `pt-20`: a barra, esta reserva e o
            `-mt-(--barra-h)` da capa são o mesmo número em três arquivos
            (`app/globals.css`). */}
        <main id="conteudo" className="flex-1 pt-(--barra-h)">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
