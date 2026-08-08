"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { tipos } from "@/content/tipos";

/**
 * Filtro por tipo da galeria de obras.
 *
 * O grid ainda não existe: depende de foto real (`CNT-003`) ou de asset gerado
 * aprovado na verificação de `MEDIA_PLAN.md`. O filtro já está de pé porque é
 * estrutura, não conteúdo — e o estado vazio diz a verdade em vez de mostrar
 * uma galeria inventada.
 */
export function ObrasFilter() {
  const [ativo, setAtivo] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip active={ativo === null} onClick={() => setAtivo(null)}>
          Todos
        </Chip>
        {tipos.map((tipo) => (
          <Chip
            key={tipo.slug}
            active={ativo === tipo.slug}
            onClick={() => setAtivo(tipo.slug)}
          >
            {tipo.nome}
          </Chip>
        ))}
      </div>

      <p className="spec mt-10 border-l-2 border-accent pl-4 text-muted" role="status">
        {ativo
          ? `SEM OBRAS PUBLICADAS PARA "${tipos.find((t) => t.slug === ativo)?.nome.toUpperCase()}" — AGUARDANDO ACERVO (CNT-003)`
          : "GALERIA AGUARDANDO ACERVO FOTOGRÁFICO DO CLIENTE (CNT-003)"}
      </p>
    </div>
  );
}
