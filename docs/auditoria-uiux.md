# 🔍 Auditoria UI/UX — Zyphy (index.html + css/styles.css)

> Ferramenta: skill `ui-ux-pro-max` (design-system + domínios `style`, `typography`, `color`, `ux`) + medições reais do código e cálculo de contraste WCAG.

- **Rodada 2** (2026-07-10, pós-Etapa 1) — ativa, abaixo.
- **Rodada 1** (2026-07-10, pré-tokens) — arquivada no fim do arquivo; originou as Etapas 1–3.

---

# Rodada 2 — pós-Etapa 1

**Veredito geral:** o design system implementado na Etapa 1 está sólido — tokens, sombras e raios consistentes, contraste de texto exemplar (`#9FB3B3` passa **AAA** em todos os 8 fundos: 7,08–8,62:1). A rodada 2 apontou o C1 ("bold falso") como crítico, mas a verificação binária na Etapa 1.5 **reclassificou-o como alarme falso** (ver C1 abaixo). **C2, A3 e A5 foram corrigidos na Etapa 1.5.**

## 1. Design system recomendado (skill: agência/estúdio tech B2B, dark premium)

Padrão **"Bento Grid Showcase"** com estilo **"Modern Dark (Cinema)"**:

- **Fundos**: dark profundo mas nunca `#000000` puro; superfícies em camadas ✅ *(site já cumpre)*
- **Cards**: radius ~16px, borda hairline `rgba(255,255,255,.08)`, glow do acento atrás do CTA ✅
- **Cores**: tokens semânticos; muted na faixa `#94A3B8`; contraste verificado à parte no dark ✅
- **Tipografia**: sans geométrica (títulos) + sans humanista (corpo) + mono (labels), pesos 300–700 **reais** ✅ *(pareamento ✅; pesos confirmados reais — variable fonts, ver C1)*
- **Motion**: easing expo-out, micro-interações 150–300ms ✅
- **Evitar**: excesso de animação; acento sem verificação de contraste

**Veredito:** o site segue ~85% da recomendação. Sora+Inter+IBM Plex Mono equivale em qualidade aos pareamentos sugeridos (Space Grotesk/DM Sans, Satoshi) — **não trocar**. O ciano da marca vence a paleta genérica da skill.

## 2. Contrastes medidos (WCAG)

| Par | Ratio | Status |
|---|---|---|
| `#9FB3B3` muted sobre os 8 fundos | 7,08–8,62:1 | **AAA** ✅ |
| `#F2FAFA` texto sobre os 8 fundos | 14,7–17,9:1 | AAA ✅ |
| `#00CBCC` acento sobre os 8 fundos | 7,7–9,4:1 | AAA ✅ |
| `#0E1515` sobre `#00CBCC` / hover / press | 9,2 / 11,2 / 7,3:1 | AAA ✅ |
| Erro `#c0392b` sobre form `#1B2626` | **2,86:1** | **FALHA** ❌ (C2) |
| FAB hover `#FFFFFF` sobre `#00CBCC` | **2,02:1** | **FALHA** ❌ (A5) |
| `.strike` `#5F7A7A` sobre `#141D1D` | 3,72:1 | AA-large (ok p/ display) |

**A11y/UX já corretos:** focus-visible global · reduced-motion completo · touch targets principais ≥44px · `100svh` · labels visíveis · navs com aria-label distinto · rotator com fallback sr-only.

## 3. Lista priorizada

### 🔴 Crítico

| # | Problema | Onde | Correção |
|---|---|---|---|
| C1 | ~~Bold falso em todo o site~~ — **ALARME FALSO, reclassificado na Etapa 1.5.** A suspeita: `@font-face` de Inter 500/600/700 e Sora 700/800 apontam para arquivos nomeados `inter-400*`/`sora-600*`. A verificação (parse do diretório de tabelas WOFF2) provou que esses arquivos são **variable fonts** com `fvar`+`gvar` — o descriptor `font-weight` fixa o eixo e o bold renderiza correto. Só o **nome dos arquivos** engana | `assets/fonts/` | ✅ Etapa 1.5: `@font-face` consolidados em faixas (`400 700` / `600 800`), ~230 linhas a menos, zero mudança visual; comentário no CSS documenta |
| C2 | Mensagem de erro do form em `#c0392b` = 2,86:1 — reprovada (mín. 4,5:1) | `js/main.js:155` | ✅ Etapa 1.5: token `--error:#FF8A80` (6,8:1) + classe `.form-status--error` no lugar da cor hardcoded |

