# Brief — zyphy-site v2 ("menos cara de IA, mais tecnologia de verdade")

Salvar na raiz do repositório `zyphy-tech/zyphy-site`. Fonte de verdade da reforma.

## 1. Contexto

- Marca: Zyphy — agência pequena de software para PMEs e pessoas físicas. Slogan mantido: "Tecnologia que destrava o seu dia a dia".
- Situação atual: site vanilla HTML/CSS/JS no ar em zyphy.com.br, dark quase-preto + acento único, Lenis + GSAP com reveal em toda seção, hero com mockup de devices.
- Problema: a página lê como template gerado por IA — eyebrow em cima de todo H2, numeração 01/02/03 em conteúdo que não é sequência, "→" em todo botão, código de mentira (`diagnostico.run()`), copy repetida, blocos idênticos, depoimentos longos, e um bug visível no CTA ("seu site seu site").
- Objetivo do "depois": mesma estrutura de conteúdo, mas com **prova técnica real** (stack, ficha por projeto, números medidos, playbook próprio) e um sistema visual com decisão própria. Nada decorativo que finja tecnologia.
- Não entra: número de pessoas no time, hardware/IoT/embarcado, contadores animados, marquee, HUD, labels "SEC.00 //".

## 2. Stack

Mantém a atual: HTML / CSS / JS puro, deploy Vercel. Sem migrar pra framework — a reforma é de conteúdo e sistema visual, não de arquitetura. GSAP fica só pro hero; Lenis pode sair (scroll nativo é suficiente e reduz JS).

## 3. Design tokens

Definir em `:root` no CSS antes de mexer em qualquer seção. Nenhum hex solto nos componentes.

```css
:root {
  /* cor */
  --bg:         #12171B;   /* fundo da página — grafite frio, não preto */
  --surface:    #1B2228;   /* cards e painéis */
  --surface-2:  #242E36;   /* elementos elevados dentro de um card */
  --line:       #2E3A43;   /* bordas e divisores */
  --text:       #E6EAEC;
  --text-muted: #9AA5AD;
  --accent:     #E8A93A;   /* âmbar-sinal — SÓ em ação: botão, link, foco */
  --on-accent:  #12171B;   /* texto em cima do âmbar (≈9:1, AAA) */
  --accent-text:#F2C46B;   /* âmbar como texto em cima do grafite (≈9:1) */

  /* tipo */
  --font-display: 'Bricolage Grotesque', 'IBM Plex Sans', sans-serif;
  --font-body:    'IBM Plex Sans', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', monospace; /* só dentro do demo do hero */

  /* escala (base 16, razão ~1.25) */
  --fs-hero: clamp(2.6rem, 6vw, 4.6rem);
  --fs-h2:   clamp(1.9rem, 3.4vw, 2.8rem);
  --fs-h3:   1.25rem;
  --fs-body: 1.0625rem;
  --fs-small:0.9rem;

  /* raio com hierarquia — não é tudo igual */
  --r-card:  10px;
  --r-btn:   6px;
  --r-tag:   4px;

  --measure: 62ch;
  --gutter:  clamp(20px, 5vw, 64px);
}
```

Regras:
- Display peso 600, `letter-spacing: -0.02em`, `line-height: 1.05`. Corpo 400, `line-height: 1.55`, largura máxima `--measure`.
- Sem sombra em card. Separação por `--line` e por diferença `--bg`/`--surface`.
- Contraste: `--text-muted` sobre `--bg` ≈ 6.5:1; todos os pares acima passam WCAG AA. Não escurecer o âmbar pra pôr texto branco em cima.
- Foco de teclado: `outline: 2px solid var(--accent); outline-offset: 3px`.

## 4. Estrutura da página (seção por seção, com a razão)

Ordem: nav → hero → o que a Zyphy resolve → como a gente constrói → portfólio com ficha técnica → depoimentos → contato → rodapé.
"Para quem é" some como seção própria: vira duas colunas dentro de "o que a Zyphy resolve".

### 4.1 Nav
Mantém. Tirar "→" do botão "Começar projeto". Itens: Soluções, Como construímos, Projetos, Contato.

