require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://postdb:27017/postdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    directConnection: true,
  })
  .then(() => {
    console.log("Post DB connected...");
  })
  .catch(console.error);
