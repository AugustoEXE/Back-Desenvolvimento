const jwt = require("jsonwebtoken");

module.exports = {
    async generateToken(data) {
        const payload = {
            name: data.name,
            id: data.id,
        };

        const generatedJwt = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 10,
        });

        const cookieValues = {
            value: generatedJwt,
            isAuth: generatedJwt ? true : false,
        };

        return cookieValues;
    },
};
