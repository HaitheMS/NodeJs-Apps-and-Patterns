const fetch = require("node-fetch");
const response = await fetch(
  "https://api.nasa.gov/planetary/apod?api_key=tnc6iRusjYqdwJbYIgLHfkEB5eqVmfhUGMXM2wHK"
);
const data = await response.json();
console.log(data);
