// MathGraph - Generador de Gr&aacute;ficos SVG para funciones matem&aacute;ticas
class MathGraph {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.width = options.width || 400;
    this.height = options.height || 300;
    this.padding = options.padding || 40;
    this.bgColor = options.bgColor || '#0a0a0f';
    this.gridColor = options.gridColor || '#1a1a2e';
    this.axisColor = options.axisColor || '#3b82f6';
    this.lineColors = options.lineColors || ['#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#f97316'];
    this.xRange = options.xRange || [-10, 10];
    this.yRange = options.yRange || [-10, 10];
    this.showGrid = options.showGrid !== false;
    this.showAxes = options.showAxes !== false;
    this.functions = [];
    this.points = [];
    this.shapes = [];
    this.labels = [];
    
    this.plotWidth = this.width - this.padding * 2;
    this.plotHeight = this.height - this.padding * 2;
    this.svg = null;
    
    this.init();
  }

  init() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.style.background = this.bgColor;
    this.svg.style.borderRadius = '8px';
    this.svg.style.display = 'block';
    this.svg.style.maxWidth = '100%';
    this.container.innerHTML = '';
    this.container.appendChild(this.svg);
    return this;
  }

  xToPixel(x) {
    return this.padding + ((x - this.xRange[0]) / (this.xRange[1] - this.xRange[0])) * this.plotWidth;
  }

  yToPixel(y) {
    return this.padding + this.plotHeight - ((y - this.yRange[0]) / (this.yRange[1] - this.yRange[0])) * this.plotHeight;
  }

  pixelToX(px) {
    return this.xRange[0] + ((px - this.padding) / this.plotWidth) * (this.xRange[1] - this.xRange[0]);
  }

  pixelToY(py) {
    return this.yRange[0] + ((this.height - this.padding - py) / this.plotHeight) * (this.yRange[1] - this.yRange[0]);
  }

  drawGrid() {
    if (!this.showGrid) return;
    
    const xStep = this.getStepSize(this.xRange);
    const yStep = this.getStepSize(this.yRange);
    
    // Vertical grid lines
    for (let x = Math.ceil(this.xRange[0] / xStep) * xStep; x <= this.xRange[1]; x += xStep) {
      if (Math.abs(x) < 1e-10) continue;
      const px = this.xToPixel(x);
      const line = this.createLine(px, this.padding, px, this.height - this.padding);
      line.setAttribute('stroke', this.gridColor);
      line.setAttribute('stroke-width', '0.5');
      this.svg.appendChild(line);
      
      // Label
      const label = this.createText(`${this.formatNum(x)}`, px, this.height - this.padding + 15);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', '#71717a');
      label.setAttribute('font-size', '10');
      this.svg.appendChild(label);
    }

    // Horizontal grid lines
    for (let y = Math.ceil(this.yRange[0] / yStep) * yStep; y <= this.yRange[1]; y += yStep) {
      if (Math.abs(y) < 1e-10) continue;
      const py = this.yToPixel(y);
      const line = this.createLine(this.padding, py, this.width - this.padding, py);
      line.setAttribute('stroke', this.gridColor);
      line.setAttribute('stroke-width', '0.5');
      this.svg.appendChild(line);
      
      const label = this.createText(`${this.formatNum(y)}`, this.padding - 8, py + 3);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', '#71717a');
      label.setAttribute('font-size', '10');
      this.svg.appendChild(label);
    }
  }

  drawAxes() {
    if (!this.showAxes) return;
    
    // X-axis
    if (this.yRange[0] <= 0 && this.yRange[1] >= 0) {
      const py = this.yToPixel(0);
      const line = this.createLine(this.padding, py, this.width - this.padding, py);
      line.setAttribute('stroke', this.axisColor);
      line.setAttribute('stroke-width', '1.5');
      this.svg.appendChild(line);
    }

    // Y-axis
    if (this.xRange[0] <= 0 && this.xRange[1] >= 0) {
      const px = this.xToPixel(0);
      const line = this.createLine(px, this.padding, px, this.height - this.padding);
      line.setAttribute('stroke', this.axisColor);
      line.setAttribute('stroke-width', '1.5');
      this.svg.appendChild(line);
    }

    // Origin label
    if (this.xRange[0] <= 0 && this.xRange[1] >= 0 && this.yRange[0] <= 0 && this.yRange[1] >= 0) {
      const ox = this.xToPixel(0);
      const oy = this.yToPixel(0);
      const label = this.createText('O', ox + 8, oy + 15);
      label.setAttribute('fill', this.axisColor);
      label.setAttribute('font-size', '11');
      label.setAttribute('font-weight', 'bold');
      this.svg.appendChild(label);
    }

    // Axis arrows
    // X arrow
    const xArrow = this.createLine(this.width - this.padding, this.yToPixel(0), this.width - this.padding + 8, this.yToPixel(0) - 5);
    xArrow.setAttribute('stroke', this.axisColor);
    xArrow.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(xArrow);
    const xArrow2 = this.createLine(this.width - this.padding, this.yToPixel(0), this.width - this.padding + 8, this.yToPixel(0) + 5);
    xArrow2.setAttribute('stroke', this.axisColor);
    xArrow2.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(xArrow2);

    // Y arrow
    const yArrow = this.createLine(this.xToPixel(0), this.padding, this.xToPixel(0) - 5, this.padding - 8);
    yArrow.setAttribute('stroke', this.axisColor);
    yArrow.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(yArrow);
    const yArrow2 = this.createLine(this.xToPixel(0), this.padding, this.xToPixel(0) + 5, this.padding - 8);
    yArrow2.setAttribute('stroke', this.axisColor);
    yArrow2.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(yArrow2);
  }

  // Add a function to plot
  addFunction(fn, options = {}) {
    this.functions.push({ fn, options });
    return this;
  }

  // Plot a function: f(x) = expression
  plotFunction(expr, options = {}) {
    const fn = (x) => {
      try {
        const safeExpr = expr
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/abs\(/g, 'Math.abs(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/π/g, 'Math.PI')
          .replace(/\^/g, '**');
        return Function('x', `"use strict"; return (${safeExpr})`)(x);
      } catch(e) { return NaN; }
    };
    this.addFunction(fn, options);
    return this;
  }

  renderFunctions() {
    const numSamples = Math.max(200, this.plotWidth);
    
    this.functions.forEach((func, idx) => {
      const color = func.options.color || this.lineColors[idx % this.lineColors.length];
      const strokeWidth = func.options.strokeWidth || 2;
      const dashArray = func.options.dashArray || '';
      
      let pathData = '';
      let first = true;
      let prevValid = false;
      
      for (let i = 0; i <= numSamples; i++) {
        const x = this.xRange[0] + (i / numSamples) * (this.xRange[1] - this.xRange[0]);
        const y = func.fn(x);
        const valid = isFinite(y) && y >= this.yRange[0] && y <= this.yRange[1];
        
        if (valid) {
          const px = this.xToPixel(x);
          const py = this.yToPixel(y);
          if (first) { pathData += `M ${px} ${py} `; first = false; }
          else if (!prevValid) { pathData += `M ${px} ${py} `; }
          else { pathData += `L ${px} ${py} `; }
        }
        prevValid = valid;
      }

      if (pathData) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', String(strokeWidth));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        if (dashArray) path.setAttribute('stroke-dasharray', dashArray);
        
        // Animation
        path.setAttribute('stroke-dasharray', '1000');
        path.setAttribute('stroke-dashoffset', '1000');
        
        this.svg.appendChild(path);

        // Legend
        if (func.options.label) {
          const legendY = this.padding + 20 + idx * 20;
          const legendLine = this.createLine(this.width - this.padding - 120, legendY, this.width - this.padding - 90, legendY);
          legendLine.setAttribute('stroke', color);
          legendLine.setAttribute('stroke-width', '2');
          this.svg.appendChild(legendLine);
          
          const legendText = this.createText(func.options.label, this.width - this.padding - 85, legendY + 4);
          legendText.setAttribute('fill', color);
          legendText.setAttribute('font-size', '11');
          this.svg.appendChild(legendText);
        }
      }
    });
  }

  // Draw points
  addPoint(x, y, options = {}) {
    this.points.push({ x, y, options });
    return this;
  }

  renderPoints() {
    this.points.forEach(pt => {
      const px = this.xToPixel(pt.x);
      const py = this.yToPixel(pt.y);
      const radius = pt.options.radius || 5;
      const color = pt.options.color || '#ef4444';
      const label = pt.options.label || '';
      const fill = pt.options.fill || color;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(px));
      circle.setAttribute('cy', String(py));
      circle.setAttribute('r', String(radius));
      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '1.5');
      this.svg.appendChild(circle);

      if (label) {
        const text = this.createText(label, px + radius + 5, py + 4);
        text.setAttribute('fill', color);
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', 'bold');
        this.svg.appendChild(text);
      }
    });
  }

  // Draw shapes (triangles, rectangles, etc.)
  addShape(type, points, options = {}) {
    this.shapes.push({ type, points, options });
    return this;
  }

  renderShapes() {
    this.shapes.forEach(shape => {
      const pts = shape.points.map(p => ({
        px: this.xToPixel(p.x),
        py: this.yToPixel(p.y)
      }));

      if (shape.type === 'triangle' && pts.length >= 3) {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', pts.map(p => `${p.px},${p.py}`).join(' '));
        poly.setAttribute('fill', shape.options.fill || 'rgba(59,130,246,0.15)');
        poly.setAttribute('stroke', shape.options.stroke || '#3b82f6');
        poly.setAttribute('stroke-width', String(shape.options.strokeWidth || 2));
        this.svg.appendChild(poly);

        // Label vertices
        if (shape.options.labels) {
          shape.options.labels.forEach((label, i) => {
            if (i < pts.length) {
              const text = this.createText(label, pts[i].px - 15, pts[i].py - 10);
              text.setAttribute('fill', '#fafafa');
              text.setAttribute('font-size', '12');
              text.setAttribute('font-weight', 'bold');
              this.svg.appendChild(text);
            }
          });
        }

        // Right angle marker
        if (shape.options.rightAngle) {
          const v = shape.options.rightAngle;
          const size = 10;
          const p = pts[v];
          const p1 = pts[(v + 1) % pts.length];
          const p2 = pts[(v + 2) % pts.length];
          const dx1 = p1.px - p.px, dy1 = p1.py - p.py;
          const dx2 = p2.px - p.px, dy2 = p2.py - p.py;
          const len1 = Math.sqrt(dx1*dx1 + dy1*dy1);
          const len2 = Math.sqrt(dx2*dx2 + dy2*dy2);
          if (len1 > 0 && len2 > 0) {
            const ux1 = dx1/len1 * size, uy1 = dy1/len1 * size;
            const ux2 = dx2/len2 * size, uy2 = dy2/len2 * size;
            const poly2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly2.setAttribute('points', `${p.px},${p.py} ${p.px+ux1},${p.py+uy1} ${p.px+ux1+ux2},${p.py+uy1+uy2} ${p.px+ux2},${p.py+uy2}`);
            poly2.setAttribute('fill', 'none');
            poly2.setAttribute('stroke', '#10b981');
            poly2.setAttribute('stroke-width', '1.5');
            this.svg.appendChild(poly2);
          }
        }
      }

      if (shape.type === 'rectangle' && pts.length >= 2) {
        const x = Math.min(pts[0].px, pts[1].px);
        const y = Math.min(pts[0].py, pts[1].py);
        const w = Math.abs(pts[1].px - pts[0].px);
        const h = Math.abs(pts[1].py - pts[0].py);
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(x));
        rect.setAttribute('y', String(y));
        rect.setAttribute('width', String(w));
        rect.setAttribute('height', String(h));
        rect.setAttribute('fill', shape.options.fill || 'rgba(245,158,11,0.15)');
        rect.setAttribute('stroke', shape.options.stroke || '#f59e0b');
        rect.setAttribute('stroke-width', String(shape.options.strokeWidth || 2));
        this.svg.appendChild(rect);
      }
    });
  }

  // Shade area between x values
  shadeArea(fn1, fn2, xFrom, xTo, options = {}) {
    const color = options.color || 'rgba(59,130,246,0.15)';
    const numSamples = 100;
    let pathData = '';
    
    for (let i = 0; i <= numSamples; i++) {
      const x = xFrom + (i / numSamples) * (xTo - xFrom);
      const y1 = fn1(x);
      const px = this.xToPixel(x);
      const py = this.yToPixel(y1);
      pathData += `${i === 0 ? 'M' : 'L'} ${px} ${py} `;
    }
    for (let i = numSamples; i >= 0; i--) {
      const x = xFrom + (i / numSamples) * (xTo - xFrom);
      const y2 = fn2(x);
      const px = this.xToPixel(x);
      const py = this.yToPixel(y2);
      pathData += `L ${px} ${py} `;
    }
    pathData += 'Z';

    if (pathData) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', color);
      path.setAttribute('stroke', 'none');
      this.svg.appendChild(path);
    }
    return this;
  }

  render() {
    // Clear and redraw
    this.svg.innerHTML = '';
    this.drawGrid();
    this.drawAxes();
    this.renderShapes();
    this.shadeAreaDrawn = false;
    this.renderFunctions();
    this.renderPoints();
    return this;
  }

  // Helper methods
  createLine(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    return line;
  }

  createText(content, x, y) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', String(x));
    text.setAttribute('y', String(y));
    text.textContent = content;
    return text;
  }

  getStepSize(range) {
    const diff = range[1] - range[0];
    const roughStep = diff / 8;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;
    if (normalized < 1.5) return magnitude;
    if (normalized < 3.5) return 2 * magnitude;
    if (normalized < 7.5) return 5 * magnitude;
    return 10 * magnitude;
  }

  formatNum(n) {
    if (Number.isInteger(n)) return String(n);
    return parseFloat(n.toFixed(2)).toString();
  }

  // Preset: plot a quadratic function
  plotQuadratic(a, b, c, options = {}) {
    return this.plotFunction(`${a}*x^2 + ${b}*x + ${c}`, options);
  }

  // Preset: plot a linear function
  plotLinear(m, b, options = {}) {
    return this.plotFunction(`${m}*x + ${b}`, options);
  }

  // Preset: plot sine
  plotSine(options = {}) {
    return this.plotFunction('sin(x)', { label: 'sin(x)', color: '#10b981', ...options });
  }

  // Preset: plot cosine
  plotCosine(options = {}) {
    return this.plotFunction('cos(x)', { label: 'cos(x)', color: '#3b82f6', ...options });
  }

  // Preset: plot tangent
  plotTangent(options = {}) {
    return this.plotFunction('tan(x)', { label: 'tan(x)', color: '#ef4444', ...options });
  }

  // Preset: unit circle
  drawUnitCircle() {
    this.xRange = [-1.5, 1.5];
    this.yRange = [-1.5, 1.5];
    this.plotFunction('sqrt(1 - x^2)', { label: 'y = √(1-x²)', color: '#10b981', dashArray: '4' });
    this.plotFunction('-sqrt(1 - x^2)', { label: 'y = -√(1-x²)', color: '#10b981', dashArray: '4' });
    return this;
  }

  // Preset: right triangle
  drawRightTriangle(a, b, options = {}) {
    const pts = [{x:0, y:0}, {x:a, y:0}, {x:0, y:b}];
    this.addShape('triangle', pts, {
      fill: 'rgba(59,130,246,0.12)',
      stroke: '#3b82f6',
      labels: ['A', 'B', 'C'],
      rightAngle: 0,
      ...options
    });
    return this;
  }

  // Export as data URL
  toDataURL() {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(this.svg);
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  }

  // Get as HTML string
  toHTML() {
    return this.svg.outerHTML;
  }
}

// Factory
function createGraph(containerId, options) {
  return new MathGraph(containerId, options);
}
