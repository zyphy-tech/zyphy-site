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
