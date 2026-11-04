import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

/**
 * Rodapé (DEC-051 → DEC-063).
 *
 * Sobre a referência trazida pelo desenvolvedor: três colunas no alto —
 * contato à esquerda, navegação centralizada em caixa alta, links de serviço
 * sublinhados à direita —, a assinatura centralizada no meio e o nome da
 * empresa gigante sangrando no pé, cortado pela borda. O nome é a peça
 * gráfica; por isso o logo em imagem saiu daqui.
 *
 * O WhatsApp continua em corpo de título: é por ele que a conversa acontece
 * (DEC-007). Texto secundário em `--primary-fg-muted` (6,11:1 sobre navy),
 * não em opacidade.
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

const sublinhado =
  "inline-flex min-h-11 items-center text-primary-fg underline decoration-primary-fg/40 decoration-1 underline-offset-[6px] hover:decoration-primary-fg";

export function Footer() {
  return (
    <footer
      id="contato"
      className="relative scroll-mt-(--barra-h) overflow-hidden bg-primary text-primary-fg"
    >
      <div className="container-site grid gap-14 pt-20 lg:grid-cols-3 lg:gap-12 lg:pt-28">
        <div>
          <p className="text-sm text-primary-fg-muted">Fale direto pelo WhatsApp</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-display text-[clamp(1.25rem,5.8vw,1.9rem)] whitespace-nowrap underline-offset-[6px] hover:underline"
          >
            {site.contact.whatsapp}
          </a>
          <p className="mt-2 text-sm">
            <a href={site.contact.phoneHref} className="text-primary-fg-muted hover:text-primary-fg">
              {site.contact.phone}
            </a>
          </p>
          <address className="mt-8 text-sm leading-relaxed text-primary-fg-muted not-italic">
            {site.address.street}
            <br />
            {site.address.district}, {site.address.city} — {site.address.state}
          </address>
        </div>

        <nav aria-label="Rodapé" className="lg:justify-self-center">
          <ul className="flex flex-col gap-1 lg:items-center">
            {ROTAS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center font-label text-[0.78rem] tracking-[0.16em] text-primary-fg-muted uppercase hover:text-primary-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col lg:items-end">
          <ul className="flex flex-col lg:items-end">
            <li>
              <a href={`mailto:${site.contact.email}`} className={sublinhado}>
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={sublinhado}>
                {site.contact.instagram}
              </a>
            </li>
            <li>
              <a href={MAPA} target="_blank" rel="noopener noreferrer" className={sublinhado}>
                Abrir no mapa
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-col text-sm lg:items-end">
            <li>
              <Link href="/politica-de-privacidade" className={sublinhado}>
                Política de Privacidade
              </Link>
            </li>
          </ul>
          {/* CNT-001 (razão social, CNPJ) e CNT-011 (horário) entram aqui. */}
        </div>
      </div>

      {/* pr/pl: o botão flutuante de WhatsApp não pode cobrir a assinatura. */}
      <div className="container-site mt-20 px-20 text-center text-sm leading-relaxed text-primary-fg-muted lg:mt-28">
        <p>© {new Date().getFullYear()}</p>
        <p>
          {site.name} · {site.tagline}
        </p>
        <p>Atendemos {site.serviceArea.slice(0, 4).join(", ")} e região.</p>
      </div>

      {/* O nome como peça gráfica, cortado pela borda de baixo. Decorativo: o
          nome da empresa já está na assinatura acima. */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-10 -mb-[0.2em] text-center font-display text-[12.4vw] leading-[0.8] whitespace-nowrap text-primary-fg/[0.08] select-none lg:mt-14"
      >
        MUNARIM
      </p>
    </footer>
  );
}
