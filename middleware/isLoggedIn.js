const isLoggedIn = (req, res, next) => {
  if (req.app.locals && req.app.locals.username) {
    console.log("next?");
    next();
  } else {
    console.log("nope");
    res.redirect("/user/login");
  }
};

module.exports = isLoggedIn;
