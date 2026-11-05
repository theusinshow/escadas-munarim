/** Rótulo de seção com o fio que se desenha ao entrar (DEC-067). Não é título. */
export function Rotulo({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`rotulo-secao ${className}`}>{children}</p>;
}
