---
name: Zyphy
description: "Extraído do código em 30/09/2026 (commit ca749b7). Documenta o que existe em css/tokens.css e no CSS de componentes. Aguarda aprovação."
# Chaves = nomes exatamente como estão no CSS (token ou seletor).
colors:
  "--ink-950": "#050B0B"
  "--ink-900": "#112222"
  "--ink-850": "#1E3535"
  "--petrol-700": "#0E3634"
  "--mist-50": "#E8F7F4"
  "--mist-100": "#E3EFED"
  "--mist-400": "#93ADAA"
  "--cyan-500": "#00CBCC"
  "--cyan-400": "#00E0E1"
  "--coral-300": "#FF8A80"
  "--sage-500": "#5E8884"
  "--sage-600": "#4F7A76"
  "--line": "rgba(227,239,237,.12)"
  "--chart-grid": "rgba(227,239,237,.1)"
  "--error-ring": "rgba(255,138,128,.2)"
  "--mask-opaque": "#000"
typography:
  ".display-h1":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "min(var(--fs-h1),var(--fs-h1-fit),var(--fs-h1-vh))"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  ".display-h2":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "clamp(4rem,8.5vw,7.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  ".display-statement":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "clamp(4.5rem,14vw,12.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  ".step-num":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "clamp(6rem,14vw,12.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  ".fix-pain":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "clamp(2.5rem,5vw,4.5rem)"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0"
  ".dash-kpi dd":
    fontFamily: "'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif"
    fontSize: "clamp(2.5rem,5vw,4.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  "--fs-lead":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "clamp(1.25rem,0.9rem + 1vw,1.5rem)"
  "--fs-h3":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.35
  "--fs-quote":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.35
  "--fs-body":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.6
  "--fs-small":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "0.9375rem"
  "--fs-micro":
    fontFamily: "'Archivo',system-ui,sans-serif"
    fontSize: "0.8125rem"
rounded:
  "--r-none": "0"
  "--r-control": "4px"
  "--r-screen": "12px"
spacing:
  "--space-1": "4px"
  "--space-2": "8px"
  "--space-3": "12px"
  "--space-4": "16px"
  "--space-5": "24px"
  "--space-6": "32px"
  "--space-7": "48px"
  "--space-8": "64px"
  "--space-9": "96px"
  "--section-pad": "clamp(96px,14vw,200px)"
  "--title-gap": "clamp(48px,6vw,96px)"
  "--gutter": "clamp(20px,5vw,64px)"
  "--col-gap": "clamp(16px,2vw,24px)"
components:
  ".btn--primary":
    backgroundColor: "{colors.--cyan-500}"
    textColor: "{colors.--ink-950}"
    typography: "{typography.--fs-body}"
    rounded: "{rounded.--r-control}"
    padding: "12px 24px"
    height: "48px"
  ".btn--primary:hover":
    backgroundColor: "{colors.--cyan-400}"
  ".btn--ghost":
    backgroundColor: "transparent"
    textColor: "{colors.--mist-100}"
    typography: "{typography.--fs-body}"
    rounded: "{rounded.--r-control}"
    padding: "12px 24px"
    height: "48px"
  ".form-input":
    backgroundColor: "{colors.--ink-950}"
    textColor: "{colors.--mist-100}"
    typography: "{typography.--fs-body}"
    rounded: "{rounded.--r-control}"
    padding: "12px 16px"
    height: "48px"
  ".dash":
    backgroundColor: "{colors.--ink-950}"
    rounded: "{rounded.--r-screen}"
    padding: "clamp(24px,4vw,48px)"
  ".dash-filter":
    backgroundColor: "{colors.--ink-900}"
    rounded: "{rounded.--r-control}"
    padding: "4px"
  ".dash-filter-btn":
    backgroundColor: "transparent"
    textColor: "{colors.--mist-400}"
    typography: "{typography.--fs-small}"
    rounded: "{rounded.--r-control}"
    padding: "0 16px"
    height: "44px"
  ".dash-filter-btn[aria-pressed=\"true\"]":
    backgroundColor: "{colors.--ink-850}"
    textColor: "{colors.--mist-100}"
  ".plaque-media":
    backgroundColor: "{colors.--ink-850}"
    rounded: "{rounded.--r-none}"
  ".skip-link":
    backgroundColor: "{colors.--cyan-500}"
    textColor: "{colors.--ink-950}"
    typography: "{typography.--fs-small}"
    rounded: "{rounded.--r-control}"
    padding: "12px 24px"
---

<!-- EXTRAÍDO do código em 30/09/2026, commit ca749b7, sem alterar o site.
     Substitui por inteiro a extração anterior. Aguarda aprovação do Weslley.
     Este arquivo só documenta o que está no código: nomes de token e de
     classe como estão no CSS, valores como estão, e motivo apenas quando o
     brief ou um comentário do CSS o declara (com a linha citada). Não
     registra conceito nem direção: isso é do modo DIRECAO, com aprovação. -->

# Design System: Zyphy

## Overview

Documento extraído do código, não uma direção. Fontes lidas:

- `css/tokens.css` — o arquivo de tokens (`@font-face` e `:root`).
- O CSS de componentes, `css/styles.css` — citado como `styles:NN`.
- O script do gráfico, `js/dashboard.js`, que lê tokens por
  `getComputedStyle` (linhas 50–64).
- `index.html` e `privacidade/index.html` (as duas carregam os dois CSS).
- `brief-zyphy-site-v3.md` — citado como `brief:NN`.

Fora deste documento: `fieldfix/privacidade/` tem folha de estilo própria,
com tokens próprios; o comentário da linha 3 dela diz "Identidade própria
do FieldFix (não são os tokens do site da Zyphy)".

O cabeçalho de `css/tokens.css` (linhas 18–20) traz um parágrafo de
conceito. Ele não é registrado aqui: a extração não adota conceito nem
direção.

## Colors

### Primitivos (`css/tokens.css:85–96`)

| Token | Valor | Comentário no CSS | Papel que aponta para ele |
|---|---|---|---|
| `--ink-950` | `#050B0B` | "banda mais funda" (:85) | `--band-deep`, `--on-accent` |
| `--ink-900` | `#112222` | "banda base" (:86) | `--band-base` |
| `--ink-850` | `#1E3535` | "banda elevada" (:87) | `--band-raised` |
| `--petrol-700` | `#0E3634` | "a única banda de cor chapada" (:88) | `--band-color` |
| `--mist-50` | `#E8F7F4` | "texto sobre a banda de cor: 11.9 sobre petrol" (:89) | `--text-on-color` |
| `--mist-100` | `#E3EFED` | "texto" (:90) | `--text` |
| `--mist-400` | `#93ADAA` | "texto secundário, labels" (:91) | `--text-muted` |
| `--cyan-500` | `#00CBCC` | "ciano da marca" (:92) | `--accent`, `--focus-ring` |
| `--cyan-400` | `#00E0E1` | "ciano no hover" (:93) | `--accent-hover` |
| `--coral-300` | `#FF8A80` | "erro" (:94) | `--error` |
| `--sage-500` | `#5E8884` | "borda dos campos do formulário" (:95) | `--line-control` |
| `--sage-600` | `#4F7A76` | "barra inativa do gráfico" (:96) | `--bar-idle` |

Comentário do bloco (:73): "família petróleo, matiz ~180°".

### Papéis (`css/tokens.css:98–131`)

| Token | Valor no CSS | Onde é usado |
|---|---|---|
| `--band-deep` | `var(--ink-950)` | `body` (styles:10), `.band--deep`, fundo do header em `color-mix` (styles:57), `.hero-media` (styles:102), `.dash` (styles:149), `.form-input` (styles:321), `--hero-shade`, `--hero-shade-phone`, `--hero-scrim-bottom`, `--hero-scrim-phone` |
| `--band-base` | `var(--ink-900)` | `.band--base`, `.dash-filter` (styles:152) |
| `--band-raised` | `var(--ink-850)` | `.band--raised`, `.mobile-menu` (styles:78), `.dash-filter-btn[aria-pressed="true"]` (styles:155), `.plaque-media` (styles:267) |
| `--band-color` | `var(--petrol-700)` | `.band--color` (styles:33) |
| `--text` | `var(--mist-100)` | cor do `body` e da maior parte do texto; dentro de `.band--color` é redefinido para `var(--text-on-color)` (styles:33) |
| `--text-muted` | `var(--mist-400)` | `::placeholder`, `.nav-links`, `.dash-filter-btn`, `dt`, legendas, `.step-num`, `.step-desc`, `.audience-list li`, `.project-desc`, notas de formulário, rodapé; contorno do `.btn--ghost` (styles:86); sublinhado do `.project-link` (styles:276) |
| `--text-on-color` | `var(--mist-50)` | texto na `.band--color` |
| `--line` | `rgba(227,239,237,.12)` | borda do header rolado (styles:58), `.nav-burger`, `.nav-wa` (≤900px), `.mobile-menu-link`, `.fix-item`, `.audience-list li`, `.plaque-media`, `.plaque-quote` |
| `--line-control` | `var(--sage-500)` | contorno do `.form-input` (styles:321) |
| `--mask-opaque` | `#000` | `mask-image` do vídeo do hero no desktop (styles:140) |
| `--accent` | `var(--cyan-500)` | `.btn--primary`, `.skip-link`, `.zy-logo-z`, `.social-link:focus-visible`; `--bar-active` aponta para ele |
| `--accent-hover` | `var(--cyan-400)` | `.btn--primary:hover` |
| `--on-accent` | `var(--ink-950)` | texto do `.btn--primary` e do `.skip-link` |
| `--focus-ring` | `var(--cyan-500)` | `:focus-visible` (styles:13), borda do `.form-input:focus-visible` (styles:322) |
| `--error` | `var(--coral-300)` | `.form-error`, borda do `.form-input--invalid` |
| `--error-ring` | `rgba(255,138,128,.2)` | `box-shadow` do `.form-input--invalid` (styles:326) |
| `--bar-idle` | `var(--sage-600)` | `.dash-chart .bar` |
| `--bar-active` | `var(--accent)` | `.dash-chart .bar--now` |
| `--chart-grid` | `rgba(227,239,237,.1)` | `stroke` de `.dash-chart .grid` |

`--line`, `--chart-grid` e `--error-ring` são literais `rgba()` com os
mesmos canais de `--mist-100` e `--coral-300`; não apontam para eles por
`var()`.

Motivos declarados em comentário:

- `--band-*`: "vizinhas nunca iguais; petróleo só no contato", com a
  sequência hero deep, dashboard raised, soluções base, processo raised,
  projetos deep, contato color, rodapé deep (:99–101).
- `--text-on-color`: "o cinza-névoa sobre o petróleo lia apagado
  (impeccable gray-on-color, volta de 30/09/2026)" (:109–110).
- `--line`: "divisória dentro de lista, nunca entre seções" (:112).
- `--line-control`: "componente de interface, precisa de 3:1 (WCAG 1.4.11)
  contra o fundo do campo e contra a banda de cor em volta. --line não
  chega" (:113–114).
- `--accent`: "acento raro, reservado para ação e estado: botão primário
  (hero, menu, formulário), foco de teclado, barra ativa do dashboard, skip
  link e o Z do logo" (:118–120). O brief diz, sobre o traço das Soluções,
  "ciano fica reservado para ação" (brief:266).

Contraste registrado no comentário de `css/tokens.css:74–84` (valores do
comentário, não remedidos nesta extração):

| | 950 | 900 | 850 | petrol |
|---|---|---|---|---|
| `--mist-100` | 16.8 | 14.0 | 11.0 | 11.2 |
| `--mist-400` | 8.3 | 6.9 | 5.5 | 5.5 |
| `--accent` | 9.8 | 8.2 | 6.5 | 6.5 |
| `--error` | 8.7 | 7.2 | 5.7 | 5.8 |

`--on-accent` sobre `--accent`: 9.8. `--sage-500` sobre 950 / petrol: 5.0 /
3.3. `--bar-idle` sobre 950: 4.1. Degrau entre bandas: 950/900 1.20,
900/850 1.27, 950/850 1.53, petrol/900 1.25, petrol/950 1.51.

## Typography

### Famílias (`css/tokens.css:23–68`, 174–175)

| Token | Valor |
|---|---|
| `--font-display` | `'Sofia Sans Extra Condensed','Sofia Fallback',sans-serif` |
| `--font-body` | `'Archivo',system-ui,sans-serif` |

- `Sofia Sans Extra Condensed`: só peso 800, arquivo
  `assets/fonts/sofia-sans-extra-condensed-800-latin.woff2`,
  `font-display:swap`, subset latino (:26–33). Comentário: "display: H1, H2,
  frase do contato e números do processo. Só o peso 800" (:25). Tem
  `preload` no `<head>` (index.html:33, privacidade/index.html:16).
- `Sofia Fallback`: `src:local('Impact')`, `size-adjust:81.3%`,
  `ascent-override:110.70%`, `descent-override:36.90%`,
  `line-gap-override:0%` (:49–58). As medições da calibração estão no
  comentário das linhas 35–48. `js/boot.js` pede essa face antes do primeiro
  paint.
- `Archivo`: variável, `font-weight:100 900`, arquivo
  `assets/fonts/archivo-var-latin.woff2`, `font-display:swap` (:61–68).
  Comentário: "corpo: Archivo variável (eixo de peso 100–900, largura
  normal)" (:60).

