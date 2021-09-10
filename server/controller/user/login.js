require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUser } = require('../../database/queries');

const compare = (incomingPass, origPass) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(incomingPass, origPass, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

const login = async (request, response) => {
  // TODO: add email & password validation
  try {
    const userData = request.body;
    const { rows } = await getUser(userData.email);
    const user = rows[0];

    if (!user) {
      throw new Error('This email is not used');
    }

    const result = await compare(userData.password, user.password_hash).catch(
      () => {
        throw new Error('Bad Request');
      }
    );

    if (result) {
      const { password_hash, ...data } = user;
      const token = jwt.sign(data, process.env.SECRET);
      response.cookie(
        'authorization',
        token,
        { maxAge: 1000 * 60 * 60 * 24 * 1 },
        { httpOnly: true }
      );
      response.status(200).send({ message: 'Logged in successfully' });
    } else {
      throw new Error('Incorrect password');
    }
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
};

module.exports = login;
