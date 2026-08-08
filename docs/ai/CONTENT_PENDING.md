# Content Pending

## Status

Relevant content is missing and may affect implementation.

O discovery classificou o conteúdo como **"estruturar tudo do zero"**: o site atual não tem copy
aproveitável além dos fatos de negócio. Toda a copy das 8 rotas é entregável deste projeto — o que
está listado abaixo é o que **só o cliente pode fornecer**, e que não pode ser inventado.

**Regra que atravessa todos os itens:** placeholder é visível, nunca verossímil. Um depoimento
pendente aparece como slot marcado, jamais como texto plausível inventado.

| ID | Item | Bloqueante? | Impacta |
|---|---|---|---|
| CNT-001 | Razão social e CNPJ | sim, para go-live | rodapé, JSON-LD, política de privacidade |
| CNT-002 | Ano de fundação (data-base dos "15 anos") | sim | `/empresa`, `/`, todas as metas |
| CNT-003 | Fotos reais de obras entregues | não (mitigado por `DEC-008`) | `/obras`, galerias de tipo |
| CNT-004 | Foto da fábrica em São José | não | `/empresa` |
| CNT-005 | Prazos reais por etapa | sim, para o bloco existir | `/como-funciona`, `/orcamento`, `/duvidas` |
| CNT-006 | Validação técnica do FAQ | sim | `/duvidas` |
| CNT-007 | Lista de URLs indexadas do WordPress | sim, para go-live | redirects 301 |
| CNT-008 | Aprovação da política de privacidade | sim, para go-live | `/politica-de-privacidade` |
| CNT-009 | Descrição e cotas reais dos 7 tipos | sim | as 7 páginas de tipo, MED-003 |
| CNT-010 | Logo em vetor (SVG) | sim | global, favicon, OG |
| CNT-011 | Horário de atendimento | não | JSON-LD `LocalBusiness`, rodapé |
| CNT-012 | Autorização para citar construtoras clientes | não | prova social — destravaria muito |
| CNT-013 | Acesso ao DNS / hospedagem | sim, para go-live | deploy |
| CNT-014 | Quem instala: equipe própria ou parceiro | sim | `/como-funciona`, `/empresa`, home, FAQ |

---

## Items

### CNT-001 — Razão social e CNPJ

**Type:** dado cadastral
**Status:** Not received
**Impact:** rodapé sem identificação legal e `LocalBusiness` incompleto passam exatamente a impressão
de amadorismo que o site existe para combater. Bloqueia go-live.
**Used in:** rodapé, JSON-LD, `/politica-de-privacidade`
**Current placeholder:** nenhum — o bloco não é renderizado até o dado chegar.
**Requirements:** razão social completa e CNPJ formatado.

---

### CNT-002 — Ano de fundação

**Type:** fato de negócio
**Status:** Not received
**Impact:** **o site atual se contradiz** — a home diz "13 anos", a página Nossa Empresa diz "15 anos"
e o selo do logo diz "15 ANOS". Adotamos 15 (`DEC-004`), mas sem data-base o número envelhece sozinho
e volta a mentir em 2027.
**Used in:** `/empresa`, `/`, meta descriptions
**Current placeholder:** "15 anos" fixo — **precisa virar cálculo a partir do ano de fundação.**
**Requirements:** ano (e mês, se possível) de fundação. Confirmar de onde saiu o "13" da home.

---

### CNT-003 — Fotos reais de obras entregues

**Type:** asset visual
**Status:** Not received
**Impact:** é a prova visual do negócio. Sem ela, `/obras` e as galerias dos 7 tipos rodam com
material gerado (`DEC-008`) — funciona, mas é o maior risco de credibilidade do projeto, porque o
público é leigo, desconfiado, e imagem sintética erra geometria estrutural.
**Used in:** `/obras`, `/escadas/[tipo]` galeria, `/` bloco de obras
**Current placeholder:** assets `gen-` conforme `MEDIA_PLAN.md`, todos marcados para substituição.
**Requirements:** 12–20 fotos de escadas instaladas, identificando o tipo de cada uma. Celular serve —
luz natural, sem flash, escada inteira no enquadramento, sem morador na foto. Confirmar autorização
do proprietário para uso das imagens.

---

### CNT-004 — Foto da fábrica em São José

**Type:** asset visual
**Status:** Not received
**Impact:** a única prova de estrutura física que existiria. Vale mais que qualquer asset gerado do
plano de mídia — estrutura de produção visível é o argumento que separa fabricante de intermediário.
**Used in:** `/empresa`, `/como-funciona` passo 03
**Current placeholder:** ilustração vetorial do processo (MED-005).
**Requirements:** 4–6 fotos: fôrmas, peça pré-moldada, área de polimento, pátio ou caminhão.

---

### CNT-005 — Prazos reais por etapa

**Type:** fato operacional
**Status:** Not received
**Impact:** "quanto tempo leva" é a objeção nº 3 do público. Sem número real, o bloco de prazo
**não é publicado** — não existe prazo estimado por conta própria.
**Used in:** `/como-funciona`, `/orcamento` ("o que acontece depois"), `/duvidas`
**Current placeholder:** bloco omitido.
**Requirements:** prazo médio de medição→projeto, projeto→fabricação, fabricação→instalação. E o
tempo médio de resposta a um orçamento no WhatsApp.

---

### CNT-006 — Validação técnica do FAQ

**Type:** revisão de conteúdo
**Status:** Not received
**Impact:** `/duvidas` é a página que sustenta a autoridade técnica e captura busca de cauda longa.
Uma resposta tecnicamente errada sobre carga, pé-direito ou fixação destrói a credibilidade que o
site inteiro tenta construir — e, em produto estrutural, pode gerar responsabilidade real.
**Used in:** `/duvidas`, `FAQPage` JSON-LD
**Current placeholder:** rascunho marcado como não publicável até a revisão.
**Requirements:** alguém da empresa lê e corrige as respostas sobre medidas, estrutura, peso e
instalação. É a pendência mais barata de resolver e uma das mais importantes.

