const mongoose = require("mongoose");
const { app } = require("./app");
require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}