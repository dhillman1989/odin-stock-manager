var express = require("express");
var router = express.Router();

/* GET login form */
router.get("/login", function (req, res, next) {
  res.render("loginForm");
});

//POST login
router.post("/login", function (req, res, next) {
  //check that form data submitted matches a set expectation
  if (req.body.username == "admin" && req.body.password == "opensesame") {
    //if matches set username in locals
    req.app.locals.username = "admin";
    res.send("logged in");
  } else {
    //if no match send message to user and set username back to null in locals
    res.send("invalid login details");
    req.app.locals.username = null;
  }
});

module.exports = router;
