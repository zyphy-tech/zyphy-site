"""Próximas datas de post seguindo a regra da Zyphy (D-012):
1 post a cada 2 dias; 12h em dia útil, 20h no domingo; sábado nunca (passa para domingo 20h).
Uso: python3 -I tools/next_slots.py <ultima_data YYYY-MM-DD> <quantidade>
"""
import sys
from datetime import date, timedelta

def slots(last, n):
    d, out = last, []
    while len(out) < n:
        d = d + timedelta(days=2)
        if d.weekday() == 5:          # sábado -> domingo
            d = d + timedelta(days=1)
        out.append((d, '20:00' if d.weekday() == 6 else '12:00'))
    return out

if __name__ == '__main__':
    last = date.fromisoformat(sys.argv[1]); n = int(sys.argv[2])
    dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
    for d, h in slots(last, n):
        print(f'{d.isoformat()}T{h}  {dias[d.weekday()]} {d:%d/%m} {h[:2]}h')
