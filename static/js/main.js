// Updates the calculator display with the human-friendly expression
function updateDisplay() {
    let displayDiv = document.querySelector('#display');
    if (displayedExpression === '') {
        displayDiv.innerHTML = '&nbsp;';
    } else {
        displayDiv.innerHTML = displayedExpression;
    }
}

// Adds a regular symbol to both expression and displayedExpression
function typeSymbol(symbol) {
    console.log('Symbol pressed:', symbol);
    expression = expression + symbol;
    displayedExpression = displayedExpression + symbol;
    document.querySelector('#error').innerHTML = '&nbsp;';
    updateDisplay();
}

// Adds a symbol with a human-friendly label (e.g. * shows as ×)
function typeSpecialSymbol(symbol, label) {
    console.log('Special symbol pressed:', symbol, 'shown as:', label);
    expression = expression + symbol;
    displayedExpression = displayedExpression + label;
    document.querySelector('#error').innerHTML = '&nbsp;';
    updateDisplay();
}

// Clears everything
function clearExpression() {
    expression = '';
    displayedExpression = '';
    result = null;
    document.querySelector('#error').innerHTML = '&nbsp;';
    updateDisplay();
}

// Deletes the last typed character (handles special symbols correctly)
function backspace() {
    if (expression === '') return;

    let lastChar = _getLastCharacter(displayedExpression);
    let exprLength = 1;
    let dispLength = 1;

    if (lastChar === '²') {
        exprLength = 3; // **2
        dispLength = 2; // x²
    } else if (lastChar === '³') {
        exprLength = 3; // **3
        dispLength = 2; // x³
    } else if (lastChar === '%') {
        exprLength = 5; // *0.01
        dispLength = 1;
    } else if (lastChar === '‰') {
        exprLength = 7; // *0.0001
        dispLength = 1;
    } else if (lastChar === '÷') {
        exprLength = 1; // /
        dispLength = 1;
    } else if (lastChar === '×') {
        exprLength = 1; // *
        dispLength = 1;
    }

    expression = _removeLastCharacters(expression, exprLength);
    displayedExpression = _removeLastCharacters(displayedExpression, dispLength);
    updateDisplay();
}

// Shows the current result in the display without adding to receipt
function showResult() {
    if (result !== null) {
        expression = String(result);
        displayedExpression = String(result);
        updateDisplay();
    }
}

// Called by execute() in utils.js when calculation succeeds
function addToReceipt() {
    let receiptDiv = document.querySelector('#receipt_contents');
    receiptDiv.innerHTML = receiptDiv.innerHTML +
        '<div>' + displayedExpression + ' = <strong>' + result + '</strong></div>';

    expression = String(result);
    displayedExpression = String(result);
    updateDisplay();
}

// Called by execute() in utils.js when an error occurs
function showError(errorMessage) {
    document.querySelector('#error').innerHTML = '⚠ ' + errorMessage;
}
