/**
 * Pictograma de cada tipo de escada (DEC-051).
 *
 * A axonometria é desenho de prancha: certo para a página do tipo, ilegível a
 * 64px num card. Aqui cada tipo vira um pictograma de uma ideia só — o traço
 * que o distingue dos outros seis — num quadro comum: mesmo chão (y=56), mesma
 * altura de lance, mesmo traço de 1,75. A comparação entre os sete continua
 * honesta (DEC-009), só que no tamanho em que o card é lido.
 *
 * - Reta: degraus com a viga diagonal por baixo.
 * - Caracol: planta — o giro em torno do eixo é o que define o tipo.
 * - Leke: blocos soltos, sem nada por baixo — o balanço.
 * - Mista: dois lances e o patamar que troca a direção.
 * - Premium: a reta com corrimão e o brilho do polimento no piso.
 * - Espelho fechado: massa cheia até o chão — não se vê através.
 * - In loco: placa dobrada de espessura constante — a cascata monolítica.
 */

const CHAO = 56;
const PISO = 8;
const ESPELHO = 7;

/** Perfil em degraus a partir de (x, y), `n` degraus, subindo para `dir`. */
function perfil(x: number, y: number, n: number, dir: 1 | -1 = 1) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < n; i++) {
    y -= ESPELHO;
    d += `V${y}`;
    x += PISO * dir;
    d += `H${x}`;
  }
  return { d, x, y };
}

function Reta() {
  const p = perfil(8, CHAO, 6);
  return (
    <>
      <path d={p.d} />
      <path d={`M16 ${CHAO}L${p.x} ${p.y + ESPELHO}V${p.y}`} />
    </>
  );
}

function Caracol() {
  const raios = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return `M${32 + Math.cos(a) * 4} ${34 + Math.sin(a) * 4}L${32 + Math.cos(a) * 22} ${34 + Math.sin(a) * 22}`;
  });
  return (
    <>
      <circle cx="32" cy="34" r="22" />
      <circle cx="32" cy="34" r="4" />
      <path d={raios.join("")} />
      {/* O sentido da subida. */}
      <path d="M41 8.5l4 3.5-4 3.5" />
    </>
  );
}

function Leke() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={8 + i * PISO} y={CHAO - (i + 1) * ESPELHO} width={PISO - 1.5} height="3" />
      ))}
      <path d={`M60 8V${CHAO}`} strokeDasharray="2 3" />
    </>
  );
}

function Mista() {
  const a = perfil(8, CHAO, 3);
  const b = perfil(52, a.y - 0, 3, -1);
  return (
    <>
      <path d={`${a.d}H56`} />
      <path d={b.d.replace(/^M52/, "M56")} />
      <path d={`M${a.x} ${a.y + 3}H56`} strokeDasharray="2 3" />
    </>
  );
}

function Premium() {
  const p = perfil(8, CHAO, 6);
  return (
    <>
      <path d={p.d} />
      <path d={`M16 ${CHAO}L${p.x} ${p.y + ESPELHO}V${p.y}`} />
      {/* Corrimão a 12 acima do piso, paralelo ao lance, e dois montantes. */}
      <path d="M12 37L52 2M12 49V37M52 14V2" />
      {/* O brilho do polimento. */}
      <path d={`M19 ${CHAO - 15.5}h3M35 ${CHAO - 29.5}h3`} strokeWidth="1" />
    </>
  );
}

function EspelhoFechado() {
  const p = perfil(8, CHAO, 6);
  return <path d={`${p.d}V${CHAO}Z`} fill="currentColor" fillOpacity="0.14" />;
}

function InLoco() {
  const topo = perfil(8, CHAO, 6);
  return (
    <>
      <path d={topo.d} />
      {/* A face de baixo é o mesmo perfil deslocado (4, 4): espessura constante,
          sem viga — a placa dobrada. Escrita à mão porque começa cortada no chão. */}
      <path d="M12 56V53H20V46H28V39H36V32H44V25H52V18H56V14" />
    </>
  );
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
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="miter"
      strokeLinecap="square"
    >
      <path d={`M4 ${CHAO}H60`} strokeWidth="1" opacity="0.35" />
      <Desenho />
    </svg>
  );
}
