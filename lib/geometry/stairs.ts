import type { V3 } from "./iso";

/**
 * Geometria dos 5 tipos de escada.
 *
 * Unidade = centímetro. A razão do degrau é a mesma que governa o motion
 * (espelho 18 / piso 28 — DEC-010): o número existe fora do site.
 *
 * ATENÇÃO: as medidas abaixo são de um degrau residencial confortável e servem
 * para o DESENHO. Não são especificação da Munarim até `CNT-009` ser respondido —
 * por isso todo desenho é rotulado como ilustrativo na interface.
 *
 * Os lances têm 7 degraus por legibilidade, não porque a escada tenha 7: é um
 * desenho esquemático comparável, não um projeto executivo.
 */
export const STAIR = {
  RISER: 18,
  TREAD: 28,
  WIDTH: 100,
  HANDRAIL: 90,
} as const;

export type Drawing = {
  /** Massa e perfil — traço 1,5, cor primária. */
  estrutura: V3[][];
  /** Arestas de degrau — traço 1,5, cor primária. */
  degraus: V3[][];
  /** Corrimão e guarda-corpo — traço 1, cor inox. */
  corrimao: V3[][];
  /** Parede, piso, apoio: o que é contexto e precisa recuar — traço 1, cor border. */
  contexto: V3[][];
};

const { RISER: R, TREAD: T, WIDTH: W, HANDRAIL: H } = STAIR;

const N = 7; // degraus por lance nos desenhos retos

/** Perfil em escada no plano x-y, a uma largura z fixa. */
function profileX(n: number, z: number): V3[] {
  const pts: V3[] = [[0, 0, z]];
  for (let i = 0; i < n; i++) {
    pts.push([i * T, (i + 1) * R, z]);
    pts.push([(i + 1) * T, (i + 1) * R, z]);
  }
  return pts;
}

/** Arestas transversais que dão volume ao lance (o que faz o desenho ser 3D). */
function treadEdgesX(n: number): V3[][] {
  const edges: V3[][] = [];
  for (let i = 0; i < n; i++) {
    const y = (i + 1) * R;
    edges.push([
      [i * T, y, 0],
      [i * T, y, W],
    ]);
    edges.push([
      [(i + 1) * T, y, 0],
      [(i + 1) * T, y, W],
    ]);
  }
  return edges;
}

/** Corrimão reto acompanhando os bicos do degrau, com montantes. */
function handrailX(n: number, z: number): V3[][] {
  const rail: V3[] = [
    [0, H, z],
    [n * T, n * R + H, z],
  ];
  const posts: V3[][] = [0, Math.floor(n / 2), n].map((i) => [
    [i * T, i * R, z],
    [i * T, i * R + H, z],
  ]);
  return [rail, ...posts];
}

/** Linha de piso, para a escada não flutuar no vazio. */
function floorX(n: number): V3[][] {
  return [
    [
      [-30, 0, 0],
      [n * T + 30, 0, 0],
    ],
    [
      [-30, 0, 0],
      [-30, 0, W],
    ],
  ];
}

/* ---------------------------------------------------------------- reta ---- */

function reta(n = N): Drawing {
  return {
    estrutura: [
      profileX(n, 0),
      profileX(n, W),
      [
        [0, 0, 0],
        [0, 0, W],
      ],
      [
        [n * T, n * R, 0],
        [n * T, n * R, W],
      ],
    ],
    degraus: treadEdgesX(n),
    corrimao: handrailX(n, W),
    contexto: floorX(n),
  };
}

/* ----------------------------------------------------- espelho fechado ---- */

function espelhoFechado(n = N): Drawing {
  /* O perfil fecha no piso: a escada lê como massa sólida, sem vazado. */
  const closed = (z: number): V3[] => [
    ...profileX(n, z),
    [n * T, 0, z],
    [0, 0, z],
  ];
  return {
    estrutura: [
      closed(0),
      closed(W),
      [
        [0, 0, 0],
        [0, 0, W],
      ],
      [
        [n * T, 0, 0],
        [n * T, 0, W],
      ],
      [
        [n * T, n * R, 0],
        [n * T, n * R, W],
      ],
    ],
    degraus: treadEdgesX(n),
    corrimao: handrailX(n, W),
    contexto: floorX(n),
  };
}

/* ---------------------------------------------------------------- leke ---- */

