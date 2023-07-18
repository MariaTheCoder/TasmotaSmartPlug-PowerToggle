const serverSettings = require("./settings.json");
const express = require("express");

const app = express();
const port = 5600;

app.use("/", express.static("public"));

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
      return { state: "ON" };
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
