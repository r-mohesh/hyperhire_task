const express = require("express");
const EthService = require("../services/ethServices");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ethereum
 *   description: Ethereum-related APIs
 */

/**
 * @swagger
 * /eth/validate-address/{address}:
 *   get:
 *     summary: Validate Ethereum wallet address
 *     tags: [Ethereum]
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         description: Ethereum wallet address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Whether the address is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isValid:
 *                   type: boolean
 */

router.get("/validate-address/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const isValid = await EthService.validateAddress(address);
    res.status(200).json({ isValid });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /eth/create-wallet:
 *   post:
 *     summary: Generate a new Ethereum wallet
 *     tags: [Ethereum]
 *     responses:
 *       201:
 *         description: Successfully generated a new wallet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   description: Ethereum wallet address
 */
router.post("/create-wallet", async (req, res) => {
  try {
    const wallet = await EthService.createWallet();
    res.status(201).json({ address: wallet.address });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /eth/latest-transactions:
 *   get:
 *     summary: Get the latest 1000 Ethereum transactions sorted by ether amount
 *     tags: [Ethereum]
 *     responses:
 *       200:
 *         description: List of latest transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       hash:
 *                         type: string
 *                       sender:
 *                         type: string
 *                       receiver:
 *                         type: string
 *                       amount:
 *                         type: string
 *                       blockNumber:
 *                         type: number
 */
router.get("/latest-transactions", async (req, res) => {
  try {
    const transactions = await EthService.getLatestTransactions();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
