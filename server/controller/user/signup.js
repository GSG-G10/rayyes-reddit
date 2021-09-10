const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUser, addUser } = require('../../database/queries');

const genHash = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

const signup = async (request, response) => {
  try {
    // TODO: add data validation & make sure password & confirm password are equal
    const userData = request.body;
    console.log('userData', userData);
    const { rows } = await getUser(userData.email);
    const isUsed = !!rows[0];

    if (isUsed) {
      throw new Error('Email is already used');
    }

    const hash = await genHash(userData.password);
    console.log('hash', hash);
    const { rows: newUser } = await addUser({
      ...userData,
      password_hash: hash
    });

    const { password_hash, ...data } = newUser[0];
    const token = jwt.sign(data, process.env.SECRET);
    response.cookie(
      'authorization',
      token,
      { maxAge: 1000 * 60 * 60 * 24 * 1 },
      { httpOnly: true }
    );

    response.status(201).send({
      message: 'Created successfully',
      user: data
    });
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};

module.exports = signup;