### 🟠 Alto

| # | Problema | Onde | Correção |
|---|---|---|---|
| A1 | Headline do hero é `<p>`; `<h1>` real é sr-only | `index.html:82-87` | *Já planejado — Etapa 2* |
| A2 | Sem skip-link | `index.html` topo | *Já planejado — Etapa 2* |
| A3 | Burger sem `aria-expanded`/`aria-controls`; menu não fecha com Esc nem clique fora | `index.html:52`, `js/main.js:133` | ✅ Etapa 1.5: `aria-expanded` sincronizado + `aria-controls` + Esc (devolve foco) + clique fora fecha |
| A4 | Imagens sem `width/height` nem `loading="lazy"`; `.shot` sem altura fixa → CLS real | `index.html:207-252` | *Já planejado — Etapa 3* (atenção às `.shot`) |
| A5 | FAB WhatsApp no hover: ícone `#FFFFFF` sobre ciano = 2,02:1 — some no hover | `css/styles.css:636` | ✅ Etapa 1.5: `--on-accent` no hover (9,2:1) |

### 🟡 Médio

| # | Problema | Onde | Correção |
|---|---|---|---|
| M1 | `required` sem indicador visual; contato `type="text"` com `autocomplete="email"` mas placeholder sugere telefone | `index.html:325-329` | *Já planejado — Etapa 3* (+ rever autocomplete ambíguo) |
| M2 | Erro longe dos campos e `role="status"` (polite) p/ erro; campo inválido sem destaque | `index.html:337`, `js/main.js:154-157` | `role="alert"` no erro + classe `.form-input--invalid` |
| M3 | `--fs-11` (11px) em `.tag` e `.scroll-hint` — abaixo do piso de 12px | `css/styles.css:387,549,566` | Subir para `--fs-12` |
| M4 | `body` sem `line-height` — nav/rodapé herdam default ~1.15 | `css/styles.css:428` | *Já planejado — Etapa 3* (1.6) |
| M5 | Resíduos fora do 8pt: `section-head` 36, `section-lead` 14, `hero-sub/note` 18, `step` 28, `footer-bottom` 44, `footer-heading` 14 | `css/styles.css:517-631` | Normalizar p/ 16/24/32/40/48 |
| M6 | JS duplica tokens hardcoded: sombra do header (= `--shadow-e1`), `#00CBCC` no rotator, cores de status | `js/main.js:353-354,405,155,164` | Trocar por classes/custom properties *(cores de status ✅ Etapa 1.5; sombra e rotator pendentes)* |
| M7 | Três clamps de display quase iguais (`--fs-display` 3.4rem, `--fs-hero` 3.3rem, `--fs-display-sm` 3rem) | `css/styles.css:396-398` | Consolidar em 2 tokens — *conectado ao M3 da rodada 1 (h2), adiado p/ decisão em equipe* |

### 🟢 Baixo

| # | Problema | Onde | Correção |
|---|---|---|---|
| B1 | `:focus-visible` com `border-radius:6px` hardcoded | `css/styles.css:431` | `--radius-sm` ou novo `--radius-xs` |
| B2 | Sem `touch-action:manipulation` nos CTAs | `css/styles.css` | Adicionar aos interativos |
| B3 | Links do rodapé com alvo ~21px e gap 8px | `css/styles.css:630` | `padding-block:6px` em mobile |
| B4 | `.strike` `#5F7A7A` 3,7:1 — passa como texto grande, sem folga | `css/styles.css:574` | Opcional: `#6E8A8A` |
| B5 | `::placeholder` sem cor definida (default do browser sobre `#0F1717`) | `css/styles.css:614` | `::placeholder{color:var(--text-muted)}` |
| B6 | JPEGs ~356 KB no total | `assets/img/` | *Já planejado — Etapa 3* (WebP ≈ −50%) |

---
---

# Rodada 1 — pré-tokens *(arquivada)*

> Status: **A1, A4, B1, B2, B4, B5 implementados na Etapa 1** (commit `830380b`). A2/A3/B3 → Etapa 2; M1/M2/M4/M5 → Etapa 3; M3 → decisão em equipe.

**Veredito geral:** o site já está **acima da média** em fundamentos de acessibilidade (contraste AAA, foco visível, reduced-motion, touch targets). Os problemas reais são de **consistência de sistema** (tipografia, sombras, raios) e alguns ajustes **médios** de SEO/a11y/performance. **Não há bloqueadores críticos.**

