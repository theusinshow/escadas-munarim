/**
 * Pipeline do acervo de fotos — `npm run media`.
 *
 * Você solta a imagem em `media-src/{tipo}/` e roda o comando. Ele converte para
 * AVIF (lado maior 2400px, nunca amplia), grava em `public/media/escadas/{tipo}/`
 * e regenera `content/galeria.generated.ts`, que é de onde o site inteiro lê as
 * fotos: capa da home, catálogo, página de tipo, galeria e menu.
 *
 * A procedência vem da subpasta e vira prefixo no nome do arquivo
 * (`BANCO_DE_IMAGENS.md`), então dá para auditar o site com um `ls`:
 *
 *   media-src/reta/arquivo.png            → ref-reta-01.avif   (referência, sem licença)
 *   media-src/reta/_stock/arquivo.jpg     → stock-reta-01.avif (stock licenciado)
 *   media-src/reta/_gerado/arquivo.png    → gen-reta-01.avif   (IA, DEC-008)
 *   media-src/reta/_cliente/arquivo.jpg   → foto-reta-01.avif  (obra da Munarim)
 *
 * Ordem: cliente → stock → gerado → referência, e alfabética dentro de cada
 * grupo. **A primeira foto do tipo é a capa dele.** Quando a foto real chegar,
 * ela assume a capa sozinha, sem ninguém editar código.
 *
 * `alt` opcional por arquivo em `media-src/{tipo}/alt.json` → `{ "arquivo.png": "texto" }`.
 * Sem ele, o alt é genérico e honesto ("Escada reta — imagem de referência 2 de 6").
 *
 * Pastas de topo começando com `_` (`_triagem`, `_descartes`) são ignoradas.
 * Conversão é cacheada por tamanho + data do arquivo de origem.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAIZ = process.cwd();
const ORIGEM = path.join(RAIZ, "media-src");
const DESTINO = path.join(RAIZ, "public", "media", "escadas");
const MANIFESTO = path.join(RAIZ, "content", "galeria.generated.ts");
const CACHE = path.join(ORIGEM, ".cache.json");

/** Ordem do catálogo — a mesma de `content/tipos.ts`. */
const TIPOS = {
  reta: "Reta",
  caracol: "Caracol",
  leke: "Leke",
  mista: "Mista",
  "espelho-fechado": "Espelho fechado",
};

const PROCEDENCIA = [
  { pasta: "_cliente", prefixo: "foto", origem: "cliente" },
  { pasta: "_stock", prefixo: "stock", origem: "stock" },
  { pasta: "_gerado", prefixo: "gen", origem: "gerado" },
  { pasta: "", prefixo: "ref", origem: "referencia" },
];

const ROTULO = {
  cliente: "foto de obra",
  stock: "imagem de banco",
  gerado: "imagem gerada",
  referencia: "imagem de referência",
};

/* 2400 cobre a coluna da capa em tela retina (1080 × 2 = 2160px de altura).
   Com 1600 a foto chegava ampliada e, comprimida duas vezes (aqui e no
   next/image), mole (DEC-057). */
const LADO_MAIOR = 2400;
const QUALIDADE = 70;
const EXT = /\.(png|jpe?g|webp|avif|tiff?)$/i;

const lerJson = (arquivo, padrao) => {
  try {
    return JSON.parse(fs.readFileSync(arquivo, "utf8"));
  } catch {
    return padrao;
  }
};

const listar = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => EXT.test(f))
        .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
    : [];

