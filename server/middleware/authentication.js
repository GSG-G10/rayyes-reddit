require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  const { authorization: token } = req.cookies;
  const secret = process.env.SECRET;

  if (!secret) {
    return next(new Error('Internal server error!'));
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (decoded) {
      req.userObj = decoded;
      next();
    } else {
      res.clearCookie('authorization');
      res.status(403).json({ message: 'Unauthorized' });
    }
  });
};

module.exports = authentication;
