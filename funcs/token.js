const jwt = require("jsonwebtoken");

module.exports = {
    async generateToken(data) {
        const payload = {
            name: data.name,
            id: data.id,
        };

        const generatedJwt = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });

        const cookieValues = {
            value: generatedJwt,
            isAuth: generatedJwt ? true : false,
        };

        return cookieValues;
    },
};
