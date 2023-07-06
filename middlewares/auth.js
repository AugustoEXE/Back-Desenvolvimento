const jwt = require("jsonwebtoken");

module.exports = {
    async auth(req, res, next) {
        const cookieValues = JSON.parse(req.cookies.userAuthentication).value;

        if (cookieValues) {
            const verifyToken = jwt.verify(
                cookieValues,
                process.env.SECRET_KEY
            );
            console.log(verifyToken);
            if (verifyToken) {
                req.payload = verifyToken;
                next();
            } else {
                res.send("sem permissão");
            }
        }
    },
};
