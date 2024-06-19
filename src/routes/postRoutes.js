const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.getAllPosts);
router.get('/posts/:id', authMiddleware, postController.getPostById);
router.put('/posts/:id', authMiddleware, postController.updatePost);
router.delete('/posts/:id', authMiddleware, postController.deletePost);

module.exports = router;

