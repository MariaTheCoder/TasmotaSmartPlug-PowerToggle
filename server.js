const serverSettings = require("./settings.json");
const express = require("express");

const app = express();
const port = 5600;

app.get("/", async (req, res) => {
  const powerState = await getPowerState();
  res.json(powerState);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

async function getPowerState() {
  try {
    const promises = serverSettings.devices.map((device) =>
      fetch(`http://${device}/cm?cmnd=Power`).then((res) => res.json())
    );

    const results = await Promise.allSettled(promises);

    return results;
  } catch (err) {
    console.error(err);
  }
}
