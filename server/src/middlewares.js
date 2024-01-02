function validate(joiSchema) {
    return (req, res, next) => {
        const validation = joiSchema.validate(req.body);
        if (!validation.error) return next();
        res.status(400).json(validation.error.message);
    }
}

function isLoggedIn(req, res, next) {
    if (!req.session._id) return res.status(401).send();
    return next();
}

module.exports = { validate, isLoggedIn };