var exec = require('child_process').exec;
class Util {
    static async runSh(sh, config = {}) {
        await new Promise((resolve, reject) => {
            let std = exec(sh, config, function (error, stdout, stderr) {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                stdout && console.log(`${stdout}`);
                stderr && console.error(` ${stderr}`);
                resolve(true);
            });
        });
    }
}
module.exports = Util;
