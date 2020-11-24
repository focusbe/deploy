const core = require("@actions/core");
// const github = require("@actions/github");
var exec = require("child_process").exec;
var fs = require("fs");
try {
  const projectType = core.getInput("project-type");
  const build = require("./modules/build/index.js");
  await build(projectType);
} catch (error) {
  core.setFailed(error.message);
}
