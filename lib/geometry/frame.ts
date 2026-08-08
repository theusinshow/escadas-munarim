import { bounds, project, type Pt, type V3 } from "./iso";
import { drawings, type Drawing } from "./stairs";

/**
 * O quadro comum dos 7 desenhos.
 *
 * Calculado a partir da união das caixas de todos os tipos: o maior desenho
 * define o viewBox, e os outros são apenas centralizados nele — nunca escalados.
 * Assim o gate "mesma escala nos 7" é consequência do código, não disciplina.
 *
 * Se um tipo novo entrar no catálogo, o quadro se ajusta sozinho.
 */

const PADDING = 16;

const projectAll = (polys: V3[][]): Pt[][] =>
  polys.map((poly) => poly.map(project));

export type ProjectedDrawing = Record<keyof Drawing, Pt[][]>;

export function projectDrawing(drawing: Drawing): ProjectedDrawing {
  return {
    estrutura: projectAll(drawing.estrutura),
    degraus: projectAll(drawing.degraus),
    corrimao: projectAll(drawing.corrimao),
    contexto: projectAll(drawing.contexto),
  };
}

export function flatten(p: ProjectedDrawing): Pt[][] {
  return [...p.contexto, ...p.estrutura, ...p.degraus, ...p.corrimao];
}

const boxes = Object.values(drawings).map((d) =>
  bounds(flatten(projectDrawing(d))),
);

export const AXO_FRAME = {
  width: Math.ceil(Math.max(...boxes.map((b) => b.maxX - b.minX)) + PADDING * 2),
  height: Math.ceil(Math.max(...boxes.map((b) => b.maxY - b.minY)) + PADDING * 2),
} as const;
