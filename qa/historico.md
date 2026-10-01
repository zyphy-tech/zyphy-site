# Histórico do QA

Uma entrada por volta do `zyphy-ciclo`, a mais nova embaixo. Não edite à mão
as entradas já gravadas: elas registram o que foi medido em cada commit.

<!-- Formato de cada volta:

## Volta N — AAAA-MM-DD

- **Commit medido:** <hash curto>
- **Modo:** rapido | completo
- **URL medida:** <url, sem token>
- **Nota:** X/100 (medido Y/60, julgado Z/40) · aprovado sim|não
- **Bloqueios:** <ids, ou "nenhum">
- **Correções aplicadas:** N/M — <origem de cada uma>
- **Precisa de humano:** <itens, ou "nada">
-->

## Volta 1 — 2026-09-30

- **Commit medido:** 1c3c25e
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:64725/ (branch servida localmente)
- **Nota:** 73,2/100 (medido 47,71/60, julgado 25,49/40) · aprovado não
- **Bloqueios:** QA-14, IMP oversized-h1, anti-brief-headline-generica, conteudo-sem-fonte
- **Correções aplicadas:** 8/12 — IMP oversized-h1, U1, IMP all-caps-body, IMP tight-leading, IMP gray-on-color, IMP clipped-overflow-container, QA-13, A4 (DESIGN.md extraído)
- **Precisa de humano:** aprovar DESIGN.md extraído; QA-14 (política de privacidade × brief §9); headline genérica (trocar H1 ou exceção REVIEW); fatos-cliente.md e "4 projetos no ar" (FieldFix)

## Volta 2 — 2026-09-30

- **Commit medido:** c7f688e
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:64725/ (branch servida localmente)
- **Nota:** 89,5/100 (medido 58/60, julgado 31,5/40) · aprovado não
- **Bloqueios:** QA-02 (novo: +209px em 1440x900), QA-14, anti-brief-headline-generica, conteudo-sem-fonte, conteudo-metrica, conteudo-depoimento
- **Correções aplicadas:** 1/7 — QA-02 (.hero-media no desktop, exposto pela retirada do overflow:clip na volta 1)
- **Precisa de humano:** QA-14 (política × brief §5/§9); headline genérica (trocar H1 ou exceção REVIEW); fatos-cliente.md (fontes); "4 projetos no ar" e Performance 84/86/84; verificação dos 3 depoimentos

## Volta 3 — 2026-09-30

- **Commit medido:** eecb558
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:50121/ (branch servida localmente)
- **Nota:** 89,4/100 (medido 57,85/60, julgado 31,5/40) · aprovado não
- **Bloqueios:** QA-14, anti-brief-headline-generica, conteudo-sem-fonte, conteudo-metrica, conteudo-depoimento
- **Correções aplicadas:** 0/0 — ciclo parado por platô antes de corrigir (nota −0,1 sobre a volta 2)
- **Precisa de humano:** os 5 bloqueios acima; copy.md (C5) depende do fatos-cliente.md

<!-- 2º ciclo de 2026-09-30: copy.md aprovado (H1-A) aplicado ao site. A contagem de voltas recomeça. -->

## Volta 1 — 2026-09-30 (2º ciclo)

- **Commit medido:** b1a0a96
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:59728/ (branch servida localmente)
- **Nota:** 84,7/100 (medido 55,71/60, julgado 28,99/40) · aprovado não
- **Bloqueios:** QA-14, decisao-desfeita ×2 (H1, ficha FieldFix), anti-brief-headline-generica, conteudo-metrica ×2 (Vora, TecNova), conteudo-sem-fonte ×5
- **Correções aplicadas:** 8/11 — decisao-desfeita (H1), anti-brief-headline-generica, decisao-desfeita (FieldFix 81), conteudo-metrica, conteudo-sem-fonte (FieldFix), conteudo-sem-fonte (passos), conteudo-sem-fonte (soluções), C5; COPY aplicada em parte (não conta: 2 itens dependem de humano)
- **Precisa de humano:** COPY: aria-label do WhatsApp no header e rótulos do rodapé × brief §5.8; COPY: erro "Conte em uma frase…" exige mensagem obrigatória; QA-14 (política de privacidade em rascunho); QA-01 possível falso positivo do medidor (`font-family` dentro de `@font-face`); `"dominio"` ausente no qa/config.json

## Volta 2 — 2026-09-30 (2º ciclo)

- **Commit medido:** 7ba4487
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:59728/ (branch servida localmente)
- **Nota:** 93,7/100 (medido 53,71/60, julgado 39,99/40) · aprovado não
- **Bloqueios:** QA-02 (+42px em 360x800, filtros do dashboard), QA-14
- **Correções aplicadas:** 2/4 — QA-02, IMP line-length
- **Precisa de humano:** QA-14 (política de privacidade em rascunho); QA-01 possível falso positivo do medidor (`font-family` dentro de `@font-face`); COPY: aria-label do WhatsApp × brief §5.8; COPY: erro "Conte em uma frase…" × mensagem opcional

## Volta 3 — 2026-09-30 (2º ciclo)

- **Commit medido:** 39dd62c
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:59728/ (branch servida localmente)
- **Nota:** 92,7/100 (medido 55,71/60, julgado 36,99/40) · aprovado não
- **Bloqueios:** QA-14
- **Correções aplicadas:** 0/0 — ciclo parado por platô antes de corrigir (nota −1,0 sobre a volta 2); a única correção de prioridade 1 (QA-14) é humana
- **Precisa de humano:** QA-14 (política em rascunho, brief:270-271 e :430-431); QA-01 possível falso positivo do medidor; A5: aria-label do WhatsApp × brief §5.8 e erro "Conte em uma frase…" × mensagem opcional; U4: ficha e depoimento correm no trilho de projetos × regra 3; `"dominio"` ausente no qa/config.json

