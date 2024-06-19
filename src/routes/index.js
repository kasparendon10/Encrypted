const express = require('express');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

const router = express.Router();

router.use(userRoutes);
router.use(postRoutes);

module.exports = router;

