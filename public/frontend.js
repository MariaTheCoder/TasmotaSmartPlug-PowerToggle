const flexContainer = document.getElementById("flex-container");

function fetchPowerState() {
  fetch("http://localhost:5600/api", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

console.log(flexContainer);

fetchPowerState();
