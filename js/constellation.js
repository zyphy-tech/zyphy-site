/* ==========================================================================
   Zyphy — constelação de partículas 3D reutilizável (hero + contato).
   Módulo "puro": recebe um <canvas> já no DOM e devolve controles de
   start/stop/resize. Quem chama decide QUANDO chamar start()/stop()
   (visibilidade na viewport, pausa por scroll etc.) — este módulo só cuida
   da cena em si (partículas, linhas de conexão, repulsão pelo mouse).
   ========================================================================== */

export async function createConstellation(canvas, options = {}) {
  const THREE = await import("three");

  const rootStyles = getComputedStyle(document.documentElement);
  const cssVar = (name) => rootStyles.getPropertyValue(name).trim();
  const alpha = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Repulsão pelo mouse só em dispositivos com hover de verdade — em touch,
  // arrastar o dedo pra rolar a página não deve "empurrar" as partículas.
  const canRepel = !reduce && window.matchMedia("(hover: hover)").matches;

  const holder = canvas.parentElement;
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || window.innerWidth < 860;

  const accent = options.color || cssVar("--accent");
  const bg = options.bg || cssVar("--bg");
  const count = options.count != null ? options.count : (weak ? 90 : 170);
  const maxLines = options.maxLines != null ? options.maxLines : (weak ? 450 : 900);
  const spread = options.spread || { x: 36, y: 20, z: 12 };
  const dotSize = options.dotSize != null ? options.dotSize : 0.34;
  const dotOpacity = options.opacity != null ? options.opacity : 0.9;
  const lineOpacity = options.lineOpacity != null ? options.lineOpacity : 0.2;
  const linkDist = options.linkDist || 3.6;
  const repel = options.repel != null ? options.repel : 3.0;
  const repelR = options.repelR || 5.0;
  const fogDensity = options.fogDensity != null ? options.fogDensity : 0.026;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !weak, alpha: true });
  renderer.setPixelRatio(weak ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(new THREE.Color(bg), fogDensity);

  const camera = new THREE.PerspectiveCamera(options.cameraFov || 50, 1, 0.1, 100);
  camera.position.set(0, 0, options.cameraZ || 16);

  const particles = [];
  for (let i = 0; i < count; i++) {
    const p = {
      x: (Math.random() - 0.5) * spread.x,
      y: (Math.random() - 0.5) * spread.y,
      z: (Math.random() - 0.5) * spread.z,
      vx: 0, vy: 0, vz: 0,
      phase: Math.random() * Math.PI * 2
    };
    p.hx = p.x; p.hy = p.y; p.hz = p.z;
    particles.push(p);
  }

  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(count * 3);
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

  function makeDotTexture(color) {
    const dot = document.createElement("canvas");
    dot.width = dot.height = 64;
    const dctx = dot.getContext("2d");
    const grad = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, alpha(color, 1));
    grad.addColorStop(0.4, alpha(color, 0.8));
    grad.addColorStop(1, alpha(color, 0));
    dctx.fillStyle = grad;
    dctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(dot);
  }

  const pMat = new THREE.PointsMaterial({
    size: dotSize, map: makeDotTexture(accent),
    transparent: true, opacity: dotOpacity, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  const lGeo = new THREE.BufferGeometry();
  const lPos = new Float32Array(maxLines * 6);
  const lCol = new Float32Array(maxLines * 6);
  lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
  lGeo.setAttribute("color", new THREE.BufferAttribute(lCol, 3));
  const lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(lines);

  const CYAN = new THREE.Color(accent);

  /* ---------- mouse (parallax + repulsão em mola) ---------- */
  let mouseX = 0, mouseY = 0;
  const mouse3 = new THREE.Vector3(999, 999, 0);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  function updateMouse(cx, cy) {
    mouseX = (cx / window.innerWidth) * 2 - 1;
    mouseY = -(cy / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    raycaster.ray.intersectPlane(plane, mouse3);
  }
  if (canRepel) {
    window.addEventListener("mousemove", (e) => updateMouse(e.clientX, e.clientY), { passive: true });
    window.addEventListener("mouseleave", () => mouse3.set(999, 999, 0));
  }

  function resize() {
    const w = holder.clientWidth, h = holder.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reduce) renderOnce();
  }

  const clock = new THREE.Clock();
  let raf = 0, running = false;
  const ld2 = linkDist * linkDist;
  const rr = repelR * repelR;

  function stepParticles(dt, t) {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.hx += Math.sin(t * 0.3 + p.phase) * 0.002;
      p.hy += Math.cos(t * 0.25 + p.phase) * 0.002;
      p.vx += (p.hx - p.x) * 0.012;
      p.vy += (p.hy - p.y) * 0.012;
      p.vz += (p.hz - p.z) * 0.012;

      if (canRepel) {
        const dx = p.x - mouse3.x, dy = p.y - mouse3.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const f = (1 - d / repelR) * repel;
          p.vx += (dx / d) * f * dt;
          p.vy += (dy / d) * f * dt;
        }
      }
      p.vx *= 0.94; p.vy *= 0.94; p.vz *= 0.94;
      p.x += p.vx; p.y += p.vy; p.z += p.vz;
    }
  }

  function syncGeometry() {
    const n = particles.length;
    for (let i = 0; i < n; i++) {
      const p = particles[i];
      pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z;
    }
    pGeo.attributes.position.needsUpdate = true;

    let li = 0;
    for (let i = 0; i < n && li < maxLines; i++) {
      const a = particles[i];
      for (let j = i + 1; j < n && li < maxLines; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < ld2) {
          const lineAlpha = 1 - d2 / ld2;
          let boost = 0;
          if (canRepel) {
            const mx = (a.x + b.x) / 2 - mouse3.x, my = (a.y + b.y) / 2 - mouse3.y;
            const md2 = mx * mx + my * my;
            boost = md2 < 25 ? (1 - Math.sqrt(md2) / 5) * 0.9 : 0;
          }
          const op = Math.min(1, lineAlpha * lineOpacity + boost * lineAlpha);
          lPos[li * 6] = a.x; lPos[li * 6 + 1] = a.y; lPos[li * 6 + 2] = a.z;
          lPos[li * 6 + 3] = b.x; lPos[li * 6 + 4] = b.y; lPos[li * 6 + 5] = b.z;
          for (let k = 0; k < 2; k++) {
            lCol[li * 6 + k * 3] = CYAN.r * op; lCol[li * 6 + k * 3 + 1] = CYAN.g * op; lCol[li * 6 + k * 3 + 2] = CYAN.b * op;
          }
          li++;
        }
      }
    }
    lGeo.attributes.position.needsUpdate = true;
    lGeo.attributes.color.needsUpdate = true;
    lGeo.setDrawRange(0, li * 2);
  }

  function tick() {
    const t = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta(), 0.05) || 0.016;

    stepParticles(dt, t);
    syncGeometry();

    if (canRepel) {
      camera.position.x += (mouseX * 1.3 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(tick);
  }

  function renderOnce() {
    syncGeometry();
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function start() { if (!running && !reduce) { running = true; clock.start(); raf = requestAnimationFrame(tick); } }
  function stop() { running = false; cancelAnimationFrame(raf); clock.stop(); }

  // Troca de tema: as cores são lidas uma vez na criação da cena, então
  // precisam ser relidas e reaplicadas manualmente (textura do ponto, fog,
  // cor das linhas) quando o usuário troca claro/escuro com a cena já viva.
  function updateColors() {
    const newAccent = cssVar("--accent");
    const newBg = cssVar("--bg");
    const oldMap = pMat.map;
    pMat.map = makeDotTexture(newAccent);
    pMat.needsUpdate = true;
    oldMap.dispose();
    scene.fog.color.set(newBg);
    CYAN.set(newAccent);
    if (!running) renderOnce();
  }

  resize();
  new ResizeObserver(resize).observe(holder);

  if (reduce) {
    // estático: partículas nas posições de origem, sem loop, sem repulsão.
    renderOnce();
  } else {
    syncGeometry();
  }

  return { start, stop, resize, updateColors };
}
