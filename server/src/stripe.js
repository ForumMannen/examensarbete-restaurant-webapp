require("dotenv").config();

//Initialize Stripe
const initStripe = () => {
    const Stripe = require("stripe");
    return Stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { initStripe }