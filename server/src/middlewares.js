const { ModifierModel, ToppingModel, CategoryModel } = require("./models/recipe.model");

function validate(joiSchema) {
    return (req, res, next) => {
        console.log("Validate Middleware: ", req.body);
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
                console.log("Incoming modifiers: ", modifier);
                const existingModifier = await ModifierModel.findOne({ name: modifier });
                //console.log("Is there a modifier with that name?: ", existingModifier);
                if (!existingModifier) {
                    const newModifier = new ModifierModel({ name: modifier });
                    await newModifier.save();
                    console.log("Saved a new modifier to database: ", newModifier);
                    return newModifier
                }
                console.log("There is already a modifier with that name, no item created.");
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
        if (Array.isArray(toppings)) {
            const existingToppings = await Promise.all(
                toppings.map(async (topping) => {
                    //console.log("Incoming toppings: ", topping.name);
                    const existingTopping = await ToppingModel.findOne({ name: topping });
                    //console.log("Is there a modifier with that name?: ", existingTopping);
                    if (!existingTopping) {
                        const newTopping = new ToppingModel({ name: topping });
                        await newTopping.save();
                        //console.log("Saved a new modifier to database: ", newTopping);
                        return newTopping
                    }
                    //console.log("There is already a topping with that name, no item created.");
                    return existingTopping;
                })
            );
            req.existingToppings = existingToppings;
        } else {
            //console.log("There are no toppings added, so the array is empty!");
            req.existingToppings = [];
        }
        next();
    } catch (error) {
        console.error("Error adding new modifiers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function createCategory(req, res, next) {
    const { category } = req.body;

    try {
        const existingCategory = await CategoryModel.findOne({ name: category });
        if (!existingCategory) {
            const newCategory = new CategoryModel({ name: category });
            await newCategory.save();
            req.existingCategory = newCategory;
        } else {
            req.existingCategories = existingCategory;
        }

        next();
    } catch (error) {
        console.error("Error adding new category: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteItem = (Model) => async (req, res) => {
    try {
        const item = await Model.findOneAndDelete(req.params.name);
        if (!item) {
            return res.status(404).send("Item not found")
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting item", error)
        res.status(500).send("Error deleting item");
    }
}

function isLoggedIn(req, res, next) {
    if (!req.session._id) return res.status(401).send();
    return next();
}

module.exports = { validate, isLoggedIn, createModifier, createTopping, createCategory, deleteItem };