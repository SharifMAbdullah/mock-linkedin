//necessary packages
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//config files
require("./config/db");
require("dotenv").config();

//models
const User = require("./models/user");
const Post = require("./models/post");

//using express and necessary packages
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//testing home route
app.get("/", (req, res) => {
  res.send("sussy baka ekhane kisu nai");
});

//user login and registration
const userRouter = require("./routes/user");
app.use("/", userRouter);

//get and create posts
const postRouter = require("./routes/post");
app.use("/", postRouter);

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
