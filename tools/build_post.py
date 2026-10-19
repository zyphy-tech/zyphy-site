"""Monta um carrossel da Zyphy a partir de um spec JSON e gera os JPEGs prontos para o Metricool.

Uso:
  python3 -I tools/build_post.py specs/16-meu-tema.json [--canvas DIR]

O que faz:
  1. Gera os 7 slides em HTML (marca Zyphy, 1080x1350) com tools/zyphy_slides.py.
  2. Renderiza com o Chromium (Playwright) usando as fontes de fonts/.
  3. Confere o layout de cada slide (texto colado no logo/rodapé, texto passando da margem).
  4. Salva posts/<NN-slug>/01..07.jpg e review/<NN-slug>.png (folha para revisar).
  5. Com --canvas DIR, também escreve os .dc.html + canvas.json para abrir no canvas de design.

Formato do spec: ver specs/README.md.
"""
import json, re, sys, pathlib, argparse
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import zyphy_slides as Z
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'fonts'
BGS = Z.BGS

def _img(src):
    p = pathlib.Path(src)
    p = p if p.is_absolute() else ROOT / p
    if not p.exists(): raise SystemExit(f'imagem não encontrada: {p}')
    return 'file://' + str(p)


DEVICES = {
    'head':      lambda bg, a: Z.head(*a),                    # [label, titulo, tamanho]
    'muted':     lambda bg, a: Z.muted(a) if isinstance(a, str) else Z.muted(*a),
    'fecho':     lambda bg, a: Z.fecho(a),
    'mapgrid':   lambda bg, a: Z.mapgrid(a[0], bg, a[1]),     # [[itens], colunas]
    'pair':      lambda bg, a: Z.pair(a[0], a[1], a[2], a[3], bg),  # [rotulo ✗, texto ✗, rotulo ✓, texto ✓]
    'signals':   lambda bg, a: Z.signals(a[0], bg, a[1]),     # [[[titulo, desc],...], numero_inicial]
    'checklist': lambda bg, a: Z.checklist(a, bg),            # [itens]
    'rules':     lambda bg, a: Z.rules(a[0], bg, a[1]),       # [[[titulo, desc],...], numero_inicial]
    'plaque':    lambda bg, a: Z.plaque(a, bg),               # "texto"
    'kpi':       lambda bg, a: Z.kpi_panel(bg),               # painel de exemplo do site (dados fictícios)
    'table':     lambda bg, a: Z.table(a['cols'], a['widths'], a['rows'], bg, set(a.get('blur', [])), a['caption']),
    'verdicts':  lambda bg, a: Z.verdicts([tuple(x) for x in a], bg),  # [[rotulo, veredito, true/false],...]
    'formula':   lambda bg, a: Z.formula(a, bg),
    'caption':   lambda bg, a: f'    <div style="font-size: 32px; color: #93ADAA">{a}</div>',
    'phone':     lambda bg, a: Z.phone(_img(a['src']), a['notes'], bg, a.get('width', 330)),  # print real (caminho relativo à branch)
    'sites':     lambda bg, a: Z.sites([dict(x, src=_img(x['src'])) for x in a['items']], bg, a.get('width', 270)),  # prints lado a lado com endereço
}


def build_html(spec):
    t = spec['title']
    out = []
    for pos, s in enumerate(spec['slides'], 1):
        kind = s['type']
        if kind == 'capa':
            out.append(Z.capa(f'{t} · Capa', s['label'], s['h1'], s['size'], s['p'], s['foot']))
        elif kind == 'content':
            bg = BGS[pos - 1]
            parts = []
            for part in s['parts']:
                (name, arg), = part.items()
                parts.append(DEVICES[name](bg, arg))
            out.append(Z.content(f'{t} · {pos:02d}', pos, parts))
        elif kind == 'virada':
            out.append(Z.virada(f'{t} · 06', s['m'], s['big'], s['size']))
        elif kind == 'cta':
            out.append(Z.cta(f'{t} · 07', s['h2'], s['size'], s['p']))
        else:
            raise SystemExit(f'tipo de slide desconhecido: {kind}')
    if len(out) != 7:
        raise SystemExit(f'o carrossel precisa de 7 slides (tem {len(out)})')
    return out