### Pesos (:177–180)

| Token | Valor | Onde |
|---|---|---|
| `--weight-display` | 800 | seletores de display (styles:37) e `.brand` (styles:60, em `--font-body`) |
| `--weight-body` | 400 | `body` |
| `--weight-medium` | 500 | `.nav-links`, `.mobile-menu-link`, `.hero-note`, `.dash-filter-btn`, `.plaque-quote p`, `.form-label`, `.form-error`, `.form-status` |
| `--weight-strong` | 600 | `.skip-link`, `.btn`, `.dash-title`, `.fix-service`, `.audience-title`, `.step-title`, `.plaque-title` |

### Tamanhos (:192–218)

| Token | Valor | Seletores |
|---|---|---|
| `--fs-h1-max` | `9rem` | limite de `--fs-h1`; teto do H1 de 600 a 1099px (styles:51) |
| `--fs-h1` | `clamp(4.5rem,10vw,var(--fs-h1-max))` | `.display-h1` |
| `--fs-h1-fit` | `18cqi` | `.display-h1` a partir de 600px |
| `--fs-h1-fit-narrow` | `22cqi` | `.display-h1` abaixo de 600px |
| `--fs-h1-vh` | `9.5svh` | `.display-h1` a partir de 600px |
| `--fs-statement` | `clamp(4.5rem,14vw,12.5rem)` | `.display-statement` |
| `--fs-h2` | `clamp(4rem,8.5vw,7.5rem)` | `.display-h2` |
| `--fs-step-num` | `clamp(6rem,14vw,12.5rem)` | `.step-num` |
| `--fs-m` | `clamp(2.5rem,5vw,4.5rem)` | `.fix-pain`; via `--fs-kpi` |
| `--fs-kpi` | `var(--fs-m)` | `.dash-kpi dd` |
| `--fs-h3` | `1.5rem` | `.dash-title`, `.audience-title`, `.step-title`, `.plaque-title` |
| `--fs-quote` | `1.375rem` | `.plaque-quote p` |
| `--fs-lead` | `clamp(1.25rem,0.9rem + 1vw,1.5rem)` | `.hero-sub`, `.brand` |
| `--fs-body` | `1.0625rem` | `body`, `.btn`, `.hero-note`, `.form-input` |
| `--fs-small` | `0.9375rem` | `.skip-link`, `.nav-links`, `.nav-cta`, `.dash-filter-btn`, `.dash-kpi dt`, `.dash-chart-label`, `.dash-caption`, `.spec-source`, `.project-desc`, `.spec`, `.project-link`, `.plaque-quote figcaption`, `.contact-direct-label`, `.form-label`, `.form-field-hint`, `.form-error`, `.form-hint`, `.form-status`, `.footer-text`, `.footer-links`, `.footer-copy` |
| `--fs-micro` | `0.8125rem` | `.dash-chart .tick` |

