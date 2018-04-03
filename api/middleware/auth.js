const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        req.userData = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Erreur lors de l'autentification du token..."
        })
    }
};