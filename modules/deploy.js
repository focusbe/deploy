//部署到服务器
const core = require("@actions/core");
const ftpDeploy = require("ftp-deploy");
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
  var remotedir = `${remotePath}/${projectName}`;
  if (deployType == "rsync" || deployType == "ssh") {
    var passwordstr = "";
    var maohao = ":";
    if (deployType == "rsync") {
      maohao = "::";
      fs.writeFileSync("rsync.pass", password);
      await Utli.runSh("chmod 600 rsync.pass");
      passwordstr = "--password-file=rsync.pass";
    } else {
      fs.writeFileSync("rsync.pass", password);
      await Utli.runSh("chmod 600 rsync.pass");
      passwordstr = "-e 'ssh -i rsync.pass -o StrictHostKeyChecking=no'";
    }
    //   //纯前端项目非增量同步
    var deletetag = projectType.indexOf("front-") == 0 ? "--delete" : "";
    var rsynccmd = `rsync ${deletetag} -av ${passwordstr} --exclude ".*" --exclude rsync.pass --exclude "node_modules" ./${dist} ${username}@${ip}${maohao}${remotedir}`;
    await Utli.runSh(rsynccmd);
  } else if (deployType == "ftp") {
    var config = {
      user: username,
      host: ip,
      port: core.getInput("port"),
      localRoot: dist,
      remoteRoot: remotedir,
      exclude: [".*/*", "node_modules/*"],
    };
    await tpDeploy.deploy(config);
  }
  console.log(`deploy to ${ip} over ${deployType}`);
}

module.exports = main;
