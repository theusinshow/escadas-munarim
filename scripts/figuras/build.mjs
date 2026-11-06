/**
 * Figuras técnicas do site (DEC-070): os cinco tipos e as quatro etapas do
 * processo como sólidos isométricos, no método da skill Anatomy
 * (https://skills.wheresryan.sh/anatomy, MIT — `kit/LICENSE`).
 *
 * - Sólidos, não arame: toda face é pintada em ordem, de trás para frente.
 * - Quatro tons por orientação + topo claro; o assunto (a escada) tem o traço
 *   mais forte, o contexto (laje, parede, chão) recua.
 * - Uma câmera e uma escala para os cinco tipos: comparação honesta (DEC-009).
 * - Degrau na razão real, espelho 18 / piso 28 (cm). Medidas de desenho, não
 *   especificação da Munarim (CNT-009).
 *
 * Uso: node scripts/figuras/build.mjs → components/technical/figuras.generated.ts
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "../..");

const R = 18; // espelho
const T = 28; // piso
const W = 100; // largura do lance
const N = 8; // espelhos até a laje de cima
const H = N * R; // pé-direito do desenho: 144
const LAJE = 16; // espessura da laje de cima
const ESP = 14; // espessura da laje do lance pré-moldado
const AZ = 128;
const EL = 30;

/* ------------------------------------------------------------------ sólidos */

const V3 = { x: Math.cos((AZ * Math.PI) / 180) * Math.cos((EL * Math.PI) / 180), y: Math.sin((AZ * Math.PI) / 180) * Math.cos((EL * Math.PI) / 180), z: Math.sin((EL * Math.PI) / 180) };
const LUZ = [-Math.sin((AZ * Math.PI) / 180), Math.cos((AZ * Math.PI) / 180)];
const area2 = (pts) => pts.reduce((a, [x, y], i) => { const [u, v] = pts[(i + 1) % pts.length]; return a + x * v - u * y; }, 0);
const ccw = (pts) => (area2(pts) < 0 ? [...pts].reverse() : pts);
const centro = (pts) => pts.reduce((a, p) => a.map((v, i) => v + p[i] / pts.length), [0, 0, 0]);

/** Face: pontos 3D + normal para fora + papel (s assunto, c contexto, m estrutura, l polido). */
function face(pts, n, papel) {
  return { pts, n, papel };
}

/** Prisma extrudado em y: perfil no plano x–z (o perfil lateral da escada). */
function prismaY(perfil, y0, y1, papel, { topo } = {}) {
  const p = ccw(perfil);
  const out = [face(p.map(([x, z]) => [x, y0, z]), [0, -1, 0], papel), face(p.map(([x, z]) => [x, y1, z]), [0, 1, 0], papel)];
  p.forEach(([ax, az], i) => {
    const [bx, bz] = p[(i + 1) % p.length];
    const len = Math.hypot(bx - ax, bz - az) || 1;
    const n = [(bz - az) / len, 0, -(bx - ax) / len];
    const plano = n[2] > 0.9 && topo ? topo : papel;
    out.push(face([[ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az]], n, plano));
  });
  return out;
}

/** Prisma extrudado em z: anel no plano x–y (cunha do caracol, pilar, caixa). */
function prismaZ(anel, z0, z1, papel, { liso = () => false } = {}) {
  const p = ccw(anel);
  const out = [face(p.map(([x, y]) => [x, y, z1]), [0, 0, 1], papel), face(p.map(([x, y]) => [x, y, z0]), [0, 0, -1], papel)];
  const lados = p.map(([ax, ay], i) => {
    const [bx, by] = p[(i + 1) % p.length];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    return face([[ax, ay, z0], [bx, by, z0], [bx, by, z1], [ax, ay, z1]], [(by - ay) / len, -(bx - ax) / len, 0], papel);
  });
  const ve = (f) => f.n[0] * V3.x + f.n[1] * V3.y > 1e-6;
  lados.forEach((f, i) => {
    if (!liso(i)) return;
    f.liso = true;
    const ant = lados[(i + lados.length - 1) % lados.length];
    const prox = lados[(i + 1) % lados.length];
    // a aresta vertical só aparece onde a superfície vira (silhueta) ou encontra uma face plana
    f.bordaA = !liso((i + lados.length - 1) % lados.length) || !ve(ant);
    f.bordaB = !liso((i + 1) % lados.length) || !ve(prox);
  });
  return [...out, ...lados];
}

