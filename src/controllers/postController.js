const Post = require('../models/post');
const catchError = require('../utils/catchError');

// Crear una publicacion
exports.createPost = catchError(async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
});

// Obtener todas las publicaciones
exports.getAllPosts = catchError(async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).json(posts);
});

// Obtener una publicacion por ID
exports.getPostById = catchError(async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: 'no encontrada' });
    }
});

// Actualizar una publicacion
exports.updatePost = catchError(async (req, res) => {
    const [updated] = await Post.update(req.body, {
        where: { id: req.params.id },
    });
    if (updated) {
        const updatedPost = await Post.findByPk(req.params.id);
        res.status(200).json(updatedPost);
    } else {
        res.status(404).json({ message: 'no encontrada' });
    }
});

// Eliminar una publicacion
exports.deletePost = catchError(async (req, res) => {
    const deleted = await Post.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'no encontrada' });
    }
});
