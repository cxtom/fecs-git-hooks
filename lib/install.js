/**
 * @file npm install 时自动运行的脚本
 * @author chenxiao07
 */

/* eslint-disable no-console */

var Util = require('./util');

Util.copy('../hooks/pre-commit', '.git/hooks/pre-commit');