## 1. Design System recomendado (agência tech B2B, dark + ciano)

O gerador da skill, com query de "agência", devolveu um preset genérico claro/roxo — não serve à Zyphy. Abaixo, o sistema **adaptado ao dark+ciano**, seguindo as regras da skill (escala 8pt, tipo modular, tokens semânticos):

| Token | Recomendado |
|---|---|
| **Fontes** | Manter **Sora** (display) + **Inter** (corpo) + **IBM Plex Mono** (labels). Pareamento coeso e premium — não trocar. |
| **Escala tipográfica** | 7 degraus fixos: `12 · 14 · 16 · 18 · 20 · 24 · 32/clamp` (rem). Pesos: 400 corpo, 500 label, 700 título, 800 display. Line-height: corpo 1.6–1.7, títulos 1.1–1.2 |
| **Espaçamento** | Escala 8pt: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. Ritmo entre seções: ~96–120px desktop / 64–80px mobile |
| **Raios** | `sm 8 · md 12 · lg 20 · pill 100 · circle 50%` (5 valores, não ~10) |
| **Elevação** | `e1 0 12px 30px -22px rgba(0,0,0,.55)` · `e2 0 20px 45px -25px rgba(0,0,0,.6)` · `e3 0 30px 60px -30px rgba(0,0,0,.7)` · `glow 0 0 40px rgba(0,203,204,.35)` |
| **Cores (tokens)** | `--bg #0C1212 · --surface #141D1D · --surface-2 #1B2626 · --text #F2FAFA · --text-muted #9FB3B3 · --accent #00CBCC · --accent-hover #00E0E1 · --accent-press #00B5B6 · --on-accent #0E1515 · --border rgba(242,250,250,.1)` |
| **Movimento** | Micro-interações 150–300ms, ease-out na entrada (já respeitado) |

## 2. Divergências vs. o que existia (pré-Etapa 1)

### Tipografia — ⚠️ principal ponto fraco
- **30+ tamanhos de fonte distintos**, misturando `px` e `rem` sem escala (`12px, .95rem, 11px, 1.2rem, 10.5px, 1.05rem, 1rem, 12.5px, 1.1rem, .82rem, 13.5px…`). Sem sistema. → **resolvido (Etapa 1)**
- Títulos de seção `<h2>` **inconsistentes**: uns `font-weight:700` com `clamp(1.8rem,3.8vw,2.5rem)`, outros `800` com `clamp(2.1rem,4.6vw,3.4rem)`. → *decisão em equipe (M3)*
- Pareamento de fontes: **bom** (Sora+Inter+Mono) — manter.

### Espaçamento
- Padding interno das seções **consistente** (`88px 24px 48px`) ✅, mas **assimétrico** (topo 88 / base 48). → **resolvido (Etapa 1: 96/96)**
- `gap` mistura `8/10/12/20/36/48` — quase 8pt, com alguns fora do ritmo. → **resolvido (Etapa 1)**
- Cards com padding `30px`/`36px` (não múltiplos de 8; ideal 32/40). → **resolvido (Etapa 1)**

### Paleta / Contraste — ✅ forte
| Texto | Sobre | Ratio | WCAG |
|---|---|---|---|
| `#9FB3B3` secundário | `#1B2626` (cards) | **7.08:1** | **AAA** |
| `#9FB3B3` | `#0C1212` (body) | 8.62:1 | AAA |
| `#F2FAFA` principal | `#141D1D` | 16.21:1 | AAA |
| `#00CBCC` acento | `#1B2626` | 7.70:1 | AAA |
| `#0E1515` (texto CTA) | `#00CBCC` (botão) | 9.16:1 | AAA |

→ **Nenhuma falha de contraste.** O `#9FB3B3` passa AAA em todos os fundos. Divergência menor: tons de estado do acento (`#00E0E1`, `#00b5b6`) eram ad-hoc. → **formalizados como tokens (Etapa 1)**

### Hierarquia visual
- **h1 real está oculto** (sr-only "Zyphy"); o headline visível do hero ("Tecnologia que destrava…") é um `<p>`. → *Etapa 2*
- **Salto de nível**: seção de contato/rodapé vai de `<h2>` direto para `<h4>` (pula `<h3>`). → *Etapa 2*
- Resto da hierarquia (h2 seção → h3 card) correto ✅.

