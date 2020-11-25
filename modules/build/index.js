const core = require("@actions/core");
async function main() {
  const projectType = core.getInput("project-type");
  if(!projectType){
    throw new Error('project-type is required');
  }
  var build = require("./" + projectType);
  await build();
}
module.exports = main;
