const users = require("../data/user");

function index(req, res) {
    const usersName = req.query.name;
    const counter = users.length;

    let response = {
        conteggio: counter,
        data: [...users]
    };

    if (usersName) {
        response.data = users.filter((user) => user.nome.toLowerCase().includes(usersName.toLowerCase())
        );
    }
    res.json(response);
};

function show(req, res) {
    const userId = parseInt(req.params.id);
    const item = users.find(item => item.id === userId);
    if (item) {
        res.json({
            success: true,
            item,
        });
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "L'utente non esiste",
        });
    }
};

function store(req, res) {
    res.send("Aggiunta del nuovo utente");
};


function update(req, res) {
    const userId = parseInt(req.params.id);
    const item = users.find(item => item.id === userId);
    if (item) {
        res.send(`Modifica integrale dell'user ${userId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "L'utente non esiste",
        });
    }
};

function modify(req, res) {
    const userId = parseInt(req.params.id);
    const item = users.find(item => item.id === userId);
    if (item) {
        res.send(`Modifica parziale dell'utente ${userId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "L'utente non esiste",
        });
    }
};

function destroy(req, res) {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(item => item.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(204);
        console.log(users);
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "L'utente non esiste",
        });
    }
};

module.exports = { index, show, store, update, modify, destroy };