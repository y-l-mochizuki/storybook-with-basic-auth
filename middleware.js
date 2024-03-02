const protect = require("static-auth");
const safeCompare = require("safe-compare");

const USER_NAME = process.env.USER_NAME || "test";
const PASSWORD = process.env.PASSWORD || "test";

const app = protect(
  "/",
  (username, password) =>
    safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD), // timing attack 対策
  {
    directory: `${__dirname}`,
    onAuthFailed: (res) => {
      res.end("Authentication failed");
    },
  },
);

module.exports = app;
