const express = require("express");

const app = express();
const port = 5600;

app.get("/", (req, res) => {
  console.log("Do you see me?");
  res.send("Do you see this in the frontend?");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
