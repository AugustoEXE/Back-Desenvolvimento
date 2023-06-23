
const express = require("express");
const bcrypt = require('bcrypt')
const userCreated = require("../controllers/userController.js")
const route = express.Router()

route.post("/create/user", async (req, res)=> {
    const {
        nome, email, password
    } = req.body

    const hashedPass = await bcrypt.hash(password, 12)

    await userCreated.create(nome, email, hashedPass);
    res.send('Ok')  
})

module.exports = route;