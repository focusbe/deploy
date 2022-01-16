//部署到服务器
const ftpDeploy = require('ftp-deploy');
const fs = require('fs-extra');
const Util = require('./util');
const excludeFiles = ['.git/**', '.github/**', '.vscode/**', 'node_modules/**'];
async function main(dist) {
    const Config = global.Config;
    const { username, password, ip } = Config;
    var remotePath = Config['remote-path'];
    const deployType = Config['deploy-type'];
    const projectName =
        global.Config['project-name'] ||
        process.env.GITHUB_REPOSITORY.split('/').pop();
    if (remotePath[remotePath.length - 1] != '/') {
        remotePath += '/';
    }
    var remotedir = `${remotePath}${projectName}`;
    if (deployType == 'rsync' || deployType == 'ssh') {
        var passwordstr = '';
        var maohao = ':';
        var pswfile = '../rsync.pass';
        fs.writeFileSync(pswfile, password);
        await Util.runSh('chmod 600 ' + pswfile);
        if (deployType == 'rsync') {
            maohao = '::';
            passwordstr = `--password-file="${pswfile}"`;
        } else {
            passwordstr = `-e 'ssh -i ${pswfile} -o StrictHostKeyChecking=no -p ${global.Config.port}'`;
        }
        var excludeStr = '';
        for (var i in excludeFiles) {
            excludeStr += ` --exclude ${excludeFiles[i].replace('/**', '')}`;
        }
        // var deletetag = '';
        const sourceDir = global.Config['source-path'];
        var rsynccmd = `rsync ${global.Config.args} ${passwordstr} ${
            global.Config.exclude || excludeStr
        } ${sourceDir || dist} ${username}@${ip}${maohao}${remotedir}`;
        await Util.runSh(rsynccmd);
    } else if (deployType == 'ftp') {
        var config = {
            user: username,
            password: password,
            host: ip,
            port: global.Config.port,
            localRoot: './' + dist,
            include: ['*', '**/*'],
            remoteRoot: remotedir,
            exclude: excludeFiles,
        };
        await new ftpDeploy().deploy(config);
    }
    console.log(`deploy to ${ip} over ${deployType} fineshed`);
}

module.exports = main;
