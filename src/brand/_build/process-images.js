/**
 * STROMY Image Processing — Phase 4 Step 4
 *
 * Sage/Creator archetype parameters:
 *   Saturation:    0.55 (−45%)
 *   Contrast gain: 1.18 (+18%)
 *   Overlay:       Deep Forest #1D342B at 15% (multiply)
 *   Warm shift:    push shadows toward amber (tint r:255, g:245, b:230)
 *   Grain:         5% editorial noise
 *
 * Outputs:
 *   images/processed/<name>.brand.jpg   — full brand treatment (all 36)
 *   images/heroes/<name>.hero.jpg       — dark gradient overlay (9 heroes only)
 *   images/heroes/<name>.hero-16x9.jpg  — 1920×1080 crop (heroes only)
 *   images/heroes/<name>.hero-2x1.jpg   — 1920×960  crop (heroes only)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'images');
const processedDir = path.join(srcDir, 'processed');
const heroesDir = path.join(srcDir, 'heroes');

fs.mkdirSync(processedDir, { recursive: true });
fs.mkdirSync(heroesDir, { recursive: true });

// 9 hero filenames (base names without extension)
const HEROES = new Set([
  '02_brutalist_geometric',
  '16_rusted_metal_rivets',
  '18_brown_building_monumental',
  '22_concrete_curves_sky',
  '25_tall_building_shadow',
  '35_illuminated_windows_night',
  '37_glass_facade_reflections',
  '38_dark_building_silhouette',
  '41_aerial_train_yard',
]);

// Brand treatment: desaturate, boost contrast, warm shift, forest overlay, grain
async function brandTreat(inputPath, targetWidth = 1920) {
  // Step 1: Resize + modulate (saturation 0.55, slight brightness cut)
  const resized = await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .modulate({ brightness: 0.97, saturation: 0.55 })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const w = meta.width;
  const h = meta.height;

  // Step 2: Contrast boost via linear (gain=1.18, offset keeps midtones)
  const contrasted = await sharp(resized)
    .linear(1.18, -(0.18 * 128))
    .toBuffer();

  // Step 3: Create warm tint overlay (amber push into shadows)
  const warmOverlay = await sharp({
    create: { width: w, height: h, channels: 4, background: { r: 255, g: 245, b: 230, alpha: 0.06 } },
  }).png().toBuffer();

  // Step 4: Create Deep Forest overlay (#1D342B at 15%)
  const forestOverlay = await sharp({
    create: { width: w, height: h, channels: 4, background: { r: 29, g: 52, b: 43, alpha: 0.15 } },
  }).png().toBuffer();

  // Step 5: Create grain layer (5% noise)
  const grainData = Buffer.alloc(w * h * 4);
  for (let i = 0; i < grainData.length; i += 4) {
    const noise = Math.floor(Math.random() * 26) - 13; // ±13
    grainData[i] = 128 + noise;     // R
    grainData[i + 1] = 128 + noise; // G
    grainData[i + 2] = 128 + noise; // B
    grainData[i + 3] = 13;          // ~5% alpha
  }
  const grainOverlay = await sharp(grainData, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();

  // Step 6: Composite all layers
  return sharp(contrasted)
    .composite([
      { input: forestOverlay, blend: 'multiply' },
      { input: warmOverlay, blend: 'screen' },
      { input: grainOverlay, blend: 'over' },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

// Hero dark overlay for text-over-image usage
async function heroOverlay(brandBuffer, targetWidth = 1920) {
  const meta = await sharp(brandBuffer).metadata();
  const w = meta.width;
  const h = meta.height;

  // Gradient: bottom 60% dark (obsidian), top fades to transparent
  const gradientHeight = h;
  const gradientData = Buffer.alloc(w * gradientHeight * 4);
  for (let y = 0; y < gradientHeight; y++) {
    const progress = y / gradientHeight; // 0 = top, 1 = bottom
    // Ramp: transparent above 40%, linear 40-80%, full 80-100%
    let alpha;
    if (progress < 0.3) {
      alpha = 0;
    } else if (progress < 0.7) {
      alpha = ((progress - 0.3) / 0.4) * 0.65;
    } else {
      alpha = 0.65 + ((progress - 0.7) / 0.3) * 0.15;
    }
    const a = Math.round(alpha * 255);
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      gradientData[idx] = 15;      // R (obsidian)
      gradientData[idx + 1] = 19;  // G
      gradientData[idx + 2] = 16;  // B
      gradientData[idx + 3] = a;
    }
  }

  const gradientOverlay = await sharp(gradientData, { raw: { width: w, height: gradientHeight, channels: 4 } })
    .png()
    .toBuffer();

  return sharp(brandBuffer)
    .composite([{ input: gradientOverlay, blend: 'over' }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

async function run() {
  const files = fs.readdirSync(srcDir)
    .filter((f) => /^\d{2}_.*\.jpg$/i.test(f))
    .sort();

  console.log(`Processing ${files.length} images...`);
  let heroCount = 0;

  for (const file of files) {
    const source = path.join(srcDir, file);
    const base = file.replace(/\.jpg$/i, '');

    // Brand treatment for all images
    const brandBuffer = await brandTreat(source);
    const brandPath = path.join(processedDir, `${base}.brand.jpg`);
    await sharp(brandBuffer).toFile(brandPath);
    process.stdout.write(`  ✓ ${base}.brand.jpg`);

    // Hero variants for hero images only
    if (HEROES.has(base)) {
      heroCount++;

      // Full-size hero
      const heroBuffer = await heroOverlay(brandBuffer);
      await sharp(heroBuffer).toFile(path.join(heroesDir, `${base}.hero.jpg`));

      // 16:9 crop (1920×1080)
      await sharp(heroBuffer)
        .resize(1920, 1080, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(path.join(heroesDir, `${base}.hero-16x9.jpg`));

      // 2:1 crop (1920×960)
      await sharp(heroBuffer)
        .resize(1920, 960, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(path.join(heroesDir, `${base}.hero-2x1.jpg`));

      process.stdout.write(` + hero variants`);
    }

    console.log('');
  }

  console.log(`\nDone: ${files.length} brand-treated, ${heroCount} hero sets`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
