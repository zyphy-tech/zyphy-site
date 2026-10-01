# Aprendizados — piloto da pipeline (zyphy-site, set/2026)

Resultado: nota 71 → 95,9; 7 bloqueios → 0. Publicado via PR #6 (sem-preview), conferido na produção e no celular (Wi-Fi e 4G).

## Virou regra (já aplicado no zyphy-pipeline)
- Medidor mede a branch (servidor local nas voltas), não a produção.
- Exceção nunca vira correção; decisão do humano não é tarefa do design.
- "Precisa de humano" = só decisão, informação ou acesso; medir e commitar são do ciclo.
- Brief vale sobre o copy.md quando se contradizem.
- DESIGN.md extraído documenta o código; não inventa conceito.
- Agente não altera arquivo para influenciar o medidor; defeito é reportado.
- R6 reprova só fixed/sticky que cobre conteúdo, conferindo o que está por cima.
- Prioridade 3 é aplicada quando não sobra prioridade 1 ou 2 de máquina.
- /zyphy-ciclo sem-preview quando o projeto da Vercel não é nosso, só por escolha explícita.

## Processo humano
- Fatos são o gargalo: 25 [CONFIRMAR] só zeraram depois de ~30 perguntas. No próximo site, fatos-cliente.md antes de tudo, numa conversa só com o cliente.
- Decisão sem registro volta (regra 1): slogan, link de privacidade e trilho só se resolveram quando foram escritos no brief.
- Projeto na Vercel de outra pessoa trava a etapa final. Site novo de cliente: no nosso time da Vercel desde o início.

## Pendências deste site
- R9: zyphy.com.br (sem www) aponta só para 216.198.79.1, que não responde a partir da nossa rede; pelo 4G abre. Pedir à dona da conta para conferir o registro recomendado pela Vercel.
- Aprovar o DESIGN.md extraído (leitura do Weslley).
- Política: tirar "exigido por lei" do prazo de 5 anos (sem fonte) no próximo ajuste.
- cramped-padding no index.html (prioridade 2, +2 pontos) para o próximo ciclo.
