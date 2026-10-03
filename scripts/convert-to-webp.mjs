import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../src/assets/images');

async function convertImages() {
  console.log('🚀 Starting WebP image optimization...\nTarget directory:', imagesDir);

  const entries = await fs.readdir(imagesDir, { withFileTypes: true });
  const imageFiles = entries.filter(
    (e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name) && !e.name.endsWith('.webp')
  );

  console.log(`Found ${imageFiles.length} image(s) to optimize into WebP format.\n`);

  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file.name);
    const baseName = file.name.replace(/\.[^.]+$/, '');
    const outputPath = path.join(imagesDir, `${baseName}.webp`);

    const inputStat = await fs.stat(inputPath);
    totalOriginalBytes += inputStat.size;

    await sharp(inputPath)
      .webp({
        quality: 82,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(outputPath);

    const outputStat = await fs.stat(outputPath);
    totalWebpBytes += outputStat.size;

    const savedPct = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(1);
    const origKb = (inputStat.size / 1024).toFixed(1);
    const webpKb = (outputStat.size / 1024).toFixed(1);

    console.log(`  ✓ ${file.name} -> ${baseName}.webp [${origKb} KB -> ${webpKb} KB | -${savedPct}%]`);
  }

  const overallSavedPct = (
    ((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) *
    100
  ).toFixed(1);
  const totalOrigMb = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const totalWebpMb = (totalWebpBytes / (1024 * 1024)).toFixed(2);

  console.log('\n======================================================');
  console.log(`🎉 Optimization Complete!`);
  console.log(`Original total size: ${totalOrigMb} MB`);
  console.log(`WebP total size:     ${totalWebpMb} MB`);
  console.log(`Total bandwidth reduction: -${overallSavedPct}%`);
  console.log('======================================================\n');
}

convertImages().catch((err) => {
  console.error('❌ Error during WebP conversion:', err);
  process.exit(1);
});
