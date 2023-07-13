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

//encryption
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//testing home route
app.get("/", (req, res) => {
  res.send("sussy baka ekhane kisu nai");
});

//plant details
const plantRouter = require("./routes/plant");
app.use("/plants", plantRouter);

//register route
app.post("/register", async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });
  if (user) res.status(400).send("user already exists");

  try {
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const newUser = new User({
      username: req.body.username,
      phone: req.body.phone,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.send({
      success: true,
      message: "User successsfully created",
    });
  } catch (error) {
    res.send({ message: "Couldn't create user!", error: error });
  }
});

//new login
app.post("/login", async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).send("Please fill all required fields");
    } else {
      const user = await User.findOne({ phone });
      if (!user) {
        res.status(400).send("User phone or password is incorrect");
      } else {
        const validateUser = await bcrypt.compare(password, user.password);
        if (!validateUser) {
          res.status(400).send("User phone or password is incorrect");
        } else {
          const payload = {
            userId: user._id,
            phone: user.phone,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "PLACEHOLDER_SECRET_KEY";

          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 84600 },
            async (err, token) => {
              await User.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              return res.status(200).json({
                user: {
                  id: user._id,
                  phone: user.phone,
                  username: user.username,
                  isExpert: user.isExpert,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

//get users expertise
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ isExpert: true });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
            phone: user.phone,
            username: user.username,
            receiverId: user._id,
          },
        };
      })
    );
    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
});

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
