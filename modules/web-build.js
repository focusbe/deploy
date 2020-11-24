//前端代码打包
const Utli = require("./utli");
async function main(){
  await Utli.runSh('yarn install');
  await Utli.runSh('yarn build');
}
module.exports = main;