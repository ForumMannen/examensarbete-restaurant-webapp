const { initStripe } = require("../stripe");
const stripe = initStripe();

const CLIENT_URL = "http://localhost:5173";

async function createCheckoutSession(req, res) {
    try {
        console.log(req.body);

        const cartItems = Array.isArray(req.body.cartItems.items)
            ? req.body.cartItems.items
            : [];

        const priceList = await Promise.all(
            cartItems.map(async (item) => {
                const price = await stripe.prices.create({
                    unit_amount: item.price * 100,
                    currency: "sek",
                    product_data: {
                        name: item.productName,
                    },
                });
                return {
                    price: price.id,
                    quantity: item.quantity,
                }
            })
        )
        const session = await stripe.checkout.sessions.create({
            line_items: priceList,
            mode: "payment",
            success_url: `${CLIENT_URL}/success`,
            cancel_url: CLIENT_URL,
        });

        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}

module.exports = { createCheckoutSession };