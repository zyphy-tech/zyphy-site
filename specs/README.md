# Spec de carrossel

Um arquivo por carrossel: `specs/NN-slug.json`. `NN` continua a numeração de `posts.json`.
Exemplo completo: `01-planilha-nao-e-sistema.json`.

```json
{
  "title": "Nome do carrossel",
  "date": "2026-11-22T20:00",
  "caption": "Legenda inteira, com \\n entre parágrafos e as 3 hashtags no fim",
  "slides": [ 7 slides, nesta ordem: capa, 4 × content, virada, cta ]
}
```

## Slides

| type | campos | observação |
|---|---|---|
| `capa` | `label`, `h1` (use `<br>`), `size` (200–300), `p`, `foot` | fundo 950, barra 1 ativa, "Arraste" |
| `content` | `parts`: lista de dispositivos (abaixo) | posições 2–5; o fundo alterna sozinho (900, 850, 950, 900) |
| `virada` | `m` (frase cinza), `big` (frase gigante), `size` (170–230) | fundo 850, sem rótulo |
| `cta` | `h2`, `size` (170–220), `p` | fundo petróleo, botão "Diagnóstico grátis em 1 dia" |

## Dispositivos (`parts` de um slide `content`)

Cada item é `{"nome": argumentos}`. Use 2 a 4 por slide; quase sempre `head` primeiro e `fecho` por último.

| nome | argumentos | para quê |
|---|---|---|
| `head` | `["RÓTULO", "Título", tamanho]` (120–150) | rótulo pequeno + título Sofia |
| `muted` | `"texto"` | frase de apoio em cinza |
| `fecho` | `"texto"` | linha forte do fim do slide (linha de print) |
| `mapgrid` | `[["item1","item2",...], colunas]` | mapa numerado (3 col. ou 2×2) |
| `pair` | `["Rótulo ✗","texto ✗","Rótulo ✓","texto ✓"]` | antes × depois |
| `signals` | `[[["Título","descrição"],["Título","descrição"]], n_inicial]` | 2 cartões "Sinal N" |
| `checklist` | `["item", "item", "item"]` | lista com ✓ |
| `rules` | `[[["Título","descrição"],...], n_inicial]` | regras numeradas 01, 02… |
| `plaque` | `"texto"` | caixa de busca (ex.: `site:seudominio.com.br`) |
| `kpi` | `null` | painel de exemplo do site (dados fictícios; diga isso num `caption`) |
| `table` | `{"cols":[...],"widths":["150px","1fr",...],"rows":[[...]],"blur":[0,1],"caption":"..."}` | tabela (colunas em `blur` saem borradas) |
| `verdicts` | `[["rótulo","veredito",true], ...]` | linhas com ✓/✗ |
| `formula` | `"Texto<br>da conta"` | conta em destaque |
| `caption` | `"texto"` | legenda pequena em cinza |
| `phone` | `{"src": "assets/print.png", "notes": ["nota 1", "nota 2", "nota 3"], "width": 330}` | print real de tela num celular, com 2 ou 3 notas ao lado. Imagem em `assets/` (print de 390 px de largura, escala 3) |
| `sites` | `{"items": [{"src": "assets/a.png", "name": "Cliente", "url": "cliente.com.br"}, ...], "width": 270}` | 2 prints de site lado a lado com o endereço embaixo, pra pessoa visitar |

Texto aceita HTML simples: `<br>`, `<wbr>`, `<span style="font-weight: 600">…</span>`, `&nbsp;` para evitar palavra sozinha na linha.

## Gerar

```
python3 -I tools/build_post.py specs/NN-slug.json
```

Saída: `posts/NN-slug/01..07.jpg` e `review/NN-slug.png`. Se aparecer **PROBLEMAS DE LAYOUT**, diminua o `size` do título indicado ou encurte o texto e rode de novo.
