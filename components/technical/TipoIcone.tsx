/**
 * Pictograma de cada tipo de escada (DEC-051 → DEC-063).
 *
 * v2: em projeção oblíqua cabinet, a mesma convenção da axonometria das
 * páginas de tipo (DEC-016). O perfil lateral é o traço cheio; a face de trás
 * e as arestas de profundidade entram em traço fraco, como linha oculta de
 * prancha. Mesmo chão (y=56), mesmo piso/espelho, mesma profundidade e mesmo
 * traço nos sete — a comparação continua honesta (DEC-009).
 *
 * - Reta: lance único sobre a viga inclinada.
 * - Caracol: degraus em leque girando em torno do eixo.
 * - Leke: blocos soltos engastados na parede, nada por baixo.
 * - Mista: dois lances e o patamar entre eles.
 * - Premium: a reta com corrimão e o brilho do polimento.
 * - Espelho fechado: massa cheia até o chão.
 * - In loco: placa dobrada de espessura constante.
 */

type P = readonly [number, number];

const CHAO = 56;
const PISO = 8;
const ESPELHO = 7;
/** Profundidade oblíqua: 45° com redução de metade, como na prancha. */
const DX = 7;
const DY = -5;

const caminho = (pts: readonly P[], fechar = false) =>
  `M${pts.map(([x, y]) => `${x} ${y}`).join("L")}${fechar ? "Z" : ""}`;
const atras = (pts: readonly P[]) => pts.map(([x, y]) => [x + DX, y + DY] as const);

/** Os cantos de um lance: sobe um espelho, anda um piso, `n` vezes. */
function lance(x: number, y: number, n: number): P[] {
  const pts: P[] = [[x, y]];
  for (let i = 0; i < n; i++) {
    y -= ESPELHO;
    pts.push([x, y]);
    x += PISO;
    pts.push([x, y]);
  }
  return pts;
}

/** Um sólido extrudado em profundidade: face de trás, arestas e face da frente. */
function Solido({ pts, cheio = false }: { pts: readonly P[]; cheio?: boolean }) {
  const tras = atras(pts);
  const arestas = pts.map(([x, y]) => `M${x} ${y}l${DX} ${DY}`).join("");
  return (
    <>
      <path d={caminho(tras, true)} className="tipo-oculta" />
      <path d={arestas} className="tipo-oculta" />
      <path d={caminho(pts, true)} fill="currentColor" fillOpacity={cheio ? 0.16 : 0.06} />
    </>
  );
}

function Reta() {
  const l = lance(8, CHAO, 6);
  const [xt, yt] = l[l.length - 1];
  return <Solido pts={[...l, [xt, yt + 6], [16, CHAO]]} />;
}

function Caracol() {
  /* Elevação: o eixo central e os degraus em balanço girando em volta dele.
     A largura aparente de cada degrau é o cosseno do giro — encurta quando o
     degrau passa para a frente ou para trás do eixo, e é esse vai-e-vem que se
     lê como caracol. Cada degrau é extrudado como os outros pictogramas. */
  const EIXO = 36;
  const R = 24;
  const N = 8;
  const passo = (CHAO - 10) / N;
  return (
    <>
      {Array.from({ length: N }, (_, k) => {
        const y = CHAO - passo * (k + 1);
        const largura = Math.cos((k / N) * Math.PI * 2 + Math.PI) * R;
        if (Math.abs(largura) < 3) {
          /* De frente para quem olha: o degrau vira só a face, sem balanço. */
          return <path key={k} d={`M${EIXO - 3} ${y}h6`} />;
        }
        const x1 = Math.min(EIXO, EIXO + largura);
        const x2 = Math.max(EIXO, EIXO + largura);
        return (
          <Solido
            key={k}
            pts={[
              [x1, y],
              [x2, y],
              [x2, y + 2.5],
              [x1, y + 2.5],
            ]}
          />
        );
      })}
      <path d={`M${EIXO} ${CHAO}V6`} strokeWidth="1.75" />
    </>
  );
}

function Leke() {
  return (
    <>
      <path d={`M${8 + 6 * PISO + DX} 6V${CHAO + DY}`} className="tipo-oculta" />
      {Array.from({ length: 6 }, (_, i) => {
        const x = 8 + i * PISO;
        const y = CHAO - (i + 1) * ESPELHO;
        return (
          <Solido
            key={i}
            pts={[
              [x, y],
              [x + PISO - 1.5, y],
              [x + PISO - 1.5, y + 3],
              [x, y + 3],
            ]}
          />
        );
      })}
    </>
  );
}

function Mista() {
  const a = lance(8, CHAO, 3);
  const [xa, ya] = a[a.length - 1];
  const b = lance(xa + 12, ya, 3);
  const [xb, yb] = b[b.length - 1];
  return (
    <Solido
      pts={[...a, ...b.slice(1), [xb, yb + 6], [xa + 14, ya + 6], [xa, ya + 6], [16, CHAO]]}
    />
  );
}

function Premium() {
  const l = lance(8, CHAO, 6);
  const [xt, yt] = l[l.length - 1];
  /* Corrimão paralelo ao lance, um espelho e meio acima do bocel. */
  const corrimao: P[] = [
    [12, 42],
    [xt - 4, 42 - ((xt - 16) * ESPELHO) / PISO],
  ];
  return (
    <>
      <Solido pts={[...l, [xt, yt + 6], [16, CHAO]]} />
      <path d={caminho(atras(corrimao))} className="tipo-oculta" />
      <path
        d={`${caminho(corrimao)}M12 ${CHAO - ESPELHO}V${corrimao[0][1]}M${xt - 4} ${yt}V${corrimao[1][1]}`}
      />
      <path d={`M19 ${CHAO - 15.5}h3M35 ${CHAO - 29.5}h3`} strokeWidth="1" />
    </>
  );
}

function EspelhoFechado() {
  const l = lance(8, CHAO, 6);
  const [xt] = l[l.length - 1];
  return <Solido pts={[...l, [xt, CHAO]]} cheio />;
}

function InLoco() {
  const topo = lance(8, CHAO, 6);
  /* A face de baixo é o mesmo perfil deslocado (4, 4): espessura constante,
     sem viga — a placa dobrada. Corta no chão. */
  const fundo = topo
    .slice(1)
    .map(([x, y]) => [x + 4, y + 4] as const)
    .filter(([, y]) => y < CHAO)
    .reverse();
  const [xt, yt] = topo[topo.length - 1];
  return <Solido pts={[...topo, [xt, yt + 4], ...fundo.slice(1), [12, CHAO]]} />;
}

const DESENHO: Record<string, () => React.ReactNode> = {
  reta: Reta,
  caracol: Caracol,
  leke: Leke,
  mista: Mista,
  premium: Premium,
  "espelho-fechado": EspelhoFechado,
  "in-loco": InLoco,
};

export function TipoIcone({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const Desenho = DESENHO[slug];
  if (!Desenho) return null;
  return (
    <svg
      viewBox="0 0 72 64"
      role="img"
      aria-label={title}
      className={`tipo-icone ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="miter"
      strokeLinecap="square"
    >
      <path d={`M2 ${CHAO}H70`} strokeWidth="1" opacity="0.3" />
      <Desenho />
    </svg>
  );
}
