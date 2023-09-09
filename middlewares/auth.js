const jwt = require("jsonwebtoken");

module.exports = {
    async auth(req, res, next) {
        if (req.cookies.userAuthentication) {
            const cookieValues = JSON.parse(
                req.cookies.userAuthentication
            ).value;

            try {
                const verifyToken = jwt.verify(
                    cookieValues,
                    process.env.SECRET_KEY
                );

                if (verifyToken) {
                    req.payload = verifyToken;
                    next();
                }
            } catch (e) {
                res.status(403).json({ message: "Token expired" });
            }
        } else {
            res.status(403).json({ mess: "cookies not available" });
        }
    },
};
