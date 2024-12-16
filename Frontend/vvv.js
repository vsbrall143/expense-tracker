// Add styles to the document (optional if using an external CSS file)
 

// Creating the main container
 

const container = document.createElement('div');
container.className = 'container';

// Header
const header = document.createElement('div');
header.innerText = '11 February 2022';
header.className = 'header';

// Income and Expense Sections
const section = document.createElement('div');
section.className = 'section';

// Income Section
const incomeSection = document.createElement('div');
const incomeTitle = document.createElement('div');
incomeTitle.innerText = 'Income';
incomeTitle.className = 'section-title';

const salary = document.createElement('div');
salary.className = 'item';

const salaryText = document.createElement('span');
salaryText.innerText = 'Salary';

const salaryAmount = document.createElement('span');
salaryAmount.innerText = '$14,500.00';
salaryAmount.className = 'green';

salary.appendChild(salaryText);
salary.appendChild(salaryAmount);
incomeSection.appendChild(incomeTitle);
incomeSection.appendChild(salary);

// Expense Section
const expenseSection = document.createElement('div');
const expenseTitle = document.createElement('div');
expenseTitle.innerText = 'Expense';
expenseTitle.className = 'section-title';

const expenses = [
  { name: 'Health', amount: '400.00' },
  { name: 'Fruits', amount: '45.00' },
  { name: 'Vegetables', amount: '46.00' },
];

// Dynamically create expense items
expenses.forEach(expense => {
  const expenseItem = document.createElement('div');
  expenseItem.className = 'item';

  const itemName = document.createElement('span');
  itemName.innerText = expense.name;

  const itemAmount = document.createElement('span');
  itemAmount.innerText = `$${expense.amount}`;

  expenseItem.appendChild(itemName);
  expenseItem.appendChild(itemAmount);
  expenseSection.appendChild(expenseItem);
});

// Total Expense
const totalExpense = document.createElement('div');
totalExpense.className = 'item';

const totalText = document.createElement('span');
totalText.innerText = 'Total';

const totalAmount = document.createElement('span');
totalAmount.innerText = '$491.00';
totalAmount.className = 'red';

totalExpense.appendChild(totalText);
totalExpense.appendChild(totalAmount);
expenseSection.appendChild(totalExpense);

// Append Income and Expense sections
section.appendChild(incomeSection);
section.appendChild(expenseSection);

// Savings Section
const savings = document.createElement('div');
savings.innerText = 'Savings = $14,009.00';
savings.className = 'savings';

// Append everything to the container
container.appendChild(header);
container.appendChild(section);
container.appendChild(savings);

// Append container to the body
body.appendChild(container);