### 4.2 Hero — o único lugar com ousadia
- Esquerda: H1 "Tecnologia que destrava o seu dia a dia." (sem palavra destacada em cor/itálico). Sub em uma frase: "Automação, sistemas e produtos digitais sob medida para empresas e pessoas — construídos por quem vai colocar a mão no código." Dois botões: "Começar projeto" (primário) e "Ver projetos" (fantasma). Linha: "Resposta no mesmo dia, sem compromisso" (vírgula, não "·").
- Direita: **demo interativo real** — um mini-dashboard funcionando (base: protótipo `zyphy-dashboards`): 3 indicadores, 1 gráfico de barras, 1 filtro por período que de fato refiltra os dados de exemplo. Renderizado em SVG/Canvas próprio, sem lib pesada. Legenda pequena: "Exemplo de dashboard que entregamos — clique nos filtros." É a prova; não precisa de texto dizendo "somos técnicos".
- Motion: uma orquestração só — texto entra, depois o dashboard "liga" (barras crescem uma vez). Nada mais na página anima sozinho. `prefers-reduced-motion: reduce` → estado final direto.
- Remover "Role para explorar", a marca-d'água "Z yphy" e o eyebrow "Para empresas e pessoas".

### 4.3 O que a Zyphy resolve
- H2: "Onde a gente entra." Sem eyebrow, sem numeração.
- Três itens em lista (não card): Automação de processos / Modernização de sistemas / Sites, apps e dashboards. Cada um: 1 frase de dor + 1 frase do que entregamos. Ex.: "Planilha, copia-e-cola, retrabalho. Viram rotina automática integrada ao que você já usa."
- Abaixo, duas colunas curtas **Para empresas** / **Para pessoas**, 3 linhas cada, aproveitando o split mais concreto do rascunho Editorial:
  - Empresas: automação de processos · sistemas sob medida · modernização de legado
  - Pessoas: site ou app do seu projeto · automação do dia a dia · suporte contínuo
  (usar quebra de linha, não "·" no HTML)
- Razão: uma seção em vez de três ("dor", "solução", "para quem") elimina os blocos repetidos e a copy duplicada.

### 4.4 Como a gente constrói (substitui "Como funciona")
- H2: "Como a gente constrói." Aqui a numeração 1–4 é legítima: é sequência.
- Cada passo mostra **o que o cliente recebe**, não código de mentira:
  1. Diagnóstico — "Você recebe um mapa de 1 página do que está travando e o que vale automatizar."
  2. Plano — "Escopo, prazo e preço fechados por escrito antes de qualquer linha de código."
  3. Construção — "Link de preview a cada entrega. Você acompanha em vez de esperar 3 meses."
  4. No ar e depois — "Deploy, monitoramento e ajustes incluídos por [X] dias." ← **Weslley confirma o prazo**
- Linha final sóbria com a stack real: "Construímos com Next.js, Flutter, Supabase e Vercel. Sem template de terceiros." Texto, não carrossel de logo.
- Razão: é o playbook real da Zyphy (brief → tokens → fases → QA → deploy). Agência genérica não mostra isso.

### 4.5 Projetos com ficha técnica
- H2: "O que já está no ar."
- Mantém os 4 cards e imagens atuais (8:5). Cada card ganha uma **ficha** abaixo da descrição, em duas colunas label/valor (label em `--text-muted`, valor em `--text`, sem mono, sem caps):
  - Stahltek Rotuladoras — Tipo: site institucional · Stack: HTML/CSS/JS · Integração: orçamento direto no WhatsApp · Performance: [Lighthouse medido]
  - Vora Jewelry — Tipo: loja · Stack: Next.js 16, Tailwind v4, shadcn/ui · Destaque: visualizador 360° dos produtos · Performance: [medido]
  - TecNova — Tipo: site institucional · Stack: HTML, GSAP ScrollTrigger · Destaque: desmontagem do produto controlada por scroll · Performance: [medido]
  - FieldFix — Tipo: app Android/iOS · Stack: Flutter, Supabase (Auth, Postgres, Realtime) · Status: publicado na Google Play · Link do app e da Play Store
