// Calculator functionality
let display = document.getElementById("user-input");
let historyDisplay = document.getElementById("history");
let input = "0";
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;
let expression = ""; // full expression string shown in history

// Number buttons (0-9) – use displayed text rather than id to avoid NaN
// buttons have numeric labels, so read innerText.
document.querySelectorAll(".cals-btn").forEach((btn) => {
  const val = btn.innerText.trim();
  if (/^[0-9]$/.test(val)) {
    btn.addEventListener("click", () => appendNumber(val));
  }
});

// Decimal button
document.getElementById("decimal").addEventListener("click", () => {
  appendDecimal();
});

// Operator buttons
document.getElementById("add").addEventListener("click", () => {
  setOperator("+");
});

document.getElementById("subtract").addEventListener("click", () => {
  setOperator("-");
});

document.getElementById("multiply").addEventListener("click", () => {
  setOperator("×");
});

document.getElementById("divide").addEventListener("click", () => {
  setOperator("÷");
});

// Percent button
const pctBtn = document.getElementById("percent");
if (pctBtn) {
  pctBtn.addEventListener("click", () => {
    applyPercent();
  });
}

// Sign toggle button
const signBtn = document.getElementById("posneg");
if (signBtn) {
  signBtn.addEventListener("click", () => {
    toggleSign();
  });
}

// Equals button
document.getElementById("equal").addEventListener("click", () => {
  calculateResult();
});

// Clear button
document.getElementById("clear").addEventListener("click", () => {
  clearDisplay();
});

// Backspace button
document.getElementById("backspace").addEventListener("click", () => {
  backspace();
});

function appendNumber(num) {
  // `num` may be string from button innerText; ensure it's a digit.
  num = String(num);
  if (!/^[0-9]$/.test(num)) return;

  if (shouldResetDisplay) {
    // start fresh when flag is set (standard calculator behavior)
    input = num;
    shouldResetDisplay = false;
    expression = num; // reset history expression with new digit
  } else {
    // normal typing
    input = input === "0" ? num : input + num;
    expression += num;
  }

  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    input = "0.";
    shouldResetDisplay = false;
  } else if (!input.includes(".")) {
    input += ".";
  }
  expression += ".";
  updateDisplay();
}

function setOperator(op) {
  // if current display shows an error, reset before proceeding
  if (input === "Error") {
    clearDisplay();
  }

  // avoid multiple operators in a row
  if (operator !== null && !shouldResetDisplay) {
    calculateResult();
  }

  previousValue = parseFloat(input);
  operator = op;
  shouldResetDisplay = true;

  // append operator symbol to expression
  expression += ` ${op} `;
  updateDisplay();
}

function applyPercent() {
  let value = parseFloat(input);
  if (isNaN(value)) return;
  value = value / 100;
  input = String(value);
  expression += "%";
  updateDisplay();
  shouldResetDisplay = true;
}

function toggleSign() {
  if (input === "0" || input === "Error") return;
  if (input.startsWith("-")) {
    input = input.slice(1);
  } else {
    input = "-" + input;
  }
  // don't modify expression, just reflect sign on current value
  updateDisplay();
}

function calculateResult() {
  if (operator === null || previousValue === null) {
    return;
  }

  let currentValue = parseFloat(input);

  // guard against NaN values (could happen after an error)
  if (isNaN(previousValue) || isNaN(currentValue)) {
    clearDisplay();
    return;
  }

  let result;

  switch (operator) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "×":
      result = previousValue * currentValue;
      break;
    case "÷":
      if (currentValue === 0) {
        result = "Error";
        break;
      }
      result = previousValue / currentValue;
      break;
    default:
      return;
  }

  // final computation completed; just display result and clear history
  input = String(result);
  expression = "";
  updateDisplay();

  operator = null;
  previousValue = null;
  shouldResetDisplay = true;
}

function clearDisplay() {
  input = "0";
  operator = null;
  previousValue = null;
  shouldResetDisplay = false;
  expression = "";
  updateDisplay();
}

function backspace() {
  if (input.length === 1) {
    input = "0";
  } else {
    input = input.slice(0, -1);
  }
  // remove last character from expression as well
  expression = expression.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  // update history
  historyDisplay.innerText = expression;

  // simply show input value; if it's too long, trim to last 15 chars
  let displayValue = input;
  if (displayValue.length > 15) {
    displayValue = displayValue.slice(-15);
  }
  display.innerText = displayValue;
}

// Initialize display
updateDisplay();
