async function main() {
  if (!global.Config["project-type"]) {
    throw new Error("project-type is required");
  }
  if (global.Config["project-type"].indexOf("-build") > -1) {
    var build = require("./" + global.Config["project-type"]);
    await build();
  } else {
    // console.log("");
  }
}
module.exports = main;
