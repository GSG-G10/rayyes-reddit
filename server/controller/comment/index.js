const express = require('express');
const createComment = require('./createComment');
const updateComment = require('./updateComment');
const { authentication } = require('../../middleware');

const router = express.Router();

// routes that require authorization
router.use(authentication);

router.post('/', createComment);

router.put('/:commentId', updateComment);

module.exports = router;

