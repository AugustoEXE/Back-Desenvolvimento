const jwt = require("jsonwebtoken");

module.exports = {
    async auth(req, res, next) {
        console.log(req.cookies)
        if (req.cookies.userAuthentication) {
            const cookieValues = JSON.parse(
                req.cookies.userAuthentication
            ).value;

            const verifyToken = jwt.verify(
                cookieValues,
                process.env.SECRET_KEY
            );
            // console.log("esse agui", cookieValues);
            if (verifyToken) {
                req.payload = verifyToken;
                next();
            } else {
                res.send("no permission");
            }
        } else {
            res.json({ mess: "Cookies not available" });
        }
    },
};
