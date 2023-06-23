const { PrismaClient } = require('@prisma/client')
const cookie = require('cookie');
const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

exports.create = async (data) => {

const createdUser = await prisma.User.create(
    {data}
)

const payload = {
 name: data.nome,
 id: createdUser.id 
}

const generatedJwt = jwt.sign(payload, process.env.SECRET_KEY)

const cookieValues = {
    value: generatedJwt,
isAuth: generatedJwt ? true : false,
}

return cookieValues
}


