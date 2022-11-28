const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { default: mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => {
      res.status(201).send("New User Created\n" + newUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Reading all Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(202).send(users);
    })
    .catch((e) => res.status(500).send(e));
});

// Reading User by ID 6384c2a08c8e5db0a039c583
app.get("/users/:id", (req, res) => {
  const _id = req.params.id; // Access the id provided
  User.findById(_id)
    .then((user) => {
      // if there is not matching id
      if (!user) res.status(404).send();
      // else provide it to client
      res.send(user);
    })
    .catch((e) => res.status(500).send());
});

app.post("/tasks", (req, res) => {
  const newTask = new Task(req.body);
  newTask
    .save()
    .then(() => {
      res.status(201).send("New Task Created\n" + newTask);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Reading all Tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(202).send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

// Reading Task by ID
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id; // Access the task id provided
  Task.findById(_id)
    .then((task) => {
      // if there is not matching id
      if (!task) res.status(404).send();
      // else provide task to client
      res.send(task);
    })
    .catch((e) => res.status(500).send());
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