Tamanho do `.display-h1` por faixa (styles:38–52):

- base: `min(var(--fs-h1),var(--fs-h1-fit),var(--fs-h1-vh))`
- até 599px: `min(var(--fs-h1),var(--fs-h1-fit-narrow))`
- 600–1099px: `min(var(--fs-h1-max),var(--fs-h1-fit),var(--fs-h1-vh))`

Quebra do H1: `span.line` em bloco (3 linhas) e `br.br-m` ocultos; até
599px os `span.line` ficam inline e os `br.br-m` aparecem (4 linhas)
(styles:39–47, index.html:78). O `.hero-copy` é contêiner
(`container-type:inline-size`, styles:92), que dá base ao `cqi`.

Motivos declarados em comentário: `--fs-h1-fit` e `--fs-h1-fit-narrow`
(:194–198); `--fs-h1-vh`, "Com 100px em 1280x800 ele ocupava 34% da tela
e o subtítulo e a linha de resposta sumiam ao lado dele (impeccable
oversized-h1, volta de 30/09/2026)" (:199–205; também brief:113–120);
`--fs-lead`, "Leva o diferencial [...] então é o segundo texto da primeira
tela" (:213–215). O comentário das linhas 182–191 registra a escala por
largura (375 e 1440px) e a regra "Quatro níveis de display, todos em
Sofia 800; a hierarquia vem de tamanho e tom, nunca de peso".

