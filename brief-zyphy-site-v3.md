# Brief — zyphy-site v3

Fonte de verdade da reforma. Substitui `brief-zyphy-site-v2.md`.

**Diferença central em relação à v2:** a v2 entregava os tokens prontos,
então não sobrou decisão de arte para tomar — só execução. O resultado
saiu competente e sem personalidade. Nesta versão os tokens são **saída
da Fase 3**, não entrada. O brief define restrição e direção; a paleta,
a tipografia e a escala nascem das referências.

---

## 1. Contexto

- Marca: Zyphy — agência pequena de software para PMEs e pessoas
  físicas. Slogan: "Tecnologia que destrava o seu dia a dia".
- Situação: site vanilla HTML/CSS/JS no ar em zyphy.com.br.
- Problema da versão atual: lê como template gerado por IA.
- Objetivo: prova técnica real (stack, ficha por projeto, números
  medidos) dentro de um sistema visual com decisão própria.

---

## 2. Referências — leia `refs/` antes de qualquer coisa

Oito capturas em `refs/`, sete positivas e uma negativa. O padrão comum
extraído delas, que é o que deve guiar a direção:

**Repetido em quase todas:**
1. **Bloco de cor de largura total como divisor de seção.** Nenhuma usa
   borda, sombra ou card flutuante para separar conteúdo. O ritmo vem da
   troca de fundo.
2. **Imagem real como protagonista.** Produto, screenshot, fotografia.
   Nenhuma usa ícone genérico ou ilustração abstrata decorativa.
3. **Cor de acento rara.** Quando aparece, aparece pouco e com peso.
4. **Respiro.** Nada encostado em nada. O espaçamento faz metade do
   trabalho.

**Apareceu uma vez e vale considerar:**
- Disciplina monocromática — o site inteiro numa faixa estreita de cor,
  interface e imagem na mesma temperatura (`Fashion`)
- Metadado pequeno e monoespaçado como textura técnica (`Fashion`)
- Conteúdo vazando pela borda da tela, sugerindo continuação (`21st`)
- Escala tipográfica muito grande ocupando a tela (`Nubank`)

**Referência negativa (`museum`):** o mesmo padrão de "título + três
cards + carrossel" repetido cinco vezes. Página inteira previsível após
20% do scroll. Não fazer.

**Nota sobre as referências claras:** cinco das sete são predominan-
temente claras, e parte do respiro delas vem do fundo branco. O site é
escuro por decisão. Portanto o respiro precisa ser conquistado com
espaçamento e variação de tom, não com luz. As duas referências escuras
— `Fashion` e `21st` — são as principais para o sistema visual. `Apple`
e `abacate` contribuem disciplina de espaço, não paleta.

---

## 3. Decisões travadas

Não reabra estas:

- **Fundo escuro.** Não propor versão clara.
- **Stack:** HTML / CSS / JS puro, deploy Vercel. Sem framework, sem
  Tailwind, sem biblioteca de componente.
- **Hero:** imagem autoral (ver item 6).
- **Não entra:** número de pessoas no time, hardware / IoT / embarcado,
  contador animado, marquee, HUD, label tipo "SEC.00 //".

### Decisões de 2026-09-30

- **Card do FieldFix** mostra "Página de apresentação: 81", porque o card
  apresenta um app e o Lighthouse mede a página de apresentação (regra 7:
  métrica só do que o card apresenta).
- **Cor ciano mantida** por identidade (exceção IMP `ai-color-palette` no
  `qa/config.json`).
- **Título do hero liberado para revisão** (tamanho e texto).
- **H1 do hero:** 'Quem fala com você programa o seu projeto.' (F13),
  escolhido pelo Weslley entre três opções do zyphy-copy. Substitui o
  slogan do §5.2, que passa a ser usado só no meta title.
- **Rótulo do WhatsApp no header** igual ao do rodapé (§5.8). Vale sobre
  o rótulo "Falar com a Zyphy no WhatsApp" do `copy.md`.