- Link "Ver no ar" sem "↗" nem "(abre em nova aba)" visível — usar `aria-label`/`rel="noopener"` e um ícone SVG discreto.
- Único número de prova na página, em uma linha acima dos cards: "4 projetos no ar, 1 app publicado." Sem counter.

### 4.6 Depoimentos
- H2: "Quem já trabalhou com a gente."
- Cortar cada um pra 1–2 frases, a parte mais específica:
  - Carlos Eduardo (Stahltek): "Conseguimos mostrar nossos serviços e equipamentos de forma muito mais clara."
  - Severina Silva (Vora): "Os produtos estão bem organizados e a parte de personalização é um diferencial bem interessante."
  - Cleyton Alves (TecNova): "O site ficou simples de navegar e transmite muito mais confiança para nossos clientes."
- Nome + cargo + empresa numa linha; sem avatar de iniciais.

### 4.7 Contato
- H2 fixo: "Conta pra gente o que está travando." — **remove o rotador** (corrige o bug "seu site seu site").
- Formulário mantém (nome, e-mail ou WhatsApp, mensagem → abre WhatsApp). Botão "Enviar pelo WhatsApp". Linha: "Abre a conversa com sua mensagem pronta."

### 4.8 Rodapé
- Marca, uma frase (não repetir a do hero): "Sites, apps, dashboards e automações sob medida." Links de contato reais (WhatsApp, e-mail, Instagram), Privacidade, © 2026. Remover "Feito com clareza…".

## 5. Regra de revisão (o que sai da página inteira)

- Eyebrows/labels em cima de títulos
- Numeração em qualquer coisa que não seja o processo
- "→" e "↗" em texto de link/botão; "·" separando meta
- Trechos de código fictício
- Palavra única destacada em cor/itálico dentro de título
- Reveal fade-up por seção; hover com transform em card
- Sombras cinzas; raio igual em tudo
- Qualquer número que não foi medido

## 6. Assets

- Imagens dos 4 projetos: já existem em `assets/img/` (8:5).
- Fontes: Bricolage Grotesque + IBM Plex Sans + IBM Plex Mono via Google Fonts, com fallback e `font-display: swap`.
- Dados de exemplo do dashboard do hero: JSON inline com 12 meses fictícios claramente rotulados como exemplo.
- Resultados Lighthouse dos 3 sites (passo 0 do prompt).

## 7. Ordem de execução

0. Medir: `npx lighthouse <url> --only-categories=performance,accessibility --quiet --chrome-flags="--headless"` para site-stahltek, vora-jewelry e tecnova-site. Anotar Performance e Acessibilidade.
1. Criar branch `v2-tecnica`. Escrever os tokens no CSS; trocar fontes.
2. Passar a regra de revisão (item 5) no `index.html` inteiro — remover, não reescrever ainda.
3. Reestruturar seções na ordem do item 4; fundir dor/solução/para-quem.
4. Portfólio: adicionar fichas técnicas com os números medidos.
5. Processo com entregáveis; contato com H2 fixo (bug corrigido).
6. Hero: construir o dashboard interativo; orquestrar a única animação; reduced-motion.
7. Remover Lenis e os reveals GSAP; manter GSAP só se o hero usar.
8. QA (checklist do playbook): um protagonista por seção, contraste, 360px, foco visível, reduced-motion.
9. Preview na Vercel; revisar; merge.

---

## Prompt para o Claude Code (colar no terminal do VS Code, com o repo aberto)

```
Leia o arquivo brief-zyphy-site-v2.md na raiz deste repositório. Ele é a fonte de verdade.

Antes de alterar qualquer arquivo, me liste em tópicos exatamente o que você vai mudar em cada arquivo (index.html, CSS, JS, assets) e espere minha aprovação. Só depois execute, seguindo a ordem do item 7 do brief, um passo por vez, me mostrando um resumo curto ao fim de cada passo.

Regras fixas:
- Não invente números. Os valores de performance vêm do passo 0 (Lighthouse). Se um comando falhar, me avise em vez de estimar.
- Não adicione nada que o item 5 do brief manda remover.
- Nenhum hex solto fora de :root.
- Ao final, rode o checklist de QA do item 8 e me entregue o resultado item por item.
- Não faça commit sem eu pedir.
```
