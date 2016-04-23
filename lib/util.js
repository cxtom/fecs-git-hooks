/**
 * @file 一些工具
 * @author chenxiao07
 */

/* eslint-disable no-console */

var fs       = require('fs');
var exec     = require('child_process').exec;

/**
 * 复制文件
 *
 * @param  {string} src 源文件位置
 * @param  {string} dst 目标目录
 * @param  {string} callback 拷贝完成
 */
exports.copy = function (src, dst, callback) {

    // 目标目录不存在
    if (!fs.existsSync(dst)) {
        console.log('非git仓库根目录，退出');
        process.exit(1);
    }

    console.log('Copy pre-commit from %s to %s', src, dst);

    exec('cp -f ' + src + ' ' + dst, function (error, result) {

        if (error !== null) {
            console.log(error.toString());
            process.exit(1);
        }

        callback();
    });

};
