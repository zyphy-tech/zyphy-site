---
name: Zyphy
description: Site da Zyphy — agência de software sob medida para PMEs e pessoas. Escuro, monocromia petróleo, acento ciano raro.
colors:
  ink-950: "#050B0B"
  ink-900: "#112222"
  ink-850: "#1E3535"
  petrol-700: "#0E3634"
  mist-50: "#E8F7F4"
  mist-100: "#E3EFED"
  mist-400: "#93ADAA"
  cyan-500: "#00CBCC"
  cyan-400: "#00E0E1"
  coral-300: "#FF8A80"
  sage-500: "#5E8884"
  sage-600: "#4F7A76"
typography:
  display:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Fallback, sans-serif"
    fontSize: "min(clamp(4.5rem, 10vw, 9rem), 18cqi, 9.5svh)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  statement:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Fallback, sans-serif"
    fontSize: "clamp(4.5rem, 14vw, 12.5rem)"
    fontWeight: 800
    lineHeight: 0.9
  headline:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Fallback, sans-serif"
    fontSize: "clamp(4rem, 8.5vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.9
  display-number:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Fallback, sans-serif"
    fontSize: "clamp(6rem, 14vw, 12.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    fontFeature: "tnum"
  statement-mixed:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Fallback, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.35
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.35
  quote:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.35
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.9rem + 1vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.6
  micro:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  none: "0"
  control: "4px"
  screen: "12px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
  section: "clamp(96px, 14vw, 200px)"
  title-gap: "clamp(48px, 6vw, 96px)"
  gutter: "clamp(20px, 5vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.cyan-500}"
    textColor: "{colors.ink-950}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-400}"
    textColor: "{colors.ink-950}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  input:
    backgroundColor: "{colors.ink-950}"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
  dashboard-screen:
    backgroundColor: "{colors.ink-950}"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.screen}"
    padding: "clamp(24px, 4vw, 48px)"
  filter-segment-active:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.mist-100}"
    rounded: "{rounded.control}"
    height: "44px"
  plaque-media:
    backgroundColor: "{colors.ink-850}"
    rounded: "{rounded.none}"
---

<!-- EXTRAÍDO do código em 30/09/2026 (css/tokens.css e css/styles.css,
     commit 1c3c25e), na volta de correção do zyphy-ciclo. Aguarda aprovação
     do Weslley. A partir da aprovação este arquivo é a única fonte de tokens:
     css/tokens.css materializa o que está aqui, nunca o contrário.
     Ajustes da mesma volta, já refletidos abaixo (ver "Ajustes de 30/09/2026"
     no fim): mist-50 e text-on-color, fs-h1-vh, fs-lead fluido, lh-heading
     1.35, lh-lead, strike-y 54%, dores em caixa mista. -->

# Design System: Zyphy

## Overview

**Creative North Star: "A plaqueta de máquina"**

O site é uma placa de identificação de equipamento industrial vista no
escuro: uma família de tom só (petróleo, derivada do ciano da marca)
executada até o fim, letra neutra comprimida em caixa alta fazendo a
estrutura, e o ciano aparecendo só onde há ação. A personalidade vem da
escala e da composição, não do desenho da letra nem de enfeite. É a
leitura das duas referências escuras do brief: a monocromia disciplinada e
a condensada em caixa alta do `Fasion`, o fundo escuro com profundidade e o
conteúdo que vaza pela borda do `21`. `apple 1` e `abacate` entram como
disciplina de espaço; `nubank` como coragem de tamanho numa frase só (o
contato).

O ritmo da página vem da troca de fundo entre bandas de largura total,
nunca de borda, sombra ou card flutuante (`site 2`, `apple 1`). Como o site
é escuro por decisão travada, o respiro que nas referências claras vinha
do branco é conquistado com espaçamento grande (`--section-pad` até 200px)
e com quatro níveis de tom.

A imagem é real e autoral: o vídeo do hero (papel dando lugar ao painel) e
as capturas dos projetos. Nada de ícone genérico, ilustração abstrata,
rede, nó ou partícula.

