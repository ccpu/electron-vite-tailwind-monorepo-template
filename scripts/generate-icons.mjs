/* eslint-disable no-magic-numbers */
/**
 * Rasterises `buildResources/icon.svg` into the icon files electron-builder
 * picks up: `icon.png` (Linux, and the fallback for every other target),
 * `icon.ico` (Windows) and `icon.icns` (macOS).
 *
 * Run it after editing the SVG:
 *
 *   node scripts/generate-icons.mjs
 *
 * Chromium does the rasterising, through the Playwright browser this repo
 * already installs for the e2e tests (`npx playwright install chromium`). Set
 * `CHROME_PATH` to point at a different build.
 */
import { Buffer } from 'node:buffer';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const buildResources = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../buildResources',
);

/** The size electron-builder wants `icon.png` to be. */
const PNG_SIZE = 1024;

/** Sizes Windows looks for in an `.ico`. */
const ICO_SIZES = [16, 24, 32, 48, 64, 128, 256];

/**
 * The `.icns` members, as `[OSType, pixel size]`. The retina types hold the
 * same pixels as their 1x siblings at twice the size, which is why several
 * sizes appear twice.
 */
const ICNS_MEMBERS = [
  ['icp4', 16],
  ['icp5', 32],
  ['ic11', 32],
  ['ic12', 64],
  ['ic07', 128],
  ['ic08', 256],
  ['ic13', 256],
  ['ic09', 512],
  ['ic14', 512],
  ['ic10', PNG_SIZE],
];

/**
 * Rasterises the SVG once per size, through an `<img>` drawn into a canvas.
 * Screenshotting the page instead looks simpler but silently renders nothing
 * at some viewport sizes in headless Chromium.
 *
 * @param {string} svg
 * @param {number[]} sizes
 * @returns {Promise<Map<number, Buffer>>} One PNG per requested size.
 */
async function renderAll(svg, sizes) {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });

  try {
    const page = await browser.newPage();
    await page.setContent('<!doctype html><body></body>');

    const encoded = await page.evaluate(
      async ({ svg: source, sizes: targets }) => {
        const image = new Image();
        await new Promise((resolve, reject) => {
          image.addEventListener('load', () => resolve());
          image.addEventListener('error', () => reject(new Error('SVG failed to load')));
          image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
        });

        return targets.map((size) => {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          canvas.getContext('2d').drawImage(image, 0, 0, size, size);
          return canvas.toDataURL('image/png').split(',')[1];
        });
      },
      { svg, sizes },
    );

    return new Map(
      encoded.map((base64, index) => [sizes[index], Buffer.from(base64, 'base64')]),
    );
  } finally {
    await browser.close();
  }
}

/**
 * @param {Map<number, Buffer>} images
 * @returns {Buffer} A PNG-compressed `.ico` holding every {@link ICO_SIZES} entry.
 */
function buildIco(images) {
  const entries = ICO_SIZES.map((size) => ({ size, png: images.get(size) }));

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(entries.length * 16);
  let offset = header.length + directory.length;

  entries.forEach(({ size, png }, index) => {
    const at = index * 16;
    // 256 does not fit in a byte and is spelled `0`.
    directory.writeUInt8(size === 256 ? 0 : size, at);
    directory.writeUInt8(size === 256 ? 0 : size, at + 1);
    directory.writeUInt8(0, at + 2); // palette size
    directory.writeUInt8(0, at + 3); // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(png.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });

  return Buffer.concat([header, directory, ...entries.map(({ png }) => png)]);
}

/**
 * @param {Map<number, Buffer>} images
 * @returns {Buffer} An `.icns` holding every {@link ICNS_MEMBERS} entry.
 */
function buildIcns(images) {
  const members = ICNS_MEMBERS.map(([type, size]) => {
    const png = images.get(size);
    const memberHeader = Buffer.alloc(8);
    memberHeader.write(type, 0, 4, 'ascii');
    memberHeader.writeUInt32BE(png.length + 8, 4);
    return Buffer.concat([memberHeader, png]);
  });

  const body = Buffer.concat(members);
  const header = Buffer.alloc(8);
  header.write('icns', 0, 4, 'ascii');
  header.writeUInt32BE(body.length + 8, 4);
  return Buffer.concat([header, body]);
}

const svg = readFileSync(path.join(buildResources, 'icon.svg'), 'utf8');
const sizes = [
  ...new Set([PNG_SIZE, ...ICO_SIZES, ...ICNS_MEMBERS.map(([, size]) => size)]),
].sort((a, b) => a - b);

const images = await renderAll(svg, sizes);

writeFileSync(path.join(buildResources, 'icon.png'), images.get(PNG_SIZE));
writeFileSync(path.join(buildResources, 'icon.ico'), buildIco(images));
writeFileSync(path.join(buildResources, 'icon.icns'), buildIcns(images));

console.log(`Wrote icon.png, icon.ico and icon.icns from ${sizes.length} renders.`);
