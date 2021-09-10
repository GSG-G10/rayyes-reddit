const express = require('express');
const usersRouter = require('./user');
const postsRouter = require('./post');
const commentsRouter = require('./comment');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello!');
});

router.use('/users', usersRouter);

router.use('/posts', postsRouter);

router.use('/comments', commentsRouter);

module.exports = router;
