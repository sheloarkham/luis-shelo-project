// Estructuras para almacenar los diferentes tipos de gastos
let expenses = []; // Gastos generales
let crmExpenses = []; // Gastos de CRM
let futureCrmExpenses = []; // Gastos futuros de CRM
let junaebExpenses = []; // Gastos de tarjeta JUNAEB (independiente)
console.log('Presupuestos.js cargado correctamente');

// Función de prueba
function testFunction() {
    alert('¡La función funciona!');
    console.log('Función de prueba ejecutada');
}

// Cargar todos los gastos del localStorage
function loadAllExpenses() {
    const savedExpenses = localStorage.getItem('october-expenses');
    const savedCrmExpenses = localStorage.getItem('october-crm-expenses');
    const savedFutureCrmExpenses = localStorage.getItem('october-future-crm-expenses');
    const savedJunaebExpenses = localStorage.getItem('october-junaeb-expenses');
    
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
    if (savedCrmExpenses) {
        crmExpenses = JSON.parse(savedCrmExpenses);
    }
    if (savedFutureCrmExpenses) {
        futureCrmExpenses = JSON.parse(savedFutureCrmExpenses);
    }
    if (savedJunaebExpenses) {
        junaebExpenses = JSON.parse(savedJunaebExpenses);
    }
    
    renderAllExpenses();
    updateAllTotals();
}

// Guardar todos los gastos en localStorage
function saveAllExpenses() {
    localStorage.setItem('october-expenses', JSON.stringify(expenses));
    localStorage.setItem('october-crm-expenses', JSON.stringify(crmExpenses));
    localStorage.setItem('october-future-crm-expenses', JSON.stringify(futureCrmExpenses));
    localStorage.setItem('october-junaeb-expenses', JSON.stringify(junaebExpenses));
}

// Función genérica para agregar gastos
function addExpenseToCategory(nameInputId, amountInputId, expenseArray, renderFunction, updateFunction) {
    const nameInput = document.getElementById(nameInputId);
    const amountInput = document.getElementById(amountInputId);
    
    const name = nameInput ? nameInput.value.trim() : '';
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    
    if (name && !isNaN(amount) && amount > 0) {
        expenseArray.push({
            id: Date.now(),
            name: name,
            amount: amount,
            date: new Date().toLocaleDateString()
        });
        
        nameInput.value = '';
        amountInput.value = '';
        
        saveAllExpenses();
        renderFunction();
        updateFunction();
        updateGlobalTotal();
    } else {
        alert('Por favor, ingresa un nombre y una cantidad válida');
    }
}

// Funciones específicas para cada categoría
function addExpense() {
    addExpenseToCategory('expense-name', 'expense-amount', expenses, renderExpenses, updateTotal);
}

function addCrmExpense() {
    addExpenseToCategory('crm-expense-name', 'crm-expense-amount', crmExpenses, renderCrmExpenses, updateCrmTotal);
}

function addFutureCrmExpense() {
    const nameInput = document.getElementById('future-crm-expense-name');
    const amountInput = document.getElementById('future-crm-expense-amount');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    
    if (name && !isNaN(amount) && amount > 0) {
        futureCrmExpenses.push({
            id: Date.now(),
            name: name,
            amount: amount,
            date: new Date().toLocaleDateString()
        });
        
        nameInput.value = '';
        amountInput.value = '';
        
        saveAllExpenses();
        renderFutureCrmExpenses();
        updateFutureCrmTotal();
        // No actualizamos el global total porque son gastos planificados
    } else {
        alert('Por favor, ingresa un nombre y una cantidad válida');
    }
}

// Funciones genéricas para eliminar gastos
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveAllExpenses();
    renderExpenses();
    updateTotal();
    updateGlobalTotal();
}

function deleteCrmExpense(id) {
    crmExpenses = crmExpenses.filter(expense => expense.id !== id);
    saveAllExpenses();
    renderCrmExpenses();
    updateCrmTotal();
    updateGlobalTotal();
}

function deleteFutureCrmExpense(id) {
    futureCrmExpenses = futureCrmExpenses.filter(expense => expense.id !== id);
    saveAllExpenses();
    renderFutureCrmExpenses();
    updateFutureCrmTotal();
    // No actualizamos el global total porque los gastos futuros no se incluyen
}

function deleteJunaebExpense(id) {
    junaebExpenses = junaebExpenses.filter(expense => expense.id !== id);
    saveAllExpenses();
    renderJunaebExpenses();
    updateJunaebTotal();
    // No actualizamos el global total porque JUNAEB es independiente
}

// Funciones de renderizado
function renderExpenses() {
    renderExpenseList('expenses-list', expenses, 'deleteExpense');
}

function renderCrmExpenses() {
    renderExpenseList('crm-expenses-list', crmExpenses, 'deleteCrmExpense');
}

function renderFutureCrmExpenses() {
    renderExpenseList('future-crm-expenses-list', futureCrmExpenses, 'deleteFutureCrmExpense');
}

function renderExpenseList(containerId, expenseArray, deleteFunction) {
    const expensesList = document.getElementById(containerId);
    if (!expensesList) return;
    
    expensesList.innerHTML = '';
    
    expenseArray.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        expenseElement.innerHTML = `
            <span class="expense-name">${expense.name}</span>
            <span class="expense-date">${expense.date}</span>
            <span class="expense-amount">$${expense.amount.toLocaleString('es-CL')} CLP</span>
            <button class="delete-btn" onclick="${deleteFunction}(${expense.id})">×</button>
        `;
        expensesList.appendChild(expenseElement);
    });
}

