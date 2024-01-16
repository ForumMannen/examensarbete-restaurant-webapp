const { ModifierModel, ToppingModel } = require("./models/recipe.model");

function validate(joiSchema) {
    return (req, res, next) => {
        console.log(req.body);
        const validation = joiSchema.validate(req.body);
        if (!validation.error) return next();
        res.status(400).json(validation.error.message);
    }
}

async function createModifier(req, res, next) {
    const { modifiers } = req.body;

    try {
        const existingModifiers = await Promise.all(
            modifiers.map(async (modifier) => {
                console.log("Creating modifier:", modifier.name);
                const existingModifier = await ModifierModel.findOne({ name: modifier.name });
                if (!existingModifier) {
                    const newModifier = new ModifierModel({ name: modifier.name });
                    await newModifier.save();
                    return newModifier
                }
                return existingModifier;
            })
        );
        req.existingModifiers = existingModifiers;
        next();
    } catch (error) {
        console.error("Error adding new modifiers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function createTopping(req, res, next) {
    const { toppings } = req.body;

    try {
        const existingToppings = await Promise.all(
            toppings.map(async (topping) => {
                console.log("Creating topping:", topping.name);
                const existingTopping = await ToppingModel.findOne({ name: topping.name });
                if (!existingTopping) {
                    const newTopping = new ToppingModel({ name: topping.name });
                    await newTopping.save();
                    return newTopping
                }
                return existingTopping;
            })
        );
        req.existingToppings = existingToppings;
        next();
    } catch (error) {
        console.error("Error adding new modifiers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteItem = (Model) => async (req, res) => {
    try {
        const item = await Model.findOneAndDelete({ _id: req.params.id });
        if (!item) {
            return res.status(404).send("Item not found")
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Error deleting item");
    }
}

function isLoggedIn(req, res, next) {
    if (!req.session._id) return res.status(401).send();
    return next();
}

module.exports = { validate, isLoggedIn, createModifier, createTopping, deleteItem };