function leke(n = N): Drawing {
  /* A parede é contexto: recua no traço para os degraus em balanço ficarem
     sendo o assunto do desenho. */
  const wall: V3[] = [
    [-16, 0, 0],
    [n * T + 16, 0, 0],
    [n * T + 16, n * R + 34, 0],
    [-16, n * R + 34, 0],
    [-16, 0, 0],
  ];

  const degraus: V3[][] = [];
  const th = 7; // espessura aparente do degrau em balanço
  for (let i = 0; i < n; i++) {
    const y = (i + 1) * R;
    const x0 = i * T + 6;
    const x1 = (i + 1) * T;
    degraus.push([
      [x0, y, 0],
      [x1, y, 0],
      [x1, y, W],
      [x0, y, W],
      [x0, y, 0],
    ]);
    degraus.push([
      [x0, y - th, W],
      [x1, y - th, W],
      [x1, y - th, 0],
    ]);
    degraus.push([
      [x0, y, W],
      [x0, y - th, W],
    ]);
    degraus.push([
      [x1, y, W],
      [x1, y - th, W],
    ]);
  }

  return {
    estrutura: [],
    degraus,
    corrimao: handrailX(n, W),
    contexto: [wall, ...floorX(n)],
  };
}

/* ------------------------------------------------------------- caracol ---- */

function caracol(n = 8, r0 = 10, rOut = 92): Drawing {
  const step = (2 * Math.PI) / n; // uma volta completa
  const at = (r: number, a: number, y: number): V3 => [
    r * Math.cos(a),
    y,
    r * Math.sin(a),
  ];

  const colTop = n * R;
  const estrutura: V3[][] = [
    [
      [r0, 0, 0],
      [r0, colTop, 0],
    ],
    [
      [-r0, 0, 0],
      [-r0, colTop, 0],
    ],
  ];

  /* Degraus em cunha, com espessura no bico.
     Sem hélice de corrimão e sem elipse de piso: num desenho pequeno os dois
     viram laços que cruzam a escada inteira e o tipo deixa de ser reconhecível.
     O corrimão do caracol aparece na foto e no corte, não aqui. */
  const th = 6;
  const degraus: V3[][] = [];
  for (let i = 0; i < n; i++) {
    const a0 = i * step;
    const y = (i + 1) * R;
    const outer: V3[] = [];
    for (let k = 0; k <= 4; k++) outer.push(at(rOut, a0 + (step * k) / 4, y));
    degraus.push([at(r0, a0, y), ...outer, at(r0, a0 + step, y), at(r0, a0, y)]);
    // espessura da peça, nas duas arestas do bico
    degraus.push([at(rOut, a0, y), at(rOut, a0, y - th)]);
    degraus.push([
      at(rOut, a0 + step, y),
      at(rOut, a0 + step, y - th),
      at(r0, a0 + step, y - th),
    ]);
  }

  // base da coluna
  const base: V3[] = [];
  for (let k = 0; k <= 24; k++) base.push(at(r0, (k / 24) * 2 * Math.PI, 0));

  return { estrutura, degraus, corrimao: [], contexto: [base] };
}

/* --------------------------------------------------------------- mista ---- */

function mista(n1 = 3, n2 = 3): Drawing {
  const xL = n1 * T; // início do patamar
  const yL = n1 * R; // altura do patamar

  // lance A — sobe em +x
  const estrutura: V3[][] = [
    profileX(n1, 0),
    profileX(n1, W),
    [
      [0, 0, 0],
      [0, 0, W],
    ],
  ];
  const degraus = treadEdgesX(n1);

  // patamar
  estrutura.push([
    [xL, yL, 0],
    [xL + W, yL, 0],
    [xL + W, yL, W],
    [xL, yL, W],
    [xL, yL, 0],
  ]);

  // lance B — sobe em +z, a partir do patamar (o giro de 90°)
  const profileZ = (x: number): V3[] => {
    const pts: V3[] = [[x, yL, W]];
    for (let j = 0; j < n2; j++) {
      pts.push([x, yL + (j + 1) * R, W + j * T]);
      pts.push([x, yL + (j + 1) * R, W + (j + 1) * T]);
    }
    return pts;
  };
  estrutura.push(profileZ(xL), profileZ(xL + W));
  estrutura.push([
    [xL, yL + n2 * R, W + n2 * T],
    [xL + W, yL + n2 * R, W + n2 * T],
  ]);

  for (let j = 0; j < n2; j++) {
    const y = yL + (j + 1) * R;
    degraus.push([
      [xL, y, W + j * T],
      [xL + W, y, W + j * T],
    ]);
    degraus.push([
      [xL, y, W + (j + 1) * T],
      [xL + W, y, W + (j + 1) * T],
    ]);
  }

  return {
    estrutura,
    degraus,
    corrimao: handrailX(n1, W),
    contexto: [
      [
        [-30, 0, 0],
        [xL + W + 20, 0, 0],
      ],
      [
        [-30, 0, 0],
        [-30, 0, W],
      ],
    ],
  };
}

/* ------------------------------------------------------------- registro --- */

export const drawings: Record<string, Drawing> = {
  reta: reta(),
  caracol: caracol(),
  leke: leke(),
  mista: mista(),
  "espelho-fechado": espelhoFechado(),
};