**Key Characteristics:**
- Fundo escuro em quatro tons da mesma família; uma única banda chapada de cor (petróleo), só no contato.
- Ciano raro: botão primário, foco de teclado, barra ativa do gráfico, skip link e o Z do logo. Nada mais.
- Sofia Sans Extra Condensed 800 em caixa alta para estrutura; Archivo para leitura.
- Hierarquia por tamanho e tom, nunca por peso de display.
- Três comportamentos de movimento na página inteira, cada um carregando informação.

## Colors

Monocromia petróleo (matiz ~180°) com um acento ciano e um vermelho-coral
só para erro.

### Primary
- **Ciano da marca** (cyan-500): acento de ação e estado. Botão primário (hero, menu, formulário), anel de foco, barra ativa do dashboard, skip link, Z do logo. 9.8:1 sobre ink-950.
- **Ciano aceso** (cyan-400): hover do botão primário, e só isso.

### Tertiary
- **Coral de erro** (coral-300): mensagem e contorno de campo inválido. 5.7:1 ou mais em todas as bandas.

### Neutral
- **Fundo de poço** (ink-950): banda funda — hero, projetos, rodapé — e a tela do dashboard. Também é a cor do texto sobre o ciano.
- **Chão de oficina** (ink-900): banda base — Soluções.
- **Chapa elevada** (ink-850): banda elevada — dashboard, processo — e o fundo das capturas e do menu móvel.
- **Petróleo** (petrol-700): a única banda de cor chapada, só no contato.
- **Névoa** (mist-100): texto em toda banda escura. 16.8:1 sobre ink-950, 11.2:1 sobre petróleo.
- **Névoa clara** (mist-50): texto sobre a banda de petróleo. Puxa para o matiz da banda; o cinza-névoa ali lia apagado. 11.9:1.
- **Névoa baixa** (mist-400): texto secundário, labels, ficha técnica, legenda. 5.5:1 no pior fundo.
- **Sálvia** (sage-500): contorno de campo de formulário (3.3:1 no petróleo, acima do 3:1 de componente).
- **Sálvia escura** (sage-600): barra inativa do gráfico (4.1:1 sobre a tela).
- Linhas: divisória interna de lista em névoa a 12% (`rgba(227,239,237,.12)`), grade do gráfico a 10%.

### Named Rules
**The Rare Cyan Rule.** O ciano marca só ação e estado. Traço, título, ícone ou destaque decorativo em ciano estão proibidos; o traço das Soluções usa a cor do texto por isso.

**The Neighbour Rule.** Bandas vizinhas nunca têm o mesmo fundo. Sequência: hero funda, dashboard elevada, soluções base, processo elevada, projetos funda, contato petróleo, rodapé funda. Menor degrau entre vizinhas: 1.20:1.

## Typography

**Display Font:** Sofia Sans Extra Condensed 800 (reserva métrica calibrada sobre Impact, depois sans-serif do sistema)
**Body Font:** Archivo variável 100–900 (com system-ui)

**Character:** Uma condensada neutra e pesada que vira estrutura quando empilhada em caixa alta, contra uma grotesca larga e calma para ler. Sem terceira família: dado técnico é Archivo com algarismos tabulares.

### Hierarchy
- **Display XL** (800, H1 até 144px, travado por coluna e por 9.5svh; frase do contato até 200px; 0.9, caixa alta): H1 do hero e a frase do contato. No celular o H1 tem 4 linhas fixas, acima de 600px 3 linhas.
- **Display L** (800, até 200px, 0.9, tabular): números 1–4 do processo, em névoa baixa.
- **Headline** (800, até 120px, 0.9, caixa alta, máximo 18ch): H2 das seções.
- **Display M** (800, até 72px): dores das Soluções em caixa mista com entrelinha 1.35; indicadores do dashboard com algarismos tabulares.
- **Title** (Archivo 600, 24px, 1.35): títulos de bloco — plaqueta, passo, público, dashboard.
- **Quote** (Archivo 500, 22px, 1.35): depoimento dentro da plaqueta.
- **Lead** (Archivo 400, 20→24px, 1.4, máximo 44ch): subtítulo do hero; a frase do diferencial em 600.
- **Body** (Archivo 400, 17px, 1.6, máximo 60ch): texto corrido.
- **Label** (Archivo 500, 15px): nav, labels de formulário, ficha técnica, notas.
- **Micro** (Archivo 400, 13px, tabular): eixos do gráfico. Piso de 12px.