### Entrelinha, caixa e medida (:220–236)

| Token | Valor | Onde |
|---|---|---|
| `--lh-display` | `0.9` | seletores de display (styles:37) |
| `--lh-heading` | `1.35` | `.fix-pain`, `.dash-title`, `.audience-title`, `.step-title`, `.plaque-title`, `.plaque-quote p` |
| `--lh-body` | `1.6` | `body`, `textarea.form-input` |
| `--lh-lead` | `1.4` | `.hero-sub` |
| `--tracking-display` | `0` | seletores de display |
| `--case-display` | `uppercase` | seletores de display; `.fix-pain` e `.dash-kpi dd` sobrescrevem com `text-transform:none` (styles:162, 212) |
| `--numeric-data` | `tabular-nums` | `.dash-kpi dd`, `.dash-chart .tick`, `.step-num`, `.spec dd` |
| `--measure` | `60ch` | `p` (styles:16); `.footer-copy` usa `max-width:none` (styles:348) |
| `--measure-lead` | `44ch` | `.hero-sub` |
| `--measure-h2` | `18ch` | `.display-h2` |

Seletores de display (styles:37): `.display-h1`, `.display-h2`,
`.display-statement`, `.step-num`, `.fix-pain`, `.dash-kpi dd` — todos com
`--font-display`, `--weight-display`, `--tracking-display`,
`--case-display` e `--lh-display`.

Motivos declarados: as duas entrelinhas de título, "0.9 só para caixa alta
[...] que não tem descendente; a outra para todo título em caixa mista que
quebra linha" (:220–222). Dores em caixa mista: "frase inteira em caixa
alta cansava a leitura (review U5, 30/09/2026)" (styles:210–211;
brief:138–143). `--numeric-data`: "dado técnico: Archivo tabular, sem
terceira família" (:231).

## Layout

### Tokens (:252–277)

| Token | Valor | Onde |
|---|---|---|
| `--container` | `1320px` | `.container`, `.nav-main`, `.projects-track` (`max-width: calc(var(--container) + 2 * var(--gutter))`); cálculo de `--copy-end` no hero |
| `--gutter` | `clamp(20px,5vw,64px)` | `padding-inline` de `.container`, `.nav-main`, `.projects-track`, `.mobile-menu`; sangria do `.hero-media` |
| `--columns` | `12` | `.hero-grid`, `.sol-grid`, `.steps` a partir de 1100px |
| `--col-gap` | `clamp(16px,2vw,24px)` | as mesmas grades |
| `--header-h` | `68px` | `.site-header`, `scroll-margin-top` da `.band`, topo do `.hero`, `.mobile-menu`, `.sol-title` sticky, `--plaque-row-h`, `.plaque-media` sticky, `.contact-lead`, `scroll-margin-top` da `.contact-sub` |
| `--tap` | `44px` | `.brand`, `.nav-links a`, `.nav-cta`, `.nav-burger`, `.dash-filter-btn`, `.project-link`, `.footer-links a`, `.social-link` (comentário: "alvo de toque mínimo") |
| `--icon` | `24px` | `.social-icon` |
| `--control-h` | `48px` | `.btn`, `.form-input`, `.mobile-menu-link` |
| `--form-max` | `760px` | `.contact-form` |
| `--col-min-audience` | `220px` | `.audience` (`auto-fit`) |
| `--section-pad` | `clamp(96px,14vw,200px)` | `padding-block` da `.band`; `.contact-lead` (comentário: "respiro vertical de cada banda") |
| `--title-gap` | `clamp(48px,6vw,96px)` | `margin-bottom` do `.display-h2` (comentário: "título até o conteúdo") |

Espaço base: `--space-1` a `--space-9` = 4, 8, 12, 16, 24, 32, 48, 64,
96px (:239–247; comentário do bloco: "Espaço (base 8)").

### Pontos de quebra (literais nas `@media`)

| Consulta | O que muda |
|---|---|
| `max-width:599px` | H1 em 4 linhas; vídeo do hero em 4:5 atrás do texto; `.dash-filter` em largura total; `.footer-links` em coluna (styles:43, 108, 200, 337) |
| `min-width:600px` / `600–1099px` | H1 pela trava de coluna e de altura; `.social` do rodapé à direita (styles:50, 346) |
| `min-width:700px` | `.contact-form` em 2 colunas (styles:311) |
| `min-width:760px` | `.contact-lead` com altura mínima de uma tela (styles:307) |
| `max-width:900px` | nav vira `.nav-burger` com `.nav-wa` ao lado; `.dash-kpis` em 2 colunas (styles:70, 195) |
| `min-width:1100px` | grade de 12 colunas no hero, soluções e processo; `.plaque` em `3fr 2fr` (styles:119, 233, 247, 282) |
| `min-width:1100px and min-height:760px` | projetos com ficha parada e miniatura correndo (movimento 1), com `prefers-reduced-motion:no-preference` e suporte a `timeline-scope` |

O comentário de `css/tokens.css:6` registra que breakpoints ficam
literais porque "CSS não aceita var() em media query".

### Grades por seção (como estão no CSS)

- `.hero-grid`: 1 coluna; a partir de 1100px, `.hero-copy` em
  `1 / span 6` de 12 (styles:91, 121–122).
- `.sol-grid`: 1 coluna; a partir de 1100px, `.sol-title` em `1 / span 4`
  com `position:sticky` e `.sol-body` em `5 / span 8` (styles:233–238).
