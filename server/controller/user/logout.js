const logout = (request, response) => {
  response.clearCookie('authorization');
  response.redirect('/');
};

module.exports = logout;
