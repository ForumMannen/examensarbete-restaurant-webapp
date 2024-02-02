const { AdminModel } = require("../models/admin.model");
const bcrypt = require("bcrypt");

async function register(req, res) {
    //Check if the Admin already exists
    const existingAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existingAdmin) {
        return res.status(409).json("Admin already exists, contact Admin or Developer");
    }

    //If Admin doesn't exists create one
    const admin = new AdminModel(req.body);
    admin.password = await bcrypt.hash(admin.password, 10);
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

    //Check if email and password is correct
    if (!existingAdmin || !(await bcrypt.compare(req.body.password, existingAdmin.password))) {
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
    console.log(admin);
    req.session = admin;
    res.status(200).send(admin);
}

async function logout(req, res) {
    console.log("Logout");
    if (!req.session._id) {
        return res.status(400).json("Cannot logout when you are not logged in");
    }
    req.session = null;
    res.status(204).json(null);
}

async function seeSecret(req, res) {
    res.status(200).send(req.session);
}

module.exports = { register, login, logout, seeSecret };