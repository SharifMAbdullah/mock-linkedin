const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
