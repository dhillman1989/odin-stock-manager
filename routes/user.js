var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/user", function (req, res, next) {
  req.app.locals.username = "Dave";
  res.send("logged in");
});

module.exports = router;
