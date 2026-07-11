/* ==========================================================================
   Zyphy — cena 3D do hero (notebook + celular), adaptação do protótipo
   zyphy-devices-3d. Three.js é importado DINAMICAMENTE só depois do load da
   página E quando o hero entra na viewport; o loop pausa por completo quando
   o hero sai da tela. Cores vêm dos tokens do design system (css/styles.css).
   ========================================================================== */

const section = document.getElementById("topo");
const canvas = document.getElementById("zyHero3D");
const holder = canvas ? canvas.parentElement : null; // .hero-3d
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- tokens do design system ---------- */
const rootStyles = getComputedStyle(document.documentElement);
const css = (name) => rootStyles.getPropertyValue(name).trim();
const alpha = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
};
const C = {
  bg: css("--bg"),
  surface: css("--surface"),
  surface2: css("--surface-2"),
  surface3: css("--surface-3"),
  text: css("--text"),
  muted: css("--text-muted"),
  accent: css("--accent"),
  onAccent: css("--on-accent")
};

/* ---------- fallback sem WebGL: esconde o canvas, mostra a imagem ---------- */
function showFallback() {
  if (!holder) return;
  if (canvas) canvas.hidden = true;
  const img = holder.querySelector(".hero-3d-fallback");
  if (img && img.dataset.src) { img.src = img.dataset.src; img.hidden = false; }
}

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) { return false; }
}

/* ---------- gate de inicialização: load da página + hero visível ---------- */
let booted = false;
let visible = false;
let loaded = document.readyState === "complete";
let onVisibilityChange = null; // definido após o boot (pausa/retoma o loop)

function maybeBoot() {
  if (!booted && loaded && visible) { booted = true; boot(); }
}

if (section && canvas) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      visible = e.isIntersecting;
      if (onVisibilityChange) onVisibilityChange(visible);
      maybeBoot();
    });
  }, { threshold: 0.05 });
  io.observe(section);
  if (!loaded) window.addEventListener("load", () => { loaded = true; maybeBoot(); }, { once: true });
}

async function boot() {
  if (!webglOK()) { showFallback(); return; }
  let THREE;
  try { THREE = await import("three"); } catch (e) { showFallback(); return; }
  try { build(THREE); } catch (e) { showFallback(); }
}

/* ==========================================================================
   Cena
   ========================================================================== */
