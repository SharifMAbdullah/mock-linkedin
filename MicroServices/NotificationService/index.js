require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 5656; //! here i changed the port according to your docker-compose
const job = require("./job");

setInterval(function () {
  job.cleanNotification();
}, 60 * 10 * 1000);

app.listen(PORT, () => {
  console.log(`notification server running on ${PORT}`);
});