<!-- 3º ciclo de 2026-09-30: política de privacidade concluída (brief §3). A contagem de voltas recomeça. -->

## Volta 1 — 2026-09-30 (3º ciclo)

- **Commit medido:** 1099b33
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:58052/ (branch servida localmente)
- **Nota:** 92,4/100 (medido 57,85/60, julgado 34,55/40) · aprovado não
- **Bloqueios:** QA-14, decisao-desfeita ×2 (trilho de projetos move ficha e depoimento; link de privacidade fora do rodapé e fora do .vercelignore)
- **Correções aplicadas:** 4/4 — QA-14, decisao-desfeita (trilho), decisao-desfeita (privacidade), C3
- **Precisa de humano:** nada

## Volta 2 — 2026-09-30 (3º ciclo)

- **Commit medido:** da5bfbc
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:58052/ (branch servida localmente)
- **Nota:** 95,7/100 (medido 55,71/60, julgado 39,99/40) · aprovado não
- **Bloqueios:** R6 (moldura sticky das miniaturas em #projetos, 1440x900)
- **Correções aplicadas:** 1/2 — QA-06 (Open Graph em /privacidade/)
- **Precisa de humano:** R6: a moldura sticky é decisão do brief §3 (2026-09-30); o R6 marca qualquer sticky no meio da página, sem testar se cobre conteúdo, e o qa/config.json não aceita exceção de R6

## Volta 3 — 2026-09-30 (3º ciclo)

- **Commit medido:** 94c10b1
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:58052/ (branch servida localmente)
- **Nota:** 97,9/100 (medido 57,85/60, julgado 40/40) · aprovado não
- **Bloqueios:** R6
- **Correções aplicadas:** 0/0 — volta só de medição: a única correção de prioridade 1 (R6) é humana
- **Precisa de humano:** R6 (moldura sticky do brief §3 × regra do medidor sem exceção possível); brief §5.9/§9 e copy.md:47 ainda dizem "sem link de Privacidade"; localização "São Paulo (SP)" da política sem fato no fatos-cliente.md; /privacidade/ sem estilo próprio (classes .legal*, .draft-banner e .fill sem regra) e fora do sitemap.xml

<!-- 4º ciclo de 2026-09-30: o R6 do medidor passou a testar se o flutuante cobre conteúdo. A contagem de voltas recomeça. -->

## Volta 1 — 2026-09-30 (4º ciclo)

- **Commit medido:** 582c3d8
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:61128/ (branch servida localmente)
- **Nota:** 96,4/100 (medido 57,85/60, julgado 38,55/40) · aprovado não
- **Bloqueios:** R6 (moldura sticky de #projetos sob o nav do header, 1440x900 y=9000), decisao-desfeita ("Começar projeto" da /privacidade/ para /#contato), conteudo-sem-fonte (política: "São Paulo (SP)" e verificação em duas etapas)
- **Correções aplicadas:** 1/3 — decisao-desfeita (href /#comecar na /privacidade/)
- **Precisa de humano:** R6: o header fixo (z-index 100) pinta por cima da moldura (elementFromPoint devolve o header); o R6 cruza caixas sem testar a ordem de pintura, e o qa/config.json não aceita exceção de R6; conteudo-sem-fonte: registrar no fatos-cliente.md a cidade e a verificação em duas etapas, ou tirar as duas frases da política

## Volta 2 — 2026-09-30 (4º ciclo)

- **Commit medido:** 6c8dd97
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:61128/ (branch servida localmente)
- **Nota:** 97,9/100 (medido 57,85/60, julgado 40/40) · aprovado não
- **Bloqueios:** R6, conteudo-sem-fonte
- **Correções aplicadas:** 0/0 — ciclo parado por platô (+1,5 sobre a volta 1) e só bloqueios humanos: as duas correções de prioridade 1 já foram para humano na volta 1
- **Precisa de humano:** R6: o checks/comportamento.mjs do medidor (sobrepoe/anotar) cruza caixas sem testar ordem de pintura, e o header fixo pinta por cima da moldura; conteudo-sem-fonte na política ("São Paulo (SP)" e verificação em duas etapas)

<!-- 5º ciclo de 2026-09-30: o R6 do medidor passou a conferir a ordem de pintura (elementFromPoint), e o 8159e58 registrou F29/F30 e tirou "Google Play" da política. A contagem de voltas recomeça. -->

## Volta 1 — 2026-09-30 (5º ciclo)

- **Commit medido:** 8159e58
- **Modo:** rapido
- **URL medida:** http://127.0.0.1:62783/ (branch servida localmente)
- **Nota:** 97,9/100 (medido 57,85/60, julgado 40/40) · aprovado sim
- **Bloqueios:** nenhum
- **Correções aplicadas:** 0/0 — aprovado na volta 1 sem COPY pendente (copy.md aprovado confere com o site); segue para a etapa final
- **Precisa de humano:** nada nesta volta

> Etapa final parada em 2026-09-30: o preview da Vercel (https://zyphy-site-60bpaq8va-zyphy.vercel.app) está protegido (302 para o SSO da Vercel), e a VERCEL_AUTOMATION_BYPASS_SECRET não está definida no ambiente. A medição completa e o PR ficam para a próxima rodada.
