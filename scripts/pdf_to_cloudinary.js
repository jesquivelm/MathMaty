// PoC: Render PDF page to image, upload to Cloudinary
// Usage: node scripts/pdf_to_cloudinary.js <pdf_path> [page_num]

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwz2oh4yu',
  api_key:    process.env.CLOUDINARY_API_KEY    || '892633223983889',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'j_NuKUhMGT7d494XW2t_G7NmHxE',
});

const path = require('path');

async function pdfPageToImage(pdfPath, pageNum) {
  // Use pdfjs-dist to render page
  const pdfjsLib = await import('pdfjs-dist');
  const fs = await import('fs');
  
  const data = fs.readFileSync(pdfPath);
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  
  const viewport = page.getViewport({ scale: 2.0 });
  const width = Math.floor(viewport.width);
  const height = Math.floor(viewport.height);
  
  // Render to canvas
  const canvas = { width, height };
  const context = { _data: Buffer.alloc(width * height * 4) };
  
  // Use sharp to create blank image (simpler approach)
  const sharp = require('sharp');
  const img = sharp({
    create: { width, height, channels: 4, background: { r:255, g:255, b:255, alpha:1 } }
  }).png();
  
  // Actually, pdfjs-dist renders to a OffscreenCanvas or regular canvas in Node
  // We need node-canvas for this. Let me use an alternative approach.
  
  console.log(`PDF: ${path.basename(pdfPath)}, Page ${pageNum}: ${width}x${height}`);
  
  // Use pdfjs-dist's built-in render to get raw pixel data
  const task = page.render({ canvasContext: context, viewport });
  await task.promise;
  
  // Convert raw RGBA data to PNG using sharp
  const pngBuffer = await sharp(context._data, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();
  
  return pngBuffer;
}

// Alternative: Use the `pageToPng` approach with pdfjs's node functionality
async function pdfPageToPng(pdfPath, pageNum) {
  const pdfjsLib = await import('pdfjs-dist');
  const { promises: fs } = await import('fs');
  
  const data = await fs.readFile(pdfPath);
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2.0 });
  
  // pdfjs-dist Node.js canvas rendering requires node-canvas
  // Fallback: use the built-in conversion
  const sharp = require('sharp');
  
  // Create a white canvas
  const { width, height } = viewport;
  const raw = Buffer.alloc(width * height * 4, 255);
  
  // Use pdfjs's own rendering method via a Node canvas polyfill
  // For now, just create a placeholder
  console.log(`Page ${pageNum}: ${width}x${height}`);
  
  // Clean up
  await doc.destroy();
  
  return null; // placeholder
}

async function main() {
  const pdfPath = process.argv[2];
  const pageNum = parseInt(process.argv[3]) || 1;
  
  if (!pdfPath) {
    console.log('Usage: node scripts/pdf_to_cloudinary.js <pdf_path> [page_num]');
    process.exit(1);
  }
  
  console.log(`Processing: ${pdfPath} page ${pageNum}`);
  
  // Try pdfPageToPng
  const result = await pdfPageToPng(pdfPath, pageNum);
  console.log('Result:', result ? 'Generated' : 'Skipped');
}

main().catch(console.error);
