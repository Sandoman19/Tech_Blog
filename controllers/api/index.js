// Dependencies
// Server connection
const router = require('express').Router();
// User Routes
const userRoutes = require('./userRoutes');
// Post Routes
const postRoutes = require('./postRoutes');
// Comment Routes
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
