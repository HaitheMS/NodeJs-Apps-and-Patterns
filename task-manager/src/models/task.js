// Using Mongoose
const mongoose = require("mongoose");

// Creating Task Model
const Task = mongoose.model("Task", {
  TaskNumber: {
    type: String,
    required: true,
    trim: true,
  },
  TaskName: {
    type: String,
    required: true,
    trim: true,
  },
  TaskType: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  schedule: {
    type: Date,
    min: "2022-11-25",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  tobeDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
