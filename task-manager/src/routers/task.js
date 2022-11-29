const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  try {
    await newTask.save();
    res.status(201).send("New Task Created\n" + newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Reading all Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(202).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Reading Task by ID ObjectId("6384c7e10b57ea57f60a12e3")
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id; // Access the task id provided
  try {
    const task = await Task.findById(_id);
    if (!task) res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Patch Task by ID
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "TaskName",
    "TaskType",
    "description",
    "completed",
    "tobeDeleted",
    "schedule",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!taskUpdated) res.status(404).send();
    res.status(202).send(taskUpdated);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) res.status(404).send();
    res.status(202).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
