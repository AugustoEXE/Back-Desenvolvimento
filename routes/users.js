const express = require("express");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController.js");
const { auth } = require("../middlewares/auth.js");

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
    // console.log(email);
    try {
        const user = await userController.login({
            email,
            password,
        });

        const cookiesOpts = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        };
        if (user) {
            res.cookie(
                "userAuthentication",
                JSON.stringify(user),
                cookiesOpts
            ).json({ isAuth: true });
        }
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
});

route.get("/user/clear/cookie", async (req, res) => {
    res.clearCookie("userAuthentication").json({ messge: "Cookie Limpo!" });
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

route.get("/user/take_one", auth, async (req, res) => {
    const { id } = req.payload;
    console.log(id);

    const currentUser = await userController.getOne(id);
    console.log(currentUser);
    res.status(200).json(currentUser);
});

route.get("/user/get-all", async (req, res) => {
    const users = await userController.list();
    res.json(users);
});

module.exports = route;
