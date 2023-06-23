
const express = require("express");
const bcrypt = require('bcrypt')
const userCreated = require("../controllers/userController.js");
const { cookie } = require("express/lib/response");
const route = express.Router()

route.post("/create/user", async (req, res)=> {
    const {
        nome, email, password
    } = req.body


    const hashedPass = await bcrypt.hash(password, 12)
    const cookiesOpts = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
        }
    const userAuth = await userCreated.create({name: nome, email: email, password :hashedPass, admin: false});
    res.cookie("userAuthentication", JSON.stringify(userAuth), cookiesOpts).send("Ok")
    const cookieValue = req.cookies.userAuthentication
  
    console.log(JSON.parse(cookieValue).value);

})


module.exports = route;