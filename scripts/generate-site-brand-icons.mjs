/**
 * Régénère le logo WebP horizontal et les favicons / PWA à partir du PNG source.
 * Monogramme LO (partie gauche) → favicons ; PNG complet → logo header / schema.
 *
 * Usage : node scripts/generate-site-brand-icons.mjs [chemin-logo.png]
 * Défaut : public/images/logo-laure-olivie-formation-ia-btp-source.png
 */
import { createRequire } from 'node:module';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const toIco = require('to-ico');

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultSrc = path.join(root, 'public/images/logo-laure-olivie-formation-ia-btp-source.png');
const srcPath = path.resolve(process.argv[2] ?? defaultSrc);

const BRAND_WEBP = path.join(root, 'public/images/logo-laure-olivie-formation-ia-btp.webp');
const MARK_SQUARE = path.join(root, 'public/images/logo-laure-olivie-mark-square.png');

/** Zone gauche avant le mot « Laure » — suffisante pour le monogramme seul. */
const MARK_EXTRACT_WIDTH = 320;

async function buildMarkSquareBuffer() {
  const meta = await sharp(srcPath).metadata();
  const cropped = await sharp(srcPath)
    .extract({ left: 0, top: 0, width: MARK_EXTRACT_WIDTH, height: meta.height })
    .toBuffer();
  const trimmedBuf = await sharp(cropped).trim({ threshold: 1 }).toBuffer();
  const trimmed = await sharp(trimmedBuf).metadata();
  const side = Math.max(trimmed.width, trimmed.height);
  const padLeft = Math.floor((side - trimmed.width) / 2);
  const padTop = Math.floor((side - trimmed.height) / 2);
  return sharp(trimmedBuf)
    .extend({
      top: padTop,
      bottom: side - trimmed.height - padTop,
      left: padLeft,
      right: side - trimmed.width - padLeft,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .png()
    .toBuffer();
}

async function writePngSize(markSquare, size, outPath) {
  await sharp(markSquare)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toFile(outPath);
}

async function main() {
  const meta = await sharp(srcPath).metadata();
  await sharp(srcPath)
    .webp({ quality: 90, effort: 6 })
    .toFile(BRAND_WEBP);

  const markSquare = await buildMarkSquareBuffer();
  writeFileSync(MARK_SQUARE, markSquare);

  const tmpDir = path.join(root, '.tmp-favicon-gen');
  mkdirSync(tmpDir, { recursive: true });

  const sizes = [
    { size: 16, name: 'favicon-16.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
  ];

  for (const { size, name } of sizes) {
    const out = path.join(tmpDir, name);
    await writePngSize(markSquare, size, out);
    const publicOut = path.join(root, 'public', name);
    copyFileSync(out, publicOut);
    if (size === 32) {
      copyFileSync(out, path.join(root, 'app/icon.png'));
    }
    if (size === 180) {
      copyFileSync(out, path.join(root, 'app/apple-icon.png'));
    }
  }

  const ico16 = readFileSync(path.join(tmpDir, 'favicon-16.png'));
  const ico32 = readFileSync(path.join(tmpDir, 'favicon-32.png'));
  const icoBuf = await toIco([ico16, ico32]);
  writeFileSync(path.join(root, 'public/favicon.ico'), icoBuf);
  writeFileSync(path.join(root, 'app/favicon.ico'), icoBuf);

  console.log('OK — logo', BRAND_WEBP, `${meta.width}×${meta.height} → WebP`);
  console.log('OK — favicons monogramme LO (noir) → public/ + app/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
