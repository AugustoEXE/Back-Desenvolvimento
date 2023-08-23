const express = require("express");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController.js");

const route = express.Router();

route.post("/create/user", async (req, res) => {
    const { name, email, password, admin } = req.body;

    const hashedPass = await bcrypt.hash(password, 12);
    const cookiesOpts = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    };
    const userAuth = await userController.create({
        name,
        email,
        password: hashedPass,
        admin,
    });

    return res
        .cookie("userAuthentication", JSON.stringify(userAuth), cookiesOpts)
        .json({ message: "Logado" });
});

route.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await userController.login({
            email,
            password,
        });

        console.log(user);
        const cookiesOpts = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        };

        res.cookie(
            "userAuthentication",
            JSON.stringify(user),
            cookiesOpts
        ).json({ message: "Loagado!" });
    } catch (e) {
        res.json({ message: e.message });
    }
});

route.delete("/user/delete/:id", async (req, res) => {
    const { id } = req.params;

    await userController.delete(Number(id));
    res.send("Usuário deletado!");
});

route.put("/user/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await userController.alter(req.body);
    res.send("Usuário alterado!");
});

route.get("/user/take_one/:id", async (req, res) => {
    const { id } = req.params;

    const userFound = await userController(id);
    res.status(200).send("Usuário encontroado").json({ userFound });
});

route.get("/user/get-all", async (req, res) => {
    const users = await userController.list();
    res.json(users);
});

module.exports = route;
