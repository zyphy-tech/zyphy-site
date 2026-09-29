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

### 5.9 Rodapé
Marca, uma frase que não repita a do hero: "Sites, apps, dashboards e
automações sob medida." Contatos reais, © 2026. O link de Privacidade
entra quando a política sair do rascunho (ver §9).

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
   continua, como no `21st`. Sem suporte: pilha vertical.
2. **Soluções:** conforme a linha sobe pela tela, um traço atravessa o
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

**Vídeo do hero (decisão do Weslley, 2026-09-29):** o vídeo do hero é a
orquestração de entrada da página e fica **fora da conta dos três
comportamentos de scroll**. Toca uma vez, sem som, e para no último
quadro (sem loop). **O H1 aparece desde o primeiro quadro, em qualquer
tela;** subtítulo e botões também, porque com a sombra abaixo o contraste
passa em todos os quadros (atraso máximo permitido: 1s, só se o contraste
não passasse sem ele). **Celular sem vídeo:** só a imagem parada, tudo
visível no carregamento. Tablet e desktop tocam o vídeo; no tablet ele
fica abaixo do texto. Sem vídeo também com reduced-motion ou economia de
dados.

Sombra atrás do texto no desktop: 62%, desde o início. Medida quadro a
quadro (pixel mais claro atrás de cada linha): H1 precisa 49% (3:1, texto
grande), subtítulo 61%, "Ver projetos" 57%, linha de resposta 56%. Para
chegar nisso, subtítulo e linha de resposta usam a cor do texto em vez
da muted (com a muted precisariam de ~80%). Decisão do Weslley,
29/09/2026, depois de uma versão "vídeo primeiro, texto depois" que
escondia o texto durante o vídeo e foi desfeita.

Duração de 4,875s (117 quadros a 24fps), abaixo dos 5s do WCAG 2.2.2,
então dispensa botão de pausa; o corte tirou os primeiros quadros para o
último continuar igual ao poster. No desktop o texto fica na área escura
da esquerda. O **primeiro quadro** é o poster e a imagem parada onde o
vídeo toca (tablet e desktop), para o vídeo começar de onde a imagem está
sem "voltar"; se o vídeo não tocar (erro, autoplay bloqueado), a imagem
volta ao último quadro. O **último quadro** é a imagem do celular, do
reduced-motion e da economia de dados (sem vídeo) e a og:image.

GSAP permitido. Lenis fica de fora — scroll nativo basta e reduz JS.

---

## 8. Sai da página inteira

- Eyebrow ou label em cima de título
- Numeração em qualquer coisa que não seja o processo
- "→" e "↗" dentro de texto de link ou botão; "·" separando meta
- Trecho de código fictício
- `fade-up` por seção; hover com transform em card
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
  Weslley (ver §7); o último quadro é o poster, a imagem do celular e do
  reduced-motion, e a og:image.
- **Resolvido:** suporte pós-deploy de 7 dias, confirmado pelo Weslley em
  29/09/2026.
- **Aberto:** FieldFix na Play Store. O link
  `play.google.com/store/apps/details?id=com.fieldfix.app` devolveu 404
  em 29/09/2026. Até o Weslley confirmar no Play Console, o site não diz
  "publicado" nem tem link da loja (§5.6).
- **Aberto:** cargos dos três depoimentos (removidos do site até
  confirmação).
- **Aberto:** política de privacidade. Campos `[PREENCHER]` e revisão
  jurídica; até lá, fora do rodapé e fora do deploy (`.vercelignore`).
- **Pendência consciente:** a política de privacidade do FieldFix
  (`/fieldfix/privacidade/`) está no ar sem canonical e sem Open Graph.
  Decisão do Weslley em 29/09/2026: fica assim por enquanto.
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
