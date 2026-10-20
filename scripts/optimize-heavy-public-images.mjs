#!/usr/bin/env node
/**
 * Compression ciblée des images public/ > seuil (défaut 500 Ko).
 * Réécrit in-place uniquement si gain ≥ 2 % (même URL, pas de renommage).
 *
 * Usage :
 *   node scripts/optimize-heavy-public-images.mjs [--min-kb 500] [--dry-run]
 *   node scripts/optimize-heavy-public-images.mjs --glob "carrousel-a-presentation-formation/slide-*.png" --resize-max 1440 --min-kb 0
 */
import { readdirSync, statSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join, extname, relative } from 'path';
import sharp from 'sharp';

function matchPublicGlob(publicRel, glob) {
  const re = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0001')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0001/g, '.*');
  return new RegExp(`^${re}$`).test(publicRel);
}

const ROOT = join(import.meta.dirname, '..');
const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    try {
      const st = statSync(p);
      if (st.isDirectory()) walk(p, acc);
      else if (IMAGE_EXT.has(extname(p).toLowerCase())) acc.push(p);
    } catch {
      /* ignore */
    }
  }
  return acc;
}

async function optimizeOne(absPath, { dryRun, resizeMax }) {
  const ext = extname(absPath).toLowerCase();
  const before = statSync(absPath).size;
  const meta = await sharp(absPath).metadata();
  const tmp = `${absPath}.opt.tmp`;
  const needsResize =
    resizeMax > 0 &&
    ((meta.width ?? 0) > resizeMax || (meta.height ?? 0) > resizeMax);

  let pipeline = sharp(absPath);
  if (needsResize) {
    pipeline = pipeline.resize(resizeMax, resizeMax, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  if (ext === '.png') {
    pipeline = pipeline.png({
      compressionLevel: 9,
      effort: 10,
      palette: meta.hasAlpha ? false : undefined,
    });
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 86, mozjpeg: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 82, effort: 6 });
  } else {
    return { rel: absPath.replace(ROOT + '/public/', ''), skipped: true, reason: 'format' };
  }

  if (dryRun) {
    return {
      rel: absPath.replace(ROOT + '/public/', ''),
      before,
      after: before,
      dryRun: true,
      width: meta.width,
      height: meta.height,
      hasAlpha: meta.hasAlpha,
      needsResize,
    };
  }

  await pipeline.toFile(tmp);
  const after = statSync(tmp).size;
  const outMeta = await sharp(tmp).metadata();
  if (needsResize || after < before * 0.98) {
    renameSync(tmp, absPath);
    return {
      rel: absPath.replace(ROOT + '/public/', ''),
      before,
      after,
      savedPct: (((before - after) / before) * 100).toFixed(1),
      width: outMeta.width,
      height: outMeta.height,
      resized: needsResize,
    };
  }
  unlinkSync(tmp);
  return {
    rel: absPath.replace(ROOT + '/public/', ''),
    before,
    after: before,
    skipped: true,
    reason: 'gain < 2 %',
  };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const minKbArg = process.argv.indexOf('--min-kb');
  const minBytes =
    minKbArg >= 0 && process.argv[minKbArg + 1]
      ? Number(process.argv[minKbArg + 1]) * 1024
      : 500 * 1024;
  const globArg = process.argv.indexOf('--glob');
  const globPattern = globArg >= 0 ? process.argv[globArg + 1] : null;
  const resizeArg = process.argv.indexOf('--resize-max');
  const resizeMax = resizeArg >= 0 ? Number(process.argv[resizeArg + 1]) : 0;

  let files = walk(join(ROOT, 'public'));
  if (globPattern) {
    files = files.filter((p) => {
      const rel = relative(join(ROOT, 'public'), p).replace(/\\/g, '/');
      return matchPublicGlob(rel, globPattern);
    });
  } else {
    files = files.filter((p) => statSync(p).size >= minBytes);
  }
  files.sort((a, b) => statSync(b).size - statSync(a).size);

  const label = globPattern
    ? `Glob « ${globPattern} » : ${files.length} fichier(s)`
    : `Fichiers ≥ ${(minBytes / 1024).toFixed(0)} Ko : ${files.length}`;
  console.log(`${label}${dryRun ? ' (dry-run)' : ''}${resizeMax ? ` · resize max ${resizeMax}px` : ''}`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;

  for (const abs of files) {
    const r = await optimizeOne(abs, { dryRun, resizeMax });
    totalBefore += r.before ?? 0;
    totalAfter += r.after ?? r.before ?? 0;
    if (r.savedPct) optimized += 1;
    const kb = (n) => `${((n ?? 0) / 1024).toFixed(0)} Ko`;
    if (r.skipped) {
      console.log(`— ${r.rel} : ${kb(r.before)} (${r.reason})`);
    } else if (r.dryRun) {
      console.log(`? ${r.rel} : ${kb(r.before)} ${r.width}x${r.height}`);
    } else {
      const dim = r.width && r.height ? ` → ${r.width}×${r.height}` : '';
      const tag = r.resized ? ' [resize]' : '';
      console.log(`✓ ${r.rel} : ${kb(r.before)} → ${kb(r.after)} (−${r.savedPct} %)${dim}${tag}`);
    }
  }

  if (!dryRun && optimized > 0) {
    console.log(
      `\nTotal : ${(totalBefore / 1024 / 1024).toFixed(2)} Mo → ${(totalAfter / 1024 / 1024).toFixed(2)} Mo (${optimized} fichiers optimisés)`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
