require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://userdb:27017/userdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    directConnection: true,
  })
  .then(() => {
    console.log("User DB connected...");
  })
  .catch(console.error);
