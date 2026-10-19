import sys, pathlib

N950, N900, N850, PET = '#050B0B', '#112222', '#1E3535', '#0E3634'
BGS = [N950, N900, N850, N950, N900, N850, PET]
SOFIA = "font-family: 'Sofia Sans Extra Condensed', sans-serif; font-weight: 800; line-height: 0.9; text-transform: uppercase"
CHECK = '<path d="M5 12.5l4.5 4.5L19 7.5"></path>'
XP = '<path d="M6 6l12 12"></path><path d="M18 6L6 18"></path>'
ARROW = '<path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path>'

def svg(paths, size, color, sw='2.6'):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none">{paths}</svg>'

def card_bg(bg):
    return {N950: N900, N900: N850, N850: N950}[bg]

def doc(title, body, petrol=False):
    link = '#E8F7F4' if petrol else '#00CBCC'
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&amp;family=Sofia+Sans+Extra+Condensed:wght@800&amp;display=swap">
<style>body{{margin:0}}a{{color:{link}}}a:hover{{color:#00E0E1}}</style>
</helmet>
{body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"accent":{{"editor":"color","default":"#00CBCC","options":["#00CBCC","#00E0E1","#E3EFED"]}},"$preview":{{"width":1080,"height":1350}}}}'>
class Component extends DCLogic {{
  renderVals() {{ return {{ accent: this.props.accent ?? '#00CBCC' }}; }}
}}
</script>
</body>
</html>
'''

def bars(active, petrol=False):
    off = '#5E8884' if petrol else '#4F7A76'
    out = []
    for i in range(1, 8):
        if i == active:
            out.append('<div style="width: 56px; height: 8px; background: {{accent}}"></div>')
        else:
            out.append(f'<div style="width: 24px; height: 8px; background: {off}"></div>')
    return '<div style="display: flex; gap: 8px; align-items: center">' + ''.join(out) + '</div>'

def frame(bg, inner, footer, petrol=False, gap=38):
    color = '#E8F7F4' if petrol else '#E3EFED'
    return f'''<div style="width: 1080px; height: 1350px; box-sizing: border-box; padding: 80px 96px 96px; background: {bg}; color: {color}; font-family: 'Archivo', sans-serif; display: flex; flex-direction: column; justify-content: space-between">
  <div style="font-size: 44px; font-weight: 800"><span style="color: {{{{accent}}}}">Z</span>yphy</div>
  <div style="display: flex; flex-direction: column; gap: {gap}px">
{inner}
  </div>
  {footer}
</div>'''

def label(t):
    return f'<div style="font-size: 30px; font-weight: 600; color: #93ADAA; text-transform: uppercase; letter-spacing: 2px">{t}</div>'

def head(lab, title, size):
    lab_html = label(lab) if lab else ''
    return f'''    <div style="display: flex; flex-direction: column; gap: 14px">
      {lab_html}
      <h2 style="margin: 0; {SOFIA}; font-size: {size}px">{title}</h2>
    </div>'''

def muted(t, size=42):
    return f'    <p style="margin: 0; font-size: {size}px; line-height: 1.35; color: #93ADAA; max-width: 880px">{t}</p>'

def fecho(t):
    return f'    <p style="margin: 0; font-size: 42px; line-height: 1.3; font-weight: 600">{t}</p>'

def mapgrid(items, bg, cols):
    cb = card_bg(bg)
    cells = ''.join(
        f'<div style="background: {cb}; padding: 28px 30px; display: flex; flex-direction: column; gap: 10px">'
        f'<div style="font-size: 30px; font-weight: 600; color: {{{{accent}}}}">{i+1:02d}</div>'
        f'<div style="font-size: 42px; font-weight: 600; line-height: 1.15">{t}</div></div>'
        for i, t in enumerate(items))
    return f'    <div style="display: grid; grid-template-columns: repeat({cols}, 1fr); gap: 16px">{cells}</div>'

def pair(xl, xt, ol, ot, bg):
    cb = card_bg(bg)
    return f'''    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
      <div style="border: 1px solid #5E8884; padding: 34px; display: flex; flex-direction: column; gap: 18px">
        {svg(XP, 44, '#93ADAA')}
        <div style="font-size: 30px; font-weight: 600; color: #93ADAA; text-transform: uppercase; letter-spacing: 2px">{xl}</div>
        <div style="font-size: 38px; line-height: 1.3; color: #93ADAA">{xt}</div>
      </div>
      <div style="background: {cb}; padding: 34px; display: flex; flex-direction: column; gap: 18px">
        {svg(CHECK, 44, '{{accent}}')}
        <div style="font-size: 30px; font-weight: 600; color: #93ADAA; text-transform: uppercase; letter-spacing: 2px">{ol}</div>
        <div style="font-size: 38px; line-height: 1.3; font-weight: 600">{ot}</div>
      </div>
    </div>'''

def signals(items, bg, start):
    cb = card_bg(bg)
    out = []
    for i, (t, d) in enumerate(items):
        out.append(f'''      <div style="background: {cb}; padding: 34px 38px; display: flex; flex-direction: column; gap: 14px">
        <div style="font-size: 30px; font-weight: 600; color: {{{{accent}}}}; text-transform: uppercase; letter-spacing: 2px">Sinal {start+i}</div>
        <div style="{SOFIA}; font-size: 76px">{t}</div>
        <div style="font-size: 38px; line-height: 1.35; color: #93ADAA">{d}</div>
      </div>''')
    return '    <div style="display: flex; flex-direction: column; gap: 18px">\n' + '\n'.join(out) + '\n    </div>'

def checklist(items, bg):
    cb = card_bg(bg)
    rows = []
    for i, t in enumerate(items):
        if i:
            rows.append('<div style="height: 1px; background: rgba(227,239,237,.12)"></div>')
        rows.append(f'<div style="display: flex; align-items: center; gap: 24px; padding: 30px 34px">{svg(CHECK, 44, "{{accent}}")}<div style="font-size: 40px; font-weight: 600; line-height: 1.25">{t}</div></div>')
    return f'    <div style="background: {cb}; display: flex; flex-direction: column">' + ''.join(rows) + '</div>'

def rules(items, bg, start):
    cb = card_bg(bg)
    out = []
    for i, (t, d) in enumerate(items):
        out.append(f'''      <div style="background: {cb}; padding: 34px 38px; display: flex; gap: 30px; align-items: flex-start">
        <div style="{SOFIA}; font-size: 96px; color: {{{{accent}}}}">{start+i:02d}</div>
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div style="{SOFIA}; font-size: 76px">{t}</div>
          <div style="font-size: 38px; line-height: 1.35; color: #93ADAA">{d}</div>
        </div>
      </div>''')
    return '    <div style="display: flex; flex-direction: column; gap: 18px">\n' + '\n'.join(out) + '\n    </div>'

def plaque(text, bg):
    cb = card_bg(bg)
    search = '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4.2-4.2"></path>'
    return f'''    <div style="background: {cb}; border-left: 8px solid {{{{accent}}}}; padding: 40px 40px; display: flex; align-items: center; gap: 26px">
      {svg(search, 56, '#93ADAA', '2.4')}
      <div style="font-size: 54px; font-weight: 800">{text}</div>
    </div>'''

def kpi_panel(bg):
    cb = card_bg(bg)
    pills = ''.join(
        f'<div style="font-size: 30px; font-weight: 600; padding: 10px 20px; border-radius: 4px; '
        + ('background: {{accent}}; color: #050B0B' if p == 'Mês' else 'border: 1px solid #5E8884; color: #93ADAA')
        + f'">{p}</div>' for p in ['Semana', 'Mês', 'Ano'])
    rows = []
    for i, (k, v) in enumerate([('Pedidos', '1.542'), ('Faturamento', 'R$ 147.757'), ('Ticket médio', 'R$ 95,82')]):
        if i:
            rows.append('<div style="height: 1px; background: rgba(227,239,237,.12)"></div>')
        rows.append(f'<div style="display: flex; align-items: baseline; justify-content: space-between; padding: 14px 0"><div style="font-size: 36px; color: #93ADAA">{k}</div><div style="font-family: \'Sofia Sans Extra Condensed\', sans-serif; font-weight: 800; font-size: 92px; line-height: 0.9">{v}</div></div>')
    heights = [38, 52, 44, 60, 56, 70, 64, 78, 72, 88, 82, 100]
    cbars = ''.join(
        f'<div style="flex: 1; height: {h}%; background: ' + ('{{accent}}' if j == len(heights) - 1 else '#4F7A76') + '"></div>'
        for j, h in enumerate(heights))
    return f'''    <div style="background: {cb}; padding: 36px 40px; display: flex; flex-direction: column; gap: 18px">
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div style="font-size: 36px; font-weight: 600">Painel de vendas</div>
        <div style="display: flex; gap: 10px">{pills}</div>
      </div>
      <div style="display: flex; flex-direction: column">{''.join(rows)}</div>
      <div style="display: flex; align-items: flex-end; gap: 10px; height: 120px">{cbars}</div>
    </div>'''

def capa(title, lab, h1, size, p, foot):
    inner = f'''    {label(lab)}
    <h1 style="margin: 0; {SOFIA.replace('line-height: 0.9', 'line-height: 0.86')}; font-size: {size}px">{h1}</h1>
    <p style="margin: 0; font-size: 48px; line-height: 1.3; max-width: 860px">{p}</p>'''
    footer = f'''<div style="display: flex; flex-direction: column; gap: 28px; max-width: 780px">
    <div style="height: 1px; background: rgba(227,239,237,.12)"></div>
    <div style="font-size: 36px; color: #93ADAA">{foot}</div>
    <div style="display: flex; align-items: center; gap: 28px">
      {bars(1)}
      <div style="display: flex; align-items: center; gap: 12px; font-size: 36px; font-weight: 600; color: {{{{accent}}}}">Arraste{svg(ARROW, 44, 'currentColor', '2.2')}</div>
    </div>
  </div>'''
    return doc(title, frame(N950, inner, footer, gap=36))

def content(title, pos, parts):
    return doc(title, frame(BGS[pos - 1], '\n'.join(parts), bars(pos)))

def virada(title, m, big, size):
    inner = f'''    <p style="margin: 0; font-size: 52px; line-height: 1.3; color: #93ADAA; max-width: 860px">{m}</p>
    <h2 style="margin: 0; {SOFIA.replace('line-height: 0.9', 'line-height: 0.88')}; font-size: {size}px">{big}</h2>'''
    return doc(title, frame(N850, inner, bars(6), gap=44))

def cta(title, h2, size, p):
    inner = f'''    <h2 style="margin: 0; {SOFIA.replace('line-height: 0.9', 'line-height: 0.88')}; font-size: {size}px">{h2}</h2>
    <p style="margin: 0; font-size: 44px; line-height: 1.4; max-width: 860px">{p}</p>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px 40px; border-radius: 4px; background: {{{{accent}}}}; color: #050B0B; max-width: 820px">
      <div style="font-size: 46px; font-weight: 800">Diagnóstico grátis em 1 dia</div>
      {svg(ARROW, 52, 'currentColor', '2.4')}
    </div>'''
    footer = f'''<div style="display: flex; flex-direction: column; gap: 22px; max-width: 800px">
    <div style="font-size: 36px; line-height: 1.4">Resposta no mesmo dia, até no fim de semana.</div>
    <div style="display: flex; align-items: center; gap: 28px">
      {bars(7, petrol=True)}
      <div style="font-size: 36px; font-weight: 600">@zyphytech</div>
    </div>
  </div>'''
    return doc(title, frame(PET, inner, footer, petrol=True, gap=40), petrol=True)


import json
def write_leva(out, title, pages, F, date):
    """pages: list of (id, name, note). F keys like 'dom-01'. First page's 01 becomes Main.dc.html."""
    out = pathlib.Path(out); out.mkdir(parents=True, exist_ok=True)
    first = pages[0][0] + '-01'
    boards, order, notes = {}, [], {}
    for pid, name, note in pages:
        for i in range(1, 8):
            key = f'{pid}-{i:02d}'
            fn = 'Main.dc.html' if key == first else f'{key}.dc.html'
            t = '01 · Capa' if i == 1 else '06 · Virada' if i == 6 else '07 · Fechamento' if i == 7 else f'{i:02d}'
            boards[fn] = {"x": (i-1)*1160, "y": 0, "w": 1080, "h": 1350, "title": t, "page": pid}
            order.append(fn)
            (out / fn).write_text(F[key], encoding='utf-8')
        notes['t-'+pid] = {"x": 0, "y": -300, "text": note, "kind": "title1", "maxW": 8040, "page": pid}
    c = {"v": 3, "createdOnFiles": {"v": 1, "at": date}, "title": title, "launch": {"view": "canvas", "page": pages[0][0]},
         "pages": [{"id": p, "name": n} for p, n, _ in pages], "boards": boards, "order": order, "notes": notes, "designSystems": []}
    (out / 'canvas.json').write_text(json.dumps(c, ensure_ascii=False), encoding='utf-8')
    return order


# --- dispositivos extras ---
def table(cols, widths, rows, bg, blur_cols, caption):
    cb = card_bg(bg)
    tmpl = ' '.join(widths)
    hdr = ''.join(f'<div style="font-size: 30px; font-weight: 600; color: #93ADAA; text-transform: uppercase; letter-spacing: 1px">{c}</div>' for c in cols)
    out = [f'<div style="display: grid; grid-template-columns: {tmpl}; gap: 18px; padding: 22px 30px">{hdr}</div>']
    for r in rows:
        cells = ''.join(
            f'<div style="font-size: 32px; line-height: 1.25; white-space: nowrap; overflow: hidden' + ('; filter: blur(7px)' if j in blur_cols else '') + f'">{v}</div>'
            for j, v in enumerate(r))
        out.append('<div style="height: 1px; background: rgba(227,239,237,.12)"></div>')
        out.append(f'<div style="display: grid; grid-template-columns: {tmpl}; gap: 18px; padding: 22px 30px">{cells}</div>')
    return (f'    <div style="display: flex; flex-direction: column; gap: 14px">'
            f'<div style="background: {cb}; display: flex; flex-direction: column">' + ''.join(out) + '</div>'
            f'<div style="font-size: 32px; color: #93ADAA">{caption}</div></div>')

def verdicts(items, bg):
    cb = card_bg(bg)
    rows = []
    for i, (lab, v, ok) in enumerate(items):
        if i:
            rows.append('<div style="height: 1px; background: rgba(227,239,237,.12)"></div>')
        icon = svg(CHECK, 36, '{{accent}}') if ok else svg(XP, 36, '#93ADAA')
        vc = '#E3EFED' if ok else '#93ADAA'
        rows.append(f'<div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 28px 34px">'
                    f'<div style="font-size: 40px; font-weight: 600">{lab}</div>'
                    f'<div style="display: flex; align-items: center; gap: 12px; font-size: 36px; color: {vc}">{icon}{v}</div></div>')
    return f'    <div style="background: {cb}; display: flex; flex-direction: column">' + ''.join(rows) + '</div>'

def formula(text, bg):
    cb = card_bg(bg)
    return (f'    <div style="background: {cb}; border-top: 8px solid {{{{accent}}}}; padding: 40px 40px 44px">'
            f'<div style="{SOFIA}; font-size: 120px">{text}</div></div>')



def phone(src, notes, bg, width=330):
    """Print real de tela dentro de uma moldura de celular, com notas numeradas ao lado."""
    cb = card_bg(bg)
    items = ''.join(
        f'<div style="display: flex; flex-direction: column; gap: 8px">'
        f'<div style="font-size: 30px; font-weight: 600; color: {{{{accent}}}}">{i+1:02d}</div>'
        f'<div style="font-size: 38px; line-height: 1.25; font-weight: 600">{t}</div></div>'
        for i, t in enumerate(notes))
    return (f'    <div style="display: flex; gap: 44px; align-items: center">'
            f'<div style="width: {width}px; flex: none; border: 12px solid {cb}; border-radius: 44px; overflow: hidden; background: #000">'
            f'<img src="{src}" alt="" style="width: 100%; display: block"></div>'
            f'<div style="display: flex; flex-direction: column; gap: 30px">{items}</div></div>')


def sites(items, bg, width=270):
    """Dois prints reais de site lado a lado, cada um com nome e endereço embaixo, pra pessoa visitar."""
    cb = card_bg(bg)
    cols = ''.join(
        f'<div style="display: flex; flex-direction: column; align-items: center; gap: 18px; width: 420px">'
        f'<div style="width: {width}px; border: 12px solid {cb}; border-radius: 40px; overflow: hidden; background: #000">'
        f'<img src="{it["src"]}" alt="" style="width: 100%; display: block"></div>'
        f'<div style="font-size: 26px; font-weight: 600; color: #93ADAA; text-transform: uppercase; letter-spacing: 0.06em">{it["name"]}</div>'
        f'<div style="font-size: 34px; font-weight: 700; color: {{{{accent}}}}">{it["url"]}</div></div>'
        for it in items)
    return f'    <div style="display: flex; gap: 40px; justify-content: center">{cols}</div>'
