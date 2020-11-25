
const Utli = require("./modules/utli");
var prikey = 'C:\\Users\\liupeng\\.ssh\\id_rsa';
console.log(`ssh -i ${prikey} root@47.94.88.179`);
Utli.runSh(`rsync -av -e "ssh -i ${prikey} root@47.94.88.179" ./test/ root@47.94.88.179:/var/www/github/`);