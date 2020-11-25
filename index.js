const core = require("@actions/core");
const build = require("./modules/build/index.js");
const deploy = require("./modules/deploy");
console.log(process.env);
async function main() {
  try {
    const projectType = core.getInput("project-type");
    await build(projectType);
    await deploy();
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();
