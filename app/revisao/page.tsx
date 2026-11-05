import type { Metadata } from "next";
import Image from "next/image";
import { Figura } from "@/components/technical/Figura";
import { capaDo, fotosDo, type FotoAcervo } from "@/content/galeria";
import { tipos } from "@/content/tipos";
import fotoCapa from "@/public/media/capa/capa-escada-dupla.jpg";

/**
 * Revisão dos assets, um a um (DEC-068). Página de trabalho: fora do menu, do
 * sitemap e do Google. Cada asset tem um código (F, M, D) para o
 * desenvolvedor dizer "troca a F04, tira a M03" e onde ele aparece no site.
 * Some quando a revisão acabar.
 */

export const metadata: Metadata = {
  title: "Revisão de assets",
  robots: { index: false, follow: false },
};

type Uso = string;

/** Onde cada foto do acervo aparece. Espelha as escolhas dos componentes. */
function usosDe(slug: string, i: number, foto: FotoAcervo): Uso[] {
  const usos: Uso[] = [`/escadas/${slug}`, "/obras"];
  if (i === 0) usos.unshift("Home · sete tipos", "/escadas (cartão)", "/obras (coleção)");
  const trilho = fotosDo(slug)[1] ?? capaDo(slug);
  if (trilho?.src === foto.src) usos.unshift("Home · galeria");
  if (slug === "premium" && i === 1) usos.unshift("Home · sobre");
  if (slug === "reta" && i === 3) usos.unshift("Home · pré-moldada");
  if (foto.src.includes("in-loco-07")) usos.unshift("Home · foto cheia", "Menu · card Escadas");
  return usos;
}

const FOTOS = tipos.flatMap((t) => fotosDo(t.slug).map((f, i) => ({ ...f, slug: t.slug, tipo: t.nome, i })));

const MARCA = [
  { src: "/marca/munarim-marca-escuro.svg", uso: "Rodapé (DEC-069)", escuro: true },
  { src: "/marca/munarim-marca-claro.svg", uso: "Barra do topo (DEC-097)", escuro: false },
  { src: "/marca/munarim-capa-sobre-escuro.svg", uso: "Antiga — substituída", escuro: true },
  { src: "/media/escadas-munarim-logo-mono.svg", uso: "Antiga — substituída", escuro: false },
  { src: "/media/escadas-munarim-logo.svg", uso: "Não usado no site", escuro: false },
  { src: "/media/escadas-munarim-logo-navy.svg", uso: "Não usado no site", escuro: false },
  { src: "/media/escadas-munarim-logo-claro.svg", uso: "Não usado no site", escuro: true },
  { src: "/media/escadas-munarim-logo-dark.svg", uso: "Não usado no site", escuro: false },
  { src: "/media/escadas-munarim-logo-michroma.svg", uso: "Não usado no site", escuro: false },
  { src: "/media/escadas-munarim-logo-animado.svg", uso: "Não usado no site", escuro: false },
];

const PASSOS = ["medicao", "projeto", "fabricacao", "instalacao"];

function cod(letra: string, n: number) {
  return `${letra}${String(n).padStart(2, "0")}`;
}

