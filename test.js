// const ftpDeploy = require("ftp-deploy");
// var config = {
//   user: "1049047649@qq.com",
//   password: "dHDCZjuL9b",
//   host: "121.40.31.125",
//   port: 22,
//   localRoot: './test/',
//   include: ["*", "**/*"],
//   remoteRoot: "/test/",
//   exclude: [".github/"],
// };
// new ftpDeploy().deploy(config);
const Base64 = require("js-base64");
var arr = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Base64.encode(JSON.stringify(arr)));
console.log(JSON.parse(Base64.decode("eyJhIjoxLCJiIjoyLCJjIjozfQ==")));
