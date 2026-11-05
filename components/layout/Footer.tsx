import Link from "next/link";
import { LinkOrcamento } from "@/components/layout/LinkOrcamento";
import { tipos } from "@/content/tipos";
import { addressLine, site, whatsappLink } from "@/lib/site";

/**
 * Rodapé (DEC-051 → DEC-075 → DEC-083).
 *
 * Duas faixas, para o contato não se confundir com o rodapé (DEC-075): a
 * chamada em chumbo e o pé um tom abaixo.
 *
 * DEC-083: a chamada é o título, uma linha de apoio e o botão de orçamento à
 * esquerda; à direita, os canais diretos em linhas (WhatsApp, telefone,
 * e-mail, Instagram), cada linha inteira clicável. Sem os três cartões com
 * título e botão repetindo a mesma coisa. O pé tem quatro colunas: a marca
 * com a tagline, a navegação, os sete tipos e o endereço; embaixo, o fecho.
 *
 * O orçamento aparece aqui em toda página — depois do conteúdo, nunca antes
 * da prova (DEC-001). É o único fechamento das internas: a faixa azul que
 * repetia o pedido logo acima saiu (DEC-091). CNT-001 (razão social, CNPJ) e CNT-011 (horário) entram
 * na coluna do endereço quando chegarem.
 */

const ROTAS = [
  { href: "/escadas", label: "Escadas" },
  { href: "/obras", label: "Galeria" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/artigos", label: "Artigos" },
  { href: "/empresa", label: "Empresa" },
  { href: "/orcamento", label: "Orçamento" },
];

const CANAIS = [
  { canal: "WhatsApp", valor: site.contact.whatsapp, href: whatsappLink(), externo: true },
  { canal: "Telefone", valor: site.contact.phone, href: site.contact.phoneHref, externo: false },
  { canal: "E-mail", valor: site.contact.email, href: `mailto:${site.contact.email}`, externo: false },
  { canal: "Instagram", valor: site.contact.instagram, href: site.contact.instagramUrl, externo: true },
];

function Coluna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-label text-[0.72rem] tracking-[0.16em] text-primary-fg-muted uppercase">{titulo}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

const linkPe = "inline-flex min-h-10 items-center text-[0.95rem] hover:underline hover:underline-offset-4";

export function Footer() {
  return (
    <footer id="contato" className="scroll-mt-(--barra-h) bg-chumbo-fundo text-primary-fg">
      <div className="bg-chumbo">
        <div className="container-site grid gap-16 py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
          <div className="min-w-0 lg:col-span-5" data-revela>
            <h2 className="max-w-[16ch] text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.04]">
              Vamos medir a sua escada.
            </h2>
            <p className="mt-8 max-w-[42ch] text-[1.05rem] leading-relaxed text-primary-fg-muted">
              Conte o vão e o pé-direito da sua obra. A conversa já começa pelo tipo de escada que
              cabe no seu espaço.
            </p>
            <LinkOrcamento className="btn-chanfro mt-10" />
          </div>

          <ul className="min-w-0 self-end border-t border-white/15 lg:col-span-6 lg:col-start-7" data-revela>
            {CANAIS.map((c) => (
              <li key={c.canal} className="border-b border-white/15">
                <a
                  href={c.href}
                  {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-20 flex-col justify-center gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0"
                >
                  <span className="flex-none font-label text-[0.72rem] tracking-[0.16em] whitespace-nowrap text-primary-fg-muted uppercase">
                    {c.canal}
                  </span>
                  <span className="flex min-w-0 items-center justify-between gap-4">
                    <span className="truncate font-display text-[clamp(0.9rem,1.3vw,1.15rem)]">{c.valor}</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="size-4 flex-none transition-transform duration-500 ease-degrau group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    >
                      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="grid gap-12 border-b border-white/15 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marca/munarim-marca-escuro.svg" alt={site.name} width={1049} height={248} className="h-12 w-auto" />
            <p className="mt-6 font-label text-[0.72rem] tracking-[0.16em] text-primary-fg-muted uppercase">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <Coluna titulo="Navegue">
              <ul>
                {ROTAS.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className={linkPe}>
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Coluna>
          </nav>

          <div className="lg:col-span-3">
            <Coluna titulo="Os sete tipos">
              <ul>
                {tipos.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/escadas/${t.slug}`} className={linkPe}>
                      {t.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </Coluna>
          </div>

          <div className="lg:col-span-3">
            <Coluna titulo="Endereço">
              <address className="max-w-[26ch] text-[0.95rem] leading-relaxed not-italic">{addressLine}</address>
            </Coluna>
          </div>
        </div>

        {/* pr: o botão flutuante de WhatsApp não pode cobrir o "voltar ao topo". */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-2 py-6 pr-20 text-[0.85rem] text-primary-fg-muted">
          <p>
            {site.name} © {new Date().getFullYear()}
          </p>
          <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center hover:text-primary-fg">
            Política de Privacidade
          </Link>
          <a
            href="#conteudo"
            className="inline-flex min-h-11 items-center font-label text-[0.72rem] tracking-[0.16em] uppercase hover:text-primary-fg"
          >
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}
