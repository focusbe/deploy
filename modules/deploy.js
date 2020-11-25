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

const DeployFun = {
  async rsync() {
    fs.writeFileSync("rsync.pass", password);
    await Utli.runSh("chmod 600 rsync.pass");
    await Utli.runSh(`rsync -av --password-file=rsync.pass ./dist/ ${username}@${ip}::${projectPath}/`);
  },
};

async function main() {
  if (!deployType) {
    throw new Error("deploy-type should not be null");
  }
  if (!DeployFun[deployType]) {
    throw new Error(`deploy-type: ${deployType} is not supported`);
  }
  await DeployFun[deployType]();
}

module.exports = main;
