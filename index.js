const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const genreRoutes = require("./routes/genre")
const port = 3000;

app.use(bodyParser.json(0))
app.use(bodyParser.urlencoded({extended: false}))

app.use(genreRoutes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
