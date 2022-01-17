//前端代码打包
const Util = require("../util");
async function main(){
  await Util.runSh('npm install');
  await Util.runSh('npm run build');
}
module.exports = main;