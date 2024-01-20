const express = require("express");
const { createCheckoutSession, verifyPayment } = require("../controllers/order.controller");

const orderRouter = express
    .Router()
    .post("/create-checkout-session", createCheckoutSession)
    .post("/verify-payment", verifyPayment);

module.exports = { orderRouter };