async function main() {
  if (!fs.existsSync(ORIGEM)) {
    fs.mkdirSync(ORIGEM, { recursive: true });
    for (const slug of Object.keys(TIPOS)) fs.mkdirSync(path.join(ORIGEM, slug), { recursive: true });
    console.log("Criei media-src/{tipo}/. Solte as imagens lá e rode de novo.");
  }

  const cacheAntigo = lerJson(CACHE, {});
  const cacheNovo = {};
  const acervo = {};
  let convertidas = 0;
  let reaproveitadas = 0;

  for (const [slug, nome] of Object.entries(TIPOS)) {
    const pastaTipo = path.join(ORIGEM, slug);
    const alts = lerJson(path.join(pastaTipo, "alt.json"), {});
    const saida = path.join(DESTINO, slug);
    fs.mkdirSync(saida, { recursive: true });

    const fontes = PROCEDENCIA.flatMap((p) =>
      listar(path.join(pastaTipo, p.pasta)).map((arquivo) => ({
        ...p,
        arquivo,
        caminho: path.join(pastaTipo, p.pasta, arquivo),
      })),
    );

    const contador = {};
    const fotos = [];

    for (const fonte of fontes) {
      contador[fonte.prefixo] = (contador[fonte.prefixo] ?? 0) + 1;
      const n = String(contador[fonte.prefixo]).padStart(2, "0");
      const nomeSaida = `${fonte.prefixo}-${slug}-${n}.avif`;
      const caminhoSaida = path.join(saida, nomeSaida);
      const stat = fs.statSync(fonte.caminho);
      // Tamanho e qualidade entram na assinatura: mudar um deles reconverte tudo.
      const assinatura = `${path.relative(ORIGEM, fonte.caminho)}|${stat.size}|${stat.mtimeMs}|${LADO_MAIOR}|${QUALIDADE}`;
      const chave = `${slug}/${nomeSaida}`;
      const emCache = cacheAntigo[chave];

      let meta;
      if (emCache?.assinatura === assinatura && fs.existsSync(caminhoSaida)) {
        meta = emCache.meta;
        reaproveitadas++;
      } else {
        const pipeline = sharp(fonte.caminho).rotate().resize({
          width: LADO_MAIOR,
          height: LADO_MAIOR,
          fit: "inside",
          withoutEnlargement: true,
        });
        const info = await pipeline
          .clone()
          .avif({ quality: QUALIDADE, effort: 5 })
          .toFile(caminhoSaida);
        const blur = await pipeline
          .clone()
          .resize(12)
          .webp({ quality: 40 })
          .toBuffer();
        meta = {
          largura: info.width,
          altura: info.height,
          kb: Math.round(info.size / 1024),
          blur: `data:image/webp;base64,${blur.toString("base64")}`,
        };
        convertidas++;
        process.stdout.write(`  ${chave} (${meta.kb}KB)\n`);
      }

      cacheNovo[chave] = { assinatura, meta };
      fotos.push({
        src: `/media/escadas/${slug}/${nomeSaida}`,
        largura: meta.largura,
        altura: meta.altura,
        blur: meta.blur,
        origem: fonte.origem,
        alt: alts[fonte.arquivo] ?? "",
        fonte: fonte.arquivo,
      });
    }

    fotos.forEach((f, i) => {
      if (!f.alt) f.alt = `Escada ${nome.toLowerCase()} — ${ROTULO[f.origem]} ${i + 1} de ${fotos.length}`;
    });

    // Apaga o que sobrou de uma rodada anterior (foto removida ou renomeada).
    const validos = new Set(fotos.map((f) => path.basename(f.src)));
    for (const velho of fs.readdirSync(saida)) {
      if (!validos.has(velho)) fs.rmSync(path.join(saida, velho));
    }

    acervo[slug] = fotos;
  }

  fs.writeFileSync(CACHE, JSON.stringify(cacheNovo, null, 2));

  const corpo = Object.entries(acervo)
    .map(([slug, fotos]) => {
      const itens = fotos
        .map(
          (f) =>
            `    { src: ${JSON.stringify(f.src)}, largura: ${f.largura}, altura: ${f.altura}, origem: ${JSON.stringify(f.origem)}, alt: ${JSON.stringify(f.alt)}, blur: ${JSON.stringify(f.blur)} },`,
        )
        .join("\n");
      return `  ${JSON.stringify(slug)}: [\n${itens}\n  ],`;
    })
    .join("\n");

  fs.writeFileSync(
    MANIFESTO,
    `/* GERADO por \`npm run media\` (scripts/media.mjs). Não editar à mão:
   solte a imagem em media-src/{tipo}/ e rode o comando de novo. */

import type { FotoAcervo } from "./galeria";

export const acervo: Record<string, FotoAcervo[]> = {
${corpo}
};
`,
  );

  const total = Object.values(acervo).reduce((s, f) => s + f.length, 0);
  console.log(
    `\n${total} fotos em ${Object.keys(acervo).length} tipos · ${convertidas} convertidas · ${reaproveitadas} do cache`,
  );
  for (const [slug, fotos] of Object.entries(acervo)) {
    const ref = fotos.filter((f) => f.origem === "referencia").length;
    console.log(`  ${slug.padEnd(16)} ${String(fotos.length).padStart(2)} fotos${ref ? `  (${ref} ref- — bloqueiam publicação)` : ""}`);
  }
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
