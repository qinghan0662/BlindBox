const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const commentController = require('../controllers/comment');

router.post('/:blindBoxId', authenticate, commentController.addComment);

module.exports = router;
module.exports = router;
router.post('/:blindBoxId', authenticate, commentController.addComment);

module.exports = router;
