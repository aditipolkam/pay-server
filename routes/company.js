var express = require("express");
require("dotenv").config();

var router = express.Router();

router.post("/verify", async function (req, res) {
  res.send("Hello World!");
});

router.post("/request-data", async function (req, res) {});

module.exports = router;
