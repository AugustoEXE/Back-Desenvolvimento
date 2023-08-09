const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { auth } = require("./middlewares/auth");

const authorRouter = require("./routes/authors");
const publish_companyRouter = require("./routes/publishCompany");
const bookedBooks = require("./routes/bookedBooks");
const genreRoutes = require("./routes/genre");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/users");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(genreRoutes);
app.use(authorRouter);
app.use(bookRoutes);
app.use(userRoutes);
app.use(bookedBooks);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
