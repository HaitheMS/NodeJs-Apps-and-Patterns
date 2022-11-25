"use-strict";
console.log("Starting");

setTimeout(() => {
  console.log("2 Second");
}, 2000);
setTimeout(() => {
  console.log("0 Second");
}, 0);

console.log("Stopping");
