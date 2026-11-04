import { Foto } from "@/components/media/Foto";
import { ButtonLink } from "@/components/ui/Button";
import { capaDo } from "@/content/galeria";
import { site, whatsappLink } from "@/lib/site";

/**
 * Fechamento — o único pedido de orçamento da home, depois de toda a prova
 * (DEC-001). Refeito em DEC-051.
 *
 * Foto vertical de escada sangrando a seção inteira, e o texto num painel
 * **sólido** de tinta à esquerda. Vidro (backdrop-blur) foi considerado e
 * recusado: está nas anti-referências do `PRODUCT.md`, e texto sobre foto
 * borrada perde contraste conforme a foto troca. O painel sólido garante
 * 14:1 em qualquer imagem.
 *
 * A foto é a capa do tipo "in loco" — a escada mais escultórica do acervo.
 */

const FOTO = capaDo("in-loco") ?? capaDo("reta");

export function Fechamento() {
  return (
    <section className="relative isolate overflow-hidden bg-text text-primary-fg">
      {FOTO && (
        <div className="absolute inset-0 -z-10">
          <Foto foto={FOTO} fill sizes="100vw" imgClassName="object-[50%_35%]" />
          {/* Escurece só a borda do painel, para a foto não brigar com ele. */}
          <div className="absolute inset-0 bg-gradient-to-r from-text via-text/40 to-transparent" />
        </div>
      )}

      <div className="container-site flex min-h-[78svh] items-center py-20">
        <div className="max-w-xl bg-text p-8 lg:p-12">
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
    </section>
  );
}
