# Instagram Zyphy

Branch de trabalho do Instagram do @zyphytech. **Não é o site** e não faz deploy (`vercel.json` desliga a Vercel nesta branch).

| Pasta / arquivo | O que tem |
|---|---|
| `posts/NN-slug/01..07.jpg` | slides de cada carrossel; o Metricool copia daqui pelo link raw |
| `specs/NN-slug.json` | texto e estrutura de cada carrossel (formato em `specs/README.md`) |
| `review/NN-slug.png` | folha com os 7 slides, para aprovar |
| `posts.json` | histórico: número, tema, pilar, data, id no Metricool, status |
| `tools/build_post.py` | gera os JPEGs a partir do spec e confere o layout |
| `tools/next_slots.py` | próximas datas pela regra D-012 (a cada 2 dias, 12h útil, 20h domingo, sem sábado) |
| `tools/zyphy_slides.py` | componentes visuais da marca (cores, fontes, dispositivos) |
| `fonts/` | Sofia Sans Extra Condensed 800 e Archivo (licença OFL) |

Link público de uma imagem: `https://raw.githubusercontent.com/zyphy-tech/zyphy-site/instagram/posts/NN-slug/01.jpg`

O fluxo completo (temas → aprovação → slides → Metricool) está na skill **agente-instagram-zyphy**.
