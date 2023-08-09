const ccxt = require("ccxt");

class BinanceService {
  static async getTradableCoins() {
    const exchange = new ccxt.binance();
    const markets = await exchange.loadMarkets();
    const tradableCoins = Object.keys(markets);
    return tradableCoins;
  }

  static async getAveragePrices() {
    const exchange = new ccxt.binance();
    const symbols = await exchange.fetchMarkets();

    const averagePrices = [];
    for (const symbol of symbols) {
      const trades = await exchange.fetchTrades(symbol.symbol, undefined, 100);
      const prices = trades.map((trade) => parseFloat(trade.price));
      const averagePrice =
        prices.reduce((sum, price) => sum + price, 0) / prices.length;

      averagePrices.push({
        symbol: symbol.symbol,
        averagePrice: averagePrice.toFixed(8),
      });
    }

    return averagePrices;
  }
}

module.exports = BinanceService;
