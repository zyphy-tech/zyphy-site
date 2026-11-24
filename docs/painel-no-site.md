# Painel no site

Os prints do painel que aparecem no site ficam em `assets/img/painel/` (36 arquivos `.webp`).
São prints do painel de verdade, abertos com uma empresa de exemplo (ConsertaFone) e números
inventados. Por isso todo bloco leva a legenda "painel da Zyphy · dados de exemplo".

## De onde vêm

Saem de um script de captura que fica no repositório do painel (privado). Ele abre o painel em
modo demonstração e fotografa cada bloco duas vezes:

- **computador:** painel em 1440 px → `painel-<bloco>.webp`
- **celular:** painel em 390 px, no layout de celular do próprio painel → `painel-<bloco>-cel.webp`

O script para se encontrar o nome de um cliente real em qualquer tela.

## Como atualizar quando o painel mudar

1. Rodar o script de captura no repositório do painel (o passo a passo está lá).
2. Copiar os `.webp` gerados para `assets/img/painel/`, por cima dos atuais.
3. Se o tamanho de algum print mudou, acertar `width` e `height` na tag da página.
4. Se um cartão mudou de lugar nos prints com bolinha (`painel-visao-geral` e
   `painel-busca-organica`), acertar as posições `.pin.pa1…pa4` e `.pin.ps1…ps4` no fim do
   `css/base.css`. O script grava a posição de cada cartão em `manifesto.json`.
5. Atualizar o `<lastmod>` das páginas alteradas no `sitemap.xml`.

## Onde aparece

| Página | Blocos |
|---|---|
| `/` | SEO e GEO, Anúncios, Plano de acompanhamento |
| `/anuncios/` | topo, "Seus anúncios em português" (bolinhas), pesquisas, relatório e melhorias |
| `/seo-e-geo/` | topo, "Veja de onde vêm os seus clientes" (bolinhas) |
| `/automacao-e-sistemas/` | exemplo do painel do cliente |
| `/como-funciona/` | topo |

No celular (até 760 px) cada bloco usa o print `-cel`. Os blocos com bolinha viram "um por vez":
um recorte na tela, e a pessoa desliza ou toca no número (`[data-tour]` no HTML, estilos no fim
do `css/base.css`, script no fim do `js/site.js`). Sem script o trilho continua deslizando e a
legenda aparece inteira.

O site não aceita estilo nem script inline (CSP no `vercel.json`): posição de bolinha é classe
no CSS, nunca `style=""`.

## Decisões (24/11/2026)

- **Prints novos no lugar dos antigos.** O painel mudou de aparência (cartões claros sobre o
  fundo petróleo) e os 17 prints antigos, escuros, saíram de `assets/img/site/`.
- **Uma bolinha por cartão do painel, com o mesmo texto no computador e no celular.** Ficaram 4
  itens em cada bloco.
- **Saíram as legendas "Quantos viraram orçamento", "Do gasto à venda" e "Custo de cada
  etapa".** Motivo: esses números só existem quando a empresa registra orçamentos e vendas, e a
  demonstração não usa esse registro. No lugar ficaram "Como está a campanha" e "Do clique ao
  contato". Não recolocar sem o painel de demonstração mostrar esses números.
- **No celular o print encolhido saiu.** Motivo: não dava para ler, e as bolinhas cobriam os
  números. No lugar entrou o "um por vez".
