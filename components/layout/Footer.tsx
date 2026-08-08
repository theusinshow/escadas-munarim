import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { tipos } from "@/content/tipos";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-fg">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.02em]">
            {site.name}
          </p>
          <p className="mt-1 text-sm opacity-80">{site.tagline}</p>
          <address className="mt-6 text-sm not-italic leading-relaxed opacity-90">
            {site.address.street}
            <br />
            {site.address.district}
            <br />
            {site.address.city} — {site.address.state}
          </address>
          {/* CNT-001: razão social e CNPJ entram aqui quando o cliente informar. */}
        </div>

        <div>
          <h2 className="eyebrow text-primary-fg opacity-70">Nossas escadas</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {tipos.map((tipo) => (
              <li key={tipo.slug}>
                <Link
                  href={`/escadas/${tipo.slug}`}
                  className="opacity-90 hover:underline"
                >
                  {tipo.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-primary-fg opacity-70">Navegação</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              { href: "/escadas", label: "Escadas" },
              { href: "/obras", label: "Obras" },
              { href: "/como-funciona", label: "Como funciona" },
              { href: "/duvidas", label: "Dúvidas" },
              { href: "/empresa", label: "Empresa" },
              { href: "/orcamento", label: "Orçamento" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="opacity-90 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-primary-fg opacity-70">Contato</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="opacity-90 hover:underline">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:underline"
              >
                WhatsApp {site.contact.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="opacity-90 hover:underline"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:underline"
              >
                {site.contact.instagram}
              </a>
            </li>
          </ul>
          {/* CNT-011: horário de atendimento entra aqui. */}
        </div>
      </div>

      <div className="border-t border-white/15">
        {/* pr extra: o botão flutuante de WhatsApp não pode cobrir este conteúdo. */}
        <div className="container-site flex flex-col gap-2 py-6 pr-24 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Atendemos{" "}
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
