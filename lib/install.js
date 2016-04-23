/**
 * @file npm install 时自动运行的脚本
 * @author chenxiao07
 */

/* eslint-disable no-console */

var path     = require('path');
var util     = require('./util');

var src  = path.resolve(__dirname, '../hooks/pre-commit');
var dest = path.resolve(process.cwd(), '.git/hooks/');

console.log('如果已经存在 .git/hooks/pre-commit，它将会被覆盖');

util.copy(src, dest);
