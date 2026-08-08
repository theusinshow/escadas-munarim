import { Axonometry } from "@/components/technical/Axonometry";

/**
 * Slot de imagem ainda não preenchido.
 *
 * Regra do `MEDIA_PLAN.md`: quando um asset reprova na verificação, ou quando
 * o material do cliente ainda não chegou, **o lugar dele é ocupado pelo desenho
 * técnico** — não por foto de banco, não por caixa cinza, não por imagem
 * gerada que não passou no crivo.
 *
 * O rótulo com o código `CNT-` fica visível de propósito: placeholder neste
 * projeto é slot marcado, nunca texto verossímil.
 */
export function SlotFoto({
  slug,
  titulo,
  pendencia,
  className,
}: {
  /** Tipo de escada cujo desenho ocupa o lugar da foto. */
  slug: string;
  titulo: string;
  pendencia: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="bg-surface p-6">
        <Axonometry slug={slug} title={titulo} className="aspect-square w-full" />
      </div>
      <p className="spec mt-3 border-l-2 border-accent pl-4 text-muted">{pendencia}</p>
    </div>
  );
}
