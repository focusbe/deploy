const core = require('@actions/core');
const build = require('./modules/build/index.js');
const deploy = require('./modules/deploy');
const Base64 = require('js-base64');
global.Config = {};
class Main {
    constructor() {
        this.init();
    }
    async init() {
        try {
            if (this.getConfig()) {
                await build();
                await deploy(
                    global.Config['project-type'].indexOf('build') > -1
                        ? 'dist/'
                        : ''
                );
            }
        } catch (error) {
            console.error(error);
            core.setFailed(error.message);
        }
    }
    getConfig() {
        const token = core.getInput('deploy-token');
        if (token) {
            try {
                global.Config = JSON.parse(Base64.decode(token));
            } catch (error) {
                console.error(
                    'token parse error you can get token by https://tools.focusbe.com/deploy-token'
                );
                return false;
            }
        } else {
            [
                'deploy-type',
                'project-type',
                'username',
                'password',
                'ip',
                'remote-path',
                'port',
                'project-name',
                'args',
                'source-path',
                'exclude',
            ].map((item, key) => {
                global.Config[item] = core.getInput(item);
            });
        }
        if (!global.Config) {
            console.error('inputs can not be null');
            return false;
        }
        var requiredParams = ['deploy-type', 'project-type', 'ip', 'username'];
        for (var i in requiredParams) {
            if (!global.Config[requiredParams[i]]) {
                console.error(requiredParams[i] + ' can not be null');
                return false;
            }
        }
        return global.Config;
    }
}
new Main();
