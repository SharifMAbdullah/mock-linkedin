const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const result = await User.find({});
  //console.log(result);
  res.json(result);
});

module.exports = router;
