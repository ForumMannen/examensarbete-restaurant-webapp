const { AdminModel } = require("../models/admin.model");

async function register(req, res) {
    //Check if the Admin already exists
    const existingAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existingAdmin) {
        return res.status(409).json("Admin already exists, contact Admin or Developer");
    }

    //If Admin doesn't exists create one
    const admin = new AdminModel(req.body);
    //Don't hash for now, check more about OAuth
    await admin.save();

    const jsonAdmin = admin.toJSON();
    jsonAdmin._id = admin._id;
    delete jsonAdmin.password;

    res.status(201).send(jsonAdmin);
}

async function login(req, res) {
    //Check if email and password is correct
    const existingAdmin = await AdminModel.findOne({
        email: req.body.email,
    }).select("+password");

    //Add more checks for password aswell later
    if (!existingAdmin) {
        return res.status(401).json("Wrong email or password!");
    }

    //Login if Admin exists
    const admin = existingAdmin.toJSON();
    admin._id = existingAdmin._id;
    delete admin.password;

    //Check if admin already is logged in
    if (req.session._id) {
        return res.status(200).json(admin);
    }
    //Save admin to session
    req.session = admin;
    res.status(200).json(admin);
}

module.exports = { register, login };