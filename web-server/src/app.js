const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directoy for fallback in case there is no dynamic content
app.use(express.static(publicDirectoryPath));

// Configuring the server needs a ROOT, a request object and a response, in our cas we are using express to use the index html file
app.get("", (req, res) => {
  res.render("index", {
    title: "Home page",
    pageShortDescription: "The 🌦 has never been easier!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Haïthem BEN AYOUB",
    site_title: "Weather App",
    message: "GET IN TOUCH WITH ME",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Haïthem BEN AYOUB",
    site_title: "Weather App",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "",
    location: "",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Haïthem BEN AYOUB",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Haïthem BEN AYOUB",
    errorMessage: "Page not found.",
  });
});

// Port is mandatory, the callback function is optionnal
app.listen(3000, () => {
  console.log("Server is Listening on port 3000 ...");
});
