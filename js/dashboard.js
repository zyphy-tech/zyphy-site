/* ==========================================================================
   Zyphy — dashboard ao vivo (brief §5.3). SVG próprio, sem biblioteca.
   3 indicadores, 1 gráfico de barras e 1 filtro de período que refiltra os
   dados de exemplo do <script id="zyDashData">.

   Movimento 3 (dado que muda de valor): as barras fazem tween da altura
   antiga para a nova quando o filtro muda, e "ligam" uma vez a partir de zero
   na primeira vez que o dashboard aparece. Esse "ligar" tem gatilho próprio
   (gráfico 60% visível) e espera a banda do dashboard terminar de expandir
   (movimento 2, evento zy:band-expanded do js/main.js): os dois movimentos
   nunca começam juntos. Os indicadores trocam direto, sem
   contagem animada (contador animado é proibido pelo brief §3).
   Com prefers-reduced-motion: estado final direto, sempre.
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
  function tokenMs(name) {
    var v = token(name), n = parseFloat(v);
    return /ms$/.test(v) ? n : n * 1000;
  }
  function tokenNum(name) { return parseFloat(token(name)); }  // px ou número puro
  var DURATION = tokenMs("--dur-data");
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

  var state = {
    period: "d30",
    shown: [],   // alturas normalizadas (0–1) desenhadas agora
    raf: 0,
    revealed: false
  };

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

  // desenha o gráfico inteiro com as alturas dadas (sem animação aqui)
  function draw(heights) {
    var t = target(state.period);
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
      svg.appendChild(el("rect", {
        class: "bar" + (i === n - 1 ? " bar--now" : ""),
        x: x, y: pad.top + ph - bh, width: barW, height: bh
      }));
      // 30 dias: dia 1 e múltiplos de 5; demais: um rótulo a cada "every"
      var showLabel = state.period === "d30" ? (i === 0 || (i + 1) % every === 0) : i % every === 0;
      if (showLabel) {
        var lx = el("text", { class: "tick", x: x + barW / 2, y: h - g.labelOffset, "text-anchor": "middle" });
        lx.textContent = PERIOD[state.period].label(i);
        svg.appendChild(lx);
      }
    }

    chartEl.replaceChildren(svg);
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

  // tween das alturas: da forma atual para a nova, índice a índice
  function animateTo(heights) {
    cancelAnimationFrame(state.raf);
    if (reduce.matches) { state.shown = heights.slice(); draw(state.shown); return; }
    var from = heights.map(function (_, i) { return state.shown[i] || 0; });
    var start = performance.now();
    var ease = function (p) { return 1 - Math.pow(1 - p, 3); };
    function frame(now) {
      var p = Math.min(1, (now - start) / DURATION);
      var e = ease(p);
      state.shown = heights.map(function (hgt, i) { return from[i] + (hgt - from[i]) * e; });
      draw(state.shown);
      if (p < 1) state.raf = requestAnimationFrame(frame);
    }
    state.raf = requestAnimationFrame(frame);
  }

  function select(period) {
    if (!DATA[period]) return;
    state.period = period;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.period === period ? "true" : "false"); });
    var tot = setKpis(period);
    announce(period, tot);
    var heights = target(period).heights;
    if (state.revealed) animateTo(heights);
    else { state.shown = heights.map(function () { return 0; }); draw(state.shown); }
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { select(b.dataset.period); });
  });

  // estado inicial
  setKpis(state.period);
  var initial = target(state.period).heights;
  if (reduce.matches || !("IntersectionObserver" in window)) {
    state.revealed = true;
    state.shown = initial.slice();
    draw(state.shown);
  } else {
    state.shown = initial.map(function () { return 0; });
    draw(state.shown);
    // "liga" uma vez: precisa do gráfico visível (gatilho próprio, 60%) E da
    // banda já expandida. Se o usuário clicar num filtro antes, liga ali mesmo.
    var band = root.closest(".band--expand");
    var seen = false;
    var bandDone = !band || band.dataset.expanded === "true";
    var reveal = function () {
      if (state.revealed || !seen || !bandDone) return;
      state.revealed = true;
      animateTo(target(state.period).heights);
    };
    if (band && !bandDone) {
      band.addEventListener("zy:band-expanded", function () { bandDone = true; reveal(); }, { once: true });
    }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      seen = true;
      reveal();
    }, { threshold: 0.6 });
    io.observe(chartEl);
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { if (!state.revealed) { seen = bandDone = true; reveal(); } }, { capture: true });
    });
  }

  // redesenha no tamanho novo, sem animar
  if ("ResizeObserver" in window) {
    var lastW = 0;
    new ResizeObserver(function () {
      if (chartEl.clientWidth === lastW) return;
      lastW = chartEl.clientWidth;
      draw(state.shown);
    }).observe(chartEl);
  } else {
    window.addEventListener("resize", function () { draw(state.shown); });
  }
})();
