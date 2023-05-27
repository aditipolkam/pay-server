var express = require("express");
require("dotenv").config();

var router = express.Router();

router.get("/register", function (req, res) {
  res.send("Hello World!");
});

module.exports = router;
