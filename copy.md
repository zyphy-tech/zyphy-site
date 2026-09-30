# Copy — Zyphy

- Cliente: Zyphy (zyphy.com.br)
- Data: 2026-09-30
- Fontes: fatos-cliente.md, brief-zyphy-site-v3.md, refs/NOTAS.md
- Status: aprovado

<!--
Notas para a parada de aprovação

Base
- Diferencial: prova técnica real (brief §1). Três fatos sustentam: quem
  conversa é quem programa (F13), diagnóstico grátis de 1 página em 1 dia
  (F14) e resposta no mesmo dia, inclusive fim de semana e à noite (F1).
  A prova vem nos 4 projetos no ar (F3) com nota medida (F21 a F24).
- Ação principal: "Começar projeto", que leva ao formulário do contato e
  abre o WhatsApp com a mensagem pronta.
- Público: dono de PME e pessoa física com um problema de rotina (F12).
- Objeções atacadas: "vão me responder?" (F1), "quanto custa começar?"
  (F14), "o preço vai mudar no meio?" (F15), "quem faz de verdade?" (F13),
  "é template?" (F19), "já entregaram algo?" (F3, F21 a F28, F5 a F7),
  "e depois que for ao ar?" (F2, F11, F17).

Onde o texto sai do brief, e por quê
- H1: o slogan "Tecnologia que destrava o seu dia a dia" serviria para
  qualquer agência (bloqueio anti-brief-headline-generica). O título foi
  liberado para revisão em 2026-09-30; o Weslley escolheu a H1-A entre
  três opções (brief §3, decisões de 2026-09-30). O slogan ficou no meta
  title.
- Com o H1 escolhido, o subtítulo perde a parte "construídos por quem vai
  colocar a mão no código" do brief, para não repetir o título.
- Passo 3 do processo: o brief dizia "link de preview a cada entrega" e
  "em vez de esperar 3 meses". O fato F16 diz que o preview vem no fim da
  construção, e o "3 meses" não tem fonte. Texto segue o F16.
- Passo 4: "monitoramento" saiu (não está nos fatos). Entrou o que está:
  publicação com domínio no nome do cliente (F17), 7 dias de ajustes com
  o que cobrem (F2) e suporte contínuo depois (F11).
- FieldFix: o brief dizia "app Android/iOS" e "Supabase (Auth, Postgres,
  Realtime)". F4 diz que o iOS não foi lançado e F28 cita só Flutter e
  Supabase. Ficou "app Android (beta)" e "Flutter e Supabase". Sem link
  da Play Store (F4: não disponível ao público).
- Card do FieldFix com "Página de apresentação: 81" (decisão de
  2026-09-30, brief §3).
- Depoimentos: trechos do brief §5.7, sem cargo (pendência aberta no
  brief §9). Conferir que o trecho bate letra por letra com o print
  (F5 a F7 exigem texto idêntico ao enviado).
- Rodapé: sem link de Privacidade até a política sair do rascunho
  (brief §9).
- Dashboard: filtros sem número no rótulo ("Última semana" em vez de
  "7 dias"), para não parecer métrica. Os dados continuam marcados como
  fictícios.
-->

## 1. Nav

- **Itens:** Soluções, Como construímos, Projetos, Contato
- **Microcopy:** logo com rótulo acessível "Zyphy, página inicial"; botão do menu no celular "Abrir menu" / "Fechar menu"; ícone do WhatsApp no header do celular com rótulo acessível "Falar com a Zyphy no WhatsApp".

## 2. Hero

- **H1:** Quem fala com você programa o seu projeto [F13].
  - **Por quê:** usa o diferencial do brief §5.2, "construídos por quem vai colocar a mão no código" [F13]; agência com vendedor ou gerente de conta entre o cliente e o programador não pode dizer isso, e a seção de projetos mostra o que essa pessoa já entregou [F3].
- **Subtítulo:** Automação de processos, modernização de sistemas antigos, sites, apps e dashboards, para empresas e pessoas físicas [F8] [F9] [F10] [F12].
- **CTA:** Começar projeto
- **CTA secundário:** Ver projetos
- **Microcopy:** linha abaixo dos botões: "Resposta no mesmo dia, inclusive no fim de semana [F1]."

## 3. Dashboard ao vivo

- **Corpo:** Exemplo de dashboard que a Zyphy entrega [F10]. Clique nos filtros e veja os dados mudarem. Dados fictícios.
- **Microcopy:** título do painel "Loja exemplo"; grupo de filtros com rótulo acessível "Período"; filtros "Última semana", "Último mês" e "Último ano"; indicadores "Pedidos", "Faturamento" e "Ticket médio"; rótulo do gráfico "Faturamento no período"; aviso para leitor de tela na troca de filtro: "Mostrando dados de exemplo do período selecionado."

## 4. O que a Zyphy resolve

- **Título:** Onde a gente entra.
- **Corpo:**
  - **Automação de processos.** Planilha, copia-e-cola, retrabalho. Vira rotina que roda sozinha [F8].
  - **Modernização de sistemas.** O sistema antigo que ninguém quer mexer e de que a empresa inteira depende. A gente moderniza esse sistema [F9].
  - **Sites, apps e dashboards.** Informação espalhada e cliente sem onde te encontrar. Vira site, app ou dashboard feito do zero, sem template de terceiros [F10] [F19].
- **Coluna "Para empresas":** Apps e dashboards feitos para a sua operação [F10] [F12]. Modernização do sistema que você já usa [F9].
- **Coluna "Para pessoas":** Site ou app do seu projeto [F10] [F12]. Automação da rotina que toma o seu tempo [F8]. Suporte contínuo depois da entrega [F11].

## 5. Como a gente constrói

