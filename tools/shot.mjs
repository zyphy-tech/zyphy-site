#!/usr/bin/env node
/**
 * Captura o topo de um site e recorta para os cards de "Projetos entregues".
 *
 * Os cards usam .project-media { aspect-ratio: 8/5 } com object-fit: cover e
 * object-position: center top (css/styles.css:419-420), entao a imagem final
 * precisa ja sair em 8:5 com o topo preservado.
 *
 *   node tools/shot.mjs <url> <arquivo.png> [opcoes]
 *
 *   --viewport 1440x900   viewport de captura (default 1440x900, que ja e 8:5)
 *   --width 800           largura final em px (altura = width * 5/8)
 *   --bias 0              de onde tirar o excedente horizontal:
 *                           0   = corta tudo da direita (preserva a logo)
 *                           0.5 = corte central simetrico
 *                           1   = corta tudo da esquerda
 *   --vbias 0             idem no eixo vertical (0 = preserva o topo)
 *   --wait 2500           espera extra em ms depois do networkidle
 *   --scale 2             deviceScaleFactor da captura (2 = downscale nitido)
 *   --no-freeze           nao acelera animacoes/transicoes
 *   --palette             PNG com paleta indexada (arquivo bem menor)
 *   --out-dir <dir>       destino (default: assets/img na raiz do repo)
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const TARGET_AR = 8 / 5;
const HERE = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const positional = [];
  const opts = {
    viewport: '1440x900', width: 800, bias: 0, vbias: 0,
    wait: 2500, scale: 2, freeze: true, palette: false, outDir: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { positional.push(a); continue; }
    switch (a) {
      case '--no-freeze': opts.freeze = false; break;
      case '--palette': opts.palette = true; break;
      case '--viewport': opts.viewport = argv[++i]; break;
      case '--out-dir': opts.outDir = argv[++i]; break;
      case '--width': opts.width = Number(argv[++i]); break;
      case '--bias': opts.bias = Number(argv[++i]); break;
      case '--vbias': opts.vbias = Number(argv[++i]); break;
      case '--wait': opts.wait = Number(argv[++i]); break;
      case '--scale': opts.scale = Number(argv[++i]); break;
      default: throw new Error(`opcao desconhecida: ${a}`);
    }
  }
  const [url, outName] = positional;
  if (!url || !outName) {
    throw new Error('uso: node tools/shot.mjs <url> <arquivo.png> [opcoes]');
  }
  const m = /^(\d+)x(\d+)$/.exec(opts.viewport);
  if (!m) throw new Error(`--viewport invalido: ${opts.viewport} (esperado LARGURAxALTURA)`);
  opts.vw = Number(m[1]);
  opts.vh = Number(m[2]);
  for (const k of ['bias', 'vbias']) {
    if (!(opts[k] >= 0 && opts[k] <= 1)) throw new Error(`--${k} precisa estar entre 0 e 1`);
  }
  return { url, outName, opts };
}

/** Janela 8:5 dentro do viewport, com o excedente tirado do lado escolhido. */
function cropBox(vw, vh, bias, vbias) {
  if (vw / vh > TARGET_AR) {
    const w = vh * TARGET_AR;
    return { left: Math.round((vw - w) * bias), top: 0, width: Math.round(w), height: vh };
  }
  const h = vw / TARGET_AR;
  return { left: 0, top: Math.round((vh - h) * vbias), width: vw, height: Math.round(h) };
}

const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
`;
// Encurta as animacoes em vez de remover: reveals com fill-mode forwards ainda
// chegam ao estado final, so que instantaneamente.
const HIDE_SCROLLBAR_CSS = `
  html { scrollbar-width: none !important; }
  ::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none !important; }
`;

async function main() {
  const { url, outName, opts } = parseArgs(process.argv.slice(2));
  const outDir = opts.outDir ?? path.join(HERE, '..', 'assets', 'img');
  const outPath = path.join(outDir, outName);
  const height = Math.round(opts.width / TARGET_AR);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: opts.vw, height: opts.vh },
    deviceScaleFactor: opts.scale,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    await page.addStyleTag({ content: HIDE_SCROLLBAR_CSS + (opts.freeze ? FREEZE_CSS : '') });
    await page.waitForLoadState('networkidle', { timeout: 60_000 }).catch(() => {
      console.warn('! networkidle nao chegou em 60s, seguindo assim mesmo');
    });
    await page.evaluate(() => document.fonts?.ready);
    // Imagens acima da dobra podem estar em lazy-load; espera as que ja entraram.
    // Teto de 5s: img com loading="lazy" fora da viewport fica com complete=false
    // e nunca dispara load/error, entao o Promise.all sozinho pendura pra sempre.
    await page.evaluate(() => {
      const pendentes = [...document.images].filter(i => !i.complete).map(i => new Promise(r => {
        i.addEventListener('load', r, { once: true });
        i.addEventListener('error', r, { once: true });
      }));
      return Promise.race([Promise.all(pendentes), new Promise(r => setTimeout(r, 5000))]);
    });
    await page.waitForTimeout(opts.wait);

    const shot = await page.screenshot({ type: 'png', fullPage: false, animations: 'disabled' });

    const box = cropBox(opts.vw, opts.vh, opts.bias, opts.vbias);
    const device = {
      left: Math.round(box.left * opts.scale),
      top: Math.round(box.top * opts.scale),
      width: Math.round(box.width * opts.scale),
      height: Math.round(box.height * opts.scale),
    };

    await fs.mkdir(outDir, { recursive: true });
    let pipeline = sharp(shot)
      .extract(device)
      .resize(opts.width, height, { kernel: 'lanczos3', fit: 'fill' });
    pipeline = opts.palette
      ? pipeline.png({ compressionLevel: 9, palette: true })
      : pipeline.png({ compressionLevel: 9 });
    await pipeline.toFile(outPath);

    const { size } = await fs.stat(outPath);
    const cut = opts.vw - box.width;
    console.log(`ok  ${outPath}`);
    console.log(`    viewport ${opts.vw}x${opts.vh} @${opts.scale}x  ->  corte ${box.width}x${box.height} (${cut}px fora, offset x=${box.left})  ->  ${opts.width}x${height}  ${(size / 1024).toFixed(0)} KB`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(`erro: ${err.message}`);
  process.exit(1);
});
