const core = require("@actions/core");
// const github = require("@actions/github");
var exec = require("child_process").exec;
var fs = require("fs");
try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput("config");
  // const address = core.getInput('address');
  const projectType = core.getInput("project-type");
  const deployType = core.getInput("deploy-type");
  const ip = core.getInput("ip");
  const username = core.getInput("username");
  const password = core.getInput("username");
  const projectPath = core.getInput("project-path");
  if (!projectType || !deployType) {
    console.log("请传入project-type,project-type");
    return;
  }
  if (!ip || !username || !password) {
    console.log("请传入ip,usename,password");
    return;
  }
  if (projectType == "web-build") {
    exec("yarn install", function (error, stdout, stderr) {
      if (err) {
        return console.error(err);
      }
      // 获取命令执行的输出
      // console.log(error, stdout, stderr);
      exec("yarn build", function (error, stdout, stderr) {
        if (err) {
          return console.error(err);
        }
        // 获取命令执行的输出
        // console.log(error, stdout, stderr);
        fs.writeFile("rsync.pass", password, function (err) {
          if (err) {
            return console.error(err);
          }
          console.log("数据写入成功！");
          exec("chmod 600 rsync.pass", function (error, stdout, stderr) {
            if (err) {
              return console.error(err);
            }
            // 获取命令执行的输出
            // console.log(error, stdout, stderr);
            exec(`rsync --password-file=rsync.pass ./dist ${username}@${ip}::${projectPath}`, function (error, stdout, stderr) {
              if (err) {
                return console.error(err);
              }
              // 获取命令执行的输出
              console.log(error, stdout, stderr);
            });
          });
        });
      });
    });
  }
  // const username = core.getInput('username');
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
