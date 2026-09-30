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