CSS = f"""
@font-face{{font-family:'Sofia Sans Extra Condensed';font-weight:800;src:url('file://{FONTS}/sofia-sans-extra-condensed-800-latin.woff2') format('woff2')}}
@font-face{{font-family:'Archivo';font-weight:100 900;font-style:normal;src:url('file://{FONTS}/archivo-var-latin.woff2') format('woff2')}}
body{{margin:0}}
"""

CHECK_JS = '''() => {
  const root = document.body.firstElementChild; const k = root.children;
  const r = x => x.getBoundingClientRect();
  const probs = [];
  const logo = r(k[0]), mid = r(k[1]), foot = r(k[2]);
  if (mid.top < logo.bottom + 16) probs.push('conteudo encostando no logo');
  if (foot.top < mid.bottom + 16) probs.push('conteudo encostando no rodape');
  for (const e of root.querySelectorAll('*')) {
    const b = r(e);
    if (b.width > 0 && b.right > 1000) probs.push(`passa da margem direita: "${(e.textContent||'').trim().slice(0,40)}"`);
    if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow === 'visible' && (/^(H1|H2|P)$/.test(e.tagName) || (e.tagName === 'DIV' && e.children.length === 0)))
      probs.push(`texto maior que a caixa: "${(e.textContent||'').trim().slice(0,40)}"`);
  }
  return [...new Set(probs)];
}'''


def render(htmls, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    tmp = outdir / '.html'; tmp.mkdir(exist_ok=True)
    problems, imgs = {}, []
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1080, 'height': 1350})
        for i, src in enumerate(htmls, 1):
            body = re.search(r'<x-dc>(.*)</x-dc>', src, re.S).group(1)
            body = re.sub(r'<helmet>.*?</helmet>', '', body, flags=re.S).replace('{{accent}}', '#00CBCC')
            f = tmp / f'{i:02d}.html'
            f.write_text(f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>', encoding='utf-8')
            pg.goto(f'file://{f}'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(250)
            pr = pg.evaluate(CHECK_JS)
            if pr: problems[i] = pr
            png = tmp / f'{i:02d}.png'
            pg.screenshot(path=str(png), clip={'x': 0, 'y': 0, 'width': 1080, 'height': 1350})
            im = Image.open(png).convert('RGB'); imgs.append(im)
            im.save(outdir / f'{i:02d}.jpg', 'JPEG', quality=92, optimize=True)
        b.close()
    for x in tmp.iterdir(): x.unlink()
    tmp.rmdir()
    return imgs, problems


def sheet(imgs, path):
    w, h = 360, 450
    s = Image.new('RGB', (7 * (w + 10) + 10, h + 20), (40, 40, 40))
    for k, im in enumerate(imgs):
        s.paste(im.resize((w, h), Image.LANCZOS), (10 + k * (w + 10), 10))
    path.parent.mkdir(parents=True, exist_ok=True)
    s.save(path)


def write_canvas(htmls, spec, d):
    d = pathlib.Path(d) / 'project'; d.mkdir(parents=True, exist_ok=True)
    names = ['Main.dc.html'] + [f's-{i:02d}.dc.html' for i in range(2, 8)]
    boards = {n: {"x": i * 1160, "y": 0, "w": 1080, "h": 1350, "title": f'{i+1:02d}'} for i, n in enumerate(names)}
    for n, h in zip(names, htmls):
        (d / n).write_text(h, encoding='utf-8')
    c = {"v": 3, "createdOnFiles": {"v": 1, "at": "2026-01-01T00:00:00Z"}, "title": spec['title'],
         "launch": {"view": "canvas"}, "pages": [], "boards": boards, "order": names, "notes": {}, "designSystems": []}
    (d / 'canvas.json').write_text(json.dumps(c, ensure_ascii=False), encoding='utf-8')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('spec'); ap.add_argument('--canvas')
    a = ap.parse_args()
    spec_path = pathlib.Path(a.spec)
    spec = json.loads(spec_path.read_text(encoding='utf-8'))
    name = spec_path.stem                      # ex.: 16-meu-tema
    htmls = build_html(spec)
    imgs, problems = render(htmls, ROOT / 'posts' / name)
    sheet(imgs, ROOT / 'review' / f'{name}.png')
    if a.canvas:
        write_canvas(htmls, spec, a.canvas)
    if problems:
        print('PROBLEMAS DE LAYOUT (diminua o "size" do título ou encurte o texto):')
        for i, pr in problems.items():
            for x in pr: print(f'  slide {i:02d}: {x}')
        sys.exit(2)
    print(f'ok: posts/{name}/01..07.jpg e review/{name}.png')
