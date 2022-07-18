const { Router } = require('express');
const postController = require('../controllers/postController');
const authToken = require('../middlewares/authToken');

const routerPost = Router();

routerPost.use(authToken);

routerPost.post('/', postController.create);

routerPost.get('/', postController.listAll);

routerPost.get('/:id', postController.findById);

routerPost.put('/:id', postController.updated);

routerPost.delete('/:id', postController.remove);

module.exports = routerPost;