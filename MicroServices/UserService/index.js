require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3636;

app.listen(PORT, () => {
  console.log(`user server running on ${PORT}`);
});