const caixa = (x0, y0, z0, x1, y1, z1, papel) => prismaZ([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], z0, z1, papel);
const cilindro = (cx, cy, r, z0, z1, papel, passos = 36) => prismaZ(k.circleRing(cx, cy, r, passos), z0, z1, papel, { liso: () => true });

/* ------------------------------------------------------------------ pintura */

function pinta(P, solidos) {
  // solidos: [{ faces, depois?: string, chave?: number }] — já na ordem de camadas.
  const out = [];
  for (const s of solidos) {
    if (s.svg) {
      out.push(s.svg);
      continue;
    }
    const vis = s.faces.filter((f) => f.n[0] * V3.x + f.n[1] * V3.y + f.n[2] * V3.z > 1e-6);
    vis.sort((a, b) => k.depthOf(centro(a.pts), P) - k.depthOf(centro(b.pts), P));
    for (const f of vis) {
      let tom;
      if (f.n[2] > 0.6) tom = "t";
      else {
        const h = Math.hypot(f.n[0], f.n[1]) || 1;
        const lit = ((f.n[0] / h) * LUZ[0] + (f.n[1] / h) * LUZ[1] + 1) / 2;
        tom = String(Math.min(3, Math.max(0, Math.floor(lit * 4))));
      }
      const q = f.pts.map((p) => k.iso(p, P));
      // Superfície curva: tom contínuo entre o mais escuro e o mais claro, sem degrau de tom.
      let estilo = "";
      if (f.liso) {
        const h = Math.hypot(f.n[0], f.n[1]) || 1;
        const lit = Math.round((((f.n[0] / h) * LUZ[0] + (f.n[1] / h) * LUZ[1] + 1) / 2) * 100);
        const cor = `color-mix(in srgb, var(--fg-${f.papel}-3) ${lit}%, var(--fg-${f.papel}-0))`;
        estilo = ` style="fill:${cor};stroke:${cor}"`;
      }
      out.push(`<path class="f" data-p="${f.papel}" data-s="${tom}"${f.liso ? " data-liso" : ""}${estilo} d="${k.pathOf(q, true)}"/>`);
      if (f.liso) {
        const bordas = [[q[0], q[1]], [q[3], q[2]]];
        if (f.bordaA) bordas.push([q[0], q[3]]);
        if (f.bordaB) bordas.push([q[1], q[2]]);
        out.push(`<path class="fe" data-p="${f.papel}" d="${bordas.map((b) => k.pathOf(b)).join("")}"/>`);
      }
    }
    if (s.depois) out.push(s.depois);
  }
  return out.join("");
}

/** Ordena os sólidos de uma camada pela profundidade do centro. */
function camada(P, solidos) {
  const chave = (s) => s.chave ?? k.depthOf(centro(s.faces.flatMap((f) => f.pts)), P);
  return [...solidos].sort((a, b) => chave(a) - chave(b));
}

