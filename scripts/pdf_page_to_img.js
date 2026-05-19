// Pipeline: PDF page → PNG → Cloudinary → URL
// Usage: node scripts/pdf_page_to_img.js <pdf_path> <page_num> [folder]

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwz2oh4yu',
  api_key:    process.env.CLOUDINARY_API_KEY    || '892633223983889',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'j_NuKUhMGT7d494XW2t_G7NmHxE',
});

async function renderPdfPage(pdfPath, pageNum, scale = 2.0) {
  const { createCanvas, loadImage } = require('canvas');
  const fs = require('fs');
  const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

  const data = fs.readFileSync(pdfPath);
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, viewport.width, viewport.height);

  const renderCtx = { canvasContext: ctx, viewport };
  await page.render(renderCtx).promise;

  const pngBuffer = canvas.toBuffer('image/png');

  await doc.destroy();

  return pngBuffer;
}

async function uploadToCloudinary(buffer, folder, publicId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `mathmaty/${folder}`,
        public_id: publicId,
        resource_type: 'image',
        format: 'png',
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
    const { Readable } = require('stream');
    Readable.from(buffer).pipe(uploadStream);
  });
}

async function main() {
  const pdfPath = process.argv[2];
  const pageNum = parseInt(process.argv[3]) || 1;
  const folder = process.argv[4] || 'ejercicios';

  if (!pdfPath || !require('fs').existsSync(pdfPath)) {
    console.log('Usage: node scripts/pdf_page_to_img.js <pdf_path> <page_num> [folder]');
    console.log('  pdf_path: path to PDF file');
    console.log('  page_num: page number to render (1-based)');
    console.log('  folder: Cloudinary folder (default: ejercicios)');
    process.exit(1);
  }

  const path = require('path');
  const fileName = path.basename(pdfPath, path.extname(pdfPath)).replace(/[^a-zA-Z0-9_-]/g, '_');
  const publicId = `${fileName}_p${pageNum}_${Date.now()}`;

  console.log(`Rendering page ${pageNum} of ${path.basename(pdfPath)}...`);
  const pngBuffer = await renderPdfPage(pdfPath, pageNum);

  console.log(`Image generated: ${(pngBuffer.length / 1024).toFixed(1)} KB`);
  console.log(`Uploading to Cloudinary: mathmaty/${folder}/${publicId}...`);

  const url = await uploadToCloudinary(pngBuffer, folder, publicId);

  console.log(`\nURL: ${url}`);
  console.log(`\nTo use this image, set: imagen = '${url}'`);

  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
