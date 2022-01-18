//部署到服务器
const ftpDeploy = require('ftp-deploy');
const fs = require('fs');
const Util = require('./util');
const defaultExcludeFiles = [
    '.git/**',
    '.github/**',
    '.vscode/**',
    'node_modules/**',
];

async function main(dist) {
    const Config = global.Config;
    var {
        username = '',
        password = '',
        ip = '',
        ['remote-path']: remotePath = '',
        ['deploy-type']: deployType = '',
        ['project-name']: projectName = '',
        exclude = '',
        args = '',
    } = Config;

    if (!projectName) {
        projectName = process.env.GITHUB_REPOSITORY || ''.split('/').pop();
    }
    if (remotePath[remotePath.length - 1] != '/') {
        remotePath += '/';
    }

    var remoteDir = `${remotePath}${projectName}`;

    if (deployType === 'rsync' || deployType === 'ssh') {
        var passwordStr = '';
        var colon = ':';
        var pswFilePath = './rsync.pass';
        fs.writeFileSync(pswFilePath, password);
        await Util.runSh('chmod 600 ' + pswFilePath);
        if (deployType == 'rsync') {
            colon = '::';
            passwordStr = `--password-file="${pswFilePath}"`;
        } else {
            passwordStr = `-e 'ssh -i ${pswFilePath} -o StrictHostKeyChecking=no -p ${global.Config.port}'`;
        }
        var defaultExcludeStr = '';
        for (var i in defaultExcludeFiles) {
            defaultExcludeStr += ` --exclude ${defaultExcludeFiles[i].replace(
                '/**',
                ''
            )}`;
        }

        const sourceDir = global.Config['source-path'];
        var rsyncCmd = `rsync ${args} ${passwordStr} ${
            exclude || defaultExcludeStr
        } --exclude rsync.pass ${
            sourceDir || dist + '*'
        } ${username}@${ip}${colon}${remoteDir}`;
        await Util.runSh(rsyncCmd);
    } else if (deployType == 'ftp') {
        var config = {
            user: username,
            password: password,
            host: ip,
            port: global.Config.port,
            localRoot: './' + dist,
            include: ['*', '**/*'],
            remoteRoot: remoteDir,
            exclude: defaultExcludeFiles,
        };
        await new ftpDeploy().deploy(config);
    }
    console.log(` deploy to ${ip} over ${deployType} fineshed `);
}

module.exports = main;
