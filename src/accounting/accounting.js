class Accounting {
  constructor() {
    this.balance = 1000.00;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount');
    }
    this.balance += amount;
    return this.balance;
  }

  debit(amount) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      throw new Error('Invalid amount');
    }
    if (this.balance >= amount) {
      this.balance -= amount;
      return this.balance;
    } else {
      throw new Error('Insufficient funds for this debit.');
    }
  }
}

module.exports = Accounting;