// Using Mongoose
const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    TaskNumber: {
      type: String,
      required: true,
      trim: true
    },
    TaskName: {
      type: String,
      required: true,
      trim: true
    },
    TaskType: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    schedule: {
      type: Date,
      min: "2022-11-25"
    },
    completed: {
      type: Boolean,
      default: false
    },
    tobeDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
// Creating Task Model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
