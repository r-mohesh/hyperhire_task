class Transaction {
  constructor(hash, sender, receiver, amount, blockNumber) {
    this.hash = hash;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.blockNumber = blockNumber;
  }
}

module.exports = {
  Transaction,
};
