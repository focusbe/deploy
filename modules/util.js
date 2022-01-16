var exec = require('child_process').exec;
class Util {
    static async runSh(sh) {
        await new Promise((resolve, reject) => {
            let std = exec(sh);
            std.stdout.on('data', function (data) {
                console.log(data.trim());
            });
            std.stderr.on('data', function (data) {
                console.error(data.trim());
                // reject(data);
            });
            std.on('exit', function (code) {
                // console.log(code);
                console.log(sh + 'exit at code:' + code);
                resolve(true);
            });
        });
    }
}
module.exports = Util;
