const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
        console.log(token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
}


module.exports = { requireAuth };