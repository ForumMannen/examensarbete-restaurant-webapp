const express = require("express");
const { createCheckoutSession, verifyPayment, getOrders } = require("../controllers/order.controller");

const orderRouter = express
    .Router()
    .get("/get-orders", getOrders)
    .post("/create-checkout-session", createCheckoutSession)
    .post("/verify-payment", verifyPayment);

module.exports = { orderRouter };