- `.steps`: grade com `gap: var(--space-8)`; a partir de 1100px cada
  `.step` ocupa 6 colunas, começando nas colunas 1, 3, 5 e 7
  (styles:241–255).
- `.projects-track`: grade com `grid-auto-rows:1fr` e
  `gap: var(--space-9)`; com o movimento 1 vira grade de `--columns`
  colunas e `--plaque-count` linhas, `.plaque` em `display:contents`,
  `.plaque-body` em `1 / span 4` (uma linha por projeto, altura mínima
  `--plaque-row-h`) e as quatro `.plaque-media` em `6 / span 6`, na
  altura da faixa inteira, sticky.
- `.contact-form`: 1 coluna, 2 a partir de 700px; `.form-field--wide` em
  `1 / -1` (styles:310–312).
- `.audience`: `repeat(auto-fit,minmax(min(var(--col-min-audience),100%),1fr))`
  (styles:229).

## Elevation & Depth

`box-shadow` aparece uma vez no CSS: `.form-input--invalid`,
`0 0 0 var(--ring) var(--error-ring)` (styles:326). Nenhum outro
elemento tem sombra. O brief lista "Sombra cinza" entre o que sai da
página (brief:345).

Camadas translúcidas no código:

| Onde | Valor | Comentário |
|---|---|---|
| `.site-header` | `color-mix(in srgb,var(--band-deep) var(--header-opacity),transparent)` + `backdrop-filter:blur(var(--header-blur))` | `--header-opacity:92%` "fundo do header sobre o conteúdo" (:266); `--header-blur:12px` |
| `.hero::after`, ≥1100px | gradiente com `--hero-shade` | `color-mix(in srgb,var(--band-deep) 62%,transparent)`; medição no comentário (:156–161) e em brief:304–310 |
| `.hero-media::after`, ≥1100px | `--hero-scrim-bottom` | `linear-gradient(0deg,var(--band-deep) 0%,transparent 22%)` |
| `.hero::after`, ≤599px | `--hero-shade-phone` | `color-mix(in srgb,var(--band-deep) 52%,transparent)`; medição no comentário (:166–169) e em brief:312–315 |
| `.hero-media::after`, ≤599px | `--hero-scrim-phone` | `linear-gradient(0deg,var(--band-deep) 0%,transparent 35%)` |
| `.hero-still, .hero-video`, ≥1100px | `mask-image` de `transparent` a `--mask-opaque` em `--space-9` | styles:140 |

### Camadas (`z-index`, :316–318)

| Token | Valor | Onde |
|---|---|---|
| `--z-menu` | `99` | `.mobile-menu` |
| `--z-header` | `100` | `.site-header` |
| `--z-skip` | `400` | `.skip-link` |

`z-index:-1` literal no vídeo e nas camadas do hero; o comentário de
`css/tokens.css:13–14` diz que é "empilhamento local dentro do .hero
(isolation:isolate), não camada da página como os --z-*".

## Shapes

### Raio (:280–282)

| Token | Valor | Comentário no CSS | Onde |
|---|---|---|---|
| `--r-none` | `0` | "imagens e bandas" | `.plaque-media` |
| `--r-control` | `4px` | "botão, input" | `.btn`, `.form-input`, `.skip-link`, `.nav-burger`, `.dash-filter`, `.dash-filter-btn`, `.social-link` |
| `--r-screen` | `12px` | "o dashboard, único objeto com cara de tela" | `.dash` |

Comentário do bloco: "Raio (hierarquia, não tudo igual)" (:279). O brief
lista "raio igual em todos os elementos" entre o que sai (brief:345).

### Bordas, foco e detalhes (:262–270)

| Token | Valor | Onde |
|---|---|---|
| `--hairline` | `1px` | todas as bordas e a grade do gráfico |
| `--focus-width` | `2px` | contorno do `:focus-visible` |
| `--focus-offset` | `3px` | afastamento do contorno de foco |
| `--ring` | `3px` | anel do `.form-input--invalid` |
| `--underline-offset` | `4px` | `.project-link` |
| `--textarea-min-h` | `128px` | `textarea.form-input` |
| `--status-min-h` | `1.4em` | `.form-status` ("reserva a linha da mensagem do form") |

### Proporções (:275–277, 147)

| Token | Valor | Onde |
|---|---|---|
| `--ratio-hero-mobile` | `4/3` | `.hero-media` de 600 a 1099px (comentário: "tablet") |
| `--ratio-hero-phone` | `4/5` | `.hero-media` até 599px (comentário: "celular: recorte em pé do vídeo") |
| `--ratio-project` | `8/5` | `.plaque-media` (comentário: "capturas dos projetos") |
| `--hero-ratio` | `1912/1080` | largura do quadro do vídeo no desktop (comentário: "proporção do vídeo e do poster") |

## Components

Nome = classe como está no CSS e no markup.

### `.site-header`, `.nav-main`, `.nav-links`, `.nav-burger`, `.nav-wa`, `.brand`

- `.site-header` fixo, altura `--header-h`, fundo translúcido com desfoque
  (ver Elevation); a borda de baixo vai de `transparent` a `--line` com a
  classe `.is-scrolled` (styles:57–58), que o JS liga acima de
  `HEADER_SCROLL_THRESHOLD = 8` px de rolagem.
- `.nav-links`: `--fs-small`, `--weight-medium`, cor `--text-muted`, hover
  `--text`.
- `.nav-cta`: `.btn .btn--ghost` com `min-height: var(--tap)` e
  `--fs-small`.
- Até 900px: `.nav-links` e `.nav-cta` somem; aparecem `.nav-burger`
  (`--tap` × `--tap`, borda `--hairline` `--line`, `--r-control`) e
  `.nav-wa` com a mesma borda (styles:70–75). Comentário: "atalho do
  WhatsApp no header: só no celular/tablet, colado ao menu" (styles:67).
  Brief: "Não há botão flutuante" (brief:212–213, 337–344).
