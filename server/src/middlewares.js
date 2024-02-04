const { ModifierModel, ToppingModel, CategoryModel } = require("./models/recipe.model");

//Function to validate incoming data against a Joi schema
function validate(joiSchema) {
    return (req, res, next) => {
        const validation = joiSchema.validate(req.body);
        console.log({ validation });
        if (!validation.error) return next();
        res.status(400).json(validation.error.message);
    }
}

// Function that create new modifiers if there is no in the database with that name
async function createModifier(req, res, next) {
    const { modifiers } = req.body;
    console.log(modifiers);
    try {
        const existingModifiers = await Promise.all(
            modifiers.map(async (modifier) => {
                const existingModifier = await ModifierModel.findOne({ name: modifier.name });
                if (!existingModifier) {
                    const newModifier = new ModifierModel({ name: modifier.name });
                    await newModifier.save();
                    console.log("Saved a new modifier to database: ", newModifier);
                    return newModifier
                }
                console.log("There is already a modifier with that name, no item created.");
                return existingModifier;
            })
        );
        //Storing existing modifiers to be able to use them in my controllers
        req.existingModifiers = existingModifiers;
        next();
    } catch (error) {
        console.error("Error adding new modifiers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function that create new toppings if there is no in the database with that name
async function createTopping(req, res, next) {
    const { toppings } = req.body;
    try {
        const existingToppings = await Promise.all(
            toppings.map(async (topping) => {
                const existingTopping = await ToppingModel.findOne({ name: topping.name });
                if (!existingTopping) {
                    const newTopping = new ToppingModel({ name: topping.name });
                    await newTopping.save();
                    return newTopping
                }
                return existingTopping;
            })
        );
        //Storing existing toppings to be able to use them in my controllers
        req.existingToppings = existingToppings;
        next();
    } catch (error) {
        console.error("Error adding new toppings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function that create new categories if there is no in the database with that name
async function createCategory(req, res, next) {
    const { category } = req.body;

    try {
        const existingCategory = await CategoryModel.findOne({ name: category });
        if (!existingCategory) {
            const newCategory = new CategoryModel({ name: category });
            await newCategory.save();
            req.existingCategories = newCategory;
        } else {
            req.existingCategories = existingCategory;
        }
        next();
    } catch (error) {
        console.error("Error adding new category: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Generic function to delete items like modifiers, toppings and drinks(everything but recipes)
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

//Generic function to update items like modifiers, toppings and drinks(everything but recipes)
const updateItem = (Model) => async (req, res) => {
    try {
        const updatedItem = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found!" });
        }

        res.status(200).json(updatedItem);
        console.log(updatedItem);

    } catch (error) {
        console.error("Error updating item", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Check if user is logged in by checking if there is a user session
function isLoggedIn(req, res, next) {
    if (!req.session._id) return res.status(401).send("Not logged in!");
    console.log("Is logged in!");
    return next();
}

module.exports = { validate, isLoggedIn, createModifier, createTopping, createCategory, deleteItem, updateItem };