- **Título:** Como a gente constrói.
- **Corpo:**
  1. **Diagnóstico.** Você conta o que está travando. Em 1 dia, recebe um diagnóstico de 1 página, grátis [F14].
  2. **Plano.** A proposta fixa preço, prazo e escopo [F15]. Você sabe quanto paga e o que recebe antes de começar [F15].
  3. **Construção.** No fim da construção, você recebe o link de preview e usa o projeto antes de ir ao ar [F16].
  4. **No ar e depois.** A gente publica, e o domínio fica no seu nome [F17]. Por 7 dias, correção de bug, mudança de texto e de layout estão incluídas [F2]. Depois disso, o suporte continua [F11].
- **Linha final:** Construímos com Next.js, Flutter, Supabase e Vercel [F18]. Sem template de terceiros [F19].

## 6. Projetos com ficha técnica

- **Título:** O que já está no ar.
- **Subtítulo:** 4 projetos no ar [F3].
- **Legenda da ficha:** Performance é a nota do Lighthouse no celular, mediana de 3 medições da página inicial [F21] [F22] [F23] [F24].
- **Card Stahltek Rotuladoras:**
  - **Descrição:** Fabricante de rotuladoras industriais: catálogo de equipamentos, manutenção e pedido de orçamento [F25].
  - **Tipo:** site institucional [F25]
  - **Stack:** HTML, CSS e JS [F25]
  - **Integração:** orçamento direto no WhatsApp [F25]
  - **Performance:** 84 [F21]
  - **Depoimento:** "Conseguimos mostrar nossos serviços e equipamentos de forma muito mais clara." Carlos Eduardo, Stahltek Rotuladoras [F5].
  - **Alt da imagem:** Página inicial do site da Stahltek Rotuladoras.
  - **Link:** Abrir o site
- **Card Vora Jewelry:**
  - **Descrição:** Loja de joias iced-out, com hero em vídeo e peças personalizáveis [F26].
  - **Tipo:** loja [F26]
  - **Stack:** Next.js 16, Tailwind v4 e shadcn/ui [F26]
  - **Destaque:** visualizador 360° dos produtos [F26]
  - **Performance:** 85 [F22]
  - **Depoimento:** "Os produtos estão bem organizados e a parte de personalização é um diferencial bem interessante." Severina Silva, Vora Jewelry [F6].
  - **Alt da imagem:** Página inicial da loja Vora Jewelry.
  - **Link:** Abrir a loja
- **Card TecNova:**
  - **Descrição:** Assistência técnica de celulares [F27].
  - **Tipo:** site institucional [F27]
  - **Stack:** HTML e GSAP ScrollTrigger [F27]
  - **Destaque:** desmontagem do produto controlada pela rolagem [F27]
  - **Performance:** 86 [F23]
  - **Depoimento:** "O site ficou simples de navegar e transmite muito mais confiança para nossos clientes." Cleyton Alves, TecNova [F7].
  - **Alt da imagem:** Página inicial do site da TecNova.
  - **Link:** Abrir o site
- **Card FieldFix:**
  - **Descrição:** Manutenção sob demanda: a empresa abre o chamado, o técnico mais próximo aceita e tudo é acompanhado [F28].
  - **Tipo:** app Android (beta) [F28] [F4]
  - **Stack:** Flutter e Supabase [F28]
  - **Página de apresentação:** 81 [F24]
  - **Alt da imagem:** Página de apresentação do app FieldFix.
  - **Link:** Abrir a página de apresentação

## 7. Contato

- **Título:** Conta pra gente o que está travando.
- **Subtítulo:** Quem responde é quem vai programar o seu projeto [F13]. A resposta sai no mesmo dia, inclusive no fim de semana e à noite [F1].
- **Corpo:** O primeiro passo é um diagnóstico grátis de 1 página, em 1 dia [F14].
- **CTA:** Enviar pelo WhatsApp
- **Microcopy:**
  - Linha abaixo do botão: "Abre a conversa com sua mensagem pronta."
  - Campo "Nome", placeholder "Como podemos te chamar".
  - Campo "E-mail ou WhatsApp", placeholder "Seu e-mail ou número com DDD".
  - Campo "O que está travando?", placeholder "Ex.: passo os pedidos do site para a planilha à mão, todo dia."
  - Erro sem nome: "Escreva seu nome."
  - Erro sem contato: "Deixe um e-mail ou WhatsApp para a resposta."
  - Erro sem mensagem: "Conte em uma frase o que está travando."
  - Mensagem que abre no WhatsApp: "Olá, Zyphy. Sou {nome}. Contato: {contato}. {mensagem}"
  - Depois do envio: "O WhatsApp abriu com a sua mensagem. Falta só tocar em enviar."
  - Se o WhatsApp não abrir: "O WhatsApp não abriu? Escreva para o e-mail do rodapé."

## 8. Rodapé

- **Corpo:** Sites, apps, dashboards e automações sob medida [F10] [F8] [F19].
- **Microcopy:** contatos com rótulos "E-mail", "WhatsApp" e "Instagram", os mesmos já publicados [F20]; linha de direitos com o símbolo ©, o ano corrente e "Zyphy".

## SEO

- **Meta title:** Zyphy | Tecnologia que destrava o seu dia a dia
- **Meta description:** Automação de processos, sistemas modernizados, sites, apps e dashboards para empresas e pessoas [F8] [F9] [F10] [F12]. Resposta no mesmo dia [F1]. Diagnóstico grátis em 1 dia [F14].
- **og:title:** Zyphy: quem fala com você programa o seu projeto [F13]
- **og:description:** Diagnóstico grátis de 1 página em 1 dia [F14]. Veja os 4 projetos no ar, com a performance medida em cada um [F3] [F21] [F22] [F23] [F24].
