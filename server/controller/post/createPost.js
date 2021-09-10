const { addPost } = require('../../database/queries');

const createPost = async (request, response) => {
  try {
    // TODO: add data validation
    const post = request.body;
    const userId = request.userObj.id;
    console.log('post', post);
    console.log('userId', userId);
    const { rows } = await addPost({ ...post, user_id: userId });
    const newPost = rows[0];
    response
      .status(201)
      .send({ message: 'Created successfully', post: newPost });
  } catch (error) {
    console.log('error', error);
    response.status(400).send({ error: error.message });
  }
};

module.exports = createPost;
