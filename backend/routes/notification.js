const User = require("../models/user");
const Notification = require("../models/notification");
const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

async function notifyAllUsers(postId, username) {
  try {
    // Fetch all users from the database
    console.log("Notifying all users about the new post. Post ID:")
      const users = await User.find();
      console.log(users)

    // Create a notification for each user
    for (const user of users) {
        if (user.username !== username) {
        //   console.log('username :', user.username)
        const newNotification = new Notification({
          user: user._id,
          postId: postId,
          message: `${username} has created a new post.`,
        });

        await newNotification.save();
      }
    }
  } catch (err) {
    console.log("Error notifying users:", err);
  }
}

router.get("/notifications", async (req, res) => {
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

// module.exports = {
//     notifyAllUsers,
//     router
// };
module.exports = router;