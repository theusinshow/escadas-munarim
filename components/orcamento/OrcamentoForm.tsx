"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, TEXTAREA_CLASS } from "@/components/ui/FormField";
import { TextLink } from "@/components/ui/TextLink";
import { tipos } from "@/content/tipos";
import { site, whatsappLink } from "@/lib/site";

/**
 * Formulário qualificador (DEC-007).
 *
 * Sem backend: valida no cliente, monta a mensagem e abre o WhatsApp já
 * preenchido. O lead chega com tipo, pé-direito, cidade e prazo — que é o
 * mínimo para orçar — no canal que a empresa já opera.
 *
 * O fallback é obrigatório: em desktop sem WhatsApp o `wa.me` pode não abrir,
 * e ninguém pode ficar em beco sem saída. Depois de enviar, a mensagem montada
 * fica na tela com botão de copiar, mais telefone e e-mail.
 */

const CIDADES = ["São José", "Florianópolis", "Palhoça", "Biguaçu", "Outra cidade"];
const PRAZOS = ["O quanto antes", "Nos próximos 1 a 3 meses", "Só pesquisando ainda"];

type Campos = {
  nome: string;
  whatsapp: string;
  cidade: string;
  tipo: string;
  peDireito: string;
  prazo: string;
  mensagem: string;
};

const VAZIO: Campos = {
  nome: "",
  whatsapp: "",
  cidade: "",
  tipo: "",
  peDireito: "",
  prazo: "",
  mensagem: "",
};

/** Erros dizem o que fazer, não o que falhou. */
function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const e: Partial<Record<keyof Campos, string>> = {};

  if (c.nome.trim().length < 2) e.nome = "Escreva seu nome para a gente saber com quem fala.";

  const digitos = c.whatsapp.replace(/\D/g, "");
  if (digitos.length < 10)
    e.whatsapp = "Informe o WhatsApp com DDD, por exemplo (48) 99999-0000.";

  if (!c.cidade) e.cidade = "Escolha a cidade da obra.";
  if (!c.tipo) e.tipo = "Escolha um tipo — ou marque “não sei ainda”.";

  if (c.peDireito.trim()) {
    // Aceita vírgula e ponto. Nunca rejeitar por formato: normalizar.
    const n = Number(c.peDireito.replace(",", ".").replace(/[^\d.]/g, ""));
    if (!Number.isFinite(n) || n <= 0)
      e.peDireito = "Informe o pé-direito em metros, por exemplo 2,80.";
    else if (n < 1.5 || n > 12)
      e.peDireito = "Confira o valor: o pé-direito é em metros, por exemplo 2,80.";
  }

  return e;
}

function montarMensagem(c: Campos): string {
  const tipoNome =
    c.tipo === "nao-sei"
      ? "Ainda não sei"
      : (tipos.find((t) => t.slug === c.tipo)?.nome ?? c.tipo);

  const linhas = [
    "Olá! Vim pelo site e gostaria de um orçamento de escada.",
    "",
    `Nome: ${c.nome.trim()}`,
    `Cidade da obra: ${c.cidade}`,
    `Tipo de escada: ${tipoNome}`,
  ];

  if (c.peDireito.trim())
    linhas.push(`Pé-direito aproximado: ${c.peDireito.trim().replace(".", ",")} m`);
  if (c.prazo) linhas.push(`Prazo: ${c.prazo}`);
  if (c.mensagem.trim()) linhas.push("", c.mensagem.trim());

  return linhas.join("\n");
}

