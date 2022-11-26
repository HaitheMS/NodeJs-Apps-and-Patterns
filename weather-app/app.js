const request = require("request");
const fetch = require("node-fetch");

const url =
  "https://api.meteomatics.com/2022-11-26T00:00:00Z--2022-11-29T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json";

request(url, null, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data);
});
