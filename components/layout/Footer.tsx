import Link from "next/link";
import { LinkOrcamento } from "@/components/layout/LinkOrcamento";
import { tipos } from "@/content/tipos";
import { addressLine, site, whatsappLink } from "@/lib/site";

/**
 * Rodapé (DEC-051 → DEC-075 → DEC-083 → DEC-100).
 *
 * Duas faixas, para o contato não se confundir com o rodapé (DEC-075): a
 * chamada em chumbo e o pé um tom abaixo.
 *
 * DEC-100: a chamada tem o título à esquerda e, na coluna da direita, a linha
 * de apoio com o botão de orçamento; embaixo, os canais diretos (WhatsApp,
 * telefone, e-mail) em três colunas da mesma grade, cada um inteiro clicável.
 * O pé tem quatro colunas: a marca com a tagline e as redes sociais, a
 * navegação, os cinco tipos e o endereço; embaixo, o fecho.
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
];

const REDES = [
  {
    rede: "Instagram",
    href: site.contact.instagramUrl,
    icone:
      "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    rede: "Facebook",
    href: site.contact.facebookUrl,
    icone:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    rede: "YouTube",
    href: site.contact.youtubeUrl,
    icone:
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    rede: "Pinterest",
    href: site.contact.pinterestUrl,
    icone:
      "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  },
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
        <div className="container-site py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2
              data-revela
              className="max-w-[16ch] min-w-0 text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.04] lg:col-span-8"
            >
              Vamos medir a sua escada.
            </h2>
            <div className="min-w-0 lg:col-span-4" data-revela>
              <p className="max-w-[42ch] text-[1.05rem] leading-relaxed text-primary-fg-muted">
                Conte o vão e o pé-direito da sua obra. A conversa já começa pelo tipo de escada que
                cabe no seu espaço.
              </p>
              <LinkOrcamento className="btn-chanfro mt-8" />
            </div>
          </div>

          <ul className="mt-16 grid gap-x-10 border-b border-white/15 lg:mt-24 xl:grid-cols-3 xl:border-b-0" data-revela>
            {CANAIS.map((c) => (
              <li key={c.canal} className="min-w-0 border-t border-white/15 xl:border-b xl:border-white/15">
                <a
                  href={c.href}
                  {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-24 flex-col justify-center gap-3 py-5"
                >
                  <span className="font-label text-[0.72rem] tracking-[0.16em] text-primary-fg-muted uppercase">
                    {c.canal}
                  </span>
                  <span className="flex items-center justify-between gap-4">
                    <span className="min-w-0 font-display text-[clamp(0.72rem,3.4vw,0.9rem)] xl:text-[1.02rem]">{c.valor}</span>
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
            <ul className="mt-8 flex flex-wrap gap-2">
              {REDES.map((r) => (
                <li key={r.rede}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} no ${r.rede}`}
                    className="grid size-11 place-items-center rounded-(--radius) border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-chumbo-fundo"
                  >
                    <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="currentColor" aria-hidden="true">
                      <path d={r.icone} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
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
            <Coluna titulo="Os cinco tipos">
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