- `.nav-main--inner` (só em `privacidade/index.html`, que não tem menu nem
  `.nav-wa`): até 900px o `.nav-cta` continua visível. Comentário: "página
  interna (/privacidade/): sem menu nem âncoras da home, o 'Começar
  projeto' (/#comecar) fica no header em todas as larguras".
- `.brand .zy-logo`: `--font-body`, `--weight-display`, `--fs-lead`; o
  `.zy-logo-z` em `--accent`.

### `.mobile-menu`, `.mobile-menu-link`, `.mobile-menu-cta`

Fixo abaixo do header, fundo `--band-raised`, `z-index: var(--z-menu)`.
Links com `min-height: var(--control-h)`, `--weight-medium` e borda de
baixo `--line`; `.mobile-menu-cta` é `.btn .btn--primary`.

### `.btn`, `.btn--primary`, `.btn--ghost`

- `.btn`: `min-height: var(--control-h)`, `padding: var(--space-3)
  var(--space-5)`, `--r-control`, `--weight-strong`, `--fs-body`;
  transição de `background-color` e `border-color` em `--dur-fast ease`
  (styles:83).
- `.btn--primary`: fundo `--accent`, texto `--on-accent`, sem borda; hover
  `--accent-hover`.
- `.btn--ghost`: fundo transparente, texto `--text`, borda `--hairline`
  `--text-muted`; hover com borda `--text`.
- Foco: regra global `:focus-visible` (styles:13).

### `.skip-link`

Fixo em `--space-2` do canto, fundo `--accent`, texto `--on-accent`,
`--weight-strong`, `--fs-small`, `--r-control`; fora da tela com
`translateY(-250%)` até o foco.

### Hero: `.hero`, `.hero-grid`, `.hero-copy`, `.hero-sub`, `.hero-ctas`, `.hero-note`, `.hero-media`, `.hero-still`, `.hero-video`

- `.hero-sub`: `--fs-lead`, `--lh-lead`, cor `--text`, `--measure-lead`,
  `text-wrap:pretty`.
- `.hero-note`: `--fs-body`, `--weight-medium`, cor `--text`.
- Motivo declarado para sub e nota em `--text`: "é o que deixa a sombra em
  62% em vez de 80% (ver --hero-shade)" (styles:93–95; brief:306–308).
- `.hero-media` por faixa: até 599px, absoluto no topo em 4:5, atrás do
  texto; 600–1099px, abaixo do texto em 4:3 sangrando pelo `--gutter`;
  a partir de 1100px, ocupa o hero inteiro atrás do texto, com o quadro
  ancorado por `--hero-screen-at` (`.445`) e `--hero-clearance`
  (`var(--space-8)`) (styles:101–145).
- Tokens de enquadramento: `--hero-focus-tablet` `62% 50%`,
  `--hero-focus-phone` `50% 50%`, `--hero-pad-top`
  `calc(var(--header-h) + var(--space-6))`, `--hero-pad-bottom`
  `max(var(--space-8),15svh)` (:145–171).

### Dashboard: `.dash-figure`, `.dash`, `.dash-head`, `.dash-title`, `.dash-filter`, `.dash-filter-btn`, `.dash-kpis`, `.dash-kpi`, `.dash-chart-label`, `.dash-chart`, `.dash-bars`, `.bar`, `.bar--now`, `.dash-caption`

- `.dash`: fundo `--band-deep` dentro da `.band--raised`, `--r-screen`,
  `padding: var(--dash-pad)`.
- `.dash-filter`: fundo `--band-base`, `--r-control`, `padding:
  var(--space-1)`; `.dash-filter-btn` com `min-height: var(--tap)`, texto
  `--text-muted`, pressionado (`aria-pressed="true"`) com fundo
  `--band-raised` e texto `--text`.
- `.dash-kpis`: 3 colunas; até 900px, 2 colunas com o 2º indicador na
  linha inteira, primeiro (styles:193–198).
- Gráfico: SVG de grade e rótulos (`.grid`, `.tick`) e barras em HTML
  (`.bar`, `.bar--now`). Geometria em tokens lidos por `js/dashboard.js`
  (:132–143): `--dash-pad` `clamp(var(--space-5),4vw,var(--space-7))`,
  `--chart-h` `clamp(200px,36vh,400px)`, `--chart-pad-top`
  `var(--space-2)`, `--chart-pad-bottom` `28px`, `--chart-pad-left`
  `var(--space-8)`, `--chart-tick-gap` `var(--space-3)`,
  `--chart-label-offset` `6px`, `--chart-label-min` `30px`,
  `--chart-bar-min` `2px`, `--chart-bar-fill` `.68`,
  `--chart-bar-fill-dense` `.6`.

### Soluções: `.sol-grid`, `.sol-title`, `.sol-body`, `.fix-list`, `.fix-item`, `.fix-pain`, `.fix-strike`, `.fix-service`, `.fix-text`, `.audience`, `.audience-title`, `.audience-list`

- `.fix-item`: `padding: var(--space-7) 0`, borda de cima `--line` (menos
  no primeiro).
- `.fix-pain`: display em caixa mista, `--lh-heading`,
  `text-wrap:balance`.
- `.fix-strike`: traço como `background-image` de `--strike-color`,
  espessura `--strike-w`, altura `--strike-y` (styles:217).
- `.fix-service`: `--weight-strong`. `.fix-text`: cor `--text`.
- `.audience-list li`: borda de cima `--line`, cor `--text-muted`.

### Processo: `.steps`, `.step`, `.step-num`, `.step-title`, `.step-desc`, `.stack-line`

