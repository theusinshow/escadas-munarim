"use client";

import { useState } from "react";
import { GaleriaTipo } from "@/components/media/GaleriaTipo";
import { Chip } from "@/components/ui/Chip";
import { fotosDo, fotosIntercaladas } from "@/content/galeria";
import { tipoSlugs, tipos } from "@/content/tipos";

/**
 * Galeria geral, filtrável por tipo (DEC-048).
 *
 * Sem filtro, as fotos vêm intercaladas por tipo — a página abre comparando, não
 * com sete retas seguidas. O filtro só mostra os tipos que têm foto.
 */

const TODAS = fotosIntercaladas(tipoSlugs);
const COM_FOTO = tipos.filter((t) => fotosDo(t.slug).length > 0);

export function ObrasFilter() {
  const [ativo, setAtivo] = useState<string | null>(null);
  const tipoAtivo = tipos.find((t) => t.slug === ativo);
  const fotos = ativo ? fotosDo(ativo) : TODAS;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        <Chip active={ativo === null} onClick={() => setAtivo(null)}>
          Todos <span className="ml-1 opacity-60">{TODAS.length}</span>
        </Chip>
        {COM_FOTO.map((tipo) => (
          <Chip
            key={tipo.slug}
            active={ativo === tipo.slug}
            onClick={() => setAtivo(tipo.slug)}
          >
            {tipo.nome} <span className="ml-1 opacity-60">{fotosDo(tipo.slug).length}</span>
          </Chip>
        ))}
      </div>

      <p className="sr-only" role="status">
        {fotos.length} fotos{tipoAtivo ? ` de escada ${tipoAtivo.nome.toLowerCase()}` : ""}
      </p>

      <div className="mt-10">
        {/* `key`: trocar o filtro remonta a galeria e fecha um lightbox aberto. */}
        <GaleriaTipo key={ativo ?? "todas"} fotos={fotos} nome={tipoAtivo?.nome ?? "Todos os tipos"} />
      </div>
    </div>
  );
}
