const express = require("express");
const { createCheckoutSession } = require("../controllers/order.controller");

const orderRouter = express
    .Router()
    .post("/create-checkout-session", createCheckoutSession);

module.exports = { orderRouter };