`.step` em grade `auto minmax(0,1fr)` alinhada pela base; `.step-num` em
`--fs-step-num`, `--text-muted`, tabular; `.step-desc` em `--text-muted`;
`.stack-line` com `margin-top: var(--space-9)`.

### Projetos: `.projects-section`, `.projects-head`, `.section-note`, `.spec-source`, `.projects-track`, `.plaque`, `.plaque-media`, `.plaque-body`, `.plaque-title`, `.project-desc`, `.spec`, `.project-links`, `.project-link`, `.plaque-quote`

- `.plaque`: 1 coluna; a partir de 1100px, `minmax(0,3fr) minmax(0,2fr)`.
- `.plaque-media`: `--ratio-project`, fundo `--band-raised`, borda
  `--hairline` `--line`, `--r-none`; imagem `object-fit:cover`,
  `object-position:center top`.
- `.spec`: grade `max-content minmax(0,1fr)`, `--fs-small`, `dt` em
  `--text-muted`, `dd` tabular.
- `.project-link`: sublinhado em `--text-muted` que vira `--text` no
  hover, `text-underline-offset: var(--underline-offset)`.
- `.plaque-quote`: separado por borda de cima `--line`; `p` em
  `--fs-quote`, `--weight-medium`, `--lh-heading`; `figcaption` em
  `--fs-small`, `--text-muted`.
- Comentário: "toda plaqueta tem a altura da mais alta, mesmo sem
  depoimento ou métrica (FieldFix)" (styles:263–264).

### Contato: `.contact-lead`, `.display-statement`, `.contact-form`, `.form-field`, `.form-field--wide`, `.form-label`, `.form-req`, `.form-input`, `.form-input--invalid`, `.form-field-hint`, `.form-error`, `.form-actions`, `.form-hint`, `.form-status`, `.contact-direct`, `.contact-direct-label`

- `.form-input`: `min-height: var(--control-h)`, `padding: var(--space-3)
  var(--space-4)`, `--fs-body`, texto `--text`, fundo `--band-deep`, borda
  `--hairline` `--line-control`, `--r-control`; foco com borda
  `--focus-ring`; `textarea` com `--textarea-min-h` e `resize:vertical`.
- `.form-input--invalid`: borda `--error` com `!important` e anel
  `--ring` `--error-ring`.
- `.form-error`: `--fs-small`, `--weight-medium`, `--error`; some quando
  vazio. `.form-status`: `--status-min-h`, `--weight-medium`,
  `--fs-small`; some quando vazio.
- `.form-label`, `.form-field-hint`, `.form-hint`, `.form-req`,
  `.contact-direct-label`: `--fs-small`; os três últimos em `--text-muted`.

### `.social`, `.social-link`, `.social-icon`

`.social-link` em `--tap` × `--tap`, cor `--text`, `--r-control`;
`:focus-visible` com cor `--accent`. `.social-icon` em `--icon`,
`fill:currentColor`. Comentário: "ícone na cor do texto, alvo de 44px; o
ciano aparece só no foco de teclado" (styles:338–339).

### Rodapé: `.site-footer`, `.footer-inner`, `.footer-brand`, `.footer-text`, `.footer-links`, `.footer-copy`

`padding-block: var(--space-8) var(--space-9)`; texto em `--fs-small` e
`--text-muted`; `.footer-links a` com `min-height: var(--tap)` e hover
`--text`. Em `index.html` o rodapé usa `band band--deep`; em
`privacidade/index.html:137`, `band band--base`.

### Política de privacidade: `.legal`, `.legal-lead`, `.legal-meta`, `.legal-section`, `.legal-h2`, `.legal-h3`, `.legal-list`, `.legal-list--numbered`, `.legal-table`

Só em `privacidade/index.html` (`article.band.band--deep.legal`). Regras
desde 30/09/2026 (zyphy-ciclo, correção U5 do review). Comentário: "texto
de leitura numa coluna só, na medida do corpo (--measure na fonte do
corpo): lead, parágrafos, listas e a tabela de bases legais param na
mesma largura de linha; só o H1 usa a largura da página".

- `.legal .container`: grade `minmax(0,var(--measure)) minmax(0,1fr)`;
  todo filho na primeira coluna, o `.display-h2` nas duas.
- `.legal-lead`: `--fs-lead`, `--lh-lead`, `text-wrap:pretty`.
  `.legal-meta`: `--fs-small`, `--text-muted`, `--space-4` acima.
- `.legal-section`: `--space-8` acima; parágrafos com `--space-4` acima.
- `.legal-h2`: `--fs-h3`, `--weight-strong`, `--lh-heading`.
  `.legal-h3`: `--fs-body`, `--weight-strong`, `--space-6` acima e
  `--space-2` até o parágrafo seguinte.
- `.legal-list`: recuo `--space-5`, `--space-2` entre itens, marcador em
  `--text-muted`; `.legal-list--numbered` com `--numeric-data`.
- `.legal-table` (`dl`): `dt` em `--weight-medium`; `dd` sem recuo, em
  `--text-muted`; entre um par e o seguinte, `--space-4` e borda
  `--hairline` `--line`.
- Links dentro de `.legal-section`: sublinhados em `--text-muted`,
  `--underline-offset`, hover `--text` (como `.project-link`).

A página entrou no deploy em 30/09/2026, com a política concluída (brief
§3, decisões de 2026-09-30; `.vercelignore` com `!/privacidade`), e o link
"Privacidade" voltou ao rodapé.

## Movimento

Tokens (:293–313):

