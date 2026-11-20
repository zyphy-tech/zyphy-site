# zyphy-site

Site da Zyphy (https://www.zyphy.com.br), em HTML estático, sem build.

## Sitemap

- O `sitemap.xml` é escrito à mão. O `<lastmod>` de cada página é a data da última mudança real nela.
- Todo PR que mexer numa página (`<pasta>/index.html` ou `index.html`) atualiza, no mesmo PR, o `<lastmod>` dela no `sitemap.xml` para a data do commit (formato `AAAA-MM-DD`).
- Página que o PR não tocou mantém a data que já tem. Nunca ponha a mesma data em todas as páginas.
