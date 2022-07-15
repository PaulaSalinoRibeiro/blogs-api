const { Router } = require('express');
const postController = require('../controllers/postController');
const authToken = require('../middlewares/authToken');

const routerPost = Router();

routerPost.use(authToken);

routerPost.post('/', postController.create);

module.exports = routerPost;