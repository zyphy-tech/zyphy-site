/* ==========================================================================
   Zyphy — dashboard ao vivo (brief §5.3). SVG próprio, sem biblioteca.
   3 indicadores, 1 gráfico de barras e 1 filtro de período que refiltra os
   dados de exemplo do <script id="zyDashData">.

   Movimento 3: na troca de filtro, cada barra vai da altura antiga à nova
   por document.startViewTransition (animação no CSS, ::view-transition-*).
   Ao entrar na tela o gráfico já aparece pronto, sem animar. As barras são
   <div> sobre o SVG de grade e rótulos, porque só elemento HTML ganha grupo
   próprio na transição. Os indicadores trocam direto, sem contagem animada
   (contador animado é proibido pelo brief §3).
   Com prefers-reduced-motion ou sem startViewTransition: troca direta.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.getElementById("zyDash");
  var dataEl = document.getElementById("zyDashData");
  if (!root || !dataEl || !window.SVGElement) return;

  var DATA;
  try { DATA = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var SVG_NS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var chartEl = root.querySelector("[data-chart]");
  var chartLabel = document.getElementById("zyDashChartLabel");
  var live = document.getElementById("zyDashLive");
  var buttons = root.querySelectorAll(".dash-filter-btn");
  var kpi = {
    orders: root.querySelector('[data-kpi="orders"]'),
    revenue: root.querySelector('[data-kpi="revenue"]'),
    ticket: root.querySelector('[data-kpi="ticket"]')
  };

  // rótulos do eixo x por período (dados fictícios, sem data real)
  var WEEK = ["qua", "qui", "sex", "sáb", "dom", "seg", "ter"];
  var MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var PERIOD = {
    d7: { name: "Últimos 7 dias", chart: "Faturamento por dia", label: function (i) { return WEEK[i]; } },
    d30: { name: "Últimos 30 dias", chart: "Faturamento por dia", label: function (i) { return String(i + 1); } },
    m12: { name: "Últimos 12 meses", chart: "Faturamento por mês", label: function (i) { return MONTHS[i]; } }
  };

  var fmtInt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
  var fmtCents = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var NBSP = " ";

  // valores de geometria e duração vêm de css/tokens.css; nada fixo aqui
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function tokenNum(name) { return parseFloat(token(name)); }  // px ou número puro
  var G; // geometria do gráfico, lida uma vez (tokens não mudam em runtime)
  function geometry() {
    if (G) return G;
    G = {
      top: tokenNum("--chart-pad-top"),
      bottom: tokenNum("--chart-pad-bottom"),
      left: tokenNum("--chart-pad-left"),
      tickGap: tokenNum("--chart-tick-gap"),
      labelOffset: tokenNum("--chart-label-offset"),
      labelMin: tokenNum("--chart-label-min"),
      barMin: tokenNum("--chart-bar-min"),
      fill: tokenNum("--chart-bar-fill"),
      fillDense: tokenNum("--chart-bar-fill-dense")
    };
    return G;
  }

  // escala "redonda" do eixo y: ~4 linhas de grade
  function niceScale(max) {
    var rough = max / 4;
    var mag = Math.pow(10, Math.floor(Math.log10(rough)));
    var norm = rough / mag;
    var step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    return { step: step, max: Math.ceil(max / step) * step };
  }

  function totals(rows) {
    var o = 0, r = 0;
    rows.forEach(function (row) { o += row[0]; r += row[1]; });
    return { orders: o, revenue: r, ticket: o ? r / o : 0 };
  }

  var state = { period: "d30" };

  function target(period) {
    var rows = DATA[period];
    var scale = niceScale(Math.max.apply(null, rows.map(function (r) { return r[1]; })));
    return { rows: rows, scale: scale, heights: rows.map(function (r) { return r[1] / scale.max; }) };
  }

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  // desenha o gráfico inteiro do período atual (sem animação aqui)
  function draw() {
    var t = target(state.period);
    var heights = t.heights;
    var w = chartEl.clientWidth, h = chartEl.clientHeight;
    if (!w || !h) return;
    var g = geometry();
    var pad = { top: g.top, right: 0, bottom: g.bottom, left: g.left };
    var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
    var n = heights.length;
    var slot = pw / n;
    var barW = Math.max(g.barMin, slot * (n > 20 ? g.fillDense : g.fill));
    // rótulo do eixo x a cada N barras, para não encavalar em tela estreita
    var every = Math.max(1, Math.ceil(g.labelMin / slot));
    if (state.period === "d30") every = Math.max(every, 5);

    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, width: w, height: h, focusable: "false" });
    var bars = document.createElement("div");
    bars.className = "dash-bars";

    for (var v = 0; v <= t.scale.max + 1e-6; v += t.scale.step) {
      var y = pad.top + ph - (v / t.scale.max) * ph;
      svg.appendChild(el("line", { class: "grid", x1: pad.left, x2: w, y1: y, y2: y }));
      var tick = el("text", { class: "tick", x: pad.left - g.tickGap, y: y, "text-anchor": "end", "dominant-baseline": "middle" });
      tick.textContent = fmtInt.format(v);
      svg.appendChild(tick);
    }

    for (var i = 0; i < n; i++) {
      var bh = Math.max(0, heights[i]) * ph;
      var x = pad.left + i * slot + (slot - barW) / 2;
      // nome da transição contado do fim: o 7 dias são os últimos 7 do 30
      // dias, então cada dia continua sendo a mesma barra na troca
      var bar = document.createElement("div");
      bar.className = "bar" + (i === n - 1 ? " bar--now" : "");
      bar.style.left = x + "px";
      bar.style.top = (pad.top + ph - bh) + "px";
      bar.style.width = barW + "px";
      bar.style.height = bh + "px";
      bar.style.viewTransitionName = "zy-bar-" + (n - 1 - i);
      bars.appendChild(bar);
      // 30 dias: dia 1 e múltiplos de 5; demais: um rótulo a cada "every"
      var showLabel = state.period === "d30" ? (i === 0 || (i + 1) % every === 0) : i % every === 0;
      if (showLabel) {
        var lx = el("text", { class: "tick", x: x + barW / 2, y: h - g.labelOffset, "text-anchor": "middle" });
        lx.textContent = PERIOD[state.period].label(i);
        svg.appendChild(lx);
      }
    }

    chartEl.replaceChildren(svg, bars);
  }

  function setKpis(period) {
    var tot = totals(DATA[period]);
    kpi.orders.textContent = fmtInt.format(tot.orders);
    kpi.revenue.textContent = "R$" + NBSP + fmtInt.format(Math.round(tot.revenue));
    kpi.ticket.textContent = "R$" + NBSP + fmtCents.format(tot.ticket);
    chartLabel.textContent = PERIOD[period].chart;
    return tot;
  }

  function announce(period, tot) {
    if (!live) return;
    live.textContent = PERIOD[period].name + ": " + fmtInt.format(tot.orders) + " pedidos, faturamento de R$ " +
      fmtInt.format(Math.round(tot.revenue)) + ", ticket médio de R$ " + fmtCents.format(tot.ticket) + ".";
  }

  function apply(period) {
    state.period = period;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.period === period ? "true" : "false"); });
    announce(period, setKpis(period));
    draw();
  }

  function select(period) {
    if (!DATA[period] || period === state.period) return;
    if (reduce.matches || !document.startViewTransition) { apply(period); return; }
    document.startViewTransition(function () { apply(period); });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { select(b.dataset.period); });
  });

  // estado inicial: pronto, sem animar
  setKpis(state.period);
  draw();

  // redesenha no tamanho novo, sem animar
  if ("ResizeObserver" in window) {
    var lastW = 0;
    new ResizeObserver(function () {
      if (chartEl.clientWidth === lastW) return;
      lastW = chartEl.clientWidth;
      draw();
    }).observe(chartEl);
  } else {
    window.addEventListener("resize", draw);
  }
})();
