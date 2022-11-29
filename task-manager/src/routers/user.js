const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send("New User Created\n" + newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Reading all Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(202).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Reading User by ID ObjectId("6384c27201b7de523c915507")
router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id; // Access the id provided
    const user = await User.findById(_id);
    if (!user) res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Patch User by ID
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userUpdated) res.status(404).send();
    res.status(202).send(userUpdated);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) res.status(404).send();
    res.status(202).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
