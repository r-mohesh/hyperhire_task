const express = require("express");
const BinanceService = require("../services/binanceService");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Binance
 *   description: Binance-related APIs
 */

/**
 * @swagger
 * /binance/tradable-coins:
 *   get:
 *     summary: Get the list of coins tradable on Binance
 *     tags: [Binance]
 *     responses:
 *       200:
 *         description: List of tradable coins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tradableCoins:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/tradable-coins", async (req, res) => {
  try {
    const tradableCoins = await BinanceService.getTradableCoins();
    res.status(200).json({ tradableCoins });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /binance/average-prices:
 *   get:
 *     summary: Get the average prices of coins on Binance
 *     tags: [Binance]
 *     responses:
 *       200:
 *         description: List of average prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averagePrices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       symbol:
 *                         type: string
 *                       averagePrice:
 *                         type: string
 */
router.get("/average-prices", async (req, res) => {
  try {
    const averagePrices = await BinanceService.getAveragePrices();
    res.status(200).json({ averagePrices });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