function Ficha({ codigo, titulo, linhas, usos }: { codigo: string; titulo: string; linhas: string[]; usos: Uso[] }) {
  return (
    <div className="mt-4">
      <p className="font-display text-lg uppercase">
        {codigo} <span className="ml-2 font-sans text-sm normal-case text-muted">{titulo}</span>
      </p>
      {linhas.map((l) => (
        <p key={l} className="mt-1 font-mono text-[0.72rem] break-all text-muted">
          {l}
        </p>
      ))}
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {usos.map((u) => (
          <li key={u} className="bg-shade px-2 py-1 font-label text-[0.68rem] tracking-[0.1em] uppercase">
            {u}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Grupo({ titulo, texto, children }: { titulo: string; texto: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-16">
      <h2 className="text-[clamp(1.4rem,2.4vw,2rem)]">{titulo}</h2>
      <p className="measure mt-3 text-muted">{texto}</p>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default function Revisao() {
  let f = 1;
  return (
    <div className="bg-bg">
      <div className="container-site py-16">
        <h1 className="text-[clamp(2rem,4.4vw,3.6rem)]">Revisão de assets</h1>
        <p className="measure mt-5 text-lg text-muted">
          Cada asset tem um código. Me diga o código e o que fazer: manter, trocar, recortar ou tirar.
          Esta página não está no menu nem no Google.
        </p>

        <Grupo
          titulo="Fotos"
          texto={`F01 é a foto da capa. Depois vem o acervo, tipo por tipo (${FOTOS.length} fotos). As etiquetas dizem onde cada uma aparece.`}
        >
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-shade">
              <Image src={fotoCapa} alt="" fill sizes="(min-width: 64rem) 33vw, 100vw" className="object-cover" />
            </div>
            <Ficha
              codigo={cod("F", f++)}
              titulo="Capa"
              linhas={[
                "/media/capa/capa-escada-dupla.jpg",
                `${fotoCapa.width}×${fotoCapa.height} · site antigo do cliente (iL02, DEC-064)`,
              ]}
              usos={["Home · capa", "Menu · card Empresa"]}
            />
          </figure>

          {FOTOS.map((foto) => (
            <figure key={foto.src}>
              <div className="relative aspect-[4/3] overflow-hidden bg-shade">
                <Image src={foto.src} alt="" fill sizes="(min-width: 64rem) 33vw, 100vw" className="object-cover" />
              </div>
              <Ficha
                codigo={cod("F", f++)}
                titulo={`${foto.tipo} · ${foto.i + 1}`}
                linhas={[foto.src, `${foto.largura}×${foto.altura} · ${foto.origem}`]}
                usos={usosDe(foto.slug, foto.i, foto)}
              />
            </figure>
          ))}
        </Grupo>

        <Grupo titulo="Marca" texto="Os arquivos de logo que existem no projeto. Só M01 e M02 estão no ar; M03 e M04 são as versões que elas substituíram.">
          {MARCA.map((m, i) => (
            <figure key={m.src}>
              <div
                className={`flex aspect-[4/3] items-center justify-center p-10 ${m.escuro ? "bg-barra" : "bg-surface"}`}
              >
                <Image src={m.src} alt="" width={320} height={120} unoptimized className="h-auto max-h-full w-full max-w-72 object-contain" />
              </div>
              <Ficha codigo={cod("M", i + 1)} titulo={m.src.split("/").pop() ?? ""} linhas={[m.src]} usos={[m.uso]} />
            </figure>
          ))}
        </Grupo>

        <Grupo
          titulo="Desenhos"
          texto="As figuras sólidas (DEC-070): quatro etapas do processo e os sete tipos, todos na mesma câmera."
        >
          {PASSOS.map((p, i) => (
            <figure key={p}>
              <div className="flex aspect-[4/3] items-center justify-center bg-surface p-4">
                <Figura nome={p} titulo={p} className="w-full" />
              </div>
              <Ficha
                codigo={cod("D", i + 1)}
                titulo={`Processo · ${p}`}
                linhas={["scripts/figuras/build.mjs"]}
                usos={["Home · como funciona", "/como-funciona"]}
              />
            </figure>
          ))}
          {tipos.map((t, i) => (
            <figure key={t.slug}>
              <div className="flex aspect-[4/3] items-center justify-center bg-surface p-4">
                <Figura nome={t.slug} titulo={t.nome} className="w-full" />
              </div>
              <Ficha
                codigo={cod("D", PASSOS.length + i + 1)}
                titulo={`Tipo · ${t.nome}`}
                linhas={["scripts/figuras/build.mjs"]}
                usos={["/escadas (cartão)", `/escadas/${t.slug}`]}
              />
            </figure>
          ))}
        </Grupo>
      </div>
    </div>
  );
}
