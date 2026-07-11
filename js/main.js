/* ==========================================================================
   Zyphy — comportamento do site (vanilla)
   Port fiel da lógica original (Claude Design / DCLogic) para JS puro.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var docEl = doc.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Props de calibragem da intro (defaults originais do editor).
  var PROPS = {
    esperaAntesDoVoo: 1250,
    duracaoDoVoo: 900,
    tempoEstatico: 2000,
    momentoDoTremor: 0.86,
    pularIntro: false
  };

  var cleanup = [];
  var lenis = null; // instância do smooth scroll (Lenis), quando ativo

  /* ---------- smooth scroll (Lenis) ---------- */
  function initSmoothScroll() {
    if (reduce || typeof window.Lenis === "undefined") return;
    lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    var raf = function (time) {
      if (!lenis) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /* ---------- animações de entrada (GSAP + ScrollTrigger, com stagger) ---------- */
  // Marca o elemento como revelado PERMANENTEMENTE. A visibilidade final (opacity:1,
  // transform:none) passa a vir da classe .on no CSS — o clearProps remove qualquer
  // inline residual do GSAP, para o hover nunca conseguir sobrescrever a opacity.
  function settleReveal(el) {
    el.classList.add("on");
    if (window.gsap) window.gsap.set(el, { clearProps: "opacity,transform" });
    else { el.style.opacity = ""; el.style.transform = ""; }
  }

  function initReveals() {
    var els = doc.querySelectorAll(".zy-reveal");
    if (!els.length) return;

    // prefers-reduced-motion: nada de animação, tudo já visível (CSS cobre isso também).
    if (reduce) {
      els.forEach(settleReveal);
      return;
    }

    // Caminho preferido: GSAP + ScrollTrigger — fade + leve slide-up escalonado.
    if (window.gsap && window.ScrollTrigger) {
      var gsap = window.gsap;
      var ST = window.ScrollTrigger;
      gsap.registerPlugin(ST);

      // Mantém ScrollTrigger em sincronia com o smooth scroll do Lenis.
      if (lenis && lenis.on) {
        lenis.on("scroll", ST.update);
        cleanup.push(function () { if (lenis && lenis.off) lenis.off("scroll", ST.update); });
      }

      // Um trigger por elemento: roda UMA vez (once + play none none none) e nunca
      // reverte. Stagger sutil vem do data-delay (0,1,2,3) entre irmãos do mesmo bloco.
      els.forEach(function (el) {
        var delay = (parseInt(el.getAttribute("data-delay"), 10) || 0) * 0.1;
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: delay,
            overwrite: "auto",
            onComplete: function () { settleReveal(el); },
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });

      // Recalcula posições quando fontes/imagens/layout assentam. As seções de 100svh
      // e os painéis sticky mudam o cálculo do start/end do ScrollTrigger.
      var refresh = function () { ST.refresh(); };
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      cleanup.push(function () { window.removeEventListener("load", refresh); });

      // Fallback de segurança: 2s após o load, qualquer .zy-reveal ainda em opacity 0
      // é forçado a aparecer (garante que nenhum card fique preso invisível).
      var safety = function () {
        setTimeout(function () {
          els.forEach(function (el) {
            if (parseFloat(getComputedStyle(el).opacity) < 0.05) settleReveal(el);
          });
          ST.refresh();
        }, 2000);
      };
      if (doc.readyState === "complete") safety();
      else window.addEventListener("load", safety, { once: true });
      return;
    }

    // Fallback (sem GSAP): IntersectionObserver.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { settleReveal(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      els.forEach(function (el) { io.observe(el); });
      cleanup.push(function () { io.disconnect(); });
    } else {
      els.forEach(settleReveal);
    }
  }

  /* ---------- estados reativos: menu móvel ---------- */
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

  /* ---------- estados reativos: formulário → WhatsApp ---------- */
  function initForm() {
    var form = doc.getElementById("zyForm");
    var status = doc.getElementById("zyStatus");
    if (!form) return;
    function setStatus(isError, msg) {
      if (!status) return;
      status.classList.toggle("form-status--error", isError);
      status.textContent = msg;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var contato = form.contato.value.trim();
      var msg = form.mensagem.value.trim();
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
      setStatus(false, "Abrindo o WhatsApp… A Zyphy responde ainda hoje!");
      form.reset();
    });
  }

  /* ---------- malha animada (linhas interligadas) ---------- */
  function initPlexus(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, parts = [], raf = 0, running = false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var resize = function () {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(24, Math.min(70, Math.round((w * h) / 22000)));
      parts = Array.from({ length: n }, function () {
        return {
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
        };
      });
    };

    var LINK = 130;
    var tick = function () {
      ctx.clearRect(0, 0, w, h);
      for (var k = 0; k < parts.length; k++) {
        var p = parts[k];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (var i = 0; i < parts.length; i++) {
        for (var j = i + 1; j < parts.length; j++) {
          var dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y;
          var d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(0,203,204," + (0.16 * (1 - d / LINK)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(0,203,204,.45)";
      for (var m = 0; m < parts.length; m++) {
        var q = parts[m];
        ctx.beginPath(); ctx.arc(q.x, q.y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    var start = function () { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    var stop = function () { running = false; cancelAnimationFrame(raf); };

    resize();
    var ro = new ResizeObserver(resize);
    ro.observe(canvas);
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { x.isIntersecting ? start() : stop(); });
    }, { threshold: 0.05 });
    io.observe(canvas);
    cleanup.push(function () { stop(); ro.disconnect(); io.disconnect(); });
  }

  /* ---------- inicialização principal (antigo componentDidMount) ---------- */
  function init() {
    var header = doc.getElementById("zyHeader");
    var heroCard = doc.getElementById("zyHeroCard");
    var logoEl = doc.getElementById("zyLogo");
    var zEl = doc.getElementById("zyZ");
    var zInner = doc.getElementById("zyZInner");
    var restEl = doc.getElementById("zyRest");
    var heroContent = doc.getElementById("zyHeroContent");
    if (!header || !zEl || !restEl) return;

    /* ---------- malha animada ---------- */
    if (!reduce) {
      initPlexus(doc.getElementById("zyPlexusHero"));
      initPlexus(doc.getElementById("zyPlexusCta"));
    }

    /* ---------- calibragem (props ajustáveis) ---------- */
    var WAIT = PROPS.esperaAntesDoVoo;
    var FLIGHT = PROPS.duracaoDoVoo;
    var HOLD = PROPS.tempoEstatico;
    var TREMBLE_AT = PROPS.momentoDoTremor;
    var skip = PROPS.pularIntro;
    // WAIT/FLIGHT/HOLD mantidos para paridade com a calibragem original.
    void WAIT; void FLIGHT; void HOLD;

    /* ---------- intro (auto, sem depender de scroll) ---------- */
    var progress = 0, hitDone = false, restW = 0, zBig = 0, zFinal = 0;

    var computeSizes = function () {
      var cw = heroCard ? heroCard.clientWidth : window.innerWidth;
      zBig = Math.min(Math.max(cw * 0.28, 90), 190);
      zFinal = Math.min(Math.max(cw * 0.12, 44), 84); // tamanho final = igual ao "yphy"
      restEl.style.fontSize = zFinal + "px";
    };
    var measureRest = function () { restW = restEl.getBoundingClientRect().width; };

    var triggerTremble = function () {
      zInner.style.animation = "none";
      void zInner.offsetWidth;
      zInner.style.animation = "zyTremble .5s ease-out";
    };

    var revealContent = function () {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
    };

    var applyProgress = function (p) {
      p = Math.max(0, Math.min(1, p));
      progress = p;
      zEl.style.fontSize = (zBig - (zBig - zFinal) * p) + "px";
      logoEl.style.transform = "translateX(" + (restW / 2) * (1 - p) + "px)";
      var flyDist = (heroCard ? heroCard.clientWidth : window.innerWidth) * 0.7;
      restEl.style.transform = "translateX(" + flyDist * (1 - p) + "px)";
      if (p >= TREMBLE_AT && !hitDone) { hitDone = true; triggerTremble(); }
      if (p > 0.6) revealContent();
    };

    var lockScroll = function () { docEl.classList.add("intro-lock"); if (lenis) lenis.stop(); window.scrollTo(0, 0); };
    var unlock = function () { docEl.classList.remove("intro-lock"); if (lenis) lenis.start(); };
    cleanup.push(unlock);

    var initIntro = function () {
      computeSizes();
      measureRest();
      // o site já nasce formado por baixo da intro do notebook
      zEl.style.opacity = "1";
      applyProgress(1);
      var intro = doc.getElementById("zyIntro");
      if (reduce || skip) { if (intro) intro.remove(); return; }
      if (!intro) return;
      lockScroll();
      var lid = doc.getElementById("zyLid");
      var lap = doc.getElementById("zyLap");
      var boot = doc.getElementById("zyBoot");
      var bootTxt = doc.getElementById("zyBootTxt");
      var bootZ = doc.getElementById("zyBootZ");
      var T = function (fn, ms) { var t = setTimeout(fn, ms); cleanup.push(function () { clearTimeout(t); }); };
      // 1) tampa abre
      T(function () { lid.style.transform = "rotateX(0deg)"; }, 500);
      // 2) tela "boota" digitando
      var msg = "zyphy.sys // inicializando";
      T(function () {
        var i = 0;
        var tv = setInterval(function () {
          bootTxt.textContent = msg.slice(0, ++i);
          if (i >= msg.length) clearInterval(tv);
        }, 42);
        cleanup.push(function () { clearInterval(tv); });
      }, 1450);
      // 3) o Z acende na tela
      T(function () { boot.style.opacity = "0"; bootZ.style.opacity = "1"; bootZ.style.transform = "scale(1)"; }, 3050);
      // 4) mergulho para dentro da tela (zoom mirado no centro da tela do notebook)
      T(function () {
        var scr = doc.getElementById("zyScr");
        var lr = lap.getBoundingClientRect();
        var sr = scr.getBoundingClientRect();
        var cx = sr.left + sr.width / 2, cy = sr.top + sr.height / 2;
        lap.style.transformOrigin = (cx - lr.left) + "px " + (cy - lr.top) + "px";
        var scale = Math.max(window.innerWidth / sr.width, window.innerHeight / sr.height) * 1.15;
        var tx = window.innerWidth / 2 - cx, ty = window.innerHeight / 2 - cy;
        lap.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
        intro.style.transition = "opacity .5s ease .95s";
        intro.style.opacity = "0";
      }, 3750);
      T(function () { intro.remove(); unlock(); }, 5250);
    };

    var onResize = function () { computeSizes(); measureRest(); applyProgress(progress); };
    window.addEventListener("resize", onResize);
    cleanup.push(function () { window.removeEventListener("resize", onResize); });

    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(initIntro);
    else initIntro();

    /* ---------- header: sombra + barra de progresso ---------- */
    var progressBar = doc.getElementById("zyProgress");
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      header.style.borderBottomColor = scrolled ? "rgba(242,250,250,.08)" : "transparent";
      header.style.boxShadow = scrolled ? "0 12px 30px -22px rgba(0,0,0,.55)" : "none";
      if (progressBar) {
        var docH = docEl.scrollHeight - window.innerHeight;
        progressBar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanup.push(function () { window.removeEventListener("scroll", onScroll); });

    /* ---------- navegação por âncora (funciona com painéis sticky) ---------- */
    doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (ev) {
        var id = a.getAttribute("href").slice(1);
        var t = doc.getElementById(id);
        if (!t) return;
        ev.preventDefault();
        // posição de fluxo real (imune ao sticky): soma as alturas dos irmãos anteriores no <main>
        var y = 0;
        var parent = t.parentElement;
        if (parent && parent.tagName === "MAIN") {
          var mm = parent;
          while (mm) { y += mm.offsetTop; mm = mm.offsetParent; }
          for (var s = 0; s < parent.children.length; s++) {
            var sib = parent.children[s];
            if (sib === t) break;
            y += sib.offsetHeight;
          }
        } else {
          var n = t;
          while (n) { y += n.offsetTop; n = n.offsetParent; }
        }
        if (lenis) lenis.scrollTo(y);
        else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      });
    });

    /* ---------- scroll reveal ---------- */
    initReveals();

    /* ---------- palavra rotativa ---------- */
    var rotator = doc.getElementById("zyRotator");
    if (rotator && !reduce) {
      var words = ["seu site", "seu app", "sua ferramenta", "sua operação", "sua ideia", "sua presença"];
      var wi = 0;
      var iv = setInterval(function () {
        if (doc.hidden) return;
        while (rotator.children.length > 1) rotator.removeChild(rotator.firstElementChild);
        var cur = rotator.firstElementChild;
        var next = doc.createElement("span");
        next.textContent = words[(wi + 1) % words.length];
        next.style.cssText = "position:absolute;left:0;top:0;color:#00CBCC;opacity:0;transform:translateY(100%)";
        rotator.appendChild(next);
        void next.offsetWidth;
        next.style.transition = "opacity .5s ease,transform .5s ease";
        next.style.opacity = "1";
        next.style.transform = "translateY(0)";
        if (cur) {
          cur.style.transition = "opacity .5s ease,transform .5s ease";
          cur.style.opacity = "0";
          cur.style.transform = "translateY(-100%)";
          setTimeout(function () { cur.remove(); }, 550);
        }
        wi = (wi + 1) % words.length;
      }, 2500);
      cleanup.push(function () { clearInterval(iv); });
    }
  }

  /* ---------- boot ---------- */
  function boot() {
    initSmoothScroll();
    initMenu();
    initForm();
    init();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
