/* ==========================================================================
   Zyphy — hero animado: um pedido chega pelo WhatsApp (celular), entra na
   tabela de orçamentos (desktop) e a resposta volta pronta. Uma timeline só,
   em Web Animations API, só transform/opacity. Roda uma vez quando o hero
   fica visível e para no estado final; "Ver de novo" reinicia.
   O estado final é o CSS padrão; o estado "antes" vem de .flow-pending
   (posto no <head>) e, durante a timeline, do fill das próprias animações.
   ========================================================================== */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var flow = document.getElementById("zyFlow");
  var replay = document.getElementById("zyFlowReplay");
  if (!flow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!flow.animate) { docEl.classList.remove("flow-pending"); return; }
  docEl.classList.add("flow-on"); // avisa a trava de segurança do <head> que o JS assumiu

  var $ = function (sel) { return flow.querySelector(sel); };
  var el = {
    desktop: $(".flow-desktop"),
    phone: $(".flow-phone"),
    msgIn: $(".flow-msg--in"),
    row: $(".flow-row"),
    statusA: $(".flow-status-a"),
    statusB: $(".flow-status-b"),
    msgOut: $(".flow-msg--out")
  };

  var OUT = "cubic-bezier(.215,.61,.355,1)"; // power3.out
  var FADE = [{ opacity: 0 }, { opacity: 1 }];

  // timeline em ms, contada do início da entrada do texto (t=0 do CSS)
  var STEPS = [
    { t: 600,  target: el.desktop, frames: [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], dur: 600 },
    { t: 600,  target: el.phone,   frames: [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], dur: 600 },
    { t: 1200, target: el.msgIn,   frames: [{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], dur: 350 },
    { t: 1900, target: el.row,     frames: [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }], dur: 400 },
    { t: 2600, target: el.statusA, frames: [{ opacity: 1 }, { opacity: 0 }], dur: 300 },
    { t: 2600, target: el.statusB, frames: FADE, dur: 300 },
    { t: 3200, target: el.msgOut,  frames: [{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], dur: 350 }
  ];
  var END = 3800;

  var running = [];
  var endTimer = null;

  // offset: quanto da timeline já "passou"; passos anteriores a ele ficam no estado final
  function play(offset) {
    running.forEach(function (a) { a.cancel(); });
    clearTimeout(endTimer);
    running = STEPS.filter(function (s) { return s.t >= offset; }).map(function (s) {
      return s.target.animate(s.frames, {
        duration: s.dur,
        delay: s.t - offset,
        easing: OUT,
        fill: "both" // segura o estado "antes" durante o delay
      });
    });
    // as animações já seguram o estado "antes"; a classe pode sair no mesmo frame
    docEl.classList.remove("flow-pending");
    if (replay) replay.hidden = true;
    endTimer = setTimeout(function () {
      // estado final = CSS padrão: solta as animações para não ficar nada "vivo"
      running.forEach(function (a) { a.cancel(); });
      running = [];
      if (replay) replay.hidden = false;
    }, Math.max(0, END - offset) + 50);
  }

  // primeira vez: sincroniza com a entrada do texto (CSS começou no primeiro paint);
  // se o hero só ficou visível bem depois, começa direto pelos devices
  function firstOffset() {
    var fcp = performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0];
    var lag = fcp ? performance.now() - fcp.startTime : 0;
    return Math.min(Math.max(lag, 0), 600);
  }

  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    play(firstOffset());
  }, { threshold: 0.35 });
  // com âncora na URL (ex.: #contato) o navegador ainda vai rolar suave até ela:
  // só começa a observar quando essa rolagem terminar
  var target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
  if (target && !flow.closest("#" + target.id)) {
    var started = false;
    var start = function () { if (!started) { started = true; io.observe(flow); } };
    window.addEventListener("scrollend", start, { once: true });
    setTimeout(start, 1500); // navegadores sem scrollend
  } else {
    io.observe(flow);
  }

  // ver de novo: os devices já estão na tela, recomeça pelas telas
  if (replay) replay.addEventListener("click", function () { play(900); });
})();
