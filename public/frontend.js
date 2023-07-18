const flexContainer = document.getElementById("flex-container");

function fetchPowerState() {
  fetch("http://localhost:5600/api", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.forEach((device) => createElement(device.POWER)));
}

console.log(flexContainer);

fetchPowerState();

function createElement(innerText) {
  const newElement = document.createElement("button");
  newElement.innerText = innerText;

  innerText === "ON"
    ? newElement.classList.add("ON")
    : newElement.classList.add("OFF");

  flexContainer.appendChild(newElement);
}
