async function main(type) {
  var build = require("./" + type);
  await build();
}
module.exports = main;
