const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

function isLoggedIn(req){
  return req.session.logged_in;
}

module.exports = {withAuth, isLoggedIn};
