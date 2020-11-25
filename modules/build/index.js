const core = require("@actions/core");
async function main() {
  const projectType = core.getInput("project-type");
  if (!projectType) {
    throw new Error("project-type is required");
  }
  if (projectType.indexOf("-build") > -1) {
    var build = require("./" + projectType);
    await build();
  } else {
    console.log("无需构建");
  }
}
module.exports = main;
