const { addComment } = require('../../database/queries');

const createComment = async (request, response) => {
  try {
    // TODO: add data validation
    const comment = request.body;
    const userId = request.userObj;
    const newComment = await addComment({ comment, user_id: userId });
    response
      .status(201)
      .send({ message: 'Created successfully', comment: newComment });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createComment;
