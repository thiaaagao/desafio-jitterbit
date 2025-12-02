const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    info: {
      title: "Desafio Jitterbit API",
      version: "1.0.0",
      description: "CRUD de pedidos com MongoDB Atlas",
    },
  },
  apis: ["./desafio-api-jitterbit.js"], // onde estão os endpoints
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
