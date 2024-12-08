const express = require("express");
const PORT = 3000;
const app = express();

const { errorsHandler, notFound } = require("./controllers/postController");

app.use(express.json());

const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");
const commentsRouter = require("./routers/comments");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server del mio blog")
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});