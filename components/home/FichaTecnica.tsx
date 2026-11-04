import { site } from "@/lib/site";

/**
 * Ficha técnica — substitui a faixa de números (DEC-051).
 *
 * A faixa antiga era o template "número gigante + três estatísticas", o mais
 * batido do gênero. Aqui os mesmos fatos viram o **carimbo de prancha**: a
 * tabela no canto de todo desenho técnico, com o nome da peça, a escala, quem
 * fez. É o mundo do site (o desenho cotado é a espinha, DEC-009), e organiza
 * fato declarado sem inflar nenhum deles em métrica de vitrine.
 *
 * Só fato verificado (`CLAUDE.md`): nome, tagline, 15 anos, cidade, região,
 * 7 tipos, 4 etapas. Nada animado — número que sobe é performance, não dado.
 */

const CELULAS = [
  { rotulo: "Fabricante", valor: site.name, nota: site.tagline, largura: "col-span-2 lg:col-span-6" },
  { rotulo: "No mercado", valor: `${site.yearsInMarket} anos`, nota: "fabricando escada de concreto", largura: "lg:col-span-3" },
  { rotulo: "Endereço", valor: `${site.address.city} — ${site.address.state}`, nota: site.address.district, largura: "lg:col-span-3" },
  { rotulo: "Atende", valor: "Grande Florianópolis", nota: site.serviceArea.slice(0, 4).join(" · "), largura: "col-span-2 lg:col-span-6" },
  { rotulo: "Catálogo", valor: "7 tipos", nota: "com desenho e limites abertos", largura: "lg:col-span-3" },
  { rotulo: "Processo", valor: "4 etapas", nota: "da medição à instalação", largura: "lg:col-span-3" },
];

export function FichaTecnica() {
  return (
    <section aria-label="Ficha técnica da empresa" className="bg-bg py-12 lg:py-16">
      <div className="container-site">
        <dl className="grid grid-cols-2 border-t border-l border-text/70 lg:grid-cols-12">
          {CELULAS.map((c) => (
            <div
              key={c.rotulo}
              className={`flex flex-col justify-between gap-4 border-r border-b border-text/70 p-4 lg:gap-6 lg:p-6 ${c.largura}`}
            >
              <dt className="rotulo text-muted">{c.rotulo}</dt>
              <dd>
                <span className="block font-display text-xl font-bold tracking-[-0.015em] sm:text-2xl lg:text-[1.75rem]">
                  {c.valor}
                </span>
                <span className="mt-1 block text-sm text-muted">{c.nota}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
