//部署到服务器
const core = require("@actions/core");
const fs = require("fs");
const Utli = require("./utli");
// const github = require("@actions/github");
const username = core.getInput("username");
const password = core.getInput("password");
const ip = core.getInput("ip");
const projectPath = core.getInput("project-path");
const deployType = core.getInput("deploy-type");
async function main(dist) {
  fs.writeFileSync("rsync.pass", password);
  await Utli.runSh("chmod 600 rsync.pass");
  console.log(process.env);
  await Utli.runSh(`rsync -av --password-file=rsync.pass ${dist} ${username}@${ip}::${projectPath}/`);
}
module.exports = main;