### Named Rules
**The Two Leadings Rule.** Entrelinha 0.9 só em caixa alta (sem descendentes). Todo título em caixa mista que quebra linha usa 1.35.

**The Caps Are Structure Rule.** Caixa alta é para frase curta de estrutura (H1, H2, frase do contato). Frase de leitura, mesmo em display, vai em caixa mista.

**The Size Not Weight Rule.** Os níveis de display são todos 800; a hierarquia vem de tamanho e tom.

## Layout

Grade de 12 colunas a partir de 1100px, container de 1320px com gutter
fluido (20→64px) e espaço entre colunas de 16→24px. Abaixo de 1100px, uma
coluna. Espaçamento em base 8 (4 a 96px); cada banda respira
`clamp(96px,14vw,200px)` em cima e embaixo; título até conteúdo
`clamp(48px,6vw,96px)`. Header fixo de 68px, alvos de toque de 44px,
controles de 48px.

Cada seção tem forma própria ligada ao conteúdo (regra 2 do playbook):
hero com vídeo atrás do texto (desktop) ou abaixo (tablet) ou atrás em
recorte 4:5 (celular); dashboard em tela própria ocupando ~70% da altura;
Soluções com H2 fixo à esquerda (4 colunas) e dores passando à direita
(8 colunas); processo em escada, cada passo duas colunas depois do
anterior; projetos em trilho horizontal de plaquetas (80vw, até 1200px)
com a seção fixa; contato com a frase ocupando a primeira tela da banda.

Pontos de quebra: 600px (celular), 700/760px (formulário e contato),
900px (nav vira menu), 1100px (grade de 12), altura mínima de 760px para o
trilho horizontal.

## Elevation & Depth

Plano. Não há sombra em nenhum elemento. Profundidade vem de tom: bandas
em quatro níveis, a tela do dashboard um tom abaixo da banda em volta, o
segmento ativo do filtro um tom acima. As únicas camadas translúcidas são
funcionais: o header (fundo a 92% com desfoque de 12px), a sombra de
leitura atrás do texto do hero (62% no desktop, 52% no celular, medidas
quadro a quadro contra o vídeo) e o degradê que funde o vídeo na banda.

### Named Rules
**The No Shadow Rule.** Sombra cinza é proibida (brief §8). Separar conteúdo é trabalho da troca de fundo.

## Shapes

Raio em hierarquia, nunca igual em tudo: 0 em imagens e bandas, 4px em
botão, campo e segmento de filtro, 12px só na tela do dashboard — o único
objeto com cara de tela. Bordas de 1px: névoa a 12% como divisória dentro
de lista e contorno das capturas; sálvia no campo de formulário.

## Components

### Buttons
- **Shape:** cantos quase retos (4px), altura 48px, Archivo 600 a 17px.
- **Primary:** ciano chapado com texto ink-950; hover no ciano aceso. Um por contexto: hero, menu móvel, formulário.
- **Ghost:** transparente, texto névoa, contorno de 1px em névoa baixa que vira névoa no hover. "Ver projetos" e o "Começar projeto" do header.
- **Focus:** contorno de 2px em ciano, afastado 3px, em todo elemento interativo.
- Sem "→" ou "↗" no texto do botão.

### Inputs / Fields
- **Style:** fundo ink-950, contorno de 1px em sálvia, 4px de raio, 48px de altura; textarea com 128px mínimos.
- **Focus:** contorno vira ciano.
- **Error:** contorno coral com anel de 3px em coral a 20%, mensagem em coral logo abaixo do campo.

