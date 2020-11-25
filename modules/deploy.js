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

async function main(dist) {
  if (!deployType) {
    throw new Error("deploy-type should not be null");
  }
  var passwordstr = "";
  if (deployType == "rsync") {
    fs.writeFileSync("rsync.pass", password);
    await Utli.runSh("chmod 600 rsync.pass");
    passwordstr = "--password-file=rsync.pass";
  }
  //   //纯前端项目非增量同步
  var deletetag = projectType.indexOf("front-") == 0 ? "--delete" : "";
  var remotedir = `${remotePath}/${projectName}`;
  var maohao = projectType == "rsync" ? "::" : ":";
  var rsynccmd = `rsync ${deletetag} -av ${passwordstr} --exclude ".*" --exclude "node_modules" ./${dist} ${username}@${ip}${maohao}${remotedir}`;
  await Utli.runSh(rsynccmd);
}

module.exports = main;
