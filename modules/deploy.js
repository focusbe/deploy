//部署到服务器
const core = require("@actions/core");
const fs = require("fs");
const Utli = require("./utli");
const username = core.getInput("username");
const password = core.getInput("password");
const ip = core.getInput("ip");
const remotePath = core.getInput("remote-path");
const projectType = core.getInput("project-type");
const deployType = core.getInput("deploy-type");
const projectName = process.env.GITHUB_REPOSITORY.split("/").pop();
const DeployFun = {
  async rsync(dist) {
    fs.writeFileSync("rsync.pass", password);
    await Utli.runSh("chmod 600 rsync.pass");
    //纯前端项目非增量同步
    var deletetag = projectType.indexOf("front-") == 0 ? "--delete" : "";
    await Utli.runSh(`rsync ${deletetag} -av --password-file=rsync.pass ./${dist} ${username}@${ip}::${remotePath}/${projectName}`);
  }
};

async function main(dist) {
  if (!deployType) {
    throw new Error("deploy-type should not be null");
  }
  if (!DeployFun[deployType]) {
    throw new Error(`deploy-type: ${deployType} is not supported`);
  }
  if (!remotePath) {
    throw new Error("remote-path should not be null");
  }
  await DeployFun[deployType](dist);
}

module.exports = main;
