# Painel no site

Os prints do painel que aparecem no site ficam em `assets/img/painel/` (37 arquivos `.webp`).
São prints do painel de verdade, abertos com uma empresa de exemplo (ConsertaFone) e números
inventados. Por isso todo bloco leva a legenda "painel da Zyphy · dados de exemplo".

## De onde vêm

Saem de um script de captura que fica no repositório do painel (privado). Ele abre o painel em
modo demonstração e gera dois tipos de imagem:

- **computador:** recortes do painel em 1440 px → `painel-<bloco>.webp`. No site ficam dentro da
  moldura escura (`.pnl`).
- **celular:** a tela inteira do painel em 390×600 px, com a barra do app em cima →
  `painel-tela-<nome>.webp`. No site ficam dentro de um celular desenhado (`.fone`).

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

No celular (até 760 px) a moldura escura some e cada bloco mostra uma tela do painel dentro do
aparelho desenhado. A tela tem proporção fixa e a imagem preenche por `object-fit`, então não sai
esticada em nenhum navegador. Os blocos com bolinha viram "um por vez": as telas ficam lado a
lado dentro do aparelho, e a pessoa desliza ou toca no número (`[data-tour]` no HTML, estilos no
fim do `css/base.css`, script no fim do `js/site.js`). Sem script o trilho continua deslizando e
a legenda aparece inteira.

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
- **No celular o recorte de cartão solto saiu.** A primeira versão punha cartões recortados na
  moldura escura. No aparelho ficou com cara de colagem e os cartões altos do painel pareciam
  imagem esticada. No lugar entrou a tela inteira do painel dentro de um celular. Não voltar para
  recorte solto no celular.
- **A moldura (`.pnl`) é bloco comum, não flex.** No Safari do iPhone, imagem que era item de flex
  em coluna saía cerca de 6% mais alta que o certo.
- **Hero da home no celular:** o ciclo passou de 12 s para 22 s (o passo do WhatsApp ficava cerca
  de 1 s na tela), o texto do site de exemplo ficou maior e, no passo 5, o telefone some e o aviso
  do painel entra no lugar dele (antes o aviso cobria metade do aparelho). No computador o ciclo
  continua em 12 s.
