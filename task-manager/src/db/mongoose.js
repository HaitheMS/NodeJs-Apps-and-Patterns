// Using Mongoose
const mongoose = require("mongoose");

// Connect mongoose
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  //   useNewUrlParser: true, // This has been deprecated and no longer is necessary
  //   useCreateIndex: true, // This has been deprecated and no longer is necessary
  //   useFindAndModify: false, // This has been deprecated and no longer is necessary
});
