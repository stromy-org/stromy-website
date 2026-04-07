const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'images');
const outBase = path.join(root, '_build', 'images');

const dirs = {
  processed: path.join(outBase, 'processed'),
  slides: path.join(outBase, 'slides-16x9'),
  headers: path.join(outBase, 'headers-2x1'),
  cards: path.join(outBase, 'cards-1x1'),
  heroes: path.join(outBase, 'heroes'),
};

for (const dir of Object.values(dirs)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function makeTreatedBuffer(inputPath, width = 1800) {
  const resized = sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .modulate({ brightness: 0.98, saturation: 0.78 })
    .linear(1.03, -2)
    .jpeg({ quality: 86, mozjpeg: true });

  const resizedBuffer = await resized.toBuffer();
  const metadata = await sharp(resizedBuffer).metadata();

  return sharp(resizedBuffer)
    .composite([
      {
        input: {
          create: {
            width,
            height: metadata.height || 1200,
            channels: 4,
            background: { r: 29, g: 52, b: 43, alpha: 0.12 },
          },
        },
        blend: 'multiply',
        opacity: 1,
      },
      {
        input: {
          create: {
            width,
            height: metadata.height || 1200,
            channels: 4,
            background: { r: 236, g: 230, b: 218, alpha: 0.06 },
          },
        },
        blend: 'screen',
        opacity: 1,
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

async function run() {
  const files = fs
    .readdirSync(srcDir)
    .filter((file) => /\.(jpe?g)$/i.test(file))
    .sort();

  for (const file of files) {
    const source = path.join(srcDir, file);
    const base = file.replace(/\.(jpe?g)$/i, '');
    const processedBuffer = await makeTreatedBuffer(source);

    await sharp(processedBuffer).toFile(path.join(dirs.processed, `${base}.treated.jpg`));
    await sharp(processedBuffer)
      .resize(1600, 900, { fit: 'cover', position: 'attention' })
      .toFile(path.join(dirs.slides, `${base}.16x9.jpg`));
    await sharp(processedBuffer)
      .resize(1600, 800, { fit: 'cover', position: 'attention' })
      .toFile(path.join(dirs.headers, `${base}.2x1.jpg`));
    await sharp(processedBuffer)
      .resize(900, 900, { fit: 'cover', position: 'attention' })
      .toFile(path.join(dirs.cards, `${base}.1x1.jpg`));
    await sharp(processedBuffer)
      .resize(1600, 900, { fit: 'cover', position: 'attention' })
      .composite([
        {
          input: {
            create: {
              width: 1600,
              height: 900,
              channels: 4,
              background: { r: 15, g: 19, b: 16, alpha: 0.18 },
            },
          },
          blend: 'multiply',
          opacity: 1,
        },
      ])
      .toFile(path.join(dirs.heroes, `${base}.hero.jpg`));
  }

  console.log(`Processed ${files.length} images into ${outBase}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
