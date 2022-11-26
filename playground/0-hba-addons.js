let https;
try {
  const https = require("https");
} catch (err) {
  console.log("https support is disabled!");
}
if (!https) return;

const url =
  "https://api.meteomatics.com/2022-11-26T00:00:00Z--2022-11-29T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
