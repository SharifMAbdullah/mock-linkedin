const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamp: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
