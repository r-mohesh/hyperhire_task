const ethers = require("ethers");
const { Transaction } = require("../entity/models");

class EthService {
  static async validateAddress(address) {
    return ethers.utils.isAddress(address);
  }

  static async createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
  }

  static async getLatestTransactions() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-mainnet.g.alchemy.com/v2/xUp81O4dLORvRSCn2dA_9BIKrufxoDFp"
    );

    const latestBlockNumber = await provider.getBlockNumber();
    const startBlock = latestBlockNumber - 1000;

    const transactions = [];

    for (
      let blockNumber = latestBlockNumber;
      blockNumber > startBlock;
      blockNumber--
    ) {
      const block = await provider.getBlockWithTransactions(blockNumber);

      for (const tx of block.transactions) {
        if (tx.value.gt(0)) {
          const transaction = new Transaction(
            tx.hash,
            tx.from,
            tx.to,
            ethers.utils.formatEther(tx.value),
            blockNumber
          );

          transactions.push(transaction);
        }
      }
    }

    transactions.sort((a, b) => b.amount - a.amount);

    return transactions;
  }
}

module.exports = EthService;