function build(THREE) {
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || window.innerWidth < 860;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !weak, alpha: true });
  renderer.setPixelRatio(weak ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(new THREE.Color(C.bg), 0.03);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.6, 13);

  /* ---------- luzes ---------- */
  const key = new THREE.DirectionalLight(new THREE.Color(C.text), 0.7);
  key.position.set(4, 8, 8);
  scene.add(key);
  const cyanL = new THREE.PointLight(new THREE.Color(C.accent), 1.6, 30);
  cyanL.position.set(6, 2, 6);
  scene.add(cyanL);
  const fillL = new THREE.PointLight(new THREE.Color(C.surface2), 1.5, 25);
  fillL.position.set(-6, -2, 4);
  scene.add(fillL);
  scene.add(new THREE.AmbientLight(new THREE.Color(C.surface2), 1.4));

  /* ---------- materiais ---------- */
  const bodyMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.surface), metalness: 0.75, roughness: 0.35 });
  const darkMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(C.bg), metalness: 0.5, roughness: 0.5 });

  /* ---------- tela do notebook: dashboard em canvas texture ---------- */
  const lapCv = document.createElement("canvas");
  lapCv.width = 1024; lapCv.height = 640;
  const lc = lapCv.getContext("2d");
  const lapTex = new THREE.CanvasTexture(lapCv);
  lapTex.colorSpace = THREE.SRGBColorSpace;

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawLaptopScreen(t) {
    lc.fillStyle = C.bg;
    lc.fillRect(0, 0, 1024, 640);

    // topbar
    lc.fillStyle = C.surface;
    lc.fillRect(0, 0, 1024, 64);
    lc.fillStyle = C.accent;
    lc.font = "700 30px Sora, sans-serif";
    lc.fillText("Z", 28, 44);
    lc.fillStyle = C.text;
    lc.fillText("yphy", 52, 44);
    lc.fillStyle = C.surface2;
    for (let i = 0; i < 3; i++) { lc.beginPath(); lc.arc(950 + i * 24, 32, 6, 0, 7); lc.fill(); }

    // sidebar
    lc.fillStyle = C.surface3;
    lc.fillRect(0, 64, 200, 576);
    lc.fillStyle = alpha(C.accent, 0.12);
    lc.fillRect(16, 96, 168, 40);
    for (let i = 1; i < 6; i++) {
      lc.fillStyle = alpha(C.muted, 0.35);
      lc.fillRect(32, 100 + i * 56, 120, 12);
    }

    // cards de KPI
    const cards = [[232, 96], [500, 96], [768, 96]];
    cards.forEach(([x, y], i) => {
      lc.fillStyle = C.surface;
      roundRect(lc, x, y, 236, 120, 14); lc.fill();
      lc.fillStyle = alpha(C.muted, 0.5);
      lc.fillRect(x + 20, y + 22, 90, 10);
      lc.fillStyle = C.text;
      lc.font = "700 34px Sora, sans-serif";
      const vals = [
        Math.floor(1240 + Math.sin(t * 0.7 + i) * 60),
        (94 + Math.sin(t * 0.5 + i) * 3).toFixed(1) + "%",
        Math.floor(38 + Math.cos(t * 0.6 + i) * 6)
      ];
      lc.fillText(String(vals[i]), x + 20, y + 82);
      lc.fillStyle = C.accent;
      lc.fillRect(x + 20, y + 98, 60 + Math.sin(t + i) * 20 + 20, 6);
    });

    // gráfico de linha animado
    lc.fillStyle = C.surface;
    roundRect(lc, 232, 248, 772, 360, 14); lc.fill();
    lc.strokeStyle = alpha(C.muted, 0.12);
    lc.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      lc.beginPath(); lc.moveTo(260, 280 + i * 52); lc.lineTo(980, 280 + i * 52); lc.stroke();
    }
    const wave = (x) => 460 - Math.sin(x * 0.012 + t * 0.9) * 40 - Math.sin(x * 0.004 + t * 0.3) * 50 - x * 0.06;
    lc.beginPath();
    lc.moveTo(260, 560);
    for (let x = 0; x <= 720; x += 24) lc.lineTo(260 + x, wave(x));
    lc.lineTo(980, 560); lc.closePath();
    const g = lc.createLinearGradient(0, 280, 0, 560);
    g.addColorStop(0, alpha(C.accent, 0.35));
    g.addColorStop(1, alpha(C.accent, 0));
    lc.fillStyle = g; lc.fill();
    lc.beginPath();
    for (let x = 0; x <= 720; x += 24) {
      x === 0 ? lc.moveTo(260 + x, wave(x)) : lc.lineTo(260 + x, wave(x));
    }
    lc.strokeStyle = C.accent; lc.lineWidth = 4; lc.stroke();

    lapTex.needsUpdate = true;
  }

  /* ---------- tela do celular: app em canvas texture ---------- */
  const celCv = document.createElement("canvas");
  celCv.width = 360; celCv.height = 760;
  const cc = celCv.getContext("2d");
  const celTex = new THREE.CanvasTexture(celCv);
  celTex.colorSpace = THREE.SRGBColorSpace;

  function drawPhoneScreen(t) {
    cc.fillStyle = C.bg;
    cc.fillRect(0, 0, 360, 760);

    // status bar / notch
    cc.fillStyle = C.surface;
    roundRect(cc, 120, 18, 120, 26, 13); cc.fill();

    // header
    cc.fillStyle = C.accent;
    cc.font = "700 26px Sora, sans-serif";
    cc.fillText("Z", 28, 96);
    cc.fillStyle = C.text;
    cc.fillText("yphy", 47, 96);

    // métrica grande
    cc.fillStyle = alpha(C.muted, 0.5);
    cc.font = "400 15px Inter, sans-serif";
    cc.fillText("PROCESSOS AUTOMATIZADOS", 28, 150);
    cc.fillStyle = C.text;
    cc.font = "800 52px Sora, sans-serif";
    cc.fillText(String(Math.floor(320 + Math.sin(t * 0.8) * 12)), 28, 205);

    // botão CTA
    cc.fillStyle = C.accent;
    roundRect(cc, 28, 240, 304, 56, 28); cc.fill();
    cc.fillStyle = C.onAccent;
    cc.font = "600 18px Inter, sans-serif";
    cc.fillText("Começar projeto →", 96, 275);

    // lista de cards deslizando
    const scroll = (t * 30) % 130;
    for (let i = 0; i < 5; i++) {
      const y = 340 + i * 130 - scroll;
      if (y > 760 || y < 300) continue;
      cc.fillStyle = C.surface;
      roundRect(cc, 28, y, 304, 110, 16); cc.fill();
      cc.fillStyle = alpha(C.accent, 0.14);
      roundRect(cc, 48, y + 22, 44, 44, 12); cc.fill();
      cc.fillStyle = C.accent;
      cc.fillRect(62, y + 36, 16, 16);
      cc.fillStyle = C.text;
      cc.fillRect(110, y + 28, 140, 12);
      cc.fillStyle = alpha(C.muted, 0.4);
      cc.fillRect(110, y + 52, 190, 10);
      cc.fillRect(110, y + 70, 90, 10);
    }
    celTex.needsUpdate = true;
  }

  /* ---------- notebook ---------- */
  const laptop = new THREE.Group();

  const base = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.22, 4.2), bodyMat);
  laptop.add(base);
  const kb = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.02, 2.6), darkMat);
  kb.position.set(0, 0.12, -0.5);
  laptop.add(kb);
  const tp = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.02, 1.2), darkMat);
  tp.position.set(0, 0.12, 1.3);
  laptop.add(tp);

  // tampa com pivô na dobradiça
  const LID_OPEN = 0.32;             // rotation.x final (aberta)
  const LID_CLOSED = -Math.PI / 2;   // fechada
  const lid = new THREE.Group();
  lid.position.set(0, 0.11, -2.1);
  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.1, 0.16), bodyMat);
  lidMesh.position.set(0, 2.05, 0);
  lid.add(lidMesh);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(6.0, 3.75),
    new THREE.MeshBasicMaterial({ map: lapTex })
  );
  screen.position.set(0, 2.05, 0.09);
  lid.add(screen);
  const screenGlow = new THREE.PointLight(new THREE.Color(C.accent), 0.8, 8);
  screenGlow.position.set(0, 2, 1.5);
  lid.add(screenGlow);
  lid.rotation.x = LID_OPEN; // orquestração da abertura entra com o GSAP (main.js)
  laptop.add(lid);
  laptop.rotation.y = -0.5;
  laptop.rotation.x = 0.12;
  scene.add(laptop);

  /* ---------- celular ---------- */
  const phone = new THREE.Group();
  phone.add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 3.5, 0.14), bodyMat));
  const phScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.55, 3.32),
    new THREE.MeshBasicMaterial({ map: celTex })
  );
  phScreen.position.z = 0.075;
  phone.add(phScreen);
  phone.rotation.y = -0.35;
  phone.rotation.z = 0.08;
  scene.add(phone);

  /* ---------- partículas discretas ao fundo ---------- */
  const pCount = weak ? 65 : 130;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 30;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 6;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: new THREE.Color(C.accent), size: 0.05, transparent: true, opacity: 0.5
  }));
  scene.add(particles);

  /* ---------- composição (canvas da coluna ≈ quadrado) ---------- */
  function layout() {
    const narrow = window.innerWidth < 860;
    if (narrow) {
      laptop.position.set(-0.7, -1.35, 0);
      laptop.scale.setScalar(0.78);
      phone.position.set(2.35, -0.85, 1.4);
      phone.scale.setScalar(0.85);
      camera.position.z = 14.5;
    } else {
      laptop.position.set(-0.9, -1.25, 0);
      laptop.scale.setScalar(1);
      phone.position.set(3.1, -0.55, 1.5);
      phone.scale.setScalar(1);
      camera.position.z = 13;
    }
  }
  layout();

  function resize() {
    const w = holder.clientWidth, h = holder.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    layout();
    if (reduce) renderOnce();
  }

  /* ---------- mouse (parallax) ---------- */
  let mouseX = 0, mouseY = 0;
  if (!reduce) {
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  /* ---------- loop com pausa total fora da viewport ---------- */
  const clock = new THREE.Clock();
  const LOOK = new THREE.Vector3(1.0, -0.35, 0);
  let frame = 0, raf = 0, running = false;
  const baseLapY = () => (window.innerWidth < 860 ? -1.35 : -1.25);
  const basePhY = () => (window.innerWidth < 860 ? -0.85 : -0.55);

  function tick() {
    const t = clock.getElapsedTime();
    frame++;

    // telas animadas (no máx. a cada 3 frames)
    if (frame % 3 === 0) { drawLaptopScreen(t); drawPhoneScreen(t); }

    // flutuação + parallax
    laptop.position.y = baseLapY() + Math.sin(t * 0.7) * 0.06;
    laptop.rotation.y = -0.5 + mouseX * 0.12 + Math.sin(t * 0.3) * 0.03;
    laptop.rotation.x = 0.12 + mouseY * 0.06;
    phone.position.y = basePhY() + Math.cos(t * 0.9) * 0.08;
    phone.rotation.y = -0.35 + mouseX * 0.18;
    phone.rotation.x = mouseY * 0.1;
    particles.rotation.y = t * 0.01;
    cyanL.intensity = 1.5 + Math.sin(t * 0.8) * 0.3;

    camera.position.x += (mouseX * 0.9 - camera.position.x) * 0.03;
    camera.position.y += ((0.6 - mouseY * 0.5) - camera.position.y) * 0.03;
    camera.lookAt(LOOK);

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(tick);
  }

  function renderOnce() {
    drawLaptopScreen(0);
    drawPhoneScreen(0);
    camera.lookAt(LOOK);
    renderer.render(scene, camera);
  }

  function start() { if (!running && !reduce) { running = true; clock.start(); raf = requestAnimationFrame(tick); } }
  function stop() { running = false; cancelAnimationFrame(raf); clock.stop(); }

  resize();
  new ResizeObserver(resize).observe(holder);

  if (reduce) {
    // estático: tampa aberta, telas desenhadas uma vez, sem loop
    renderOnce();
  } else {
    drawLaptopScreen(0);
    drawPhoneScreen(0);
    start();
    onVisibilityChange = (vis) => { vis ? start() : stop(); };
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : (visible && start());
    });
  }
}
