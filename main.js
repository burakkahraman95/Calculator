// Receipt Calculator - main.js

var formula = "";
var entryCount = 0;

function updateScreen() {
  var screenEl = document.getElementById("screen");

  if (formula === "") {
    screenEl.innerHTML = '<span class="screen-placeholder" id="placeholder">0</span>';
  } else {
    screenEl.textContent = formula;
  }
}

function setError(msg) {
  document.getElementById("error-msg").textContent = msg;
}

function clearError() {
  document.getElementById("error-msg").textContent = "";
}

function append(value) {
  clearError();
  formula += value;
  updateScreen();
}

function clearFormula() {
  clearError();
  formula = "";
  updateScreen();
}

function backspace() {
  clearError();
  formula = formula.slice(0, -1);
  updateScreen();
}

function evaluateFormula() {
  if (formula.trim() === "") return;

  var result;
  try {
    result = Function('"use strict"; return (' + formula + ")")();
  } catch (e) {
    setError("Invalid expression");
    return;
  }

  if (typeof result !== "number" || !isFinite(result)) {
    setError("Invalid expression");
    return;
  }

  var rounded = parseFloat(result.toPrecision(12)).toString();
  addReceiptEntry(formula, rounded);
  clearError();
}

function addReceiptEntry(expr, result) {
  var receiptEl = document.getElementById("receipt");
  var emptyEl = document.getElementById("receipt-empty");

  if (emptyEl) {
    emptyEl.remove();
  }

  var entry = document.createElement("div");
  entry.className = "receipt-entry";

  var formulaSpan = document.createElement("span");
  formulaSpan.className = "receipt-formula";
  formulaSpan.textContent = expr;

  var equalsSpan = document.createElement("span");
  equalsSpan.className = "receipt-equals";
  equalsSpan.textContent = "=";

  var resultSpan = document.createElement("span");
  resultSpan.className = "receipt-result";
  resultSpan.textContent = result;

  entry.appendChild(formulaSpan);
  entry.appendChild(equalsSpan);
  entry.appendChild(resultSpan);
  receiptEl.appendChild(entry);

  receiptEl.scrollTop = receiptEl.scrollHeight;

  entryCount++;
  document.getElementById("entry-count").textContent = entryCount;
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    evaluateFormula();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    backspace();
  } else if (e.key === "Escape") {
    clearFormula();
  } else if (/^[0-9+\-*/.()]$/.test(e.key)) {
    append(e.key);
  }
});
