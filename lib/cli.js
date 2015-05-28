/**
 * @file command line interface
 * @author chenxiao07<cxtom2010@gmail.com>
 */


var minimist = require('minimist');
var exec     = require('child_process').exec;

/**
 * 显示指定命令的帮助
 *
 * @param {string} cmd 命令名
 */
function displayHelp() {
    console.log('process \'fecs-hook init\'');
}

/**
 * 显示 package.json 中的版本号
 */
function displayVersion() {
    var pkg = require('./package');
    console.log('%s %s', pkg.name, pkg.version);
}

/**
 * 命令行参数处理
 *
 * @return {void} 无返回
 */
exports.parse = function () {
    var options = exports.getOptions(process.argv.slice(2));

    if (options.version) {
        return displayVersion();
    }

    if (options.help) {
        return displayHelp();
    }
    console.log('初始化开始..');
    exec('./../install.sh', function (error, result) {
        console.log(result);
    });
};

exports.getOptions = function (argv) {
    var options = minimist(
        argv,
        {
            'boolean': ['help', 'version'],
            'string': ['_'],
            'default': {},
            'alias': {
                h: 'help',
                v: 'version'
            }
        }
    );

    var cmd = options._[0];

    if (cmd && cmd === 'init') {
        cmd = options._.shift();
    }
    else {
        displayHelp();
        process.exit(0);
    }

    return options;
};
