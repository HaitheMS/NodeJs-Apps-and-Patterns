"use-strict";
const fs = require("fs");
const { json } = require("stream/consumers");

// Load data and parse it (Chaining 3 Method, JSON.parse, readfileSync, and toString Methods)
const dataRead = JSON.parse(fs.readFileSync("one_json.json").toString());
// Manipulate object inside a directory (Folder)
dataRead.name = "Haïthem";
dataRead.age = 32;
// Stringify the data and overwrite the original data
const strNewData = JSON.stringify(dataRead);
fs.writeFileSync("one_json.json", strNewData);
