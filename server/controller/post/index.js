const express = require('express');
const createPost = require('./createPost');
const updatePost = require('./updatePost');
const voteOnPost = require('./votePost');
const { getPost, getPosts } = require('./getPost');
const { authentication } = require('../../middleware');

const router = express.Router();

router.get('/:postId', getPost);
router.get('/', getPosts);

// routes for authorized requests
router.use(authentication);

router.post('/', createPost);

router.put('/:postId', updatePost);

router.post('/votes', voteOnPost);

module.exports = router;
