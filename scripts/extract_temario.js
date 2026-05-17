const fs = require('fs');
const { PDFParse } = require('pdf-parse');
(async () => {
  const buf = fs.readFileSync('temarios/Matematicas-III-Ciclo 7mo, 8vo, 9no-2025.pdf');
  const parser = new PDFParse({ buffer: buf });
  const result = await parser.getText();
  console.log(result.text.substring(0, 20000));
})();
