const { getPost, updatePost } = require('../../database/queries');

const editPost = async (request, response) => {
  try {
    // TODO: add data validation
    const post = request.body;
    const userId = request.userObj;
    const postId = request.params.postId;
    const origPost = await getPost(postId);

    if (!origPost) {
      throw new Error('Bad request');
    }

    if (origPost.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedPost = await updatePost({
      ...post,
      user_id: userId,
      updated_at: new Date()
    });

    response
      .status(200)
      .send({ message: 'Updated successfully', post: updatedPost });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = editPost;
