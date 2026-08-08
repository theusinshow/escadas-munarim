import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STAIR } from "./geometry/stairs";

/**
 * O sistema de motion do projeto (DEC-010).
 *
 * Um único sistema, e todo parâmetro dele sai da geometria da escada: os
 * offsets e os tempos são a razão real do degrau (espelho 18 / piso 28). O
 * número existe fora do site — é por isso que este motion não cabe no site de
 * um concorrente.
 *
 * Regra que atravessa tudo: **o estado inicial é aplicado por JS**, nunca por
 * CSS. Assim o HTML estático já é o estado final e nada some se o JS falhar,
 * se o usuário pedir menos movimento, ou antes do bundle carregar.
 */

gsap.registerPlugin(ScrollTrigger, CustomEase);

/** A curva declarada em DESIGN.md, exata — não uma aproximação. */
export const EASE = CustomEase.create("degrau", "0.22,1,0.36,1");

export const RISER = STAIR.RISER; // 18
export const TREAD = STAIR.TREAD; // 28

/** Duração e stagger na mesma proporção do degrau: 0,28s e 0,18s. */
export const DUR = TREAD / 100;
export const STAGGER = RISER / 100;

/** Escala do deslocamento. Mesmo degrau, menor no mobile. */
const SCALE_DESKTOP = 1.6;
const SCALE_MOBILE = 1.0;

/** Stagger máximo por grupo: em lista longa, o resto entra junto. */
const MAX_STAGGER = 6;

/** Teto de stagger em segundos — nenhum grupo demora mais que isso para assentar. */
const STAGGER_TETO = { each: STAGGER, amount: STAGGER * MAX_STAGGER } as const;

/**
 * O elemento já está na tela no momento em que o JS assume?
 *
 * Se está, **não animamos a entrada dele.** Medido em 3G: o HTML pinta aos
 * 468ms e o JS só assume 1,17s depois — animar aqui significa fazer sumir um
 * conteúdo que a pessoa já está lendo, para ele reaparecer. Isso é pior que
 * não animar, e contradiz a regra de que nada depende de animação para ser
 * lido. Abaixo da dobra o estado inicial é invisível para quem lê, então lá a
 * entrada acontece normalmente. Ver DEC-018.
 */
/**
 * Janela em que o JS ainda pode assumir sem que ninguém tenha lido nada.
 * Medido: sem throttle o HTML pinta aos ~120ms e o JS assume logo depois;
 * em 3G o HTML pinta aos ~470ms e o JS só chega 1,17s depois.
 */
const JANELA_HIDRATACAO = 800;

export function jaVisivel(el: Element): boolean {
  /* Se o JS assumiu rápido, ninguém teve tempo de ler — animar é seguro mesmo
     acima da dobra, e é aí que o hero e o caracol têm o gesto deles. */
  if (performance.now() < JANELA_HIDRATACAO) return false;

  const r = el.getBoundingClientRect();
  /* 0.7 e não 1.0: um elemento só espiando na borda inferior não foi lido —
     ele ainda vai ser rolado até. O limiar acompanha o `start: "top 82%"`
     do gatilho, então quem escapa daqui de fato anima. */
  return r.top < window.innerHeight * 0.7 && r.bottom > 0;
}

export type Direcao = "subindo" | "descendo";

/**
 * O gesto padrão de entrada. Substitui integralmente o fade-up genérico:
 * o offset X/Y é a proporção piso/espelho, então o bloco monta em escada.
 */
export function stepIn(
  alvos: gsap.TweenTarget,
  {
    direcao = "subindo",
    mobile = false,
    trigger,
  }: { direcao?: Direcao; mobile?: boolean; trigger?: Element } = {},
) {
  const escala = mobile ? SCALE_MOBILE : SCALE_DESKTOP;
  const sinal = direcao === "subindo" ? 1 : -1;

  return gsap.fromTo(
    alvos,
    {
      x: -TREAD * escala * 0.25 * sinal,
      y: RISER * escala * 0.25 * sinal,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: DUR,
      ease: EASE,
      stagger: STAGGER_TETO,
      scrollTrigger: trigger
        ? { trigger, start: "top 82%", once: true }
        : undefined,
    },
  );
}

/**
 * O traço técnico se construindo, atrelado ao scroll.
 *
 * Ordem: estrutura → degraus → cotas. Nunca aleatória — é a ordem em que um
 * projetista desenha, e é ela que carrega a mensagem de "isto é um projeto".
 * Easing linear: desenho mecânico não acelera.
 */
export function drawOnScroll(
  svg: SVGSVGElement,
  { scrub = true }: { scrub?: boolean } = {},
) {
  /* A axonometria tem grupos nomeados e é desenhada nessa ordem.
     O corte cotado é um SVG plano — ali a ordem é a do documento, que já é a
     ordem em que o desenho foi construído. Sem esse fallback o corte não
     traçava, que era o caso do bloco de autoridade das páginas de tipo. */
  const ordem = ["#contexto", "#estrutura", "#degraus", "#corrimao"];
  const grupos = ordem
    .map((id) => svg.querySelector<SVGGElement>(id))
    .filter((g): g is SVGGElement => Boolean(g));

  const escopo: ParentNode[] = grupos.length > 0 ? grupos : [svg];
  const SELETOR = "path, line, polyline";

  const paths = escopo
    .flatMap((g) => Array.from(g.querySelectorAll<SVGGeometryElement>(SELETOR)))
    // O valor da cota não anima — número não anima (MOTION_DIRECTION.md).
    .filter((el) => !el.closest("text"));

  if (paths.length === 0) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      start: "top 85%",
      end: "bottom 55%",
      scrub: scrub ? 0.6 : false,
    },
  });

  paths.forEach((path, i) => {
    const len = path.getTotalLength();
    if (!Number.isFinite(len) || len === 0) return;
    tl.fromTo(
      path,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 1, ease: "none" },
      i * 0.12,
    );
  });

  return tl;
}

/**
 * Exclusivo de /escadas/caracol. Usado uma vez, onde é literalmente verdade —
 * um efeito que aparece em todo lugar deixa de significar algo.
 */
export function spiralIn(
  svg: SVGSVGElement,
  { mobile = false }: { mobile?: boolean } = {},
) {
  const degraus = svg.querySelector<SVGGElement>("#degraus");
  if (!degraus) return null;
  const cunhas = Array.from(degraus.querySelectorAll<SVGPathElement>("path"));
  if (cunhas.length === 0) return null;

  const raio = mobile ? 64 : 120;
  const giro = mobile ? 180 : 360;

  return gsap.fromTo(
    cunhas,
    { rotate: -giro / cunhas.length - 14, y: raio, opacity: 0, transformOrigin: "50% 50%" },
    {
      rotate: 0,
      y: 0,
      opacity: 1,
      duration: DUR * 2,
      ease: EASE,
      stagger: STAGGER_TETO,
      scrollTrigger: { trigger: svg, start: "top 82%", once: true },
    },
  );
}

/**
 * Envolve qualquer animação no branch de movimento permitido.
 *
 * Com `prefers-reduced-motion: reduce` nada roda — e como o estado inicial só
 * é aplicado dentro daqui, nada fica escondido. É fallback completo, não
 * degradado.
 */
export function comMovimento(
  fn: (ctx: { mobile: boolean }) => void,
  escopo?: Element | null,
) {
  const mm = gsap.matchMedia(escopo ?? undefined);

  mm.add(
    {
      desktop: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      mobile: "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
    },
    (ctx) => {
      fn({ mobile: Boolean(ctx.conditions?.mobile) });
    },
  );

  return mm;
}

export { gsap, ScrollTrigger };