- **Trilho de projetos:** a ficha técnica e o depoimento ficam parados;
  só a miniatura desliza (regra 3).
- **Campo de mensagem do formulário: opcional.** O formulário não mostra
  erro de mensagem vazia; o erro "Conte em uma frase o que está
  travando." do `copy.md` não se aplica.
- **Política de privacidade concluída:** controlador e encarregado Weslley
  Rocha (rocheweslley@gmail.com); sai do rascunho. O link volta ao rodapé
  e a página entra no `.vercelignore` (QA-14).

### Correção de 30/09/2026 (zyphy-ciclo, volta 1: COPY e review)

Os textos do site passam a ser os do `copy.md` aprovado. Onde o §5 abaixo
diverge, vale o `copy.md`; o motivo de cada troca está nas notas dele.
Nenhum layout mudou, só texto, com duas exceções pedidas pelo review
(ficha do FieldFix e o bloco do contato).

- **Hero.** Saiu: o slogan do H1 (ficou só no `<title>`); "construídos por
  quem vai colocar a mão no código." do sub, porque o H1 novo já diz isso
  (o `span.hero-sub-key` ficou vazio e a regra de peso 600 do §5.2 ficou
  sem texto; tirar o markup e o CSS é limpeza, vai em commit separado,
  regra 8; feita em 30/09/2026: saíram o span vazio do `index.html` e a
  regra `.hero-sub-key` do `css/styles.css`, print do hero igual antes e
  depois em 1440, 375 e 360); "sem compromisso", que não tem fato próprio. Ficou: o H1
  escolhido, o sub do `copy.md` e "Resposta no mesmo dia, inclusive no
  fim de semana." (F1).
- **Soluções.** Saíram "integrada ao que você já usa" e "migrada por
  partes, sem parar o que já funciona", promessas de método sem fato (F8,
  F9). As colunas trocaram os rótulos curtos pelas frases do `copy.md`;
  "Automação de processos" continua fora de "Para empresas" (decisão de
  29/09/2026).
- **Processo.** Saíram "a cada entrega" e "3 meses" (o F16 diz que o
  preview vem no fim da construção; o prazo não tem fonte) e
  "monitoramento" (fora dos fatos). Ficaram os passos do `copy.md` (F14,
  F15, F16, F17, F2, F11). Os 7 dias do passo 4 continuam.
- **Projetos.** Notas corrigidas para os fatos: Vora 85 (F22) e TecNova 86
  (F23). Saiu a data 23/09/2026 da legenda (os números são os F21-F24). Os
  links mostram "Abrir o site", "Abrir a loja" e "Abrir a página de
  apresentação" em vez do domínio; o domínio continua no `href`. FieldFix:
  saíram "Android e iOS", "Auth, Postgres, Realtime", "Marketplace" e "em
  tempo real" (F4, F28); ficaram "App Android (beta)", "Flutter e Supabase"
  e a linha "Página de apresentação: 81" (decisão acima).
- **Dashboard.** Filtros "Última semana", "Último mês" e "Último ano"
  (sem número no rótulo), rótulo fixo "Faturamento no período". Saiu o
  aviso de leitor de tela com os números do período; ficou o aviso do
  `copy.md`.
