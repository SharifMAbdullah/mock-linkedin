const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//encryption
const saltRounds = 10;

router.get("/", async (req, res) => {
  const result = await User.find({});
  //console.log(result);
  res.json(result);
});

router.post("/registration", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) res.status(400).send("user already exists");

  try {
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
          res.send({ message: "Hashing error!", error: err });
          reject(err);
        }
        resolve(hash);
      });
    });

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.send({
      success: true,
      message: "User successsfully created",
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "Couldn't create user!", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
      res.send({message: "Please fill all required fields!", error: error});
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.sendStatus(400);
        res.send({message: "User doesn't exist!", error: error});
      } else {
        const validateUser = await bcrypt.compare(password, user.password);
        if (!validateUser) {
          res.sendStatus(400);
          res.send({message: "User email or password is incorrect!", error: error});
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "PLACEHOLDER_SECRET_KEY";

          jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 },
            async (err, token) => {
              await User.updateOne({ _id: user._id },{ $set: { token },});
              user.save();
              return res.status(200).json({
                user: {
                  id: user._id,
                  email: user.email,
                  username: user.username,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    res.send({ message: "Error in logging in", error: error });
    console.log(error, "Error");
  }

});

module.exports = router;
