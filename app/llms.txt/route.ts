import { artigos } from "@/content/artigos";
import { tipos } from "@/content/tipos";
import { addressLine, site } from "@/lib/site";

/**
 * /llms.txt (DEC-093): o resumo do site para assistentes de IA, no formato
 * proposto em llmstxt.org. Gerado dos mesmos dados das páginas — só fato
 * verificado (CLAUDE.md), nada que a tela não diga.
 */
export const dynamic = "force-static";

export function GET() {
  const u = site.url;
  const linhas = [
    `# ${site.name}`,
    "",
    `> Fabricante de escadas de concreto polido sob medida em ${site.address.city}/${site.address.state}, há ${site.yearsInMarket} anos, atendendo São José e a Grande Florianópolis. Projeta e fabrica a escada; corrimão, guarda-corpo e revestimento vêm de empresas parceiras.`,
    "",
    `Contato: telefone ${site.contact.phone} · WhatsApp ${site.contact.whatsapp} · ${site.contact.email} · Instagram ${site.contact.instagram}`,
    `Endereço: ${addressLine}`,
    "",
    "## Tipos de escada",
    "",
    ...tipos.map((t) => `- [Escada ${t.nome}](${u}/escadas/${t.slug}): ${t.resumo}`),
    "",
    "## Como funciona e dúvidas",
    "",
    `- [Como funciona](${u}/como-funciona): medição no local, projeto cotado aprovado antes da fabricação, fabricação e instalação.`,
    `- [Dúvidas](${u}/duvidas): vão, pé-direito, espelho e piso explicados para quem nunca comprou uma escada.`,
    `- [Pedir orçamento](${u}/orcamento): formulário que monta a mensagem e abre o WhatsApp.`,
    "",
    "## Artigos",
    "",
    ...artigos.map((a) => `- [${a.titulo}](${u}/artigos/${a.slug}): ${a.respostaCurta}`),
    "",
  ];
  return new Response(linhas.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
