const protect = require("static-auth");
const safeCompare = require("safe-compare");

const USER_NAME = process.env.USER_NAME || "test"; // プロジェクトの環境変数を設定していた場合はそちらを適用させる
const PASSWORD = process.env.PASSWORD || "test";

const app = protect(
  "/",
  (username, password) =>
    safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD), // timing attack 対策
  {
    directory: `${__dirname}`, // storybook-static 配下のファイルを配信する
    onAuthFailed: (res) => {
      res.end("Authentication failed");
    },
  },
);

module.exports = app;

// Note: https://www.webdelog.info/entry/2020/08/30/182121