### Navigation
- Links em Archivo 500 a 15px, névoa baixa que acende para névoa no hover. Abaixo de 900px vira botão de menu (44px, contorno de 1px) com o atalho do WhatsApp ao lado, na mesma borda. Nenhum botão flutua sobre o conteúdo.

### Dashboard ao vivo (assinatura)
Tela ink-950 com raio de 12px dentro da banda elevada. Três indicadores em
Sofia tabular, filtro segmentado de três períodos, gráfico de barras em
HTML sobre grade SVG. Barra inativa em sálvia escura, a do período atual em
ciano. Na troca de filtro cada barra vai do valor antigo ao novo em 600ms.

### Plaqueta de projeto (assinatura)
Captura 8:5 sem raio, com contorno de 1px, e ao lado (desktop, 3:2) título,
descrição, ficha técnica em duas colunas label/valor com algarismos
tabulares, link sublinhado e, quando confirmado, o depoimento separado por
uma linha fina. Todas com a altura da mais alta.

### Dor riscada (assinatura)
Dor em Sofia 800 caixa mista, atravessada por um traço na cor do texto
(9% da letra) no meio da altura-x, seguida do serviço em Archivo 600 e da
entrega, que ganha contraste conforme a linha sobe pela tela.

## Do's and Don'ts

### Do:
- **Do** tirar todo valor de cor, fonte, tamanho, espaço, raio e duração de `css/tokens.css`, que materializa este arquivo.
- **Do** separar seções pela troca de banda, respeitando a sequência da The Neighbour Rule.
- **Do** manter título e botão principal visíveis desde o primeiro quadro; o texto do hero fica sobre a sombra de leitura medida.
- **Do** usar entrelinha 1.35 em todo título em caixa mista que quebra linha.
- **Do** manter os três comportamentos de movimento e `prefers-reduced-motion` indo direto ao estado final.

### Don't:
- **Don't** usar ciano fora de ação e estado.
- **Don't** usar sombra, card flutuante ou borda entre seções.
- **Don't** pôr frase de leitura inteira em caixa alta.
- **Don't** usar Inter, Roboto, Arial, Helvetica ou Space Grotesk.
- **Don't** usar eyebrow, numeração fora do processo, fade-up, hover com transform em card, marquee, contador animado ou botão flutuante (brief §3, §7, §8).

## Movimento

Três comportamentos, e só eles (brief §7). Curva `cubic-bezier(.215,.61,.355,1)`,
200ms em hover e foco, 600ms nas barras do dashboard.
1. Projetos: trilho horizontal pelo scroll vertical (CSS scroll-driven, `contain 0% contain 100%`). Informa que há mais projetos além da borda.
2. Soluções: traço atravessa a dor e a entrega sai do tom baixo para o texto (`animation-timeline: view()`, `entry 100% cover 50%`). Informa que a dor vira solução.
3. Dashboard: barras do valor antigo ao novo na troca de filtro (`startViewTransition`). Informa que o filtro de fato refiltra.
O vídeo do hero (4,875s, toca uma vez) fica fora da conta.

## Mapa de tokens (css/tokens.css)

Todo custom property de `css/tokens.css`, com o papel. Primitivos de cor e
escala estão no frontmatter; aqui está o resto, agrupado.

