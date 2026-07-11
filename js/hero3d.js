/* ==========================================================================
   Zyphy — cena 3D do hero (constelação de partículas interativa). A cena em
   si mora em js/constellation.js (compartilhada com o canvas de fundo da
   seção de contato); este arquivo só cuida do boot lazy e da pausa por
   scroll específicas do hero. Three.js é importado DINAMICAMENTE só depois
   do load da página E quando o hero entra na viewport; o loop pausa por
   completo quando o hero sai da tela.
   ========================================================================== */

import { createConstellation } from "./constellation.js";

const section = document.getElementById("topo");
const canvas = document.getElementById("zyHero3D");
const holder = canvas ? canvas.parentElement : null; // .hero-3d

/* ---------- fallback sem WebGL: esconde o canvas (sobra o gradiente do hero) ---------- */
function showFallback() {
  if (canvas) canvas.hidden = true;
}

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) { return false; }
}

/* ---------- gate de inicialização: load + .hero-3d visível + idle ----------
   Boot só quando (a) o load da página já passou, (b) o CONTAINER da cena
   entrou na viewport (no mobile ele fica abaixo da dobra — o custo de parse
   do three.js só é pago se o usuário rolar até lá) e (c) o main thread está
   ocioso (requestIdleCallback), para nunca competir com o carregamento. */
let booted = false;
let visible = false;
let holderSeen = false;
let loaded = document.readyState === "complete";
let onVisibilityChange = null; // definido após o boot (pausa/retoma o loop)

const whenIdle = (fn) =>
  ("requestIdleCallback" in window) ? window.requestIdleCallback(fn, { timeout: 2500 })
                                    : requestAnimationFrame(fn);

function maybeBoot() {
  if (!booted && loaded && holderSeen) { booted = true; whenIdle(boot); }
}

if (section && canvas && holder) {
  // Pausa/retomada: os painéis do site são sticky (top:0), então o hero NUNCA
  // sai geometricamente da viewport — os painéis seguintes deslizam por cima.
  // IntersectionObserver não enxerga oclusão; "hero visível" = ainda não
  // coberto, ou seja, scrollY menor que a altura do hero (1º painel do fluxo).
  const updateVisible = () => {
    const v = window.scrollY < section.offsetHeight;
    if (v !== visible) {
      visible = v;
      if (onVisibilityChange) onVisibilityChange(visible);
    }
  };
  window.addEventListener("scroll", updateVisible, { passive: true });
  window.addEventListener("resize", updateVisible, { passive: true });
  updateVisible();

  // Primeira aparição do container (para o boot, oclusão não importa).
  const bootIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { holderSeen = true; bootIO.disconnect(); maybeBoot(); }
    });
  }, { threshold: 0.15 });
  bootIO.observe(holder);

  if (!loaded) window.addEventListener("load", () => { loaded = true; maybeBoot(); }, { once: true });
}

async function boot() {
  if (!webglOK()) { showFallback(); return; }
  let scene;
  try { scene = await createConstellation(canvas); } catch (e) { showFallback(); return; }

  // O próprio módulo já cuida de prefers-reduced-motion (render estático,
  // sem loop) — só liga o start/stop condicionado à visibilidade se ele
  // realmente tem um loop rodando.
  scene.start();
  onVisibilityChange = (vis) => { vis ? scene.start() : scene.stop(); };
  document.addEventListener("visibilitychange", () => {
    document.hidden ? scene.stop() : (visible && scene.start());
  });
}
