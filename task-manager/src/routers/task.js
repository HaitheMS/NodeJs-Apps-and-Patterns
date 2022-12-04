const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

// Create user Task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send("New Task Created\n" + task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET all Tasks for a logged in User
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id
    });
    if (!tasks) res.status(404).send();
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Fetch Tasks by Id ObjectId("638cbb5575d40a0d114e5491") ObjectId("638ce5b24db118f01da443a3")
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id; // Access the task id provided
  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    });
    if (!task) res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Patch Task by ID by Owner User
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "TaskName",
    "TaskType",
    "description",
    "completed",
    "tobeDeleted",
    "schedule"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) res.status(404).send();
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete task for owning user
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) res.status(404).send();
    res.status(202).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