export function OrcamentoForm() {
  const params = useSearchParams();
  const tipoInicial = params.get("tipo") ?? "";

  const [campos, setCampos] = useState<Campos>({
    ...VAZIO,
    tipo: tipos.some((t) => t.slug === tipoInicial) ? tipoInicial : "",
  });
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviado, setEnviado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  const set = (campo: keyof Campos) => (valor: string) =>
    setCampos((c) => ({ ...c, [campo]: valor }));

  const primeiroErro = useMemo(() => Object.keys(erros)[0], [erros]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const novos = validar(campos);
    setErros(novos);
    if (Object.keys(novos).length > 0) {
      document.getElementById(Object.keys(novos)[0])?.focus();
      return;
    }
    const texto = montarMensagem(campos);
    setEnviado(texto);
    setCopiado(false);
    window.open(whatsappLink(texto), "_blank", "noopener,noreferrer");
  }

  async function copiar() {
    if (!enviado) return;
    try {
      await navigator.clipboard.writeText(enviado);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 lg:col-span-7">
        <FormField id="nome" label="Seu nome" required error={erros.nome}>
          {(p) => (
            <input
              {...p}
              type="text"
              autoComplete="name"
              value={campos.nome}
              onChange={(e) => set("nome")(e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id="whatsapp"
          label="Seu WhatsApp"
          hint="Com DDD. É por aqui que a gente responde."
          required
          error={erros.whatsapp}
        >
          {(p) => (
            <input
              {...p}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(48) 99999-0000"
              value={campos.whatsapp}
              onChange={(e) => set("whatsapp")(e.target.value)}
            />
          )}
        </FormField>

        <FormField id="cidade" label="Cidade da obra" required error={erros.cidade}>
          {(p) => (
            <select
              {...p}
              value={campos.cidade}
              onChange={(e) => set("cidade")(e.target.value)}
            >
              <option value="">Selecione</option>
              {CIDADES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField id="tipo" label="Tipo de escada" required error={erros.tipo}>
          {(p) => (
            <select
              {...p}
              value={campos.tipo}
              onChange={(e) => set("tipo")(e.target.value)}
            >
              <option value="">Selecione</option>
              {tipos.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.nome}
                </option>
              ))}
              <option value="nao-sei">Não sei ainda</option>
            </select>
          )}
        </FormField>

        <FormField
          id="peDireito"
          label="Pé-direito aproximado"
          hint="A altura do piso de baixo até o piso de cima, em metros. Se não souber, deixe em branco."
          error={erros.peDireito}
        >
          {(p) => (
            <input
              {...p}
              type="text"
              inputMode="decimal"
              placeholder="2,80"
              value={campos.peDireito}
              onChange={(e) => set("peDireito")(e.target.value)}
            />
          )}
        </FormField>

        <FormField id="prazo" label="Quando você precisa">
          {(p) => (
            <select
              {...p}
              value={campos.prazo}
              onChange={(e) => set("prazo")(e.target.value)}
            >
              <option value="">Selecione</option>
              {PRAZOS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField id="mensagem" label="Algo mais que a gente deva saber">
          {(p) => (
            <textarea
              {...p}
              className={TEXTAREA_CLASS}
              rows={4}
              value={campos.mensagem}
              onChange={(e) => set("mensagem")(e.target.value)}
            />
          )}
        </FormField>

        <div>
          <Button type="submit">Enviar pelo WhatsApp</Button>
        </div>

        <p aria-live="polite" className="sr-only">
          {primeiroErro ? "O formulário tem campos a corrigir." : ""}
        </p>

        <p className="text-sm text-muted">
          Ao enviar, seus dados vão direto para o WhatsApp da Munarim. Nada fica
          armazenado neste site.{" "}
          <TextLink href="/politica-de-privacidade">Política de privacidade</TextLink>.
        </p>
      </form>

      <aside className="lg:col-span-5">
        {enviado ? (
          /* Fallback obrigatório: se o WhatsApp não abriu, a mensagem está aqui. */
          <div className="border-l-2 border-accent pl-6" aria-live="polite">
            <p className="eyebrow">Abrimos o WhatsApp em outra aba</p>
            <p className="measure mt-4 text-muted">
              Se nada abriu, copie a mensagem abaixo e mande para{" "}
              {site.contact.whatsapp} — ou use o telefone e o e-mail ao lado.
            </p>
            <pre className="mt-6 overflow-x-auto whitespace-pre-wrap bg-surface p-4 font-mono text-sm">
              {enviado}
            </pre>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button type="button" variant="secondary" onClick={copiar}>
                {copiado ? "Mensagem copiada" : "Copiar mensagem"}
              </Button>
              <TextLink href={site.contact.phoneHref}>{site.contact.phone}</TextLink>
            </div>
          </div>
        ) : (
          <div className="border-l-2 border-border pl-6">
            <p className="eyebrow">O que acontece depois</p>
            <ol className="measure mt-4 space-y-3 text-muted">
              <li>
                <span className="spec">01</span> — O formulário monta a mensagem e abre o
                seu WhatsApp já preenchido.
              </li>
              <li>
                <span className="spec">02</span> — Você confere e envia. A conversa começa
                com o que a Munarim precisa para orçar.
              </li>
              <li>
                <span className="spec">03</span> — Se faltar medida, alguém explica o que
                medir antes de qualquer visita.
              </li>
            </ol>
            <p className="spec mt-6 text-muted">
              TEMPO MÉDIO DE RESPOSTA A CONFIRMAR (CNT-005)
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
