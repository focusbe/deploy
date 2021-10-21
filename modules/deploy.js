//部署到服务器
const ftpDeploy = require('ftp-deploy');
const fs = require('fs');
const Utli = require('./utli');
const excludeFiles = ['.git/**', '.github/**', '.vscode/**', 'node_modules/**'];
async function main(dist) {
    const username = global.Config.username;
    const password = global.Config.password;
    const ip = global.Config.ip;
    var remotePath = global.Config['remote-path'];
    const projectType = global.Config['project-type'];
    const deployType = global.Config['deploy-type'];
    const projectName =
        global.Config['project-name'] ||
        process.env.GITHUB_REPOSITORY.split('/').pop();
    if (remotePath[remotePath.length - 1] != '/') {
        remotePath += '/';
    }
    var remotedir = `${remotePath}`;
    if (deployType == 'rsync' || deployType == 'ssh') {
        var passwordstr = '';
        var maohao = ':';
        var pswfile = '../rsync.pass';
        fs.writeFileSync(pswfile, password);
        await Utli.runSh('chmod 600 ' + pswfile);
        if (deployType == 'rsync') {
            maohao = '::';
            passwordstr = `--password-file="${pswfile}"`;
        } else {
            passwordstr = `-e 'ssh -i ${pswfile} -o StrictHostKeyChecking=no -p ${global.Config.port}'`;
        }
        var excludestr = '';
        for (var i in excludeFiles) {
            excludestr += ` --exclude ${excludeFiles[i].replace('/**', '')}`;
        }
        var deletetag = '';
        const sourceDir = global.Config['source-path'];
        var rsynccmd = `rsync ${global.Config.args} ${passwordstr} --exclude ${global.Config.exclude} ./${sourceDir} ${username}@${ip}${maohao}${remotedir}`;
        await Utli.runSh(rsynccmd);
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
