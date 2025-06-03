let currentInput = '';
let currentOperation = null;
let firstNumber = null;
let waitingForSecondNumber = false;

const currentValueDisplay = document.getElementById('currentValue');
const previousOperationDisplay = document.getElementById('previousOperation');
const historyList = document.getElementById('historyList');

// 格式化數字顯示
function formatNumber(number) {
    return Number(number).toLocaleString('zh-TW', {
        maximumFractionDigits: 10,
        minimumFractionDigits: 0
    });
}

// 處理數字輸入
function handleNumber(num) {
    if (waitingForSecondNumber) {
        currentInput = num;
        waitingForSecondNumber = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

// 處理運算符號
function handleOperation(operation) {
    if (currentInput === '') return;
    
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
    } else if (currentOperation) {
        calculate();
    }
    
    currentOperation = operation;
    waitingForSecondNumber = true;
    updatePreviousOperation();
}

// 更新顯示
function updateDisplay() {
    currentValueDisplay.textContent = currentInput === '' ? '0' : formatNumber(currentInput);
}

// 更新上一個運算顯示
function updatePreviousOperation() {
    const operationSymbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '÷'
    };
    previousOperationDisplay.textContent = `${formatNumber(firstNumber)} ${operationSymbols[currentOperation]}`;
}

// 清除輸入
function clearInput() {
    currentInput = '';
    currentOperation = null;
    firstNumber = null;
    waitingForSecondNumber = false;
    previousOperationDisplay.textContent = '';
    updateDisplay();
}

// 添加到歷史記錄
function addToHistory(operation, result) {
    const li = document.createElement('li');
    li.textContent = operation;
    historyList.insertBefore(li, historyList.firstChild);
}

// API 調用函數
async function callApi(endpoint, a, b) {
    try {
        const response = await fetch(`/api/calculator/${endpoint}?a=${a}&b=${b}`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('計算出錯');
        return await response.json();
    } catch (error) {
        console.error('API錯誤:', error);
        alert('操作失敗: ' + error.message);
        return null;
    }
}

// 執行計算
async function calculate() {
    if (currentOperation === null || firstNumber === null || currentInput === '') return;
    
    const secondNumber = parseFloat(currentInput);
    const operationSymbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '÷'
    };
    
    const result = await callApi(currentOperation, firstNumber, secondNumber);
    if (result !== null) {
        const operation = `${formatNumber(firstNumber)} ${operationSymbols[currentOperation]} ${formatNumber(secondNumber)} = ${formatNumber(result)}`;
        addToHistory(operation);
        
        currentInput = result.toString();
        firstNumber = null;
        currentOperation = null;
        previousOperationDisplay.textContent = '';
        updateDisplay();
    }
}

// 復原操作
async function undo() {
    try {
        const response = await fetch('/api/calculator/undo', {
            method: 'POST'
        });
        if (!response.ok) throw new Error('復原失敗');
        const result = await response.json();
        
        currentInput = result.toString();
        firstNumber = null;
        currentOperation = null;
        previousOperationDisplay.textContent = '';
        updateDisplay();
        addToHistory('復原操作');
    } catch (error) {
        console.error('復原錯誤:', error);
        alert('復原失敗: ' + error.message);
    }
}

// 重做操作
async function redo() {
    try {
        const response = await fetch('/api/calculator/redo', {
            method: 'POST'
        });
        if (!response.ok) throw new Error('重做失敗');
        const result = await response.json();
        
        currentInput = result.toString();
        firstNumber = null;
        currentOperation = null;
        previousOperationDisplay.textContent = '';
        updateDisplay();
        addToHistory('重做操作');
    } catch (error) {
        console.error('重做錯誤:', error);
        alert('重做失敗: ' + error.message);
    }
} 