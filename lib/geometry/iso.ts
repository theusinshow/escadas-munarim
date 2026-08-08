/**
 * Projeção dos 7 desenhos técnicos (DEC-009).
 *
 * Por que geometria em código e não 14 arquivos SVG desenhados à mão:
 * o gate da fase 02 exige que os 7 desenhos tenham a MESMA escala, o MESMO
 * ângulo e o MESMO peso de traço. Com arquivos separados isso é uma promessa;
 * aqui é uma consequência — todos passam pela mesma função de projeção, no
 * mesmo viewBox, com escala 1 (1 unidade de mundo = 1 cm = 1 unidade SVG).
 *
 * Por que oblíqua cabinet e não isometria: em isometria o lance corre na mesma
 * direção em que a projeção "afunda", e a subida de 18 cm é quase cancelada
 * pela profundidade — a escada vira uma rampa com ripas. Na oblíqua cabinet o
 * plano do perfil (x-y) é desenhado em verdadeira grandeza, então a relação
 * espelho/piso aparece exatamente como ela é. É como escada se desenha.
 */

export type V3 = [x: number, y: number, z: number];
export type Pt = [x: number, y: number];

/** Profundidade a 45°, reduzida à metade — a convenção "cabinet". */
const DEPTH = 0.5 * Math.SQRT1_2;

/**
 * x = avanço do lance (piso) · y = altura (espelho) · z = largura da escada.
 * O eixo y do SVG cresce para baixo, então a altura entra negativa.
 */
export function project([x, y, z]: V3): Pt {
  return [x + z * DEPTH, -y - z * DEPTH];
}

const round = (n: number) => Math.round(n * 100) / 100;

export function toPath(points: Pt[], close = false): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  const head = `M${round(first[0])} ${round(first[1])}`;
  const tail = rest.map((p) => `L${round(p[0])} ${round(p[1])}`).join("");
  return head + tail + (close ? "Z" : "");
}

export function bounds(polylines: Pt[][]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const poly of polylines) {
    for (const [x, y] of poly) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, minY, maxX, maxY };
}

/**
 * Translação que centraliza o desenho num quadro dado.
 * Só translada — nunca escala. A escala idêntica é o que torna os 7 comparáveis.
 */
export function centerTransform(
  polylines: Pt[][],
  frame: { width: number; height: number },
): string {
  const { minX, minY, maxX, maxY } = bounds(polylines);
  const dx = frame.width / 2 - (minX + maxX) / 2;
  const dy = frame.height / 2 - (minY + maxY) / 2;
  return `translate(${round(dx)} ${round(dy)})`;
}
