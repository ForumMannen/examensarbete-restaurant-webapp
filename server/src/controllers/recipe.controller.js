const { ModifierModel, ToppingModel, RecipeModel, DrinkModel, CategoryModel } = require("../models/recipe.model");

async function getDashboardData(req, res) {
    try {
        let recipesFromDB = await RecipeModel.find();
        let modifiersFromDB = await ModifierModel.find();
        let toppingsFromDB = await ToppingModel.find();
        let drinksFromDB = await DrinkModel.find();
        let categoriesFromDB = await CategoryModel.find();

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

        if (!categoriesFromDB) {
            return res.status(409).send("Couldn't find categories from database")
        }

        res.status(200).send({ recipesFromDB, modifiersFromDB, toppingsFromDB, drinksFromDB, categoriesFromDB });
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
    console.log("addModifier: ", name);

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
    console.log("AddRECIPECONTROLLER");
    const { name, toppings, category, price } = req.body;
    try {
        const recipeExists = await RecipeModel.findOne({ name });
        if (recipeExists) {
            return res.status(409).send("A recipe with that name already exists");
        }

        const modifierIds = req.existingModifiers.map(modifier => modifier._id.toString());

        const sortedModifiers = modifierIds.slice().sort((a, b) => a.localeCompare(b));

        console.log("sortedModifiers: ", sortedModifiers);
        const allRecipesModifiers = await RecipeModel.find({}, { _id: 0, modifiers: 1 });

        const recipeDuplicatesExist = allRecipesModifiers.some((recipe) => {
            const sortedModifiersFromDB = recipe.modifiers.slice().sort((a, b) => a.localeCompare(b));
            console.log("fromDB: ", sortedModifiersFromDB);
            return JSON.stringify(sortedModifiers) === JSON.stringify(sortedModifiersFromDB);
        })

        if (recipeDuplicatesExist) {
            return res.status(409).send("A recipe with that ingredients already exists");
        }

        const toppingIds = req.existingToppings.map(topping => topping._id);

        const recipe = new RecipeModel({
            name,
            modifiers: modifierIds,
            toppings: toppingIds,
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

async function addCategory(req, res) {
    let { name } = req.body;

    try {
        const category = await CategoryModel.findOne({ name });
        if (category) {
            return res.sendStatus(409);
        }
        const newCategory = new CategoryModel({ name });
        await newCategory.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error adding category: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateRecipe(req, res) {
    let { id } = req.params;
    const updateFields = req.body;
    console.log(updateFields);

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found! " });
        }

        res.status(200).json({ message: "Recipe updated succesfully: ", updatedRecipe })
    } catch (error) {
        console.error("Error updating recipe", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getDashboardData, getAllDrinks, addModifier, addTopping, addRecipe, addDrink, addCategory, updateRecipe }