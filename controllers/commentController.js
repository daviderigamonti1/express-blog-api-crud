const comments = require("../data/comments");
const users = require("../data/comments");


function index(req, res) {
    const commentsName = req.query.name;
    const counter = comments.length;

    let response = {
        conteggio: counter,
        data: [...comments]
    };

    if (commentsName) {
        response.data = comments.filter((comment) => comment.nome.toLowerCase().includes(commentsName.toLowerCase())
        );
    }
    res.json(response);
};

function show(req, res) {
    const commentId = parseInt(req.params.id);
    const item = comments.find(item => item.id === commentId);
    if (item) {
        res.json({
            success: true,
            item,
        });
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "Il commento non esiste",
        });
    }
};

function store(req, res) {
    res.send("Aggiunta del nuovo commento");
};


function update(req, res) {
    const commentId = parseInt(req.params.id);
    const item = comments.find(item => item.id === commentId);
    if (item) {
        res.send(`Modifica integrale dell'user ${commentId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il commento non esiste",
        });
    }
};

function modify(req, res) {
    const commentId = parseInt(req.params.id);
    const item = comments.find(item => item.id === commentId);
    if (item) {
        res.send(`Modifica parziale dell'utente ${commentId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il commento non esiste",
        });
    }
};

function destroy(req, res) {
    const commentId = parseInt(req.params.id);
    const index = comments.findIndex(item => item.id === commentId);
    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(204);
        console.log(comments);
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "Il commento non esiste",
        });
    }
};

module.exports = { index, show, store, update, modify, destroy };