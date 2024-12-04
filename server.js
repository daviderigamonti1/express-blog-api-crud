const express = require("express");
const PORT = 3000;
const app = express();

const postsRouter = require("./routers/posts");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server del mio blog")
});

app.use("/posts", postsRouter);

app.all("*", (req, res) => {
    res.status(404).send("<h1>Error 404 - Not Found !</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});