### Raios & Sombras
- **~10 raios** (`5, 8, 10, 11, 12, 14, 20, 28, 100, 50%`) — `5px` e `11px` são oddballs. → **resolvido (Etapa 1)**
- **11 sombras** one-off, sem escala de elevação. → **resolvido (Etapa 1)**

## 3. UX / Acessibilidade / Responsividade

✅ **Já corretos:** `:focus-visible` (outline 3px ciano) · `prefers-reduced-motion` · touch targets (burger 44, menu 48, ícones 44, submit 52, inputs 48) · labels com `for` · `role="status" aria-live` no form · landmarks (`main/header/footer/nav/section`) · `lang="pt-BR"` · viewport sem travar zoom · `alt` descritivos nas imagens.

⚠️ **Gaps:** sem **skip-link** *(→ Etapa 2)* · imagens **sem `loading="lazy"` nem `width/height`** (risco de CLS) e em **JPEG** (não WebP/AVIF) *(→ Etapa 3)* · form **sem indicador de obrigatório** e `contato` como `type="text"` (sem `inputmode`) *(→ Etapa 3)* · `body` **sem `line-height` base** *(→ Etapa 3)* · alguns textos de card em `.95rem` (~15px, <16px no mobile) *(→ Etapa 3)*.

## 4. Lista priorizada (rodada 1)

### 🔴 Crítico
*Nenhum.* Sem falhas de contraste, foco, ou interação quebrada.

### 🟠 Alto
| # | Problema | Onde | Correção sugerida | Status |
|---|---|---|---|---|
| A1 | Escala tipográfica inconsistente (30+ tamanhos, px+rem) | inline em todo `index.html` | Tokens `--fs-*` (12/14/16/18/20/24/32) | ✅ Etapa 1 |
| A2 | Headline visível do hero é `<p>`; h1 oculto só diz "Zyphy" | hero | Tornar o headline o `<h1>` — SEO | → Etapa 2 |
| A3 | Salto de heading h2→h4 | seção contato/rodapé | `<h3>` nos títulos de coluna do rodapé | → Etapa 2 |
| A4 | Sombras (11) e raios (~10) sem escala | inline em todo `index.html` | Tokens `--shadow-e1/e2/e3` e `--radius-sm/md/lg/pill` | ✅ Etapa 1 |

### 🟡 Médio
| # | Problema | Onde | Correção sugerida | Status |
|---|---|---|---|---|
| M1 | Sem skip-link | topo do `<body>` | `<a href="#conteudo" class="skip">Pular para o conteúdo</a>` + `id` no `<main>` | → Etapa 2 |
| M2 | Imagens sem lazy nem dimensões, em JPEG | 6 `<img>` de projetos | `loading="lazy"` + `width/height` + WebP | → Etapa 3 |
| M3 | Títulos h2 de seção com peso/escala divergentes | vários `<h2>` | Uniformizar (ex.: 700, `clamp(2rem,4vw,2.75rem)`) | ⏸ decisão em equipe |
| M4 | Form sem "obrigatório" e sem inputmode | `#zyForm` | Asterisco + `required` + `inputmode` no contato | → Etapa 3 |
| M5 | `body` sem line-height; corpo de card <16px mobile | `css/styles.css`; cards `.95rem` | `line-height:1.6` no body; corpo p/ 1rem | → Etapa 3 |

### 🟢 Baixo
| # | Problema | Onde | Correção sugerida | Status |
|---|---|---|---|---|
| B1 | Padding de seção assimétrico (88/48) | `<section>` | Igualar topo/base (96/96) | ✅ Etapa 1 |
| B2 | `gap` fora do ritmo 8pt (10/12 avulsos) | grids/flex | Padronizar em 8/16/24 | ✅ Etapa 1 |
| B3 | Múltiplos `<nav>` sem `aria-label` distinto | header/rodapé/menu | Rotular cada nav | ✅ já no código |
| B4 | Tons de estado do acento ad-hoc | `#00E0E1`, `#00b5b6` | Formalizar `--accent-hover/press` | ✅ Etapa 1 |
| B5 | Padding de card fora de 8pt (30/36) | cards | 32/40 | ✅ Etapa 1 |

---

**Resumo (rodada 1):** base sólida e acessível; o salto "premium" vem de **sistematizar tokens** (tipografia → sombras → raios → espaçamento) e resolver 3–4 itens de SEO/a11y/performance — não de reescrever design nem trocar fontes/cores.
