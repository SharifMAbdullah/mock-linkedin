const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/post", async (req, res) => {
  const newPost = new Post({
    description: req.body.description,
    image: req.body.image,
  });
});

router.get("/post", async (req, res) => {
  //find latest post of all users
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
