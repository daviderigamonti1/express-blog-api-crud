const posts = require("../data/post");
const comments = require("../data/comments");

function index(req, res) {
    const postsName = req.query.name;
    const postsTag = req.query.tag;
    const counter = posts.length;

    let response = {
        conteggio: counter,
        data: [...posts]
    };

    if (postsName) {
        response.data = posts.filter((post) => post.titolo.toLowerCase().includes(postsName.toLowerCase())
        );
    }

    if (postsTag) {
        response.data = posts.filter((post) => post.tags.includes(postsTag.toLowerCase()));
    }
    res.json(response);

};

function show(req, res) {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    const itemComments = comments.filter((comment) => comment.post_Id === postId);
    if (!item) {
        res.status(404).json({ error: "404", message: "Il post non esiste" });
    }
    const itemWithComments = { ...item, itemComments };
    res.json({ success: true, itemWithComments });
};

function store(req, res) {
    console.log(req.body);
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id;
        }
    }
    newId += 1;
    const newPost = {
        id: newId,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        tags: req.body.tags
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

function update(req, res) {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (!item) {
        res.status(404).json({ success: false, message: "Il post non esiste" });
        return;
    }
    item.titolo = req.body.titolo;
    item.contenuto = req.body.contenuto;
    item.tags = req.body.tags;

    res.json({ success: true, item });
};

function modify(req, res) {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (item) {
        res.send(`Modifica parziale del post ${postId}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il post non esiste",
        });
    }
};

function destroy(req, res) {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(item => item.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
        res.sendStatus(204);
        console.log(posts);
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "Il post non esiste",
        });
    }
};

function errorsHandler(err, req, res, next) {
    res.status(500).json({ errore: err.message });
};

function notFound(req, res, next) {
    res.status(404).json({ error: "Not Found", message: "Pagina non trovata" });
};

module.exports = { index, show, store, update, modify, destroy, errorsHandler, notFound };