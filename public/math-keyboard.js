// Teclado Matemático Compacto - tipo calculadora
var _mathKeyboardActive = false;
var _mathKeyboardTarget = null;

function toggleMathKeyboard(inputId) {
  var input = document.getElementById(inputId);
  if (!input) return;
  
  if (_mathKeyboardActive && _mathKeyboardTarget === inputId) {
    hideMathKeyboard();
    return;
  }
  
  _mathKeyboardTarget = inputId;
  _mathKeyboardActive = true;
  
  var existing = document.getElementById('math-kb-container');
  if (existing) existing.remove();
  
  var container = document.createElement('div');
  container.id = 'math-kb-container';
  container.style.cssText = 'margin-top:8px;background:var(--color-surface);border:1px solid var(--color-primary);border-radius:8px;padding:6px;max-width:100%;';
  
  var tabsDiv = document.createElement('div');
  tabsDiv.style.cssText = 'display:flex;gap:4px;margin-bottom:6px;';
  
  var basicTab = document.createElement('button');
  basicTab.textContent = 'Basico';
  basicTab.style.cssText = 'flex:1;padding:4px 8px;background:var(--color-primary);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;';
  
  var sciTab = document.createElement('button');
  sciTab.textContent = 'Cientifico';
  sciTab.style.cssText = 'flex:1;padding:4px 8px;background:var(--color-surface-hover);color:var(--color-text-secondary);border:none;border-radius:4px;cursor:pointer;font-size:12px;';
  
  tabsDiv.appendChild(basicTab);
  tabsDiv.appendChild(sciTab);
  container.appendChild(tabsDiv);
  
  var basicPage = createKbPage([
    ['7','8','9','÷','⌫'],
    ['4','5','6','×','AC'],
    ['1','2','3','−','+'],
    ['0','.','(','^','='],
    ['x','π','e','√','|x|']
  ]);
  basicPage.id = 'kb-basic';
  container.appendChild(basicPage);
  
  var sciPage = createKbPage([
    ['sin','cos','tan','log','ln'],
    ['asin','acos','atan','log₂','∛'],
    ['ⁿ√','∑','∫','lim','d/dx'],
    ['≤','≥','≠','±','°'],
    ['∞','π','e','√','^']
  ]);
  sciPage.id = 'kb-sci';
  sciPage.style.display = 'none';
  container.appendChild(sciPage);
  
  basicTab.onclick = function() { basicPage.style.display = ''; sciPage.style.display = 'none'; basicTab.style.background = 'var(--color-primary)'; basicTab.style.color = '#fff'; sciTab.style.background = 'var(--color-surface-hover)'; sciTab.style.color = 'var(--color-text-secondary)'; };
  sciTab.onclick = function() { sciPage.style.display = ''; basicPage.style.display = 'none'; sciTab.style.background = 'var(--color-primary)'; sciTab.style.color = '#fff'; basicTab.style.background = 'var(--color-surface-hover)'; basicTab.style.color = 'var(--color-text-secondary)'; };
  
  // Insert after the input
  input.parentNode.insertBefore(container, input.nextSibling);
  input.focus();
}

function createKbPage(rows) {
  var page = document.createElement('div');
  for (var r = 0; r < rows.length; r++) {
    var rowDiv = document.createElement('div');
    rowDiv.style.cssText = 'display:flex;gap:4px;margin-bottom:4px;';
    for (var k = 0; k < rows[r].length; k++) {
      var key = document.createElement('button');
      key.textContent = rows[r][k];
      key.dataset.val = rows[r][k];
      key.style.cssText = 'flex:1;padding:6px 4px;background:var(--color-surface-hover);border:1px solid var(--color-border);border-radius:4px;color:var(--color-text-primary);cursor:pointer;font-size:13px;font-family:sans-serif;text-align:center;';
      key.onmouseover = function() { this.style.background = 'var(--color-primary)'; this.style.color = '#fff'; };
      key.onmouseout = function() { this.style.background = 'var(--color-surface-hover)'; this.style.color = 'var(--color-text-primary)'; };
      key.onclick = kbKeyClick;
      rowDiv.appendChild(key);
    }
    page.appendChild(rowDiv);
  }
  return page;
}

function kbKeyClick() {
  var val = this.dataset.val;
  var input = document.getElementById(_mathKeyboardTarget);
  if (!input) return;
  
  var start = input.selectionStart || input.value.length;
  var end = input.selectionEnd || start;
  
  switch(val) {
    case '⌫':
      if (start === end && start > 0) {
        input.value = input.value.substring(0, start-1) + input.value.substring(end);
        input.setSelectionRange(start-1, start-1);
      } else {
        input.value = input.value.substring(0, start) + input.value.substring(end);
        input.setSelectionRange(start, start);
      }
      break;
    case 'AC':
      input.value = '';
      break;
    case '÷': insertText(input, '/'); break;
    case '×': insertText(input, '*'); break;
    case '−': insertText(input, '-'); break;
    case '√': insertText(input, 'sqrt('); break;
    case '|x|': insertText(input, 'abs('); break;
    case '∛': insertText(input, 'cbrt('); break;
    case 'log₂': insertText(input, 'log2('); break;
    case 'ⁿ√': insertText(input, 'nthroot('); break;
    case 'asin': insertText(input, 'asin('); break;
    case 'acos': insertText(input, 'acos('); break;
    case 'atan': insertText(input, 'atan('); break;
    case 'd/dx': insertText(input, 'deriv('); break;
    default: insertText(input, val); break;
  }
  
  input.focus();
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function insertText(input, text) {
  var start = input.selectionStart || input.value.length;
  var end = input.selectionEnd || start;
  input.value = input.value.substring(0, start) + text + input.value.substring(end);
  input.setSelectionRange(start + text.length, start + text.length);
}

function hideMathKeyboard() {
  var kb = document.getElementById('math-kb-container');
  if (kb) kb.remove();
  _mathKeyboardActive = false;
  _mathKeyboardTarget = null;
}
