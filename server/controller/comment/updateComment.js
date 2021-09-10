const {
  getComment,
  updateComment: updateCommentQuery
} = require('../../database/queries');

const updateComment = async (request, response) => {
  try {
    // TODO: add data validation
    const comment = request.body;
    const userId = request.userObj;
    const commentId = request.params.commentId;
    const origComment = await getComment(commentId);

    if (!origComment) {
      throw new Error('Bad request');
    }

    if (origComment.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedComment = await updateCommentQuery({
      ...comment,
      user_id: userId,
      updated_at: new Date()
    });

    response
      .status(200)
      .send({ message: 'Updated successfully', comment: updatedComment });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = updateComment;
