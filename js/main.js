/* ==========================================================================
   Zyphy — comportamento do site (vanilla, scroll nativo): vídeo do hero,
   header, menu, foco nas plaquetas dos projetos e formulário. O dashboard
   mora em js/dashboard.js; o traço das Soluções é só CSS.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  /* rolagem, em px, a partir da qual o header ganha a borda de baixo */
  var HEADER_SCROLL_THRESHOLD = 8;

  /* ---------- header: borda ao rolar ---------- */
  function initHeader() {
    var header = doc.getElementById("zyHeader");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > HEADER_SCROLL_THRESHOLD); };
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

  /* ---------- projetos no desktop: foco por teclado ----------
     Com a seção fixa, a plaqueta que recebe o foco pode estar fora da tela na
     horizontal (a posição dela depende do scroll vertical). Ao focar algo
     dentro de uma plaqueta, rola a página até o ponto em que ela aparece
     inteira. Nada de trocar layout ou parar a animação: sem salto. */
  function initProjectsFocus() {
    var section = doc.getElementById("projetos");
    var track = section && section.querySelector(".projects-track");
    var rail = section && section.querySelector(".projects-rail");
    if (!track || !rail) return;
    var pinned = function () { return getComputedStyle(track).animationName !== "none"; };
    track.addEventListener("focusin", function (e) {
      if (!pinned()) return;
      var plaque = e.target.closest(".plaque");
      if (!plaque) return;
      var distance = track.offsetWidth - rail.clientWidth;          // quanto a faixa anda
      var pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      if (distance <= 0) return;
      // progresso em que a plaqueta encosta na margem esquerda, limitado a 0–1
      var p = Math.min(1, Math.max(0, (plaque.offsetLeft - pad) / distance));
      var top = section.getBoundingClientRect().top + window.scrollY;
      var run = section.offsetHeight - window.innerHeight;          // trecho em que a seção fica fixa
      window.scrollTo({ top: top + p * run });
    });
  }

  /* ---------- formulário → WhatsApp ----------
     Cada erro aparece logo abaixo do seu campo, ligado ao input por
     aria-describedby e anunciado pelo role="alert" do próprio parágrafo.
     O parágrafo de status no fim fica só para o sucesso. */
  function initForm() {
    var form = doc.getElementById("zyForm");
    var status = doc.getElementById("zyStatus");
    if (!form) return;
    var errorOf = function (field) { return doc.getElementById(field.id + "-erro"); };
    var PHONE_EXAMPLE = "(11) 91234-5678";
    function setError(field, msg) {
      var el = errorOf(field);
      field.classList.toggle("form-input--invalid", !!msg);
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
      if (!el) return;
      el.textContent = "";
      if (!msg) return;
      // o exemplo de telefone vai num span que não quebra: nem a Sofia nem a
      // Archivo têm o hífen inseparável (U+2011), então o hífen é o comum
      var parts = msg.split(PHONE_EXAMPLE);
      parts.forEach(function (txt, i) {
        el.appendChild(doc.createTextNode(txt));
        if (i < parts.length - 1) {
          var span = doc.createElement("span");
          span.className = "nowrap";
          span.textContent = PHONE_EXAMPLE;
          el.appendChild(span);
        }
      });
    }
    // limpa o erro assim que o usuário corrige o campo
    [form.nome, form.contato].forEach(function (field) {
      if (field) field.addEventListener("input", function () { setError(field, ""); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) status.textContent = "";
      var nome = form.nome.value.trim();
      var contato = form.contato.value.trim();
      var msg = form.mensagem.value.trim();
      // um campo, dois formatos: e-mail (algo@algo.algo) ou telefone com DDD
      // (10 a 13 dígitos, aceitando espaço, parênteses, traço e +55)
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato);
      var isPhone = /^\d{10,13}$/.test(contato.replace(/[\s().+-]/g, ""));
      var nomeErro = nome ? "" : "Preencha seu nome.";
      var contatoErro = !contato ? "Preencha um e-mail ou WhatsApp."
        : (!isEmail && !isPhone) ? "Digite um e-mail, como voce@email.com, ou um WhatsApp com DDD, como " + PHONE_EXAMPLE + "."
        : "";
      setError(form.nome, nomeErro);
      setError(form.contato, contatoErro);
      if (nomeErro || contatoErro) {
        (nomeErro ? form.nome : form.contato).focus();
        return;
      }
      var texto = encodeURIComponent(
        "Olá! Sou " + nome + " (" + contato + ")." +
        (msg ? "\n\nO que quero resolver: " + msg : "\n\nQuero começar um projeto com a Zyphy.")
      );
      window.open("https://wa.me/5511924507188?text=" + texto, "_blank", "noopener");
      if (status) status.textContent = "Abrindo o WhatsApp com sua mensagem.";
      form.reset();
    });
  }

  /* ---------- vídeo do hero: orquestração de entrada da página ----------
     Toca uma vez, sem som, e para no último quadro (sem loop). O texto fica
     visível desde o início (a sombra do CSS garante o contraste). Toca em
     todas as telas; fica fora só do reduced-motion (ali o <picture> já
     mostra o último quadro) e da economia de dados. Versão: recorte 4:5 no
     celular, quadro inteiro nas demais. Cada <source> leva o media, e o JS
     só põe no <video> as da largura atual: assim navegador que ignora
     media em <video> (antes do Chrome/Firefox 120) não toca a versão
     errada, e se as duas da largura falharem não cai na outra proporção.
     Girar o celular para o outro lado do corte troca a versão no mesmo
     ponto do vídeo.
     Onde toca, o <picture> mostra o PRIMEIRO quadro, que também é o poster:
     o vídeo começa de onde a imagem está, sem "voltar". Se ele não for tocar
     (economia de dados, erro, autoplay bloqueado), finalFrame() tira as
     fontes do primeiro quadro e a imagem parada volta a ser o último. */
  function initHeroVideo() {
    var media = doc.querySelector(".hero-media");
    var still = media && media.querySelector(".hero-still");
    if (!still) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    function finalFrame() {
      media.querySelectorAll("source[data-first-frame]").forEach(function (s) { s.remove(); });
    }
    var conn = navigator.connection;
    if (conn && conn.saveData) { finalFrame(); return; }

    var video = doc.createElement("video");
    video.className = "hero-video";
    video.muted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-hidden", "true");
    video.autoplay = true;
    video.setAttribute("autoplay", "");
    video.preload = "auto";
    video.poster = still.currentSrc || still.src;
    var phone = window.matchMedia("(max-width:599px)");
    var SOURCES = {
      phone: [["assets/video/hero-m.webm", "video/webm"], ["assets/video/hero-m.mp4", "video/mp4"]],
      wide: [["assets/video/hero.webm", "video/webm"], ["assets/video/hero.mp4", "video/mp4"]]
    };
    /* sem vídeo (as fontes da largura falharam ou autoplay bloqueado): ele
       sai e a imagem parada fica, já no último quadro */
    var gone = false;
    function giveUp() { if (gone) return; gone = true; video.remove(); finalFrame(); }
    function setSources() {
      var q = phone.matches ? "(max-width:599px)" : "(min-width:600px)";
      video.replaceChildren();
      SOURCES[phone.matches ? "phone" : "wide"].forEach(function (s) {
        var source = doc.createElement("source");
        source.src = s[0];
        source.type = s[1];
        source.media = q;
        video.appendChild(source);
      });
      video.lastElementChild.addEventListener("error", giveUp);
    }
    setSources();
    media.appendChild(video);
    var p = video.play();
    if (p && p.catch) p.catch(giveUp);

    /* girou o celular: troca a versão e continua do mesmo ponto (ou fica no
       último quadro, se já tinha terminado) */
    phone.addEventListener("change", function () {
      if (gone) return;
      var t = video.currentTime, ended = video.ended;
      video.poster = still.currentSrc || still.src;
      setSources();
      video.load();
      video.addEventListener("loadedmetadata", function () {
        video.currentTime = ended ? video.duration : Math.min(t, video.duration);
        if (!ended) { var q = video.play(); if (q && q.catch) q.catch(function () {}); }
      }, { once: true });
    });
  }

  function boot() {
    initHeroVideo();
    initHeader();
    initMenu();
    initProjectsFocus();
    initForm();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
