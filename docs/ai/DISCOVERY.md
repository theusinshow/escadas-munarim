---
status: approved
step: 9
session_mode: C
register: brand
language: pt-BR
updated_at: 2026-08-04
---

# Project Discovery — Escadas Munarim

> A frontmatter acima é o status legível por máquina que o workflow de resume lê.
> Manter preciso a cada edição.

## Identification
- **Client:** Escadas Munarim — escadas pré-moldadas em concreto polido sob medida
- **Tagline oficial (do logo):** "Segurança e Design"
- **Endereço:** Rua Treze de Junho, 893, Flor de Nápolis, São José — SC
- **Contato:** (48) 3257-2015 · WhatsApp (48) 99981-0707 · vendas@escadasmunarim.com.br · @escadasmunarim
- **Site atual:** https://escadasmunarim.com.br (WordPress + Elementor)
- **Project type:** Site completo multi-páginas — refatoração total em stack nova
- **Started at:** 2026-08-04

## Diagnóstico do site atual (herança)

| Item | Situação | Destino |
|---|---|---|
| Estrutura | 5 rotas: Início · Nossas Escadas · Nossa Empresa · Blog · Entre em Contato | Mantida e expandida |
| Tipos de escada | 7 tipos numa única galeria lightbox, 14 fotos, sem página própria | Vira 7 páginas reais |
| Blog | Conteúdo placeholder ("Teste de Posts") | Cortado, com redirects |
| Cor | `#2C445F` (navy dessaturado), confirmado no logo | Mantido como primária |
| Tipografia | Nenhuma definida (herda do tema Elementor) | Sistema novo |
| Fotos | `wp-content/uploads/2022/10/` — baixa resolução, sem direção | Descartadas |
| Números | Home diz "13 anos", Nossa Empresa diz "15 anos", logo diz "15 ANOS" | **15 anos** é o correto |

**Copy real recuperada (fato, não invenção):**
- Produtos: reta, caracol, leke, mista, premium, espelho fechado, in loco (cascata), viga central, viga lateral.
- Complementos: corrimão inox escovado polido, ferro galvanizado, guarda-corpo, sacada.
- Região: São José/SC, atende Grande Florianópolis e entorno.
- Clientes citados no site: construtoras da região, engenheiros civis, arquitetos, cliente final residencial e comercial.
- Valores declarados: comprometimento, credibilidade, eficiência, transparência, melhoria contínua, prazo de entrega.

## Confirmed Decisions

### Triagem (step 1)
1. **Situação:** D — site existente para refatoração. Diretório vazio → greenfield técnico com herança de conteúdo e posicionamento.
2. **Tipo:** C — site completo multi-páginas.
3. **Objetivo:** D — passar autoridade. Métrica primária é percepção de competência, não volume de lead.
4. **Nível visual:** A — limpo e profissional. Autoridade vem de organização, tipografia e desenho técnico — não de efeito.
5. **Conteúdo:** D — estruturar tudo do zero. Copy e plano de imagens são entregáveis deste projeto.
6. **Modo de sessão:** C — Enxuto. Sem "propor 3", sem subagents, sem skills externas ou MCP.
7. **Idioma:** A — pt-BR apenas, sem i18n.

### Direção do desenvolvedor (free input)
- Manter a estrutura de páginas existente e acrescentar o que faltar.
- Manter a paleta atual **com o azul da marca como primária**, expandindo-a.
- **Tipografias novas.**
- Site direto, bastante imagem, tudo bem organizado.
- **Animações de escada nas seções**: texto subindo degrau, descendo em espiral, demonstrações técnicas. "Bonito, direto e sem IA flops."

> Interpretação: há tensão aparente com a Q4 (limpo e profissional). Resolvida assim — layout
> sóbrio e denso de informação, com **um único sistema de motion assinatura** derivado da
> geometria real da escada. Motion é argumento de produto, não verniz.

### Objetivo e conversão (goals)
- **Objetivo nº 1:** autoridade / credibilidade.
- **Conversão:** formulário de orçamento **+ WhatsApp lado a lado**. Form como caminho principal qualificado, WhatsApp como atalho sempre visível.
- **Efeito arquitetural:** prova (tipos + obras + processo) vem **antes** do segundo CTA. WhatsApp persistente; form de orçamento em página própria e como bloco de fechamento nas páginas de tipo.

### Público (audience)
- **Primário:** cliente final residencial — pessoa construindo ou reformando a casa própria. **Leigo**: não sabe medida de vão, pé-direito, vencimento de degrau, prazo ou como se instala.
- **Objeção nº 1:** **confiança — "é sério?"**. Segmento com muito fornecedor amador.
- **Provas realmente disponíveis:** apenas **tempo de mercado (15 anos)**. Sem depoimento, sem logo de cliente, sem certificação.
- **Efeito arquitetural:** como só existe uma prova social, a credibilidade tem que ser construída por **transparência de processo e competência técnica demonstrada** — página "Como Funciona", FAQ técnico, desenho cotado. Explicar bem é a prova.

