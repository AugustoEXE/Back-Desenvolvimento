const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const genreRoutes = require("./routes/genre")
const port = 3000;

const prisma = new PrismaClient();
const bodyParser = require('body-parser')
const authorRouter = require('./routes/authors')
const publish_companyRouter = require('./routes/publish_company')


app.use(bodyParser.json(0))
app.use(bodyParser.urlencoded({extended: false}))

app.use(genreRoutes)


  app.use(authorRouter)
  app.use(publish_companyRouter)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
