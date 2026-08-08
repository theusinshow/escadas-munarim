"use client";

import { useEffect, useState } from "react";

/**
 * Relógio local da fábrica, em `America/Sao_Paulo`.
 *
 * É a hora de agora — não é horário de atendimento. O que o visitante de fato
 * quer saber ("a que horas eles respondem?") depende de `CNT-011`, que o
 * cliente ainda não informou. Quando informar, este slot vira mais útil.
 *
 * Renderiza vazio no servidor e preenche depois da hidratação: hora de servidor
 * e hora de cliente divergem, e forçar isso no HTML dá erro de hidratação.
 * O `min-width` reserva o espaço para o relógio não empurrar o layout ao chegar.
 */
export function HoraLocal() {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const ler = () =>
      setHora(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      );
    ler();
    const id = setInterval(ler, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="spec text-muted">
      <span className="hidden md:inline">Hora local </span>
      <span className="inline-block min-w-[5ch] text-right tabular-nums">
        {hora ?? " "}
      </span>
    </p>
  );
}
