//部署到服务器
const core = require("@actions/core");
const Utli = require("./utli");
const github = require("@actions/github");
const username = core.getInput("username");
const password = core.getInput("password");
const projectPath = core.getInput("project-path");
const fs = require("fs");
async function main(dist) {
  fs.writeFileSync("rsync.pass", password);
  await Utli.runSh("chmod 600 rsync.pass");
  await Utli.runSh(`rsync -av --password-file=rsync.pass ${dist} ${username}@${ip}::${projectPath}/`);
}
module.exports = main;
