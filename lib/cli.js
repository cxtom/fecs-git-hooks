/**
 * @file command line interface
 * @author chenxiao<cxtom2010@gmail.com>
 */

/* eslint-disable no-console */

var minimist = require('minimist');
var path     = require('path');
var fs       = require('fs');
var exec     = require('child_process').exec;


/**
 * 显示指定命令的帮助
 *
 * @param {string} cmd 命令名
 */
function displayHelp() {
    console.log('process \'fecs-hook init\' or \'fecs-hook disable\'');
}

/**
 * 显示 package.json 中的版本号
 */
function displayVersion() {
    var pkg = require('../package');
    console.log('%s %s', pkg.name, pkg.version);
}

/**
 * 复制文件
 * @param  {string} src 源文件位置
 * @param  {string} dst 目标目录
 */
function copy(src, dst) {
    // 目标目录不存在
    if (!fs.existsSync(dst)) {
        console.log('非git仓库根目录，退出');
        process.exit(1);
    }

    // 用node写文件的方法来复制文件，复制以后文件无法执行.....
    // var content = fs.readFileSync(src + '/pre-commit');
    // fs.writeFileSync(dst + '/pre-commit', content);

    // console.log("Copy pre-commit from %s to %s", src, dst);
    exec('cp -f ' + src + '/pre-commit ' + dst, function (error, result) {
        if (error !== null) {
            console.log('' + error);
            process.exit(1);
        }

        console.log('初始化成功！');
    });

}

exports.disable = function () {
    var filePath = path.resolve(process.cwd(), '.git/hooks/pre-commit');
    fs.unlink(filePath, function (error) {
        if (error !== null) {
            console.log('并未执行初始化\n' + error);
            process.exit(1);
        }
        console.log('OK！');
    });
};

exports.init = function () {
    // console.log('初始化开始..');
    var src  = path.resolve(__dirname, '../hooks/');
    var dest = path.resolve(process.cwd(), '.git/hooks/');
    copy(src, dest);
};

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

    exports[options.command]();
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

    if (cmd === 'init' || cmd === 'disable') {
        cmd = options._.shift();
        options.command = cmd;
    }

    return options;
};