### Assets e imagem (media)
- **M1 — Material atual:** só logo e cores. Praticamente nenhum acervo de obra utilizável.
- **M5 — Postura sobre IA:** **liberada sem restrição, incluindo seções de obra.**
  · Concern registrada pelo arquiteto: para um público leigo cuja objeção é "é sério?", imagem de IA usada como obra entregue é prova fabricada e é o risco de credibilidade nº 1 do projeto.
  · **Decisão do desenvolvedor, reafirmada:** IA liberada também para obra. Segue como decisão explícita com risco registrado no `DECISIONS_LOG.md`.
  · **Guardrail mantido (inegociável):** nenhuma legenda inventada. Imagem gerada nunca vem rotulada com nome de cliente, endereço, data, metragem ou métrica de projeto. Sem depoimento fabricado, sem logo de cliente, sem número sem fonte.
- **M3 — Hero:** foto forte de escada + traço técnico se desenhando sobre ela.
- **M4 — Prova visual:** sim, é o argumento principal — daí o risco acima.
- **Espinha visual do projeto:** **desenho técnico vetorial autoral (SVG) dos 7 tipos de escada**, em axonometria e em corte cotado. Resolve três problemas de uma vez: o leigo entende a diferença entre os tipos, funciona sem acervo fotográfico, e é a base natural do sistema de motion. É autoral — não tem risco de slop.

### Arquitetura de páginas (site-architecture)
Estrutura atual mantida, com quatro adições aprovadas:
1. **Início**
2. **Nossas Escadas** (hub) → **7 páginas próprias**: reta, caracol, leke, mista, premium, espelho fechado, in loco *(novo — hoje é uma galeria só)*
3. **Obras** — portfólio de projetos, separado do catálogo de tipos *(novo)*
4. **Como Funciona** — medição → projeto → fabricação → instalação *(novo, ataca a objeção de confiança)*
5. **FAQ técnico** — pé-direito, vão, prazo, peso, acabamento, corrimão *(novo)*
6. **Nossa Empresa**
7. **Contato / Orçamento**
- **Blog:** cortado. Conteúdo atual é placeholder. Redirects 301 das URLs antigas.

### Fundações visuais (design-foundations) — modo C: escolha única, justificada

**Cor.** Base preservada, expandida a partir do azul da marca:
| Papel | Valor | Razão |
|---|---|---|
| Navy Munarim (primária) | `#2C445F` | Cor real da marca, extraída do logo. Preservada por decisão do desenvolvedor. |
| Tinta (texto) | `#16222E` | Navy levado ao quase-preto — texto que pertence à mesma família, sem cinza neutro genérico |
| Azul de interação | `#4A7FA8` | Derivado da primária para link/estado ativo, onde o navy não tem contraste suficiente |
| Concreto claro (fundo) | `#F4F3F1` | Cimento polido claro — o material do produto vira o fundo do site |
| Concreto médio | `#D9D6D1` | Divisórias, superfícies de segundo nível |
| Inox escovado | `#B9C0C7` | Cinza frio metálico — o corrimão do próprio catálogo |
| Óxido (acento único) | `#C4622D` | Ferrugem de vergalhão exposto. Único ponto quente da paleta: CTA e degrau ativo. Warm contra o frio de navy + concreto. |
> Justificativa: cada cor nomeia um material que a empresa efetivamente manipula (concreto, inox, aço). Nenhuma vem de paleta de framework.
>
> **Superado em parte pelo `DEC-019` (05/08/2026):** o óxido saiu e entrou o azulão de marcação `#0F52BA`; as superfícies esfriaram. A lógica de nomear material permanece.

**Tipografia.** Três papéis, cada um fazendo o que o outro não faz:
- **Display — Archivo · Corpo — IBM Plex Sans · Cotas — IBM Plex Mono.**
  > **Superado pelo `DEC-019` (05/08/2026):** a revisão v2 trocou as três por **Sora · Be Vietnam Pro · DM Mono**, duas geométricas de construção diferente mais a mono do mesmo esqueleto, e a base foi de 16px/1,25 para 17px/1,2. O registro original fica aqui como histórico da decisão.
- Escala: base 16px, razão 1.25 (major third). Line-height inverso ao tamanho: display 1.0 · headings 1.15 · corpo 1.6. Medida de texto travada em `65ch`.

**Layout.** Grid de 12 colunas com régua assimétrica: conteúdo editorial alinhado à esquerda em 7 colunas, desenho técnico ocupando as 5 da direita. Ritmo de seção deliberadamente variado (denso → esparso) para evitar U13.

