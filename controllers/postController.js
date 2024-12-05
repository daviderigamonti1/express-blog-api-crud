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
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i];
        }
    }
    newId += 1;
};

function update(req, res) {
    const postId = parseInt(req.params.id);
    const item = posts.find(item => item.id === postId);
    if (!item) {
        res.status(404).json({ success: false, message: "Il post non esiste" });
        return;
    }

    item.name = req.body.name;
    item.image = req.body.image;
    item.ingredients = req.body.tags;

    res.json(item);
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

module.exports = { index, show, store, update, modify, destroy };