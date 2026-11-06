/**
 * Dados do site em um único lugar.
 *
 * REGRA: só entra aqui fato verificado. Nada de número, prazo, depoimento ou
 * certificação inventado. O que falta está em /docs/ai/CONTENT_PENDING.md.
 */

export const site = {
  name: "Escadas Munarim",
  tagline: "Segurança e Design",
  /**
   * Só fato declarado pela própria empresa. "Equipe própria de instalação" e
   * "fábrica própria" NÃO entram aqui: o site do cliente declara o oposto —
   * trabalha por parceria. Ver DEC-017 e CNT-014.
   */
  description:
    "Escadas pré-moldadas em concreto polido sob medida em São José/SC, há mais de 15 anos. Cinco tipos, com o desenho e as medidas abertos para você comparar.",
  url: "https://escadasmunarim.com.br",
  locale: "pt-BR",

  /** Confirmado no selo do logo. A home antiga dizia 13 e está errada (DEC-004). */
  yearsInMarket: 15,
  /** CNT-002 — sem o ano de fundação, `yearsInMarket` envelhece sozinho. */
  foundedYear: null as number | null,

  contact: {
    phone: "(48) 3257-2015",
    phoneHref: "tel:+554832572015",
    whatsapp: "(48) 99981-0707",
    whatsappNumber: "5548999810707",
    email: "vendas@escadasmunarim.com.br",
    instagram: "@escadasmunarim",
    instagramUrl: "https://instagram.com/escadasmunarim",
    /** Perfis conferidos em 2026-11-05 (DEC-100). O LinkedIn não pôde ser conferido e ficou de fora. */
    facebookUrl: "https://www.facebook.com/escadasmunarim/",
    youtubeUrl: "https://www.youtube.com/channel/UCdg7zDl8sQ_RrHIXhOH3tbg",
    pinterestUrl: "https://br.pinterest.com/emunarim/",
  },

  address: {
    street: "Rua Treze de Junho, 893",
    district: "Flor de Nápolis",
    city: "São José",
    state: "SC",
    country: "BR",
    /** CNT-001 — CEP e CNPJ pendentes. */
    postalCode: null as string | null,
  },

  /** Região atendida — usada em copy e SEO local. */
  serviceArea: [
    "São José",
    "Florianópolis",
    "Palhoça",
    "Biguaçu",
    "Grande Florianópolis",
  ],

  /** CNT-011 — horário de atendimento pendente. */
  openingHours: null as string[] | null,

  /** CNT-001 — razão social e CNPJ pendentes. */
  legal: {
    companyName: null as string | null,
    taxId: null as string | null,
  },
} as const;

/** Monta o link do WhatsApp com mensagem pré-preenchida (DEC-007). */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Endereço em uma linha. */
export const addressLine = `${site.address.street}, ${site.address.district}, ${site.address.city} — ${site.address.state}`;

/** O tempo de mercado como aparece na tela (DEC-103). */
export const anosDeMercado = `+${site.yearsInMarket}`;

/**
 * Os dois links do Google Maps da página Sobre (DEC-104). Buscam o endereço, não
 * o nome: a ficha da empresa no Google aponta para outro endereço (CNT-018).
 */
const destinoNoMapa = encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`,
);
export const mapaUrl = `https://www.google.com/maps?q=${destinoNoMapa}&z=16&output=embed`;
export const comoChegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinoNoMapa}`;
