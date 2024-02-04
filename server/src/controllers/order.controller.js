const { initStripe } = require("../stripe");
const stripe = initStripe();
const { OrderModel } = require("../models/order.model");

const CLIENT_URL = "http://localhost:5173";

//Getting all successful orders from the database
async function getOrders(req, res) {
    try {
        let ordersFromDB = await OrderModel.find();

        if (!ordersFromDB) {
            return res.status(409).send("Couldn't find any orders in the database");
        }

        res.status(200).send({ ordersFromDB });
    } catch (error) {
        console.error("Error finding orders: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Stripe doesn't hold any products, therefore this function first
//creates a price for Stripe and if it succeds it will create a 
//checkout session. 
async function createCheckoutSession(req, res) {
    try {
        const cartItems = Array.isArray(req.body.cartItems.items)
            ? req.body.cartItems.items
            : [];
        console.log({ cartItems });
        // const cartItems = req.body.cartItems;
        console.log({ cartItems })
        const priceList = await Promise.all(
            cartItems.map(async (item) => {
                try {
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
                } catch (priceError) {
                    console.error("Error creating price: ", priceError);
                    console.error("Price creation error details: ", priceError.raw);
                    throw priceError;
                }
            })
        )

        if (priceList.length === 0) {
            console.error("Cart is empty or problem creating price");
            return res.sendStatus(400);
        }

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

//If the checkout session redirects to the success_url this function will verify the
//payment. And if it's paid it will save the order to the database and fetch 'name' and 
//'email' of the customer from Stripe.
async function verifyPayment(req, res) {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.body.sessionId,
            {
                expand: ["line_items.data"],
            }
        );

        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false, error: "Payment unsuccessful" })
        }

        const line_items = session.line_items && session.line_items.data;

        if (line_items) {
            const products = line_items.map((accessData) => {
                return {
                    product: accessData.description,
                    unitPrice: accessData.price.unit_amount / 100,
                    quantity: accessData.quantity,
                };
            });

            const isDuplicate = await OrderModel.findOne({ sessionId: session.id });
            if (isDuplicate) {
                return res.status(400).json({ message: "Order already exists" })
            };

            const newOrder = {
                customer: [
                    {
                        email: session.customer_details.email,
                        name: session.customer_details.name,
                    }
                ],
                orderItems: products,
                paymentStatus: session.payment_status,
                createdAt: new Date(),
                sessionId: session.id,
                totalPrice: session.amount_total / 100,
            };

            try {
                await OrderModel.create(newOrder);
                res.sendStatus(201);
            } catch (error) {
                console.error("Couldn't save order: ", error);
            }
        }

    } catch (error) {
        console.error("Couldn't save order: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createCheckoutSession, verifyPayment, getOrders };