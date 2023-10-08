//necessary packages
const express = require("express");
const cors = require("cors");

//config files
require("./config/db");
require("dotenv").config();

//using express and necessary packages
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));



//get and create posts
const postRouter = require("./routes/post");
app.use("/post", postRouter);

const notificationRouter = require("./routes/notification");
app.use("/notification", notificationRouter.router);

//resource not found
app.use((req, res, next) => {
  res.status(404).json({ message: "route not found" });
});

//server not found
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "kijani hoise server e" });
});

module.exports = app;
