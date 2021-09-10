const { upvote, downvote, unvote } = require('../../database/queries');

const votePost = async (request, response) => {
  try {
    const vote = request.body;
    const userId = request.userObj;
    const postId = request.params.postId;

    // upvote
    if (vote.value === 1) {
      await upvote({
        postId,
        userId
      });
    }

    // downvote
    if (vote.value === -1) {
      await downvote({
        postId,
        userId
      });
    }

    // unvote
    if (vote.value === 0) {
      await unvote({
        postId,
        userId
      });
    }

    response.status(200).send({ message: 'Voted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = votePost;
