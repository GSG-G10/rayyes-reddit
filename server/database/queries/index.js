const connection = require('../connection');

// Users
const getUser = (email) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email.toLowerCase()]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const addUser = ({ email, user_name, password_hash, img }) => {
  const sql = {
    text:
      'INSERT INTO users (email, user_name, password_hash, img) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [email.toLowerCase(), user_name.toLowerCase(), password_hash, img]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// Posts
const getPost = (id) => {
  const sql = {
    text: 'SELECT * FROM posts WHERE id=$1',
    values: [id]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getPosts = () => {
  const sql = 'SELECT * FROM posts';
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const addPost = ({ user_id, title, content, img }) => {
  const sql = {
    text:
      'INSERT INTO posts (user_id, title, content, img) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [user_id, title, content, img]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const updatePost = ({ post_id, title, content, img }) => {
  const sql = {
    text:
      'UPDATE posts SET (title, content, img) = ($2, $3, $4) WHERE id = $1 RETURNING *',
    values: [post_id, title, content, img]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// Votes
const upvote = ({ userId, postId }) => {
  const sql = {
    text:
      'DELETE FROM votes WHERE user_id = $1 AND post_id = $2 AND vote_value = -1; INSERT INTO votes (user_id, post_id, vote_value) = ($1, $2, 1) RETURNING *',
    values: [userId, postId]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const downvote = ({ userId, postId }) => {
  const sql = {
    text:
      'DELETE FROM votes WHERE user_id = $1 AND post_id = $2 AND vote_value = 1; INSERT INTO votes (user_id, post_id, vote_value) = ($1, $2, -1) RETURNING *',
    values: [userId, postId]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const unvote = ({ userId, postId }) => {
  const sql = {
    text: 'DELETE FROM votes WHERE user_id = $1 AND post_id = $2',
    values: [userId, postId]
  };
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  getUser,
  addUser,
  getPost,
  getPosts,
  addPost,
  updatePost,
  upvote,
  downvote,
  unvote
};
