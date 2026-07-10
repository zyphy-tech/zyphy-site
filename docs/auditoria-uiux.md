# 🔍 Auditoria UI/UX — Zyphy (index.html + css/styles.css)

> Data: 2026-07-10 · Ferramenta: skill `ui-ux-pro-max` (design-system + domínios `typography`, `color`, `ux`) + medições reais do código e cálculo de contraste WCAG.

**Veredito geral:** o site já está **acima da média** em fundamentos de acessibilidade (contraste AAA, foco visível, reduced-motion, touch targets). Os problemas reais são de **consistência de sistema** (tipografia, sombras, raios) e alguns ajustes **médios** de SEO/a11y/performance. **Não há bloqueadores críticos.**

---

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

---

## 2. Divergências vs. o que existe hoje

### Tipografia — ⚠️ principal ponto fraco
- **30+ tamanhos de fonte distintos**, misturando `px` e `rem` sem escala (`12px, .95rem, 11px, 1.2rem, 10.5px, 1.05rem, 1rem, 12.5px, 1.1rem, .82rem, 13.5px…`). Sem sistema.
- Títulos de seção `<h2>` **inconsistentes**: uns `font-weight:700` com `clamp(1.8rem,3.8vw,2.5rem)`, outros `800` com `clamp(2.1rem,4.6vw,3.4rem)`.
- Pareamento de fontes: **bom** (Sora+Inter+Mono) — manter.

### Espaçamento
- Padding interno das seções **consistente** (`88px 24px 48px`) ✅, mas **assimétrico** (topo 88 / base 48).
- `gap` mistura `8/10/12/20/36/48` — quase 8pt, com alguns fora do ritmo.
- Cards com padding `30px`/`36px` (não múltiplos de 8; ideal 32/40).

### Paleta / Contraste — ✅ forte
| Texto | Sobre | Ratio | WCAG |
|---|---|---|---|
| `#9FB3B3` secundário | `#1B2626` (cards) | **7.08:1** | **AAA** |
| `#9FB3B3` | `#0C1212` (body) | 8.62:1 | AAA |
| `#F2FAFA` principal | `#141D1D` | 16.21:1 | AAA |
| `#00CBCC` acento | `#1B2626` | 7.70:1 | AAA |
| `#0E1515` (texto CTA) | `#00CBCC` (botão) | 9.16:1 | AAA |

→ **Nenhuma falha de contraste.** O `#9FB3B3` passa AAA em todos os fundos. Divergência menor: tons de estado do acento (`#00E0E1`, `#00b5b6`) são ad-hoc, não uma escala.

### Hierarquia visual
- **h1 real está oculto** (sr-only "Zyphy"); o headline visível do hero ("Tecnologia que destrava…") é um `<p>`.
- **Salto de nível**: seção de contato/rodapé vai de `<h2>` direto para `<h4>` (pula `<h3>`).
- Resto da hierarquia (h2 seção → h3 card) correto ✅.

### Raios & Sombras
- **~10 raios** (`5, 8, 10, 11, 12, 14, 20, 28, 100, 50%`) — `5px` e `11px` são oddballs.
- **11 sombras** one-off, sem escala de elevação.

---

## 3. UX / Acessibilidade / Responsividade

✅ **Já corretos:** `:focus-visible` (outline 3px ciano) · `prefers-reduced-motion` · touch targets (burger 44, menu 48, ícones 44, submit 52, inputs 48) · labels com `for` · `role="status" aria-live` no form · landmarks (`main/header/footer/nav/section`) · `lang="pt-BR"` · viewport sem travar zoom · `alt` descritivos nas imagens.

⚠️ **Gaps:** sem **skip-link** · imagens **sem `loading="lazy"` nem `width/height`** (risco de CLS) e em **JPEG** (não WebP/AVIF) · form **sem indicador de obrigatório** e `contato` como `type="text"` (sem `inputmode`) · `body` **sem `line-height` base** · alguns textos de card em `.95rem` (~15px, <16px no mobile).

---

## 4. Lista priorizada

### 🔴 Crítico
*Nenhum.* Sem falhas de contraste, foco, ou interação quebrada.

### 🟠 Alto
| # | Problema | Onde | Correção sugerida |
|---|---|---|---|
| A1 | Escala tipográfica inconsistente (30+ tamanhos, px+rem) | inline em todo `index.html` | Definir tokens `--fs-*` (12/14/16/18/20/24/32) e aplicar |
| A2 | Headline visível do hero é `<p>`; h1 oculto só diz "Zyphy" | hero | Tornar o headline o `<h1>` — SEO |
| A3 | Salto de heading h2→h4 | seção contato/rodapé | Usar `<h3>` nos títulos de coluna do rodapé |
| A4 | Sombras (11) e raios (~10) sem escala | inline em todo `index.html` | Tokens `--shadow-e1/e2/e3` e `--radius-sm/md/lg/pill` |

### 🟡 Médio
| # | Problema | Onde | Correção sugerida |
|---|---|---|---|
| M1 | Sem skip-link | topo do `<body>` | `<a href="#conteudo" class="skip">Pular para o conteúdo</a>` + `id` no `<main>` |
| M2 | Imagens sem lazy nem dimensões, em JPEG | 6 `<img>` de projetos | `loading="lazy"` + `width/height` + WebP |
| M3 | Títulos h2 de seção com peso/escala divergentes | vários `<h2>` | Uniformizar (ex.: 700, `clamp(2rem,4vw,2.75rem)`) — *pendente de decisão em equipe* |
| M4 | Form sem "obrigatório" e sem inputmode | `#zyForm` | Asterisco + `required` + `inputmode` no contato |
| M5 | `body` sem line-height; corpo de card <16px mobile | `css/styles.css`; cards `.95rem` | `line-height:1.6` no body; corpo p/ 1rem |

### 🟢 Baixo
| # | Problema | Onde | Correção sugerida |
|---|---|---|---|
| B1 | Padding de seção assimétrico (88/48) | `<section>` | Igualar topo/base (ex.: 96/96) |
| B2 | `gap` fora do ritmo 8pt (10/12 avulsos) | grids/flex | Padronizar em 8/16/24 |
| B3 | Múltiplos `<nav>` sem `aria-label` distinto | header/rodapé/menu | Rotular cada nav |
| B4 | Tons de estado do acento ad-hoc | `#00E0E1`, `#00b5b6` | Formalizar `--accent-hover/press` |
| B5 | Padding de card fora de 8pt (30/36) | cards | 32/40 |

---

**Resumo:** base sólida e acessível; o salto "premium" vem de **sistematizar tokens** (tipografia → sombras → raios → espaçamento) e resolver 3–4 itens de SEO/a11y/performance — não de reescrever design nem trocar fontes/cores.