function renderAllExpenses() {
    renderExpenses();
    renderCrmExpenses();
    renderFutureCrmExpenses();
    renderJunaebExpenses();
}

// Funciones de actualización de totales
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const element = document.getElementById('total-amount');
    if (element) element.textContent = total.toLocaleString('es-CL');
}

function updateCrmTotal() {
    const total = crmExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const element = document.getElementById('crm-total-amount');
    if (element) element.textContent = total.toLocaleString('es-CL');
}

function updateFutureCrmTotal() {
    const total = futureCrmExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const element = document.getElementById('future-crm-total-amount');
    if (element) element.textContent = total.toLocaleString('es-CL');
}

function updateAllTotals() {
    updateTotal();
    updateCrmTotal();
    updateFutureCrmTotal();
    updateJunaebTotal();
    updateGlobalTotal();
}

function updateGlobalTotal() {
    const generalTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const crmTotal = crmExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    // Los gastos futuros NO se suman al total global (solo para planificación)
    const globalTotal = generalTotal + crmTotal;
    
    const summaryGeneral = document.getElementById('summary-general');
    const summaryCrm = document.getElementById('summary-crm');
    const globalTotalElement = document.getElementById('global-total');
    
    if (summaryGeneral) summaryGeneral.textContent = generalTotal.toLocaleString('es-CL');
    if (summaryCrm) summaryCrm.textContent = crmTotal.toLocaleString('es-CL');
    if (globalTotalElement) globalTotalElement.textContent = globalTotal.toLocaleString('es-CL');
    
    // Actualizar las listas detalladas
    updateSummaryLists();
}

// Función para actualizar las listas detalladas en el resumen
function updateSummaryLists() {
    updateSummaryExpensesList('summary-general-list', expenses, 'No hay gastos generales registrados');
    updateSummaryExpensesList('summary-crm-list', crmExpenses, 'No hay gastos CRM registrados');
}

// Función genérica para renderizar listas en el resumen
function updateSummaryExpensesList(containerId, expenseArray, emptyMessage) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (expenseArray.length === 0) {
        container.innerHTML = `<p class="no-expenses">${emptyMessage}</p>`;
        return;
    }
    
    container.innerHTML = '';
    
    expenseArray.forEach(expense => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'summary-expense-item';
        expenseElement.innerHTML = `
            <span class="summary-expense-name">${expense.name}</span>
            <span class="summary-expense-date">${expense.date}</span>
            <span class="summary-expense-amount">$${expense.amount.toLocaleString('es-CL')}</span>
        `;
        container.appendChild(expenseElement);
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando...');
    loadAllExpenses();
    
    // Event listeners para gastos generales
    const addButton = document.getElementById('add-expense-btn');
    if (addButton) addButton.addEventListener('click', addExpense);
    
    // Event listeners para gastos CRM
    const addCrmButton = document.getElementById('add-crm-expense-btn');
    if (addCrmButton) addCrmButton.addEventListener('click', addCrmExpense);
    
    // Event listeners para gastos futuros CRM
    const addFutureCrmButton = document.getElementById('add-future-crm-expense-btn');
    if (addFutureCrmButton) addFutureCrmButton.addEventListener('click', addFutureCrmExpense);
    
    // Event listeners para gastos JUNAEB
    const addJunaebButton = document.getElementById('add-junaeb-expense-btn');
    if (addJunaebButton) addJunaebButton.addEventListener('click', addJunaebExpense);
    
    // Event listeners para tecla Enter en todos los inputs
    addEnterKeyListeners('expense-name', 'expense-amount', addExpense);
    addEnterKeyListeners('crm-expense-name', 'crm-expense-amount', addCrmExpense);
    addEnterKeyListeners('future-crm-expense-name', 'future-crm-expense-amount', addFutureCrmExpense);
    addEnterKeyListeners('junaeb-expense-name', 'junaeb-expense-amount', addJunaebExpense);
});

function addEnterKeyListeners(nameInputId, amountInputId, addFunction) {
    const nameInput = document.getElementById(nameInputId);
    const amountInput = document.getElementById(amountInputId);
    
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (amountInput) amountInput.focus();
            }
        });
    }
    
    if (amountInput) {
        amountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addFunction();
            }
        });
    }
}

// ============= FUNCIONES ESPECÍFICAS PARA JUNAEB =============

// Renderizar gastos de JUNAEB
function renderJunaebExpenses() {
    renderExpenseList('junaeb-expenses-list', junaebExpenses, 'deleteJunaebExpense');
    updateJunaebTotal();
}

// Agregar gasto JUNAEB
function addJunaebExpense() {
    const nameInput = document.getElementById('junaeb-expense-name');
    const amountInput = document.getElementById('junaeb-expense-amount');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    
    if (name && !isNaN(amount) && amount > 0) {
        junaebExpenses.push({
            id: Date.now(),
            name: name,
            amount: amount,
            date: new Date().toLocaleDateString('es-CL')
        });
        
        if (nameInput) nameInput.value = '';
        if (amountInput) amountInput.value = '';
        
        renderJunaebExpenses();
        saveAllExpenses();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

// Función para actualizar el total de JUNAEB
function updateJunaebTotal() {
    const total = junaebExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const element = document.getElementById('junaeb-total-amount');
    if (element) element.textContent = total.toLocaleString('es-CL');
}