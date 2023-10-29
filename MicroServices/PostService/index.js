require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 4646;

app.listen(PORT, () => {
  console.log(`post server running on ${PORT}`);
});
