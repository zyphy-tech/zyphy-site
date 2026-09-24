/* ==========================================================================
   Zyphy — comportamento do site (vanilla, scroll nativo): header, menu e
   formulário. A animação do hero mora em js/hero-flow.js.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;

  /* ---------- header: borda ao rolar ---------- */
  function initHeader() {
    var header = doc.getElementById("zyHeader");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- menu móvel ---------- */
  function initMenu() {
    var burger = doc.getElementById("zyBurger");
    var menu = doc.getElementById("zyMobileMenu");
    if (!burger || !menu) return;
    function setOpen(open) {
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    burger.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.querySelectorAll("[data-close-menu]").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); burger.focus(); }
    });
    doc.addEventListener("click", function (e) {
      if (!menu.hidden && !menu.contains(e.target) && !burger.contains(e.target)) setOpen(false);
    });
  }

  /* ---------- formulário → WhatsApp ---------- */
  function initForm() {
    var form = doc.getElementById("zyForm");
    var status = doc.getElementById("zyStatus");
    if (!form) return;
    function setStatus(isError, msg) {
      if (!status) return;
      status.classList.toggle("form-status--error", isError);
      // erro precisa interromper o leitor de tela (assertive); sucesso pode esperar a fila
      status.setAttribute("role", isError ? "alert" : "status");
      status.setAttribute("aria-live", isError ? "assertive" : "polite");
      status.textContent = msg;
    }
    function markInvalid(field, invalid) {
      if (!field) return;
      field.classList.toggle("form-input--invalid", invalid);
      if (invalid) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
    // limpa o destaque assim que o usuário corrige o campo
    [form.nome, form.contato].forEach(function (field) {
      if (field) field.addEventListener("input", function () { markInvalid(field, false); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var contato = form.contato.value.trim();
      var msg = form.mensagem.value.trim();
      markInvalid(form.nome, !nome);
      markInvalid(form.contato, !contato);
      if (!nome || !contato) {
        setStatus(true, "Preencha seu nome e um e-mail ou WhatsApp para continuar.");
        (!nome ? form.nome : form.contato).focus();
        return;
      }
      var texto = encodeURIComponent(
        "Olá! Sou " + nome + " (" + contato + ")." +
        (msg ? "\n\nO que quero resolver: " + msg : "\n\nQuero começar um projeto com a Zyphy.")
      );
      window.open("https://wa.me/5511977176036?text=" + texto, "_blank", "noopener");
      setStatus(false, "Abrindo o WhatsApp com sua mensagem.");
      markInvalid(form.nome, false);
      markInvalid(form.contato, false);
      form.reset();
    });
  }

  function boot() {
    initHeader();
    initMenu();
    initForm();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
