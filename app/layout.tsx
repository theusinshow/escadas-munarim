import type { Metadata } from "next";
import { DM_Mono, Hanken_Grotesk, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { site } from "@/lib/site";
import "./globals.css";

/* Sistema Visual v3 — duas geométricas de construção diferente, uma de esquadro
   e uma de compasso, mais a mono do mesmo esqueleto. Cinco pesos, nada além.

   Subset `latin` e só: ã, õ, ç, é e í vivem em U+00C0–U+00FF, dentro do `latin`.
   O `latin-ext` cobre leste europeu, que este site não escreve. */

/* A Outfit entra com um peso só. Monolinear e geométrica, ela ganha hierarquia
   por tamanho, não por peso — dois pesos altos seguidos apagariam a diferença
   entre H1 e H2. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${outfit.variable} ${hanken.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" className="flex-1 pt-24">
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
