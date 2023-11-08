const User = require("../models/user");
const Notification = require("../models/notification");
const express = require("express");
const axios = require('axios');
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("paisi mama notification");
})

router.post("/notifyAllUsers", async (postId, username) => {
    try {
      console.log("Notifying all users about the new post. Post ID:" + postId +username);
      const users = await User.find();
      // const users = await axios.get("http://userservice:3636/user/getAllUsers");
      // const userList = JSON.stringify(users);
      // console.log("user der list: " + userList);
      // console.log("user er type" + typeof (users));
      console.log(users);
      // Create a notification for each user
      for (const user of users) {
        console.log("notif er for e dhukse");
        if (user.username !== username) {
          console.log("notif er if e dhukse");
          //   console.log('username :', user.username)
          const newNotification = new Notification({
            // user: user._id,
            postId: postId,
            message: `${username} has created a new post.`,
          });

          await newNotification.save();
          console.log(newNotification);
        }
      }
    } catch (err) {
      console.log("Error notifying users:", err);
    }
  }
)

router.get("/viewNotifications", async (req, res) => {
  try {
    // Fetch all notifications from the database
    const notifications = await Notification.find()
      .populate("_id", "username") // Populate the 'user' field with 'username' from the User model
      .sort({ createdAt: -1 });

      res.json(notifications);
  } catch (err) {
    console.log("Error fetching notifications:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications." });
  }
});

module.exports = { router };