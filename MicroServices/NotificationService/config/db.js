require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://notificationdb:27017/notifydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    directConnection: true,
  }) //! also hardcoded the url, you may try to use env file if you got time
  .then(() => {
    console.log("Notification DB connected...");
  })
  .catch(console.error);
