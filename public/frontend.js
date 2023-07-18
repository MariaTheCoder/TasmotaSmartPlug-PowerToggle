const flexContainer = document.getElementById("flex-container");

function fetchPowerState() {
  fetch("http://localhost:5600/api", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.forEach((device) => createElement(device)));
}

console.log(flexContainer);

fetchPowerState();

function createElement(device) {
  // Create div container
  const divContainer = document.createElement("div");
  divContainer.classList.add("flex-column");

  // Creatae p elements for the device name
  const deviceNameContainer = document.createElement("p");
  deviceNameContainer.innerText = device.DeviceName;

  // Create toggle button
  const powerToggle = document.createElement("button");
  powerToggle.innerText = device.POWER;

  device.POWER === "ON"
    ? powerToggle.classList.add("ON")
    : powerToggle.classList.add("OFF");

  // append toggle button and p element to the div container
  divContainer.appendChild(deviceNameContainer);
  divContainer.appendChild(powerToggle);
  flexContainer.appendChild(divContainer);
}
