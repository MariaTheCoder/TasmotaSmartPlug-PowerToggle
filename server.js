const serverSettings = require("./settings.json");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5600;

app.use("/", express.static("public"));
// enable all cors requests
app.use(cors());

app.get("/api", async (req, res) => {
  const powerState = await getPowerState();
  res.json(powerState);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

async function getPowerState() {
  const environment = process.env.NODE_ENV || "development";

  if (environment === "development") {
    console.log("running in " + environment);

    try {
      return [
        { DeviceName: "Smart Plug", POWER: "ON" },
        { DeviceName: "Smart Plug", POWER: "OFF" },
        { DeviceName: "Smart Plug", POWER: "OFF" },
      ];
    } catch (err) {
      console.error(err);
    }
  }

  if (environment === "production") {
    console.log("running in " + environment);

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
}
