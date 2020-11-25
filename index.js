const core = require("@actions/core");
const build = require("./modules/build/index.js");
const deploy = require("./modules/deploy");

async function main() {
  try {
    await build();
    await deploy(projectType.indexOf("build") > -1 ? "dist/" : "");
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();
