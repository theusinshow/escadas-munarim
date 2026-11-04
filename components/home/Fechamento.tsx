import { Foto } from "@/components/media/Foto";
import { ButtonLink } from "@/components/ui/Button";
import { capaDo } from "@/content/galeria";
import { site, whatsappLink } from "@/lib/site";

/**
 * Fechamento — o único pedido de orçamento da home, depois de toda a prova
 * (DEC-001). Refeito em DEC-051 e DEC-063.
 *
 * Duas metades de borda reta: o painel sólido de tinta à esquerda, a foto
 * limpa à direita. O véu em degradê que escurecia a foto para o painel saiu —
 * ele lia como um borrão azul sobre a escada (DEC-063). Sem véu, a foto não
 * precisa competir com o texto, e o painel sólido garante 14:1 sempre.
 *
 * A foto é a capa do tipo "in loco" — a escada mais escultórica do acervo.
 */

const FOTO = capaDo("in-loco") ?? capaDo("reta");

export function Fechamento() {
  return (
    <section className="grid bg-text text-primary-fg lg:min-h-[86svh] lg:grid-cols-2">
      <div className="flex items-center px-6 py-20 lg:px-[max(2.5rem,calc((100vw-var(--container))/2+2.5rem))] lg:py-28">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-primary-fg-muted">
            {site.address.city} e Grande Florianópolis
          </p>
          <h2 className="mt-4">Conte o seu vão. A gente diz o que cabe nele.</h2>
          <p className="mt-5 text-lg text-primary-fg-muted">
            O formulário monta a mensagem e abre o seu WhatsApp já preenchido — a
            conversa começa com o que a gente precisa para orçar.
          </p>
          <div className="sobre-escuro mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/orcamento" variant="claro">
              Pedir orçamento
            </ButtonLink>
            <ButtonLink
              href={whatsappLink("Olá! Quero conversar sobre uma escada de concreto.")}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>

      {FOTO && (
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <Foto foto={FOTO} fill sizes="(min-width: 1024px) 50vw, 100vw" imgClassName="object-[50%_35%]" />
        </div>
      )}
    </section>
  );
}
