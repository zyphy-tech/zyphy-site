/* ==========================================================================
   Zyphy — constelação de partículas de fundo da seção de contato (#contato).
   Mesma cena do hero (js/constellation.js), versão mais discreta (menos
   partículas, mais apagada) pra não competir com o formulário. Boot lazy +
   pausa por IntersectionObserver: ao contrário do hero, esta é a ÚLTIMA
   seção sticky da página — quando ela sai da viewport de verdade (rodapé
   sobe por cima), o próprio IntersectionObserver já detecta corretamente,
   sem precisar do truque de "scrollY vs altura do painel" usado no hero.
   ========================================================================== */

import { createConstellation } from "./constellation.js";

const canvas = document.getElementById("zyPlexusCta");
const holder = canvas ? canvas.parentElement : null; // .cta-panel

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) { return false; }
}

function showFallback() {
  if (canvas) canvas.hidden = true;
}

async function boot() {
  if (!webglOK()) { showFallback(); return; }
  let scene;
  try {
    scene = await createConstellation(canvas, {
      count: 55, maxLines: 260, opacity: 0.55, lineOpacity: 0.12, dotSize: 0.3
    });
  } catch (e) { showFallback(); return; }

  new IntersectionObserver((entries) => {
    entries.forEach((e) => { e.isIntersecting ? scene.start() : scene.stop(); });
  }, { threshold: 0.05 }).observe(holder);
}

if (canvas && holder) {
  const whenIdle = (fn) =>
    ("requestIdleCallback" in window) ? window.requestIdleCallback(fn, { timeout: 2500 })
                                      : requestAnimationFrame(fn);

  let booted = false;
  let loaded = document.readyState === "complete";
  let holderSeen = false;
  const maybeBoot = () => { if (!booted && loaded && holderSeen) { booted = true; whenIdle(boot); } };

  // Só faz o import (pesado) do three.js quando a seção realmente se
  // aproxima da viewport — a maior parte da navegação nunca rola até o
  // rodapé, então adiar isso evita gastar o import à toa.
  const bootIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { holderSeen = true; bootIO.disconnect(); maybeBoot(); }
    });
  }, { rootMargin: "600px 0px" });
  bootIO.observe(holder);

  if (!loaded) window.addEventListener("load", () => { loaded = true; maybeBoot(); }, { once: true });
}
