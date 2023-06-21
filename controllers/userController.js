const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
module.exports={
    async createUser(req, res){
req.body = {
     nome, email, password
}
const hashedPass = await bcrypt.hash(password.encode("utf-8"), 12)

const createdUser = await prisma.User.create({
    data: {
        nome, email, hashedPass
    }
})

const payload = {
    
}

const generateJwt = jwt.sign()
    },

    async listAllUsers(req, res){

    }
}