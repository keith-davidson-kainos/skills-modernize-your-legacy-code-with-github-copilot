const Accounting = require('./accounting');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const acc = new Accounting();

function viewBalance() {
  console.log(`Current balance: ${acc.getBalance().toFixed(2)}`);
}

function creditAccount() {
  rl.question('Enter credit amount: ', (amount) => {
    try {
      amount = parseFloat(amount);
      acc.credit(amount);
      console.log(`Amount credited. New balance: ${acc.getBalance().toFixed(2)}`);
    } catch (e) {
      console.log(e.message);
    }
    mainMenu();
  });
}

function debitAccount() {
  rl.question('Enter debit amount: ', (amount) => {
    try {
      amount = parseFloat(amount);
      acc.debit(amount);
      console.log(`Amount debited. New balance: ${acc.getBalance().toFixed(2)}`);
    } catch (e) {
      console.log(e.message);
    }
    mainMenu();
  });
}

function mainMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', (choice) => {
    choice = parseInt(choice);
    switch(choice) {
      case 1:
        viewBalance();
        mainMenu();
        break;
      case 2:
        creditAccount();
        break;
      case 3:
        debitAccount();
        break;
      case 4:
        console.log('Exiting the program. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        mainMenu();
    }
  });
}

mainMenu();