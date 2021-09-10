const {
  getPost: getPostQuery,
  getPosts: getPostsQuery
} = require('../../database/queries');

const getPost = async (request, response) => {
  try {
    const postId = request.params.postId;
    const { rows } = await getPostQuery(postId);
    const post = rows[0];
    response.status(200).json({ post });
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};

const getPosts = async (request, response) => {
  try {
    const { rows: posts } = await getPostsQuery();
    response.status(200).json({ posts });
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};

module.exports = { getPost, getPosts };