- **Contato.** Entraram, antes do formulário, o subtítulo ("Quem responde
  é quem vai programar o seu projeto...", F13 e F1) e o diagnóstico grátis
  (F14). Rótulos, placeholders, erros, a mensagem do WhatsApp e os avisos
  de envio seguem o `copy.md`; saiu o texto automático "Quero começar um
  projeto com a Zyphy." da mensagem vazia.
- **SEO.** Meta description, og:title e og:description do `copy.md`.

### Correção de 30/09/2026 (zyphy-ciclo: trilho, privacidade e contato)

Aplica as duas decisões de 2026-09-30 acima que o site ainda não seguia
e o C3 do review.

- **Trilho de projetos.** Saiu: a faixa inteira (`.projects-track`, com
  ficha e depoimento dentro) correndo na horizontal com a seção fixa, que
  cortava a ficha e a citação na borda da tela (regra 3). Ficou: no
  desktop com scroll-driven, a ficha e o depoimento numa coluna à
  esquerda, em fluxo normal (sobem com a página, nunca andam na lateral);
  as quatro miniaturas numa moldura fixa à direita, a próxima espiando
  pela borda da tela. Quando a ficha de um projeto entra, a miniatura
  dele corre da borda para a moldura e cobre a anterior. Continua sendo o
  movimento 1 (§7), não um quarto. Saiu junto o ajuste de rolagem por
  foco de teclado do `js/main.js`: com a ficha em fluxo normal, o foco
  rola a página sozinho e a miniatura acompanha. Celular, Firefox e
  reduced-motion: pilha vertical, como antes.
- **Privacidade.** O link "Privacidade" (`/privacidade/`) voltou ao
  rodapé e o `.vercelignore` libera `/privacidade` (QA-14).
- **"Começar projeto"** (header, hero e menu do celular) aponta para
  `#comecar`, o subtítulo do contato. Antes ia para o topo da banda, e a
  frase grande ocupa a primeira tela: quem clicava não via nenhum campo.
  Agora a tela abre no subtítulo, no diagnóstico grátis e no formulário.
  O link "Contato" do menu continua no topo da banda, na frase.

### Correção de 30/09/2026 (aplicadas a pedido do Weslley, fora do ciclo; medidas na rodada seguinte)

Nada saiu do site nesta volta; só entrou.

- **/privacidade/ com estilo próprio.** As classes `.legal-*` ganharam
  regra: lead, parágrafos, listas e a tabela de bases legais na mesma
  largura de linha (`--measure`), `dd` sem o recuo do navegador, links do
  texto sublinhados. Só o H1 usa a largura da página. Nada se move.
- **Header da /privacidade/ no celular.** A página não tem menu nem as
  âncoras da home; o "Começar projeto" (`/#comecar`) fica visível no
  header em todas as larguras (`.nav-main--inner`). Antes, abaixo de
  900px, só o logo levava de volta.
- **sitemap.xml** lista `/privacidade/`.

---

## 4. Aberto — sai da Fase 3

O agente propõe e para para aprovação antes de escrever qualquer código:

- **Paleta completa.** Partir da monocromia disciplinada do `Fashion`:
  uma família de tom executada até o fim, com acento raro. O grafite +
  âmbar da v2 não é ponto de partida obrigatório — se as referências
  levarem a outro lugar, siga.
- **Tipografia.** Famílias, escala, pesos. Considerar condensada em
  caixa alta como estrutura (`Fashion`) e escala muito grande
  (`Nubank`). Não usar Inter, Roboto, Arial, Helvetica ou Space Grotesk.
- **Bandas de tom.** Como criar o ritmo de bloco de cor num site escuro:
  quantos níveis de fundo, onde troca, qual a lógica.
- **Densidade e ritmo vertical.**
- **Tratamento do metadado técnico** — se entra, em que forma.

Apresente isso como texto, com a razão de cada escolha ligada a uma
referência específica. Espere "ok" antes da Fase 4.

---

## 5. Estrutura da página

Ordem: nav → hero → dashboard ao vivo → o que a Zyphy resolve → como a
gente constrói → projetos com ficha técnica (com os depoimentos dentro,
ver §5.7) → contato → rodapé.

### 5.1 Nav
Itens: Soluções, Como construímos, Projetos, Contato. Sem "→" no botão.

### 5.2 Hero
H1: "Tecnologia que destrava o seu dia a dia." Sub em uma frase:
"Automação, sistemas e produtos digitais sob medida para empresas e
pessoas — construídos por quem vai colocar a mão no código."
Dois botões: "Começar projeto" (primário) e "Ver projetos" (fantasma).
Linha: "Resposta no mesmo dia, sem compromisso."

Imagem autoral como protagonista (item 6). Remover "Role para
explorar", a marca-d'água "Z yphy" e o eyebrow "Para empresas e
pessoas".

**Correção de 30/09/2026 (zyphy-ciclo, review U1 e impeccable
oversized-h1):** o H1 ganhou uma trava pela altura da tela a partir de
600px (`--fs-h1-vh`, ~26% da altura; em 1280x800 caiu de 100px para 76px).
Saiu: o H1 de até 144px no desktop, que ocupava 34% da tela e abafava o
resto. Ficou: o mesmo H1 de 3 linhas, menor, e o sub maior (20→24px) com
"construídos por quem vai colocar a mão no código." em peso 600, mais a
linha de resposta a 17px em peso 500. Nenhuma palavra mudou. O celular (4
linhas, 72px) ficou igual.

### 5.3 Dashboard ao vivo — a prova
Mini-dashboard funcionando, SVG/Canvas próprio, sem lib pesada: 3
indicadores, 1 gráfico de barras, 1 filtro por período que de fato
refiltra dados de exemplo. Legenda: "Exemplo de dashboard que
entregamos — clique nos filtros."

Era o hero na v2. Como o hero agora é imagem, ele vira a segunda
seção — e ganha espaço próprio em vez de dividir a tela.

### 5.4 O que a Zyphy resolve
H2: "Onde a gente entra." Sem eyebrow, sem numeração.
Três itens em lista, não card: Automação de processos / Modernização de
sistemas / Sites, apps e dashboards. Cada um: 1 frase de dor + 1 frase
de entrega. Ex.: "Planilha, copia-e-cola, retrabalho. Viram rotina
automática integrada ao que você já usa."

**Correção de 30/09/2026 (zyphy-ciclo, review U5 e impeccable
all-caps-body/tight-leading):** as dores saíram da caixa alta. Motivo:
frase inteira de leitura em caixa alta condensada cansava. Ficou: Sofia 800
no mesmo tamanho, em caixa mista, entrelinha 1.35, e o traço do movimento 2
passando no meio da altura-x. Caixa alta fica para H1, H2 e a frase do
contato.

Abaixo, duas colunas curtas:
- **Para empresas:** sistemas sob medida / modernização de legado.
  "Automação de processos" fica fora desta coluna (decisão do Weslley,
  29/09/2026): já é o primeiro item da lista de cima.
- **Para pessoas:** site ou app do seu projeto / automação do dia a dia
  / suporte contínuo

### 5.5 Como a gente constrói
H2: "Como a gente constrói." Numeração 1–4 é legítima aqui — é
sequência. Cada passo mostra o que o cliente recebe:

1. **Diagnóstico** — "Você recebe um mapa de 1 página do que está
   travando e o que vale automatizar."
2. **Plano** — "Escopo, prazo e preço fechados por escrito antes de
   qualquer linha de código."
3. **Construção** — "Link de preview a cada entrega. Você acompanha em
   vez de esperar 3 meses."
4. **No ar e depois** — "Deploy, monitoramento e ajustes incluídos por
   7 dias." (prazo confirmado pelo Weslley em 29/09/2026)

Linha final sóbria: "Construímos com Next.js, Flutter, Supabase e
Vercel. Sem template de terceiros." Texto, não carrossel de logo.

### 5.6 Projetos com ficha técnica
H2: "O que já está no ar." Mantém os 4 cards e as imagens atuais (8:5).
Cada card ganha ficha em duas colunas label/valor:

- **Stahltek Rotuladoras** — Tipo: site institucional · Stack:
  HTML/CSS/JS · Integração: orçamento direto no WhatsApp ·
  Performance: [medido]
- **Vora Jewelry** — Tipo: loja · Stack: Next.js 16, Tailwind v4,
  shadcn/ui · Destaque: visualizador 360° · Performance: [medido]
- **TecNova** — Tipo: site institucional · Stack: HTML, GSAP
  ScrollTrigger · Destaque: desmontagem do produto por scroll ·
  Performance: [medido]
- **FieldFix** — Tipo: app Android/iOS · Stack: Flutter, Supabase
  (Auth, Postgres, Realtime). Sem status e sem link da Google Play até a
  publicação ser confirmada no Play Console (ver §9).

Uma linha acima dos cards: "4 projetos no ar." Sem counter animado.

Métrica da ficha: só Performance, igual em todos os cards que têm
Lighthouse. Acessibilidade saiu das fichas (decisão do Weslley,
29/09/2026); o 87 da Vora vira tarefa separada.

### 5.7 Depoimentos
**Dentro das plaquetas dos projetos, sem seção própria nem H2** (decisão
do Weslley, 29/09/2026): cada depoimento fica junto do projeto do mesmo
cliente. Uma a duas frases cada, a parte mais específica. Nome + empresa
numa linha (cargo volta quando confirmado, ver §9), sem avatar de
iniciais.

- Carlos Eduardo (Stahltek): "Conseguimos mostrar nossos serviços e
  equipamentos de forma muito mais clara."
- Severina Silva (Vora): "Os produtos estão bem organizados e a parte
  de personalização é um diferencial bem interessante."
- Cleyton Alves (TecNova): "O site ficou simples de navegar e transmite
  muito mais confiança para nossos clientes."

### 5.8 Contato
H2 fixo: "Conta pra gente o que está travando." Sem rotador — isso
corrige o bug "seu site seu site". Formulário (nome, e-mail ou
WhatsApp, mensagem) abre WhatsApp. Botão "Enviar pelo WhatsApp". Linha:
"Abre a conversa com sua mensagem pronta."

**Atalho do WhatsApp no celular:** ícone do WhatsApp no header fixo, ao
lado do menu, até 900px (mesmo glifo, link e aria-label do rodapé).
Acompanha a rolagem sem cobrir conteúdo. **Não há botão flutuante** (ver
§8).

### 5.9 Rodapé
Marca, uma frase que não repita a do hero: "Sites, apps, dashboards e
automações sob medida." Contatos reais, © 2026. Link "Privacidade"
(`/privacidade/`): a política foi publicada e o link está no rodapé
(decisão de 2026-09-30, §3).

---

## 6. Imagem autoral do hero

Produzida no Higgsfield pelo Weslley, não gerada pelo agente. O agente
trabalha com o arquivo entregue e nunca substitui por stock ou
ilustração.

**Critérios, derivados das referências:**
- Protagonista único, nada competindo no enquadramento
- Mesma temperatura de cor da interface — a imagem pertence ao sistema,
  não é um retângulo colado nele (`Fashion`)
- Concreta, não abstrata. Nada de rede, nó, partícula ou "conexão"
- Sem pessoa apontando pra tela, sem braços cruzados, sem cara de stock

A ideia específica sai na Fase 3, junto com a direção. O agente propõe
2–3 conceitos com a razão de cada; o Weslley escolhe e produz.

**Fallback:** enquanto a imagem não existir, usar placeholder de cor
sólida com a proporção final. Não improvisar arte no lugar.

---

## 7. Motion

Movimento em várias seções, como no `21st`. Mas com uma distinção que
decide se fica bom ou vira template:

**O que o `21st` faz:** conteúdo se desloca lateralmente e vaza pela
borda, sugerindo que continua. O movimento carrega informação.

**O que NÃO fazer:** `fade-up` disparado por scroll em toda seção. Isso
é o gesto mais genérico que existe e foi o que a v2 removeu com razão.

**Regra:** cada movimento precisa de justificativa escrita. Se a razão
for "pra não ficar parado", corta. Máximo de três comportamentos
distintos na página inteira — repetir os mesmos três é sistema;
inventar um por seção é ruído.

`prefers-reduced-motion: reduce` → estado final direto, sempre.

**Os três comportamentos (revisão do Weslley, 29/09/2026):**
1. **Projetos:** plaquetas correm na horizontal conforme o scroll vertical
   (CSS scroll-driven). Razão: o conteúdo vaza pela borda e sugere que
   continua, como no `21st`. Sem suporte: pilha vertical. **Desde
   30/09/2026 só a miniatura corre** (decisão do §3): ficha e depoimento
   ficam parados, e a próxima miniatura é o que vaza pela borda.
2. **Soluções:** conforme a linha sobe pela tela, um traço na cor do
   texto (ciano fica reservado para ação) atravessa o
   título da dor e a frase da solução ganha contraste (muted → texto).
   CSS `animation-timeline: view()`. Razão: a dor fica "riscada" e a
   solução vira o que se lê. Firefox e reduced-motion: estado final
   parado (traço inteiro, solução em contraste cheio).
3. **Dashboard:** na troca de filtro, cada barra vai do valor antigo ao
   novo (`document.startViewTransition`); barras sem par aparecem ou
   somem. Ao entrar na tela o gráfico já está pronto, sem animar. Os
   números trocam direto, sem contagem. Razão: mostra que o filtro de
   fato refiltra os dados.

Saiu nesta revisão a faixa de cor que expandia no dashboard e no
contato.

**Removido: "carimbo" nos passos do Processo** (29/09/2026). O número
entrava em escala e o texto subia com opacidade conforme o scroll. Saiu
porque o texto subindo é o fade-up proibido (§8) e porque o movimento não
carrega informação: seria um quarto comportamento sem razão, e o limite
são três.

**Vídeo do hero (decisão do Weslley, 2026-09-29):** o vídeo do hero é a
orquestração de entrada da página e fica **fora da conta dos três
comportamentos de scroll**. Toca uma vez, sem som, e para no último
quadro (sem loop). **O H1 aparece desde o primeiro quadro, em qualquer
tela;** subtítulo e botões também, porque com a sombra abaixo o contraste
passa em todos os quadros (atraso máximo permitido: 1s, só se o contraste
não passasse sem ele). **Vídeo em todas as telas** (decisão do Weslley,
29/09/2026, substitui "celular só imagem parada"). No celular (<600px) é
um recorte em pé 4:5 em volta do notebook (hero-m, 720×900, webm 0,4 MB
e mp4 0,6 MB), atrás do texto, com sombra de 52%. A versão é escolhida
pelo JS, que põe no `<video>` só as fontes da largura atual (cada uma
ainda com `media`, como segunda trava); girar o aparelho troca a versão
no mesmo ponto. No tablet o vídeo 16:9 fica abaixo do texto; no
desktop, atrás, à direita. muted, playsinline, autoplay, toca uma vez e
para no último quadro. Sem vídeo (reduced-motion, economia de dados,
erro ao carregar ou autoplay bloqueado): imagem parada do último
quadro.

Sombra atrás do texto no desktop: 62%, desde o início. Medida quadro a
quadro (pixel mais claro atrás de cada linha): H1 precisa 49% (3:1, texto
grande), subtítulo 61%, "Ver projetos" 57%, linha de resposta 56%. Para
chegar nisso, subtítulo e linha de resposta usam a cor do texto em vez
da muted (com a muted precisariam de ~80%). Decisão do Weslley,
29/09/2026, depois de uma versão "vídeo primeiro, texto depois" que
escondia o texto durante o vídeo e foi desfeita.

Sombra no celular: 52% sobre o hero inteiro. Medida quadro a quadro em
360/375/414px: H1 precisa 49% (3:1, pior aos 0,8s nos papéis), subtítulo
43% só em 414px; botões e linha de resposta ficam abaixo do vídeo.
Contraste real com 52%: H1 3,38:1, subtítulo ≥ 10,4:1, demais 16,8:1.

Duração de 4,875s (117 quadros a 24fps), abaixo dos 5s do WCAG 2.2.2,
então dispensa botão de pausa; o corte tirou os primeiros quadros e
manteve o último, que é a imagem parada final. No desktop o texto fica na área escura
da esquerda. O **primeiro quadro** é o poster e a imagem parada onde o
vídeo toca (todas as telas; no celular, o do recorte 4:5), para o vídeo
começar de onde a imagem está sem "voltar". O **último quadro** é a
imagem parada de todos os casos sem vídeo listados acima (no celular, o
do recorte) e a og:image.

GSAP permitido. Lenis fica de fora — scroll nativo basta e reduz JS.

---

## 8. Sai da página inteira

- Eyebrow ou label em cima de título
- Numeração em qualquer coisa que não seja o processo
- "→" e "↗" dentro de texto de link ou botão; "·" separando meta
- Trecho de código fictício
- `fade-up` por seção ou por item; hover com transform em card
- **Botão flutuante fixo na tela** (WhatsApp ou qualquer outro). Removido
  em 25/09/2026 por cobrir conteúdo e reintroduzido em 29/09 porque o
  motivo não tinha sido registrado. Medido na volta: em 375px cobria 43
  itens durante a rolagem (passos do processo, imagens, fichas e
  depoimentos dos projetos, os três campos do formulário) e, em 375×667,
  o "Ver projetos" já na primeira tela; em 1440px passava sobre a
  captura da Vora e o e-mail do rodapé. No celular o atalho fica no
  header (§5.8).
- Sombra cinza; raio igual em todos os elementos
- Grid de 3 ou 4 cards como estrutura principal repetida
- Qualquer número que não foi medido
- Ícone genérico de inovação, tecnologia, engrenagem ou foguete
- Foto de stock

**Mudou em relação à v2:** palavra destacada dentro de título deixa de
ser proibida. O `21st` usa e funciona. Permitido uma vez por página, no
H1, e só se a Fase 3 justificar.

---

## 9. Pendências que bloqueiam

O agente não inventa nenhum destes. Se faltar, para e pede:

Situação em 29/09/2026:

- **Resolvido:** Lighthouse de site-stahltek, vora-jewelry e tecnova-site.
  Medido em 23/09/2026 (Lighthouse 13.5.0, mobile, mediana de 3
  execuções) e publicado nas fichas dos projetos.
- **Resolvido:** imagem autoral do hero. Virou o vídeo produzido pelo
  Weslley (ver §7). O primeiro quadro é o poster onde o vídeo toca; o
  último é a imagem do reduced-motion, da economia de dados e a og:image.
- **Resolvido:** suporte pós-deploy de 7 dias, confirmado pelo Weslley em
  29/09/2026.
- **Aberto:** FieldFix na Play Store. O link
  `play.google.com/store/apps/details?id=com.fieldfix.app` devolveu 404
  em 29/09/2026. Até o Weslley confirmar no Play Console, o site não diz
  "publicado" nem tem link da loja (§5.6).
- **Aberto:** cargos dos três depoimentos (removidos do site até
  confirmação).
- **Resolvido em 30/09/2026:** política de privacidade publicada em
  `/privacidade/`, com o link "Privacidade" no rodapé (decisão de
  2026-09-30, §3).
- **Pendência consciente:** a política de privacidade do FieldFix
  (`/fieldfix/privacidade/`) está no ar sem canonical e sem Open Graph.
  Decisão do Weslley em 29/09/2026: fica assim por enquanto.
- **Resolvido em 30/09/2026:** `robots.txt`, `sitemap.xml` e JSON-LD
  (Organization, só com nome, endereço e contatos que o rodapé já publica),
  liberados no `.vercelignore` (QA-13).
- **Tarefa separada:** acessibilidade da Vora Jewelry (Lighthouse 87 em
  23/09/2026). Não bloqueia este site: saiu da ficha (§5.6).

---

## 10. Ordem de execução

0. Medir Lighthouse dos três sites. Anotar.
1. Branch `v3`. Ler `refs/` e `refs/NOTAS.md`.
2. **Fase 3 — direção escrita. PARAR e esperar aprovação.**
3. Escrever tokens do que foi aprovado.
4. Passar o item 8 no `index.html` inteiro — remover, sem reescrever.
5. Reestruturar seções na ordem do item 5.
6. Portfólio com fichas e números medidos.
7. Hero com a imagem; dashboard como segunda seção.
8. Motion: os três comportamentos, com a razão de cada.
9. QA do playbook `zyphy-projeto`.
10. `zyphy-review` em contexto limpo.
11. Preview na Vercel. Merge só depois do PASSA.
