require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 6666;
const job = require("./job");

setInterval(function() {
    job.cleanNotification();
}, 10 * 1000);
  
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
