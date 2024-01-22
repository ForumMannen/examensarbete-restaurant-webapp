const { ModifierModel, ToppingModel, RecipeModel, DrinkModel } = require("../models/recipe.model");

async function getDashboardData(req, res) {
    try {
        let recipesFromDB = await RecipeModel.find();
        let modifiersFromDB = await ModifierModel.find();
        let toppingsFromDB = await ToppingModel.find();
        let drinksFromDB = await DrinkModel.find();

        if (!recipesFromDB) {
            return res.status(409).send("Couldn't find recipes from database")
        }

        if (!modifiersFromDB) {
            return res.status(409).send("Couldn't find modifiers from database")
        }

        if (!toppingsFromDB) {
            return res.status(409).send("Couldn't find toppings from database")
        }

        if (!drinksFromDB) {
            return res.status(409).send("Couldn't find drinks from database")
        }

        res.status(200).send({ recipesFromDB, modifiersFromDB, toppingsFromDB, drinksFromDB });
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllDrinks(req, res) {
    try {
        let drinksFromDB = await DrinkModel.find();

        if (!drinksFromDB) {
            return res.status(409).json("Couldn't find drinks from database")
        }

        res.status(200).send({ drinksFromDB });
    } catch (error) {
        console.error("Error adding drinks: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function addModifier(req, res) {
    let { name } = req.body;

    try {
        let modifier = await ModifierModel.findOne({ name });
        if (modifier) {
            return res.sendStatus(409);
        }

        modifier = new ModifierModel(req.body);
        await modifier.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function addTopping(req, res) {
    let { name } = req.body;

    try {
        let topping = await ToppingModel.findOne({ name });
        if (topping) {
            return res.sendStatus(409);
        }
        topping = new ToppingModel(req.body);
        await topping.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function addRecipe(req, res) {
    const { name, modifiers, toppings, category, price } = req.body;
    try {
        console.log(name, modifiers, toppings, category, price);
        const recipeExists = await RecipeModel.findOne({ name });
        if (recipeExists) {
            return res.status(409).send("A recipe with that name already exists");
        }
        const sortedModifiers = modifiers.slice().sort((a, b) => {
            if (a.name < b.name) return -1;
            return 1;
        });
        console.log("Sorterad modifiers: ", sortedModifiers);
        const allRecipesModifiers = await RecipeModel.find({}, { _id: 0, modifiers: 1 });

        let recipeDuplicatesExist = false;

        allRecipesModifiers.forEach((recipe) => {
            const sortedModifiersFromDB = recipe.modifiers.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1;
            })
            console.log("Sorterade recipes from DB: ", sortedModifiersFromDB);
            if (
                sortedModifiers.length === sortedModifiersFromDB.length &&
                sortedModifiers.every((value, index) => {
                    return (
                        value.name === sortedModifiersFromDB[index].name &&
                        value.value === sortedModifiersFromDB[index].value
                    );
                })
            ) {
                recipeDuplicatesExist = true;
            }
        })
        console.log(recipeDuplicatesExist);
        if (recipeDuplicatesExist) {
            return res.status(409).send("A recipe with that ingredients already exists");
        }

        const recipe = new RecipeModel({
            name,
            modifiers,
            toppings,
            category,
            price
        });
        await recipe.save();

        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding recipe: ", error);
    }
}

async function addDrink(req, res) {
    let { name, volume, description, price } = req.body;

    try {
        const drink = await DrinkModel.findOne({ name, volume });
        if (drink) {
            return res.sendStatus(409);
        }
        const newDrink = new DrinkModel({ name, volume, description, price });
        await newDrink.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding modifier: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getDashboardData, getAllDrinks, addModifier, addTopping, addRecipe, addDrink }