| Grupo | Tokens | Papel |
|---|---|---|
| Cor, primitivos | `--ink-950` `--ink-900` `--ink-850` `--petrol-700` `--mist-50` `--mist-100` `--mist-400` `--cyan-500` `--cyan-400` `--coral-300` `--sage-500` `--sage-600` | ver Colors |
| Cor, bandas | `--band-deep` `--band-base` `--band-raised` `--band-color` | fundo de cada banda |
| Cor, texto e linha | `--text` `--text-muted` `--text-on-color` `--line` `--line-control` `--mask-opaque` | texto, texto secundário, texto na banda de cor, divisória, contorno de campo, máscara de alfa do vídeo |
| Cor, acento e estado | `--accent` `--accent-hover` `--on-accent` `--focus-ring` `--error` `--error-ring` | ação, foco, erro |
| Dashboard | `--bar-idle` `--bar-active` `--chart-grid` `--dash-pad` `--chart-h` `--chart-pad-top` `--chart-pad-bottom` `--chart-pad-left` `--chart-tick-gap` `--chart-label-offset` `--chart-label-min` `--chart-bar-min` `--chart-bar-fill` `--chart-bar-fill-dense` | cores e geometria do gráfico (lidas pelo js/dashboard.js) |
| Hero | `--hero-ratio` `--hero-screen-at` `--hero-clearance` `--hero-pad-top` `--hero-pad-bottom` `--hero-shade` `--hero-scrim-bottom` `--hero-focus-tablet` `--hero-focus-phone` `--hero-shade-phone` `--hero-scrim-phone` | enquadramento do vídeo, centro ótico do texto, sombras de leitura medidas |
| Fontes e pesos | `--font-display` `--font-body` `--weight-display` `--weight-body` `--weight-medium` `--weight-strong` | ver Typography |
| Tamanhos | `--fs-h1-max` `--fs-h1` `--fs-h1-fit` `--fs-h1-fit-narrow` `--fs-h1-vh` `--fs-statement` `--fs-h2` `--fs-step-num` `--fs-m` `--fs-h3` `--fs-kpi` `--fs-quote` `--fs-lead` `--fs-body` `--fs-small` `--fs-micro` | escala; o H1 é o menor entre o fluido, a trava da coluna e a trava da altura |
| Entrelinha e forma do texto | `--lh-display` `--lh-heading` `--lh-body` `--lh-lead` `--tracking-display` `--case-display` `--numeric-data` `--measure` `--measure-lead` `--measure-h2` | ver The Two Leadings Rule |
| Espaço | `--space-1` `--space-2` `--space-3` `--space-4` `--space-5` `--space-6` `--space-7` `--space-8` `--space-9` `--section-pad` `--title-gap` | base 8 |
| Layout | `--container` `--gutter` `--columns` `--col-gap` `--header-h` `--tap` `--icon` `--control-h` `--form-max` `--ring` `--focus-offset` `--underline-offset` `--header-blur` `--header-opacity` `--hairline` `--focus-width` `--textarea-min-h` `--status-min-h` `--col-min-audience` | grade, alvos, controles, detalhes de borda e foco |
| Proporções | `--ratio-hero-mobile` `--ratio-hero-phone` `--ratio-project` | 4:3 tablet, 4:5 celular, 8:5 capturas |
| Raio | `--r-none` `--r-control` `--r-screen` | ver Shapes |
| Movimento | `--ease-out` `--dur-fast` `--dur-data` `--fix-range` `--strike-color` `--strike-w` `--strike-y` `--plaque-w` `--plaque-gap` `--plaque-count` `--proj-range` `--proj-distance` | ver Movimento |
| Camadas | `--z-menu` `--z-header` `--z-skip` | menu, header, skip link |

## Ajustes de 30/09/2026

Feitos na volta de correção do `zyphy-ciclo`, a partir do `qa/review.json`:

| Token | Antes | Depois | Por quê |
|---|---|---|---|
| `--mist-50`, `--text-on-color` | — | `#E8F7F4` no texto da banda de petróleo | névoa cinza sobre o petróleo lia apagado (gray-on-color) |
| `--fs-h1-vh` | — | `9.5svh`, terceira trava do H1 a partir de 600px | H1 ocupava 34% da tela em 1280x800 (oversized-h1); agora ~26% |
| `--fs-lead` | 19px fixo | 20→24px | o sub leva o diferencial e virou o segundo texto da primeira tela (U1) |
| `--lh-heading` | 1.2 | 1.35 | títulos em caixa mista que quebram linha (tight-leading) |
| `--lh-lead` | — | 1.4 | entrelinha do sub no tamanho novo |
| `--strike-y` | 45% | 54% | a dor saiu da caixa alta; o traço passa no meio da altura-x |
