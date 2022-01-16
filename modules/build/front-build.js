//前端代码打包
const Utli = require("../utli");
async function main(){
  await Utli.runSh('npm install');
  await Utli.runSh('npm run build');
}
module.exports = main;