const express = require("express");
const bodyParser = require("body-parser");
const ethController = require("./controllers/ethController");
const binanceController = require("./controllers/binanceController");
const dotenv = require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Blockchain API Documentation",
      version: "1.0.0",
      description: "API endpoints for blockchain-related tasks",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/eth", ethController);
app.use("/binance", binanceController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
