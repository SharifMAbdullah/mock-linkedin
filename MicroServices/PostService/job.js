const Notification = require("./models/notification");

async function cleanNotification() {
  console.log("cleanNotification");
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: 1 })
      .limit(3)
      .exec();
    for (const notification of notifications) {
      await Notification.deleteOne({ _id: notification._id });
    }

    console.log("Oldest 3 notifications have been deleted.");
  } catch (err) {
    console.error("Error while cleaning notifications:", err);
  }
}

module.exports = { cleanNotification };
