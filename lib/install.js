/**
 * @file npm install 时自动运行的脚本
 * @author cxtom
 */

/* eslint-disable no-console */

var Util = require('./util');

try {
    Util.installHooks('pre-commit');
}
catch (e) {
    console.trace(e);
}