| Token | Valor | Onde |
|---|---|---|
| `--ease-out` | `cubic-bezier(.215,.61,.355,1)` | só nas barras do dashboard (styles:175, 181, 182) |
| `--dur-fast` | `200ms` | transições de hover e foco, todas com a curva `ease` literal (styles:24, 57, 64, 83, 153, 276, 321, 335) |
| `--dur-data` | `600ms` | barras do dashboard |
| `--fix-range` | `entry 100% cover 50%` | `.fix-strike`, `.fix-text` |
| `--strike-color` | `var(--text)` | traço da dor (comentário: "ciano fica para ação") |
| `--strike-w` | `.09em` | espessura do traço |
| `--strike-y` | `54%` | altura do traço (comentário :301–303) |
| `--plaque-gap` | `var(--space-8)` | respiro entre a miniatura na moldura e a que espia pela borda (dentro de `--shot-step`) |
| `--plaque-count` | `4` | linhas da `.projects-track` no movimento 1 |
| `--plaque-row-h` | `calc(100svh - var(--header-h))` | altura mínima da `.plaque-body` no movimento 1 (uma tela por projeto) |
| `--plaque-top` | `max(var(--space-9),16svh)` | topo da moldura (sticky) e da ficha no movimento 1 |
| `--shot-step` | `calc(100% + var(--plaque-gap))` | um passo da miniatura: da borda até a moldura |
| `--shot-range` | `entry 30% entry 70%` | trecho da entrada da ficha em que a miniatura dela corre |

Os três comportamentos no código, com o motivo que o brief declara
(brief:261–275; limite de três em brief:255–257):

1. Projetos — só a miniatura corre; a ficha e o depoimento ficam
   parados na coluna da esquerda, em fluxo normal (brief §3, decisão de
   2026-09-30). As `.plaque-media` ficam numa moldura sticky; a próxima
   espia pela borda direita da tela. `@keyframes zyShotArrive`
   (`transform`, da borda até a moldura) e `zyShotPeek` (`translate`, de
   fora da tela até a borda), cada miniatura na `view-timeline` da ficha
   do próprio projeto (`--plaque-2` a `--plaque-4`, com `timeline-scope`
   na `.projects-track`), no trecho `--shot-range`. Só com suporte a
   `view-timeline-name`, `animation-timeline` e `timeline-scope`,
   `prefers-reduced-motion:no-preference`, `min-width:1100px` e
   `min-height:760px`. Motivo: "o conteúdo vaza pela borda e sugere que
   continua" (brief §7); a moldura mostra o projeto da ficha que está
   sendo lida.
2. Soluções — `@keyframes zyStrike` (`background-size` de 0% a 100%) e
   `zySolve` (cor de `--text-muted` a `--text`), `animation-timeline:--fix`
   (`view-timeline` do `.fix-item`), dentro de
   `@supports (animation-timeline:view())` e
   `prefers-reduced-motion:no-preference` (styles:220–228). Motivo: "a
   dor fica 'riscada' e a solução vira o que se lê" (brief:268–269).
3. Dashboard — `::view-transition-group(*.bar)` em `--dur-data` e
   `--ease-out`; barras sem par com `@keyframes zyBarIn` / `zyBarOut`
   (opacidade); `::view-transition{pointer-events:none}`
   (styles:171–189). Motivo: "mostra que o filtro de fato refiltra os
   dados" (brief:274–275).

Vídeo do hero: fora da conta dos três (brief:286–288), inserido por JS.

`prefers-reduced-motion:reduce`: `scroll-behavior:auto` e
`transition-duration:.001ms !important` em tudo (styles:350–354); as
animações 1 e 2 só existem dentro de `no-preference`. Brief:
"`prefers-reduced-motion: reduce` → estado final direto, sempre"
(brief:259).

## Valores literais fora do arquivo de tokens

O comentário de `css/tokens.css:1–16` lista os literais que o código
mantém fora dos tokens e o motivo de cada: breakpoints em `@media`;
utilitário `.sr-only`; `translateY(-250%)` do skip link; `.001ms` do
reduced-motion; `<meta name="theme-color">`; `100svh`/`100vh`; o
`z-index:-1` do hero; o limiar de rolagem no JS.

Encontrados na leitura e não listados nesse comentário:

- Curva `ease` literal nas transições de `--dur-fast` (lista em
  Movimento).
- `index.html:57`: ícone do `.nav-burger` com `width="22"`,
  `height="22"`, `stroke-width="2"` no SVG.
- `theme-color` `#050B0B` em `index.html:13` e
  `privacidade/index.html:15` (mesmo valor de `--ink-950`; comentário no
  HTML: "mesmo valor de --band-deep").
- Posição e tamanho das barras em px, calculados em `js/dashboard.js` a partir
  dos tokens de geometria (linhas 133–136).

## Do's and Don'ts

Só o que o brief ou um comentário do CSS declara, com a linha.

### Do:

- **Do** tirar cor, fonte, tamanho, espaço, raio e duração de
  `css/tokens.css` (comentário do CSS de componentes, styles:2–4; do
  arquivo de tokens, :2–5).
- **Do** separar seções pela troca de fundo da `.band` (styles:28;
  brief:30–32), com bandas vizinhas diferentes e petróleo só no contato
  (:99–101).
- **Do** manter H1, subtítulo e botões visíveis desde o primeiro quadro
  (brief:289–291).
- **Do** usar `--lh-heading` em título de caixa mista que quebra linha e
  `--lh-display` só em caixa alta (:220–222).
- **Do** manter os três comportamentos de movimento e o estado final
  direto com reduced-motion (brief:255–259).

### Don't:

- **Don't** usar `--accent` fora de ação e estado (:118–120; brief:266).
- **Don't** usar sombra cinza nem raio igual em todos os elementos
  (brief:345).
- **Don't** usar eyebrow, numeração fora do processo, "→"/"↗" em link ou
  botão, fade-up, hover com transform em card (brief:332–336).
- **Don't** pôr botão flutuante fixo na tela (brief:337–344).
- **Don't** usar as famílias da lista proibida do brief (brief:82).
- **Don't** usar contador animado, marquee, HUD ou label tipo "SEC.00 //"
  (brief:67–68).
