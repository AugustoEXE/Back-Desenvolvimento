const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authorRouter = require("./routes/authors");
const publish_companyRouter = require("./routes/publishCompany");
const bookedBooks = require("./routes/bookedBooks");
const genreRoutes = require("./routes/genre");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/users");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
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
app.use(publish_companyRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