### Motion (motion) — sistema assinatura
Um único sistema, derivado da geometria real da escada. Nada de fade-up uniforme.

1. **Traço técnico.** `stroke-dashoffset` desenhando a axonometria/corte do tipo de escada conforme o scroll. É o desenho se construindo — a metáfora de "projeto" que sustenta a autoridade.
2. **Degrau.** O stagger de entrada dos elementos usa **a proporção real do degrau** (espelho ≈ 18cm / piso ≈ 28cm) como razão dos offsets X/Y. O texto sobe em escada porque a escada define a escada. Isso mata U17: o stagger codifica geometria, não é verniz.
3. **Espiral.** Exclusivo da página do tipo **caracol**: elementos giram em torno de um eixo central no scroll. Usado uma vez, onde é literalmente verdade.
4. **Regras:** `prefers-reduced-motion` obrigatório com fallback estático completo. Motion nunca segura conteúdo — tudo legível sem JS. Sem parallax decorativo.

### Técnico (technical + owners-and-tools)
- **Stack:** Next.js 16 (App Router) + Tailwind v4 + GSAP (ScrollTrigger) + TypeScript.
- **Renderização:** estática. Sem banco, sem backend, sem rota de API.
- **Blog:** cortado → sem CMS de posts.
- **CMS:** nenhum. Conteúdo no repositório; edição pelo desenvolvedor.
- **Formulário:** sem backend. O form qualifica (tipo de escada, pé-direito, cidade, prazo) e **compõe uma mensagem `wa.me` pré-preenchida**. Zero custo, zero infra, e o lead chega já qualificado no WhatsApp que o cliente já usa.
- **SEO:** prioridade alta — 7 páginas de tipo + SEO local (São José / Grande Florianópolis). Metadata por rota, `LocalBusiness` + `Product` em JSON-LD, sitemap, redirects 301 do WordPress.
- **Performance:** site pesado de imagem por definição → `next/image`, AVIF/WebP, budget de LCP a fixar no QA.

## Open Questions
- Razão social completa e CNPJ (para rodapé e JSON-LD).
- Horário de atendimento (para `LocalBusiness`).
- Ano de fundação exato — o logo diz 15 anos, mas sem data-base o número envelhece sozinho.
- Existe logo em vetor (SVG/AI)? O PNG atual tem bisel cromado e selo de estrelas, ambos datados.
- Hospedagem e domínio: quem controla o DNS de `escadasmunarim.com.br`.
- Lista real de URLs do WordPress para o mapa de redirects.

## Rejected Options
- Landing page única — portfólio de obras exige navegação por peça.
- Visual premium/refinado, técnico/industrial e experimental — preteridos por "limpo e profissional".
- Modos de sessão Completo e Equilibrado — preteridos por economia de tokens.
- CMS headless e WordPress headless — preteridos: sem blog e sem edição pelo cliente, CMS seria infra sem uso.
- Resend / Formspree — preteridos: `wa.me` cobre a conversão sem backend.
- Restringir IA a atmosfera — proposto pelo arquiteto, **rejeitado pelo desenvolvedor**. IA liberada também para obra.

## Specialist Findings
<!-- Não aplicável: modo C não usa fan-out de subagents. -->

## Suggested Research
- Levantar as URLs indexadas do site atual antes do corte do blog, para o mapa de redirects.
- Conferir se as construtoras clientes autorizam citação nominal — destravaria a prova social que hoje não existe.

## Change History
- 2026-08-04 — Triagem registrada (modo C, pt-BR).
- 2026-08-04 — Site atual auditado; cliente identificado como Escadas Munarim (São José/SC). Azul `#2C445F` e "15 anos" confirmados no logo.
- 2026-08-04 — Discovery condensado concluído: objetivo, público, assets, arquitetura, fundações visuais, motion e técnico. Status → `awaiting_validation`.
- 2026-08-04 — Arquitetura aprovada pelo desenvolvedor. Conjunto completo de documentos gerado e preenchido. Status → `approved`, step 7.
- 2026-08-04 — Correção de acessibilidade aplicada na geração dos docs: o óxido `#C4622D` e o azul `#4A7FA8` definidos acima reprovam em WCAG AA como cor de texto (4,1:1 e 3,9:1). Papéis textuais migrados para `#A8501F` e `#35688C`; os valores originais permanecem restritos a uso gráfico. Ver `DEC-011`.
- 2026-08-04 — `validate_output.py` executado: **0 placeholders reais**. Os 18 "blockers" reportados são falso-positivo do regex `TODO`, que casa com a palavra portuguesa "todo/todos"; os 60 warnings são os colchetes de diagrama ASCII em `PAGE_BLUEPRINTS.md`. Verificado manualmente com busca case-sensitive.
