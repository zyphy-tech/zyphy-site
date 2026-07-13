/* ==========================================================================
   Zyphy — modo claro/escuro. O <html data-theme> inicial já foi decidido
   pelo script inline no <head> (antes do CSS, evita flash); este arquivo só
   cuida do pill de 3 estados no rodapé, da resposta ao SO em tempo real e de
   avisar o resto do site (partículas) quando o tema muda.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "zy-theme";
  var doc = document;
  var docEl = doc.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: light)");
  var switchEl = doc.getElementById("zyThemeSwitch");
  var buttons = switchEl ? Array.prototype.slice.call(switchEl.querySelectorAll(".theme-switch-btn")) : [];

  function storedMode() {
    var v = null;
    try { v = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return (v === "light" || v === "dark") ? v : "system";
  }

  function resolveEffective(mode) {
    return mode === "system" ? (media.matches ? "light" : "dark") : mode;
  }

  function syncButtons(mode) {
    buttons.forEach(function (btn) {
      var active = btn.getAttribute("data-theme-choice") === mode;
      btn.setAttribute("aria-checked", active ? "true" : "false");
      btn.setAttribute("tabindex", active ? "0" : "-1");
    });
  }

  function updateMetaThemeColor(effective) {
    var meta = doc.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var bg = getComputedStyle(docEl).getPropertyValue("--bg").trim();
    if (bg) meta.setAttribute("content", bg);
  }

  function applyTheme(mode) {
    try {
      if (mode === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {}

    var effective = resolveEffective(mode);
    docEl.setAttribute("data-theme", effective);
    updateMetaThemeColor(effective);
    syncButtons(mode);
    doc.dispatchEvent(new CustomEvent("zy:theme-change", { detail: { theme: effective } }));
  }

  /* ---------- estado inicial: sincroniza o pill com a decisão do script anti-flash ---------- */
  var initialMode = storedMode();
  syncButtons(initialMode);
  updateMetaThemeColor(resolveEffective(initialMode));

  /* ---------- clique ---------- */
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-choice"));
    });
  });

  /* ---------- teclado: radiogroup (seta move foco e seleciona, com wrap) ---------- */
  if (switchEl) {
    switchEl.addEventListener("keydown", function (ev) {
      var forward = ev.key === "ArrowRight" || ev.key === "ArrowDown";
      var backward = ev.key === "ArrowLeft" || ev.key === "ArrowUp";
      if (!forward && !backward) return;
      ev.preventDefault();
      var current = buttons.findIndex(function (b) { return b.getAttribute("aria-checked") === "true"; });
      if (current === -1) current = 0;
      var next = (current + (forward ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
      applyTheme(buttons[next].getAttribute("data-theme-choice"));
    });
  }

  /* ---------- segue o SO em tempo real quando o modo ativo é "sistema" ---------- */
  media.addEventListener("change", function () {
    if (storedMode() === "system") applyTheme("system");
  });

  /* ---------- transição suave só depois do primeiro paint (não no load) ---------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { docEl.classList.add("theme-ready"); });
  });
})();
