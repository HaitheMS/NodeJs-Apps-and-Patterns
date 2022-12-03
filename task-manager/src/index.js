const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));

const bcrypt = require("bcryptjs");
const myFunction = async () => {
  // init password
  const plainTextPassword = "RestAPI123!";
  // hash it
  const hashedPassword = await bcrypt.hash(plainTextPassword, 8);
  // see it
  console.log(hashedPassword);
  // compare them
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
  console.log(isMatch); // true
};

myFunction();
