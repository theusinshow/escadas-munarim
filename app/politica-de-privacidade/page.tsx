import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: false, follow: true },
};

export default function PoliticaPage() {
  return (
    <div className="container-site py-24 lg:py-32">
      <h1 className="measure-display">Política de Privacidade</h1>

      {/* CNT-008 — não publicar texto jurídico genérico como se fosse aprovado. */}
      <p className="spec mt-8 border-l border-accent pl-4 text-muted">
        AGUARDANDO REVISÃO E APROVAÇÃO DO CLIENTE (CNT-008)
      </p>

      <p className="measure mt-8 text-muted">
        Esta página será publicada com o texto revisado e aprovado pela empresa. O
        formulário de orçamento coleta nome e telefone, então a LGPD se aplica — o
        conteúdo precisa refletir o tratamento real desses dados, incluindo quem é o
        controlador.
      </p>
    </div>
  );
}
