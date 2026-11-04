import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { tipos } from "@/content/tipos";

/**
 * Rodapé (DEC-051).
 *
 * Três andares, do mais importante para o menos:
 * 1. a marca e o contato direto — o WhatsApp em corpo de título, porque é por
 *    ele que a conversa acontece (DEC-007);
 * 2. as rotas — os 7 tipos em lista própria, já que a barra não os mostra
 *    (DEC-020), mais o resto do site e o endereço;
 * 3. a linha legal.
 *
 * Texto secundário em `--primary-fg-muted` (6,11:1 sobre navy), não em
 * opacidade: opacidade sobre navy cai abaixo de AA conforme o valor.
 */

const ROTAS = [
  { href: "/escadas", label: "Escadas" },
  { href: "/obras", label: "Galeria" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/empresa", label: "Empresa" },
  { href: "/orcamento", label: "Orçamento" },
];

const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`,
)}`;

const link = "text-primary-fg-muted hover:text-primary-fg hover:underline underline-offset-4";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-fg">
      <div className="container-site">
        <div className="grid gap-10 border-b border-primary-fg/15 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
          <div className="lg:col-span-6">
            <Image
              src="/marca/munarim-1a-sobre-escuro.svg"
              alt={`${site.name} — ${site.tagline}`}
              width={525}
              height={155}
              unoptimized
              className="h-auto w-full max-w-[24rem]"
            />
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <p className="text-sm text-primary-fg-muted">Fale direto pelo WhatsApp</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-display text-3xl font-bold tracking-[-0.015em] underline-offset-[6px] hover:underline lg:text-4xl"
            >
              {site.contact.whatsapp}
            </a>
            <p className="mt-3 text-sm">
              <a href={site.contact.phoneHref} className={link}>
                {site.contact.phone}
              </a>
              <span aria-hidden="true" className="mx-2 text-primary-fg-muted">
                ·
              </span>
              <a href={`mailto:${site.contact.email}`} className={link}>
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <nav aria-labelledby="rodape-escadas" className="lg:col-span-5">
          <h2 id="rodape-escadas" className="rotulo">Os sete tipos</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {tipos.map((tipo) => (
              <li key={tipo.slug}>
                <Link href={`/escadas/${tipo.slug}`} className={link}>
                  {tipo.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-site" className="lg:col-span-3">
          <h2 id="rodape-site" className="rotulo">Site</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {ROTAS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="rotulo">Endereço</h2>
          <address className="mt-4 text-sm leading-relaxed text-primary-fg-muted not-italic">
            {site.address.street}
            <br />
            {site.address.district}, {site.address.city} — {site.address.state}
          </address>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={MAPA} target="_blank" rel="noopener noreferrer" className={link}>
              Abrir no mapa
            </a>
            <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
              {site.contact.instagram}
            </a>
          </p>
          {/* CNT-001 (razão social, CNPJ) e CNT-011 (horário) entram aqui. */}
        </div>
      </div>

      <div className="border-t border-primary-fg/15">
        {/* pr extra: o botão flutuante de WhatsApp não pode cobrir este conteúdo. */}
        <div className="container-site flex flex-col gap-2 py-6 pr-24 text-xs text-primary-fg-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.tagline}. Atendemos{" "}
            {site.serviceArea.slice(0, 4).join(", ")} e região.
          </p>
          <Link href="/politica-de-privacidade" className="hover:underline">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
