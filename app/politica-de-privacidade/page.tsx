import type { Metadata } from "next";
import { addressLine, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: false, follow: true },
};

/**
 * Política de privacidade (DEC-091). Descreve só o que o código faz — e foi
 * conferido nele: site estático, sem analytics, sem cookie próprio, sem
 * armazenamento no navegador; o formulário monta a mensagem no aparelho e abre
 * o WhatsApp. O único serviço de terceiros é o mapa do Google em /empresa
 * (DEC-104). Razão social e CNPJ do controlador entram quando chegarem
 * (CNT-001); o texto final passa pela revisão da empresa (CNT-008).
 */
export default function PoliticaPage() {
  return (
    <div className="container-site py-24 lg:py-32">
      <h1 className="measure-display">Política de Privacidade</h1>

      <div className="measure mt-12 space-y-10 text-muted">
        <section>
          <h2 className="text-xl text-text">O que este site guarda</h2>
          <p className="mt-4">
            Nada. O site da {site.name} não tem cadastro, não define cookies próprios e não
            usa ferramentas de análise de visitas. As fotos e as fontes são servidas pelo
            próprio site. A única exceção é o mapa da página Sobre, explicado abaixo.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-text">O mapa da página Sobre</h2>
          <p className="mt-4">
            A página Sobre mostra a nossa localização em um mapa do Google. Quando o mapa
            carrega, o seu navegador se conecta ao Google, que pode registrar dados como o
            endereço IP e usar cookies próprios, conforme a{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline underline-offset-4"
            >
              política de privacidade do Google
            </a>
            . O site da {site.name} não recebe esses dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-text">O formulário de orçamento</h2>
          <p className="mt-4">
            O formulário não envia nada para o site. Ele monta uma mensagem no seu próprio
            aparelho, com o que você preencheu (nome, telefone, cidade da obra, tipo de
            escada, pé-direito, prazo e observações), e abre o WhatsApp com essa mensagem
            pronta. Você confere e decide se envia.
          </p>
          <p className="mt-4">
            Se enviar, a conversa passa a acontecer no WhatsApp, entre você e a equipe de
            vendas da {site.name}. Os dados são usados só para responder ao seu pedido e
            preparar o orçamento.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-text">Seus direitos</h2>
          <p className="mt-4">
            Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir para
            saber quais dados seus a empresa tem, corrigi-los ou apagá-los. Escreva para{" "}
            <a href={`mailto:${site.contact.email}`} className="text-link underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl text-text">Quem é o responsável</h2>
          <p className="mt-4">
            {site.name} · {addressLine}
          </p>
        </section>
      </div>
    </div>
  );
}
