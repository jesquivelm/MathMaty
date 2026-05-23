import { createCanvas } from 'canvas';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwz2oh4yu',
  api_key:    process.env.CLOUDINARY_API_KEY    || '892633223983889',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'j_NuKUhMGT7d494XW2t_G7NmHxE',
});

async function renderPdfPage(pdfPath, pageNum) {
  const pdfjsLib = await import('pdfjs-dist');
  
  // Configure pdfjs to use node-canvas Image
  const { GlobalWorkerOptions, getDocument } = pdfjsLib;
  // No worker needed for Node.js rendering
  
  const buf = readFileSync(pdfPath);
  const data = new Uint8Array(buf);
  const doc = await getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(pageNum);
  
  const scale = 1.5;
  const viewport = page.getViewport({ scale });
  const width = Math.floor(viewport.width);
  const height = Math.floor(viewport.height);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Render with node-canvas
  await page.render({
    canvasContext: ctx,
    viewport,
    useSystemFonts: true,
  }).promise;

  const pngBuffer = canvas.toBuffer('image/png');
  await doc.destroy();
  return pngBuffer;
}

const pdfPath = process.argv[2];
const pageNum = parseInt(process.argv[3]) || 1;
const folder = process.argv[4] || 'ejercicios';

if (!pdfPath || !existsSync(pdfPath)) {
  console.log('Usage: node scripts/pdf_page_to_img.mjs <pdf_path> <page_num> [folder]');
  process.exit(1);
}

const fileName = path.basename(pdfPath, path.extname(pdfPath)).replace(/[^a-zA-Z0-9_-]/g, '_');
const publicId = `${fileName}_p${pageNum}_${Date.now()}`;

console.log(`Rendering page ${pageNum} of ${path.basename(pdfPath)}...`);
try {
  const pngBuffer = await renderPdfPage(pdfPath, pageNum);
  console.log(`Image: ${(pngBuffer.length / 1024).toFixed(1)} KB`);

  console.log(`Uploading to mathmaty/${folder}/${publicId}...`);
  const url = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `mathmaty/${folder}`, public_id: publicId, format: 'png' },
      (err, r) => { if (err) reject(err); else resolve(r.secure_url); }
    );
    Readable.from(pngBuffer).pipe(uploadStream);
  });

  console.log(`URL: ${url}`);
} catch (err) {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
}
