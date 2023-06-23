const { PrismaClient } = require('@prisma/client')
const cookie = require('cookie');
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

const cookiesOpts = {
maxAge: 24 * 60 * 60 * 1000,
httpOnly: true
}

const cookieValues = {
    value: generatedJwt,
isAuth: generatedJwt ? true : false,
}

cookie.serialize("userAuthentication", cookieValues, cookiesOpts)
}