const linha = (P, pts, tom = "lo", extra = "") => `<path class="ln" data-t="${tom}"${extra} d="${k.pathOf(pts.map((p) => k.iso(p, P)))}"/>`;
const pontos = (P, pts, r = 0.9, tom = "mid") => `<g class="dt" data-t="${tom}">${pts.map((p) => { const [x, y] = k.iso(p, P); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`; }).join("")}</g>`;
const anel = (P, cx, cy, z, r, tom = "lo") => `<path class="ln" data-t="${tom}" d="${k.ring(cx, cy, r, z, P, 18)}"/>`;
const sombra = (P, plano, z = 0) => `<path class="halo" d="${k.haloOf(plano, z, 0.1, P)}"/>`;

/* --------------------------------------------------------------- contexto */

/** Chão com juntas e a régua no módulo do piso; parede e laje de chegada. */
function contexto(P, { xs, y0 = -34, y1 = W + 46, x0 = -44, regua = true, chegada = true, lajeX } = {}) {
  const fim = xs + 92;
  const chao = {
    faces: caixa(x0, y0, -10, fim, y1, 0, "c"),
    chave: -1e9,
    depois: [
      // juntas do piso cimentado a cada 1 m
      ...Array.from({ length: Math.floor((fim - x0) / 100) }, (_, i) => linha(P, [[x0 + 100 * (i + 1) - 6, y0, 0], [x0 + 100 * (i + 1) - 6, y1, 0]], "faint")),
      linha(P, [[x0, y1 - 6, 0], [fim, y1 - 6, 0]], "faint"),
      regua ? reguaPiso(P, 0, xs, y1 - 22) : "",
    ].join(""),
  };
  const out = [chao];
  if (chegada) {
    const lx = lajeX ?? xs;
    const parede = {
      faces: caixa(xs, y0, 0, xs + 20, y1 - 12, H - LAJE, "c"),
      chave: -1e8,
      depois: [
        // furos de tirante da fôrma, em grade de 40 cm, e a junta de concretagem
        pontos(P, [40, 80].flatMap((z) => [y0 + 16, y0 + 56, y0 + 96, y0 + 136].filter((y) => y < y1 - 18).map((y) => [xs, y, z])), 0.8, "lo"),
        linha(P, [[xs, y0, 60], [xs, y1 - 12, 60]], "faint"),
      ].join(""),
    };
    const laje = {
      faces: caixa(lx, y0, H - LAJE, xs + 92, y1 - 12, H, "c"),
      chave: -1e7,
      depois: linha(P, [[lx + 4, y0, H], [lx + 4, y1 - 12, H]], "faint"),
    };
    out.push(parede, laje);
  }
  return out;
}

/** Régua de piso: risco curto a cada 7 cm, longo a cada piso (28 cm). */
function reguaPiso(P, a, b, y) {
  const fita = { x: a - 4, y, w: b - a + 8, d: 7, r: 0.6 };
  const s = k.slabOf(fita, 0, 0.6, P, 3);
  const riscos = [];
  for (let x = a; x <= b + 0.1; x += 7) {
    const longo = Math.round(x - a) % T === 0;
    riscos.push(linha(P, [[x, y, 0.6], [x, y + (longo ? 4.6 : 2.2), 0.6]], longo ? "mid" : "lo"));
  }
  return k.solidSvg(s, { tone: "lo", crease: "none" }).replace(/iso-solid/, "iso-solid regua") + riscos.join("");
}

/* ---------------------------------------------------------- perfis da escada */

/** Linha de cima: sobe um espelho, anda o piso da vez. */
function degraus(pisos, x = 0, z = 0) {
  const pts = [[x, z]];
  for (const p of pisos) {
    z += R;
    pts.push([x, z]);
    x += p;
    pts.push([x, z]);
  }
  return pts;
}

const RETA = Array(N - 1).fill(T);
const C = ESP * Math.hypot(1, R / T); // recuo vertical da laje inclinada

/** Lance pré-moldado: degraus em cima, laje inclinada embaixo, dente de apoio no topo. */
function perfilPreMoldado(pisos) {
  const topo = degraus(pisos);
  const [xe, ze] = topo[topo.length - 1];
  const dente = ze - 18;
  const soff = (x) => (R / T) * x - C;
  return [...topo, [xe, dente], [xe - 12, dente], [xe - 12, soff(xe - 12)], [(C * T) / R, 0]];
}

/** Detalhe do lance: chanfro do bocel, alças de içamento. */
function detalheLance(P, pisos, { y0 = 0, y1 = W, alcas = [1, 5], tom = "faint" } = {}) {
  const out = [];
  let x = 0;
  pisos.forEach((p, i) => {
    const z = (i + 1) * R;
    out.push(linha(P, [[x + 2.4, y0, z], [x + 2.4, y1, z]], tom));
    if (alcas.includes(i)) {
      for (const y of [y0 + 22, y1 - 22]) {
        out.push(anel(P, x + p / 2, y, z, 2.6, "lo"));
        out.push(pontos(P, [[x + p / 2, y, z]], 0.7, "hi"));
      }
    }
    x += p;
  });
  return out.join("");
}

/* ------------------------------------------------------------------ tipos */

const TIPOS = {
  reta(P) {
    const xs = 196;
    const lance = { faces: prismaY(perfilPreMoldado(RETA), 0, W, "s"), depois: detalheLance(P, RETA) };
    const consolo = { faces: caixa(xs - 12, 10, 92, xs, W - 10, 108, "m"), chave: -2e6 };
    return [...contexto(P, { xs }), { svg: sombra(P, { x: 0, y: 0, w: xs, d: W, r: 4 }) }, consolo, lance];
  },

  caracol(P) {
    const xs = 196;
    const cx = xs - 96;
    const cy = W / 2;
    const RI = 9;
    const RE = 88;
    const cunhas = [];
    for (let i = 0; i < N - 1; i++) {
      const a0 = ((-210 + i * 30) * Math.PI) / 180;
      const a1 = a0 + (30 * Math.PI) / 180;
      const arco = (r, de, ate) => Array.from({ length: 7 }, (_, j) => { const a = de + ((ate - de) * j) / 6; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
      const z = (i + 1) * R;
      const am = (a0 + a1) / 2;
      cunhas.push({
        faces: prismaZ([...arco(RI, a0, a1), ...arco(RE, a1, a0)], z - 7, z, "s", { liso: (j) => j !== 6 && j !== 13 }),
        chave: k.depthOf([cx + 60 * Math.cos(am), cy + 60 * Math.sin(am), z], P),
        depois: linha(P, [[cx + RI * Math.cos(a0 + 0.04), cy + RI * Math.sin(a0 + 0.04), z], [cx + (RE - 2) * Math.cos(a0 + 0.02), cy + (RE - 2) * Math.sin(a0 + 0.02), z]], "faint"),
      });
    }
    const eixo = k.depthOf([cx, cy, H / 2], P);
    const atras = cunhas.filter((c) => c.chave < eixo).sort((a, b) => a.chave - b.chave);
    const frente = cunhas.filter((c) => c.chave >= eixo).sort((a, b) => a.chave - b.chave);
    const pilar = { faces: cilindro(cx, cy, RI, 0, H + 4, "m", 32), depois: anel(P, cx, cy, H + 4, RI - 2.5, "lo") };
    const base = { faces: cilindro(cx, cy, 20, 0, 3, "m", 36), depois: pontos(P, [0, 90, 180, 270].map((g) => [cx + 15 * Math.cos((g * Math.PI) / 180), cy + 15 * Math.sin((g * Math.PI) / 180), 3]), 0.8, "hi") };
    return [...contexto(P, { xs }), { svg: sombra(P, { x: cx - RE, y: cy - RE, w: RE * 2, d: RE * 2, r: RE }) }, base, ...atras, pilar, ...frente];
  },

  leke(P) {
    const xs = 196;
    const parede = {
      faces: caixa(-44, -30, 0, xs, -8, H - LAJE, "c"),
      chave: -1.5e8,
      depois: pontos(P, [30, 70, 110].flatMap((z) => [-20, 30, 80, 130, 180].map((x) => [x, -8, z])), 0.8, "lo"),
    };
    const blocos = RETA.map((p, i) => {
      const z = (i + 1) * R;
      return {
        faces: caixa(i * T, -8, z - 10, (i + 1) * T, W - 8, z, "s"),
        depois: [linha(P, [[i * T + 2.4, -8, z], [i * T + 2.4, W - 8, z]], "faint"), anel(P, i * T + T / 2, W / 2 - 8, z, 2.6, "lo")].join(""),
      };
    });
    return [...contexto(P, { xs }), parede, ...camada(P, blocos)];
  },

  mista(P) {
    const pisos = [T, T, T, 56, T, T, T];
    const xs = pisos.reduce((a, b) => a + b, 0);
    const topo = degraus(pisos);
    const zp = 4 * R;
    const fundo = zp - 15;
    const soffA = (x) => (R / T) * x - C;
    const xB = 3 * T + 56;
    const soffB = (x) => zp + (x - xB) * (R / T) - C;
    const xA = ((fundo + C) * T) / R;
    const xBb = xB + ((fundo - zp + C) * T) / R;
    const [xe, ze] = topo[topo.length - 1];
    const perfil = [...topo, [xe, ze - 18], [xe - 12, ze - 18], [xe - 12, soffB(xe - 12)], [xBb, fundo], [xA, fundo], [(C * T) / R, 0]];
    void soffA;
    const lance = { faces: prismaY(perfil, 0, W, "s"), depois: detalheLance(P, pisos, { alcas: [1, 5] }) };
    const pilar = { faces: caixa(xA + 4, 18, 0, xBb - 2, W - 18, fundo, "m"), chave: -2e6 };
    const consolo = { faces: caixa(xs - 12, 10, 92, xs, W - 10, 108, "m"), chave: -2e6 };
    return [...contexto(P, { xs }), { svg: sombra(P, { x: 0, y: 0, w: xs, d: W, r: 4 }) }, pilar, consolo, lance];
  },

  "espelho-fechado"(P) {
    const xs = 196;
    const perfil = [...degraus(RETA), [xs, 0]];
    const lance = { faces: prismaY(perfil, 0, W, "s"), depois: detalheLance(P, RETA, { alcas: [] }) };
    return [...contexto(P, { xs }), lance];
  },

};

/* --------------------------------------------------------------- processo */

const PROCESSO = {
  medicao(P) {
    const xs = 196;
    const ctx = contexto(P, { xs, regua: false });
    // trena no chão, da parede até o começo do vão
    const caixaTrena = { faces: caixa(-6, W + 4, 0, 8, W + 16, 10, "m"), depois: pontos(P, [[1, W + 16, 5]], 0.9, "hi") };
    const fita = reguaPiso(P, 8, xs, W + 8);
    // medidor a laser no tripé, feixe até a laje
    const [lx, ly] = [xs - 36, W / 2];
    const cabeca = { faces: caixa(lx - 5, ly - 4, 52, lx + 5, ly + 4, 60, "s") };
    const pernas = [0, 120, 240].map((g) => { const a = ((g + 30) * Math.PI) / 180; return linha(P, [[lx + 22 * Math.cos(a), ly + 22 * Math.sin(a), 0], [lx, ly, 52]], "mid"); }).join("");
    const pes = pontos(P, [0, 120, 240].map((g) => { const a = ((g + 30) * Math.PI) / 180; return [lx + 22 * Math.cos(a), ly + 22 * Math.sin(a), 0]; }), 1, "mid");
    const feixe = linha(P, [[lx, ly, 60], [lx, ly, H - LAJE]], "acc", ' data-dotted=""') + pontos(P, [[lx, ly, H - LAJE]], 1.6, "acc");
    const feixeH = linha(P, [[lx - 5, ly, 56], [xs, ly, 56]], "acc", ' data-dotted=""') + pontos(P, [[xs, ly, 56]], 1.6, "acc");
    // a laje de cima avança sobre o vão para o feixe ter onde bater
    const balanco = { faces: caixa(xs - 60, -34, H - LAJE, xs, W + 34, H, "c"), chave: -9e6 };
    return [...ctx, balanco, { svg: fita }, caixaTrena, { svg: pernas + pes }, cabeca, { svg: feixe + feixeH }];
  },

  projeto(P) {
    const x0 = -10, x1 = 230, y0 = -10, y1 = 130, zt = 74;
    const chao = { faces: caixa(-60, -40, -10, 290, 170, 0, "c"), chave: -1e9 };
    const pes = camada(P, [[x0 + 10, y0 + 10], [x1 - 10, y0 + 10], [x0 + 10, y1 - 10], [x1 - 10, y1 - 10]].map(([x, y]) => ({ faces: cilindro(x, y, 3.2, 0, zt - 4, "m", 18) })));
    const tampo = { faces: caixa(x0, y0, zt - 4, x1, y1, zt, "m") };
    const folha = { faces: caixa(20, 10, zt, 200, 110, zt + 0.4, "s") };
    // o perfil do lance desenhado na folha, em escala, com a régua de cota
    const esc = 0.42;
    const perfil = perfilPreMoldado(RETA).map(([x, z]) => [40 + x * esc, 92 - z * esc, zt + 0.4]);
    const desenho = linha(P, [...perfil, perfil[0]], "acc");
    const margem = linha(P, [[26, 16, zt + 0.4], [194, 16, zt + 0.4], [194, 104, zt + 0.4], [26, 104, zt + 0.4], [26, 16, zt + 0.4]], "faint");
    const carimbo = linha(P, [[150, 104, zt + 0.4], [150, 88, zt + 0.4], [194, 88, zt + 0.4]], "faint") + linha(P, [[154, 96, zt + 0.4], [188, 96, zt + 0.4]], "faint");
    const cota = linha(P, [[40, 98, zt + 0.4], [40 + 196 * esc, 98, zt + 0.4]], "lo") + pontos(P, [[40, 98, zt + 0.4], [40 + 196 * esc, 98, zt + 0.4]], 0.8, "hi");
    const escala = { faces: caixa(30, 114, zt, 190, 122, zt + 3, "m"), depois: Array.from({ length: 33 }, (_, i) => linha(P, [[34 + i * 5, 114, zt + 3], [34 + i * 5, 114 + (i % 5 === 0 ? 4 : 2), zt + 3]], i % 5 === 0 ? "mid" : "lo")).join("") };
    const lapis = { faces: caixa(150, 30, zt + 0.4, 196, 34, zt + 4.4, "m"), depois: pontos(P, [[150, 32, zt + 2.4]], 0.9, "hi") };
    return [chao, { svg: sombra(P, { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r: 4 }) }, ...pes, tampo, { ...folha, depois: margem + carimbo + desenho + cota }, escala, lapis];
  },

  fabricacao(P) {
    const chao = { faces: caixa(-60, -50, -10, 280, 160, 0, "c"), chave: -1e9, depois: linha(P, [[-60, 120, 0], [280, 120, 0]], "faint") };
    const mesa = { faces: caixa(-14, -14, 0, 214, W + 14, 8, "m") };
    const perfil = perfilPreMoldado(RETA).map(([x, z]) => [x, z + 8]);
    // a fôrma metálica: chapa lateral com o perfil, mais alta que o concreto
    const chapa = perfil.map(([x, z]) => [x, z + 4]);
    const ladoTras = { faces: prismaY(chapa, -6, -2, "m"), chave: -3e6 };
    const concreto = { faces: prismaY(perfil, -2, W + 2, "s"), depois: detalheLance(P, RETA, { y0: -2, y1: W + 2, alcas: [1, 5], tom: "acc" }) };
    const soff = (x) => (R / T) * x - C + 12;
    const ladoFrente = {
      faces: prismaY(chapa, W + 2, W + 6, "m"),
      depois: pontos(P, [40, 70, 100, 130, 160].map((x) => [x, W + 6, soff(x) + 4]), 0.9, "hi") + pontos(P, [[6, W + 6, 12], [14, W + 6, 12]], 0.9, "hi"),
    };
    // grampos que apertam a fôrma contra a mesa
    const grampos = [30, 90, 150].map((x) => ({ faces: caixa(x, W + 6, 8, x + 6, W + 14, 14, "m") }));
    return [chao, { svg: sombra(P, { x: -14, y: -14, w: 228, d: W + 28, r: 4 }) }, mesa, ladoTras, concreto, ladoFrente, ...camada(P, grampos)];
  },

  instalacao(P) {
    const xs = 196;
    const dz = 44;
    const dx = -24;
    const ctx = contexto(P, { xs, regua: false });
    const perfil = perfilPreMoldado(RETA).map(([x, z]) => [x + dx, z + dz]);
    const lance = { faces: prismaY(perfil, 0, W, "s") };
    const alcas = [[1, 22], [1, W - 22], [5, 22], [5, W - 22]].map(([i, y]) => [dx + i * T + T / 2, y, (i + 1) * R + dz]);
    const gancho = [dx + 98, W / 2, 300];
    const cabos = alcas.map((a) => linha(P, [a, gancho], "acc")).join("") + pontos(P, alcas, 1.2, "acc");
    const moitao = { faces: caixa(gancho[0] - 5, gancho[1] - 3, 300, gancho[0] + 5, gancho[1] + 3, 318, "m") };
    const cabo = linha(P, [[gancho[0], gancho[1], 318], [gancho[0], gancho[1], 340]], "mid") + pontos(P, [[gancho[0], gancho[1], 340]], 1.2, "mid");
    const consolo = { faces: caixa(xs - 12, 10, 92, xs, W - 10, 108, "m"), chave: -2e6 };
    const destino = linha(P, [[0, 0, 0], [0, W, 0]], "acc", ' data-dashed=""') + linha(P, [[(C * T) / R, 0, 0], [(C * T) / R, W, 0]], "acc", ' data-dashed=""');
    return [...ctx, consolo, { svg: sombra(P, { x: 0, y: 0, w: xs, d: W, r: 4 }) + destino }, lance, { svg: cabos }, moitao, { svg: cabo }];
  },
};

/* ------------------------------------------------------------------ saída */

const LARG = 640;
const ALT = 460;

function projecao(pontosCena) {
  return k.fitProjection(pontosCena, LARG, ALT, { pad: 22, azimuth: AZ, elevation: EL });
}

const caixaCena = (x0, x1, y0, y1, z0, z1) => [x0, x1].flatMap((x) => [y0, y1].flatMap((y) => [z0, z1].map((z) => [x, y, z])));

/** Pontos 3D de todas as faces de uma cena (a geometria não depende da projeção). */
const pontosDe = (fn) => fn(projecao(caixaCena(0, 1, 0, 1, 0, 1))).flatMap((s) => (s.faces ?? []).flatMap((f) => f.pts));
void caixaCena;

// Uma projeção para os cinco tipos — mesma escala, comparação honesta (DEC-009).
// As etapas do processo enquadram cada uma a sua cena.
const P_TIPOS = projecao(Object.values(TIPOS).flatMap(pontosDe));

const saida = {};
for (const [nome, fn] of Object.entries(TIPOS)) saida[nome] = pinta(P_TIPOS, fn(P_TIPOS));
for (const [nome, fn] of Object.entries(PROCESSO)) {
  const P = projecao([...pontosDe(fn), ...(nome === "instalacao" ? [[74, W / 2, 340]] : [])]);
  saida[nome] = pinta(P, fn(P));
}

const ts = `/* GERADO por \`node scripts/figuras/build.mjs\` (DEC-070). Não editar à mão. */

export const FIGURA_VIEWBOX = "0 0 ${LARG} ${ALT}";

export const FIGURAS: Record<string, string> = ${JSON.stringify(saida, null, 2)};
`;
writeFileSync(join(RAIZ, "components/technical/figuras.generated.ts"), ts);
console.log("figuras:", Object.keys(saida).join(", "), `${Math.round(ts.length / 1024)} KB`);
