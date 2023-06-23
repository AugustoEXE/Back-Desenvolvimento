const jwt = require('jsonwebtoken')

module.exports = {
    async auth(req, res, next){
const cookieValues = req.cookies.userAuthentication(JSON.parse).value

if(cookieValues){
  const verifyToken = jwt.verify(cookieValues, process.env.SECRET_KEY) 
  if(verifyToken){
      req.payload = verifyToken.payload
      next()
  }else{
      res.send("sem permissão")
  }
}
    }
}