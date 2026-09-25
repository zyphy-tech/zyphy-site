# Referências — zyphy-site v3

Uma linha por captura, separando **o que eu quero** do **que é só a
marca deles**. Leia junto com as imagens desta pasta. O padrão extraído
das oito está no item 2 do `brief-zyphy-site-v3.md`.

---

## Positivas

### `apple_1.png` — Apple
Quero: a limpeza e o respiro. Um protagonista por tela, nada
competindo. Contraste de fundo entre seções fazendo o ritmo, sem borda
nem divisor. Tipografia carregando o peso, zero enfeite.

Não quero: a estrutura em si — texto centralizado com dois botões é o
layout mais simples da lista. O que faz a página funcionar é a foto de
produto em CGI, que é orçamento, não decisão de design. Copiar a
estrutura sem o ativo devolve exatamente o genérico.

### `site_2.png` — Kyros Hydrogen
Quero: o bloco de cor chapada ocupando a largura inteira e invadindo a
página conforme rola. A cor é o divisor de seção, no lugar de linha ou
borda. A mecânica funciona com qualquer cor.

Não quero: o ciano — é cor de marca ligada ao hidrogênio e briga com o
nosso acento. E a molécula 3D flutuante: funciona porque é literalmente
o produto deles; pra Zyphy seria decoração abstrata (proibida no item 8
do brief).

Nota de captura: o vazio grande no meio da imagem é conteúdo que carrega
no scroll e o GoFullPage não pegou. Não é espaço em branco de verdade.

### `21.png` — 21st.dev
Quero: o movimento conforme você rola. Conteúdo que se desloca e vaza
pela borda da tela, sugerindo que continua — cria vida sem precisar
animar cada bloco. Também o fundo escuro com profundidade sutil, não
chapado uniforme.

Nota: essa referência é a razão de a regra "nenhuma palavra destacada em
título" ter sido afrouxada na v3. Eles usam itálico colorido em uma
palavra por título e funciona. Permitido uma vez, no H1.

Cuidado: o que eu quero é o deslocamento lateral que carrega informação,
não `fade-up` disparado por scroll em toda seção. São coisas diferentes
e a segunda é o gesto mais genérico que existe.

### `nubank.png` — Nubank
Quero: as imagens e o movimento. E a escala tipográfica — frase ocupando
a tela inteira em branco sobre cor chapada, sem imagem competindo. Isso
é coragem de tamanho e sai de graça.

Não quero: tentar reproduzir as imagens. Porquinho 3D, cena ilustrada e
fotografia de rua são produção de time interno de banco. Nossa imagem
autoral vem do Higgsfield, com os critérios do item 6 do brief.

### `rocket.png` — Rocket Software
Quero: o hero. Texto à esquerda, marca gráfica à direita, fundo escuro,
um botão. Contido e funciona.

Não quero: o resto da página. Grid de 4 cards com seta, grid de 4 cards
com foto P&B, 4 ícones lineares com texto genérico, grid de 6 cards de
notícia, accordion. É a lista inteira do item 8. O balão de chat
repetido dez vezes é poluição.

Observação honesta: essa é a mais esquecível das sete, e é a mais
parecida com o que a Zyphy já tem hoje. Serve de confirmação, não de
direção nova.

### `abacate.jpg` — AbacatePay
Quero: a simplicidade. Não tem muita coisa e mesmo assim é bonito. Essa
é a única referência inteiramente executável sem orçamento de produção —
screenshot do próprio produto, linha fina de grid ao fundo, muito ar.

Especificamente: o respiro entre blocos (nada encostado em nada), as
linhas finas de grid marcando colunas no lugar de borda de card, e a cor
aparecendo em só três momentos da página inteira — o resto é neutro. A
cor tem peso porque é rara.

Também: a calculadora interativa ("simule e veja quanto você recebe") é
a mesma lógica do nosso dashboard ao vivo — prova funcionando em vez de
texto dizendo que somos bons.

### `Fasion.jfif` — conceito de moda
Quero: o estilo inteiro faz sentido com o que está sendo vendido. E
três coisas concretas:
- Monocromia disciplinada — o site inteiro numa faixa estreita de cor,
  interface e imagem na mesma temperatura. Nenhuma outra referência tem
  essa coesão.
- Metadado pequeno e monoespaçado entre colchetes como textura técnica.
  Densidade sem código de mentira.
- Tipografia condensada em caixa alta estruturando o layout, em linhas
  curtas empilhadas.

Não quero: o azul-gelo. Ele funciona porque é neve, frio, montanha — a
cor **é** o produto. A Zyphy não tem esse ancoramento pronto; copiar a
paleta sem o motivo dela volta pro genérico.

Cuidado: é mockup de portfólio, não site no ar. Não precisou passar por
responsivo nem por contraste real. Alguns dos metadados em cinza sobre
cinza reprovariam no nosso próprio QA de 4.5:1.

---

## Negativa

### `museum.png` — Royal Museums Greenwich
**Não fazer.** O mesmo padrão repetido cinco vezes: título de seção,
três cards com foto, setas de carrossel nas laterais, cards fantasma
vazando semi-transparentes. Depois de 20% do scroll você já viu a página
inteira.

É competente para o problema deles (museu com dez coisas para vender),
mas faz tudo que o item 8 proíbe: grid de cards como estrutura
principal, seta em todo link, carrossel sem função narrativa.

---

## Tensão registrada

Cinco das sete positivas são predominantemente claras. O site é escuro
por decisão. Parte do respiro que me atraiu na Apple e na AbacatePay
vinha do fundo branco — no escuro isso precisa ser conquistado com
espaçamento e variação de tom.

Por isso as duas referências escuras, `Fasion` e `21`, são as principais
para o sistema visual. `apple_1` e `abacate` entram como disciplina de
espaço, não como paleta.
