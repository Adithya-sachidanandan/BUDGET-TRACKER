

let totalExpense = 0;
let totalIncome = 0;
let balance = 0;

function addExpense() {
    const expenseDescription = document.getElementById('expense').value;
    const expenseAmount = parseFloat(document.getElementById('amount').value);
    totalExpense += expenseAmount;

    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.textContent = `${expenseDescription}: $${expenseAmount.toFixed(2)}`;
    expenseList.appendChild(li);

    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    updateBalance();
}

function addIncome() {
    const incomeDescription = document.getElementById('income').value;
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
    totalIncome += incomeAmount;

    const incomeList = document.getElementById('incomeList');
    const li = document.createElement('li');
    li.textContent = `${incomeDescription}: $${incomeAmount.toFixed(2)}`;
    incomeList.appendChild(li);

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    updateBalance();
}

function updateBalance() {
    balance = totalIncome - totalExpense;
    document.getElementById('balance').textContent = balance.toFixed(2);
}
firebase.initializeApp(firebaseConfig);

// Reference to Firestore database
const db = firebase.firestore();

// Function to add expense to Firestore
function addExpenseToFirestore(expenseDescription, expenseAmount) {
    // Add expense to Firestore
    db.collection("expenses").add({
        description: expenseDescription,
        amount: expenseAmount
    })
    .then(() => {
        console.log("Expense added successfully");
        // Refresh the UI or perform any other necessary updates
        updateUI();
    })
    .catch((error) => {
        console.error("Error adding expense: ", error);
    });
}

// Function to add income to Firestore
function addIncomeToFirestore(incomeDescription, incomeAmount) {
    // Add income to Firestore
    db.collection("income").add({
        description: incomeDescription,
        amount: incomeAmount
    })
    .then(() => {
        console.log("Income added successfully");
        // Refresh the UI or perform any other necessary updates
        updateUI();
    })
    .catch((error) => {
        console.error("Error adding income: ", error);
    });
}

// Function to update UI after adding expense or income
function updateUI() {
    // You can update UI elements here as needed
}

// Function to initialize the app
function init() {
    // Event listeners for adding expense and income
    document.getElementById('addExpenseBtn').addEventListener('click', function() {
        const expenseDescription = document.getElementById('expense').value;
        const expenseAmount = parseFloat(document.getElementById('amount').value);
        totalExpense += expenseAmount;
        addExpenseToFirestore(expenseDescription, expenseAmount);
    });

    document.getElementById('addIncomeBtn').addEventListener('click', function() {
        const incomeDescription = document.getElementById('income').value;
        const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
        totalIncome += incomeAmount;
        addIncomeToFirestore(incomeDescription, incomeAmount);
    });
}

// Call the init function to initialize the app
init();