---

### CNT-007 — Lista de URLs indexadas do WordPress

**Type:** dado técnico
**Status:** Not received
**Impact:** o blog é cortado (`DEC-006`). Sem o mapa completo de URLs, o corte derruba o SEO
acumulado em 404. Bloqueia go-live.
**Used in:** `next.config` redirects
**Current placeholder:** mapa parcial com as 4 rotas conhecidas, em `SITE_ARCHITECTURE.md`.
**Requirements:** exportar do Google Search Console ou do sitemap atual a lista de URLs indexadas.

---

### CNT-008 — Aprovação da política de privacidade

**Type:** jurídico
**Status:** Not received
**Impact:** o formulário coleta nome e telefone — LGPD se aplica. Publicar texto jurídico genérico
como se fosse aprovado seria exatamente o tipo de conteúdo inventado que este projeto não produz.
**Used in:** `/politica-de-privacidade`, aviso no formulário
**Current placeholder:** rascunho não publicado.
**Requirements:** revisão e aprovação do cliente, e definição de quem é o controlador dos dados.

---

### CNT-009 — Descrição e cotas reais dos 7 tipos

**Type:** conteúdo técnico
**Status:** Not received
**Impact:** as 7 páginas de tipo são o principal ativo de SEO e a ferramenta de decisão do visitante.
As descrições atuais são interpretação técnica do arquiteto a partir dos nomes — **o site atual não
traz nenhum texto descritivo**, só fotos. Cota apresentada como especificação oficial sem confirmação
é fabricação de fato.
**Used in:** as 7 rotas `/escadas/[tipo]`, MED-003, `/escadas`
**Current placeholder:** descrições marcadas como provisórias; cotas marcadas como ilustrativas.
**Requirements:** por tipo — o que é em uma frase, quando é indicado, **quando não é indicado**,
vão mínimo, pé-direito típico, largura usual, acabamentos disponíveis. Confirmar também o que
significa exatamente a linha "Premium" e o que diferencia "Leke" na nomenclatura da casa.

---

### CNT-010 — Logo em vetor

**Type:** asset de marca
**Status:** Not received
**Impact:** o PNG disponível tem bisel cromado e selo de estrelas — datado e incompatível com o
sistema plano deste site. Bloqueia favicon, OG e rodapé em alta densidade.
**Used in:** global
**Current placeholder:** o PNG atual, redimensionado.
**Requirements:** SVG ou AI/EPS. Idealmente também uma versão flat monocromática (sem bisel, sem
selo) para uso em fundo navy. Se não existir vetor, propor a redução flat como serviço à parte.

---

### CNT-011 — Horário de atendimento

**Type:** dado cadastral
**Status:** Not received
**Impact:** `openingHours` no `LocalBusiness` melhora o painel de busca local, e o visitante saber
quando será respondido reduz abandono no WhatsApp.
**Used in:** JSON-LD, rodapé, `/orcamento`
**Current placeholder:** bloco omitido.
**Requirements:** dias e horários de atendimento comercial.

---

### CNT-012 — Autorização para citar construtoras clientes

**Type:** permissão comercial
**Status:** Not received
**Impact:** **a maior oportunidade destravável do projeto.** Hoje a empresa tem exatamente uma prova
social (tempo de mercado). Três nomes reais de construtoras da região, com autorização, valem mais
que qualquer seção nova. Sem autorização, nada é citado — logo de cliente não autorizado é prova
fabricada.
**Used in:** `/empresa`, `/` bloco de prova
**Current placeholder:** seção não existe.
**Requirements:** nomes das construtoras e autorização por escrito. Depoimento em texto, mesmo curto,
com nome e cargo reais, seria ainda melhor.

---

### CNT-013 — Acesso ao DNS e hospedagem

**Type:** acesso técnico
**Status:** Not received
**Impact:** bloqueia o deploy e o apontamento do domínio `escadasmunarim.com.br`.
**Used in:** fase de deploy
**Current placeholder:** —
**Requirements:** quem controla o registro do domínio e o painel de DNS, e onde o WordPress atual
está hospedado (para desligar depois do go-live, não antes).

---

### CNT-014 — Quem instala a escada

**Type:** fato operacional
**Status:** Not received
**Impact:** atravessa a home, `/como-funciona`, `/empresa` e o FAQ. Para o público leigo, "quem entra
na minha casa para instalar" é parte direta da objeção de confiança. O site atual **não diz** — o que
ele declara é o oposto do que foi assumido por engano na arquitetura: *"A Munarim conta com a parceria
de outras empresas, a fim de entregar um produto completo a nossos clientes"* e *"através de uma
sólida parceria, a MUNARIM conta com profissionais qualificados"*. Ver `DEC-017`.
**Used in:** `/`, `/como-funciona` passo 04, `/empresa`, `/duvidas`
**Current placeholder:** o passo 04 descreve o que acontece no dia da instalação sem afirmar quem
executa. Nenhuma menção a equipe própria em nenhuma rota.
**Requirements:** a instalação é feita por funcionários da Munarim ou por equipe parceira? Se
parceira, é sempre a mesma? A Munarim acompanha? Qualquer uma das respostas serve para a copy — o que
não serve é o silêncio, porque o silêncio virou invenção uma vez.

Confirmar junto: **existe fábrica/pátio de produção próprio?** O site declara que a empresa fabrica,
mas nunca menciona uma planta física. Se existir, `CNT-004` (fotos) fica ainda mais valioso.
